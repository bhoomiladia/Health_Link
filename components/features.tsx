import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, MessageSquare, MapPin, Clock, Smartphone, Mic } from 'lucide-react'

export default function Features() {
  const features = [
    {
      icon: Clock,
      title: "Smart Queue System",
      description: "Skip waiting rooms with real-time token generation and queue updates via SMS or app.",
      color: "text-primary-600",
      bg: "bg-primary-50",
    },
    {
      icon: Brain,
      title: "AI Symptom Checker",
      description: "Get instant, preliminary health insights by describing your symptoms via text or voice.",
      color: "text-accent-600",
      bg: "bg-accent-50",
    },
    {
      icon: Smartphone,
      title: "Emergency SMS Tips",
      description: "Receive quick first-aid and emergency advice directly to your phone via SMS.",
      color: "text-destructive-600",
      bg: "bg-destructive-50",
    },
    {
      icon: MapPin,
      title: "Location-Based Hospital Finder",
      description: "Easily locate nearby hospitals and clinics with real-time availability and directions.",
      color: "text-secondary-600", // Using secondary for purple
      bg: "bg-secondary-50", // Using secondary for purple
    },
    {
      icon: Mic,
      title: "Multilingual + Voice Support",
      description: "Interact with the app in your preferred regional language using both text and voice input.",
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
  ]

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary-900 mb-4">Key Features</h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            HealthLink is designed to make healthcare accessible and efficient for everyone.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border-2 border-primary-100 hover:border-primary-200 transition-colors hover:shadow-lg"
            >
              <CardHeader>
                <div className={`w-14 h-14 rounded-full ${feature.bg} flex items-center justify-center mb-4`}>
                  <feature.icon className={`w-7 h-7 ${feature.color}`} />
                </div>
                <CardTitle className="text-xl text-primary-900">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
