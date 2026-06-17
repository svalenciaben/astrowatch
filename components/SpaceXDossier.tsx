"use client";

interface MissionItem {
  name: string;
  status: "active" | "upcoming" | "completed";
  date: string;
  description: string;
  url: string;
}

interface UpdateItem {
  title: string;
  date: string;
  summary: string;
  url: string;
}

const MISSIONS: MissionItem[] = [
  {
    name: "Starship Flight 9",
    status: "upcoming",
    date: "2025",
    description: "Noveno vuelo de prueba del sistema Starship/Super Heavy. SpaceX busca demostrar reutilización completa de ambas etapas y capacidad de carga orbital.",
    url: "https://www.spacex.com/vehicles/starship/",
  },
  {
    name: "Crew Dragon — ISS Missions",
    status: "active",
    date: "2025",
    description: "SpaceX transporta astronautas a la ISS bajo contrato con NASA (CCP). Crew-10 está en desarrollo para rotar la tripulación actualmente a bordo.",
    url: "https://www.spacex.com/human-spaceflight/",
  },
  {
    name: "Starlink Gen 2",
    status: "active",
    date: "2023–2025",
    description: "Constelación de satélites de internet de alta velocidad. Más de 6.000 satélites en órbita. Gen 2 mejora el ancho de banda con satélites de mayor tamaño lanzados por Starship.",
    url: "https://www.starlink.com/",
  },
  {
    name: "Artemis — Human Landing System",
    status: "active",
    date: "2026",
    description: "SpaceX construye el HLS (Human Landing System) para llevar astronautas a la Luna bajo el programa Artemis de NASA. Basado en una versión lunar de Starship.",
    url: "https://www.nasa.gov/humans-in-space/artemis/",
  },
  {
    name: "Falcon 9 Block 5 — Reutilización récord",
    status: "completed",
    date: "2024",
    description: "Un booster Falcon 9 completó su vuelo número 23, estableciendo el récord de reutilización de cohetes orbitales. El booster aterrizó en el droneship 'Of Course I Still Love You'.",
    url: "https://www.spacex.com/vehicles/falcon-9/",
  },
  {
    name: "Starship Flight 5 — Regreso al pad",
    status: "completed",
    date: "Oct 2024",
    description: "Hito histórico: el booster Super Heavy regresó al pad de lanzamiento y fue atrapado por los brazos mecánicos 'Mechazilla'. Primera vez en la historia que un cohete orbital es capturado en vuelo.",
    url: "https://www.spacex.com/vehicles/starship/",
  },
];

const UPDATES: UpdateItem[] = [
  {
    title: "Starship: el cohete más grande jamás construido",
    date: "2024",
    summary: "Con 121 metros de altura y 33 motores Raptor en el Super Heavy, Starship puede llevar hasta 150 toneladas a órbita baja. Es el único cohete diseñado para ser 100% reutilizable.",
    url: "https://www.spacex.com/vehicles/starship/",
  },
  {
    title: "Falcon 9: más de 300 lanzamientos exitosos",
    date: "2025",
    summary: "El Falcon 9 ha completado más de 300 misiones con un récord de confiabilidad superior al 99.9%. Ha revolucionado el acceso al espacio reduciendo el costo por kilogramo a órbita en un 90%.",
    url: "https://www.spacex.com/vehicles/falcon-9/",
  },
  {
    title: "Starlink supera los 3 millones de suscriptores",
    date: "2024",
    summary: "La red Starlink opera en más de 100 países. Los satélites de Gen 2 con inter-satellite links permiten velocidades de hasta 1 Gbps y han sido clave en comunicaciones de emergencia en zonas de conflicto.",
    url: "https://www.starlink.com/",
  },
];

const STATUS_COLORS: Record<string, string> = {
  active: "bg-emerald-50 text-emerald-700 border-emerald-200",
  upcoming: "bg-blue-50 text-blue-700 border-blue-200",
  completed: "bg-space-parchment text-space-muted border-space-sand",
};

const STATUS_LABELS: Record<string, string> = {
  active: "Activo",
  upcoming: "Próximo",
  completed: "Completado",
};

export default function SpaceXDossier() {
  return (
    <div className="mb-12">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-xl">⚡</span>
        <h2 className="font-playfair text-2xl text-space-deep font-semibold">SpaceX</h2>
      </div>
      <p className="text-space-dim text-xs font-inter mb-8 max-w-2xl">
        Misiones activas, próximos lanzamientos y los hitos más importantes del programa espacial privado más ambicioso de la historia.
      </p>

      {/* Missions */}
      <h3 className="text-xs text-space-muted uppercase tracking-widest font-inter font-medium mb-4">Misiones</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
        {MISSIONS.map((m, i) => (
          <a
            key={i}
            href={m.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-white border border-space-sand/60 rounded-xl p-5 hover:border-space-blue/30 hover:shadow-sm transition-all flex flex-col gap-3"
          >
            <div className="flex items-start justify-between gap-2">
              <span className={`text-[9px] font-inter font-semibold uppercase tracking-wider px-2 py-0.5 rounded border ${STATUS_COLORS[m.status]}`}>
                {STATUS_LABELS[m.status]}
              </span>
              <span className="text-[9px] text-space-warm font-inter">{m.date}</span>
            </div>
            <h3 className="font-playfair font-semibold text-space-deep text-sm leading-snug group-hover:text-space-blue transition-colors">
              {m.name}
            </h3>
            <p className="text-xs text-space-dim font-inter font-light leading-relaxed flex-1">
              {m.description}
            </p>
            <span className="text-[10px] text-space-blue font-inter group-hover:underline">Ver misión →</span>
          </a>
        ))}
      </div>

      {/* Key facts */}
      <h3 className="text-xs text-space-muted uppercase tracking-widest font-inter font-medium mb-4">Datos Clave</h3>
      <div className="flex flex-col gap-4">
        {UPDATES.map((u, i) => (
          <div key={i} className="bg-white border border-space-sand/60 rounded-xl p-5 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <h4 className="font-inter font-semibold text-space-deep text-sm">{u.title}</h4>
              <span className="text-[9px] text-space-warm font-inter shrink-0 ml-2">{u.date}</span>
            </div>
            <p className="text-xs text-space-dim font-inter font-light leading-relaxed">{u.summary}</p>
            <a href={u.url} target="_blank" rel="noopener noreferrer" className="text-[10px] text-space-blue font-inter hover:underline self-start">
              spacex.com →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
