"use client";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "@/lib/i18n";
import Navbar from "@/components/Navbar";
import NewsCard from "@/components/NewsCard";
import type { NewsItem } from "@/lib/fetchNews";

export default function RadarPage() {
  const { t, i18n } = useTranslation();
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/news?lang=${i18n.language}`)
      .then((r) => r.json())
      .then((d) => setNews((d.news || []).filter((n: NewsItem) => n.isExtraterrestrial)))
      .finally(() => setLoading(false));
  }, [i18n.language]);

  return (
    <div className="content min-h-screen">
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12">
          <p className="text-space-et/60 text-xs uppercase tracking-widest font-medium mb-3">
            ET Radar
          </p>
          <h1 className="font-playfair text-4xl text-space-white font-semibold mb-2">
            Extraterrestrial Intelligence
          </h1>
          <p className="text-space-dim text-sm">Stories related to life beyond Earth</p>
          <div className="divider mt-6"></div>
        </div>

        {loading && (
          <div className="text-center py-24">
            <p className="text-space-dim text-sm">Scanning the cosmos...</p>
          </div>
        )}

        {!loading && news.length === 0 && (
          <div className="text-center py-24 text-space-muted text-sm">No ET signals detected today.</div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {news.map((n) => <NewsCard key={n.id} item={n} />)}
        </div>
      </main>
    </div>
  );
}
