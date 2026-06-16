"use client";
import { useState } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import type { NewsItem } from "@/lib/fetchNews";

export default function NewsCard({ item }: { item: NewsItem }) {
  const { t } = useTranslation();
  const [saved, setSaved] = useState(() => {
    if (typeof window === "undefined") return false;
    const favs = JSON.parse(localStorage.getItem("astrowatch-favorites") || "[]");
    return favs.some((f: NewsItem) => f.id === item.id);
  });
  const [modalOpen, setModalOpen] = useState(false);

  const toggleSave = () => {
    const favs: NewsItem[] = JSON.parse(localStorage.getItem("astrowatch-favorites") || "[]");
    if (saved) {
      localStorage.setItem("astrowatch-favorites", JSON.stringify(favs.filter((f) => f.id !== item.id)));
    } else {
      localStorage.setItem("astrowatch-favorites", JSON.stringify([...favs, item]));
    }
    setSaved(!saved);
  };

  const etScore = item.etScore ?? 0;

  return (
    <>
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
          <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap">
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
            {etScore >= 3 && (
              <span className="bg-space-et/10 border border-space-et/30 text-space-et text-[10px] px-2 py-0.5 rounded font-medium">
                ET: {etScore}/10
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
            <Link
              href={`/sources/${encodeURIComponent(item.source)}`}
              className="text-[10px] text-space-muted font-medium font-inter hover:text-space-dim hover:underline transition-colors"
            >
              {item.source}
            </Link>
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
              <button
                onClick={() => setModalOpen(true)}
                className="text-[10px] px-3 py-1 rounded border border-space-sand text-space-dim hover:border-space-warm hover:text-space-ink transition-colors font-inter"
              >
                Read →
              </button>
            </div>
          </div>
        </div>
      </article>

      {/* Reading Mode Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(26,26,46,0.45)", backdropFilter: "blur(4px)" }}
          onClick={() => setModalOpen(false)}
        >
          <div
            className="bg-space-cream max-w-lg w-full rounded-xl border border-space-sand shadow-xl p-8 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 text-space-muted hover:text-space-ink text-lg font-inter leading-none"
              aria-label="Close"
            >
              ×
            </button>

            <div className="flex items-center gap-2 mb-4">
              <span className="text-[10px] text-space-blue uppercase tracking-widest font-semibold font-inter">
                {item.category}
              </span>
              <span className="text-space-sand text-[10px]">·</span>
              <span className="text-[10px] text-space-muted font-inter">
                {new Date(item.publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
              </span>
            </div>

            <h2 className="font-playfair text-xl font-semibold text-space-deep leading-snug mb-3">
              {item.title}
            </h2>

            <p className="text-space-dim text-sm leading-relaxed font-inter font-light mb-6">
              {item.description}
            </p>

            <div className="flex items-center justify-between pt-4 border-t border-space-sand">
              <span className="text-[10px] text-space-muted font-inter">{item.source}</span>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2 rounded bg-space-deep text-white text-xs font-inter hover:bg-space-ink transition-colors"
              >
                Open full article →
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
