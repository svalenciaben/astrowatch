"use client";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "@/lib/i18n";
import Navbar from "@/components/Navbar";
import NewsCard from "@/components/NewsCard";
import ETDossier from "@/components/ETDossier";
import type { NewsItem } from "@/lib/fetchNews";

export default function RadarPage() {
  const { i18n } = useTranslation();
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
      <main className="max-w-5xl mx-auto px-6 py-12">

        {/* Hero */}
        <div className="mb-10">
          <p className="text-space-et/60 text-xs uppercase tracking-widest font-medium font-inter mb-3">
            ET Radar
          </p>
          <h1 className="font-playfair text-5xl text-space-deep font-semibold mb-2">
            Más Allá de la Tierra
          </h1>
          <p className="text-space-dim text-sm font-inter font-light max-w-xl">
            Documentos oficiales desclasificados, testimonios bajo juramento y las teorías más rigurosas sobre inteligencia extraterrestre.
          </p>
          <div className="divider mt-8" />
        </div>

        {/* ET Dossier: docs, theories, testimonies */}
        <ETDossier />

        <div className="divider mb-10" />

        {/* Live ET news from feeds */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-space-et live-dot inline-block" />
            <h2 className="text-xs text-space-muted uppercase tracking-widest font-medium font-inter">
              Señales en Vivo
            </h2>
          </div>
          <p className="text-[11px] text-space-warm font-inter">
            Noticias recientes con palabras clave extraterrestres detectadas
          </p>
        </div>

        {loading && (
          <div className="text-center py-16">
            <p className="text-space-dim text-sm font-inter italic">Escaneando el cosmos...</p>
          </div>
        )}

        {!loading && news.length === 0 && (
          <div className="text-center py-12 text-space-muted text-sm font-inter">
            No se detectaron señales ET hoy. Vuelve pronto.
          </div>
        )}

        {!loading && news.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {news.map((n) => <NewsCard key={n.id} item={n} />)}
          </div>
        )}
      </main>
    </div>
  );
}
