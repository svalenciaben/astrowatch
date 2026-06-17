"use client";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import SpotlightSearch from "@/components/SpotlightSearch";
import type { NewsItem } from "@/lib/fetchNews";

export default function Navbar({ onSearch, news = [] }: { onSearch?: (v: string) => void; news?: NewsItem[] }) {
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
          {/* Cmd+K Spotlight */}
          <SpotlightSearch news={news} />

          <Link href="/launches"
            className="hidden md:inline nav-link px-3 py-1.5 text-sm text-space-dim hover:text-space-deep transition-colors font-inter"
          >
            Launches
          </Link>
          <Link href="/signal"
            className="hidden md:inline nav-link px-3 py-1.5 text-sm text-space-dim hover:text-space-deep transition-colors font-inter"
          >
            Signal
          </Link>
          <Link href="/favorites"
            className="hidden md:inline nav-link px-3 py-1.5 text-sm text-space-dim hover:text-space-deep transition-colors font-inter"
          >
            Favorites
          </Link>
          <Link href="/settings"
            className="nav-link px-3 py-1.5 text-sm text-space-dim hover:text-space-deep transition-colors font-inter"
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
