"use client";
import { useState, useEffect } from "react";

interface Fact {
  text: string;
  source: string;
  url: string;
  date: string;
}

const FACTS: Fact[] = [
  {
    text: "El telescopio James Webb detectó dióxido de carbono en la atmósfera del exoplaneta WASP-39b, la primera detección directa de CO₂ en un planeta fuera del sistema solar.",
    source: "NASA / JWST",
    url: "https://www.nasa.gov/missions/webb/nasa-webb-detects-carbon-dioxide-in-exoplanet-atmosphere/",
    date: "2022",
  },
  {
    text: "Voyager 1, lanzado en 1977, sigue siendo el objeto fabricado por humanos más lejano: está a más de 24.000 millones de km de la Tierra.",
    source: "NASA JPL",
    url: "https://voyager.jpl.nasa.gov/mission/status/",
    date: "2025",
  },
  {
    text: "La misión OSIRIS-REx entregó muestras del asteroide Bennu en 2023 — las más antiguas jamás recolectadas (4.500 millones de años), revelando aminoácidos y agua.",
    source: "NASA",
    url: "https://science.nasa.gov/mission/osiris-rex/",
    date: "2023",
  },
  {
    text: "En 2024, el helicóptero Ingenuity de la NASA completó más de 70 vuelos en Marte, superando con creces su misión original de 5 vuelos.",
    source: "NASA Mars 2020",
    url: "https://science.nasa.gov/mission/mars-2020-perseverance/ingenuity-helicopter/",
    date: "2024",
  },
  {
    text: "El programa Artemis planea establecer una presencia humana sostenible en la Luna para 2030, incluyendo la Gateway Station en órbita lunar.",
    source: "NASA Artemis",
    url: "https://www.nasa.gov/humans-in-space/artemis/",
    date: "2025",
  },
  {
    text: "SpaceX completó el primer vuelo de Starship con regreso controlado del booster Super Heavy al sitio de lanzamiento en octubre de 2024.",
    source: "SpaceX",
    url: "https://www.spacex.com/vehicles/starship/",
    date: "2024",
  },
  {
    text: "El JWST confirmó que el universo tiene aproximadamente 13.800 millones de años y detectó galaxias formadas apenas 300 millones de años después del Big Bang.",
    source: "NASA / ESA",
    url: "https://webbtelescope.org/contents/news-releases",
    date: "2023",
  },
  {
    text: "Hay más de 5.700 exoplanetas confirmados; se estima que en nuestra galaxia hay más planetas que estrellas — unos 100.000 millones.",
    source: "NASA Exoplanet Archive",
    url: "https://exoplanetarchive.ipac.caltech.edu/",
    date: "2025",
  },
  {
    text: "La sonda Europa Clipper de la NASA, lanzada en octubre de 2024, realizará 49 sobrevuelos de la luna Europa de Júpiter para buscar condiciones habitables.",
    source: "NASA",
    url: "https://europa.nasa.gov/",
    date: "2024",
  },
  {
    text: "El planeta Venus rota tan despacio que un día venusiano es más largo que su año: 243 días terrestres para rotar vs 225 días para orbitar el Sol.",
    source: "NASA Solar System Exploration",
    url: "https://solarsystem.nasa.gov/planets/venus/overview/",
    date: "2025",
  },
  {
    text: "En 2025, el JWST detectó posibles señales de biofirmas (DMS) en la atmósfera del exoplaneta K2-18b, aunque aún bajo investigación.",
    source: "Nature Astronomy / Cambridge",
    url: "https://www.nature.com/articles/s41550-023-02054-3",
    date: "2025",
  },
  {
    text: "La ISS viaja a 28.000 km/h y orbita la Tierra cada 90 minutos, completando ~16 amaneceres y atardeceres por día.",
    source: "NASA ISS",
    url: "https://www.nasa.gov/international-space-station/",
    date: "2025",
  },
];

export default function FunFact() {
  const [idx, setIdx] = useState(0);
  const [fade, setFade] = useState(true);

  const go = (next: number) => {
    setFade(false);
    setTimeout(() => {
      setIdx((next + FACTS.length) % FACTS.length);
      setFade(true);
    }, 200);
  };

  // Auto-rotate every 12 seconds
  useEffect(() => {
    const t = setInterval(() => go(idx + 1), 12000);
    return () => clearInterval(t);
  }, [idx]);

  const fact = FACTS[idx];

  return (
    <div className="bg-white border border-space-sand/60 rounded-xl p-6 mb-10">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-[10px] text-space-blue uppercase tracking-widest font-semibold font-inter">
          ✦ Fun Fact
        </span>
        <span className="text-space-sand text-[10px]">·</span>
        <span className="text-[10px] text-space-muted font-inter">{fact.date}</span>
        <span className="ml-auto text-[10px] text-space-warm font-inter">
          {idx + 1} / {FACTS.length}
        </span>
      </div>

      <div
        style={{
          transition: "opacity 0.2s ease",
          opacity: fade ? 1 : 0,
        }}
      >
        <p className="font-playfair text-space-deep text-base leading-relaxed mb-4">
          {fact.text}
        </p>
        <div className="flex items-center justify-between">
          <a
            href={fact.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] text-space-blue font-inter hover:underline"
          >
            {fact.source} →
          </a>
          <div className="flex gap-2">
            <button
              onClick={() => go(idx - 1)}
              className="text-[10px] px-2.5 py-1 rounded border border-space-sand text-space-muted hover:text-space-ink hover:border-space-warm transition-colors font-inter"
            >
              ←
            </button>
            <button
              onClick={() => go(idx + 1)}
              className="text-[10px] px-2.5 py-1 rounded border border-space-sand text-space-muted hover:text-space-ink hover:border-space-warm transition-colors font-inter"
            >
              →
            </button>
          </div>
        </div>
      </div>

      {/* Progress dots */}
      <div className="flex gap-1 mt-4 justify-center">
        {FACTS.map((_, i) => (
          <button
            key={i}
            onClick={() => go(i)}
            className={`w-1.5 h-1.5 rounded-full transition-all ${
              i === idx ? "bg-space-blue w-3" : "bg-space-sand hover:bg-space-muted"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
