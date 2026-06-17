"use client";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { uapCases, uapReports, uapTimeline, type DossierItem, type Lang } from "@/lib/dossierData";

type Tab = "cases" | "reports" | "timeline";

const BADGE_COLORS: Record<string, string> = {
  green: "bg-emerald-50 text-emerald-700 border-emerald-200",
  blue: "bg-blue-50 text-blue-700 border-blue-200",
  amber: "bg-amber-50 text-amber-700 border-amber-200",
  gray: "bg-space-parchment text-space-muted border-space-sand",
};

function tx(item: { en: string; fr: string }, lang: Lang) {
  return lang === "fr" ? item.fr : item.en;
}

export default function UAPDossier() {
  const { i18n } = useTranslation();
  const lang = (i18n.language === "fr" ? "fr" : "en") as Lang;
  const [tab, setTab] = useState<Tab>("cases");

  const TABS = [
    { id: "cases" as Tab, en: "Documented Cases", fr: "Cas documentés" },
    { id: "reports" as Tab, en: "Official Reports", fr: "Rapports officiels" },
    { id: "timeline" as Tab, en: "Timeline", fr: "Chronologie" },
  ];

  return (
    <div className="mb-12">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-xl">👁</span>
        <h2 className="font-playfair text-2xl text-space-deep font-semibold">
          {lang === "fr" ? "FANI — Phénomènes Aériens Non Identifiés" : "UAP — Unidentified Aerial Phenomena"}
        </h2>
      </div>
      <p className="text-space-dim text-xs font-inter mb-6 max-w-2xl">
        {lang === "fr"
          ? "Les cas les mieux documentés, les rapports officiels du Congrès et du Pentagone, et la chronologie complète de l'étude gouvernementale des FANI."
          : "The best-documented cases, official reports from Congress and the Pentagon, and the full timeline of government UAP study."}
      </p>

      <div className="flex gap-1 mb-8 border-b border-space-sand">
        {TABS.map((tb) => (
          <button key={tb.id} onClick={() => setTab(tb.id)}
            className={`text-xs font-inter px-4 py-2.5 border-b-2 transition-colors -mb-px ${tab === tb.id ? "border-space-blue text-space-blue font-medium" : "border-transparent text-space-muted hover:text-space-dim"}`}>
            {lang === "fr" ? tb.fr : tb.en}
          </button>
        ))}
      </div>

      {tab === "cases" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {uapCases.map((c, i) => (
            <a key={i} href={c.url} target="_blank" rel="noopener noreferrer"
              className="group bg-white border border-space-sand/60 rounded-xl p-5 hover:border-space-blue/30 hover:shadow-sm transition-all flex flex-col gap-3">
              <div className="flex items-start justify-between gap-2">
                {c.badge && (
                  <span className={`text-[9px] font-inter font-semibold uppercase tracking-wider px-2 py-0.5 rounded border ${BADGE_COLORS[c.badgeColor || "gray"]}`}>
                    {tx(c.badge, lang)}
                  </span>
                )}
                <span className="text-[9px] text-space-warm font-inter shrink-0">{c.date}</span>
              </div>
              <h3 className="font-playfair font-semibold text-space-deep text-sm leading-snug group-hover:text-space-blue transition-colors">
                {tx(c.title, lang)}
              </h3>
              {c.subtitle && <p className="text-[10px] text-space-muted font-inter">📍 {tx(c.subtitle, lang)}</p>}
              <p className="text-xs text-space-dim font-inter font-light leading-relaxed flex-1">{tx(c.body, lang)}</p>
              <span className="text-[10px] text-space-blue font-inter group-hover:underline">
                {lang === "fr" ? "Voir la source →" : "View source →"}
              </span>
            </a>
          ))}
        </div>
      )}

      {tab === "reports" && (
        <div className="flex flex-col gap-4">
          {uapReports.map((r, i) => (
            <div key={i} className="bg-white border border-space-sand/60 rounded-xl p-5 flex flex-col gap-3">
              <div>
                <h3 className="font-playfair font-semibold text-space-deep text-base">{tx(r.title, lang)}</h3>
                {r.subtitle && <p className="text-[10px] text-space-muted font-inter mt-0.5">{tx(r.subtitle, lang)} · {r.date}</p>}
              </div>
              <p className="text-sm text-space-dim font-inter font-light leading-relaxed">{tx(r.body, lang)}</p>
              <a href={r.url} target="_blank" rel="noopener noreferrer" className="text-[10px] text-space-blue font-inter hover:underline self-start">
                {lang === "fr" ? "Lire le rapport officiel →" : "Read official report →"}
              </a>
            </div>
          ))}
        </div>
      )}

      {tab === "timeline" && (
        <div className="relative pl-6 border-l border-space-sand flex flex-col gap-5">
          {uapTimeline.map((t, i) => (
            <div key={i} className="relative">
              <span className="absolute -left-[25px] w-3 h-3 rounded-full bg-white border-2 border-space-blue top-0.5" />
              <span className="text-xs font-inter font-semibold text-space-blue">{t.year}</span>
              <p className="text-sm text-space-dim font-inter font-light leading-relaxed mt-0.5">
                {lang === "fr" ? t.fr : t.en}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
