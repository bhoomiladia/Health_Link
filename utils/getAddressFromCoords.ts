export interface ReverseGeocodeResult {
  address: string | null;
  city: string | null;
  state: string | null;
  lat: number;
  lng: number;
}

export async function getAddressFromCoords(lat: number, lng: number): Promise<ReverseGeocodeResult | null> {
  try {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string | undefined;
    if (!apiKey) return null;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${encodeURIComponent(String(lat))},${encodeURIComponent(String(lng))}&key=${apiKey}`;
    const resp = await fetch(url, { cache: "no-store" });
    if (!resp.ok) return null;
    const json = await resp.json();
    const result = (json.results && json.results[0]) || null;
    if (!result) return { address: null, city: null, state: null, lat, lng };
    const formatted = result.formatted_address as string | undefined;
    let city: string | null = null;
    let state: string | null = null;
    for (const comp of result.address_components || []) {
      if (comp.types?.includes("locality")) {
        city = comp.long_name;
      }
      if (comp.types?.includes("administrative_area_level_1")) {
        state = comp.long_name;
      }
    }
    return { address: formatted ?? null, city, state, lat, lng };
  } catch {
    return null;
  }
}
