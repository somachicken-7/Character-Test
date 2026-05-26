import React from "react";
import { Lock, Sparkles, Heart, Briefcase, BookOpen, FileText, Award } from "lucide-react";

interface PremiumTeaserBlockProps {
  lang: "id" | "en";
  onUpgrade: () => void;
}

export default function PremiumTeaserBlock({ lang, onUpgrade }: PremiumTeaserBlockProps) {
  return (
    <div className="space-y-6" id="premium-conversion-teaser">
      {/* Visual Indicator of locked sections */}
      <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-[32px] p-6 sm:p-8 shadow-xl relative overflow-hidden border border-indigo-900/40">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-purple-500/15 rounded-full blur-3xl"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
          <div className="flex-grow space-y-4 text-center md:text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-[10px] font-black uppercase tracking-wider border border-amber-400/25">
              <Lock className="w-3 h-3 animate-pulse" />
              {lang === "id" ? "Detail Karakter & Rekap PDF Terkunci" : "Character Details & PDF Locked"}
            </span>

            <h3 className="text-xl sm:text-2xl font-black tracking-tight leading-tight">
              {lang === "id"
                ? "Buka Potensi Karakter Lengkap Anda!"
                : "Unlock Your Complete Personality Blueprint!"}
            </h3>

            <p className="text-xs text-indigo-200/95 leading-relaxed font-semibold">
              {lang === "id"
                ? "Dapatkan penjelasan super mendalam setebal ratusan halaman seputar aspek motivasi, rintangan mental, peta potensi karir, serta tips jodoh ideal untuk menyempurnakan kualitas hidup Anda."
                : "Claim your 112-page intensive analytical profile covering psychological blindspots, career paths matched by experts, love matching, and certification."}
            </p>

            {/* Locked feature lists with elegant bullets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-2">
              <div className="flex items-center gap-2 font-bold text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0"></span>
                <span>{lang === "id" ? "3 Karir & Hobi Terbaik Anda" : "Top 3 Jobs & Wellness Hobbies"}</span>
              </div>
              <div className="flex items-center gap-2 font-bold text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0"></span>
                <span>{lang === "id" ? "Strengths & Weaknesses Super Mendalam" : "Deep Strengths & Weaknesses"}</span>
              </div>
              <div className="flex items-center gap-2 font-bold text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0"></span>
                <span>{lang === "id" ? "Analisis Sub-Sadar & Pencocokan Jodoh" : "Subconscious & Love Compatibility"}</span>
              </div>
              <div className="flex items-center gap-2 font-bold text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0"></span>
                <span>{lang === "id" ? "Unduh Sertifikat PDF Resmi Hartman" : "Official PDF Certified Hologram"}</span>
              </div>
            </div>
          </div>

          {/* Special price pricing card */}
          <div className="shrink-0 flex flex-col items-center justify-center p-6 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 text-center w-full md:w-64 shadow-lg">
            <span className="text-[10px] font-black text-amber-300 uppercase tracking-widest block">PROMO SPECIAL PRICE</span>
            <p className="text-2xl font-black mt-1 text-white">
              {lang === "id" ? "Rp 25.000" : "$5.00 / one-time"}
            </p>
            <p className="text-[10px] text-slate-300 mt-1 font-semibold">
              {lang === "id" ? "Akses Selamanya • Sekali Bayar" : "Lifetime Access • No Subscriptions"}
            </p>
            <button
              onClick={onUpgrade}
              className="mt-4 w-full py-3 px-4 rounded-xl bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 text-slate-950 text-xs font-black transition-all transform hover:scale-[1.03] active:scale-95 flex items-center justify-center gap-2 shadow-lg shadow-yellow-500/20"
            >
              <Sparkles className="w-4 h-4 text-slate-950" />
              <span>{lang === "id" ? "Upgrade Ke Premium" : "Upgrade to Premium"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
