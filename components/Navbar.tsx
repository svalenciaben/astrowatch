"use client";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";

export default function Navbar({ onSearch }: { onSearch?: (v: string) => void }) {
  const { t } = useTranslation();
  const [dark, setDark] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const stored = localStorage.getItem("astrowatch-theme");
    if (stored === "dark") {
      setDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  useEffect(() => {
    if (searchOpen && searchRef.current) {
      searchRef.current.focus();
    }
  }, [searchOpen]);

  const toggleDark = () => {
    const next = !dark;
    setDark(next);
    if (next) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("astrowatch-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("astrowatch-theme", "light");
    }
  };

  const handleSearch = (v: string) => {
    setSearchValue(v);
    onSearch?.(v);
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-space-sand bg-space-cream/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3 shrink-0">
          {/* Animated orbit logo */}
          <div className="relative w-6 h-6">
            <div className="w-6 h-6 rounded-full border border-space-navy/30 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-space-navy/60"></div>
            </div>
            <div
              className="absolute top-0.5 right-0.5 w-1.5 h-1.5 rounded-full bg-space-blue"
              style={{
                animation: "orbit 3s linear infinite",
              }}
            />
          </div>
          <span className="font-playfair text-xl font-semibold text-space-deep tracking-wide">
            AstroWatch
          </span>
          <span className="hidden sm:inline text-space-muted text-xs ml-1 font-inter">
            Space Intelligence
          </span>
        </Link>

        <div className="flex items-center gap-1">
          {/* Search bar */}
          <div className="flex items-center gap-2">
            {searchOpen && (
              <input
                ref={searchRef}
                type="text"
                value={searchValue}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search stories..."
                className="bg-white border border-space-sand rounded-full px-4 py-1.5 text-sm text-space-deep placeholder-space-warm focus:outline-none focus:border-space-blue transition-all w-48 font-inter"
                onBlur={() => {
                  if (!searchValue) setSearchOpen(false);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Escape") {
                    setSearchOpen(false);
                    handleSearch("");
                  }
                }}
              />
            )}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="Search"
              className="w-8 h-8 flex items-center justify-center rounded-full border border-space-sand text-space-muted hover:text-space-ink hover:border-space-warm transition-colors text-sm"
            >
              🔍
            </button>
          </div>

          <Link href="/favorites"
            className="nav-link px-4 py-1.5 text-sm text-space-dim hover:text-space-deep transition-colors font-inter"
          >
            Favorites
          </Link>
          <Link href="/radar"
            className="nav-link px-4 py-1.5 text-sm text-space-dim hover:text-space-et transition-colors font-inter"
          >
            {t("nav.radar")}
          </Link>
          <Link href="/settings"
            className="nav-link px-4 py-1.5 text-sm text-space-dim hover:text-space-deep transition-colors font-inter"
          >
            {t("nav.settings")}
          </Link>
          <button
            onClick={toggleDark}
            aria-label="Toggle dark mode"
            className="ml-2 w-8 h-8 flex items-center justify-center rounded-full border border-space-sand text-space-muted hover:text-space-ink transition-colors text-base"
          >
            {dark ? "☀️" : "🌙"}
          </button>
        </div>
      </div>
      {/* Bottom gradient accent */}
      <div className="h-px bg-gradient-to-r from-transparent via-space-blue/20 to-transparent" />

      <style>{`
        @keyframes orbit {
          from { transform: rotate(0deg) translateX(8px) rotate(0deg); }
          to { transform: rotate(360deg) translateX(8px) rotate(-360deg); }
        }
      `}</style>
    </nav>
  );
}
