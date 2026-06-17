"use client";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { etDocs, etTheories, etTestimonies, type DossierItem, type Lang } from "@/lib/dossierData";

type Tab = "docs" | "theories" | "testimonies";

const BADGE_COLORS: Record<string, string> = {
  green: "bg-emerald-900/40 text-emerald-400 border-emerald-700/50",
  blue:  "bg-blue-900/40 text-blue-300 border-blue-700/50",
  amber: "bg-amber-900/40 text-amber-300 border-amber-700/50",
  gray:  "bg-white/10 text-white/50 border-white/20",
};

function tx(item: { en: string; fr: string }, lang: Lang) {
  return lang === "fr" ? item.fr : item.en;
}

/* ── Radar SVG ─────────────────────────────────────────────────── */
function RadarOrb() {
  return (
    <div className="relative flex items-center justify-center" style={{ width: 220, height: 220 }}>
      {/* Rings */}
      {[80, 110, 140].map((r, i) => (
        <div
          key={i}
          className="absolute rounded-full border border-space-et/20"
          style={{ width: r * 2, height: r * 2 }}
        />
      ))}
      {/* Animated radar rings */}
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="radar-ring absolute"
          style={{ width: 120, height: 120 }}
        />
      ))}
      {/* Sweep */}
      <svg className="absolute inset-0 radar-sweep" width={220} height={220} viewBox="0 0 220 220">
        <defs>
          <radialGradient id="sweepGrad" cx="50%" cy="50%">
            <stop offset="0%" stopColor="#1a6b4a" stopOpacity="0" />
            <stop offset="100%" stopColor="#1a6b4a" stopOpacity="0.25" />
          </radialGradient>
        </defs>
        <path
          d="M110 110 L110 10 A100 100 0 0 1 210 110 Z"
          fill="url(#sweepGrad)"
        />
        <line x1="110" y1="110" x2="110" y2="10" stroke="#1a6b4a" strokeWidth="1" strokeOpacity="0.6" />
      </svg>
      {/* Center orb */}
      <div className="et-orb relative z-10 w-10 h-10 rounded-full bg-space-et/30 border border-space-et/60 flex items-center justify-center">
        <div className="w-3 h-3 rounded-full bg-space-et" />
      </div>
      {/* Blip dots */}
      {[
        { x: 155, y: 75,  delay: "0.5s" },
        { x: 80,  y: 150, delay: "1.8s" },
        { x: 165, y: 145, delay: "3.1s" },
      ].map((b, i) => (
        <div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full bg-space-et"
          style={{
            left: b.x,
            top: b.y,
            animation: `twinkle 2s ease-in-out ${b.delay} infinite`,
            boxShadow: "0 0 6px 2px rgba(26,107,74,0.8)",
          }}
        />
      ))}
    </div>
  );
}

/* ── Hero ──────────────────────────────────────────────────────── */
function ETHero({ lang }: { lang: Lang }) {
  return (
    <div
      className="relative w-full overflow-hidden rounded-2xl mb-10"
      style={{
        background: "linear-gradient(160deg, #060d14 0%, #0c1a2e 40%, #0a1a12 100%)",
        minHeight: 340,
      }}
    >
      {/* Starfields */}
      <div className="et-star-sm" />
      <div className="et-star-md" />
      <div className="et-star-lg" />
      {/* Scan line */}
      <div className="et-scan-line" />

      {/* Content */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between px-10 py-12 gap-8">
        <div className="flex-1 max-w-xl">
          <p className="text-space-et/70 text-[10px] uppercase tracking-[0.3em] font-inter font-medium mb-4">
            {lang === "fr" ? "Dossier classifié · Niveau Ω" : "Classified Dossier · Level Ω"}
          </p>
          <h1 className="font-playfair text-4xl md:text-5xl font-semibold text-white leading-tight mb-4">
            {lang === "fr" ? "Intelligence\nExtraterrestre" : "Extraterrestrial\nIntelligence"}
          </h1>
          <p className="text-white/40 text-sm font-inter font-light leading-relaxed max-w-sm">
            {lang === "fr"
              ? "Documents déclassifiés, témoignages sous serment et théories scientifiques sur la vie au-delà de la Terre."
              : "Declassified documents, sworn testimonies, and scientific theories on life beyond Earth."}
          </p>
          {/* Stats row */}
          <div className="flex gap-6 mt-8">
            {[
              { n: "171", label: lang === "fr" ? "cas inexpliqués" : "unexplained cases" },
              { n: "6", label: lang === "fr" ? "documents officiels" : "official documents" },
              { n: "4", label: lang === "fr" ? "témoins sous serment" : "sworn witnesses" },
            ].map((s, i) => (
              <div key={i}>
                <p className="font-playfair text-2xl font-semibold text-space-et">{s.n}</p>
                <p className="text-[10px] text-white/40 font-inter uppercase tracking-wider">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="et-radar-mobile">
          <RadarOrb />
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#0c1a2e]/60 to-transparent pointer-events-none" />
    </div>
  );
}

/* ── Card components ───────────────────────────────────────────── */
function DocCard({ item, lang, idx }: { item: DossierItem; lang: Lang; idx: number }) {
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="et-card-enter group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-5 flex flex-col gap-3 hover:border-space-et/50 hover:bg-white/8 transition-all"
      style={{ animationDelay: `${idx * 0.07}s` }}
    >
      {/* Hover glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
        style={{ background: "radial-gradient(circle at 50% 0%, rgba(26,107,74,0.12) 0%, transparent 60%)" }} />

      <div className="flex items-start justify-between gap-2">
        {item.badge && (
          <span className={`text-[9px] font-inter font-semibold uppercase tracking-wider px-2 py-0.5 rounded border ${BADGE_COLORS[item.badgeColor || "gray"]}`}>
            {tx(item.badge, lang)}
          </span>
        )}
        <span className="text-[9px] text-white/30 font-inter shrink-0">{item.date}</span>
      </div>

      <div>
        <h3 className="font-playfair font-semibold text-white text-sm leading-snug group-hover:text-space-et transition-colors">
          {tx(item.title, lang)}
        </h3>
        {item.subtitle && <p className="text-[10px] text-white/40 font-inter mt-0.5">{tx(item.subtitle, lang)}</p>}
      </div>
      <p className="text-xs text-white/60 font-inter font-light leading-relaxed flex-1">{tx(item.body, lang)}</p>
      <span className="text-[10px] text-space-et font-inter group-hover:underline mt-auto">
        {lang === "fr" ? "Voir le document →" : "View document →"}
      </span>
    </a>
  );
}

/* ── Main component ────────────────────────────────────────────── */
export default function ETDossier() {
  const { i18n } = useTranslation();
  const lang = (i18n.language === "fr" ? "fr" : "en") as Lang;
  const [tab, setTab] = useState<Tab>("docs");

  const TABS = [
    { id: "docs"        as Tab, en: "Official Documents",   fr: "Documents officiels" },
    { id: "theories"    as Tab, en: "Scientific Theories",  fr: "Théories scientifiques" },
    { id: "testimonies" as Tab, en: "Testimonies",          fr: "Témoignages" },
  ];

  return (
    <div className="mb-12">
      <ETHero lang={lang} />

      {/* Dark panel for the rest of the dossier */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{ background: "linear-gradient(180deg, #0c1a2e 0%, #080f1a 100%)" }}
      >
        {/* Tabs */}
        <div className="flex gap-1 px-6 pt-6 border-b border-white/10">
          {TABS.map((tb) => (
            <button
              key={tb.id}
              onClick={() => setTab(tb.id)}
              className={`text-xs font-inter px-4 py-2.5 border-b-2 transition-colors -mb-px ${
                tab === tb.id
                  ? "border-space-et text-space-et font-medium"
                  : "border-transparent text-white/40 hover:text-white/70"
              }`}
            >
              {lang === "fr" ? tb.fr : tb.en}
            </button>
          ))}
        </div>

        <div className="p-6">
          {/* Documents */}
          {tab === "docs" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {etDocs.map((doc, i) => <DocCard key={i} item={doc} lang={lang} idx={i} />)}
            </div>
          )}

          {/* Theories */}
          {tab === "theories" && (
            <div className="flex flex-col gap-4">
              {etTheories.map((th, i) => (
                <div
                  key={i}
                  className="et-card-enter group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-5 flex flex-col gap-3 hover:border-space-et/40 transition-all"
                  style={{ animationDelay: `${i * 0.07}s` }}
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                    style={{ background: "radial-gradient(circle at 0% 50%, rgba(26,107,74,0.1) 0%, transparent 60%)" }} />
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        {th.badge && (
                          <span className={`text-[9px] font-inter font-semibold uppercase tracking-wider px-2 py-0.5 rounded border ${BADGE_COLORS[th.badgeColor || "gray"]}`}>
                            {tx(th.badge, lang)}
                          </span>
                        )}
                        <span className="text-[9px] text-white/30 font-inter">{th.date}</span>
                      </div>
                      <h3 className="font-playfair font-semibold text-white text-base group-hover:text-space-et transition-colors">
                        {tx(th.title, lang)}
                      </h3>
                      {th.subtitle && <p className="text-[10px] text-white/40 font-inter mt-0.5">{tx(th.subtitle, lang)}</p>}
                    </div>
                  </div>
                  <p className="text-sm text-white/60 font-inter font-light leading-relaxed">{tx(th.body, lang)}</p>
                  <a href={th.url} target="_blank" rel="noopener noreferrer"
                    className="text-[10px] text-space-et font-inter hover:underline self-start">
                    {lang === "fr" ? "Lire l'étude originale →" : "Read original study →"}
                  </a>
                </div>
              ))}
            </div>
          )}

          {/* Testimonies */}
          {tab === "testimonies" && (
            <div className="flex flex-col gap-4">
              {etTestimonies.map((te, i) => (
                <div
                  key={i}
                  className="et-card-enter rounded-xl border border-white/10 bg-white/5 p-5 hover:border-space-et/40 transition-all"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-9 h-9 rounded-full bg-space-et/20 border border-space-et/40 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-space-et text-xs font-semibold font-inter">
                        {tx(te.title, lang).charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1">
                      <span className="text-sm font-inter font-semibold text-white">{tx(te.title, lang)}</span>
                      {te.subtitle && <p className="text-[10px] text-white/40 font-inter">{tx(te.subtitle, lang)}</p>}
                      <blockquote className="text-sm text-white/60 font-inter font-light leading-relaxed italic border-l-2 border-space-et/40 pl-3 mt-3">
                        {tx(te.body, lang)}
                      </blockquote>
                      <a href={te.url} target="_blank" rel="noopener noreferrer"
                        className="text-[10px] text-space-et font-inter hover:underline mt-2 inline-block">
                        {lang === "fr" ? "Source officielle →" : "Official source →"}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
