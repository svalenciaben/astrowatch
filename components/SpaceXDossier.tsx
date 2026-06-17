"use client";
import { useTranslation } from "react-i18next";
import { spacexMissions, type Lang } from "@/lib/dossierData";

const BADGE_COLORS: Record<string, string> = {
  green: "bg-emerald-50 text-emerald-700 border-emerald-200",
  blue: "bg-blue-50 text-blue-700 border-blue-200",
  amber: "bg-amber-50 text-amber-700 border-amber-200",
  gray: "bg-space-parchment text-space-muted border-space-sand",
};

function tx(item: { en: string; fr: string }, lang: Lang) {
  return lang === "fr" ? item.fr : item.en;
}

export default function SpaceXDossier() {
  const { i18n } = useTranslation();
  const lang = (i18n.language === "fr" ? "fr" : "en") as Lang;

  return (
    <div className="mb-12">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-xl">⚡</span>
        <h2 className="font-playfair text-2xl text-space-deep font-semibold">SpaceX</h2>
      </div>
      <p className="text-space-dim text-xs font-inter mb-8 max-w-2xl">
        {lang === "fr"
          ? "Missions actives, prochains lancements et les jalons les plus importants du programme spatial privé le plus ambitieux de l'histoire."
          : "Active missions, upcoming launches, and the most important milestones of the most ambitious private space program in history."}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {spacexMissions.map((m, i) => (
          <a key={i} href={m.url} target="_blank" rel="noopener noreferrer"
            className="group bg-white border border-space-sand/60 rounded-xl p-5 hover:border-space-blue/30 hover:shadow-sm transition-all flex flex-col gap-3">
            <div className="flex items-start justify-between gap-2">
              {m.badge && (
                <span className={`text-[9px] font-inter font-semibold uppercase tracking-wider px-2 py-0.5 rounded border ${BADGE_COLORS[m.badgeColor || "gray"]}`}>
                  {tx(m.badge, lang)}
                </span>
              )}
              <span className="text-[9px] text-space-warm font-inter shrink-0">{m.date}</span>
            </div>
            <div>
              <h3 className="font-playfair font-semibold text-space-deep text-sm leading-snug group-hover:text-space-blue transition-colors">
                {tx(m.title, lang)}
              </h3>
              {m.subtitle && <p className="text-[10px] text-space-muted font-inter mt-0.5">{tx(m.subtitle, lang)}</p>}
            </div>
            <p className="text-xs text-space-dim font-inter font-light leading-relaxed flex-1">{tx(m.body, lang)}</p>
            <span className="text-[10px] text-space-blue font-inter group-hover:underline">
              {lang === "fr" ? "Voir la mission →" : "View mission →"}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
