"use client";
import { useState, useEffect } from "react";
import "@/lib/i18n";
import Navbar from "@/components/Navbar";
import NewsCard from "@/components/NewsCard";
import type { NewsItem } from "@/lib/fetchNews";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<NewsItem[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("astrowatch-favorites");
    setFavorites(stored ? JSON.parse(stored) : []);

    const onStorage = () => {
      const s = localStorage.getItem("astrowatch-favorites");
      setFavorites(s ? JSON.parse(s) : []);
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  return (
    <div className="content min-h-screen">
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-10">
          <p className="text-space-muted text-xs font-inter uppercase tracking-widest mb-4">Your collection</p>
          <h1 className="font-playfair text-4xl md:text-5xl text-space-deep font-semibold leading-tight">
            Saved Articles
          </h1>
          <p className="text-space-muted text-sm font-inter mt-2 font-light">
            Stories you've bookmarked for later reading
          </p>
          <div className="divider mt-8"></div>
        </div>

        {favorites.length === 0 ? (
          <div className="text-center py-24">
            <div className="w-16 h-16 rounded-full border border-space-sand flex items-center justify-center mx-auto mb-6">
              <div className="w-5 h-5 rounded-full bg-space-warm/40"></div>
            </div>
            <h2 className="font-playfair text-2xl text-space-deep mb-3">No saved articles yet</h2>
            <p className="text-space-muted text-sm font-inter font-light max-w-sm mx-auto">
              When you save a story from the feed, it will appear here for easy access.
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-space-muted text-xs uppercase tracking-widest font-medium font-inter">
                Saved
              </h2>
              <span className="text-space-warm text-xs font-inter">{favorites.length} articles</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {favorites.map((n) => (
                <NewsCard key={n.id} item={n} />
              ))}
            </div>
          </>
        )}

        <footer className="mt-16 pt-8 border-t border-space-sand text-center">
          <p className="text-space-warm text-xs font-inter font-light">
            AstroWatch · Saved articles are stored locally on your device
          </p>
        </footer>
      </main>
    </div>
  );
}
