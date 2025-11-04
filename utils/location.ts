export interface ReverseGeo {
  lat: number;
  lon: number;
  address: string | null;
  city: string | null;
  state: string | null;
}

export async function reverseGeocodeNominatim(lat: number, lon: number): Promise<ReverseGeo | null> {
  try {
    const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${encodeURIComponent(String(lat))}&lon=${encodeURIComponent(String(lon))}`;
    const res = await fetch(url, {
      headers: {
        Accept: "application/json",
      },
    });
    if (!res.ok) return null;
    const json = await res.json();
    const addr = json.address || {};
    const city = addr.city || addr.town || addr.village || addr.suburb || null;
    const state = addr.state || null;
    const address = json.display_name || null;
    return { lat, lon, address, city, state };
  } catch {
    return null;
  }
}

export interface CityGeo {
  city: string;
  state?: string | null;
  displayName?: string | null;
  lat: number;
  lon: number;
  // bbox order: south, west, north, east (Overpass expects this order)
  bbox?: [number, number, number, number];
}

export async function geocodeCityNominatim(city: string): Promise<CityGeo | null> {
  try {
    const url = `https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&city=${encodeURIComponent(city)}`;
    const res = await fetch(url, {
      headers: { Accept: "application/json" },
    });
    if (!res.ok) return null;
    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) return null;
    const item = data[0];
    const lat = parseFloat(item.lat);
    const lon = parseFloat(item.lon);
    const bboxRaw: string[] | undefined = item.boundingbox;
    let bbox: [number, number, number, number] | undefined = undefined;
    if (bboxRaw && bboxRaw.length === 4) {
      const south = parseFloat(bboxRaw[0]);
      const north = parseFloat(bboxRaw[1]);
      const west = parseFloat(bboxRaw[2]);
      const east = parseFloat(bboxRaw[3]);
      // Overpass expects south,west,north,east
      bbox = [south, west, north, east];
    }
    return {
      city,
      state: item?.address?.state ?? null,
      displayName: item.display_name ?? null,
      lat,
      lon,
      bbox,
    };
  } catch {
    return null;
  }
}
