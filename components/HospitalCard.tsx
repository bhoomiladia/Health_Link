"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Phone } from "lucide-react";

export interface HospitalItem {
  id: string;
  name: string;
  address?: string;
  city?: string;
  state?: string;
  phone?: string;
  status?: "Available" | "Busy";
}

export function HospitalCard({ data, onBook }: { data: HospitalItem; onBook?: (h: HospitalItem) => void }) {
  const status = data.status ?? "Available";
  return (
    <Card className={`border-2 ${status === "Available" ? "border-accent-200 bg-white" : "border-gray-200 bg-gray-50"}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg text-primary-900">{data.name}</CardTitle>
            {(data.address || data.city || data.state) && (
              <div className="flex items-center gap-2 text-sm text-gray-600 mt-2">
                <MapPin className="w-4 h-4" />
                <span>{[data.address, data.city, data.state].filter(Boolean).join(", ")}</span>
              </div>
            )}
          </div>
          <div>
            <Badge variant={status === "Available" ? "default" : "secondary"} className={status === "Available" ? "bg-accent-100 text-accent-800" : ""}>
              {status}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center justify-end gap-2">
          {data.phone ? (
            <Button asChild variant="outline" size="sm">
              <a href={`tel:${data.phone}`}>
                <Phone className="w-4 h-4 mr-1" /> Call
              </a>
            </Button>
          ) : (
            <Button variant="outline" size="sm" disabled>
              <Phone className="w-4 h-4 mr-1" /> Call
            </Button>
          )}
          <Button size="sm" className="bg-primary-600 hover:bg-primary-700" onClick={() => onBook?.(data)}>
            Book Token
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
