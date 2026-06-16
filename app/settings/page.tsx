"use client";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "@/lib/i18n";
import Navbar from "@/components/Navbar";

export default function SettingsPage() {
  const { t, i18n } = useTranslation();
  const [email, setEmail] = useState("svalenciaben@gmail.com");
  const [sendTime, setSendTime] = useState("08:00");
  const [lang, setLang] = useState<"en" | "fr">("en");
  const [saved, setSaved] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendingWeekly, setSendingWeekly] = useState(false);
  const [testResult, setTestResult] = useState("");
  const [weeklyResult, setWeeklyResult] = useState("");
  const [notifStatus, setNotifStatus] = useState<string>("");

  useEffect(() => {
    const stored = localStorage.getItem("astrowatch-settings");
    if (stored) {
      const s = JSON.parse(stored);
      setEmail(s.email || "svalenciaben@gmail.com");
      setSendTime(s.sendTime || "08:00");
      setLang(s.lang || "en");
    }
    if (typeof Notification !== "undefined") {
      setNotifStatus(Notification.permission);
    }
  }, []);

  const saveSettings = () => {
    localStorage.setItem("astrowatch-settings", JSON.stringify({ email, sendTime, lang }));
    i18n.changeLanguage(lang);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const sendTestEmail = async () => {
    setSending(true);
    setTestResult("");
    try {
      const res = await fetch("/api/send-daily-email", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-cron-secret": "astrowatch-cron" },
        body: JSON.stringify({ email, lang }),
      });
      const data = await res.json();
      setTestResult(data.success ? `✅ Daily email sent to ${data.sentTo}` : `❌ Error: ${data.error}`);
    } catch {
      setTestResult("❌ Failed to send test email");
    }
    setSending(false);
  };

  const sendWeeklyEmail = async () => {
    setSendingWeekly(true);
    setWeeklyResult("");
    try {
      const res = await fetch("/api/send-weekly-email", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-cron-secret": "astrowatch-cron" },
        body: JSON.stringify({ email, lang }),
      });
      const data = await res.json();
      setWeeklyResult(data.success ? `✅ Weekly digest sent to ${data.sentTo}` : `❌ Error: ${data.error}`);
    } catch {
      setWeeklyResult("❌ Failed to send weekly digest");
    }
    setSendingWeekly(false);
  };

  const enableNotifications = async () => {
    if (typeof Notification === "undefined") {
      setNotifStatus("not supported");
      return;
    }
    const perm = await Notification.requestPermission();
    setNotifStatus(perm);
  };

  return (
    <div className="content min-h-screen">
      <Navbar />
      <main className="max-w-2xl mx-auto px-6 py-12">
        <div className="mb-10">
          <p className="text-space-muted text-xs font-inter uppercase tracking-widest mb-4">Configuration</p>
          <h1 className="font-playfair text-4xl text-space-deep font-semibold leading-tight">
            {t("settings.title")}
          </h1>
          <div className="divider mt-8"></div>
        </div>

        <div className="space-y-6">
          {/* Email notifications */}
          <section className="bg-white border border-space-sand/60 rounded-lg p-6">
            <h2 className="text-space-muted text-xs uppercase tracking-widest font-medium font-inter mb-4">
              Email notifications
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-space-dim text-sm mb-1 font-inter">{t("settings.emailLabel")}</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-space-cream border border-space-sand rounded px-4 py-2 text-space-deep text-sm focus:outline-none focus:border-space-warm font-inter"
                />
              </div>
              <div>
                <label className="block text-space-dim text-sm mb-1 font-inter">{t("settings.timeLabel")}</label>
                <input
                  type="time"
                  value={sendTime}
                  onChange={(e) => setSendTime(e.target.value)}
                  className="bg-space-cream border border-space-sand rounded px-4 py-2 text-space-deep text-sm focus:outline-none focus:border-space-warm font-inter"
                />
              </div>
              <div className="flex gap-3 flex-wrap">
                <button
                  onClick={sendTestEmail}
                  disabled={sending}
                  className="px-4 py-2 rounded border border-space-sand text-space-dim text-sm hover:border-space-warm hover:text-space-ink transition-colors disabled:opacity-50 font-inter"
                >
                  {sending ? "Sending..." : "Send daily digest"}
                </button>
                <button
                  onClick={sendWeeklyEmail}
                  disabled={sendingWeekly}
                  className="px-4 py-2 rounded border border-space-sand text-space-dim text-sm hover:border-space-warm hover:text-space-ink transition-colors disabled:opacity-50 font-inter"
                >
                  {sendingWeekly ? "Sending..." : "Send weekly digest"}
                </button>
              </div>
              {testResult && <p className="text-sm font-inter mt-1">{testResult}</p>}
              {weeklyResult && <p className="text-sm font-inter mt-1">{weeklyResult}</p>}
            </div>
          </section>

          {/* Push notifications */}
          <section className="bg-white border border-space-sand/60 rounded-lg p-6">
            <h2 className="text-space-muted text-xs uppercase tracking-widest font-medium font-inter mb-4">
              Push notifications
            </h2>
            <p className="text-space-dim text-xs font-inter font-light mb-4">
              Get browser notifications for breaking space news.
            </p>
            <div className="flex items-center gap-4">
              <button
                onClick={enableNotifications}
                disabled={notifStatus === "granted"}
                className="px-4 py-2 rounded border border-space-sand text-space-dim text-sm hover:border-space-warm hover:text-space-ink transition-colors disabled:opacity-50 font-inter"
              >
                {notifStatus === "granted" ? "Notifications enabled ✓" : "Enable notifications"}
              </button>
              {notifStatus && notifStatus !== "granted" && (
                <span className="text-[10px] text-space-muted font-inter capitalize">{notifStatus}</span>
              )}
            </div>
          </section>

          {/* Language */}
          <section className="bg-white border border-space-sand/60 rounded-lg p-6">
            <h2 className="text-space-muted text-xs uppercase tracking-widest font-medium font-inter mb-4">
              {t("settings.language")}
            </h2>
            <div className="flex gap-3">
              {(["en", "fr"] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-5 py-2.5 rounded border text-sm font-medium transition-all font-inter ${
                    lang === l
                      ? "bg-space-deep border-space-deep text-white"
                      : "border-space-sand text-space-muted hover:border-space-warm"
                  }`}
                >
                  {l === "en" ? "🇺🇸 English" : "🇫🇷 Français"}
                </button>
              ))}
            </div>
          </section>

          {/* Save */}
          <button
            onClick={saveSettings}
            className="w-full py-3 bg-space-deep hover:bg-space-ink rounded-lg font-inter font-medium text-white transition-colors text-sm"
          >
            {saved ? `✅ ${t("settings.saved")}` : t("settings.save")}
          </button>
        </div>

        <footer className="mt-16 pt-8 border-t border-space-sand text-center">
          <p className="text-space-warm text-xs font-inter font-light">
            AstroWatch · Settings stored locally
          </p>
        </footer>
      </main>
    </div>
  );
}
