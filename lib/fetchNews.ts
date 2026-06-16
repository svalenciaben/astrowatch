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

function isET(text: string): boolean {
  const lower = text.toLowerCase();
  return ET_KEYWORDS.some((kw) => lower.includes(kw));
}

function isAlert(text: string): boolean {
  const lower = text.toLowerCase();
  return ALERT_KEYWORDS.some((kw) => lower.includes(kw));
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
      });
    });
  } catch {}

  // Deduplicate by title
  const seen = new Set<string>();
  return results.filter((n) => {
    if (seen.has(n.title)) return false;
    seen.add(n.title);
    return true;
  });
}
