"use client";
import { useState } from "react";

type Tab = "projects" | "signals" | "science";

const PROJECTS = [
  {
    name: "Breakthrough Listen",
    org: "Breakthrough Initiatives / UC Berkeley",
    since: "2015",
    budget: "$100 millones (10 años)",
    description: "El programa SETI más ambicioso de la historia. Analiza 1 millón de estrellas cercanas, el centro galáctico y 100 galaxias externas. Usa los radiotelescopios más potentes del mundo (Green Bank, Parkes, MeerKAT).",
    status: "Activo",
    url: "https://breakthroughinitiatives.org/initiative/1",
  },
  {
    name: "SETI@home (legacy)",
    org: "UC Berkeley SETI Research Center",
    since: "1999–2020",
    budget: "Distribuido (voluntarios)",
    description: "Proyecto de computación distribuida que procesó datos de radiotelescópios usando millones de computadoras domésticas. Participaron más de 5 millones de voluntarios. Pausado en 2020 pero sus datos siguen siendo analizados.",
    status: "Pausado",
    url: "https://setiathome.berkeley.edu/",
  },
  {
    name: "Proyecto Galileo (Harvard)",
    org: "Harvard University — Prof. Avi Loeb",
    since: "2021",
    budget: "$1.7 millones",
    description: "Busca evidencia física de tecnología extraterrestre en la Tierra y el sistema solar. En 2023 recuperó esferas metálicas del fondo del océano Pacífico de composición anómala de un meteorito interestelar (IM1).",
    status: "Activo",
    url: "https://projects.iq.harvard.edu/galileo",
  },
  {
    name: "Allen Telescope Array (ATA)",
    org: "SETI Institute",
    since: "2007",
    budget: "Financiado por Paul Allen",
    description: "Conjunto de 42 antenas en California diseñado específicamente para SETI. Puede observar múltiples estrellas simultáneamente. Actualmente en fase de modernización para aumentar sensibilidad.",
    status: "Activo",
    url: "https://www.seti.org/allen-telescope-array",
  },
  {
    name: "Breakthrough Message",
    org: "Breakthrough Initiatives",
    since: "2015",
    budget: "Premio de $1 millón",
    description: "Concurso internacional para diseñar el mensaje que enviaríamos a una civilización extraterrestre. Debate ético sobre si enviar señales activas (METI) es prudente antes de recibir una respuesta.",
    status: "En evaluación",
    url: "https://breakthroughinitiatives.org/initiative/2",
  },
  {
    name: "SETI Institute — Phoenix Project",
    org: "SETI Institute",
    since: "1995–2004",
    budget: "Privado",
    description: "El programa SETI más sistemático previo a Breakthrough Listen. Observó 800 estrellas de tipo solar en un radio de 200 años luz. No detectó señales artificiales confirmadas.",
    status: "Completado",
    url: "https://www.seti.org",
  },
];

const SIGNALS = [
  {
    name: "Señal WOW!",
    date: "15 Aug 1977",
    telescope: "Big Ear, Ohio State University",
    description: "La señal más famosa en la historia de SETI. Duró 72 segundos, coincidió con la frecuencia hidrógeno (1.42 GHz) y tuvo la intensidad esperada de una señal interestelar. Nunca se repitió ni se explicó satisfactoriamente.",
    status: "Sin explicación confirmada",
    url: "https://www.bigear.org/wow.htm",
  },
  {
    name: "BLC1 — Breakthrough Listen Candidate 1",
    date: "2020 (publicado 2021)",
    telescope: "Parkes, Australia",
    description: "Señal detectada desde la dirección de Proxima Centauri a 982 MHz. Generó enorme atención mediática. Investigación posterior concluyó que era interferencia de radiofrecuencia terrestre, no de origen extraterrestre.",
    status: "Descartada (RFI)",
    url: "https://breakthroughinitiatives.org/news/24",
  },
  {
    name: "Pulso de radio rápido FRB 121102",
    date: "2012 (repetido 2016)",
    telescope: "Arecibo Observatory",
    description: "Primer FRB (Fast Radio Burst) repetitivo detectado. Los FRBs son destellos de radio de origen cosmológico. Algunas hipótesis incluyen velas de luz artificiales o magnetares. La mayoría de científicos creen son fenómenos naturales.",
    status: "Origen bajo investigación",
    url: "https://www.nature.com/articles/nature17168",
  },
  {
    name: "Señal de KIC 8462852 ('Estrella de Tabby')",
    date: "2015",
    telescope: "Kepler Space Telescope",
    description: "Estrella con oscilaciones de brillo irregulares y sin precedentes. Jason Wright (Penn State) propuso que podrían ser megaestructuras ('esferas de Dyson'). La explicación más aceptada actualmente es polvo circumstelar.",
    status: "Explicación natural más probable",
    url: "https://www.psu.edu/news/research/story/astronomers-ponder-mysterious-flickering-star/",
  },
];

const SCIENCE = [
  {
    title: "¿Qué busca SETI exactamente?",
    summary: "SETI busca tecnosignatures: señales que solo puede producir tecnología avanzada. Radio en frecuencias específicas (hidrógeno 1.42 GHz), señales láser, megaestructuras que bloqueen estrellas, calor residual de civilizaciones Tipo II/III en la escala de Kardashev.",
    url: "https://www.seti.org/seti-institute/project/details/seti-searches",
  },
  {
    title: "Escala de Kardashev",
    summary: "Propuesta en 1964 por Nikolai Kardashev. Tipo I: civilización que usa toda la energía de su planeta (~100% humanidad actual). Tipo II: usa toda la energía de su estrella (esfera de Dyson). Tipo III: usa toda la energía de su galaxia. Somos aproximadamente Tipo 0.73.",
    url: "https://www.scientificamerican.com/article/the-kardashev-scale/",
  },
  {
    title: "La Ecuación de Drake",
    summary: "Formulada por Frank Drake en 1961. Estima el número de civilizaciones con las que podríamos comunicarnos en nuestra galaxia. Las variables incluyen tasa de formación estelar, fracción de estrellas con planetas habitables, y tiempo medio de existencia de civilizaciones.",
    url: "https://www.seti.org/drake-equation-index",
  },
  {
    title: "El Gran Silencio (Paradox de Fermi)",
    summary: "Si hay miles de millones de estrellas con planetas habitables y el universo tiene 13.800 millones de años, ¿por qué no hemos detectado ninguna señal? Las respuestas van desde 'somos los primeros' hasta 'las civilizaciones avanzadas no usan radio' o 'el Gran Filtro está por delante'.",
    url: "https://www.seti.org/fermi-paradox",
  },
];

export default function SETIDossier() {
  const [tab, setTab] = useState<Tab>("projects");

  return (
    <div className="mb-12">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-xl">📡</span>
        <h2 className="font-playfair text-2xl text-space-deep font-semibold">SETI — Búsqueda de Inteligencia Extraterrestre</h2>
      </div>
      <p className="text-space-dim text-xs font-inter mb-6 max-w-2xl">
        Proyectos activos, las señales más misteriosas jamás detectadas y la ciencia detrás de la búsqueda de vida inteligente en el universo.
      </p>

      <div className="flex gap-1 mb-8 border-b border-space-sand">
        {([
          { id: "projects", label: "Proyectos Activos" },
          { id: "signals", label: "Señales Detectadas" },
          { id: "science", label: "La Ciencia" },
        ] as { id: Tab; label: string }[]).map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`text-xs font-inter px-4 py-2.5 border-b-2 transition-colors -mb-px ${
              tab === t.id
                ? "border-space-et text-space-et font-medium"
                : "border-transparent text-space-muted hover:text-space-dim"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "projects" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PROJECTS.map((p, i) => (
            <a
              key={i}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white border border-space-sand/60 rounded-xl p-5 hover:border-space-et/30 hover:shadow-sm transition-all flex flex-col gap-3"
            >
              <div className="flex items-start justify-between gap-2">
                <span className={`text-[9px] font-inter font-semibold uppercase tracking-wider px-2 py-0.5 rounded border ${
                  p.status === "Activo"
                    ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                    : p.status === "Completado"
                    ? "bg-space-parchment text-space-muted border-space-sand"
                    : "bg-amber-50 text-amber-700 border-amber-200"
                }`}>
                  {p.status}
                </span>
                <span className="text-[9px] text-space-warm font-inter shrink-0">{p.since}</span>
              </div>
              <div>
                <h3 className="font-playfair font-semibold text-space-deep text-sm leading-snug group-hover:text-space-et transition-colors">
                  {p.name}
                </h3>
                <p className="text-[10px] text-space-muted font-inter mt-0.5">{p.org} · {p.budget}</p>
              </div>
              <p className="text-xs text-space-dim font-inter font-light leading-relaxed flex-1">{p.description}</p>
              <span className="text-[10px] text-space-et font-inter group-hover:underline">Ver proyecto →</span>
            </a>
          ))}
        </div>
      )}

      {tab === "signals" && (
        <div className="flex flex-col gap-4">
          {SIGNALS.map((s, i) => (
            <div key={i} className="bg-white border border-space-sand/60 rounded-xl p-5 flex flex-col gap-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-playfair font-semibold text-space-deep text-base">{s.name}</h3>
                  <p className="text-[10px] text-space-muted font-inter mt-0.5">📡 {s.telescope} · {s.date}</p>
                </div>
                <span className="text-[9px] font-inter px-2 py-0.5 rounded border bg-amber-50 text-amber-700 border-amber-200 shrink-0 ml-2">
                  {s.status}
                </span>
              </div>
              <p className="text-sm text-space-dim font-inter font-light leading-relaxed">{s.description}</p>
              <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-[10px] text-space-blue font-inter hover:underline self-start">
                Leer estudio →
              </a>
            </div>
          ))}
        </div>
      )}

      {tab === "science" && (
        <div className="flex flex-col gap-4">
          {SCIENCE.map((s, i) => (
            <div key={i} className="bg-white border border-space-sand/60 rounded-xl p-5 flex flex-col gap-3">
              <h3 className="font-playfair font-semibold text-space-deep text-base">{s.title}</h3>
              <p className="text-sm text-space-dim font-inter font-light leading-relaxed">{s.summary}</p>
              <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-[10px] text-space-blue font-inter hover:underline self-start">
                Leer más →
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
