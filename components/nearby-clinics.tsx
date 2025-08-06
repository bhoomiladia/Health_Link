import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Star, Clock, Phone } from "lucide-react"

export default function NearbyClinics() {
  const clinics = [
    {
      name: "City General Hospital",
      distance: "0.8 km",
      rating: 4.5,
      waitTime: "15 min",
      specialties: ["General", "Emergency"],
      phone: "+91 98765 43210",
      available: true,
    },
    {
      name: "Family Care Clinic",
      distance: "1.2 km",
      rating: 4.3,
      waitTime: "25 min",
      specialties: ["Pediatrics", "General"],
      phone: "+91 98765 43211",
      available: true,
    },
    {
      name: "Metro Health Center",
      distance: "2.1 km",
      rating: 4.7,
      waitTime: "45 min",
      specialties: ["Cardiology", "Orthopedics"],
      phone: "+91 98765 43212",
      available: false,
    },
  ]

  return (
    <section id="find-clinics" className="py-16 bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-blue-900 mb-4">Find Healthcare Near You</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover nearby clinics and hospitals with real-time availability, ratings, and estimated wait times.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Map Placeholder */}
          <div className="relative">
            <Card className="border-2 border-blue-100">
              <CardContent className="p-0">
                <div className="relative h-96 bg-gradient-to-br from-blue-100 to-green-100 rounded-lg overflow-hidden">
                  <img
                    src="/placeholder.svg?height=400&width=600&text=Interactive+Map+View"
                    alt="Map showing nearby healthcare facilities"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 text-center">
                      <MapPin className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                      <p className="text-sm font-medium text-blue-900">Interactive Map</p>
                      <p className="text-xs text-gray-600">Showing 12 nearby facilities</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Clinic List */}
          <div className="space-y-4">
            {clinics.map((clinic, index) => (
              <Card
                key={index}
                className={`border-2 ${clinic.available ? "border-green-200 bg-white" : "border-gray-200 bg-gray-50"}`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg text-blue-900">{clinic.name}</CardTitle>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4" />
                          <span>{clinic.distance}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-500" />
                          <span>{clinic.rating}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{clinic.waitTime}</span>
                        </div>
                      </div>
                    </div>
                    <Badge
                      variant={clinic.available ? "default" : "secondary"}
                      className={clinic.available ? "bg-green-100 text-green-800" : ""}
                    >
                      {clinic.available ? "Available" : "Busy"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      {clinic.specialties.map((specialty, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Phone className="w-4 h-4 mr-1" />
                        Call
                      </Button>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700" disabled={!clinic.available}>
                        Book Token
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            <Button variant="outline" className="w-full border-blue-200 text-blue-600 hover:bg-blue-50 bg-transparent">
              View All Nearby Clinics
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
