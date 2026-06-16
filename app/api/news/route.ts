import { NextRequest, NextResponse } from "next/server";
import { fetchSpaceNews } from "@/lib/fetchNews";
import { translateNewsItems } from "@/lib/translate";

export const revalidate = 21600; // 6 hours

export async function GET(req: NextRequest) {
  try {
    const lang = req.nextUrl.searchParams.get("lang") || "en";
    const news = await fetchSpaceNews();

    if (lang === "fr") {
      const translated = await translateNewsItems(
        news.map((n) => ({ title: n.title, description: n.description })),
        "fr"
      );
      const translatedNews = news.map((item, i) => ({
        ...item,
        title: translated[i].title,
        description: translated[i].description,
      }));
      return NextResponse.json({ news: translatedNews, timestamp: new Date().toISOString(), lang });
    }

    return NextResponse.json({ news, timestamp: new Date().toISOString(), lang });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch news" }, { status: 500 });
  }
}
