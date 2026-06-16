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
    <div className="flex flex-col sm:flex-row gap-3 mb-6">
      {/* Search */}
      <input
        type="text"
        value={search}
        onChange={(e) => onSearch(e.target.value)}
        placeholder="🔍 Search..."
        className="bg-space-dark border border-space-blue/30 rounded-lg px-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-space-electric w-full sm:w-64"
      />
      {/* Category filters */}
      <div className="flex gap-2 flex-wrap">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => onChange(f)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
              active === f
                ? "bg-space-electric border-space-electric text-white"
                : "border-slate-600 text-slate-400 hover:border-slate-400 hover:text-slate-200"
            }`}
          >
            {t(`filters.${f}`)}
          </button>
        ))}
      </div>
    </div>
  );
}
