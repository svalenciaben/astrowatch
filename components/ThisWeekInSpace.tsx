"use client";
import { useMemo } from "react";
import type { NewsItem } from "@/lib/fetchNews";

interface Props {
  news: NewsItem[];
}

const CATEGORY_LABELS: Record<string, string> = {
  nasa: "NASA",
  spacex: "SpaceX",
  missions: "Missions",
  exoplanets: "Exoplanets",
  seti: "SETI",
  et: "ET",
  uap: "UAP",
  all: "Space",
};

export default function ThisWeekInSpace({ news }: Props) {
  const weekItems = useMemo(() => {
    const cutoff = Date.now() - 7 * 24 * 3600 * 1000;
    return news
      .filter(n => new Date(n.publishedAt).getTime() >= cutoff)
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  }, [news]);

  if (weekItems.length < 3) return null;

  // Group by category
  const byCategory: Record<string, NewsItem[]> = {};
  weekItems.forEach(n => {
    const cat = n.category || "all";
    if (!byCategory[cat]) byCategory[cat] = [];
    byCategory[cat].push(n);
  });

  // Top story of the week: most recent alert, or just most recent
  const topStory = weekItems.find(n => n.isAlert) || weekItems[0];

  // Top 3 categories by article count
  const topCategories = Object.entries(byCategory)
    .sort((a, b) => b[1].length - a[1].length)
    .slice(0, 3);

  // 4 highlights: one per category spread (after top story)
  const highlights = weekItems
    .filter(n => n.id !== topStory.id)
    .slice(0, 4);

  function timeAgo(d: string) {
    const h = Math.floor((Date.now() - new Date(d).getTime()) / 3600000);
    if (h < 24) return `${h}h ago`;
    return `${Math.floor(h / 24)}d ago`;
  }

  const weekRange = (() => {
    const now = new Date();
    const start = new Date(now.getTime() - 7 * 24 * 3600000);
    return `${start.toLocaleDateString("en-US", { month: "short", day: "numeric" })} – ${now.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`;
  })();

  return (
    <section className="my-12">
      {/* Header */}
      <div className="flex items-start justify-between mb-6 flex-wrap gap-2">
        <div>
          <p className="text-[10px] text-space-muted font-inter uppercase tracking-widest mb-1">{weekRange}</p>
          <h2 className="font-playfair text-2xl font-semibold text-space-deep">This Week in Space</h2>
        </div>
        <div className="flex gap-3 flex-wrap">
          {topCategories.map(([cat, items]) => (
            <div key={cat} className="flex items-center gap-1.5 bg-space-parchment border border-space-sand px-3 py-1.5 rounded-full">
              <span className="text-[10px] font-inter font-medium text-space-blue uppercase tracking-wider">{CATEGORY_LABELS[cat] ?? cat}</span>
              <span className="text-[10px] font-inter text-space-muted">{items.length}</span>
            </div>
          ))}
          <div className="flex items-center gap-1.5 bg-space-parchment border border-space-sand px-3 py-1.5 rounded-full">
            <span className="text-[10px] font-inter font-medium text-space-deep">{weekItems.length} stories</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        {/* Top story — 2 cols */}
        <a
          href={topStory.url}
          target="_blank"
          rel="noopener noreferrer"
          className="lg:col-span-2 relative rounded-2xl overflow-hidden block group min-h-[220px]"
        >
          {topStory.imageUrl && topStory.imageUrl !== "/placeholder.jpg" ? (
            <img
              src={topStory.imageUrl}
              alt={topStory.title}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-space-navy to-space-deep" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-space-navy/90 via-space-navy/30 to-transparent" />
          <div className="absolute inset-0 p-5 flex flex-col justify-end">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[9px] font-inter font-semibold uppercase tracking-widest px-2 py-0.5 rounded border bg-space-blue/20 text-space-blue border-space-blue/40">
                Top story
              </span>
              {topStory.isAlert && (
                <span className="text-[9px] font-inter font-semibold uppercase tracking-widest px-2 py-0.5 rounded border bg-space-alert/90 text-white border-transparent">
                  Breaking
                </span>
              )}
            </div>
            <h3 className="font-playfair font-semibold text-white text-base leading-snug mb-1 line-clamp-3">
              {topStory.title}
            </h3>
            <div className="flex gap-2 items-center">
              <span className="text-white/50 text-[10px] font-inter">{topStory.source}</span>
              <span className="text-white/30 text-[10px]">·</span>
              <span className="text-white/50 text-[10px] font-inter">{timeAgo(topStory.publishedAt)}</span>
            </div>
          </div>
        </a>

        {/* Highlights list — 3 cols */}
        <div className="lg:col-span-3 flex flex-col gap-3">
          {highlights.map((item, i) => (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex gap-3 items-start bg-white border border-space-sand/60 rounded-xl p-4 hover:border-space-warm transition-colors group"
            >
              <span className="text-space-sand font-inter text-sm font-light shrink-0 w-4 text-center">{i + 1}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[9px] text-space-blue font-inter font-semibold uppercase tracking-wider">
                    {CATEGORY_LABELS[item.category] ?? item.category}
                  </span>
                  <span className="text-space-sand text-[9px]">·</span>
                  <span className="text-[9px] text-space-muted font-inter">{timeAgo(item.publishedAt)}</span>
                </div>
                <h4 className="font-playfair font-semibold text-space-deep text-sm leading-snug line-clamp-2 group-hover:text-space-blue transition-colors">
                  {item.title}
                </h4>
                <p className="text-[10px] text-space-muted font-inter mt-0.5">{item.source}</p>
              </div>
              {item.imageUrl && item.imageUrl !== "/placeholder.jpg" && (
                <div className="w-14 h-14 rounded-lg overflow-hidden bg-space-parchment shrink-0">
                  <img src={item.imageUrl} alt="" className="w-full h-full object-cover" />
                </div>
              )}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
