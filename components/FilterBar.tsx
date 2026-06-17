"use client";
import { useTranslation } from "react-i18next";

const FILTERS = ["all", "nasa", "missions", "exoplanets", "spacex", "uap", "seti", "et"] as const;
export type Filter = typeof FILTERS[number];

const FILTER_ICONS: Record<string, string> = {
  all: "🌌",
  nasa: "🚀",
  missions: "🛸",
  exoplanets: "🪐",
  spacex: "⚡",
  uap: "👁",
  seti: "📡",
  et: "👽",
};

const FILTER_LABELS: Record<string, string> = {
  all: "All",
  nasa: "NASA",
  missions: "Missions",
  exoplanets: "Exoplanets",
  spacex: "SpaceX",
  uap: "UAP",
  seti: "SETI",
  et: "ET Dossier",
};

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
      {/* Top row: language switcher */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        {/* Category pill filters */}
        <div className="flex gap-2 flex-wrap">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => onChange(f)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all font-inter border ${
                active === f
                  ? "bg-space-blue/10 text-space-blue border-space-blue/30"
                  : "text-space-muted hover:text-space-ink bg-white border-space-sand hover:border-space-warm"
              }`}
            >
              <span>{FILTER_ICONS[f]}</span>
              <span>{FILTER_LABELS[f]}</span>
            </button>
          ))}
        </div>

        {/* Language toggle */}
        <div className="flex items-center gap-1 bg-white border border-space-sand rounded-full p-1 shrink-0">
          <button
            onClick={() => i18n.changeLanguage("en")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all font-inter ${
              i18n.language === "en"
                ? "bg-space-deep text-white"
                : "text-space-muted hover:text-space-ink"
            }`}
          >
            🇺🇸 EN
          </button>
          <button
            onClick={() => i18n.changeLanguage("fr")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all font-inter ${
              i18n.language === "fr"
                ? "bg-space-deep text-white"
                : "text-space-muted hover:text-space-ink"
            }`}
          >
            🇫🇷 FR
          </button>
        </div>
      </div>
    </div>
  );
}
