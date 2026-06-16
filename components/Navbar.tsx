"use client";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function Navbar() {
  const { t } = useTranslation();

  return (
    <nav className="sticky top-0 z-50 border-b border-space-sand bg-space-cream/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-5 h-5 rounded-full border border-space-navy/30 flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-space-navy/60"></div>
          </div>
          <span className="font-playfair text-lg font-semibold text-space-deep tracking-wide">
            AstroWatch
          </span>
          <span className="hidden sm:inline text-space-muted text-xs ml-1 font-inter">
            Space Intelligence
          </span>
        </Link>

        <div className="flex items-center gap-1">
          <Link href="/radar"
            className="px-4 py-1.5 text-sm text-space-dim hover:text-space-et transition-colors font-inter"
          >
            {t("nav.radar")}
          </Link>
          <Link href="/settings"
            className="px-4 py-1.5 text-sm text-space-dim hover:text-space-deep transition-colors font-inter"
          >
            {t("nav.settings")}
          </Link>
        </div>
      </div>
    </nav>
  );
}
