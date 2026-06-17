"use client";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { etDocs, etTheories, etTestimonies, type DossierItem, type Lang } from "@/lib/dossierData";

type Tab = "docs" | "theories" | "testimonies";

const BADGE_COLORS: Record<string, string> = {
  green: "bg-emerald-50 text-emerald-700 border-emerald-200",
  blue: "bg-blue-50 text-blue-700 border-blue-200",
  amber: "bg-amber-50 text-amber-700 border-amber-200",
  gray: "bg-space-parchment text-space-muted border-space-sand",
};

function t(item: { en: string; fr: string }, lang: Lang) {
  return lang === "fr" ? item.fr : item.en;
}

function DocCard({ item, lang, accentColor }: { item: DossierItem; lang: Lang; accentColor: string }) {
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group bg-white border border-space-sand/60 rounded-xl p-5 hover:border-${accentColor}/30 hover:shadow-sm transition-all flex flex-col gap-3`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-wrap gap-1.5">
          {item.badge && (
            <span className={`text-[9px] font-inter font-semibold uppercase tracking-wider px-2 py-0.5 rounded border ${BADGE_COLORS[item.badgeColor || "gray"]}`}>
              {t(item.badge, lang)}
            </span>
          )}
        </div>
        <span className="text-[9px] text-space-warm font-inter shrink-0">{item.date}</span>
      </div>
      <div>
        <h3 className="font-playfair font-semibold text-space-deep text-sm leading-snug group-hover:text-space-et transition-colors">
          {t(item.title, lang)}
        </h3>
        {item.subtitle && <p className="text-[10px] text-space-muted font-inter mt-0.5">{t(item.subtitle, lang)}</p>}
      </div>
      <p className="text-xs text-space-dim font-inter font-light leading-relaxed flex-1">{t(item.body, lang)}</p>
      <span className="text-[10px] text-space-et font-inter group-hover:underline mt-auto">
        {lang === "fr" ? "Voir le document →" : "View document →"}
      </span>
    </a>
  );
}

export default function ETDossier() {
  const { i18n } = useTranslation();
  const lang = (i18n.language === "fr" ? "fr" : "en") as Lang;
  const [tab, setTab] = useState<Tab>("docs");

  const TABS = [
    { id: "docs" as Tab, en: "Official Documents", fr: "Documents officiels" },
    { id: "theories" as Tab, en: "Scientific Theories", fr: "Théories scientifiques" },
    { id: "testimonies" as Tab, en: "Testimonies", fr: "Témoignages" },
  ];

  return (
    <div className="mb-12">
      <div className="flex items-center gap-3 mb-4">
        <span className="w-2 h-2 rounded-full bg-space-et animate-pulse inline-block" />
        <h2 className="font-playfair text-2xl text-space-deep font-semibold">
          {lang === "fr" ? "Intelligence Extraterrestre" : "Extraterrestrial Intelligence"}
        </h2>
      </div>
      <p className="text-space-dim text-xs font-inter mb-6 max-w-2xl">
        {lang === "fr"
          ? "Documents déclassifiés du gouvernement américain, témoignages sous serment devant le Congrès et les théories les plus sérieuses de la communauté scientifique."
          : "Declassified US government documents, sworn testimonies before Congress, and the most rigorous theories from the scientific community."}
      </p>

      <div className="flex gap-1 mb-8 border-b border-space-sand">
        {TABS.map((tb) => (
          <button key={tb.id} onClick={() => setTab(tb.id)}
            className={`text-xs font-inter px-4 py-2.5 border-b-2 transition-colors -mb-px ${tab === tb.id ? "border-space-et text-space-et font-medium" : "border-transparent text-space-muted hover:text-space-dim"}`}>
            {lang === "fr" ? tb.fr : tb.en}
          </button>
        ))}
      </div>

      {tab === "docs" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {etDocs.map((doc, i) => <DocCard key={i} item={doc} lang={lang} accentColor="space-et" />)}
        </div>
      )}

      {tab === "theories" && (
        <div className="flex flex-col gap-4">
          {etTheories.map((th, i) => (
            <div key={i} className="bg-white border border-space-sand/60 rounded-xl p-5 flex flex-col gap-3">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    {th.badge && (
                      <span className={`text-[9px] font-inter font-semibold uppercase tracking-wider px-2 py-0.5 rounded border ${BADGE_COLORS[th.badgeColor || "gray"]}`}>
                        {t(th.badge, lang)}
                      </span>
                    )}
                    <span className="text-[9px] text-space-warm font-inter">{th.date}</span>
                  </div>
                  <h3 className="font-playfair font-semibold text-space-deep text-base">{t(th.title, lang)}</h3>
                  {th.subtitle && <p className="text-[10px] text-space-muted font-inter mt-0.5">{t(th.subtitle, lang)}</p>}
                </div>
              </div>
              <p className="text-sm text-space-dim font-inter font-light leading-relaxed">{t(th.body, lang)}</p>
              <a href={th.url} target="_blank" rel="noopener noreferrer" className="text-[10px] text-space-blue font-inter hover:underline self-start">
                {lang === "fr" ? "Lire l'étude originale →" : "Read original study →"}
              </a>
            </div>
          ))}
        </div>
      )}

      {tab === "testimonies" && (
        <div className="flex flex-col gap-4">
          {etTestimonies.map((te, i) => (
            <div key={i} className="bg-white border border-space-sand/60 rounded-xl p-5">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-space-parchment border border-space-sand flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-space-muted text-xs font-semibold font-inter">{t(te.title, lang).charAt(0)}</span>
                </div>
                <div className="flex-1">
                  <span className="text-sm font-inter font-semibold text-space-deep">{t(te.title, lang)}</span>
                  {te.subtitle && <p className="text-[10px] text-space-muted font-inter">{t(te.subtitle, lang)}</p>}
                  <blockquote className="text-sm text-space-dim font-inter font-light leading-relaxed italic border-l-2 border-space-et/30 pl-3 mt-2">
                    {t(te.body, lang)}
                  </blockquote>
                  <a href={te.url} target="_blank" rel="noopener noreferrer" className="text-[10px] text-space-et font-inter hover:underline mt-2 inline-block">
                    {lang === "fr" ? "Source officielle →" : "Official source →"}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
