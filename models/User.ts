// types/user.ts
export interface User {
    _id?: string;
    name: string;
    email: string;
    password: string;
    age?: number;
    phone?: string;
    bloodGroup?: string;
    gender?: string;
    address?: string;
    medicalHistory?: string;
    medications?: string;
    upcomingAppointments?: string;
    profileCompleted: boolean;
    createdAt: Date;
    updatedAt: Date;
  }