// MyMemory free translation API — no key needed, ~5000 chars/day
async function translateText(text: string, to: string): Promise<string> {
  if (!text || to === "en") return text;
  try {
    const res = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text.slice(0, 500))}&langpair=en|${to}`,
      { signal: AbortSignal.timeout(4000) }
    );
    const data = await res.json();
    return data?.responseData?.translatedText || text;
  } catch {
    return text;
  }
}

export async function translateNewsItems(
  items: { title: string; description: string }[],
  lang: string
): Promise<{ title: string; description: string }[]> {
  if (lang === "en") return items;

  // Translate in parallel batches of 5 to avoid rate limits
  const results: { title: string; description: string }[] = [];
  for (let i = 0; i < items.length; i += 5) {
    const batch = items.slice(i, i + 5);
    const translated = await Promise.all(
      batch.map(async (item) => ({
        title: await translateText(item.title, lang),
        description: await translateText(item.description, lang),
      }))
    );
    results.push(...translated);
  }
  return results;
}
