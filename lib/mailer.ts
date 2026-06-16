import nodemailer from "nodemailer";
import type { NewsItem } from "./fetchNews";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

function buildEmailHTML(news: NewsItem[], lang: "en" | "fr", appUrl: string): string {
  const t = {
    en: {
      greeting: "Your daily space briefing is here",
      topStories: "Top Stories Today",
      etAlert: "⚠️ Extraterrestrial Alert",
      etAlertDesc: "News today related to life beyond Earth!",
      readMore: "Read more →",
      viewAll: "View All News",
      unsubscribe: "Unsubscribe",
    },
    fr: {
      greeting: "Votre briefing spatial quotidien est arrivé",
      topStories: "Les meilleures histoires du jour",
      etAlert: "⚠️ Alerte Extraterrestre",
      etAlertDesc: "Actualités sur la vie au-delà de la Terre aujourd'hui !",
      readMore: "Lire la suite →",
      viewAll: "Voir Toutes les Nouvelles",
      unsubscribe: "Se désabonner",
    },
  }[lang];

  const top5 = news.slice(0, 5);
  const hasET = news.some((n) => n.isExtraterrestrial);
  const date = new Date().toLocaleDateString(lang === "fr" ? "fr-FR" : "en-US", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  });

  const newsCards = top5
    .map(
      (n) => `
    <tr>
      <td style="padding: 16px 0; border-bottom: 1px solid #1d4ed8;">
        <a href="${n.url}" style="color:#22d3ee;font-size:16px;font-weight:bold;text-decoration:none;">${n.title}</a>
        <p style="color:#94a3b8;font-size:13px;margin:6px 0;">${n.description}</p>
        <p style="color:#64748b;font-size:11px;margin:4px 0;">
          ${n.source} — ${new Date(n.publishedAt).toLocaleDateString()}
          ${n.isExtraterrestrial ? ' 👽' : ''}
          ${n.isAlert ? ' 🚨' : ''}
        </p>
        <a href="${n.url}" style="color:#3b82f6;font-size:12px;">${t.readMore}</a>
      </td>
    </tr>`
    )
    .join("");

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"/></head>
<body style="background:#030712;margin:0;padding:0;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center" style="padding:40px 20px;">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;">
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#0a0f1e,#1d4ed8);padding:32px;border-radius:12px 12px 0 0;text-align:center;">
              <h1 style="color:#22d3ee;font-size:32px;margin:0;letter-spacing:4px;">🚀 ASTROWATCH</h1>
              <p style="color:#94a3b8;margin:8px 0 0;">${date}</p>
              <p style="color:#e2e8f0;font-size:14px;margin:12px 0 0;">${t.greeting}</p>
            </td>
          </tr>
          <!-- ET Alert -->
          ${hasET ? `
          <tr>
            <td style="background:#052e16;padding:16px 24px;border-left:4px solid #4ade80;">
              <p style="color:#4ade80;font-weight:bold;margin:0;">${t.etAlert}</p>
              <p style="color:#86efac;font-size:13px;margin:4px 0 0;">${t.etAlertDesc}</p>
            </td>
          </tr>` : ""}
          <!-- News -->
          <tr>
            <td style="background:#0a0f1e;padding:24px;">
              <h2 style="color:#e2e8f0;font-size:18px;margin:0 0 16px;border-bottom:1px solid #1d4ed8;padding-bottom:12px;">${t.topStories}</h2>
              <table width="100%">${newsCards}</table>
            </td>
          </tr>
          <!-- CTA -->
          <tr>
            <td style="background:#0a0f1e;padding:16px 24px 32px;text-align:center;">
              <a href="${appUrl}" style="background:#3b82f6;color:white;padding:12px 32px;border-radius:8px;text-decoration:none;font-weight:bold;font-size:14px;">${t.viewAll}</a>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background:#030712;padding:16px;text-align:center;border-radius:0 0 12px 12px;">
              <p style="color:#475569;font-size:11px;margin:0;">
                AstroWatch — Space & ET Intelligence Hub<br/>
                <a href="${appUrl}/settings?unsubscribe=true" style="color:#475569;">${t.unsubscribe}</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export async function sendWeeklyDigest(
  to: string,
  news: NewsItem[],
  lang: "en" | "fr" = "en"
) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const top10 = news.slice(0, 10);
  const subject =
    lang === "fr"
      ? `🌟 AstroWatch — Le meilleur de la semaine`
      : `🌟 AstroWatch — Best of the week`;

  await transporter.sendMail({
    from: `AstroWatch <${process.env.GMAIL_USER}>`,
    to,
    subject,
    html: buildEmailHTML(top10, lang, appUrl),
  });
}

export async function sendDailyDigest(
  to: string,
  news: NewsItem[],
  lang: "en" | "fr" = "en"
) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const subject =
    lang === "fr"
      ? `🚀 AstroWatch Quotidien — ${new Date().toLocaleDateString("fr-FR")}`
      : `🚀 AstroWatch Daily — ${new Date().toLocaleDateString("en-US")}`;

  await transporter.sendMail({
    from: `AstroWatch <${process.env.GMAIL_USER}>`,
    to,
    subject,
    html: buildEmailHTML(news, lang, appUrl),
  });
}
