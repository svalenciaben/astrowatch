"use client";
import { useTranslation } from "react-i18next";

const FILTERS = ["all", "nasa", "spacex", "uap", "exoplanets", "seti", "missions"] as const;
export type Filter = typeof FILTERS[number];

export default function FilterBar({
  active,
  onChange,
  search,
  onSearch,
}: {
  active: Filter;
  onChange: (f: Filter) => void;
  search: string;
  onSearch: (v: string) => void;
}) {
  const { t, i18n } = useTranslation();

  return (
    <div className="flex flex-col gap-3 mb-8">
      {/* Top row: search + language */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <input
          type="text"
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Search..."
          className="bg-white border border-space-sand rounded px-4 py-2 text-sm text-space-deep placeholder-space-warm focus:outline-none focus:border-space-warm w-full sm:w-56 font-inter"
        />
        {/* Language selector */}
        <div className="flex items-center gap-1 bg-white border border-space-sand rounded p-1">
          <button
            onClick={() => i18n.changeLanguage("en")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium transition-all font-inter ${
              i18n.language === "en"
                ? "bg-space-deep text-white"
                : "text-space-muted hover:text-space-ink"
            }`}
          >
            🇺🇸 English
          </button>
          <button
            onClick={() => i18n.changeLanguage("fr")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium transition-all font-inter ${
              i18n.language === "fr"
                ? "bg-space-deep text-white"
                : "text-space-muted hover:text-space-ink"
            }`}
          >
            🇫🇷 Français
          </button>
        </div>
      </div>

      {/* Category filters */}
      <div className="flex gap-1 flex-wrap">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => onChange(f)}
            className={`px-3 py-1.5 rounded text-xs font-medium transition-all font-inter ${
              active === f
                ? "bg-space-deep text-white"
                : "text-space-muted hover:text-space-ink bg-white border border-space-sand"
            }`}
          >
            {t(`filters.${f}`)}
          </button>
        ))}
      </div>
    </div>
  );
}
