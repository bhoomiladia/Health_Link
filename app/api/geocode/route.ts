import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q");
  if (!q) return NextResponse.json({ error: "q is required" }, { status: 400 });
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  if (!apiKey) return NextResponse.json({ error: "GOOGLE_MAPS_API_KEY is not configured" }, { status: 500 });
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(q)}&key=${apiKey}`;
  try {
    const resp = await fetch(url, { cache: "no-store" });
    if (!resp.ok) return NextResponse.json({ error: "Failed to fetch geocoding data" }, { status: 502 });
    const json = await resp.json();
    const result = (json.results && json.results[0]) || null;
    if (!result) return NextResponse.json(null);
    const location = result.geometry?.location;
    let city: string | null = null;
    for (const comp of result.address_components || []) {
      if (comp.types?.includes("locality") || comp.types?.includes("administrative_area_level_2")) {
        city = comp.long_name;
        break;
      }
    }
    return NextResponse.json({ lat: location.lat, lng: location.lng, city });
  } catch {
    return NextResponse.json({ error: "Unexpected error" }, { status: 500 });
  }
}
