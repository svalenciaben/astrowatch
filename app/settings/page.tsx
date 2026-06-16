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
  const [testResult, setTestResult] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("astrowatch-settings");
    if (stored) {
      const s = JSON.parse(stored);
      setEmail(s.email || "svalenciaben@gmail.com");
      setSendTime(s.sendTime || "08:00");
      setLang(s.lang || "en");
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
        headers: {
          "Content-Type": "application/json",
          "x-cron-secret": "astrowatch-cron",
        },
        body: JSON.stringify({ email, lang }),
      });
      const data = await res.json();
      setTestResult(data.success ? `✅ Email sent to ${data.sentTo}` : `❌ Error: ${data.error}`);
    } catch {
      setTestResult("❌ Failed to send test email");
    }
    setSending(false);
  };

  return (
    <div className="content min-h-screen">
      <Navbar />
      <main className="max-w-2xl mx-auto px-4 py-10">
        <h1 className="font-orbitron text-3xl font-bold text-space-neon mb-8">
          ⚙️ {t("settings.title")}
        </h1>

        <div className="space-y-6">
          {/* Email notifications */}
          <section className="bg-space-dark border border-space-blue/30 rounded-xl p-6">
            <h2 className="font-orbitron text-space-electric text-sm font-bold tracking-widest mb-4">
              📧 {t("settings.notifications")}
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-slate-300 text-sm mb-1">{t("settings.emailLabel")}</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-space-electric"
                />
              </div>
              <div>
                <label className="block text-slate-300 text-sm mb-1">{t("settings.timeLabel")}</label>
                <input
                  type="time"
                  value={sendTime}
                  onChange={(e) => setSendTime(e.target.value)}
                  className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-space-electric"
                />
              </div>
              <button
                onClick={sendTestEmail}
                disabled={sending}
                className="px-4 py-2 rounded-lg border border-space-alien/50 text-space-alien text-sm hover:bg-space-alien/10 transition-colors disabled:opacity-50"
              >
                {sending ? "Sending... 📡" : `🧪 ${t("settings.testEmail")}`}
              </button>
              {testResult && <p className="text-sm mt-2">{testResult}</p>}
            </div>
          </section>

          {/* Language */}
          <section className="bg-space-dark border border-space-blue/30 rounded-xl p-6">
            <h2 className="font-orbitron text-space-electric text-sm font-bold tracking-widest mb-4">
              🌐 {t("settings.language")}
            </h2>
            <div className="flex gap-3">
              {(["en", "fr"] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-5 py-2.5 rounded-lg border text-sm font-medium transition-all ${
                    lang === l
                      ? "bg-space-electric border-space-electric text-white"
                      : "border-slate-600 text-slate-400 hover:border-slate-400"
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
            className="w-full py-3 bg-space-blue hover:bg-space-electric rounded-xl font-orbitron font-bold text-white transition-colors"
          >
            {saved ? `✅ ${t("settings.saved")}` : t("settings.save")}
          </button>
        </div>
      </main>
    </div>
  );
}
