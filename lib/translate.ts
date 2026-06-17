async function translateText(text: string, to: string): Promise<string> {
  if (!text || to === "en") return text;
  try {
    const res = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text.slice(0, 500))}&langpair=en|${to}`,
      { signal: AbortSignal.timeout(4000) }
    );
    const data = await res.json();
    const translated: string = data?.responseData?.translatedText || "";
    // MyMemory returns ALL CAPS warning when quota is exceeded — fall back to original
    if (!translated || translated === translated.toUpperCase()) return text;
    return translated;
  } catch {
    return text;
  }
}

export async function translateNewsItems(
  items: { title: string; description: string }[],
  lang: string
): Promise<{ title: string; description: string }[]> {
  if (lang === "en") return items;

  // Only translate first 20 items to stay within free quota (5000 chars/day)
  const results: { title: string; description: string }[] = [];
  for (let i = 0; i < items.length; i += 5) {
    const batch = items.slice(i, i + 5);
    if (i < 20) {
      const translated = await Promise.all(
        batch.map(async (item) => ({
          title: await translateText(item.title, lang),
          description: await translateText(item.description, lang),
        }))
      );
      results.push(...translated);
    } else {
      results.push(...batch);
    }
  }
  return results;
}
