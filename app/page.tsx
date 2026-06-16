"use client";
import { useState, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import "@/lib/i18n";
import Navbar from "@/components/Navbar";
import NewsCard from "@/components/NewsCard";
import FilterBar, { Filter } from "@/components/FilterBar";
import type { NewsItem } from "@/lib/fetchNews";

export default function Home() {
  const { t } = useTranslation();
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Filter>("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/news")
      .then((r) => r.json())
      .then((d) => setNews(d.news || []))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    let items = news;
    if (filter !== "all") items = items.filter((n) => n.category === filter);
    if (search.trim()) {
      const q = search.toLowerCase();
      items = items.filter(
        (n) => n.title.toLowerCase().includes(q) || n.description.toLowerCase().includes(q)
      );
    }
    return items;
  }, [news, filter, search]);

  const alerts = filtered.filter((n) => n.isAlert);
  const regular = filtered.filter((n) => !n.isAlert);

  return (
    <div className="content min-h-screen">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero */}
        <div className="text-center mb-10">
          <h2 className="font-orbitron text-4xl md:text-5xl font-black text-space-neon glow-cyan mb-2">
            SPACE INTELLIGENCE
          </h2>
          <p className="text-slate-400 font-space">{t("nav.tagline")}</p>
        </div>

        <FilterBar active={filter} onChange={setFilter} search={search} onSearch={setSearch} />

        {loading && (
          <div className="text-center py-20">
            <div className="text-4xl mb-4">🛸</div>
            <p className="text-space-neon font-space animate-pulse">{t("news.loading")}</p>
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <div className="text-center py-20 text-slate-500">{t("news.noResults")}</div>
        )}

        {/* Alert section */}
        {alerts.length > 0 && (
          <section className="mb-10">
            <h2 className="font-orbitron text-red-400 text-sm font-bold tracking-widest mb-4 flex items-center gap-2">
              <span className="alert-badge">🚨</span> {t("sections.alert")}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {alerts.map((n) => <NewsCard key={n.id} item={n} />)}
            </div>
          </section>
        )}

        {/* Main feed */}
        {regular.length > 0 && (
          <section>
            <h2 className="font-orbitron text-space-neon text-sm font-bold tracking-widest mb-4">
              📡 {t("sections.top")}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {regular.map((n) => <NewsCard key={n.id} item={n} />)}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
