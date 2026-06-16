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
    <article className="news-card bg-space-deep border border-space-steel/30 rounded-lg overflow-hidden flex flex-col group">
      {/* Image */}
      <div className="relative h-40 bg-space-navy overflow-hidden">
        {item.imageUrl && item.imageUrl !== "/placeholder.jpg" ? (
          <img
            src={item.imageUrl}
            alt={item.title}
            className="w-full h-full object-cover opacity-70 group-hover:opacity-80 transition-opacity"
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-8 h-8 rounded-full border border-space-steel/50 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-space-muted"></div>
            </div>
          </div>
        )}
        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-1.5">
          {item.isAlert && (
            <span className="alert-badge bg-space-alert/90 text-white text-[10px] px-2 py-0.5 rounded font-medium tracking-wide uppercase">
              Breaking
            </span>
          )}
          {item.isExtraterrestrial && (
            <span className="bg-space-et/15 border border-space-et/30 text-space-et text-[10px] px-2 py-0.5 rounded font-medium uppercase tracking-wide">
              ET
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[10px] text-space-dim uppercase tracking-widest font-medium">
            {item.category}
          </span>
          <span className="text-space-steel/40 text-[10px]">·</span>
          <span className="text-[10px] text-space-dim">
            {new Date(item.publishedAt).toLocaleDateString()}
          </span>
        </div>

        <h3 className="font-inter font-medium text-space-white text-sm leading-snug mb-2 line-clamp-2">
          {item.title}
        </h3>

        <p className="text-space-silver text-xs leading-relaxed mb-4 line-clamp-2 flex-1 font-light">
          {item.description}
        </p>

        <div className="flex items-center justify-between pt-3 border-t border-space-steel/20">
          <span className="text-[10px] text-space-dim font-medium">{item.source}</span>
          <div className="flex gap-2">
            <button
              onClick={toggleSave}
              className={`text-[10px] px-2 py-1 rounded transition-colors ${
                saved
                  ? "text-amber-400/80 border border-amber-400/20"
                  : "text-space-dim hover:text-space-silver border border-transparent"
              }`}
            >
              {saved ? "Saved" : "Save"}
            </button>
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] px-3 py-1 rounded border border-space-steel/50 text-space-silver hover:text-space-white hover:border-space-muted transition-colors"
            >
              Read
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
