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
  const { t } = useTranslation();

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-8">
      <input
        type="text"
        value={search}
        onChange={(e) => onSearch(e.target.value)}
        placeholder="Search..."
        className="bg-white border border-space-sand rounded px-4 py-2 text-sm text-space-deep placeholder-space-warm focus:outline-none focus:border-space-warm w-full sm:w-56 font-inter"
      />
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
