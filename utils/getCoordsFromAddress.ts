export interface Coords { lat: number; lng: number; city?: string | null }

export async function getCoordsFromAddress(q: string): Promise<Coords | null> {
  try {
    const res = await fetch(`/api/geocode?q=${encodeURIComponent(q)}`);
    if (!res.ok) return null;
    const data = await res.json();
    return data ?? null;
  } catch {
    return null;
  }
}
