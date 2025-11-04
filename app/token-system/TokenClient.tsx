"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function TokenClient({ name, id, address }: { name: string; id?: string; address?: string }) {
  const router = useRouter();
  const book = () => {
    alert(`Token booked for ${name}`);
    router.push("/dashboard");
  };
  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-xl">Token System</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <p className="text-gray-700">Booking token for:</p>
          <p className="text-lg font-semibold text-primary-900">{name}</p>
          {address && <p className="text-sm text-gray-600">{address}</p>}
          {id && <p className="text-xs text-gray-500">ID: {id}</p>}
        </div>
        <Button className="bg-primary-600 hover:bg-primary-700 text-white" onClick={book}>Confirm Booking</Button>
      </CardContent>
    </Card>
  );
}
