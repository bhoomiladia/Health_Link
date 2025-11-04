"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Phone } from "lucide-react";
import { Hospital } from "@/types/hospital";

export function HospitalCard({ hospital, onBook }: { hospital: Hospital; onBook: (h: Hospital) => void }) {
  return (
    <Card className={`border-2 ${hospital.status === "Available" ? "border-accent-200 bg-white" : "border-gray-200 bg-gray-50"}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg text-primary-900">{hospital.name}</CardTitle>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <MapPin className="w-4 h-4" />
                <span>
                  {hospital.address ? `${hospital.address}` : ""}
                  {hospital.city ? `${hospital.address ? ", " : ""}${hospital.city}` : ""}
                  {hospital.state ? `, ${hospital.state}` : ""}
                </span>
              </div>
              {typeof hospital.rating === "number" && (
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span>{hospital.rating}{typeof hospital.reviews === "number" ? ` (${hospital.reviews} reviews)` : ""}</span>
                </div>
              )}
              {typeof hospital.fee === "number" && (
                <div className="flex items-center space-x-1">
                  <span className="font-medium">₹{hospital.fee.toLocaleString()}</span>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <Badge variant={hospital.status === "Available" ? "default" : "secondary"} className={hospital.status === "Available" ? "bg-accent-100 text-accent-800" : ""}>
              {hospital.status}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {Array.isArray(hospital.specialties) && hospital.specialties.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {hospital.specialties.map((s, idx) => (
                <Badge key={idx} variant="outline" className="text-xs">
                  {s}
                </Badge>
              ))}
            </div>
          )}
          <div className="flex space-x-2 mt-2 sm:mt-0">
            <a href={`tel:${hospital.contact}`}>
              <Button variant="outline" size="sm">
                <Phone className="w-4 h-4 mr-1" />
                Call
              </Button>
            </a>
            <Button size="sm" className="bg-primary-600 hover:bg-primary-700" disabled={hospital.status !== "Available"} onClick={() => onBook(hospital)}>
              Book Token
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
