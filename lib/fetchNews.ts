// ── In-memory stale-while-revalidate cache ───────────────────────
let _cache: { data: NewsItem[]; time: number } | null = null;
const CACHE_TTL = 5 * 60 * 1000;

export async function fetchSpaceNewsCached(): Promise<NewsItem[]> {
  const now = Date.now();
  if (_cache && now - _cache.time < CACHE_TTL) {
    fetchSpaceNews().then(d => { _cache = { data: d, time: Date.now() }; }).catch(() => {});
    return _cache.data;
  }
  const data = await fetchSpaceNews();
  _cache = { data, time: now };
  return data;
}

export interface NewsItem {
  id: string;
  title: string;
  description: string;
  url: string;
  imageUrl: string;
  source: string;
  publishedAt: string;
  category: string;
  isAlert: boolean;
  isExtraterrestrial: boolean;
  etScore: number;
}

const ET_KEYWORDS = [
  "extraterrestrial", "alien", "ufo", "uap", "seti", "exoplanet",
  "life beyond earth", "astrobiology", "extraterrestre", "ovni",
  "biosignature", "technosignature", "habitable", "microbial life",
  "james webb alien", "phosphine", "oxygen exoplanet",
];

const ALERT_KEYWORDS = [
  "breaking", "discovered", "confirmed", "historic", "unprecedented",
  "first ever", "major discovery", "announcement",
];

export function computeETScore(title: string, description: string): number {
  const text = (title + " " + description).toLowerCase();
  let score = 0;
  for (const kw of ET_KEYWORDS) {
    if (text.includes(kw)) score++;
  }
  return Math.min(score, 10);
}

function isET(text: string): boolean {
  const lower = text.toLowerCase();
  return ET_KEYWORDS.some((kw) => lower.includes(kw));
}

function isAlert(text: string): boolean {
  const lower = text.toLowerCase();
  return ALERT_KEYWORDS.some((kw) => lower.includes(kw));
}

// Unsplash source images (free, no key needed for source API)
const CATEGORY_IMAGES: Record<string, string> = {
  spacex: "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?w=600&q=80",
  uap: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=600&q=80",
  exoplanets: "https://images.unsplash.com/photo-1614642264762-d0a3b8bf3700?w=600&q=80",
  seti: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=600&q=80",
  missions: "https://images.unsplash.com/photo-1517976487492-5750f3195933?w=600&q=80",
  nasa: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80",
};

function resolveImage(url: string, category: string): string {
  if (url && url !== "/placeholder.jpg" && url.startsWith("http")) return url;
  return CATEGORY_IMAGES[category] || CATEGORY_IMAGES.nasa;
}

function categoryFromSource(source: string, title: string): string {
  const lower = (source + " " + title).toLowerCase();
  if (lower.includes("spacex")) return "spacex";
  if (lower.includes("uap") || lower.includes("ufo") || lower.includes("ovni")) return "uap";
  if (lower.includes("exoplanet") || lower.includes("exoplanète")) return "exoplanets";
  if (lower.includes("seti")) return "seti";
  if (lower.includes("mission") || lower.includes("launch") || lower.includes("lancement")) return "missions";
  return "nasa";
}

export async function fetchSpaceNews(): Promise<NewsItem[]> {
  const results: NewsItem[] = [];

  // NASA APOD — only today's photo
  try {
    const nasaKey = process.env.NASA_API_KEY || "DEMO_KEY";
    const res = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=${nasaKey}`,
      { next: { revalidate: 3600 } }
    );
    if (res.ok) {
      const item = await res.json();
      const text = item.title + " " + (item.explanation || "");
      results.push({
        id: `nasa-apod-today`,
        title: item.title,
        description: item.explanation?.slice(0, 220) + "..." || "",
        url: `https://apod.nasa.gov/apod/astropix.html`,
        imageUrl: item.url || item.hdurl || "/placeholder.jpg",
        source: "NASA APOD",
        publishedAt: new Date(item.date).toISOString(),
        category: categoryFromSource("nasa", item.title),
        isAlert: isAlert(text),
        isExtraterrestrial: isET(text),
        etScore: computeETScore(item.title, item.explanation?.slice(0, 220) || ""),
      });
    }
  } catch {}

  // NewsAPI
  try {
    const newsKey = process.env.NEWS_API_KEY;
    if (newsKey && newsKey !== "your_newsapi_key_here") {
      const queries = ["space exploration", "UFO UAP extraterrestrial", "NASA SpaceX launch", "exoplanet discovery"];
      for (const q of queries) {
        const res = await fetch(
          `https://newsapi.org/v2/everything?q=${encodeURIComponent(q)}&language=en&sortBy=publishedAt&pageSize=5&apiKey=${newsKey}`,
          { next: { revalidate: 21600 } }
        );
        if (res.ok) {
          const data = await res.json();
          (data.articles || []).forEach((a: any, i: number) => {
            const text = a.title + " " + (a.description || "");
            results.push({
              id: `newsapi-${q.slice(0, 5)}-${i}`,
              title: a.title,
              description: a.description || "",
              url: a.url,
              imageUrl: a.urlToImage || "/placeholder.jpg",
              source: a.source?.name || "NewsAPI",
              publishedAt: a.publishedAt,
              category: categoryFromSource(a.source?.name || "", a.title),
              isAlert: isAlert(text),
              isExtraterrestrial: isET(text),
              etScore: computeETScore(a.title, a.description || ""),
            });
          });
        }
      }
    }
  } catch {}

  // RSS feeds
  const RSS_SOURCES = [
    { url: "https://www.universetoday.com/feed/", id: "ut", name: "Universe Today" },
    { url: "https://www.space.com/feeds.xml", id: "space", name: "Space.com" },
    { url: "https://www.nasaspaceflight.com/feed/", id: "nsf", name: "NASASpaceFlight" },
    { url: "https://arstechnica.com/science/feed/", id: "ars", name: "Ars Technica" },
    { url: "https://skyandtelescope.org/astronomy-news/feed/", id: "sat", name: "Sky & Telescope" },
    { url: "https://www.planetary.org/articles/feed.xml", id: "tps", name: "The Planetary Society" },
    { url: "https://www.nasa.gov/rss/dyn/breaking_news.rss", id: "nasa-news", name: "NASA News" },
    { url: "https://www.esa.int/rssfeed/Our_Activities/Space_Science", id: "esa", name: "ESA" },
  ];

  try {
    const Parser = (await import("rss-parser")).default;
    const parser = new Parser({ timeout: 4000 });

    await Promise.allSettled(
      RSS_SOURCES.map(async (src) => {
        try {
          const feed = await parser.parseURL(src.url);
          feed.items.slice(0, 6).forEach((item: any, i: number) => {
            const text = (item.title || "") + " " + (item.contentSnippet || "");
            // Extract image from media:content or enclosure
            const imgUrl =
              item["media:content"]?.["$"]?.url ||
              item["media:thumbnail"]?.["$"]?.url ||
              item.enclosure?.url ||
              "/placeholder.jpg";
            results.push({
              id: `rss-${src.id}-${i}`,
              title: item.title || "",
              description: item.contentSnippet?.slice(0, 220) || "",
              url: item.link || "",
              imageUrl: imgUrl,
              source: src.name,
              publishedAt: item.pubDate || item.isoDate || new Date().toISOString(),
              category: categoryFromSource(src.name, item.title || ""),
              isAlert: isAlert(text),
              isExtraterrestrial: isET(text),
              etScore: computeETScore(item.title || "", item.contentSnippet?.slice(0, 220) || ""),
            });
          });
        } catch {}
      })
    );
  } catch {}

  // Filter: current year, with a hard floor of 2024 in case of bad feed dates
  const currentYear = new Date().getFullYear();
  const cutoff = new Date(`${Math.max(currentYear, 2024)}-01-01`).getTime();
  const recent = results.filter((n) => {
    const t = new Date(n.publishedAt).getTime();
    return !isNaN(t) && t >= cutoff;
  });

  // Deduplicate by title
  const seen = new Set<string>();
  const unique = recent.filter((n) => {
    if (seen.has(n.title)) return false;
    seen.add(n.title);
    return true;
  });

  // Sort by most recent first
  unique.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  return unique.map((n) => ({ ...n, imageUrl: resolveImage(n.imageUrl, n.category) }));
}
