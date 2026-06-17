export type Lang = "en" | "fr";

export interface DossierItem {
  title: { en: string; fr: string };
  subtitle?: { en: string; fr: string };
  date: string;
  badge?: { en: string; fr: string };
  badgeColor?: "green" | "blue" | "amber" | "gray";
  body: { en: string; fr: string };
  url: string;
}

// ─── ET DOSSIER ─────────────────────────────────────────────────────────────

export const etDocs: DossierItem[] = [
  {
    title: { en: "AARO Historical Record Report Vol. 1", fr: "Rapport historique AARO Vol. 1" },
    subtitle: { en: "DoD / AARO", fr: "DoD / AARO" },
    date: "2024",
    badge: { en: "Report", fr: "Rapport" },
    badgeColor: "green",
    body: {
      en: "The most comprehensive DoD report on UAP from 1945 to 2023. Concludes no evidence of extraterrestrial origin in studied cases, but acknowledges 171 unexplained incidents.",
      fr: "Le rapport le plus complet du DoD sur les FANI de 1945 à 2023. Conclut qu'il n'y a aucune preuve d'origine extraterrestre, mais reconnaît 171 incidents inexpliqués.",
    },
    url: "https://www.aaro.mil/Portals/136/PDFs/AARO_Historical_Record_Report_Vol1_2024.pdf",
  },
  {
    title: { en: "UAP Report to Congress — ODNI 2021", fr: "Rapport UAP au Congrès — ODNI 2021" },
    subtitle: { en: "Office of the Director of National Intelligence", fr: "Bureau du Directeur du Renseignement National" },
    date: "2021",
    badge: { en: "Declassified", fr: "Déclassifié" },
    badgeColor: "amber",
    body: {
      en: "First official government UAP report mandated by Congress. Analyzed 144 incidents reported by military personnel between 2004–2021. 143 remain unexplained. Defines 5 object categories.",
      fr: "Premier rapport gouvernemental officiel sur les UAP mandaté par le Congrès. Analyse 144 incidents militaires entre 2004–2021. 143 restent inexpliqués. Définit 5 catégories d'objets.",
    },
    url: "https://www.dni.gov/files/ODNI/documents/assessments/Prelimary-Assessment-UAP-20210625.pdf",
  },
  {
    title: { en: "Congressional UAP Hearings — July 2023", fr: "Auditions du Congrès sur les UAP — Juillet 2023" },
    subtitle: { en: "House Oversight Committee", fr: "Commission de surveillance de la Chambre" },
    date: "2023",
    badge: { en: "Under Oath", fr: "Sous serment" },
    badgeColor: "blue",
    body: {
      en: "Historic hearing where David Grusch, ex-intelligence officer, testified under oath that the government possesses materials of 'non-human origin' and runs secret recovery programs. Ryan Graves and David Fravor also testified.",
      fr: "Audition historique où David Grusch, ex-officier du renseignement, a témoigné sous serment que le gouvernement possède des matériaux d'origine 'non humaine' et gère des programmes secrets de récupération.",
    },
    url: "https://www.congress.gov/event/118th-congress/house-event/116282",
  },
  {
    title: { en: "Project Blue Book — Complete Archives", fr: "Projet Blue Book — Archives complètes" },
    subtitle: { en: "USAF", fr: "USAF" },
    date: "1947–1969",
    badge: { en: "Declassified 1976", fr: "Déclassifié 1976" },
    badgeColor: "gray",
    body: {
      en: "The largest American UFO investigation program. Studied 12,618 incidents. 701 remain officially unexplained. Complete files available at the National Archives.",
      fr: "Le plus grand programme d'investigation américain sur les OVNI. A étudié 12 618 incidents. 701 restent officiellement inexpliqués. Archives disponibles aux Archives Nationales.",
    },
    url: "https://www.archives.gov/research/military/air-force/ufos",
  },
  {
    title: { en: "AARO Historical Record Report Vol. 2", fr: "Rapport historique AARO Vol. 2" },
    subtitle: { en: "DoD / AARO", fr: "DoD / AARO" },
    date: "2024",
    badge: { en: "Report", fr: "Rapport" },
    badgeColor: "green",
    body: {
      en: "Second installment of the historical report. Investigates specific claims of material recovery programs. Concludes no verifiable evidence was found, but does not rule out unreported programs.",
      fr: "Deuxième volet du rapport historique. Examine les affirmations de programmes de récupération de matériaux. Conclut qu'aucune preuve vérifiable n'a été trouvée.",
    },
    url: "https://www.aaro.mil/Portals/136/PDFs/AARO_Historical_Record_Report_Volume_2_June_2024.pdf",
  },
  {
    title: { en: "Pentagon: Tic-Tac UAP Analysis", fr: "Pentagone : Analyse UAP Tic-Tac" },
    subtitle: { en: "US Navy / DoD", fr: "US Navy / DoD" },
    date: "2004 / declassified 2020",
    badge: { en: "Declassified", fr: "Déclassifié" },
    badgeColor: "amber",
    body: {
      en: "Videos and analysis of the USS Nimitz encounter (2004) with the 'Tic-Tac' object. Cmdr. David Fravor described a 40-foot object with no visible propulsion that outperformed any known aircraft. Officially unexplained.",
      fr: "Vidéos et analyse de la rencontre de l'USS Nimitz (2004) avec l'objet 'Tic-Tac'. Cmdr. Fravor a décrit un objet de 12m sans propulsion visible surpassant tout aéronef connu. Officiellement inexpliqué.",
    },
    url: "https://www.navair.navy.mil/foia/documents",
  },
];

export const etTheories: DossierItem[] = [
  {
    title: { en: "The Cosmic Zoo Hypothesis", fr: "L'Hypothèse du Zoo Cosmique" },
    subtitle: { en: "John Ball · MIT · 1973", fr: "John Ball · MIT · 1973" },
    date: "1973",
    badge: { en: "Peer-reviewed", fr: "Évalué par les pairs" },
    badgeColor: "green",
    body: {
      en: "Advanced civilizations may deliberately avoid contact with us, similar to how humans protect nature reserves. This would explain the Fermi Paradox: the silence doesn't mean absence, but a policy of non-interference.",
      fr: "Les civilisations avancées pourraient délibérément éviter le contact avec nous, comme les réserves naturelles humaines. Cela expliquerait le paradoxe de Fermi : le silence ne signifie pas l'absence.",
    },
    url: "https://ui.adsabs.harvard.edu/abs/1973Icar...19..347B/abstract",
  },
  {
    title: { en: "K2-18b Biosignatures (JWST)", fr: "Biosignatures de K2-18b (JWST)" },
    subtitle: { en: "Madhusudhan et al. · Cambridge · 2023", fr: "Madhusudhan et al. · Cambridge · 2023" },
    date: "2023",
    badge: { en: "Under review", fr: "En révision" },
    badgeColor: "blue",
    body: {
      en: "JWST detected possible dimethyl sulfide (DMS) in the atmosphere of exoplanet K2-18b — on Earth, this compound is only produced by living organisms. The most serious extrasolar biosignature candidate to date.",
      fr: "JWST a détecté du diméthylsulfure (DMS) possible dans l'atmosphère de K2-18b — sur Terre, ce composé n'est produit que par des organismes vivants. La candidate biosignature extrasolaire la plus sérieuse.",
    },
    url: "https://www.nature.com/articles/s41550-023-02054-3",
  },
  {
    title: { en: "Artificial Intelligence as a Life Signature", fr: "L'Intelligence Artificielle comme signature de vie" },
    subtitle: { en: "Susan Schneider · NASA · 2019", fr: "Susan Schneider · NASA · 2019" },
    date: "2019",
    badge: { en: "Peer-reviewed", fr: "Évalué par les pairs" },
    badgeColor: "green",
    body: {
      en: "If advanced civilizations exist, they likely evolved beyond biology and are now artificial entities. SETI should search for AI signals, not biological radio. This may explain why we detect no communications.",
      fr: "Si des civilisations avancées existent, elles ont probablement évolué au-delà de la biologie. SETI devrait chercher des signaux d'IA, pas de radio biologique.",
    },
    url: "https://www.nasa.gov/directorates/smd/astrobiology/artificial-intelligence-and-the-search-for-extraterrestrial-intelligence/",
  },
  {
    title: { en: "Oumuamua: Interstellar Artifact?", fr: "Oumuamua : Artefact interstellaire ?" },
    subtitle: { en: "Avi Loeb & Shmuel Bialy · Harvard · 2018", fr: "Avi Loeb & Shmuel Bialy · Harvard · 2018" },
    date: "2018",
    badge: { en: "Active debate", fr: "Débat actif" },
    badgeColor: "amber",
    body: {
      en: "The first observed interstellar object (2017) showed anomalous acceleration without visible outgassing. Loeb proposes it could be an artificial light sail. Most astronomers prefer natural explanations, but the debate remains open.",
      fr: "Le premier objet interstellaire observé (2017) présentait une accélération anormale sans dégazage visible. Loeb propose que ce pourrait être une voile lumineuse artificielle.",
    },
    url: "https://iopscience.iop.org/article/10.3847/2041-8213/aaeda8",
  },
];

export const etTestimonies: DossierItem[] = [
  {
    title: { en: "David Grusch", fr: "David Grusch" },
    subtitle: { en: "Ex-NRO Intelligence Officer / AARO · 2023", fr: "Ex-officier de renseignement NRO / AARO · 2023" },
    date: "2023",
    body: {
      en: "\"The U.S. government possesses materials from non-human origin vehicles and has recovered biological remains. I've spoken with dozens of direct witnesses at risk of their careers and freedom.\"",
      fr: "« Le gouvernement américain possède des matériaux de véhicules d'origine non humaine et a récupéré des restes biologiques. J'ai parlé à des dizaines de témoins directs au risque de leur carrière. »",
    },
    url: "https://www.congress.gov/event/118th-congress/house-event/116282",
  },
  {
    title: { en: "Cmdr. David Fravor (ret.)", fr: "Cmdr. David Fravor (retraité)" },
    subtitle: { en: "US Navy Fighter Pilot, USS Nimitz · 2004 / 2023", fr: "Pilote de chasse US Navy, USS Nimitz · 2004 / 2023" },
    date: "2004/2023",
    body: {
      en: "\"It was about 40 feet long, Tic-Tac shaped, no wings, no visible propulsion. It descended from 80,000 feet to sea level in seconds. It is nothing we have ever made.\"",
      fr: "« C'était environ 12 mètres de long, en forme de Tic-Tac, sans ailes, sans propulsion visible. Il descendait de 24 000 m au niveau de la mer en quelques secondes. »",
    },
    url: "https://www.congress.gov/event/118th-congress/house-event/116282",
  },
  {
    title: { en: "Ryan Graves", fr: "Ryan Graves" },
    subtitle: { en: "Ex-F/A-18 Pilot US Navy · Americans for Safe Aerospace · 2023", fr: "Ex-pilote F/A-18 US Navy · 2023" },
    date: "2023",
    body: {
      en: "\"These objects were in restricted training areas every single day for years. It's not an isolated event. The pattern suggests a persistent, systematic presence in military airspace.\"",
      fr: "« Ces objets étaient dans des zones d'entraînement restreintes chaque jour pendant des années. Ce n'est pas un événement isolé. Le schéma suggère une présence persistante dans l'espace aérien militaire. »",
    },
    url: "https://www.safeaerospace.org",
  },
  {
    title: { en: "Dr. Sean Kirkpatrick", fr: "Dr. Sean Kirkpatrick" },
    subtitle: { en: "Founding Director of AARO (DoD) · 2023", fr: "Directeur fondateur de l'AARO (DoD) · 2023" },
    date: "2023",
    body: {
      en: "\"We've analyzed hundreds of cases. The vast majority have mundane explanations. But there is a subset of reports with characteristics we cannot explain with known technology.\"",
      fr: "« Nous avons analysé des centaines de cas. La grande majorité ont des explications banales. Mais il existe un sous-ensemble de rapports avec des caractéristiques que nous ne pouvons pas expliquer. »",
    },
    url: "https://www.aaro.mil",
  },
];

// ─── UAP DOSSIER ─────────────────────────────────────────────────────────────

export const uapCases: DossierItem[] = [
  {
    title: { en: "USS Nimitz — 'Tic-Tac'", fr: "USS Nimitz — « Tic-Tac »" },
    subtitle: { en: "Pacific Ocean · Nov 2004 / declassified 2017", fr: "Océan Pacifique · Nov 2004 / déclassifié 2017" },
    date: "2004",
    badge: { en: "No official explanation", fr: "Sans explication officielle" },
    badgeColor: "amber",
    body: {
      en: "White ~40ft object, Tic-Tac shaped, no wings or visible propulsion. Descended from 80,000ft to sea level in seconds. The Nimitz's radar tracked it for 2 weeks before the visual encounter. Witnessed by Cmdr. David Fravor and multiple F/A-18 pilots.",
      fr: "Objet blanc d'environ 12 m, sans ailes ni propulsion visible. Descendait de 24 000 m au niveau de la mer en secondes. Les radars du Nimitz le suivaient depuis 2 semaines avant la rencontre visuelle.",
    },
    url: "https://www.navair.navy.mil/foia/documents",
  },
  {
    title: { en: "USS Roosevelt — 'Gimbal' & 'GoFast'", fr: "USS Roosevelt — « Gimbal » et « GoFast »" },
    subtitle: { en: "US East Coast · 2015 / declassified 2020", fr: "Côte Est des États-Unis · 2015 / déclassifié 2020" },
    date: "2015",
    badge: { en: "Officially unclassified", fr: "Officiellement non classifié" },
    badgeColor: "blue",
    body: {
      en: "Two declassified videos released by the Pentagon. 'Gimbal' shows an object rotating without visible propulsion. 'GoFast' shows a low-altitude object moving at unusual speed over the ocean.",
      fr: "Deux vidéos déclassifiées publiées par le Pentagone. 'Gimbal' montre un objet tournant sans propulsion visible. 'GoFast' montre un objet à basse altitude se déplaçant à une vitesse inhabituelle.",
    },
    url: "https://www.defense.gov/News/Releases/Release/Article/2165713/",
  },
  {
    title: { en: "Rendlesham Forest", fr: "Forêt de Rendlesham" },
    subtitle: { en: "Suffolk, England (USAF base) · Dec 1980", fr: "Suffolk, Angleterre (base USAF) · Déc 1980" },
    date: "1980",
    badge: { en: "MoD: no satisfactory explanation", fr: "MoD : sans explication satisfaisante" },
    badgeColor: "amber",
    body: {
      en: "American soldiers reported a triangular craft landing in the forest near RAF Woodbridge. Ground marks and elevated radiation were documented. Lt. Col. Charles Halt sent an official memo to the MoD.",
      fr: "Des soldats américains ont signalé un engin triangulaire atterrissant près de la base RAF Woodbridge. Des marques au sol et une radiation élevée ont été documentées. Le Lt. Col. Halt a envoyé un mémo officiel.",
    },
    url: "https://www.nationalarchives.gov.uk/ufos/",
  },
  {
    title: { en: "Aguadilla Thermal Video (Puerto Rico)", fr: "Vidéo thermique d'Aguadilla (Porto Rico)" },
    subtitle: { en: "Aguadilla, Puerto Rico · Apr 2013", fr: "Aguadilla, Porto Rico · Avr 2013" },
    date: "2013",
    badge: { en: "Not officially recognized", fr: "Non reconnu officiellement" },
    badgeColor: "gray",
    body: {
      en: "CBP thermal video shows an object flying at low altitude, submerging into the ocean, re-emerging, and splitting into two. Analyzed by independent DoD-linked researchers.",
      fr: "Vidéo thermique CBP montrant un objet volant à basse altitude, plongeant dans l'océan, réémergant et se divisant en deux. Analysé par des chercheurs indépendants liés au DoD.",
    },
    url: "https://www.scientificcoalitionforuaptransparency.org/",
  },
];

export const uapReports: DossierItem[] = [
  {
    title: { en: "ODNI Preliminary Assessment 2021", fr: "Évaluation préliminaire ODNI 2021" },
    subtitle: { en: "Director of National Intelligence", fr: "Directeur du Renseignement National" },
    date: "2021",
    body: {
      en: "144 incidents analyzed. 143 unexplained. 1 identified as a weather balloon. 18 show advanced flight technology not identified as any known adversary.",
      fr: "144 incidents analysés. 143 inexpliqués. 1 identifié comme ballon météo. 18 montrent une technologie de vol avancée non identifiée.",
    },
    url: "https://www.dni.gov/files/ODNI/documents/assessments/Prelimary-Assessment-UAP-20210625.pdf",
  },
  {
    title: { en: "AARO Annual Report 2023", fr: "Rapport annuel AARO 2023" },
    subtitle: { en: "All-domain Anomaly Resolution Office (DoD)", fr: "Bureau de résolution des anomalies tous domaines (DoD)" },
    date: "2023",
    body: {
      en: "510 new reports. 171 characterized as 'unexplained'. AARO confirms no analyzed case shows evidence of extraterrestrial origin or known adversary technology.",
      fr: "510 nouveaux rapports. 171 caractérisés comme « inexpliqués ». L'AARO confirme qu'aucun cas analysé ne montre de preuve d'origine extraterrestre.",
    },
    url: "https://www.aaro.mil/Portals/136/PDFs/AARO_Annual_Report_2023.pdf",
  },
  {
    title: { en: "NASA UAP Independent Study Report", fr: "Rapport d'étude indépendant NASA sur les UAP" },
    subtitle: { en: "NASA", fr: "NASA" },
    date: "2023",
    body: {
      en: "Panel of 16 independent experts. Recommends AI and satellite sensors for UAP study. Concludes current data is insufficient to determine origin. Calls for destigmatization of reports.",
      fr: "Panel de 16 experts indépendants. Recommande l'utilisation de l'IA et de capteurs satellites. Conclut que les données actuelles sont insuffisantes pour déterminer l'origine.",
    },
    url: "https://science.nasa.gov/uap/",
  },
  {
    title: { en: "Schumer-Rounds Amendment — UAP Declassification", fr: "Amendement Schumer-Rounds — Déclassification UAP" },
    subtitle: { en: "US Senate · NDAA 2024", fr: "Sénat américain · NDAA 2024" },
    date: "2024",
    body: {
      en: "Establishes a presidential review board to declassify UAP documents and compels private contractors to hand over materials to the government.",
      fr: "Établit une commission de révision présidentielle pour déclassifier les documents UAP et oblige les contractants privés à remettre des matériaux au gouvernement.",
    },
    url: "https://www.congress.gov/bill/118th-congress/senate-bill/2226",
  },
];

export const uapTimeline: { year: string; en: string; fr: string }[] = [
  { year: "1947", en: "Roswell crash and creation of Project Sign (USAF)", fr: "Crash de Roswell et création du Projet Sign (USAF)" },
  { year: "1952", en: "Project Blue Book — largest official investigation (12,618 cases)", fr: "Projet Blue Book — plus grande enquête officielle (12 618 cas)" },
  { year: "1969", en: "Blue Book closes. Concludes no UAP poses a national threat or extraterrestrial origin", fr: "Blue Book ferme. Conclut qu'aucun FANI ne constitue une menace nationale" },
  { year: "2004", en: "USS Nimitz Tic-Tac incident — recorded on video but classified", fr: "Incident Tic-Tac USS Nimitz — filmé mais classifié" },
  { year: "2017", en: "NYT reveals existence of AATIP (secret Pentagon program). Videos declassified", fr: "NYT révèle l'existence de l'AATIP (programme secret du Pentagone)" },
  { year: "2020", en: "Pentagon officially confirms three videos (Tic-Tac, Gimbal, GoFast)", fr: "Le Pentagone confirme officiellement les trois vidéos (Tic-Tac, Gimbal, GoFast)" },
  { year: "2021", en: "First official ODNI report to Congress. 143 unexplained cases", fr: "Premier rapport officiel ODNI au Congrès. 143 cas inexpliqués" },
  { year: "2022", en: "NASA forms independent UAP study panel", fr: "La NASA forme un groupe d'étude indépendant sur les UAP" },
  { year: "2023", en: "David Grusch testifies under oath before Congress. AARO launches public portal", fr: "David Grusch témoigne sous serment devant le Congrès. L'AARO lance un portail public" },
  { year: "2024", en: "AARO publishes Historical Reports Vol. 1 & 2. Schumer amendment for mass declassification", fr: "L'AARO publie les rapports historiques Vol. 1 & 2. Amendement Schumer pour déclassification massive" },
];

// ─── SETI DOSSIER ─────────────────────────────────────────────────────────────

export const setiProjects: DossierItem[] = [
  {
    title: { en: "Breakthrough Listen", fr: "Breakthrough Listen" },
    subtitle: { en: "Breakthrough Initiatives / UC Berkeley · since 2015 · $100M", fr: "Breakthrough Initiatives / UC Berkeley · depuis 2015 · 100 M$" },
    date: "2015",
    badge: { en: "Active", fr: "Actif" },
    badgeColor: "green",
    body: {
      en: "The most ambitious SETI program in history. Analyzes 1 million nearby stars, the galactic center, and 100 external galaxies. Uses the world's most powerful radio telescopes (Green Bank, Parkes, MeerKAT).",
      fr: "Le programme SETI le plus ambitieux de l'histoire. Analyse 1 million d'étoiles proches, le centre galactique et 100 galaxies externes. Utilise les radiotelescopes les plus puissants du monde.",
    },
    url: "https://breakthroughinitiatives.org/initiative/1",
  },
  {
    title: { en: "Project Galileo (Harvard)", fr: "Projet Galilée (Harvard)" },
    subtitle: { en: "Harvard University — Prof. Avi Loeb · since 2021 · $1.7M", fr: "Université Harvard — Prof. Avi Loeb · depuis 2021 · 1,7 M$" },
    date: "2021",
    badge: { en: "Active", fr: "Actif" },
    badgeColor: "green",
    body: {
      en: "Searches for physical evidence of extraterrestrial technology on Earth and in the solar system. In 2023, recovered metallic spheres of anomalous composition from the Pacific Ocean floor from an interstellar meteor (IM1).",
      fr: "Cherche des preuves physiques de technologie extraterrestre sur Terre. En 2023, a récupéré des sphères métalliques de composition anormale au fond de l'océan Pacifique provenant d'un météore interstellaire (IM1).",
    },
    url: "https://projects.iq.harvard.edu/galileo",
  },
  {
    title: { en: "Allen Telescope Array (ATA)", fr: "Allen Telescope Array (ATA)" },
    subtitle: { en: "SETI Institute · since 2007", fr: "Institut SETI · depuis 2007" },
    date: "2007",
    badge: { en: "Active", fr: "Actif" },
    badgeColor: "green",
    body: {
      en: "Array of 42 antennas in California designed specifically for SETI. Can observe multiple stars simultaneously. Currently in a modernization phase to increase sensitivity.",
      fr: "Réseau de 42 antennes en Californie conçu spécifiquement pour le SETI. Peut observer plusieurs étoiles simultanément. En cours de modernisation pour augmenter la sensibilité.",
    },
    url: "https://www.seti.org/allen-telescope-array",
  },
  {
    title: { en: "SETI@home (legacy)", fr: "SETI@home (patrimoine)" },
    subtitle: { en: "UC Berkeley SETI Research Center · 1999–2020", fr: "Centre de recherche SETI UC Berkeley · 1999–2020" },
    date: "1999",
    badge: { en: "Paused", fr: "En pause" },
    badgeColor: "gray",
    body: {
      en: "Distributed computing project that processed radio telescope data using millions of home computers. Over 5 million volunteers participated. Paused in 2020 but data is still being analyzed.",
      fr: "Projet de calcul distribué qui traitait des données de radiotelescopes via des millions d'ordinateurs personnels. Plus de 5 millions de bénévoles ont participé. En pause depuis 2020.",
    },
    url: "https://setiathome.berkeley.edu/",
  },
];

export const setiSignals: DossierItem[] = [
  {
    title: { en: "WOW! Signal", fr: "Signal WOW !" },
    subtitle: { en: "Big Ear, Ohio State University · Aug 15, 1977", fr: "Big Ear, Ohio State University · 15 août 1977" },
    date: "1977",
    badge: { en: "Never repeated", fr: "Jamais répété" },
    badgeColor: "amber",
    body: {
      en: "The most famous signal in SETI history. Lasted 72 seconds, matched the hydrogen frequency (1.42 GHz) and had the expected intensity of an interstellar signal. Never repeated or satisfactorily explained.",
      fr: "Le signal le plus célèbre de l'histoire du SETI. A duré 72 secondes, correspondait à la fréquence hydrogène (1,42 GHz). N'a jamais été répété ni expliqué de manière satisfaisante.",
    },
    url: "https://www.bigear.org/wow.htm",
  },
  {
    title: { en: "BLC1 — Breakthrough Listen Candidate 1", fr: "BLC1 — Candidat Breakthrough Listen 1" },
    subtitle: { en: "Parkes Observatory, Australia · 2020", fr: "Observatoire Parkes, Australie · 2020" },
    date: "2020",
    badge: { en: "Ruled out (RFI)", fr: "Écarté (interférence)" },
    badgeColor: "gray",
    body: {
      en: "Signal detected from the direction of Proxima Centauri at 982 MHz. Generated massive media attention. Later concluded to be terrestrial radio frequency interference, not extraterrestrial.",
      fr: "Signal détecté dans la direction de Proxima du Centaure à 982 MHz. A généré une énorme attention médiatique. Finalement attribué à des interférences de radiofréquences terrestres.",
    },
    url: "https://breakthroughinitiatives.org/news/24",
  },
  {
    title: { en: "Tabby's Star (KIC 8462852)", fr: "L'Étoile de Tabby (KIC 8462852)" },
    subtitle: { en: "Kepler Space Telescope · 2015", fr: "Télescope spatial Kepler · 2015" },
    date: "2015",
    badge: { en: "Natural cause most likely", fr: "Cause naturelle probable" },
    badgeColor: "blue",
    body: {
      en: "Star with unprecedented irregular brightness fluctuations. Jason Wright (Penn State) proposed they could be megastructures ('Dyson spheres'). The most accepted explanation is now circumstellar dust.",
      fr: "Étoile avec des fluctuations de luminosité irrégulières sans précédent. Wright (Penn State) a proposé qu'il pourrait s'agir de méga-structures ('sphères de Dyson'). Cause actuelle : poussière circumstellaire.",
    },
    url: "https://www.psu.edu/news/research/story/astronomers-ponder-mysterious-flickering-star/",
  },
];

export const setiScience: DossierItem[] = [
  {
    title: { en: "What does SETI actually look for?", fr: "Que cherche réellement le SETI ?" },
    subtitle: { en: "SETI Institute", fr: "Institut SETI" },
    date: "",
    body: {
      en: "SETI searches for technosignatures: signals only advanced technology can produce. Radio at specific frequencies (hydrogen 1.42 GHz), laser pulses, megastructures blocking starlight, or heat residue from Type II/III Kardashev civilizations.",
      fr: "Le SETI cherche des technosignatures : signaux que seule une technologie avancée peut produire. Radio à des fréquences spécifiques (hydrogène 1,42 GHz), impulsions laser, méga-structures ou chaleur résiduelle de civilisations Kardashev.",
    },
    url: "https://www.seti.org/seti-institute/project/details/seti-searches",
  },
  {
    title: { en: "The Kardashev Scale", fr: "L'Échelle de Kardashev" },
    subtitle: { en: "Nikolai Kardashev · 1964", fr: "Nikolai Kardashev · 1964" },
    date: "1964",
    body: {
      en: "Type I: civilization uses all its planet's energy. Type II: uses all its star's energy (Dyson sphere). Type III: uses all its galaxy's energy. Humanity is currently approximately Type 0.73.",
      fr: "Type I : civilisation utilisant toute l'énergie de sa planète. Type II : énergie de son étoile (sphère de Dyson). Type III : énergie de sa galaxie. L'humanité est actuellement environ Type 0,73.",
    },
    url: "https://www.scientificamerican.com/article/the-kardashev-scale/",
  },
  {
    title: { en: "The Drake Equation", fr: "L'Équation de Drake" },
    subtitle: { en: "Frank Drake · 1961", fr: "Frank Drake · 1961" },
    date: "1961",
    body: {
      en: "Formulated in 1961. Estimates the number of civilizations we could communicate with in our galaxy. Variables include stellar formation rate, fraction of stars with habitable planets, and the mean lifespan of communicating civilizations.",
      fr: "Formulée en 1961. Estime le nombre de civilisations avec lesquelles nous pourrions communiquer dans notre galaxie. Inclut le taux de formation stellaire, la fraction de planètes habitables et la durée de vie des civilisations.",
    },
    url: "https://www.seti.org/drake-equation-index",
  },
  {
    title: { en: "The Great Silence — Fermi Paradox", fr: "Le Grand Silence — Paradoxe de Fermi" },
    subtitle: { en: "Enrico Fermi · 1950", fr: "Enrico Fermi · 1950" },
    date: "1950",
    body: {
      en: "If there are billions of stars with habitable planets and the universe is 13.8 billion years old, why have we detected no signals? Answers range from 'we are the first' to 'advanced civilizations don't use radio' or 'the Great Filter lies ahead.'",
      fr: "Si des milliards d'étoiles ont des planètes habitables et que l'univers a 13,8 milliards d'années, pourquoi n'avons-nous détecté aucun signal ? Réponses : 'nous sommes les premiers', 'les civilisations avancées n'utilisent pas la radio', ou 'le Grand Filtre est devant nous'.",
    },
    url: "https://www.seti.org/fermi-paradox",
  },
];

// ─── SPACEX DOSSIER ──────────────────────────────────────────────────────────

export const spacexMissions: DossierItem[] = [
  {
    title: { en: "Starship Flight 5 — Booster Catch", fr: "Vol Starship 5 — Capture du booster" },
    subtitle: { en: "SpaceX · October 2024", fr: "SpaceX · Octobre 2024" },
    date: "Oct 2024",
    badge: { en: "Completed", fr: "Complété" },
    badgeColor: "gray",
    body: {
      en: "Historic milestone: the Super Heavy booster returned to the launch pad and was caught by the mechanical arms 'Mechazilla'. First time in history an orbital rocket booster was caught mid-air.",
      fr: "Étape historique : le booster Super Heavy est revenu sur le pas de tir et a été attrapé par les bras mécaniques 'Mechazilla'. Première fois dans l'histoire qu'un booster orbital est capturé en vol.",
    },
    url: "https://www.spacex.com/vehicles/starship/",
  },
  {
    title: { en: "Crew Dragon — ISS Missions", fr: "Crew Dragon — Missions ISS" },
    subtitle: { en: "SpaceX / NASA · Active", fr: "SpaceX / NASA · Actif" },
    date: "2025",
    badge: { en: "Active", fr: "Actif" },
    badgeColor: "green",
    body: {
      en: "SpaceX transports astronauts to the ISS under NASA's Commercial Crew Program (CCP). Crew-10 is in development to rotate the crew currently aboard.",
      fr: "SpaceX transporte des astronautes vers l'ISS dans le cadre du programme d'équipage commercial de la NASA. Crew-10 est en développement pour la rotation de l'équipage actuellement à bord.",
    },
    url: "https://www.spacex.com/human-spaceflight/",
  },
  {
    title: { en: "Artemis — Lunar Human Landing System", fr: "Artemis — Système d'atterrissage lunaire" },
    subtitle: { en: "SpaceX / NASA · 2026", fr: "SpaceX / NASA · 2026" },
    date: "2026",
    badge: { en: "Upcoming", fr: "À venir" },
    badgeColor: "blue",
    body: {
      en: "SpaceX builds the HLS (Human Landing System) to land astronauts on the Moon under NASA's Artemis program. Based on a lunar version of Starship.",
      fr: "SpaceX construit le HLS (Système d'atterrissage humain) pour poser des astronautes sur la Lune dans le cadre du programme Artemis de la NASA. Basé sur une version lunaire de Starship.",
    },
    url: "https://www.nasa.gov/humans-in-space/artemis/",
  },
  {
    title: { en: "Starlink Gen 2 — Global Coverage", fr: "Starlink Gén. 2 — Couverture mondiale" },
    subtitle: { en: "SpaceX · Active · 6,000+ satellites", fr: "SpaceX · Actif · Plus de 6 000 satellites" },
    date: "2023–2025",
    badge: { en: "Active", fr: "Actif" },
    badgeColor: "green",
    body: {
      en: "Over 6,000 satellites in orbit operating in more than 100 countries. Gen 2 satellites with inter-satellite links allow speeds up to 1 Gbps and have been critical in emergency communications.",
      fr: "Plus de 6 000 satellites en orbite dans plus de 100 pays. Les satellites Gén. 2 avec des liaisons inter-satellites permettent des vitesses jusqu'à 1 Gbps.",
    },
    url: "https://www.starlink.com/",
  },
  {
    title: { en: "Falcon 9 — Record Reusability", fr: "Falcon 9 — Record de réutilisation" },
    subtitle: { en: "SpaceX · 2024", fr: "SpaceX · 2024" },
    date: "2024",
    badge: { en: "Completed", fr: "Complété" },
    badgeColor: "gray",
    body: {
      en: "A Falcon 9 booster completed its 23rd flight, setting the reusability record for orbital rockets. The booster landed on the droneship 'Of Course I Still Love You'. Over 300 successful Falcon 9 missions total.",
      fr: "Un booster Falcon 9 a effectué son 23e vol, établissant le record de réutilisation pour les fusées orbitales. Le booster a atterri sur le drone 'Of Course I Still Love You'. Plus de 300 missions réussies au total.",
    },
    url: "https://www.spacex.com/vehicles/falcon-9/",
  },
  {
    title: { en: "Starship — The Most Powerful Rocket Ever Built", fr: "Starship — La fusée la plus puissante jamais construite" },
    subtitle: { en: "SpaceX · 2024–2025", fr: "SpaceX · 2024–2025" },
    date: "2024",
    badge: { en: "Active testing", fr: "Tests actifs" },
    badgeColor: "blue",
    body: {
      en: "121 meters tall, 33 Raptor engines in the Super Heavy booster. Can carry up to 150 tonnes to low Earth orbit. The only rocket designed to be fully and rapidly reusable.",
      fr: "121 mètres de haut, 33 moteurs Raptor dans le booster Super Heavy. Peut transporter jusqu'à 150 tonnes en orbite terrestre basse. La seule fusée conçue pour être entièrement et rapidement réutilisable.",
    },
    url: "https://www.spacex.com/vehicles/starship/",
  },
];
