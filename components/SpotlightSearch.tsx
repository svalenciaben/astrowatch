"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import type { NewsItem } from "@/lib/fetchNews";

interface Props {
  news: NewsItem[];
}

export default function SpotlightSearch({ news }: Props) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Cmd+K / Ctrl+K
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery("");
    }
  }, [open]);

  const results = query.trim()
    ? news.filter((n) =>
        n.title.toLowerCase().includes(query.toLowerCase()) ||
        n.description.toLowerCase().includes(query.toLowerCase()) ||
        n.source.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 8)
    : news.slice(0, 6);

  function timeAgo(d: string) {
    const h = Math.floor((Date.now() - new Date(d).getTime()) / 3600000);
    return h < 24 ? `${h}h ago` : `${Math.floor(h / 24)}d ago`;
  }

  if (!open) return (
    <button
      onClick={() => setOpen(true)}
      className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full border border-space-sand bg-white/60 text-space-muted text-xs font-inter hover:border-space-warm transition-colors"
    >
      <span>🔍</span>
      <span>Search</span>
      <kbd className="ml-1 px-1.5 py-0.5 rounded bg-space-parchment text-[10px] border border-space-sand">⌘K</kbd>
    </button>
  );

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-[12vh] px-4"
      style={{ background: "rgba(10,12,26,0.6)", backdropFilter: "blur(6px)" }}
      onClick={() => setOpen(false)}
    >
      <div
        className="w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-space-sand overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Input */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-space-sand">
          <span className="text-space-muted text-base">🔍</span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search stories, sources..."
            className="flex-1 text-sm text-space-deep placeholder-space-warm bg-transparent focus:outline-none font-inter"
          />
          <kbd
            onClick={() => setOpen(false)}
            className="px-2 py-1 rounded bg-space-parchment text-[10px] border border-space-sand text-space-muted cursor-pointer font-inter"
          >
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto divide-y divide-space-parchment">
          {results.length === 0 && (
            <p className="text-center text-space-muted text-sm font-inter py-10">No results for "{query}"</p>
          )}
          {results.map((item) => (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="flex gap-3 items-start px-5 py-4 hover:bg-space-parchment/50 transition-colors group"
            >
              {/* Thumbnail */}
              <div className="w-12 h-12 rounded-lg overflow-hidden bg-space-parchment shrink-0">
                {item.imageUrl && item.imageUrl !== "/placeholder.jpg" ? (
                  <img src={item.imageUrl} alt="" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-space-warm" />
                  </div>
                )}
              </div>
              {/* Text */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-inter font-medium text-space-deep group-hover:text-space-blue transition-colors line-clamp-1">
                  {item.title}
                </p>
                <p className="text-xs text-space-dim font-inter font-light mt-0.5 line-clamp-1">
                  {item.description}
                </p>
                <div className="flex gap-2 mt-1">
                  <span className="text-[10px] text-space-blue font-inter">{item.source}</span>
                  <span className="text-[10px] text-space-warm font-inter">·</span>
                  <span className="text-[10px] text-space-warm font-inter">{timeAgo(item.publishedAt)}</span>
                </div>
              </div>
              <span className="text-space-muted text-xs font-inter shrink-0 group-hover:text-space-blue">→</span>
            </a>
          ))}
        </div>

        {/* Footer */}
        <div className="px-5 py-2 border-t border-space-parchment bg-space-parchment/30 flex items-center gap-4">
          <span className="text-[10px] text-space-warm font-inter">{news.length} stories indexed</span>
          <span className="text-[10px] text-space-warm font-inter ml-auto">↵ open article</span>
        </div>
      </div>
    </div>
  );
}
