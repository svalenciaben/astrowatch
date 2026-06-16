"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import "@/lib/i18n";
import Navbar from "@/components/Navbar";
import NewsCard from "@/components/NewsCard";
import type { NewsItem } from "@/lib/fetchNews";

export default function SourcePage() {
  const params = useParams();
  const sourceName = decodeURIComponent(params.source as string);
  const [articles, setArticles] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/news?lang=en`)
      .then((r) => r.json())
      .then((d) => {
        const all: NewsItem[] = d.news || [];
        setArticles(all.filter((n) => n.source === sourceName));
      })
      .finally(() => setLoading(false));
  }, [sourceName]);

  return (
    <div className="content min-h-screen">
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-10">
          <p className="text-space-muted text-xs font-inter uppercase tracking-widest mb-4">Source profile</p>
          <h1 className="font-playfair text-4xl md:text-5xl text-space-deep font-semibold leading-tight">
            {sourceName}
          </h1>
          <p className="text-space-muted text-sm font-inter mt-2 font-light">
            All articles from this source
          </p>
          <div className="divider mt-8"></div>
        </div>

        {loading && (
          <div className="text-center py-24">
            <p className="text-space-muted text-sm font-inter font-light italic">Loading articles...</p>
          </div>
        )}

        {!loading && articles.length === 0 && (
          <div className="text-center py-24">
            <p className="text-space-warm text-sm font-inter">No articles found from this source.</p>
          </div>
        )}

        {!loading && articles.length > 0 && (
          <>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-space-muted text-xs uppercase tracking-widest font-medium font-inter">Articles</h2>
              <span className="text-space-warm text-xs font-inter">{articles.length} stories</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {articles.map((n) => (
                <NewsCard key={n.id} item={n} />
              ))}
            </div>
          </>
        )}

        <footer className="mt-16 pt-8 border-t border-space-sand text-center">
          <p className="text-space-warm text-xs font-inter font-light">
            AstroWatch · Source profile for {sourceName}
          </p>
        </footer>
      </main>
    </div>
  );
}
