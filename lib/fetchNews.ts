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

async function resolveImage(url: string, articleUrl: string, category: string): Promise<string> {
  // Already has a real image
  if (url && url !== "/placeholder.jpg" && url.startsWith("http")) return url;

  // Try og:image scraping from the article
  try {
    const res = await fetch(articleUrl, {
      signal: AbortSignal.timeout(3000),
      headers: { "User-Agent": "AstroWatch/1.0" },
    });
    if (res.ok) {
      const html = await res.text();
      const match = html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i)
        || html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i);
      if (match?.[1]) return match[1];
    }
  } catch {}

  // Fallback: category-based Unsplash image
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

  // NASA APOD
  try {
    const nasaKey = process.env.NASA_API_KEY || "DEMO_KEY";
    const res = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=${nasaKey}&count=5`,
      { next: { revalidate: 21600 } }
    );
    if (res.ok) {
      const data = await res.json();
      data.forEach((item: any, i: number) => {
        const text = item.title + " " + (item.explanation || "");
        results.push({
          id: `nasa-apod-${i}`,
          title: item.title,
          description: item.explanation?.slice(0, 200) + "..." || "",
          url: `https://apod.nasa.gov/apod/astropix.html`,
          imageUrl: item.url || item.hdurl || "/placeholder.jpg",
          source: "NASA APOD",
          publishedAt: item.date,
          category: categoryFromSource("nasa", item.title),
          isAlert: isAlert(text),
          isExtraterrestrial: isET(text),
          etScore: computeETScore(item.title, item.explanation?.slice(0, 200) || ""),
        });
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

  // RSS fallback — Space.com
  try {
    const Parser = (await import("rss-parser")).default;
    const parser = new Parser();
    const feed = await parser.parseURL("https://www.space.com/feeds/all");
    feed.items.slice(0, 10).forEach((item: any, i: number) => {
      const text = (item.title || "") + " " + (item.contentSnippet || "");
      results.push({
        id: `rss-space-${i}`,
        title: item.title || "",
        description: item.contentSnippet?.slice(0, 200) || "",
        url: item.link || "",
        imageUrl: "/placeholder.jpg",
        source: "Space.com",
        publishedAt: item.pubDate || new Date().toISOString(),
        category: categoryFromSource("space.com", item.title || ""),
        isAlert: isAlert(text),
        isExtraterrestrial: isET(text),
        etScore: computeETScore(item.title || "", item.contentSnippet?.slice(0, 200) || ""),
      });
    });
  } catch {}

  // Deduplicate by title
  const seen = new Set<string>();
  const unique = results.filter((n) => {
    if (seen.has(n.title)) return false;
    seen.add(n.title);
    return true;
  });

  // Resolve missing images in parallel (max 8 concurrent)
  const withImages = await Promise.all(
    unique.map(async (n) => ({
      ...n,
      imageUrl: await resolveImage(n.imageUrl, n.url, n.category),
    }))
  );

  return withImages;
}
