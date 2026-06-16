"use client";
import { useState, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import "@/lib/i18n";
import Navbar from "@/components/Navbar";
import NewsCard from "@/components/NewsCard";
import FilterBar, { Filter } from "@/components/FilterBar";
import LaunchCountdown from "@/components/LaunchCountdown";
import TrendingChart from "@/components/TrendingChart";
import type { NewsItem } from "@/lib/fetchNews";

function getTodayKey() {
  return `astrowatch-history-${new Date().toISOString().slice(0, 10)}`;
}

export default function Home() {
  const { t, i18n } = useTranslation();
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Filter>("all");
  const [search, setSearch] = useState("");
  const [showHistory, setShowHistory] = useState(false);
  const [historyNews, setHistoryNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/news?lang=${i18n.language}`)
      .then((r) => r.json())
      .then((d) => {
        const fetched: NewsItem[] = d.news || [];
        setNews(fetched);

        // Cache to localStorage for history
        try {
          localStorage.setItem(getTodayKey(), JSON.stringify(fetched));
        } catch {}

        // Push notifications for alerts
        if (typeof window !== "undefined" && Notification.permission === "granted") {
          fetched.filter((n) => n.isAlert).forEach((n) => {
            new Notification("AstroWatch Breaking", { body: n.title, icon: "/placeholder.jpg" });
          });
        }
      })
      .finally(() => setLoading(false));
  }, [i18n.language]);

  // Load history from localStorage
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
  const today = new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });

  return (
    <div className="content min-h-screen">
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 py-12">

        {/* Hero */}
        <div className="mb-10">
          <p className="text-space-muted text-xs font-inter uppercase tracking-widest mb-4">{today}</p>
          <h1 className="font-playfair text-5xl md:text-6xl text-space-deep font-semibold leading-tight">
            Space & Beyond
          </h1>
          <p className="text-space-muted text-sm font-inter mt-2 font-light">
            Aerospace & extraterrestrial intelligence, curated daily
          </p>
          <div className="divider mt-8"></div>
        </div>

        {/* Launch Countdown */}
        <LaunchCountdown />

        <FilterBar active={filter} onChange={setFilter} search={search} onSearch={setSearch} />

        {/* History toggle */}
        <div className="mb-6">
          <button
            onClick={() => setShowHistory(!showHistory)}
            className={`text-xs px-3 py-1.5 rounded border font-inter transition-all ${
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

        {/* Trending chart */}
        {!loading && news.length > 0 && <TrendingChart news={news} />}

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

        {/* Main feed */}
        {regular.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-space-muted text-xs uppercase tracking-widest font-medium font-inter">
                Latest
              </h2>
              <span className="text-space-warm text-xs font-inter">{regular.length} stories</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {regular.map((n) => <NewsCard key={n.id} item={n} />)}
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
