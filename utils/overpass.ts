export interface OsmHospital {
  id: string;
  name: string;
  address?: string;
  city?: string;
  state?: string;
  phone?: string;
  lat?: number;
  lon?: number;
  status?: "Available" | "Busy";
  area?: string;
}

function uniqueKey(h: OsmHospital) {
  return `${h.name}|${h.address ?? ""}|${h.city ?? ""}`.toLowerCase();
}

export function bboxFromCenter(lat: number, lon: number, radiusKm = 3): [number, number, number, number] {
  const dLat = radiusKm / 111;
  const dLon = radiusKm / (111 * Math.cos((lat * Math.PI) / 180));
  const south = lat - dLat;
  const north = lat + dLat;
  const west = lon - dLon;
  const east = lon + dLon;
  return [south, west, north, east];
}

export const OVERPASS_ENDPOINTS = [
  "https://overpass-api.de/api/interpreter",
  "https://overpass.kumi.systems/api/interpreter",
  "https://z.overpass-api.de/api/interpreter",
];

export async function fetchHospitalsByBBox(bbox: [number, number, number, number]): Promise<OsmHospital[]> {
  const [s, w, n, e] = bbox;
  const q = `
[out:json][timeout:25];
(
  node["amenity"~"hospital|clinic"](${s},${w},${n},${e});
  way["amenity"~"hospital|clinic"](${s},${w},${n},${e});
  relation["amenity"~"hospital|clinic"](${s},${w},${n},${e});
);
out center;`;
  let json: any = null;
  for (const ep of OVERPASS_ENDPOINTS) {
    try {
      const res = await fetch(ep, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8" },
        body: new URLSearchParams({ data: q }).toString(),
      });
      if (res.ok) {
        json = await res.json();
        break;
      }
    } catch {
      // try next endpoint
    }
  }
  if (!json) return [];
  const elements: any[] = json.elements || [];
  const out: OsmHospital[] = [];
  for (const el of elements) {
    const tags = el.tags || {};
    const name = tags.name || "Unnamed Facility";
    const addrParts = [tags["addr:housenumber"], tags["addr:street"], tags["addr:suburb"], tags["addr:city"], tags["addr:state"]].filter(Boolean);
    const address = addrParts.join(", ");
    const city = tags["addr:city"]; 
    const state = tags["addr:state"]; 
    const area = tags["addr:suburb"] || tags["addr:neighbourhood"] || tags["addr:city"];
    const phone = tags.phone || tags["contact:phone"] || undefined;
    const lat = el.lat ?? el.center?.lat;
    const lon = el.lon ?? el.center?.lon;
    out.push({
      id: String(el.id),
      name,
      address: address || undefined,
      city,
      state,
      area,
      phone,
      lat,
      lon,
      status: "Available",
    });
  }
  // de-duplicate
  const map = new Map<string, OsmHospital>();
  for (const h of out) {
    const k = uniqueKey(h);
    if (!map.has(k)) map.set(k, h);
  }
  return Array.from(map.values());
}
