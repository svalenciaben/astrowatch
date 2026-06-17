"use client";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { setiProjects, setiSignals, setiScience, type DossierItem, type Lang } from "@/lib/dossierData";

type Tab = "projects" | "signals" | "science";

const BADGE_COLORS: Record<string, string> = {
  green: "bg-emerald-50 text-emerald-700 border-emerald-200",
  blue: "bg-blue-50 text-blue-700 border-blue-200",
  amber: "bg-amber-50 text-amber-700 border-amber-200",
  gray: "bg-space-parchment text-space-muted border-space-sand",
};

function tx(item: { en: string; fr: string }, lang: Lang) {
  return lang === "fr" ? item.fr : item.en;
}

export default function SETIDossier() {
  const { i18n } = useTranslation();
  const lang = (i18n.language === "fr" ? "fr" : "en") as Lang;
  const [tab, setTab] = useState<Tab>("projects");

  const TABS = [
    { id: "projects" as Tab, en: "Active Projects", fr: "Projets actifs" },
    { id: "signals" as Tab, en: "Detected Signals", fr: "Signaux détectés" },
    { id: "science" as Tab, en: "The Science", fr: "La Science" },
  ];

  return (
    <div className="mb-12">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-xl">📡</span>
        <h2 className="font-playfair text-2xl text-space-deep font-semibold">
          {lang === "fr" ? "SETI — Recherche d'Intelligence Extraterrestre" : "SETI — Search for Extraterrestrial Intelligence"}
        </h2>
      </div>
      <p className="text-space-dim text-xs font-inter mb-6 max-w-2xl">
        {lang === "fr"
          ? "Projets actifs, les signaux les plus mystérieux jamais détectés et la science derrière la recherche de vie intelligente dans l'univers."
          : "Active projects, the most mysterious signals ever detected, and the science behind the search for intelligent life in the universe."}
      </p>

      <div className="flex gap-1 mb-8 border-b border-space-sand">
        {TABS.map((tb) => (
          <button key={tb.id} onClick={() => setTab(tb.id)}
            className={`text-xs font-inter px-4 py-2.5 border-b-2 transition-colors -mb-px ${tab === tb.id ? "border-space-et text-space-et font-medium" : "border-transparent text-space-muted hover:text-space-dim"}`}>
            {lang === "fr" ? tb.fr : tb.en}
          </button>
        ))}
      </div>

      {tab === "projects" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {setiProjects.map((p, i) => (
            <a key={i} href={p.url} target="_blank" rel="noopener noreferrer"
              className="group bg-white border border-space-sand/60 rounded-xl p-5 hover:border-space-et/30 hover:shadow-sm transition-all flex flex-col gap-3">
              <div className="flex items-start justify-between gap-2">
                {p.badge && (
                  <span className={`text-[9px] font-inter font-semibold uppercase tracking-wider px-2 py-0.5 rounded border ${BADGE_COLORS[p.badgeColor || "gray"]}`}>
                    {tx(p.badge, lang)}
                  </span>
                )}
                <span className="text-[9px] text-space-warm font-inter shrink-0">{p.date}</span>
              </div>
              <div>
                <h3 className="font-playfair font-semibold text-space-deep text-sm leading-snug group-hover:text-space-et transition-colors">
                  {tx(p.title, lang)}
                </h3>
                {p.subtitle && <p className="text-[10px] text-space-muted font-inter mt-0.5">{tx(p.subtitle, lang)}</p>}
              </div>
              <p className="text-xs text-space-dim font-inter font-light leading-relaxed flex-1">{tx(p.body, lang)}</p>
              <span className="text-[10px] text-space-et font-inter group-hover:underline">
                {lang === "fr" ? "Voir le projet →" : "View project →"}
              </span>
            </a>
          ))}
        </div>
      )}

      {tab === "signals" && (
        <div className="flex flex-col gap-4">
          {setiSignals.map((s, i) => (
            <div key={i} className="bg-white border border-space-sand/60 rounded-xl p-5 flex flex-col gap-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-playfair font-semibold text-space-deep text-base">{tx(s.title, lang)}</h3>
                  {s.subtitle && <p className="text-[10px] text-space-muted font-inter mt-0.5">📡 {tx(s.subtitle, lang)}</p>}
                </div>
                {s.badge && (
                  <span className={`text-[9px] font-inter px-2 py-0.5 rounded border ${BADGE_COLORS[s.badgeColor || "gray"]} shrink-0 ml-2`}>
                    {tx(s.badge, lang)}
                  </span>
                )}
              </div>
              <p className="text-sm text-space-dim font-inter font-light leading-relaxed">{tx(s.body, lang)}</p>
              <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-[10px] text-space-blue font-inter hover:underline self-start">
                {lang === "fr" ? "Lire l'étude →" : "Read study →"}
              </a>
            </div>
          ))}
        </div>
      )}

      {tab === "science" && (
        <div className="flex flex-col gap-4">
          {setiScience.map((s, i) => (
            <div key={i} className="bg-white border border-space-sand/60 rounded-xl p-5 flex flex-col gap-3">
              <div>
                <h3 className="font-playfair font-semibold text-space-deep text-base">{tx(s.title, lang)}</h3>
                {s.subtitle && <p className="text-[10px] text-space-muted font-inter mt-0.5">{tx(s.subtitle, lang)}</p>}
              </div>
              <p className="text-sm text-space-dim font-inter font-light leading-relaxed">{tx(s.body, lang)}</p>
              <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-[10px] text-space-blue font-inter hover:underline self-start">
                {lang === "fr" ? "En savoir plus →" : "Read more →"}
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
