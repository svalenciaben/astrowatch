"use client";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";

interface Launch {
  id: string;
  name: string;
  status: { name: string; abbrev: string };
  net: string;
  rocket: { configuration: { name: string; family: string } };
  launch_service_provider: { name: string };
  mission: { name: string; description: string; type: string } | null;
  pad: { name: string; location: { name: string } };
  vidURLs: { url: string; title: string }[];
  image: string | null;
}

function Countdown({ net }: { net: string }) {
  const [diff, setDiff] = useState(0);

  useEffect(() => {
    const update = () => setDiff(new Date(net).getTime() - Date.now());
    update();
    const t = setInterval(update, 1000);
    return () => clearInterval(t);
  }, [net]);

  if (diff <= 0) return <span className="text-space-et text-xs font-inter font-medium">Launched</span>;

  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);

  return (
    <div className="flex gap-3">
      {[{ v: d, l: "d" }, { v: h, l: "h" }, { v: m, l: "m" }, { v: s, l: "s" }].map(({ v, l }) => (
        <div key={l} className="text-center">
          <p className="font-playfair text-2xl font-semibold text-space-deep leading-none">{String(v).padStart(2, "0")}</p>
          <p className="text-[9px] text-space-muted font-inter uppercase tracking-wider">{l}</p>
        </div>
      ))}
    </div>
  );
}

const STATUS_COLOR: Record<string, string> = {
  Go: "bg-emerald-50 text-emerald-700 border-emerald-200",
  TBD: "bg-amber-50 text-amber-700 border-amber-200",
  TBC: "bg-amber-50 text-amber-700 border-amber-200",
  Success: "bg-space-parchment text-space-muted border-space-sand",
  Failure: "bg-red-50 text-red-700 border-red-200",
  Hold: "bg-orange-50 text-orange-700 border-orange-200",
};

export default function LaunchesPage() {
  const [launches, setLaunches] = useState<Launch[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("https://ll.thespacedevs.com/2.2.0/launch/upcoming/?limit=12&format=json")
      .then((r) => r.json())
      .then((d) => setLaunches(d.results || []))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="content min-h-screen">
      <Navbar />
      <main className="max-w-5xl mx-auto px-6 py-12">

        {/* Hero */}
        <div className="mb-10">
          <p className="text-space-muted text-xs font-inter uppercase tracking-widest mb-3">Launch Schedule</p>
          <h1 className="font-playfair text-5xl text-space-deep font-semibold mb-2">Upcoming Launches</h1>
          <p className="text-space-dim text-sm font-inter font-light">
            Live data from{" "}
            <a href="https://thespacedevs.com" target="_blank" rel="noopener noreferrer" className="text-space-blue hover:underline">
              The Space Devs
            </a>{" "}
            · Launch Library 2
          </p>
          <div className="divider mt-8" />
        </div>

        {loading && (
          <div className="text-center py-24">
            <p className="text-space-muted text-sm font-inter italic">Calculating trajectories...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-24 text-space-warm text-sm font-inter">
            Could not reach Launch Library API. Try again shortly.
          </div>
        )}

        <div className="flex flex-col gap-6">
          {launches.map((launch, i) => {
            const isNext = i === 0;
            const liveUrl = launch.vidURLs?.[0]?.url;
            const statusColor = STATUS_COLOR[launch.status.abbrev] || STATUS_COLOR.TBD;

            return (
              <div
                key={launch.id}
                className={`relative bg-white rounded-2xl border overflow-hidden transition-all ${
                  isNext ? "border-space-blue/40 shadow-md" : "border-space-sand/60"
                }`}
              >
                {isNext && (
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-space-blue to-transparent" />
                )}

                <div className="flex gap-0">
                  {/* Image strip */}
                  {launch.image && (
                    <div className="hidden sm:block w-28 shrink-0">
                      <img src={launch.image} alt={launch.name} className="w-full h-full object-cover" />
                    </div>
                  )}

                  <div className="flex-1 p-5">
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          {isNext && (
                            <span className="text-[9px] font-inter font-semibold uppercase tracking-wider px-2 py-0.5 rounded border bg-blue-50 text-blue-700 border-blue-200">
                              Next
                            </span>
                          )}
                          <span className={`text-[9px] font-inter font-semibold uppercase tracking-wider px-2 py-0.5 rounded border ${statusColor}`}>
                            {launch.status.name}
                          </span>
                          {launch.mission?.type && (
                            <span className="text-[9px] font-inter px-2 py-0.5 rounded border bg-space-parchment text-space-muted border-space-sand">
                              {launch.mission.type}
                            </span>
                          )}
                        </div>
                        <h2 className="font-playfair font-semibold text-space-deep text-lg leading-snug">
                          {launch.name}
                        </h2>
                        <div className="flex items-center gap-2 mt-1 flex-wrap">
                          <span className="text-xs text-space-blue font-inter">{launch.rocket.configuration.name}</span>
                          <span className="text-space-sand text-xs">·</span>
                          <span className="text-xs text-space-muted font-inter">{launch.launch_service_provider.name}</span>
                          <span className="text-space-sand text-xs">·</span>
                          <span className="text-xs text-space-muted font-inter">📍 {launch.pad.location.name}</span>
                        </div>
                        {launch.mission?.description && (
                          <p className="text-xs text-space-dim font-inter font-light mt-2 line-clamp-2 max-w-xl">
                            {launch.mission.description}
                          </p>
                        )}
                      </div>

                      {/* Countdown */}
                      <div className="shrink-0 text-right">
                        <p className="text-[9px] text-space-muted font-inter uppercase tracking-wider mb-2">
                          {new Date(launch.net).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                        </p>
                        <Countdown net={launch.net} />
                        {liveUrl && (
                          <a
                            href={liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-space-alert text-white text-[10px] font-inter font-medium hover:bg-red-700 transition-colors"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                            Live
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <footer className="mt-16 pt-8 border-t border-space-sand text-center">
          <p className="text-space-warm text-xs font-inter font-light">
            Data from{" "}
            <a href="https://thespacedevs.com" target="_blank" rel="noopener noreferrer" className="hover:underline">
              thespacedevs.com
            </a>{" "}
            · Updates every few minutes
          </p>
        </footer>
      </main>
    </div>
  );
}
