import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { connectToDatabase } from "./mongodb"

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password.")
        }

        const { db } = await connectToDatabase()
        const user = await db.collection("users").findOne({ email: credentials.email })

        if (!user) throw new Error("No user found with this email.")

        const isPasswordValid = await bcrypt.compare(credentials.password, user.password)
        if (!isPasswordValid) throw new Error("Invalid password.")

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          profileCompleted: user.profileCompleted || false,
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/login",
    signUp: "/register",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.name = user.name
        token.email = user.email
        token.profileCompleted = user.profileCompleted
      }
      return token
    },
    
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string
        session.user.email = token.email as string
        session.user.name = token.name as string
        session.user.profileCompleted = token.profileCompleted as boolean
      }
      return session
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
}