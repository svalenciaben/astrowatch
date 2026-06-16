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

        <FilterBar active={filter} onChange={setFilter} search={search} onSearch={setSearch} />

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
