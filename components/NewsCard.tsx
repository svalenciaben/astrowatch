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
    <article className="news-card bg-space-dark border border-space-blue/20 rounded-xl overflow-hidden flex flex-col">
      {/* Image */}
      <div className="relative h-44 bg-slate-900 overflow-hidden">
        {item.imageUrl && item.imageUrl !== "/placeholder.jpg" ? (
          <img
            src={item.imageUrl}
            alt={item.title}
            className="w-full h-full object-cover opacity-80"
            onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.jpg"; }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-5xl">
            {item.isExtraterrestrial ? "👽" : "🚀"}
          </div>
        )}
        {/* Badges */}
        <div className="absolute top-2 left-2 flex gap-1">
          {item.isAlert && (
            <span className="alert-badge bg-red-600 text-white text-xs px-2 py-0.5 rounded-full font-bold">
              🚨 {t("sections.alert")}
            </span>
          )}
          {item.isExtraterrestrial && (
            <span className="bg-green-900/80 border border-green-400/50 text-green-300 text-xs px-2 py-0.5 rounded-full">
              👽 ET
            </span>
          )}
        </div>
        <span className="absolute top-2 right-2 bg-slate-900/80 text-slate-300 text-xs px-2 py-0.5 rounded-full">
          {item.category.toUpperCase()}
        </span>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-space font-semibold text-white text-sm leading-snug mb-2 line-clamp-2">
          {item.title}
        </h3>
        <p className="text-slate-400 text-xs leading-relaxed mb-3 line-clamp-3 flex-1">
          {item.description}
        </p>
        <div className="flex items-center justify-between mt-auto pt-2 border-t border-slate-700/50">
          <div>
            <span className="text-space-electric text-xs font-medium">{item.source}</span>
            <span className="text-slate-500 text-xs ml-2">
              {new Date(item.publishedAt).toLocaleDateString()}
            </span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={toggleSave}
              className={`text-xs px-2 py-1 rounded border transition-colors ${
                saved
                  ? "border-yellow-500/50 text-yellow-400 bg-yellow-500/10"
                  : "border-slate-600 text-slate-400 hover:border-slate-400"
              }`}
            >
              {saved ? `★ ${t("news.saved")}` : `☆ ${t("news.save")}`}
            </button>
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs px-2 py-1 rounded border border-space-electric/50 text-space-electric hover:bg-space-electric/10 transition-colors"
            >
              {t("news.readMore")} →
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
