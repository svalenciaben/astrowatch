"use client";
import { useState } from "react";

type Tab = "cases" | "reports" | "timeline";

const CASES = [
  {
    name: "USS Nimitz — 'Tic-Tac'",
    date: "Nov 2004 / desclasif. 2017",
    location: "Océano Pacífico, California",
    witnesses: "Cmdr. David Fravor + varios pilotos F/A-18",
    description: "Objeto blanco de ~12m, forma de Tic-Tac, sin alas ni propulsión visible. Descendió de 24.000m a nivel del mar en segundos. Los radares del Nimitz lo rastrearon durante 2 semanas antes del encuentro visual.",
    status: "Sin explicación oficial",
    url: "https://www.navair.navy.mil/foia/documents",
  },
  {
    name: "USS Roosevelt — 'Gimbal' y 'GoFast'",
    date: "2015 / desclasif. 2020",
    location: "Costa Este de EE.UU.",
    witnesses: "Pilotos F/A-18 Super Hornet",
    description: "Dos videos desclasificados por el Pentágono. 'Gimbal' muestra un objeto que rota sin propulsión visible. 'GoFast' muestra un objeto a baja altitud moviéndose a velocidad inusual sobre el océano.",
    status: "Oficialmente sin clasificar",
    url: "https://www.defense.gov/News/Releases/Release/Article/2165713/",
  },
  {
    name: "Incidente de Radar de Aguadilla (Puerto Rico)",
    date: "Apr 2013",
    location: "Aguadilla, Puerto Rico",
    witnesses: "Customs and Border Protection (CBP)",
    description: "Video thermal de la CBP muestra un objeto que vuela a baja altitud, se sumerge en el océano, vuelve a emerger y se divide en dos. Analizado por investigadores independientes del Pentágono.",
    status: "No reconocido oficialmente",
    url: "https://www.scientificcoalitionforuaptransparency.org/",
  },
  {
    name: "Lubbock Lights",
    date: "Ago–Sep 1951",
    location: "Lubbock, Texas",
    witnesses: "Profesores de Texas Tech + fotógrafo",
    description: "Serie de formaciones de luces fotografiadas y observadas por múltiples testigos con credenciales académicas. Investigado por el Proyecto Blue Book. Clasificado inicialmente como 'secreto' por la USAF.",
    status: "Blue Book: explicación no concluyente",
    url: "https://www.archives.gov/research/military/air-force/ufos",
  },
  {
    name: "Rendlesham Forest",
    date: "Dic 1980",
    location: "Suffolk, Inglaterra (base USAF)",
    witnesses: "Personal militar USAF, incluido Lt. Col. Charles Halt",
    description: "Soldados americanos reportaron un objeto triangular que aterrizó en el bosque cerca de la base RAF Woodbridge. Marcas en el suelo y radiación elevada fueron documentadas. Halt envió un memo oficial al MoD.",
    status: "MoD: sin explicación satisfactoria",
    url: "https://www.nationalarchives.gov.uk/ufos/",
  },
  {
    name: "Teotihuacán UAP — Fotografías del Congreso Mexicano",
    date: "Sep 2023",
    location: "México",
    witnesses: "Congreso mexicano / Jaime Maussan",
    description: "Presentación ante el Congreso mexicano de supuestos restos de 'seres no humanos'. La comunidad científica rechazó las conclusiones. Sin embargo, el evento generó debate institucional sobre transparencia UAP.",
    status: "Rechazado por la comunidad científica",
    url: "https://www.reuters.com/world/americas/mexico-congress-ufo-hearing-features-alleged-non-human-beings-2023-09-13/",
  },
];

const REPORTS = [
  {
    title: "ODNI Preliminary Assessment 2021",
    agency: "Director Nacional de Inteligencia",
    key: "144 incidentes analizados. 143 sin explicación. 1 identificado como globo meteorológico. 18 presentan tecnología de vuelo avanzada no identificada.",
    url: "https://www.dni.gov/files/ODNI/documents/assessments/Prelimary-Assessment-UAP-20210625.pdf",
  },
  {
    title: "AARO Annual Report 2023",
    agency: "All-domain Anomaly Resolution Office (DoD)",
    key: "510 nuevos reportes. 171 caracterizados como 'sin explicación'. AARO confirma que ningún caso analizado muestra evidencia de origen extraterrestre o tecnología adversaria conocida.",
    url: "https://www.aaro.mil/Portals/136/PDFs/AARO_Annual_Report_2023.pdf",
  },
  {
    title: "NASA UAP Independent Study Report",
    agency: "NASA",
    key: "Panel de 16 expertos independientes. Recomienda uso de IA y sensores satelitales para estudiar UAP. Concluye que los datos actuales son insuficientes para determinar origen. Pide destigmatización de reportes.",
    url: "https://science.nasa.gov/uap/",
  },
  {
    title: "Senate Intelligence Committee — SAP Oversight",
    agency: "Senado de EE.UU.",
    key: "La enmienda Schumer-Rounds (NDAA 2024) establece una junta de revisión presidencial para desclasificar documentos UAP y obliga a contratistas privados a entregar materiales al gobierno.",
    url: "https://www.congress.gov/bill/118th-congress/senate-bill/2226",
  },
];

const TIMELINE = [
  { year: "1947", event: "Crash de Roswell y creación del Proyecto Sign (USAF)" },
  { year: "1952", event: "Proyecto Blue Book — mayor investigación oficial de la historia (12.618 casos)" },
  { year: "1969", event: "Blue Book cierra. Concluye que ningún UAP supone amenaza nacional ni origen extraterrestre" },
  { year: "2004", event: "Incidente Tic-Tac USS Nimitz — grabado en video pero clasificado" },
  { year: "2017", event: "NYT publica existencia del AATIP (programa secreto del Pentágono). Videos desclasificados" },
  { year: "2020", event: "Pentágono confirma oficialmente los tres videos (Tic-Tac, Gimbal, GoFast)" },
  { year: "2021", event: "Primer informe oficial ODNI al Congreso. 143 casos sin explicación" },
  { year: "2022", event: "NASA forma panel independiente de estudio UAP" },
  { year: "2023", event: "David Grusch testifica bajo juramento ante el Congreso. AARO lanza portal público" },
  { year: "2024", event: "AARO publica informe histórico Vol. 1 y 2. Enmienda Schumer para desclasificación masiva" },
];

export default function UAPDossier() {
  const [tab, setTab] = useState<Tab>("cases");

  return (
    <div className="mb-12">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-xl">👁</span>
        <h2 className="font-playfair text-2xl text-space-deep font-semibold">UAP — Fenómenos Aéreos No Identificados</h2>
      </div>
      <p className="text-space-dim text-xs font-inter mb-6 max-w-2xl">
        Los casos más documentados, los informes oficiales del Congreso y el Pentágono, y la cronología completa del estudio gubernamental de UAP.
      </p>

      {/* Tabs */}
      <div className="flex gap-1 mb-8 border-b border-space-sand">
        {([
          { id: "cases", label: "Casos Documentados" },
          { id: "reports", label: "Informes Oficiales" },
          { id: "timeline", label: "Cronología" },
        ] as { id: Tab; label: string }[]).map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`text-xs font-inter px-4 py-2.5 border-b-2 transition-colors -mb-px ${
              tab === t.id
                ? "border-space-blue text-space-blue font-medium"
                : "border-transparent text-space-muted hover:text-space-dim"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "cases" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {CASES.map((c, i) => (
            <a
              key={i}
              href={c.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white border border-space-sand/60 rounded-xl p-5 hover:border-space-blue/30 hover:shadow-sm transition-all flex flex-col gap-3"
            >
              <div className="flex items-start justify-between gap-2">
                <span className="text-[9px] font-inter font-semibold uppercase tracking-wider px-2 py-0.5 rounded border bg-amber-50 text-amber-700 border-amber-200">
                  {c.status}
                </span>
                <span className="text-[9px] text-space-warm font-inter shrink-0">{c.date}</span>
              </div>
              <h3 className="font-playfair font-semibold text-space-deep text-sm leading-snug group-hover:text-space-blue transition-colors">
                {c.name}
              </h3>
              <p className="text-[10px] text-space-muted font-inter">📍 {c.location} · {c.witnesses}</p>
              <p className="text-xs text-space-dim font-inter font-light leading-relaxed flex-1">{c.description}</p>
              <span className="text-[10px] text-space-blue font-inter group-hover:underline">Ver fuente →</span>
            </a>
          ))}
        </div>
      )}

      {tab === "reports" && (
        <div className="flex flex-col gap-4">
          {REPORTS.map((r, i) => (
            <div key={i} className="bg-white border border-space-sand/60 rounded-xl p-5 flex flex-col gap-3">
              <div>
                <h3 className="font-playfair font-semibold text-space-deep text-base">{r.title}</h3>
                <p className="text-[10px] text-space-muted font-inter mt-0.5">{r.agency}</p>
              </div>
              <p className="text-sm text-space-dim font-inter font-light leading-relaxed">{r.key}</p>
              <a href={r.url} target="_blank" rel="noopener noreferrer" className="text-[10px] text-space-blue font-inter hover:underline self-start">
                Leer informe oficial →
              </a>
            </div>
          ))}
        </div>
      )}

      {tab === "timeline" && (
        <div className="relative pl-6 border-l border-space-sand flex flex-col gap-5">
          {TIMELINE.map((t, i) => (
            <div key={i} className="relative">
              <span className="absolute -left-[25px] w-3 h-3 rounded-full bg-white border-2 border-space-blue top-0.5" />
              <span className="text-xs font-inter font-semibold text-space-blue">{t.year}</span>
              <p className="text-sm text-space-dim font-inter font-light leading-relaxed mt-0.5">{t.event}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
