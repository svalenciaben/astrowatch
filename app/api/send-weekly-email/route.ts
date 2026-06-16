import { NextRequest, NextResponse } from "next/server";
import { fetchSpaceNews } from "@/lib/fetchNews";
import { sendWeeklyDigest } from "@/lib/mailer";

export async function POST(req: NextRequest) {
  const secret = req.headers.get("x-cron-secret");
  if (secret !== (process.env.CRON_SECRET || "astrowatch-cron")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json().catch(() => ({}));
    const email = body.email || process.env.DEFAULT_EMAIL || "svalenciaben@gmail.com";
    const lang = (body.lang || "en") as "en" | "fr";

    const news = await fetchSpaceNews();
    await sendWeeklyDigest(email, news, lang);

    return NextResponse.json({ success: true, sentTo: email, articles: news.length });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
