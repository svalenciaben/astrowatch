"use client";
import { useState, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import "@/lib/i18n";
import Navbar from "@/components/Navbar";
import NewsCard from "@/components/NewsCard";
import FilterBar, { Filter } from "@/components/FilterBar";
import LaunchCountdown from "@/components/LaunchCountdown";
import TrendingChart from "@/components/TrendingChart";
import FunFact from "@/components/FunFact";
import type { NewsItem } from "@/lib/fetchNews";

function getTodayKey() {
  return `astrowatch-history-${new Date().toISOString().slice(0, 10)}`;
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

function HeroCard({ item }: { item: NewsItem }) {
  return (
    <div className="relative h-96 rounded-2xl overflow-hidden mb-8 group">
      {/* Background image */}
      {item.imageUrl && item.imageUrl !== "/placeholder.jpg" ? (
        <img
          src={item.imageUrl}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-space-navy to-space-deep" />
      )}
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-space-navy/90 via-space-navy/40 to-transparent" />

      {/* Content overlay */}
      <div className="absolute inset-0 flex flex-col justify-end p-8">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[10px] text-space-blue bg-space-blue/20 border border-space-blue/40 uppercase tracking-widest font-semibold px-2 py-0.5 rounded font-inter">
            {item.category}
          </span>
          {item.isAlert && (
            <span className="alert-badge bg-space-alert text-white text-[10px] px-2 py-0.5 rounded font-medium tracking-wide uppercase font-inter">
              Breaking
            </span>
          )}
        </div>
        <h2 className="font-playfair text-4xl md:text-5xl font-semibold text-white leading-tight mb-3 max-w-3xl">
          {item.title}
        </h2>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-white/60 text-xs font-inter">{item.source}</span>
            <span className="text-white/40 text-xs">·</span>
            <span className="text-white/60 text-xs font-inter">{timeAgo(item.publishedAt)}</span>
          </div>
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2 rounded-full bg-white text-space-deep text-xs font-semibold font-inter hover:bg-space-cream transition-colors"
          >
            Read →
          </a>
        </div>
      </div>
    </div>
  );
}

function FeaturedCard({ item }: { item: NewsItem }) {
  return (
    <article className="news-card bg-white border border-space-sand/60 rounded-xl overflow-hidden flex flex-col group">
      <div className="relative h-52 bg-space-parchment overflow-hidden">
        {item.imageUrl && item.imageUrl !== "/placeholder.jpg" ? (
          <img
            src={item.imageUrl}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-space-parchment to-space-sand flex items-center justify-center">
            <div className="w-10 h-10 rounded-full border border-space-sand flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-space-warm" />
            </div>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-white/30 to-transparent" />
        <div className="absolute top-3 left-3 flex gap-1.5">
          {item.isAlert && (
            <span className="alert-badge bg-space-alert text-white text-[10px] px-2 py-0.5 rounded font-medium uppercase font-inter">
              Breaking
            </span>
          )}
          {(item.etScore ?? 0) >= 3 && (
            <span className="bg-space-et/10 border border-space-et/30 text-space-et text-[10px] px-2 py-0.5 rounded font-medium font-inter">
              ET {item.etScore}/10
            </span>
          )}
        </div>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[10px] text-space-blue uppercase tracking-widest font-semibold font-inter">
            {item.category}
          </span>
          <span className="text-space-sand text-[10px]">·</span>
          <span className="text-[10px] text-space-muted font-inter">{timeAgo(item.publishedAt)}</span>
        </div>
        <h3 className="font-playfair font-semibold text-space-deep text-base leading-snug mb-2 line-clamp-3 flex-1">
          {item.title}
        </h3>
        <div className="flex items-center justify-between pt-3 border-t border-space-parchment mt-auto">
          <span className="text-[10px] text-space-muted font-inter">{item.source}</span>
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] px-3 py-1 rounded border border-space-sand text-space-dim hover:border-space-warm hover:text-space-ink transition-colors font-inter"
          >
            Read →
          </a>
        </div>
      </div>
    </article>
  );
}

export default function Home() {
  const { t, i18n } = useTranslation();
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Filter>("all");
  const [search, setSearch] = useState("");
  const [showHistory, setShowHistory] = useState(false);
  const [historyNews, setHistoryNews] = useState<NewsItem[]>([]);
  const [fetchedAt, setFetchedAt] = useState<Date | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/news?lang=${i18n.language}`)
      .then((r) => r.json())
      .then((d) => {
        const fetched: NewsItem[] = d.news || [];
        setNews(fetched);
        setFetchedAt(new Date());

        try {
          localStorage.setItem(getTodayKey(), JSON.stringify(fetched));
        } catch {}

        if (typeof window !== "undefined" && Notification.permission === "granted") {
          fetched.filter((n) => n.isAlert).forEach((n) => {
            new Notification("AstroWatch Breaking", { body: n.title, icon: "/placeholder.jpg" });
          });
        }
      })
      .finally(() => setLoading(false));
  }, [i18n.language]);

  useEffect(() => {
    if (!showHistory) return;
    const allItems: NewsItem[] = [];
    const seenIds = new Set(news.map((n) => n.id));
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith("astrowatch-history-") && key !== getTodayKey()) {
          const stored = localStorage.getItem(key);
          if (stored) {
            const items: NewsItem[] = JSON.parse(stored);
            items.forEach((item) => {
              if (!seenIds.has(item.id)) {
                seenIds.add(item.id);
                allItems.push(item);
              }
            });
          }
        }
      }
    } catch {}
    setHistoryNews(allItems);
  }, [showHistory, news]);

  const sourceNews = showHistory ? [...news, ...historyNews] : news;

  const filtered = useMemo(() => {
    let items = sourceNews;
    if (filter !== "all") items = items.filter((n) => n.category === filter);
    if (search.trim()) {
      const q = search.toLowerCase();
      items = items.filter(
        (n) => n.title.toLowerCase().includes(q) || n.description.toLowerCase().includes(q)
      );
    }
    return items;
  }, [sourceNews, filter, search]);

  const alerts = filtered.filter((n) => n.isAlert);
  const regular = filtered.filter((n) => !n.isAlert);

  // Magazine layout slices (from non-alert regular news)
  const heroItem = regular[0];
  const featuredItems = regular.slice(1, 4);
  const gridItems = regular.slice(4);

  // Date display
  const now = new Date();
  const dayName = now.toLocaleDateString("en-US", { weekday: "long" });
  const monthYear = now.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

  // Minutes since fetch
  const minutesSince = fetchedAt
    ? Math.floor((Date.now() - fetchedAt.getTime()) / 60000)
    : null;

  // Ticker headlines: 3 most recent
  const tickerHeadlines = news.slice(0, 3).map((n) => n.title);

  return (
    <div className="content min-h-screen page-enter">
      <Navbar onSearch={setSearch} />
      <main className="max-w-7xl mx-auto px-6 py-10">

        {/* Elegant date header + ticker */}
        <div className="mb-8">
          <div className="flex items-baseline gap-3 mb-4">
            <span className="font-playfair text-4xl font-semibold text-space-deep">{dayName}</span>
            <span className="text-space-muted text-sm font-inter font-light">{monthYear}</span>
          </div>

          {/* Marquee ticker */}
          {tickerHeadlines.length > 0 && (
            <div className="overflow-hidden border border-space-sand/50 rounded-lg bg-white/60 py-2 px-3 mb-4">
              <div className="flex gap-0 whitespace-nowrap">
                <div className="marquee-track flex gap-8 shrink-0">
                  {[...tickerHeadlines, ...tickerHeadlines].map((h, i) => (
                    <span key={i} className="text-xs text-space-dim font-inter inline-flex items-center gap-3">
                      <span className="w-1 h-1 rounded-full bg-space-blue inline-block shrink-0" />
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="divider" />
        </div>

        {/* Fun Fact */}
        <FunFact />

        <FilterBar active={filter} onChange={setFilter} search={search} onSearch={setSearch} />

        {/* History toggle */}
        <div className="mb-6">
          <button
            onClick={() => setShowHistory(!showHistory)}
            className={`text-xs px-3 py-1.5 rounded-full border font-inter transition-all ${
              showHistory
                ? "bg-space-deep text-white border-space-deep"
                : "text-space-muted border-space-sand bg-white hover:text-space-ink"
            }`}
          >
            {showHistory ? "Hide history" : "Show history"}
          </button>
          {showHistory && historyNews.length > 0 && (
            <span className="ml-2 text-[10px] text-space-muted font-inter">
              +{historyNews.length} cached articles
            </span>
          )}
        </div>

        {loading && (
          <div className="text-center py-24">
            <p className="text-space-muted text-sm font-inter font-light italic">Fetching signals from deep space...</p>
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <div className="text-center py-24 text-space-warm text-sm font-inter">{t("news.noResults")}</div>
        )}

        {/* Alert section */}
        {alerts.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-5">
              <span className="alert-badge w-1.5 h-1.5 rounded-full bg-space-alert inline-block"></span>
              <h2 className="text-space-muted text-xs uppercase tracking-widest font-medium font-inter">
                Breaking
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {alerts.map((n) => <NewsCard key={n.id} item={n} />)}
            </div>
            <div className="divider mt-10 mb-10"></div>
          </section>
        )}

        {!loading && regular.length > 0 && (
          <>
            {/* Hero card */}
            {heroItem && <HeroCard item={heroItem} />}

            {/* Featured row: 3 columns */}
            {featuredItems.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
                {featuredItems.map((n) => <FeaturedCard key={n.id} item={n} />)}
              </div>
            )}

            {/* Live divider */}
            <div className="flex items-center gap-3 my-8">
              <div className="live-dot w-2 h-2 rounded-full bg-space-et shrink-0" />
              <span className="text-xs text-space-muted font-inter">
                {minutesSince !== null
                  ? minutesSince === 0
                    ? "Updated just now"
                    : `Updated ${minutesSince} minute${minutesSince !== 1 ? "s" : ""} ago`
                  : "Live feed"}
              </span>
              <div className="flex-1 h-px bg-gradient-to-r from-space-sand to-transparent" />
            </div>

            {/* Main grid: 3-col left + 1-col sidebar */}
            {gridItems.length > 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* News grid: takes 3 columns */}
                <div className="lg:col-span-3">
                  <div className="flex items-center justify-between mb-5">
                    <h2 className="text-space-muted text-xs uppercase tracking-widest font-medium font-inter">
                      Latest
                    </h2>
                    <span className="text-space-warm text-xs font-inter">{gridItems.length} stories</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                    {gridItems.map((n) => <NewsCard key={n.id} item={n} />)}
                  </div>
                </div>

                {/* Sidebar: 1 column */}
                <div className="lg:col-span-1 space-y-6">
                  <LaunchCountdown />
                  <TrendingChart news={news} />
                </div>
              </div>
            )}

            {/* Fallback: if fewer items, just show sidebar below */}
            {gridItems.length === 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                  <LaunchCountdown />
                </div>
                <div className="lg:col-span-1">
                  <TrendingChart news={news} />
                </div>
              </div>
            )}
          </>
        )}

        {/* If no magazine layout (e.g. filter active, all regular) */}
        {!loading && regular.length === 0 && filtered.length > 0 && (
          <section>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filtered.map((n) => <NewsCard key={n.id} item={n} />)}
            </div>
          </section>
        )}

        <footer className="mt-16 pt-8 border-t border-space-sand text-center">
          <p className="text-space-warm text-xs font-inter font-light">
            AstroWatch · Updated every 6 hours · Daily digest sent to svalenciaben@gmail.com
          </p>
        </footer>
      </main>
    </div>
  );
}
