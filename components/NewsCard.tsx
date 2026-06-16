"use client";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import type { NewsItem } from "@/lib/fetchNews";

export default function NewsCard({ item }: { item: NewsItem }) {
  const { t } = useTranslation();
  const [saved, setSaved] = useState(() => {
    if (typeof window === "undefined") return false;
    const favs = JSON.parse(localStorage.getItem("astrowatch-favorites") || "[]");
    return favs.some((f: NewsItem) => f.id === item.id);
  });

  const toggleSave = () => {
    const favs: NewsItem[] = JSON.parse(localStorage.getItem("astrowatch-favorites") || "[]");
    if (saved) {
      localStorage.setItem("astrowatch-favorites", JSON.stringify(favs.filter((f) => f.id !== item.id)));
    } else {
      localStorage.setItem("astrowatch-favorites", JSON.stringify([...favs, item]));
    }
    setSaved(!saved);
  };

  return (
    <article className="news-card bg-white border border-space-sand/60 rounded-lg overflow-hidden flex flex-col group">
      {/* Image */}
      <div className="relative h-44 bg-space-parchment overflow-hidden">
        {item.imageUrl && item.imageUrl !== "/placeholder.jpg" ? (
          <img
            src={item.imageUrl}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-10 h-10 rounded-full border border-space-sand flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-space-warm"></div>
            </div>
          </div>
        )}
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent"></div>
        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-1.5">
          {item.isAlert && (
            <span className="alert-badge bg-space-alert text-white text-[10px] px-2 py-0.5 rounded font-medium tracking-wide uppercase">
              Breaking
            </span>
          )}
          {item.isExtraterrestrial && (
            <span className="bg-space-et/10 border border-space-et/40 text-space-et text-[10px] px-2 py-0.5 rounded font-medium uppercase tracking-wide">
              ET
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-2.5">
          <span className="text-[10px] text-space-blue uppercase tracking-widest font-semibold">
            {item.category}
          </span>
          <span className="text-space-sand text-[10px]">·</span>
          <span className="text-[10px] text-space-muted font-inter">
            {new Date(item.publishedAt).toLocaleDateString()}
          </span>
        </div>

        <h3 className="font-playfair font-semibold text-space-deep text-sm leading-snug mb-2 line-clamp-2">
          {item.title}
        </h3>

        <p className="text-space-dim text-xs leading-relaxed mb-4 line-clamp-2 flex-1 font-inter font-light">
          {item.description}
        </p>

        <div className="flex items-center justify-between pt-3 border-t border-space-parchment">
          <span className="text-[10px] text-space-muted font-medium font-inter">{item.source}</span>
          <div className="flex gap-2">
            <button
              onClick={toggleSave}
              className={`text-[10px] px-2 py-1 rounded transition-colors font-inter ${
                saved
                  ? "text-amber-600 border border-amber-200 bg-amber-50"
                  : "text-space-muted hover:text-space-dim"
              }`}
            >
              {saved ? "Saved" : "Save"}
            </button>
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
      </div>
    </article>
  );
}
