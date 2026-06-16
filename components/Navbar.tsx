"use client";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function Navbar() {
  const { t, i18n } = useTranslation();

  const toggleLang = () => {
    i18n.changeLanguage(i18n.language === "en" ? "fr" : "en");
  };

  return (
    <nav className="sticky top-0 z-50 bg-space-dark/90 backdrop-blur border-b border-space-blue/30">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <span className="text-2xl">🚀</span>
          <div>
            <h1 className="font-orbitron font-black text-xl text-space-neon glow-cyan tracking-widest">
              {t("nav.title")}
            </h1>
            <p className="text-xs text-slate-400 font-space hidden sm:block">{t("nav.tagline")}</p>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          <Link
            href="/radar"
            className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-space-alien/50 text-space-alien text-sm font-medium hover:bg-space-alien/10 transition-colors"
          >
            👽 {t("nav.radar")}
          </Link>
          <Link
            href="/settings"
            className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-space-electric/50 text-space-electric text-sm hover:bg-space-electric/10 transition-colors"
          >
            ⚙️ {t("nav.settings")}
          </Link>
          <button
            onClick={toggleLang}
            className="px-3 py-1.5 rounded-full border border-slate-600 text-slate-300 text-sm hover:border-slate-400 transition-colors"
          >
            {i18n.language === "en" ? "🇺🇸 EN" : "🇫🇷 FR"}
          </button>
        </div>
      </div>
    </nav>
  );
}
