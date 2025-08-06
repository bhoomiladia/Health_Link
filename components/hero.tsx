import { Button } from "@/components/ui/button"
import { Mic, FileText } from 'lucide-react'
import Link from "next/link"

export default function Hero() {
  return (
    <section className="py-12 lg:py-20 bg-gradient-to-br from-primary-50 to-secondary-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8 text-center lg:text-left">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary-900 leading-tight">
                HealthLink:
                <br />
                <span className="text-accent-600">Linking you to faster, smarter care.</span>
              </h1>
              <p className="text-xl text-gray-700 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                HealthLink gives patients—especially elderly and rural people—easy access to queue updates and pre-care
                advice, even through SMS or voice features.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Button asChild size="lg" className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg">
                <Link href="/symptom-checker">
                  <FileText className="mr-2 h-5 w-5" />
                  Start Checking Symptoms
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-primary-600 border-primary-500 hover:bg-primary-50 px-8 py-3 rounded-lg">
                <Link href="/token">
                  <Mic className="mr-2 h-5 w-5" />
                  Get a Token
                </Link>
              </Button>
            </div>
          </div>

          {/* Right Column - Hero Image */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl max-w-md lg:max-w-none">
              <img
                src="/placeholder.svg?height=600&width=500&text=Diverse+family+receiving+healthcare+consultation+with+doctor+in+modern+clinic+setting"
                alt="Diverse family using healthcare services"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-900/20 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
