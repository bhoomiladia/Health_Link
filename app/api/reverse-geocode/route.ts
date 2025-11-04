import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  if (!lat || !lng) {
    return NextResponse.json({ error: "lat and lng are required" }, { status: 400 });
  }
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "GOOGLE_MAPS_API_KEY is not configured" }, { status: 500 });
  }
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${encodeURIComponent(lat)},${encodeURIComponent(lng)}&key=${apiKey}`;
  try {
    const resp = await fetch(url, { cache: "no-store" });
    if (!resp.ok) {
      return NextResponse.json({ error: "Failed to fetch geocoding data" }, { status: 502 });
    }
    const json = await resp.json();
    const results: any[] = json.results || [];
    let city: string | null = null;
    if (results.length > 0) {
      for (const comp of results[0].address_components) {
        if (comp.types.includes("locality") || comp.types.includes("administrative_area_level_2")) {
          city = comp.long_name;
          break;
        }
      }
    }
    return NextResponse.json({ city });
  } catch (e) {
    return NextResponse.json({ error: "Unexpected error" }, { status: 500 });
  }
}
