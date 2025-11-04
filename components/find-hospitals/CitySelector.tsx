"use client";

import { useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const INDIAN_CITIES = [
  "Mumbai",
  "Delhi",
  "Bengaluru",
  "Hyderabad",
  "Ahmedabad",
  "Chennai",
  "Kolkata",
  "Pune",
  "Jaipur",
  "Surat",
  "Lucknow",
  "Kanpur",
  "Nagpur",
  "Indore",
  "Thane",
  "Bhopal",
  "Visakhapatnam",
  "Patna",
  "Vadodara",
  "Ghaziabad",
];

export function CitySelector({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const options = useMemo(() => INDIAN_CITIES, []);
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      <div>
        <Input
          placeholder="Search city"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select city" />
        </SelectTrigger>
        <SelectContent>
          {options.map((c) => (
            <SelectItem key={c} value={c}>
              {c}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
