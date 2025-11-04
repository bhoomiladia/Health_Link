"use client";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { HospitalCard } from "@/components/HospitalCard";
import { reverseGeocodeNominatim, geocodeCityNominatim } from "@/utils/location";
import { bboxFromCenter, fetchHospitalsByBBox, OsmHospital } from "@/utils/overpass";
import { LocateFixed, Search, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";

export default function FindHospitalsPage() {
  const router = useRouter();
  // Location state
  const [lat, setLat] = useState<number | null>(null);
  const [lon, setLon] = useState<number | null>(null);
  const [city, setCity] = useState("");
  const [stateName, setStateName] = useState<string | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [locationDetected, setLocationDetected] = useState(false);
  const [street, setStreet] = useState("");
  const [zip, setZip] = useState("");
  // removed custom consent panel

  // Manual city input (debounced)
  const [cityInput, setCityInput] = useState("");
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  // Hospitals
  const [hospitals, setHospitals] = useState<OsmHospital[]>([]);
  const [loadingHospitals, setLoadingHospitals] = useState(false);
  const [loadingLocation, setLoadingLocation] = useState(false);

  const bbox = useMemo(() => {
    if (lat != null && lon != null) return bboxFromCenter(lat, lon, 8);
    return undefined;
  }, [lat, lon]);

  const fetchHospitals = useCallback(async () => {
    if (!bbox) return;
    setLoadingHospitals(true);
    try {
      let list = await fetchHospitalsByBBox(bbox);
      // fallback: widen radius if empty
      if ((!list || list.length === 0) && lat != null && lon != null) {
        const wider = bboxFromCenter(lat, lon, 12);
        list = await fetchHospitalsByBBox(wider);
      }
      const safe = list ?? [];
      setHospitals(safe);
      // persist a minimal list for Token page dropdown
      try {
        const minimal = safe.map(h => ({ id: h.id, name: h.name, address: h.address, city: h.city, state: h.state }));
        localStorage.setItem('hospitalsLastList', JSON.stringify(minimal));
      } catch {}
    } catch {
      setHospitals([]);
    } finally {
      setLoadingHospitals(false);
    }
  }, [bbox]);

  // Debounce manual city input -> geocode -> update lat/lon -> fetch
  useEffect(() => {
    if (!cityInput.trim()) return;
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(async () => {
      const info = await geocodeCityNominatim(cityInput.trim());
      if (!info) return;
      setCity(info.city);
      setStateName(info.state ?? null);
      // use bbox if provided; otherwise center coords
      if (info.bbox) {
        const [s, w, n, e] = info.bbox;
        // set center from bbox average
        const cLat = (s + n) / 2;
        const cLon = (w + e) / 2;
        setLat(cLat);
        setLon(cLon);
      } else {
        setLat(info.lat);
        setLon(info.lon);
      }
    }, 200);
    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, [cityInput]);

  // no custom consent persistence

  // Whenever lat/lon change, fetch hospitals
  useEffect(() => {
    if (lat != null && lon != null) fetchHospitals();
  }, [lat, lon, fetchHospitals]);

  const runLiveLocation = async () => {
    if (!navigator.geolocation) return;
    setLoadingLocation(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        setLat(latitude);
        setLon(longitude);
        const rev = await reverseGeocodeNominatim(latitude, longitude);
        if (rev) {
          setCity(rev.city ?? "");
          setStateName(rev.state ?? null);
          setAddress(rev.address ?? null);
          setLocationDetected(true);
          if (rev.city) setCityInput(rev.city);
        }
        setLoadingLocation(false);
      },
      () => setLoadingLocation(false),
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  // removed consent panel handlers

  // (removed: onAllowLocation / onDenyLocation from previous modal flow)

  const handleBook = (h: OsmHospital) => {
    try {
      const selected = {
        id: h.id,
        name: h.name,
        address: [h.address, h.city, h.state].filter(Boolean).join(', '),
      };
      localStorage.setItem('selectedHospital', JSON.stringify(selected));
    } catch {}
    router.push('/token-system');
  };

  const handleGetCoordsForAddress = async () => {
    const q = [street, cityInput || city, stateName ?? "", zip].filter(Boolean).join(", ");
    if (!q) return;
    try {
      const url = `https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&q=${encodeURIComponent(q)}`;
      const res = await fetch(url, { headers: { Accept: 'application/json' } });
      if (!res.ok) return;
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        const item = data[0];
        const la = parseFloat(item.lat);
        const lo = parseFloat(item.lon);
        if (!Number.isNaN(la) && !Number.isNaN(lo)) {
          setLat(la);
          setLon(lo);
          setAddress(item.display_name ?? address);
        }
      }
    } catch {}
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Your Location */}
        <Card className="border-primary-200 shadow-lg mb-8 bg-primary-50/50">
          <CardHeader>
            <div className="flex items-center gap-2 text-primary-900">
              <MapPin className="h-5 w-5 text-primary-600" />
              <CardTitle className="text-xl">Your Location</CardTitle>
            </div>
            <p className="mt-2 text-sm text-gray-600">Use live location or type a city to fetch nearby hospitals and clinics.</p>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <Button className="bg-primary-600 hover:bg-primary-700" onClick={runLiveLocation} disabled={loadingLocation}>
                <LocateFixed className="h-4 w-4 mr-2" />
                {loadingLocation ? "Getting Live Location..." : "Get Live Location"}
              </Button>
              {locationDetected && (
                <Badge variant="secondary" className="bg-gray-900 text-white">Location detected</Badge>
              )}
              <Button variant="outline" onClick={fetchHospitals} disabled={loadingHospitals || lat == null || lon == null}>
                Find Hospitals
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="street">Street Address</Label>
                <Input id="street" placeholder="e.g. CM Shaw Road" value={street} onChange={(e) => setStreet(e.target.value)} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="city">City</Label>
                <Input id="city" placeholder="e.g. Mumbai" value={cityInput} onChange={(e) => setCityInput(e.target.value)} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="state">State</Label>
                <Input id="state" placeholder="e.g. Maharashtra" value={stateName ?? ""} onChange={(e) => setStateName(e.target.value)} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="zip">ZIP Code</Label>
                <Input id="zip" placeholder="PIN" value={zip} onChange={(e) => setZip(e.target.value)} />
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 mt-4">
              <Button variant="outline" onClick={handleGetCoordsForAddress}>
                <Search className="h-4 w-4 mr-2" /> Get Coordinates for Address
              </Button>
            </div>

            <div className="mt-4 text-sm text-gray-700">
              <p className="font-medium">Detected Coordinates:</p>
              <p>Latitude: {lat ?? "-"} &nbsp;&nbsp; Longitude: {lon ?? "-"}</p>
              <p className="mt-1">Place: {[city, stateName ?? ""].filter(Boolean).join(", ") || "—"}</p>
              <p className="mt-1">Address: {address ?? "—"}</p>
            </div>
          </CardContent>
        </Card>

        <h2 className="text-2xl font-semibold text-primary-900 mb-4">Nearby Hospitals & Clinics</h2>
        {loadingHospitals ? (
          <p className="text-gray-600">Fetching hospitals…</p>
        ) : hospitals.length === 0 ? (
          <p className="text-gray-600">No hospitals found.</p>
        ) : (
          (() => {
            const groups = new Map<string, OsmHospital[]>();
            for (const h of hospitals) {
              const key = (h.area || h.city || 'Other Areas').toString();
              if (!groups.has(key)) groups.set(key, []);
              groups.get(key)!.push(h);
            }
            return (
              <div className="space-y-8">
                {Array.from(groups.entries()).map(([area, list]) => (
                  <section key={area}>
                    <h3 className="text-xl font-semibold text-primary-800 mb-3">{area}</h3>
                    <div className="space-y-4">
                      {list.map((h) => (
                        <HospitalCard
                          key={h.id}
                          data={{ id: h.id, name: h.name, address: h.address, city: h.city, state: h.state, phone: h.phone, status: h.status }}
                          onBook={() => handleBook(h)}
                        />
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            );
          })()
        )}
      </main>
      {/* custom consent panel removed as requested */}
      <Footer />
    </div>
  );
}
