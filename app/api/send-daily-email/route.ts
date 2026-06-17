import { NextRequest, NextResponse } from "next/server";
import { fetchSpaceNews } from "@/lib/fetchNews";
import { sendDailyDigest } from "@/lib/mailer";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const email = body.email || process.env.DEFAULT_EMAIL || "svalenciaben@gmail.com";
    const lang = (body.lang || "en") as "en" | "fr";

    const news = await fetchSpaceNews();
    await sendDailyDigest(email, news, lang);

    return NextResponse.json({ success: true, sentTo: email, articles: news.length });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
