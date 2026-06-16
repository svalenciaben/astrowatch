"use client";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function Navbar() {
  const { t, i18n } = useTranslation();

  const toggleLang = () => {
    i18n.changeLanguage(i18n.language === "en" ? "fr" : "en");
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-space-steel/40 bg-space-void/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-4">
          <div className="w-6 h-6 rounded-full bg-space-blue/20 border border-space-blue/40 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-space-blue"></div>
          </div>
          <div>
            <span className="font-playfair text-lg font-semibold text-space-white tracking-wide">
              AstroWatch
            </span>
            <span className="hidden sm:inline text-space-dim text-xs ml-3 font-inter">
              Space Intelligence
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-1">
          <Link href="/radar"
            className="px-4 py-1.5 text-sm text-space-silver hover:text-space-et transition-colors"
          >
            ET Radar
          </Link>
          <Link href="/settings"
            className="px-4 py-1.5 text-sm text-space-silver hover:text-space-white transition-colors"
          >
            Settings
          </Link>
          <button
            onClick={toggleLang}
            className="ml-2 px-3 py-1.5 text-xs text-space-dim border border-space-steel/60 rounded hover:border-space-muted transition-colors"
          >
            {i18n.language === "en" ? "EN" : "FR"}
          </button>
        </div>
      </div>
    </nav>
  );
}
