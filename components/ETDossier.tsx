"use client";
import { useState } from "react";

type Tab = "docs" | "theories" | "testimonies";

interface DocItem {
  title: string;
  year: string;
  agency: string;
  summary: string;
  url: string;
  classification: string;
  type: "pdf" | "report" | "hearing";
}

interface TheoryItem {
  title: string;
  author: string;
  institution: string;
  year: string;
  summary: string;
  url: string;
  credibility: "high" | "medium";
}

interface TestimonyItem {
  name: string;
  role: string;
  year: string;
  quote: string;
  url: string;
}

const DECLASSIFIED_DOCS: DocItem[] = [
  {
    title: "AARO Historical Record Report Vol. 1",
    year: "2024",
    agency: "DoD / AARO",
    classification: "Desclasificado",
    type: "report",
    summary: "El informe oficial más completo del Departamento de Defensa sobre UAP desde 1945 hasta 2023. Concluye que no hay evidencia de origen extraterrestre en los casos estudiados, pero reconoce 171 casos sin explicación.",
    url: "https://www.aaro.mil/Portals/136/PDFs/AARO_Historical_Record_Report_Vol1_2024.pdf",
  },
  {
    title: "UAP Report al Congreso — ODNI 2021",
    year: "2021",
    agency: "ODNI / Director Nacional de Inteligencia",
    classification: "Parcialmente desclasificado",
    type: "report",
    summary: "El primer informe oficial del gobierno sobre UAP mandado por el Congreso. Analiza 144 incidentes reportados por militares entre 2004–2021. 143 siguen sin explicación. Admite 5 categorías de objetos.",
    url: "https://www.dni.gov/files/ODNI/documents/assessments/Prelimary-Assessment-UAP-20210625.pdf",
  },
  {
    title: "Audiencias del Congreso sobre UAP — Julio 2023",
    year: "2023",
    agency: "House Oversight Committee",
    classification: "Público / Bajo juramento",
    type: "hearing",
    summary: "Audiencia histórica donde David Grusch, ex-intelligence officer, testificó bajo juramento que el gobierno posee materiales de 'origen no humano' y programas de recuperación secretos. Ryan Graves y David Fravor también testificaron.",
    url: "https://www.congress.gov/event/118th-congress/house-event/116282",
  },
  {
    title: "Proyecto Blue Book — Archivos completos",
    year: "1947–1969",
    agency: "USAF",
    classification: "Desclasificado (1976)",
    type: "pdf",
    summary: "El mayor programa de investigación OVNI de la historia americana. Estudió 12.618 incidentes. 701 permanecen sin explicación oficial. Los archivos completos están disponibles en el National Archives.",
    url: "https://www.archives.gov/research/military/air-force/ufos",
  },
  {
    title: "Wilson-Davis Memo (Leaked)",
    year: "2002",
    agency: "DIA / Almirante Thomas Wilson",
    classification: "No confirmado oficialmente",
    type: "pdf",
    summary: "Documento filtrado donde el Almirante Wilson describe una reunión con contratistas privados que supuestamente gestionan materiales de origen desconocido bajo programas SAP (Special Access Programs) sin supervisión del Congreso.",
    url: "https://www.theblackvault.com/casefiles/the-wilson-davis-memo/",
  },
  {
    title: "Informe AARO sobre UAP — Vol. 2",
    year: "2024",
    agency: "DoD / AARO",
    classification: "Desclasificado",
    type: "report",
    summary: "Segunda entrega del informe histórico. Investiga afirmaciones específicas de programas de recuperación de materiales. Concluye que no encontró evidencia verificable, pero no descarta la existencia de programas no reportados.",
    url: "https://www.aaro.mil/Portals/136/PDFs/AARO_Historical_Record_Report_Volume_2_June_2024.pdf",
  },
  {
    title: "Pentagon: Análisis del Tic-Tac UAP",
    year: "2004 / desclasif. 2020",
    agency: "US Navy / DoD",
    classification: "Desclasificado",
    type: "pdf",
    summary: "Videos y análisis del encuentro del USS Nimitz (2004) con el objeto 'Tic-Tac'. El Cmdr. David Fravor describió un objeto de 12m sin propulsión visible que superaba cualquier aeronave conocida. Oficialmente sin explicación.",
    url: "https://www.navair.navy.mil/foia/documents",
  },
];

const THEORIES: TheoryItem[] = [
  {
    title: "Hipótesis de la Zoo Cósmica",
    author: "John Ball",
    institution: "MIT",
    year: "1973",
    credibility: "high",
    summary: "Civilizaciones avanzadas podrían evitar deliberadamente el contacto con nosotros, similar a cómo los humanos protegemos reservas naturales. Explicaría el Paradox de Fermi: el silencio no significa ausencia, sino política de no-interferencia.",
    url: "https://ui.adsabs.harvard.edu/abs/1973Icar...19..347B/abstract",
  },
  {
    title: "La Hipótesis del Planeta Raro",
    author: "Peter Ward & Joe Kirschvink",
    institution: "University of Washington / Caltech",
    year: "2000",
    credibility: "high",
    summary: "La vida compleja requiere una combinación improbable de factores: luna grande, gigante gaseoso protector, zona habitable estable, tipo de estrella específico. La Tierra podría ser estadísticamente excepcional en la galaxia.",
    url: "https://www.amazon.com/Rare-Earth-Complex-Uncommon-Universe/dp/0387952896",
  },
  {
    title: "Tecnosignatures y biofirmas en K2-18b",
    author: "Madhusudhan et al.",
    institution: "Universidad de Cambridge",
    year: "2023",
    credibility: "high",
    summary: "El JWST detectó posible dimetilsulfuro (DMS) en la atmósfera del exoplaneta K2-18b — en la Tierra, ese compuesto solo lo producen organismos vivos. Está bajo revisión, pero es la señal más seria de posible biofirma extrasolar.",
    url: "https://www.nature.com/articles/s41550-023-02054-3",
  },
  {
    title: "Inteligencia Artificial como Firma de Vida",
    author: "Susan Schneider",
    institution: "NASA / Library of Congress",
    year: "2019",
    credibility: "high",
    summary: "Si existen civilizaciones avanzadas, probablemente evolucionaron más allá de la biología y son entidades artificiales. El SETI debería buscar señales de IA, no de radio biológica. Esto explicaría por qué no detectamos comunicaciones.",
    url: "https://www.nasa.gov/directorates/smd/astrobiology/artificial-intelligence-and-the-search-for-extraterrestrial-intelligence/",
  },
  {
    title: "UAP como Inteligencia No Humana Terrestre",
    author: "Avi Loeb",
    institution: "Harvard University",
    year: "2023",
    credibility: "medium",
    summary: "El Prof. Loeb propone que algunos UAP podrían ser sondas de inteligencia artificial enviadas por civilizaciones extintas hace millones de años (Proyecto Galileo). Su expedición oceánica recuperó esferas metálicas de composición anómala en 2023.",
    url: "https://projects.iq.harvard.edu/galileo",
  },
  {
    title: "Oumuamua: ¿Artefacto Interestelar?",
    author: "Avi Loeb & Shmuel Bialy",
    institution: "Harvard CfA",
    year: "2018",
    credibility: "medium",
    summary: "El primer objeto interestelar observado (2017) presentó aceleración anómala sin desgasificación visible. Loeb propone que podría ser una vela de luz artificial. La mayoría de astrónomos prefieren explicaciones naturales, pero el debate sigue abierto.",
    url: "https://iopscience.iop.org/article/10.3847/2041-8213/aaeda8",
  },
];

const TESTIMONIES: TestimonyItem[] = [
  {
    name: "David Grusch",
    role: "Ex-NRO Intelligence Officer / AARO",
    year: "2023",
    quote: "El gobierno de EE.UU. posee materiales de vehículos de origen no humano y ha recuperado restos biológicos. He hablado con docenas de testigos directos bajo riesgo de sus carreras y libertad.",
    url: "https://www.congress.gov/event/118th-congress/house-event/116282",
  },
  {
    name: "Cmdr. David Fravor (ret.)",
    role: "Piloto de combate US Navy, USS Nimitz",
    year: "2004 / 2023",
    quote: "Era un objeto de unos 40 pies, forma de Tic-Tac, sin alas, sin propulsión visible. Descendía de 80.000 pies a nivel del mar en segundos. No es nada de lo que hemos fabricado nosotros.",
    url: "https://www.congress.gov/event/118th-congress/house-event/116282",
  },
  {
    name: "Ryan Graves",
    role: "Ex-piloto F/A-18 US Navy, Americans for Safe Aerospace",
    year: "2023",
    quote: "Estos objetos estaban en zonas de entrenamiento restringidas todos los días durante años. No es un evento aislado. El patrón sugiere presencia persistente y sistemática en espacio aéreo militar.",
    url: "https://www.safeaerospace.org",
  },
  {
    name: "Dr. Sean Kirkpatrick",
    role: "Director fundador de AARO (DoD)",
    year: "2023",
    quote: "Hemos analizado cientos de casos. La gran mayoría tienen explicaciones mundanas. Pero hay un subconjunto de reportes con características que no podemos explicar con tecnología conocida.",
    url: "https://www.aaro.mil",
  },
  {
    name: "Haim Eshed",
    role: "Ex-jefe del Programa Espacial de Inteligencia de Israel (30 años)",
    year: "2020",
    quote: "Los extraterrestres existen y han pedido no revelar su existencia porque la humanidad no está lista. Hay un acuerdo entre EE.UU. y los extraterrestres para investigar el tejido del universo.",
    url: "https://www.jpost.com/omg/former-israeli-space-security-chief-says-extraterrestrials-exist-651405",
  },
];

const BADGE: Record<string, string> = {
  pdf: "PDF",
  report: "Informe",
  hearing: "Audiencia",
};

export default function ETDossier() {
  const [tab, setTab] = useState<Tab>("docs");

  return (
    <div className="mb-12">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <span className="w-2 h-2 rounded-full bg-space-et animate-pulse inline-block" />
        <h2 className="font-playfair text-2xl text-space-deep font-semibold">
          Inteligencia Extraterrestre
        </h2>
      </div>
      <p className="text-space-dim text-xs font-inter mb-6 max-w-2xl">
        Documentos desclasificados del gobierno americano, testimonios bajo juramento ante el Congreso y las teorías más serias de la comunidad científica.
      </p>

      {/* Tabs */}
      <div className="flex gap-1 mb-8 border-b border-space-sand">
        {([
          { id: "docs", label: "Documentos Oficiales" },
          { id: "theories", label: "Teorías Científicas" },
          { id: "testimonies", label: "Testimonios" },
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

      {/* Declassified Documents */}
      {tab === "docs" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {DECLASSIFIED_DOCS.map((doc, i) => (
            <a
              key={i}
              href={doc.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white border border-space-sand/60 rounded-xl p-5 hover:border-space-et/40 hover:shadow-sm transition-all flex flex-col gap-3"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex flex-wrap gap-1.5">
                  <span className="text-[9px] font-inter font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-space-et/10 text-space-et border border-space-et/20">
                    {BADGE[doc.type]}
                  </span>
                  <span className="text-[9px] font-inter uppercase tracking-wider px-2 py-0.5 rounded bg-space-parchment text-space-muted border border-space-sand">
                    {doc.classification}
                  </span>
                </div>
                <span className="text-[9px] text-space-warm font-inter shrink-0">{doc.year}</span>
              </div>

              <div>
                <h3 className="font-playfair font-semibold text-space-deep text-sm leading-snug mb-1 group-hover:text-space-et transition-colors">
                  {doc.title}
                </h3>
                <p className="text-[10px] text-space-muted font-inter font-medium">{doc.agency}</p>
              </div>

              <p className="text-xs text-space-dim font-inter font-light leading-relaxed flex-1">
                {doc.summary}
              </p>

              <span className="text-[10px] text-space-et font-inter group-hover:underline mt-auto">
                Ver documento →
              </span>
            </a>
          ))}
        </div>
      )}

      {/* Scientific Theories */}
      {tab === "theories" && (
        <div className="flex flex-col gap-4">
          {THEORIES.map((th, i) => (
            <div key={i} className="bg-white border border-space-sand/60 rounded-xl p-5 flex flex-col gap-3">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-[9px] font-inter font-semibold uppercase tracking-wider px-2 py-0.5 rounded border ${
                      th.credibility === "high"
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : "bg-amber-50 text-amber-700 border-amber-200"
                    }`}>
                      {th.credibility === "high" ? "Peer-reviewed" : "Investigación activa"}
                    </span>
                    <span className="text-[9px] text-space-warm font-inter">{th.year}</span>
                  </div>
                  <h3 className="font-playfair font-semibold text-space-deep text-base leading-snug">
                    {th.title}
                  </h3>
                  <p className="text-[10px] text-space-muted font-inter mt-0.5">
                    {th.author} · {th.institution}
                  </p>
                </div>
              </div>

              <p className="text-sm text-space-dim font-inter font-light leading-relaxed">
                {th.summary}
              </p>

              <a
                href={th.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] text-space-blue font-inter hover:underline self-start"
              >
                Leer estudio original →
              </a>
            </div>
          ))}
        </div>
      )}

      {/* Testimonies */}
      {tab === "testimonies" && (
        <div className="flex flex-col gap-4">
          {TESTIMONIES.map((t, i) => (
            <div key={i} className="bg-white border border-space-sand/60 rounded-xl p-5">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-space-parchment border border-space-sand flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-space-muted text-xs font-semibold font-inter">
                    {t.name.charAt(0)}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <div>
                      <span className="text-sm font-inter font-semibold text-space-deep">{t.name}</span>
                      <p className="text-[10px] text-space-muted font-inter">{t.role} · {t.year}</p>
                    </div>
                  </div>
                  <blockquote className="text-sm text-space-dim font-inter font-light leading-relaxed italic border-l-2 border-space-et/30 pl-3 mt-2">
                    "{t.quote}"
                  </blockquote>
                  <a
                    href={t.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] text-space-et font-inter hover:underline mt-2 inline-block"
                  >
                    Fuente oficial →
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
