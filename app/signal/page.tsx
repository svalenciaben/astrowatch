"use client";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";

/* ── Types ───────────────────────────────────────────────────── */
interface APOD { title: string; explanation: string; url: string; hdurl: string; date: string; media_type: string; }
interface ISSPos { latitude: number; longitude: number; timestamp: number; }
interface SpaceWeather { kp: number; observed: string; scale: string; }
interface AstroEvent { date: string; title: string; body: string; }

/* ── KP index color ──────────────────────────────────────────── */
function kpColor(kp: number) {
  if (kp < 4) return { bar: "bg-emerald-400", label: "bg-emerald-50 text-emerald-700 border-emerald-200", text: "Quiet" };
  if (kp < 6) return { bar: "bg-amber-400",   label: "bg-amber-50 text-amber-700 border-amber-200",     text: "Active" };
  return           { bar: "bg-red-500",        label: "bg-red-50 text-red-700 border-red-200",           text: "Storm" };
}

/* ── ISS Map (SVG world) ─────────────────────────────────────── */
function ISSMap({ lat, lon }: { lat: number; lon: number }) {
  const x = ((lon + 180) / 360) * 100;
  const y = ((90 - lat) / 180) * 100;
  return (
    <div className="relative w-full rounded-xl overflow-hidden border border-space-sand bg-[#0a0f1a]" style={{ paddingBottom: "50%" }}>
      <div className="absolute inset-0">
        {/* Simple SVG world outline */}
        <svg viewBox="0 0 200 100" className="w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
          <rect width="200" height="100" fill="#0a0f1a" />
          {/* Latitude grid */}
          {[20,40,60,80].map(y => <line key={y} x1="0" y1={y} x2="200" y2={y} stroke="#1a3a5c" strokeWidth="0.3" />)}
          {/* Longitude grid */}
          {[40,80,120,160].map(x => <line key={x} x1={x} y1="0" x2={x} y2="100" stroke="#1a3a5c" strokeWidth="0.3" />)}
          {/* Equator */}
          <line x1="0" y1="50" x2="200" y2="50" stroke="#2d5a9e" strokeWidth="0.5" strokeOpacity="0.5" />
        </svg>
        {/* ISS dot */}
        <div
          className="absolute"
          style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%,-50%)" }}
        >
          <div className="w-3 h-3 rounded-full bg-space-et animate-pulse" style={{ boxShadow: "0 0 8px 3px rgba(26,107,74,0.8)" }} />
        </div>
      </div>
      <div className="absolute bottom-2 left-3">
        <span className="text-[10px] text-white/40 font-inter">
          ISS · {lat.toFixed(2)}°{lat >= 0 ? "N" : "S"} {Math.abs(lon).toFixed(2)}°{lon >= 0 ? "E" : "W"}
        </span>
      </div>
    </div>
  );
}

/* ── Static astronomy events ─────────────────────────────────── */
const EVENTS_2025: AstroEvent[] = [
  { date: "2025-08-11", title: "Perseid Meteor Shower peak", body: "Up to 100 meteors/hour. Best viewed after midnight, no moon interference." },
  { date: "2025-09-07", title: "Total Lunar Eclipse", body: "Visible from Europe, Africa, Asia and the Americas. Moon enters umbra at 17:30 UTC." },
  { date: "2025-10-02", title: "Annular Solar Eclipse", body: "Annular eclipse visible across South America. Partial eclipse across a wider region." },
  { date: "2025-11-17", title: "Leonid Meteor Shower", body: "15–20 meteors/hour. Parent comet: 55P/Tempel–Tuttle." },
  { date: "2025-12-13", title: "Geminid Meteor Shower peak", body: "Best meteor shower of the year. Up to 120 meteors/hour. Parent body: asteroid 3200 Phaethon." },
  { date: "2026-02-17", title: "Close conjunction: Jupiter & Mars", body: "Jupiter and Mars appear within 0.5° of each other, visible to the naked eye." },
  { date: "2026-06-17", title: "Summer Solstice", body: "Longest day of the year in the Northern Hemisphere. Sun reaches maximum northward declination." },
];

/* ── KP bar ──────────────────────────────────────────────────── */
function KPBar({ kp }: { kp: number }) {
  const c = kpColor(kp);
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs text-space-muted font-inter">Kp index</span>
        <span className={`text-[9px] font-inter font-semibold px-2 py-0.5 rounded border ${c.label}`}>{c.text}</span>
      </div>
      <div className="w-full bg-space-parchment rounded-full h-2">
        <div className={`${c.bar} h-2 rounded-full transition-all`} style={{ width: `${(kp / 9) * 100}%` }} />
      </div>
      <div className="flex justify-between mt-1">
        <span className="text-[9px] text-space-warm font-inter">0</span>
        <span className="text-[9px] text-space-warm font-inter font-semibold">{kp.toFixed(1)}</span>
        <span className="text-[9px] text-space-warm font-inter">9</span>
      </div>
    </div>
  );
}

/* ── Page ────────────────────────────────────────────────────── */
export default function SignalPage() {
  const [apod, setApod] = useState<APOD | null>(null);
  const [iss, setIss] = useState<ISSPos | null>(null);
  const [kp, setKp] = useState<number | null>(null);
  const [loading, setLoading] = useState({ apod: true, iss: true, kp: true });

  useEffect(() => {
    // NASA APOD
    const nasaKey = process.env.NEXT_PUBLIC_NASA_API_KEY || "DEMO_KEY";
    fetch(`https://api.nasa.gov/planetary/apod?api_key=${nasaKey}`)
      .then(r => r.json())
      .then(d => setApod(d))
      .catch(() => {})
      .finally(() => setLoading(l => ({ ...l, apod: false })));

    // ISS Position
    const fetchISS = () =>
      fetch("https://api.wheretheiss.at/v1/satellites/25544")
        .then(r => r.json())
        .then(d => setIss({ latitude: d.latitude, longitude: d.longitude, timestamp: d.timestamp }))
        .catch(() => {})
        .finally(() => setLoading(l => ({ ...l, iss: false })));
    fetchISS();
    const issInterval = setInterval(fetchISS, 5000);

    // NOAA Kp index (3-day forecast)
    fetch("https://services.swpc.noaa.gov/products/noaa-planetary-k-index.json")
      .then(r => r.json())
      .then((d: string[][]) => {
        const last = d[d.length - 1];
        setKp(parseFloat(last[1]));
      })
      .catch(() => setKp(1.5))
      .finally(() => setLoading(l => ({ ...l, kp: false })));

    return () => clearInterval(issInterval);
  }, []);

  const today = new Date().toISOString().slice(0, 10);
  const upcomingEvents = EVENTS_2025
    .filter(e => e.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 4);

  return (
    <div className="content min-h-screen">
      <Navbar />
      <main className="max-w-6xl mx-auto px-6 py-12">

        {/* Hero */}
        <div className="mb-10">
          <p className="text-space-muted text-xs font-inter uppercase tracking-widest mb-3">Live Dashboard</p>
          <h1 className="font-playfair text-5xl text-space-deep font-semibold mb-2">Signal</h1>
          <p className="text-space-dim text-sm font-inter font-light">
            Real-time astronomy — APOD · ISS position · Space weather · Upcoming events
          </p>
          <div className="divider mt-8" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* APOD — 2 cols */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <div className="bg-white border border-space-sand/60 rounded-2xl overflow-hidden">
              <div className="px-5 pt-5 pb-3 border-b border-space-parchment">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-space-blue live-dot" />
                  <span className="text-xs text-space-muted font-inter uppercase tracking-widest font-medium">NASA · Astronomy Picture of the Day</span>
                  {apod && <span className="ml-auto text-[10px] text-space-warm font-inter">{apod.date}</span>}
                </div>
              </div>

              {loading.apod && (
                <div className="h-64 bg-space-parchment animate-pulse" />
              )}

              {apod && (
                <>
                  {apod.media_type === "image" && (
                    <a href={apod.hdurl || apod.url} target="_blank" rel="noopener noreferrer">
                      <img src={apod.url} alt={apod.title} className="w-full max-h-80 object-cover hover:opacity-95 transition-opacity" />
                    </a>
                  )}
                  {apod.media_type === "video" && (
                    <iframe src={apod.url} className="w-full aspect-video" allowFullScreen title={apod.title} />
                  )}
                  <div className="p-5">
                    <h2 className="font-playfair text-xl font-semibold text-space-deep mb-2">{apod.title}</h2>
                    <p className="text-sm text-space-dim font-inter font-light leading-relaxed line-clamp-4">
                      {apod.explanation}
                    </p>
                    <a
                      href={`https://apod.nasa.gov/apod/astropix.html`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] text-space-blue font-inter hover:underline mt-3 inline-block"
                    >
                      Full article on NASA →
                    </a>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-4">

            {/* ISS */}
            <div className="bg-white border border-space-sand/60 rounded-2xl overflow-hidden">
              <div className="px-4 pt-4 pb-2 border-b border-space-parchment">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-space-et live-dot" />
                  <span className="text-xs text-space-muted font-inter uppercase tracking-widest font-medium">ISS · Live Position</span>
                </div>
              </div>
              <div className="p-4">
                {loading.iss && <div className="h-32 bg-space-parchment rounded-xl animate-pulse" />}
                {iss && <ISSMap lat={iss.latitude} lon={iss.longitude} />}
                {iss && (
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <div className="bg-space-parchment rounded-lg p-2 text-center">
                      <p className="font-playfair text-base font-semibold text-space-deep">{iss.latitude.toFixed(1)}°</p>
                      <p className="text-[9px] text-space-muted font-inter uppercase">Latitude</p>
                    </div>
                    <div className="bg-space-parchment rounded-lg p-2 text-center">
                      <p className="font-playfair text-base font-semibold text-space-deep">{iss.longitude.toFixed(1)}°</p>
                      <p className="text-[9px] text-space-muted font-inter uppercase">Longitude</p>
                    </div>
                  </div>
                )}
                <p className="text-[9px] text-space-warm font-inter mt-2 text-center">Updates every 5 seconds</p>
              </div>
            </div>

            {/* Space Weather */}
            <div className="bg-white border border-space-sand/60 rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 live-dot" />
                <span className="text-xs text-space-muted font-inter uppercase tracking-widest font-medium">NOAA · Space Weather</span>
              </div>
              {loading.kp && <div className="h-16 bg-space-parchment rounded animate-pulse" />}
              {kp !== null && <KPBar kp={kp} />}
              <p className="text-[9px] text-space-warm font-inter mt-3">
                Kp &lt; 4 = quiet · 4–6 = active · &gt; 6 = geomagnetic storm
              </p>
              <a href="https://www.swpc.noaa.gov/" target="_blank" rel="noopener noreferrer"
                className="text-[10px] text-space-blue font-inter hover:underline mt-1 inline-block">
                Full forecast at NOAA →
              </a>
            </div>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="mt-8">
          <div className="flex items-center gap-2 mb-5">
            <h2 className="text-xs text-space-muted uppercase tracking-widest font-medium font-inter">Upcoming Astronomical Events</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {upcomingEvents.map((ev, i) => (
              <div key={i} className="bg-white border border-space-sand/60 rounded-xl p-4 flex flex-col gap-2">
                <p className="text-[10px] text-space-blue font-inter font-medium uppercase tracking-wider">
                  {new Date(ev.date + "T12:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </p>
                <h3 className="font-playfair font-semibold text-space-deep text-sm leading-snug">{ev.title}</h3>
                <p className="text-xs text-space-dim font-inter font-light leading-relaxed flex-1">{ev.body}</p>
              </div>
            ))}
          </div>
        </div>

        <footer className="mt-16 pt-8 border-t border-space-sand text-center">
          <p className="text-space-warm text-xs font-inter font-light">
            APOD · NASA · ISS: wheretheiss.at · Space weather: NOAA SWPC
          </p>
        </footer>
      </main>
    </div>
  );
}
