"use client";

import { Hospital } from "@/types/hospital";
import { HospitalCard } from "./HospitalCard";

export function HospitalList({ hospitals, onBook }: { hospitals: Hospital[]; onBook: (h: Hospital) => void }) {
  if (!hospitals.length) {
    return (
      <div className="text-center py-12 text-gray-600">
        <p>No hospitals found.</p>
      </div>
    );
  }
  return (
    <div className="space-y-4">
      {hospitals.map((h) => (
        <HospitalCard key={(h._id as string) || h.name} hospital={h} onBook={onBook} />
      ))}
    </div>
  );
}
