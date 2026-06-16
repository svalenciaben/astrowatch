import { NextResponse } from "next/server";
import { fetchSpaceNews } from "@/lib/fetchNews";

export const revalidate = 21600; // 6 hours

export async function GET() {
  try {
    const news = await fetchSpaceNews();
    return NextResponse.json({ news, timestamp: new Date().toISOString() });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch news" }, { status: 500 });
  }
}
