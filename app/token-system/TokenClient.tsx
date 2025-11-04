"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { CheckCircle, Info } from "lucide-react";

type MinimalHospital = { id?: string; name: string; address?: string; city?: string; state?: string };

export default function TokenClient({ name, id, address }: { name: string; id?: string; address?: string }) {
  const router = useRouter();
  const [selected, setSelected] = useState<MinimalHospital | null>(null);
  const [symptom, setSymptom] = useState("");
  const [emergency, setEmergency] = useState(false);
  const [status, setStatus] = useState<{
    message: string;
    token: string;
    eta: string;
    emergency: boolean;
    clinic: string;
    currentToken: string;
    queuePosition: string;
  } | null>(null);
  const [appointments, setAppointments] = useState<Array<{ token: string; clinic: string; time: string; etaMin: number; emergency: boolean }>>([]);

  useEffect(() => {
    // selected from localStorage
    let sel: MinimalHospital | null = null;
    try {
      const saved = JSON.parse(localStorage.getItem("selectedHospital") || "null");
      if (saved && typeof saved === "object" && saved.name) sel = saved as MinimalHospital;
    } catch {}
    if (!sel && name) sel = { id, name, address };
    setSelected(sel);
  }, [name, id, address]);

  // Persist selection
  useEffect(() => {
    if (selected) {
      try { localStorage.setItem("selectedHospital", JSON.stringify(selected)); } catch {}
    }
  }, [selected]);

  // Load appointments
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('appointments') || '[]');
      if (Array.isArray(saved)) setAppointments(saved);
    } catch {}
  }, []);

  const saveAppointments = (next: typeof appointments) => {
    setAppointments(next);
    try { localStorage.setItem('appointments', JSON.stringify(next)); } catch {}
  };

  const generateToken = () => {
    if (!selected) return;
    const tokenSeries = emergency ? "E" : "A";
    const tokenNum = Math.floor(Math.random() * 90) + 10; // mock
    const etaMin = emergency ? 5 : 20 + Math.floor(Math.random() * 20);
    const currentNum = tokenNum - (emergency ? 1 : 3);
    const position = emergency ? 1 : Math.max(2, Math.floor(Math.random() * 6));
    setStatus({
      message: `Your token has been successfully booked for ${selected.name}.`,
      token: `${tokenSeries}-${tokenNum}`,
      eta: `${etaMin} min`,
      emergency,
      clinic: selected.name,
      currentToken: `${tokenSeries}-${currentNum}`,
      queuePosition: `${position}${position === 1 ? "st" : position === 2 ? "nd" : position === 3 ? "rd" : "th"} in line`,
    });
    // persist appointment
    const newAppt = { token: `${tokenSeries}-${tokenNum}`, clinic: selected.name, time: new Date().toISOString(), etaMin, emergency };
    saveAppointments([newAppt, ...appointments]);
    try {
      const curr = parseInt(localStorage.getItem('upcomingAppointments') || '0', 10) || 0;
      const next = curr + 1;
      localStorage.setItem('upcomingAppointments', String(next));
      if (typeof window !== 'undefined') window.dispatchEvent(new Event('hl:appointments:update'));
    } catch {}
  };

  const markEmergency = () => {
    setEmergency(true);
    setSymptom("");
  };

  const cancelToken = () => {
    // Reset to original layout
    setStatus(null);
    setEmergency(false);
    setSymptom("");
    // remove matching appointment if present
    if (status?.token) {
      const nextList = appointments.filter(a => a.token !== status.token);
      saveAppointments(nextList);
    }
    try {
      const curr = parseInt(localStorage.getItem('upcomingAppointments') || '0', 10) || 0;
      const next = Math.max(0, curr - 1);
      localStorage.setItem('upcomingAppointments', String(next));
      if (typeof window !== 'undefined') window.dispatchEvent(new Event('hl:appointments:update'));
    } catch {}
  };

  const cancelFromList = (token: string) => {
    const nextList = appointments.filter(a => a.token !== token);
    saveAppointments(nextList);
    try {
      const curr = parseInt(localStorage.getItem('upcomingAppointments') || '0', 10) || 0;
      const next = Math.max(0, curr - 1);
      localStorage.setItem('upcomingAppointments', String(next));
      if (typeof window !== 'undefined') window.dispatchEvent(new Event('hl:appointments:update'));
    } catch {}
    if (status?.token === token) setStatus(null);
  };

  const rescheduleFromList = (token: string) => {
    const nextList = appointments.map(a => a.token === token ? { ...a, etaMin: a.etaMin + 15, time: new Date().toISOString() } : a);
    saveAppointments(nextList);
  };

  const addressLine = useMemo(() => {
    if (selected?.address) return selected.address;
    if (selected) return [selected.city, selected.state].filter(Boolean).join(", ");
    return undefined;
  }, [selected]);

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-primary-900 mb-6">Token Management System</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Book Your Token */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Book Your Token</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600 text-sm">Select your hospital and describe your symptoms to get a token.</p>
            {selected ? (
              <div className="rounded-md border border-primary-200 p-3 bg-primary-50/50">
                <p className="text-sm text-gray-600">Hospital/Clinic</p>
                <p className="text-base font-semibold text-primary-900">{selected.name}</p>
                {addressLine && <p className="text-sm text-gray-600">{addressLine}</p>}
              </div>
            ) : (
              <div className="rounded-md border border-amber-200 p-3 bg-amber-50">
                <p className="text-sm text-amber-800">No hospital selected. Please go to Find Hospitals and choose one.</p>
                <Button variant="outline" className="mt-2" onClick={() => router.push('/find-hospitals')}>Find Hospitals</Button>
              </div>
            )}

            {/* Symptoms + Emergency */}
            <div className={`space-y-2 ${emergency ? 'transition-colors' : ''}`}>
              <label className="block text-sm text-gray-700">Briefly Describe Symptoms</label>
              <textarea
                rows={4}
                className={`w-full rounded-md px-3 py-2 border ${emergency ? 'border-red-300 bg-red-50 text-red-800' : 'border-gray-300'}`}
                placeholder="e.g., Fever and body aches for 2 days"
                value={symptom}
                onChange={(e) => setSymptom(e.target.value)}
                disabled={emergency}
              />
              <div className="flex items-center gap-3">
                <Button variant="outline" onClick={markEmergency} className={emergency ? 'border-red-300 text-red-700 hover:bg-red-50' : ''}>
                  Mark as Emergency
                </Button>
                {emergency && (
                  <span className="inline-block px-2 py-1 text-xs rounded-full bg-red-100 text-red-700">Emergency mode enabled</span>
                )}
              </div>
            </div>

            <Button className="bg-primary-600 hover:bg-primary-700 text-white w-full" onClick={generateToken} disabled={!selected}>
              Generate Token
            </Button>
          </CardContent>
        </Card>

        {/* Right: Current Token Status */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Your Current Token Status</CardTitle>
          </CardHeader>
          <CardContent>
            {!status ? (
              <p className="text-gray-600">Generate a token using the form on the left to see your status here.</p>
            ) : (
              <div className="space-y-4">
                <div className="text-center">
                  <p className="text-gray-600">Your Token Number:</p>
                  <div className="text-4xl font-extrabold text-primary-900 mt-1">{status.token}</div>
                  <span className="inline-block mt-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm">Active</span>
                </div>

                <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
                  <div className="text-gray-600">Clinic:</div>
                  <div className="text-right text-gray-900 font-medium">{status.clinic}</div>

                  <div className="text-gray-600">Current Token:</div>
                  <div className="text-right text-gray-900 font-medium">{status.currentToken}</div>

                  <div className="text-gray-600">Estimated Wait:</div>
                  <div className="text-right text-indigo-600 font-semibold">{status.eta}</div>

                  <div className="text-gray-600">Queue Position:</div>
                  <div className="text-right text-gray-900 font-medium">{status.queuePosition}</div>
                </div>

                <hr className="my-2" />

                <div className="space-y-1 text-sm">
                  <div className="flex items-center gap-2 text-emerald-600">
                    <CheckCircle className="w-4 h-4" />
                    <span>SMS notifications enabled</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Info className="w-4 h-4" />
                    <span>We’ll notify you 5 minutes before your turn</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <Button className="bg-primary-600 hover:bg-primary-700 text-white">Reschedule</Button>
                  <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50" onClick={cancelToken}>Cancel Token</Button>
                </div>

                {status.emergency && <p className="text-red-600 text-sm">🔴 Emergency priority applied</p>}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Booked Appointments */}
      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Booked Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            {appointments.length === 0 ? (
              <p className="text-gray-600">No appointments booked yet.</p>
            ) : (
              <div className="space-y-3">
                {appointments.map((a) => (
                  <div key={a.token} className="flex items-center justify-between rounded-md border border-primary-100 p-3">
                    <div>
                      <p className="text-sm text-gray-600">Clinic</p>
                      <p className="font-medium text-primary-900">{a.clinic}</p>
                      <p className="text-sm text-gray-600">Token: <span className="font-semibold">{a.token}</span></p>
                      <p className="text-sm text-gray-600">ETA: <span className="font-semibold">{a.etaMin} min</span> {a.emergency && <span className="ml-2 text-red-600">🔴 Emergency</span>}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button className="bg-primary-600 hover:bg-primary-700 text-white" onClick={() => rescheduleFromList(a.token)}>Reschedule</Button>
                      <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50" onClick={() => cancelFromList(a.token)}>Cancel</Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
