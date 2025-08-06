"use client"

import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { MapPin, Star, Clock, Phone, Search, Filter } from 'lucide-react'
import { useState, useEffect } from "react"

export default function NearbyHospitalsPage() {
  const [location, setLocation] = useState("Detecting...")
  const [filterSpecialty, setFilterSpecialty] = useState("all")
  const [filterEmergency, setFilterEmergency] = useState("all")

  const hospitals = [
    {
      id: 1,
      name: "City General Hospital",
      distance: "0.8 km",
      rating: 4.5,
      waitTime: "15 min",
      specialties: ["General Medicine", "Emergency", "Pediatrics"],
      phone: "+91 98765 43210",
      available: true,
      emergency: true,
    },
    {
      id: 2,
      name: "Family Care Clinic",
      distance: "1.2 km",
      rating: 4.3,
      waitTime: "25 min",
      specialties: ["Pediatrics", "General Medicine", "Dermatology"],
      phone: "+91 98765 43211",
      available: true,
      emergency: false,
    },
    {
      id: 3,
      name: "Metro Health Center",
      distance: "2.1 km",
      rating: 4.7,
      waitTime: "45 min",
      specialties: ["Cardiology", "Orthopedics", "Neurology"],
      phone: "+91 98765 43212",
      available: false,
      emergency: true,
    },
    {
      id: 4,
      name: "Rural Health Post",
      distance: "5.5 km",
      rating: 3.9,
      waitTime: "10 min",
      specialties: ["General Medicine", "Basic Care"],
      phone: "+91 98765 43213",
      available: true,
      emergency: false,
    },
    {
      id: 5,
      name: "Advanced Surgical Institute",
      distance: "3.0 km",
      rating: 4.8,
      waitTime: "60 min",
      specialties: ["Surgery", "Oncology"],
      phone: "+91 98765 43214",
      available: true,
      emergency: true,
    },
  ]

  useEffect(() => {
    // Simulate location detection
    setTimeout(() => {
      setLocation("Current Location: Mumbai, India")
    }, 1500)
  }, [])

  const filteredHospitals = hospitals.filter(hospital => {
    const matchesSpecialty = filterSpecialty === "all" || hospital.specialties.includes(filterSpecialty)
    const matchesEmergency = filterEmergency === "all" || (filterEmergency === "yes" && hospital.emergency) || (filterEmergency === "no" && !hospital.emergency)
    return matchesSpecialty && matchesEmergency
  })

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-primary-900 mb-4">Nearby Hospitals & Clinics</h1>
        <p className="text-lg text-gray-600 mb-8">{location}</p>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Filters and Map */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="border-primary-200 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-primary-900 flex items-center gap-2">
                  <Filter className="w-5 h-5" /> Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="specialty-filter" className="text-gray-700">Specialty</Label>
                  <Select value={filterSpecialty} onValueChange={setFilterSpecialty}>
                    <SelectTrigger id="specialty-filter" className="border-primary-200 focus:ring-primary-500">
                      <SelectValue placeholder="Select specialty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Specialties</SelectItem>
                      <SelectItem value="General Medicine">General Medicine</SelectItem>
                      <SelectItem value="Pediatrics">Pediatrics</SelectItem>
                      <SelectItem value="Emergency">Emergency</SelectItem>
                      <SelectItem value="Cardiology">Cardiology</SelectItem>
                      <SelectItem value="Orthopedics">Orthopedics</SelectItem>
                      <SelectItem value="Neurology">Neurology</SelectItem>
                      <SelectItem value="Dermatology">Dermatology</SelectItem>
                      <SelectItem value="Surgery">Surgery</SelectItem>
                      <SelectItem value="Oncology">Oncology</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="emergency-filter" className="text-gray-700">Emergency Services</Label>
                  <Select value={filterEmergency} onValueChange={setFilterEmergency}>
                    <SelectTrigger id="emergency-filter" className="border-primary-200 focus:ring-primary-500">
                      <SelectValue placeholder="Filter by emergency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="bg-primary-600 hover:bg-primary-700 text-white">Apply Filters</Button>
              </CardContent>
            </Card>

            <Card className="border-primary-200 shadow-lg">
              <CardContent className="p-0">
                <div className="relative h-64 bg-gradient-to-br from-primary-100 to-accent-100 rounded-lg overflow-hidden">
                  <img
                    src="/placeholder.svg?height=256&width=400&text=Interactive+Map"
                    alt="Interactive map showing hospitals"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 text-center">
                      <MapPin className="w-6 h-6 text-primary-600 mx-auto mb-1" />
                      <p className="text-sm font-medium text-primary-900">Map View</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Hospital List */}
          <div className="lg:col-span-2 space-y-4">
            {filteredHospitals.length > 0 ? (
              filteredHospitals.map((hospital) => (
                <Card
                  key={hospital.id}
                  className={`border-2 ${hospital.available ? "border-accent-200 bg-white" : "border-gray-200 bg-gray-50"}`}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg text-primary-900">{hospital.name}</CardTitle>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2 text-sm text-gray-600">
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4" />
                            <span>{hospital.distance}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-500" />
                            <span>{hospital.rating}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{hospital.waitTime}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <Badge
                          variant={hospital.available ? "default" : "secondary"}
                          className={hospital.available ? "bg-accent-100 text-accent-800" : ""}
                        >
                          {hospital.available ? "Available" : "Busy"}
                        </Badge>
                        {hospital.emergency && (
                          <Badge variant="outline" className="border-destructive-200 text-destructive-600">
                            Emergency
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="flex flex-wrap gap-2">
                        {hospital.specialties.map((specialty, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex space-x-2 mt-2 sm:mt-0">
                        <Button variant="outline" size="sm">
                          <Phone className="w-4 h-4 mr-1" />
                          Call
                        </Button>
                        <Button size="sm" className="bg-primary-600 hover:bg-primary-700" disabled={!hospital.available}>
                          Book Token
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-12 text-gray-600 col-span-2">
                <p>No hospitals found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
