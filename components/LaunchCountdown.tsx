"use client";
import { useState, useEffect } from "react";

interface Launch {
  id: string;
  name: string;
  net: string; // NET = "No Earlier Than" ISO date
  status: { name: string };
  launch_service_provider: { name: string };
}

function getCountdown(dateStr: string) {
  const now = Date.now();
  const target = new Date(dateStr).getTime();
  const diff = target - now;
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, past: true };
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  return { days, hours, minutes, past: false };
}

export default function LaunchCountdown() {
  const [launches, setLaunches] = useState<Launch[]>([]);
  const [tick, setTick] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://ll.thespacedevs.com/2.2.0/launch/upcoming/?limit=3&format=json")
      .then((r) => r.json())
      .then((d) => setLaunches(d.results || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 30000);
    return () => clearInterval(id);
  }, []);

  if (loading) {
    return (
      <div className="mb-4">
        <p className="text-space-muted text-xs uppercase tracking-widest font-inter mb-4">Next launches</p>
        <p className="text-space-warm text-sm font-inter font-light italic">Scanning launch manifest...</p>
      </div>
    );
  }

  if (launches.length === 0) return null;

  return (
    <div className="mb-4">
      <p className="text-space-muted text-xs font-inter uppercase tracking-widest mb-4">Next launches</p>
      <div className="grid grid-cols-1 gap-3">
        {launches.map((launch) => {
          const cd = getCountdown(launch.net);
          return (
            <div
              key={launch.id}
              className="bg-white border border-space-sand/60 rounded-lg p-4"
            >
              <p className="text-[10px] text-space-blue uppercase tracking-widest font-semibold font-inter mb-1">
                {launch.launch_service_provider?.name || "Unknown"}
              </p>
              <h3 className="font-playfair font-semibold text-space-deep text-sm leading-snug mb-3 line-clamp-2">
                {launch.name}
              </h3>
              {cd.past ? (
                <p className="text-space-muted text-xs font-inter">Launched</p>
              ) : (
                <div className="flex gap-3">
                  <div className="text-center">
                    <p className="font-playfair text-2xl font-semibold text-space-deep">{cd.days}</p>
                    <p className="text-[9px] text-space-muted uppercase tracking-widest font-inter">days</p>
                  </div>
                  <div className="text-space-sand self-center font-inter text-lg">:</div>
                  <div className="text-center">
                    <p className="font-playfair text-2xl font-semibold text-space-deep">{String(cd.hours).padStart(2, "0")}</p>
                    <p className="text-[9px] text-space-muted uppercase tracking-widest font-inter">hrs</p>
                  </div>
                  <div className="text-space-sand self-center font-inter text-lg">:</div>
                  <div className="text-center">
                    <p className="font-playfair text-2xl font-semibold text-space-deep">{String(cd.minutes).padStart(2, "0")}</p>
                    <p className="text-[9px] text-space-muted uppercase tracking-widest font-inter">min</p>
                  </div>
                </div>
              )}
              <p className="text-[10px] text-space-muted font-inter mt-3">
                {new Date(launch.net).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
