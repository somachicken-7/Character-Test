import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Bell, ShieldCheck, Sparkles, X } from "lucide-react";
import { NotificationItem } from "../types";

interface NotificationToastProps {
  lang: "id" | "en";
  activeColor?: string;
}

export default function NotificationToast({ lang, activeColor = "indigo" }: NotificationToastProps) {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [pushEnabled, setPushEnabled] = useState(false);
  const [dailyTip, setDailyTip] = useState("");

  const idTips = [
    "Merah: Cobalah mendelegasikan 1 tugas kecil hari ini demi melatih kepercayaan tim.",
    "Kuning: Buat list 3 tugas krusial sebelum memulai hari agar ide kreatif Anda terfokus.",
    "Biru: Beri batas waktu maksimal 15 menit untuk memikirkan alternatif sebelum memutuskan.",
    "Putih: Tolak 1 hal kecil dengan asertif hari ini untuk memperkuat batas diri Anda.",
    "Fokus belajar hari ini: Matikan notifikasi medsos selama 25 menit (Metode Pomodoro)."
  ];

  const enTips = [
    "Red: Try delegating 1 small task today to cultivate trust with your partners.",
    "Yellow: Pick 3 high-impact habits and log them first thing in the morning.",
    "Blue: Give yourself a crisp 15 minutes limit to analyze files before selecting.",
    "White: Say a polite 'No' to 1 distraction today to assert your boundary.",
    "Daily Study tip: Use the Pomodoro technique - block distractions for 25 minutes!"
  ];

  useEffect(() => {
    // Generate an initial tip
    const list = lang === "id" ? idTips : enTips;
    setDailyTip(list[Math.floor(Math.random() * list.length)]);

    // Check localStorage for push permission
    const saved = localStorage.getItem("aura_push_notifications");
    if (saved === "enabled") {
      setPushEnabled(true);
    }
  }, [lang]);

  // Simulate incoming notification every 45s
  useEffect(() => {
    if (!pushEnabled) return;

    const interval = setInterval(() => {
      const titles = lang === "id" 
        ? ["Pengingat Pengembangan Diri", "Amanah Kedisiplinan", "Tips Pembelajaran"] 
        : ["Self Development Flash", "Routine Discipline Alert", "Study Success Formula"];
      
      const list = lang === "id" ? idTips : enTips;
      const message = list[Math.floor(Math.random() * list.length)];

      const newNotif: NotificationItem = {
        id: String(Date.now()),
        title: titles[Math.floor(Math.random() * titles.length)],
        message,
        time: new Date().toLocaleTimeString(),
        type: "success"
      };

      setNotifications(prev => [newNotif, ...prev.slice(0, 2)]);
    }, 40000);

    return () => clearInterval(interval);
  }, [pushEnabled, lang]);

  const togglePush = () => {
    if (pushEnabled) {
      setPushEnabled(false);
      localStorage.setItem("aura_push_notifications", "disabled");
    } else {
      setPushEnabled(true);
      localStorage.setItem("aura_push_notifications", "enabled");
      
      // Push first notification instantly
      const instantNotif: NotificationItem = {
        id: String(Date.now()),
        title: lang === "id" ? "Notifikasi Diaktifkan! 🔔" : "Notifications Active! 🔔",
        message: lang === "id" 
          ? "Anda sekarang terhubung ke saluran tips belajar harian otomatis." 
          : "You are now beautifully subscribed to interactive daily character alerts.",
        time: new Date().toLocaleTimeString(),
        type: "info"
      };
      setNotifications([instantNotif]);
    }
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 border border-slate-100 shadow-xl max-w-lg mx-auto my-4 transition-all hover:shadow-2xl">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-3.5 bg-indigo-50 text-indigo-600 rounded-xl relative">
            <Bell className="w-6 h-6 animate-swing" id="bell-notif-icon" />
            {pushEnabled && (
              <span className="absolute top-2 right-2 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full"></span>
            )}
          </div>
          <div>
            <h4 className="font-semibold text-slate-800 tracking-tight text-sm">
              {lang === "id" ? "Reminder Belajar Harian" : "Daily Development Guide"}
            </h4>
            <p className="text-xs text-slate-500">
              {pushEnabled 
                ? (lang === "id" ? "Pengingat Aktif (Setiap 40s)" : "Push Alerts Active (Every 40s)")
                : (lang === "id" ? "Notifikasi belum aktif" : "Notifications inactive")}
            </p>
          </div>
        </div>

        <button
          onClick={togglePush}
          className={`px-4 py-2 rounded-xl text-xs font-medium transition-all duration-300 flex items-center gap-1.5 shadow-sm hover:scale-[1.02] active:scale-[0.98] ${
            pushEnabled
              ? "bg-rose-50 text-rose-600 hover:bg-rose-100/80"
              : "bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-indigo-100"
          }`}
          id="btn-toggle-notif"
        >
          {pushEnabled ? (
            <>
              <X className="w-3.5 h-3.5" />
              {lang === "id" ? "Matikan" : "Disable"}
            </>
          ) : (
            <>
              <ShieldCheck className="w-3.5 h-3.5" />
              {lang === "id" ? "Aktifkan" : "Enable"}
            </>
          )}
        </button>
      </div>

      <div className="p-4 bg-slate-50/60 rounded-xl border border-slate-100 flex items-start space-x-3 mb-4">
        <Sparkles className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
        <div>
          <span className="text-xs font-semibold text-indigo-700 tracking-wide uppercase block mb-1">
            {lang === "id" ? "REKOMENDASI BELAJAR HARI INI" : "TODAY'S HIGHLIGHTED SUGGESTION"}
          </span>
          <p className="text-sm text-slate-700 leading-relaxed font-medium">
            {dailyTip}
          </p>
        </div>
      </div>

      <AnimatePresence>
        {notifications.length > 0 && (
          <div className="space-y-3 mt-4">
            {notifications.map(notif => (
              <motion.div
                key={notif.id}
                initial={{ opacity: 0, scale: 0.9, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                className="p-4 rounded-xl shadow-lg border border-indigo-100 bg-gradient-to-r from-indigo-50 to-purple-50 flex items-start justify-between relative"
              >
                <div className="flex space-x-3 items-start pr-6">
                  <Sparkles className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-semibold text-slate-800 text-xs">
                      {notif.title}
                    </h5>
                    <p className="text-xs text-slate-600 leading-relaxed mt-1">
                      {notif.message}
                    </p>
                    <span className="text-[10px] text-slate-400 mt-2 block font-mono">
                      {notif.time}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => removeNotification(notif.id)}
                  className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200/50 absolute top-2.5 right-2.5"
                >
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
