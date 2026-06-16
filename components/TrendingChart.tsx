"use client";
import type { NewsItem } from "@/lib/fetchNews";

export default function TrendingChart({ news }: { news: NewsItem[] }) {
  if (news.length === 0) return null;

  const counts: Record<string, number> = {};
  for (const item of news) {
    counts[item.category] = (counts[item.category] || 0) + 1;
  }

  const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  const max = sorted[0]?.[1] || 1;

  const CATEGORY_LABELS: Record<string, string> = {
    nasa: "NASA",
    spacex: "SpaceX",
    uap: "UAP / UFO",
    exoplanets: "Exoplanets",
    seti: "SETI",
    missions: "Missions",
  };

  return (
    <div className="bg-white border border-space-sand/60 rounded-lg p-5 mb-8">
      <p className="text-space-muted text-xs font-inter uppercase tracking-widest mb-4">Trending topics</p>
      <div className="space-y-3">
        {sorted.map(([cat, count]) => (
          <div key={cat} className="flex items-center gap-3">
            <span className="text-[10px] text-space-muted font-inter w-20 shrink-0">
              {CATEGORY_LABELS[cat] || cat}
            </span>
            <div className="flex-1 bg-space-parchment rounded-full h-1.5 overflow-hidden">
              <div
                className="h-full bg-space-dim rounded-full transition-all duration-500"
                style={{ width: `${(count / max) * 100}%` }}
              />
            </div>
            <span className="text-[10px] text-space-warm font-inter w-4 text-right">{count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
