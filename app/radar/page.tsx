"use client";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "@/lib/i18n";
import Navbar from "@/components/Navbar";
import NewsCard from "@/components/NewsCard";
import type { NewsItem } from "@/lib/fetchNews";

export default function RadarPage() {
  const { t } = useTranslation();
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/news")
      .then((r) => r.json())
      .then((d) => setNews((d.news || []).filter((n: NewsItem) => n.isExtraterrestrial)))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="content min-h-screen">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-10">
          <div className="text-6xl mb-4">👽</div>
          <h2 className="font-orbitron text-4xl font-black text-space-alien glow-green mb-2">
            {t("sections.radar")}
          </h2>
          <p className="text-slate-400 font-space">{t("sections.radarDesc")}</p>
        </div>

        {loading && (
          <div className="text-center py-20">
            <p className="text-space-alien font-space animate-pulse">Scanning the cosmos for signals... 📡</p>
          </div>
        )}

        {!loading && news.length === 0 && (
          <div className="text-center py-20 text-slate-500">
            <div className="text-5xl mb-4">🔭</div>
            <p>{t("news.noResults")}</p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {news.map((n) => <NewsCard key={n.id} item={n} />)}
        </div>
      </main>
    </div>
  );
}
