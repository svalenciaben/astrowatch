// Run with: node lib/cron.js
// This file runs the daily email cron job independently of Next.js

require("dotenv").config({ path: ".env.local" });
const cron = require("node-cron");

async function sendDaily() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/send-daily-email`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-cron-secret": process.env.CRON_SECRET || "astrowatch-cron" },
    });
    const data = await res.json();
    console.log(`[${new Date().toISOString()}] Daily email sent:`, data);
  } catch (err) {
    console.error(`[${new Date().toISOString()}] Failed to send daily email:`, err);
  }
}

// Every day at 8:00 AM Paris time
cron.schedule("0 8 * * *", sendDaily, { timezone: "Europe/Paris" });

console.log("AstroWatch cron scheduler started — daily email at 8:00 AM (Europe/Paris)");
