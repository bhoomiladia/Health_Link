export async function getCityFromCoords(lat: number, lng: number): Promise<string | null> {
  try {
    const res = await fetch(`/api/reverse-geocode?lat=${encodeURIComponent(lat)}&lng=${encodeURIComponent(lng)}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.city ?? null;
  } catch {
    return null;
  }
}
