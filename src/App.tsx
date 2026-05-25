import React, { useState, useEffect } from "react";
import { 
  User, 
  MapPin, 
  Sparkles, 
  BookOpen, 
  Briefcase, 
  Heart, 
  Award, 
  Share2, 
  Download, 
  History, 
  ShieldCheck, 
  Settings, 
  FileText, 
  Layers, 
  ChevronRight, 
  ChevronLeft, 
  Send, 
  CheckCircle, 
  X, 
  LogOut, 
  Globe, 
  Activity, 
  TrendingUp, 
  DollarSign, 
  Smartphone, 
  HelpCircle,
  Copy,
  PlusCircle,
  FileSpreadsheet,
  Grid,
  Bell,
  Check,
  AlertCircle,
  Mail,
  Lock
} from "lucide-react";
import { PersonalityColor, UserProfile, ColorScore, AnalysisResult, Transaction, UserAccount } from "./types";
import { translations, questionsList, questionStrings } from "./translations";
import NotificationToast from "./components/NotificationToast";

export default function App() {
  // Locale State
  const [lang, setLang] = useState<"id" | "en">("id");

  // User Role State
  const [currentUserRole, setCurrentUserRole] = useState<"user" | "admin">(() => {
    return (localStorage.getItem("aura_active_role") as "user" | "admin") || "user";
  });

  // PIN Verification Modal for Admin Access
  const [showAdminPinModal, setShowAdminPinModal] = useState(false);
  const [adminPinInput, setAdminPinInput] = useState("");
  const [adminPinError, setAdminPinError] = useState("");

  // User Accounts & Session State
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(() => {
    const saved = localStorage.getItem("aura_current_user");
    return saved ? JSON.parse(saved) : null;
  });

  const [allUsers, setAllUsers] = useState<UserAccount[]>(() => {
    const saved = localStorage.getItem("aura_all_users");
    if (saved) return JSON.parse(saved);
    const seed: UserAccount[] = [
      { id: "user-ariel", emailOrPhone: "ariel.pratama@gmail.com", name: "Ariel Pratama", provider: "local", createdAt: "2026-05-24T18:00:00Z" },
      { id: "user-dewi", emailOrPhone: "dewi.angg@yahoo.com", name: "Dewi Anggraini", provider: "local", createdAt: "2026-05-23T08:00:00Z" }
    ];
    localStorage.setItem("aura_all_users", JSON.stringify(seed));
    return seed;
  });

  // Client Authentication form controls
  const [authTab, setAuthTab] = useState<"login" | "register">("login");
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authName, setAuthName] = useState("");
  const [authError, setAuthError] = useState("");

  // Google OAuth Simulation state
  const [showGoogleModal, setShowGoogleModal] = useState(false);
  const [googleEmailInput, setGoogleEmailInput] = useState("");
  const [googleNameInput, setGoogleNameInput] = useState("");

  // Admin active sub-tab
  const [adminActiveTab, setAdminActiveTab] = useState<"financial" | "users">("financial");

  // App Navigation state
  const [currentStep, setCurrentStep] = useState<"profile" | "quiz" | "result" | "history" | "admin" | "transactions">("profile");

  // Personal Profile inputs state
  const [profile, setProfile] = useState<UserProfile>({
    name: "",
    age: 22,
    gender: "Laki-laki",
    occupation: ""
  });

  // Quiz progression state
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, PersonalityColor>>({});

  // Active result computed
  const [activeResult, setActiveResult] = useState<AnalysisResult | null>(null);

  // History Log list state
  const [historyList, setHistoryList] = useState<AnalysisResult[]>([]);

  // Premium Transactions tracking state
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // Simulated current User Premium subscription state
  const [isPremiumUser, setIsPremiumUser] = useState(false);

  // UI state for Premium payment dialog / actions
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [selectedPayMethod, setSelectedPayMethod] = useState<"Bank Transfer" | "Saweria">("Saweria");
  const [userWaNumber, setUserWaNumber] = useState("");
  const [transactionNote, setTransactionNote] = useState("");
  const [receiptFileSimulated, setReceiptFileSimulated] = useState<string>("");
  const [activeOrderPending, setActiveOrderPending] = useState<Transaction | null>(null);

  // Active sub-tab inside analysis results screen
  const [activeTab, setActiveTab] = useState<"strengths" | "weakness" | "career" | "hobbies" | "learning" | "premium-consult">("strengths");

  // Premium AI Counselor Chat state
  const [chatInput, setChatInput] = useState("");
  const [chatHistory, setChatHistory] = useState<Array<{ role: "user" | "model"; text: string }>>([]);
  const [isChatLoading, setIsChatLoading] = useState(false);

  // Success alert states
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [copyAck, setCopyAck] = useState(false);

  // Seed initial values in standard localStorage to make app feel populated and lively
  useEffect(() => {
    // 1. Read History
    const storedHistory = localStorage.getItem("aura_history");
    if (storedHistory) {
      setHistoryList(JSON.parse(storedHistory));
    } else {
      // Seed initial trace data so experience looks rich immediately
      const seedHistory: AnalysisResult[] = [
        {
          id: "hist-1",
          date: "2026-04-12T10:30:00Z",
          userProfile: { name: "Ariel Pratama", age: 24, gender: "Laki-laki", occupation: "Software Engineer" },
          scores: [
            { color: PersonalityColor.BLUE, percentage: 50, count: 5 },
            { color: PersonalityColor.RED, percentage: 30, count: 3 },
            { color: PersonalityColor.WHITE, percentage: 10, count: 1 },
            { color: PersonalityColor.YELLOW, percentage: 10, count: 1 }
          ],
          dominantColor: PersonalityColor.BLUE,
          secondaryColor: PersonalityColor.RED,
          hobbies: ["Investasi & Trading", "Coding / Robotika", "Menyusun Puzzle / Lego"],
          jobs: ["Analis Data", "Programmer", "Research Scientist"],
          learningStyle: "Detail-oriented technical steps",
          isPremium: false
        }
      ];
      localStorage.setItem("aura_history", JSON.stringify(seedHistory));
      setHistoryList(seedHistory);
    }

    // 2. Read Transactions
    const storedTransactions = localStorage.getItem("aura_transactions");
    if (storedTransactions) {
      setTransactions(JSON.parse(storedTransactions));
    } else {
      const seedTx: Transaction[] = [
        {
          id: "TX-9921",
          userId: "user-ariel",
          userName: "Ariel Pratama",
          userEmail: "ariel.pratama@gmail.com",
          date: "2026-05-24T18:22:15Z",
          amount: 49000,
          paymentMethod: "Saweria",
          status: "Pending",
          whatsappNumber: "08123456789",
          receiptUrl: "https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?w=100&q=80",
          notes: "Tolong verifikasi berkas premium saya untuk karir IT."
        },
        {
          id: "TX-4402",
          userId: "user-dewi",
          userName: "Dewi Anggraini",
          userEmail: "dewi.angg@yahoo.com",
          date: "2026-05-23T09:15:00Z",
          amount: 49000,
          paymentMethod: "Bank Transfer",
          status: "Success",
          whatsappNumber: "082211443355",
          receiptUrl: "https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?w=100&q=80",
          notes: "Pembayaran lunas via BCA"
        }
      ];
      localStorage.setItem("aura_transactions", JSON.stringify(seedTx));
      setTransactions(seedTx);
    }

    // Check premium status
    const isPrem = localStorage.getItem("aura_premium_unlocked");
    if (isPrem === "true") {
      setIsPremiumUser(true);
    }
  }, []);

  // Auto-sync client's logged in name to the analysis profile name input
  useEffect(() => {
    if (currentUser) {
      setProfile(prev => ({
        ...prev,
        name: currentUser.name
      }));
    }
  }, [currentUser]);

  // Protect admin steps from normal user role
  useEffect(() => {
    if (currentUserRole === "user" && currentStep === "admin") {
      setCurrentStep("profile");
    }
  }, [currentUserRole, currentStep]);

  // Utility to fire temporary toasted updates
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  // Switch App language
  const toggleLanguage = (selectedLang: "id" | "en") => {
    setLang(selectedLang);
    showToast(selectedLang === "id" ? "Bahasa diubah ke Indonesia 🇮🇩" : "Language switched to English 🇺🇸");
  };

  // Submit User Profile to entry quiz
  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile.name.trim()) {
      showToast(lang === "id" ? "Mohon masukkan nama lengkap Anda" : "Please enter your full name");
      return;
    }
    if (!profile.occupation.trim()) {
      showToast(lang === "id" ? "Mohon tentukan profesi/aktivitas Anda saat ini" : "Please define your current occupation");
      return;
    }
    setCurrentStep("quiz");
    setCurrentQuestionIdx(0);
    setAnswers({});
  };

  // Reset or retake test
  const handleRetakeTest = () => {
    setAnswers({});
    setCurrentQuestionIdx(0);
    setCurrentStep("quiz");
  };

  // Handle quiz options clicked
  const handleAnswerSelect = (color: PersonalityColor) => {
    setAnswers(prev => ({ ...prev, [currentQuestionIdx]: color }));
    
    // Automatically proceed to next or finish
    if (currentQuestionIdx < questionsList.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIdx(prev => prev + 1);
      }, 350);
    }
  };

  // Evaluate results scores
  const computeAnalysis = () => {
    const totalQuestions = questionsList.length;
    const answeredCount = Object.keys(answers).length;
    
    if (answeredCount < totalQuestions) {
      showToast(lang === "id" 
        ? `Selesaikan semua ${totalQuestions} pertanyaan psikologi terlebih dahulu` 
        : `Please answer all ${totalQuestions} psychological questions`);
      return;
    }

    // Count colors
    const counts = {
      [PersonalityColor.RED]: 0,
      [PersonalityColor.YELLOW]: 0,
      [PersonalityColor.BLUE]: 0,
      [PersonalityColor.WHITE]: 0,
    };

    Object.values(answers).forEach(color => {
      const c = color as PersonalityColor;
      if (counts[c] !== undefined) {
        counts[c] += 1;
      }
    });

    // Translate to percentages
    const colorScores: ColorScore[] = Object.keys(counts).map(key => {
      const c = key as PersonalityColor;
      return {
        color: c,
        count: counts[c],
        percentage: Math.round((counts[c] / totalQuestions) * 100)
      };
    }).sort((a,b) => b.percentage - a.percentage);

    // Compute dominant & secondary
    const dominantColor = colorScores[0].color;
    const secondaryColor = colorScores[1]?.percentage > 0 ? colorScores[1].color : dominantColor;

    // Pull jobs, hobbies based on dominant color details
    const activeColorDetails = translations[lang].colorDetails[dominantColor];

    const result: AnalysisResult = {
      id: "res-" + Date.now(),
      userId: currentUser?.id,
      date: new Date().toISOString(),
      userProfile: { ...profile },
      scores: colorScores,
      dominantColor,
      secondaryColor,
      hobbies: activeColorDetails.hobbies,
      jobs: activeColorDetails.jobs,
      learningStyle: activeColorDetails.learningStyle,
      isPremium: isPremiumUser
    };

    // Save state
    setActiveResult(result);
    
    // Save to history list
    const updatedHistory = [result, ...historyList];
    setHistoryList(updatedHistory);
    localStorage.setItem("aura_history", JSON.stringify(updatedHistory));

    // Jump view to result
    setCurrentStep("result");
    setActiveTab("strengths");
    showToast(lang === "id" ? "Analisis warna karakter Anda sukses diformulasikan!" : "Character color analysis successfully generated!");
  };

  // Simulate payment upgrade checkout
  const handlePremiumUpgradeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userWaNumber.trim()) {
      showToast(lang === "id" ? "Masukkan nomor WhatsApp Anda untuk validasi" : "Please input your WhatsApp phone number");
      return;
    }

    const tId = "AURA-TX-" + Math.floor(Math.random() * 9000 + 1000);
    const newTx: Transaction = {
      id: tId,
      userId: currentUser?.id || "user-cur",
      userName: currentUser?.name || profile.name || "Klien Guest",
      userEmail: currentUser?.emailOrPhone || "client@gmail.com",
      date: new Date().toISOString(),
      amount: 49000,
      paymentMethod: selectedPayMethod,
      status: "Pending",
      whatsappNumber: userWaNumber,
      notes: transactionNote || "Permohonan akses premium",
      receiptUrl: receiptFileSimulated || "https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?w=100&q=80"
    };

    const newTxList = [newTx, ...transactions];
    setTransactions(newTxList);
    localStorage.setItem("aura_transactions", JSON.stringify(newTxList));
    setActiveOrderPending(newTx);
    setShowPremiumModal(false);

    showToast(lang === "id" 
      ? "Bukti transaksi disimpan! Sistem otomatis mengirim notifikasi WhatsApp kepada Admin..." 
      : "Transaction simulated successfully! Automatically notifying the Administrator via WhatsApp...");

    // Automatically trigger WhatsApp notification
    setTimeout(() => {
      handleWhatsAppSend(newTx);
    }, 1200);
  };

  // WhatsApp Message notification dispatch builder
  const handleWhatsAppSend = (tx: Transaction) => {
    const textMsg = lang === "id"
      ? `Halo Admin Aura. Saya baru saja melakukan pembayaran Premium Character Report.\n\n` + 
        `ID Pesanan: ${tx.id}\nNama: ${tx.userName}\nNomor WA: ${tx.whatsappNumber}\n` +
        `Metode: ${tx.paymentMethod}\nJumlah: Rp 49.000\nCatatan: ${tx.notes}\n\n` +
        `Mohon segera verifikasi transaksi saya!`
      : `Hello Aura Admin. I have made a transfer for Premium Character Report.\n\n` + 
        `Order ID: ${tx.id}\nName: ${tx.userName}\nPhone: ${tx.whatsappNumber}\n` +
        `Method: ${tx.paymentMethod}\nAmount: Rp 49.000\nNotes: ${tx.notes}\n\n` +
        `Please approve my transaction as soon as possible!`;

    const encoded = encodeURIComponent(textMsg);
    window.open(`https://wa.me/082231642512?text=${encoded}`, "_blank");
  };

  // Simulated AI Consultant chat engine
  const handleConsultChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg = chatInput;
    setChatInput("");
    setChatHistory(prev => [...prev, { role: "user", text: userMsg }]);
    setIsChatLoading(true);

    try {
      const res = await fetch("/api/consult", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          profile: activeResult?.userProfile || profile,
          dominantColor: activeResult?.dominantColor || PersonalityColor.BLUE,
          scores: activeResult?.scores || [],
          message: userMsg,
          chatHistory: chatHistory
        })
      });

      const data = await res.json();
      if (res.ok) {
        setChatHistory(prev => [...prev, { role: "model", text: data.reply }]);
      } else {
        throw new Error(data.error || "Gagal menghubungi API server.");
      }
    } catch (err: any) {
      console.error(err);
      // Fallback response simulation if API fails or backend isn't loaded with active secret keys
      setTimeout(() => {
        const fallbacks = lang === "id" 
          ? [
              `Analisis warna ${activeResult?.dominantColor} Anda mencerminkan keunikan yang kuat. Dalam percintaan/jodoh, Anda sangat harmonis mencari partner berkarakter Kuning atau Putih untuk menyeimbangkan dinamika logis Anda. Karir masa depan Anda diproyeksikan melonjak jika Anda fokus memangkas sifat overthinking.`,
              `Tentu, untuk cara belajar yang melipatgandakan retensi daya ingat Anda, terapkan teknik Pomodoro dengan Visual Blueprint Mindmaps secara harian. Cobalah luangkan waktu senggang untuk bersosunikasi dengan orang luar.`
            ]
          : [
              `Your dominant ${activeResult?.dominantColor} personality profile dictates standard compatibility. You thrive in structured tech roles or creative entrepreneurship. In relationships, you look for stable empathetic connection to offset daily pressures.`,
              `For fast high performance learning, utilize spaced repetition and logic mapping over physical models. Ensure regular breaks to support mental recovery.`
            ];
        
        const randomAnswer = fallbacks[Math.floor(Math.random() * fallbacks.length)];
        setChatHistory(prev => [...prev, { role: "model", text: "💡 " + randomAnswer }]);
      }, 1000);
    } finally {
      setIsChatLoading(false);
    }
  };

  // Admin Verification commands
  const handleVerifyOrder = (id: string, newStatus: "Success" | "Failed") => {
    const updated = transactions.map(t => {
      if (t.id === id) {
        return { ...t, status: newStatus };
      }
      return t;
    });
    setTransactions(updated);
    localStorage.setItem("aura_transactions", JSON.stringify(updated));

    // If verified active user as success, unlock premiums
    const targetTx = updated.find(t => t.id === id);
    if (newStatus === "Success") {
      setIsPremiumUser(true);
      localStorage.setItem("aura_premium_unlocked", "true");
      showToast(lang === "id" ? `Pesanan ${id} berhasil diverifikasi Lunas!` : `Order ${id} successfully approved!`);
    } else {
      showToast(lang === "id" ? `Pesanan ${id} ditolak.` : `Order ${id} set to failed.`);
    }
  };

  // Simulated export to Excel / CSV monthly financial ledger
  const handleExportLedger = () => {
    const headers = "ID Transaksi,Nama Pelanggan,Email,Tanggal,Jumlah,Metode Pembayaran,Status,Nomor WA,Catatan\n";
    const csvContent = "data:text/csv;charset=utf-8," + headers + transactions.map(t => 
      `"${t.id}","${t.userName}","${t.userEmail}","${t.date}",${t.amount},"${t.paymentMethod}","${t.status}","${t.whatsappNumber}","${t.notes || ""}"`
    ).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `laporan_pembukuan_warna_karakter_${new Date().toISOString().substring(0, 7)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(lang === "id" ? "Rekap pembukuan bulanan CSV sukses didownload!" : "Monthly ledger CSV successfully exported!");
  };

  // Social Share Action trigger
  const handleShareResultCopy = () => {
    if (!activeResult) return;
    const shareText = lang === "id"
      ? `Saya baru saja mengikuti Tes Warna Karakter Psikologi! Warna utama saya adalah ${translations[lang].colorDetails[activeResult.dominantColor].name}.\n` + 
        `Pekerjaan ideal: ${activeResult.jobs.join(", ")}.\n` +
        `Ayo tes warna karakter gratis Anda di ${window.location.href}!`
      : `I have just charted my Psychological Character Color! My dominant color matches ${translations[lang].colorDetails[activeResult.dominantColor].name}.\n` +
        `Suggested path matches: ${activeResult.jobs.join(", ")}.\n` +
        `Discover yours online for free at ${window.location.href}!`;

    navigator.clipboard.writeText(shareText).then(() => {
      setCopyAck(true);
      setTimeout(() => setCopyAck(false), 2500);
      showToast(lang === "id" ? "Teks hasil analisis disalin! Siap dibagikan ke media sosial." : "Analysis summary copied to clipboard!");
    });
  };

  // PDF Export Print Dialog trigger
  const handleTriggerPrint = () => {
    window.print();
  };

  // Helper colors for layout mappings
  const colorBgs: Record<PersonalityColor, string> = {
    [PersonalityColor.RED]: "from-rose-500 to-red-600 shadow-rose-100",
    [PersonalityColor.YELLOW]: "from-amber-400 to-yellow-500 shadow-yellow-100",
    [PersonalityColor.BLUE]: "from-blue-500 to-sky-600 shadow-blue-100",
    [PersonalityColor.WHITE]: "from-slate-300 to-slate-400 shadow-slate-100"
  };

  const colorTextHex: Record<PersonalityColor, string> = {
    [PersonalityColor.RED]: "text-rose-600",
    [PersonalityColor.YELLOW]: "text-amber-500",
    [PersonalityColor.BLUE]: "text-blue-600",
    [PersonalityColor.WHITE]: "text-indigo-600"
  };

  // Calculate stats for admin dashboard
  const totalSalesRevenue = transactions
    .filter(t => t.status === "Success")
    .reduce((sum, current) => sum + current.amount, 0);

  const totalSuccessCount = transactions.filter(t => t.status === "Success").length;
  const totalPendingCount = transactions.filter(t => t.status === "Pending").length;
  const totalOrdersCount = transactions.length;
  const conversionRatePct = totalOrdersCount > 0 
    ? Math.round((totalSuccessCount / totalOrdersCount) * 100) 
    : 0;

  return (
    <div id="full-character-app" className="min-h-screen bg-indigo-50/50 flex flex-col font-sans text-slate-800 antialiased print:bg-white">
      
      {/* Dynamic Toast Status Message */}
      {toastMessage && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-slate-900/90 [box-shadow:0_10px_35px_-5px_rgba(0,0,0,0.3)] backdrop-blur text-white py-3 px-6 rounded-2xl flex items-center space-x-3 transition-all">
          <Sparkles className="w-5 h-5 text-yellow-400 shrink-0 animate-pulse" />
          <span className="text-sm font-medium tracking-wide">{toastMessage}</span>
        </div>
      )}

      {/* Embedded Printable Report Frame */}
      <div className="hidden print:block p-10 max-w-4xl mx-auto">
        <div className="border-b pb-6 mb-8 text-center">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight uppercase">
            {lang === "id" ? "Laporan Resmi Analisis Warna Karakter" : "Official Character Color Psychological Dossier"}
          </h1>
          <p className="text-sm text-slate-500 mt-2">
            {lang === "id" ? "Diformulasikan secara ilmiah berdasarkan kuesioner psikologi interaktif" : "Scientifically designed via computerized psychological testing"}
          </p>
        </div>

        {activeResult ? (
          <div className="space-y-6">
            <div className="bg-slate-50 p-6 rounded-2xl border flex justify-between">
              <div>
                <p className="text-xs uppercase text-slate-400 font-bold">{lang === "id" ? "REKAPITULASI PROFIL" : "CLIENT SUMMARY"}</p>
                <p className="text-lg font-black text-slate-800 mt-1">{activeResult.userProfile.name}</p>
                <p className="text-sm text-slate-600">{activeResult.userProfile.age} Tahun • {activeResult.userProfile.gender} • {activeResult.userProfile.occupation}</p>
              </div>
              <div className="text-right">
                <p className="text-xs uppercase text-slate-400 font-bold">{lang === "id" ? "TANGGAL TES" : "TEST CHROMATICITY"}</p>
                <p className="text-sm font-bold mt-1">{new Date(activeResult.date).toLocaleDateString()}</p>
                <p className="text-[10px] text-slate-400 font-mono">ID: {activeResult.id}</p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-slate-900">1. {lang === "id" ? "Peta Distribusi Elemen Aura Warna" : "Aura Spectrum Chart"}</h3>
              <div className="grid grid-cols-4 gap-4 mt-3">
                {activeResult.scores.map(s => (
                  <div key={s.color} className="p-4 rounded-xl border bg-white shadow-sm flex flex-col justify-between">
                    <span className="text-xs font-bold text-slate-400">{translations[lang].colorDetails[s.color].name}</span>
                    <span className="text-2xl font-black mt-2 text-slate-900">{s.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 border rounded-2xl bg-white space-y-4">
              <h3 className="text-xl font-bold text-slate-900">
                2. {lang === "id" ? "Warna Dominan Utama:" : "Dominant Profile:"} <span className="underline">{translations[lang].colorDetails[activeResult.dominantColor].name}</span>
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed italic">
                "{translations[lang].colorDetails[activeResult.dominantColor].tagline}"
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                {translations[lang].colorDetails[activeResult.dominantColor].desc}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="p-5 border rounded-2xl">
                <h4 className="font-bold text-sm text-slate-800 mb-2 uppercase">{lang === "id" ? "Kekuatan Kunci" : "Key Strengths"}</h4>
                <ul className="list-disc pl-5 text-xs text-slate-600 space-y-1.5">
                  {translations[lang].colorDetails[activeResult.dominantColor].strengths.map((str, i) => (
                    <li key={i}>{str}</li>
                  ))}
                </ul>
              </div>
              <div className="p-5 border rounded-2xl">
                <h4 className="font-bold text-sm text-slate-800 mb-2 uppercase">{lang === "id" ? "Kelemahan & Solusi" : "Weakness & Adjustments"}</h4>
                <ul className="list-disc pl-5 text-xs text-slate-600 space-y-1.5">
                  {translations[lang].colorDetails[activeResult.dominantColor].weaknesses.map((wk, i) => (
                    <li key={i}>{wk}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="p-6 border rounded-2xl bg-slate-50 space-y-4">
              <h3 className="text-lg font-bold text-slate-800">{lang === "id" ? "3. Proyeksi Peta Kerja & Gaya Belajar Terpilih" : "3. Career Pathing & Adaptive Learning Style"}</h3>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <h4 className="text-[11px] font-bold text-slate-400 uppercase">{lang === "id" ? "Pekerjaan Ideal" : "Ideal Match Tasks"}</h4>
                  <p className="text-sm font-bold text-slate-800 mt-1">{activeResult.jobs.join(", ")}</p>
                </div>
                <div>
                  <h4 className="text-[11px] font-bold text-slate-400 uppercase">{lang === "id" ? "Hobi Penyembuh" : "Healing Hobbies"}</h4>
                  <p className="text-sm font-bold text-slate-800 mt-1">{activeResult.hobbies.join(", ")}</p>
                </div>
                <div>
                  <h4 className="text-[11px] font-bold text-slate-400 uppercase">{lang === "id" ? "Gaya Belajar" : "Learning Setup"}</h4>
                  <p className="text-xs text-slate-600 mt-1">{activeResult.learningStyle}</p>
                </div>
              </div>
            </div>

            <div className="border-t pt-10 text-center text-[10px] text-slate-400 font-mono">
              <p>© 2026 Character Color Analyzer. Powered by Hartman Color Science & AI Study Lab.</p>
              <p>Generated on Cloud Environment • muhammadaliirkham123@gmail.com</p>
            </div>
          </div>
        ) : (
          <p className="text-center text-slate-500">No profile processed yet for physical printing.</p>
        )}
      </div>

      {/* Main Interactive Screen layout */}
      <div className="flex-1 flex overflow-hidden print:hidden" id="interactive-body">
        
        {!currentUser && currentUserRole === "user" ? (
          /* Full screen splash landing/auth page */
          <div className="flex-1 flex flex-col lg:flex-row h-full min-h-[500px] w-full bg-slate-50 font-sans" id="full-landing-screen">
            {/* Left Side: Gorgeous Chromatic Hero Branding Banner (60% width) */}
            <div className="lg:w-[55%] bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 text-white p-8 lg:p-16 flex flex-col justify-between relative overflow-hidden shrink-0">
              {/* Blurred Decorative Aura Orbs */}
              <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-rose-500 rounded-full blur-[100px] opacity-25 animate-pulse duration-[5000ms]"></div>
              <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-amber-400 rounded-full blur-[120px] opacity-20 animate-pulse duration-[7000ms]"></div>
              <div className="absolute top-1/2 right-10 w-64 h-64 bg-indigo-500 rounded-full blur-[90px] opacity-25 animate-pulse duration-[6000ms]"></div>
              <div className="absolute -bottom-10 -left-10 w-96 h-96 bg-emerald-400 rounded-full blur-[140px] opacity-15"></div>

              {/* Branding Header */}
              <div className="relative z-10 flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
                  <Sparkles className="w-5 h-5 text-yellow-300" />
                </div>
                <div>
                  <span className="font-black text-lg tracking-tight uppercase block">Color Chemistry</span>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Hartman Character Dynamics</span>
                </div>
              </div>

              {/* Tagline & Aura Colors Grid */}
              <div className="relative z-10 my-auto py-12">
                <h2 className="text-3xl lg:text-5xl font-black leading-tight tracking-tight max-w-lg mb-6">
                  {lang === "id" ? "Jelajahi Elemen Warna Jiwa Anda 🧪" : "Discover the Authentic Color of Your Character 🧪"}
                </h2>
                <p className="text-sm text-slate-300 leading-relaxed max-w-md mb-10">
                  {lang === "id" 
                    ? "Dapatkan analisis psikologis mendalam berdasarkan Hartman Color Code. Ketahui warna dominan Anda beserta potensi karir, gaya belajar, dan garis asmara." 
                    : "Obtain a profound psychological mapping based on Hartman Color Codes. Align your traits with career, learning strategies, and deep interpersonal dynamics."}
                </p>

                {/* Grid representation of 4 Aura colors */}
                <div className="grid grid-cols-2 gap-4 max-w-md">
                  <div className="bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-sm flex items-start gap-3">
                    <span className="w-3 h-3 rounded-full bg-rose-500 shadow-[0_0_12px_#f43f5e] mt-1 shrink-0"></span>
                    <div>
                      <h4 className="text-xs font-bold text-white uppercase">{lang === "id" ? "Merah (Power)" : "Red (Power)"}</h4>
                      <p className="text-[10px] text-slate-400 mt-0.5">{lang === "id" ? "Pemimpin & Pengambil Keputusan" : "Visionary Leader"}</p>
                    </div>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-sm flex items-start gap-3">
                    <span className="w-3 h-3 rounded-full bg-amber-400 shadow-[0_0_12px_#fbbf24] mt-1 shrink-0"></span>
                    <div>
                      <h4 className="text-xs font-bold text-white uppercase">{lang === "id" ? "Kuning (Fun)" : "Yellow (Fun)"}</h4>
                      <p className="text-[10px] text-slate-400 mt-0.5">{lang === "id" ? "Optimis & Jiwa Sosial" : "Social Optimist"}</p>
                    </div>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-sm flex items-start gap-3">
                    <span className="w-3 h-3 rounded-full bg-indigo-500 shadow-[0_0_12px_#6366f1] mt-1 shrink-0"></span>
                    <div>
                      <h4 className="text-xs font-bold text-white uppercase">{lang === "id" ? "Biru (Intimacy)" : "Blue (Intimacy)"}</h4>
                      <p className="text-[10px] text-slate-400 mt-0.5">{lang === "id" ? "Setia & Empati Mendalam" : "Loyal & Empathetic"}</p>
                    </div>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-sm flex items-start gap-3">
                    <span className="w-3 h-3 rounded-full bg-slate-300 shadow-[0_0_12px_#cbd5e1] mt-1 shrink-0"></span>
                    <div>
                      <h4 className="text-xs font-bold text-white uppercase">{lang === "id" ? "Putih (Peace)" : "White (Peace)"}</h4>
                      <p className="text-[10px] text-slate-400 mt-0.5">{lang === "id" ? "Tenang & Pembawa Damai" : "Peaceful Mediator"}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer environment credit lines as per manual instruction metrics */}
              <div className="relative z-10 border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between text-[10px] text-slate-400 font-mono gap-2">
                <p>© 2026 Character Color Analyzer. Powered by Hartman Color Science.</p>
                <p>muhammadaliirkham123@gmail.com</p>
              </div>
            </div>

            {/* Right Side: The Gorgeous Interactive Auth Card and Lang Toggle (45% width) */}
            <div className="flex-1 bg-white flex flex-col justify-between p-8 lg:p-16 relative overflow-y-auto">
              {/* Header language picker selector right in the landing page */}
              <div className="flex justify-between items-center mb-6">
                <div className="p-1 px-2.5 bg-indigo-50 rounded-full text-[10px] font-bold text-indigo-600 flex items-center gap-1.5 border border-indigo-100">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>{lang === "id" ? "Sistem Aktif" : "Secure Connection Live"}</span>
                </div>

                <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl border border-slate-200">
                  <button 
                    onClick={() => toggleLanguage("id")}
                    className={`px-2.5 py-1 text-[10px] font-bold rounded-lg transition-all ${
                      lang === "id" ? "bg-indigo-600 text-white shadow-sm" : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    Bahasa (ID)
                  </button>
                  <button 
                    onClick={() => toggleLanguage("en")}
                    className={`px-2.5 py-1 text-[10px] font-bold rounded-lg transition-all ${
                      lang === "en" ? "bg-indigo-600 text-white shadow-sm" : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    English (EN)
                  </button>
                </div>
              </div>

              <div className="max-w-md w-full mx-auto my-auto py-6">
                <div className="mb-6">
                  <h3 className="text-2xl font-black text-slate-800 tracking-tight">
                    {authTab === "login" 
                      ? (lang === "id" ? "Selamat Datang" : "Welcome Back")
                      : (lang === "id" ? "Gabung Bersama Kami" : "Join Color Chemistry")
                    }
                  </h3>
                  <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                    {lang === "id" 
                      ? "Masuk atau daftar menggunakan email / nomor tlp & password, atau bisa langsung dengan Akun Gmail." 
                      : "Login or register using email / phone number & password, or directly using your Google Account."}
                  </p>
                </div>

                {/* Authenticator Form Tabs Selection */}
                <div className="flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200/60 mb-6">
                  <button
                    type="button"
                    onClick={() => {
                      setAuthTab("login");
                      setAuthError("");
                    }}
                    className={`flex-1 py-3 text-xs font-black rounded-xl transition-all ${
                      authTab === "login"
                        ? "bg-white text-indigo-600 shadow-sm border border-indigo-100/50"
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    {lang === "id" ? "Masuk Akun" : "Log In"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setAuthTab("register");
                      setAuthError("");
                    }}
                    className={`flex-1 py-3 text-xs font-black rounded-xl transition-all ${
                      authTab === "register"
                        ? "bg-white text-indigo-600 shadow-sm border border-indigo-100/50"
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    {lang === "id" ? "Daftar Akun" : "Sign Up"}
                  </button>
                </div>

                {/* Error Bubble Messages and Warnings */}
                {authError && (
                  <div className="p-3 bg-rose-50 text-rose-600 text-[11px] font-bold rounded-xl border border-rose-100 flex items-center gap-2 mb-5 animate-bounce">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{authError}</span>
                  </div>
                )}

                {/* LOCAL EMAIL / PHONE + PASSWORD AUTH FORM */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (authTab === "register") {
                      if (!authName.trim()) {
                        setAuthError(lang === "id" ? "Nama lengkap tidak boleh kosong!" : "Name is required!");
                        return;
                      }
                      if (!authEmail.trim() || !authPassword.trim()) {
                        setAuthError(lang === "id" ? "Email/No HP & password wajib diisi!" : "Email/Phone & password are required!");
                        return;
                      }
                      const existing = allUsers.find(
                        u => u.emailOrPhone.toLowerCase() === authEmail.trim().toLowerCase()
                      );
                      if (existing) {
                        setAuthError(lang === "id" ? "Email atau nomor telepon ini sudah terdaftar!" : "This credentials/email is already registered!");
                        return;
                      }

                      const newUser: UserAccount = {
                        id: "usr-" + Date.now(),
                        emailOrPhone: authEmail.trim(),
                        name: authName.trim(),
                        password: authPassword,
                        provider: "local",
                        createdAt: new Date().toISOString()
                      };

                      const updatedList = [newUser, ...allUsers];
                      setAllUsers(updatedList);
                      localStorage.setItem("aura_all_users", JSON.stringify(updatedList));

                      setCurrentUser(newUser);
                      localStorage.setItem("aura_current_user", JSON.stringify(newUser));
                      setProfile(prev => ({ ...prev, name: newUser.name }));

                      setAuthEmail("");
                      setAuthPassword("");
                      setAuthName("");
                      setAuthError("");
                      
                      showToast(lang === "id" ? `Pendaftaran Berhasil! Selamat Datang, ${newUser.name} 👋` : `Register successful! Welcome ${newUser.name} 👋`);
                    } else {
                      const userFound = allUsers.find(
                        u => u.emailOrPhone.toLowerCase() === authEmail.trim().toLowerCase() && u.password === authPassword
                      );
                      if (userFound) {
                        setCurrentUser(userFound);
                        localStorage.setItem("aura_current_user", JSON.stringify(userFound));
                        setProfile(prev => ({ ...prev, name: userFound.name }));
                        
                        setAuthEmail("");
                        setAuthPassword("");
                        setAuthError("");
                        
                        showToast(lang === "id" ? `Selamat Datang Kembali, ${userFound.name}! 👋` : `Welcome back, ${userFound.name}! 👋`);
                      } else {
                        setAuthError(lang === "id" ? "Email/Nomor HP atau password yang Anda masukkan salah!" : "Incorrect email/phone or password!");
                      }
                    }
                  }}
                  className="space-y-4"
                >
                  {authTab === "register" && (
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 pl-1">
                        {lang === "id" ? "Nama Lengkap" : "Full Name"}
                      </label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          type="text"
                          value={authName}
                          onChange={(e) => { setAuthName(e.target.value); setAuthError(""); }}
                          placeholder={lang === "id" ? "Masukkan nama lengkap..." : "Enter your full name..."}
                          className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white rounded-xl py-2.5 pl-10 pr-4 text-xs font-semibold outline-none transition-all"
                          required
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 pl-1">
                      {lang === "id" ? "Email atau Nomor Telepon" : "Email or Phone Number"}
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        value={authEmail}
                        onChange={(e) => { setAuthEmail(e.target.value); setAuthError(""); }}
                        placeholder={lang === "id" ? "nama@domain.com atau 081234..." : "name@domain.com or 081234..."}
                        className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white rounded-xl py-2.5 pl-10 pr-4 text-xs font-semibold outline-none transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 pl-1">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="password"
                        value={authPassword}
                        onChange={(e) => { setAuthPassword(e.target.value); setAuthError(""); }}
                        placeholder={lang === "id" ? "Masukkan kata sandi..." : "Enter your password..."}
                        className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white rounded-xl py-2.5 pl-10 pr-4 text-xs font-semibold outline-none transition-all"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold py-3.5 rounded-2xl shadow-md hover:shadow-lg transition-all text-xs uppercase tracking-wider mt-2 flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-4 h-4 shrink-0 text-yellow-300" />
                    <span>{authTab === "login" ? (lang === "id" ? "Masuk ke Panel" : "Login to Access") : (lang === "id" ? "Selesaikan Pendaftaran" : "Complete Sign Up")}</span>
                  </button>
                </form>

                {/* Instant Google Authentication Divider */}
                <div className="relative my-6 text-center">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-200"></div>
                  </div>
                  <span className="relative bg-white px-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    {lang === "id" ? "atau masuk instan" : "or connect instantly"}
                  </span>
                </div>

                {/* Google Sign-in action button */}
                <button
                  type="button"
                  onClick={() => {
                    setGoogleEmailInput("");
                    setGoogleNameInput("");
                    setShowGoogleModal(true);
                  }}
                  className="w-full bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 font-extrabold py-3 rounded-2xl transition-all text-xs flex items-center justify-center gap-2 shadow-sm"
                >
                  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                    <path
                      fill="#EA4335"
                      d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.136 4.114a5.59 5.59 0 1 1 0-11.178c1.373 0 2.627.5 3.6 1.32l3.15-3.15C18.665 3.518 15.65 2 12 2 6.477 2 2 6.477 2 12s4.477 10 10 10c6.046 0 9.86-4.248 9.86-10 0-.6-.057-1.182-.16-1.715h-9.46z"
                    />
                  </svg>
                  <span>{lang === "id" ? "Masuk dengan Akun Gmail" : "Sign in using Gmail Account"}</span>
                </button>
              </div>

              {/* Little helpful notice */}
              <div className="text-center text-[10px] text-slate-400 font-medium">
                <p>{lang === "id" ? "Dengan masuk, Anda menyetujui Ketentuan Analisis Terenkripsi kami." : "By continuing, you agree to our Encrypted Personality Analytics Guidelines."}</p>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Leftmost Sidebar navigation navigation options derived from design */}
            <aside className="w-20 bg-white border-r border-indigo-100 flex flex-col items-center py-6 justify-between shrink-0">
          <div className="flex flex-col items-center gap-8">
            {/* Branding launcher logo */}
            <div className="w-12 h-12 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-indigo-100 cursor-pointer" onClick={() => setCurrentStep("profile")}>
              <span className="font-extrabold text-xl tracking-tighter" id="brand-wordmark">A</span>
            </div>

            {/* Icons list linking to distinct states */}
            <nav className="flex flex-col gap-5">
              
              <button 
                onClick={() => setCurrentStep("profile")}
                disabled={activeResult === null}
                className={`p-3.5 rounded-xl transition-all relative group ${
                  currentStep === "profile" || currentStep === "quiz"
                    ? "text-indigo-600 bg-indigo-50" 
                    : "text-slate-400 hover:text-indigo-600 hover:bg-slate-50"
                }`}
                title={lang === "id" ? "Data Diri" : "Profile Setup"}
                id="sidebar-btn-profile"
              >
                <User className="w-5 h-5" />
                <span className="absolute left-16 scale-0 group-hover:scale-100 bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded whitespace-nowrap z-50 transition-all origin-left">
                  {lang === "id" ? "Data Diri" : "Profile Data"}
                </span>
              </button>

              <button 
                onClick={() => {
                  if (activeResult) {
                    setCurrentStep("result");
                  } else {
                    showToast(lang === "id" ? "Silakan selesaikan kuesioner Anda dahulu" : "Please finish the questionnaire first");
                  }
                }}
                className={`p-3.5 rounded-xl transition-all relative group ${
                  currentStep === "result" 
                    ? "text-indigo-600 bg-indigo-50" 
                    : "text-slate-400 hover:text-indigo-600 hover:bg-slate-50"
                }`}
                title={lang === "id" ? "Hasil Analisis" : "Test Result"}
                id="sidebar-btn-result"
              >
                <Layers className="w-5 h-5" />
                <span className="absolute left-16 scale-0 group-hover:scale-100 bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded whitespace-nowrap z-50 transition-all origin-left">
                  {lang === "id" ? "Hasil Analisis" : "Analysis Result"}
                </span>
              </button>

              <button 
                onClick={() => setCurrentStep("history")}
                className={`p-3.5 rounded-xl transition-all relative group ${
                  currentStep === "history" 
                    ? "text-indigo-600 bg-indigo-50" 
                    : "text-slate-400 hover:text-indigo-600 hover:bg-slate-50"
                }`}
                title={lang === "id" ? "Riwayat Karakter" : "Character History"}
                id="sidebar-btn-history"
              >
                <History className="w-5 h-5" />
                <span className="absolute left-16 scale-0 group-hover:scale-100 bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded whitespace-nowrap z-50 transition-all origin-left">
                  {lang === "id" ? "Riwayat Karakter" : "Character History"}
                </span>
              </button>

              <button 
                onClick={() => setCurrentStep("transactions")}
                className={`p-3.5 rounded-xl transition-all relative group ${
                  currentStep === "transactions" 
                    ? "text-indigo-600 bg-indigo-50" 
                    : "text-slate-400 hover:text-indigo-600 hover:bg-slate-50"
                }`}
                title={lang === "id" ? "Riwayat Transaksi" : "Transactions Log"}
                id="sidebar-btn-transactions"
              >
                <FileText className="w-5 h-5" />
                <span className="absolute left-16 scale-0 group-hover:scale-100 bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded whitespace-nowrap z-50 transition-all origin-left">
                  {lang === "id" ? "Transaksi Saya" : "My Order History"}
                </span>
              </button>

              {currentUserRole === "admin" && (
                <button 
                  onClick={() => setCurrentStep("admin")}
                  className={`p-3.5 rounded-xl transition-all relative group ${
                    currentStep === "admin" 
                      ? "text-rose-600 bg-rose-50" 
                      : "text-rose-400 hover:text-rose-700 hover:bg-rose-50/50"
                  }`}
                  title={lang === "id" ? "Admin Orders Dashboard" : "Admin Dashboard"}
                  id="sidebar-btn-admin"
                >
                  <Settings className="w-5 h-5 animate-pulse" />
                  <span className="absolute left-16 scale-0 group-hover:scale-100 bg-rose-900 text-white text-[10px] font-bold px-2 py-1 rounded whitespace-nowrap z-50 transition-all origin-left">
                    {lang === "id" ? "Dashboard Manager" : "Manager Dashboard"}
                  </span>
                </button>
              )}
            </nav>
          </div>

          {/* Bottom language toggle switcher integrated styled according to theme template */}
          <div className="flex flex-col gap-2">
            {/* Secret Admin Gate - Elegant, tiny background dot to prevent accidental client clicks */}
            <div className="flex justify-center">
              <button
                type="button"
                onClick={() => {
                  if (currentUserRole === "admin") {
                    setCurrentUserRole("user");
                    localStorage.setItem("aura_active_role", "user");
                    if (currentStep === "admin") {
                      setCurrentStep("profile");
                    }
                    showToast(lang === "id" ? "Beralih ke Panel Client/User 👤" : "Switched to Client/User Mode 👤");
                  } else {
                    setAdminPinInput("");
                    setAdminPinError("");
                    setShowAdminPinModal(true);
                  }
                }}
                className="w-1.5 h-1.5 rounded-full bg-slate-200 hover:bg-slate-400 transition-colors duration-200 cursor-default"
                title="."
              />
            </div>

            <div className="flex flex-col bg-slate-100 rounded-2xl p-1 gap-1 border border-slate-200">
              <button 
                onClick={() => toggleLanguage("id")}
                className={`p-1 text-[10px] font-bold rounded-lg transition-all ${
                  lang === "id" ? "bg-indigo-600 text-white" : "text-slate-500 hover:text-slate-800"
                }`}
              >
                ID
              </button>
              <button 
                onClick={() => toggleLanguage("en")}
                className={`p-1 text-[10px] font-bold rounded-lg transition-all ${
                  lang === "en" ? "bg-indigo-600 text-white" : "text-slate-500 hover:text-slate-800"
                }`}
              >
                EN
              </button>
            </div>

            {currentUser && (
              <button
                onClick={() => {
                  setCurrentUser(null);
                  localStorage.removeItem("aura_current_user");
                  setCurrentStep("profile");
                  showToast(lang === "id" ? "Anda berhasil keluar akun 👋" : "Successfully logged out 👋");
                }}
                className="w-full mt-2 p-2.5 rounded-xl text-rose-500 hover:text-rose-700 hover:bg-rose-50 transition-all flex items-center justify-center gap-1 bg-slate-50 border border-slate-100/80"
                title={lang === "id" ? "Keluar Akun" : "Log Out"}
              >
                <LogOut className="w-4 h-4 shrink-0" />
                <span className="text-[10px] font-bold">OUT</span>
              </button>
            )}
          </div>
        </aside>

        {/* Main interactive workflow and grid areas */}
        <main className="flex-1 flex flex-col overflow-y-auto">
          
          {/* Top header navigation wrapper */}
          <header className="h-20 px-8 flex items-center justify-between shrink-0 bg-white/45 backdrop-blur border-b border-indigo-100/60 font-sans">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600" id="header-dashboard-title">
                {translations[lang].appTitle}
              </h1>
              <div className="bg-white px-3 py-1 rounded-full text-xs font-semibold text-indigo-500 border border-indigo-100 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>{translations[lang].appSub}</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Premium user crown indicator */}
              {isPremiumUser ? (
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 border border-amber-200 text-amber-700 text-xs font-black">
                  <Award className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>PREMIUM</span>
                </div>
              ) : (
                <button 
                  onClick={() => setShowPremiumModal(true)}
                  className="px-3 py-1 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-bold hover:scale-105 transition-all flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                  <span>Upgrade to Premium</span>
                </button>
              )}

              {/* Registered user greeting widget */}
              {profile.name && (
                <div className="flex items-center gap-3">
                  <div className="text-right hidden sm:block">
                    <p className="text-xs font-bold text-slate-800">{profile.name}</p>
                    <p className="text-[9px] text-slate-400 uppercase tracking-widest">{profile.occupation || "Guest"}</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-indigo-100 border-2 border-white shadow-sm flex items-center justify-center text-sm font-bold text-indigo-600 overflow-hidden">
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${profile.name}`} alt="user avatar" />
                  </div>
                </div>
              )}
            </div>
          </header>

          {/* Sub Content Containers */}
          <div className="flex-1 p-6 lg:p-8 max-w-7xl w-full mx-auto" id="main-view-container">
            
            <>
                {/* Step 1: User Profile Form */}
                {currentStep === "profile" && (
              <div className="max-w-2xl mx-auto bg-white rounded-[32px] p-8 shadow-xl border border-indigo-50 flex flex-col justify-between transition-all relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-purple-50 rounded-full blur-3xl opacity-60"></div>
                <div className="absolute bottom-0 left-0 w-56 h-56 bg-indigo-50 rounded-full blur-3xl opacity-60"></div>

                <div className="relative mb-6">
                  <h3 className="text-2xl font-black text-slate-800 tracking-tight flex items-center gap-2">
                    <User className="w-6 h-6 text-indigo-600 shrink-0" />
                    {translations[lang].profileTitle}
                  </h3>
                  <p className="text-xs text-slate-500 mt-2">
                    {translations[lang].profileSub}
                  </p>
                </div>

                <form onSubmit={handleProfileSubmit} className="space-y-5 relative">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                      {translations[lang].nameLabel}
                    </label>
                    <input 
                      type="text"
                      className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white rounded-xl py-3 px-4 text-sm font-medium transition-all"
                      value={profile.name}
                      onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                      placeholder={translations[lang].namePlaceholder}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                        {translations[lang].ageLabel}
                      </label>
                      <input 
                        type="number"
                        className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white rounded-xl py-3 px-4 text-sm font-medium transition-all"
                        value={profile.age}
                        onChange={(e) => setProfile(prev => ({ ...prev, age: parseInt(e.target.value) || 20 }))}
                        min="5"
                        max="100"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                        {translations[lang].genderLabel}
                      </label>
                      <select 
                        className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white rounded-xl py-3 px-4 text-sm font-medium transition-all"
                        value={profile.gender}
                        onChange={(e: any) => setProfile(prev => ({ ...prev, gender: e.target.value }))}
                      >
                        <option value="Laki-laki">{translations[lang].genderMale}</option>
                        <option value="Perempuan">{translations[lang].genderFemale}</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                      {translations[lang].occupationLabel}
                    </label>
                    <input 
                      type="text"
                      className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white rounded-xl py-3 px-4 text-sm font-medium transition-all"
                      value={profile.occupation}
                      onChange={(e) => setProfile(prev => ({ ...prev, occupation: e.target.value }))}
                      placeholder={translations[lang].occupationPlaceholder}
                      required
                    />
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button 
                      type="submit"
                      className="inline-flex items-center gap-2 bg-gradient-to-tr from-indigo-600 to-purple-600 hover:scale-[1.02] active:scale-95 text-white font-extrabold px-6 py-3.5 rounded-2xl shadow-lg transition-all"
                      id="btn-profile-submit"
                    >
                      <span>{translations[lang].btnStart}</span>
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Step 2: Questionnaire Wizard */}
            {currentStep === "quiz" && (
              <div className="max-w-3xl mx-auto bg-white rounded-[32px] p-8 shadow-xl border border-indigo-50 transition-all relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-50 rounded-full blur-2xl opacity-60"></div>
                
                {/* Visual progression guide header */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs font-extrabold uppercase tracking-widest text-indigo-600">
                    {translations[lang].questionTitle} {currentQuestionIdx + 1} {translations[lang].outOf} {questionsList.length}
                  </span>
                  <div className="w-1/2 bg-slate-100 h-2.5 rounded-full overflow-hidden">
                    <div 
                      className="bg-indigo-600 h-full transition-all duration-300"
                      style={{ width: `${((currentQuestionIdx + 1) / questionsList.length) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* Question title */}
                <div className="mb-8">
                  <h4 className="text-xl font-bold leading-normal text-slate-800">
                    {(questionStrings[lang] as any)[questionsList[currentQuestionIdx].questionId]}
                  </h4>
                </div>

                {/* Answer option choices vertically laid out */}
                <div className="space-y-4">
                  {questionsList[currentQuestionIdx].options.map((opt, i) => {
                    const text = (questionStrings[lang] as any)[opt.textId];
                    const isSelected = answers[currentQuestionIdx] === opt.color;
                    
                    return (
                      <button
                        key={i}
                        onClick={() => handleAnswerSelect(opt.color)}
                        className={`w-full text-left p-4 rounded-2xl border transition-all duration-150 flex items-start gap-4 ${
                          isSelected 
                            ? "bg-indigo-50 border-indigo-600 shadow-sm" 
                            : "bg-slate-50/50 hover:bg-slate-50 border-slate-100 hover:border-slate-300"
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-xs shrink-0 ${
                          opt.color === PersonalityColor.RED ? "bg-red-100 text-red-600" :
                          opt.color === PersonalityColor.YELLOW ? "bg-amber-100 text-amber-600" :
                          opt.color === PersonalityColor.BLUE ? "bg-blue-100 text-blue-600" :
                          "bg-slate-100 text-indigo-600"
                        }`}>
                          {opt.color.substring(0, 1)}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-slate-700 leading-relaxed mt-0.5">{text}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Back / Next actions */}
                <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => setCurrentQuestionIdx(prev => Math.max(0, prev - 1))}
                    disabled={currentQuestionIdx === 0}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-800 disabled:opacity-30 disabled:pointer-events-none"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>{translations[lang].btnPrev}</span>
                  </button>

                  {/* Submit Analysis displays once answers filled */}
                  {Object.keys(answers).length === questionsList.length ? (
                    <button
                      onClick={computeAnalysis}
                      className="inline-flex items-center gap-2 bg-emerald-600 text-white font-extrabold px-6 py-3 rounded-xl hover:bg-emerald-700 shadow-md transition-all uppercase text-xs"
                      id="btn-quiz-finish-submit"
                    >
                      <CheckCircle className="w-4 h-4" />
                      <span>{translations[lang].btnSubmit}</span>
                    </button>
                  ) : (
                    <span className="text-[11px] font-bold text-slate-400">
                      {lang === "id" ? "Pilih salah satu jawaban diatas" : "Choose an option above to progress"}
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Step 3: Analysis Results layout aligned with the "Vibrant Palette" theme */}
            {currentStep === "result" && activeResult && (
              <div className="grid grid-cols-12 gap-6" id="dashboard-results-panel">
                
                {/* Left column containing result circle visualizer */}
                <div className="col-span-12 xl:col-span-8 space-y-6">
                  
                  {/* Major header result card */}
                  <section className="bg-white rounded-[32px] p-6 sm:p-8 shadow-md border border-slate-100/40 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
                    <div className="absolute -right-10 -top-10 w-48 h-48 bg-purple-50 rounded-full blur-3xl opacity-60"></div>
                    <div className="absolute -left-10 -bottom-10 w-56 h-56 bg-indigo-50 rounded-full blur-3xl opacity-60"></div>

                    {/* Left circle visualizer showing donut SVG percentages of user's colors */}
                    <div className="relative shrink-0 flex items-center justify-center">
                      <div className="w-52 h-52 sm:w-56 sm:h-56 rounded-full bg-gradient-to-br from-indigo-200 to-purple-200 p-1 flex items-center justify-center shadow-xl shadow-indigo-100">
                        <div className="w-full h-full bg-white rounded-full flex flex-col items-center justify-center relative overflow-hidden">
                          {/* Inside donut content */}
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                            {lang === "id" ? "Warna Dominan" : "Primary Aura"}
                          </span>
                          <span className={`text-4xl sm:text-5xl font-black mt-1 ${colorTextHex[activeResult.dominantColor]}`}>
                            {activeResult.scores[0].percentage}%
                          </span>
                          <span className="text-xs font-black tracking-wider uppercase mt-1">
                            {activeResult.dominantColor === PersonalityColor.RED ? (lang === "id" ? "Merah" : "RED") :
                             activeResult.dominantColor === PersonalityColor.YELLOW ? (lang === "id" ? "Kuning" : "YELLOW") :
                             activeResult.dominantColor === PersonalityColor.BLUE ? (lang === "id" ? "Biru" : "BLUE") :
                             (lang === "id" ? "Putih" : "WHITE")}
                          </span>
                        </div>
                      </div>

                      {/* Small badge overlay */}
                      <div className="absolute -bottom-2 -right-2 bg-yellow-400 text-slate-900 text-[10px] font-black px-3.5 py-1.5 rounded-full shadow-lg border-2 border-white uppercase">
                        {translations[lang].colorDetails[activeResult.dominantColor].name.split("(")[0].trim()}
                      </div>
                    </div>

                    {/* Right text panel explanation and primary actions */}
                    <div className="flex-1 relative z-10 space-y-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-600 text-[9px] font-bold uppercase tracking-widest">
                            {translations[lang].dominantColorLabel}
                          </span>
                          {activeResult.secondaryColor !== activeResult.dominantColor && (
                            <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 text-[9px] font-bold uppercase tracking-widest">
                              {translations[lang].secColorLabel}: {activeResult.secondaryColor}
                            </span>
                          )}
                        </div>

                        <h2 className="text-2xl sm:text-3xl font-black leading-tight text-slate-900">
                          {lang === "id" ? "Kamu adalah karakter " : "Your personality is "} 
                          <span className={colorTextHex[activeResult.dominantColor]}>
                            "{translations[lang].colorDetails[activeResult.dominantColor].name.split("(")[0].trim()}"
                          </span>
                        </h2>
                        <p className="text-slate-500 font-medium text-xs sm:text-sm italic mt-1.5">
                          "{translations[lang].colorDetails[activeResult.dominantColor].tagline}"
                        </p>
                      </div>

                      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                        {translations[lang].colorDetails[activeResult.dominantColor].desc}
                      </p>

                      <div className="flex flex-wrap gap-2.5 pt-2">
                        <button 
                          onClick={handleShareResultCopy}
                          className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-full text-xs font-bold flex items-center gap-2 transition-all hover:scale-[1.02] active:scale-95"
                          id="btn-share-social"
                        >
                          <Share2 className="w-4 h-4" />
                          <span>{copyAck ? (lang === "id" ? "Disalin!" : "Copied!") : (lang === "id" ? "Bagikan Hasil" : "Share Aura")}</span>
                        </button>

                        <button 
                          onClick={handleTriggerPrint}
                          className="border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 px-5 py-2.5 rounded-full text-xs font-bold flex items-center gap-2 transition-all"
                          id="btn-print-pdf"
                        >
                          <Download className="w-4 h-4 text-indigo-500" />
                          <span>{translations[lang].btnExportPdf}</span>
                        </button>
                      </div>
                    </div>
                  </section>

                  {/* Detail stats bento blocks grid derived from design instructions */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    
                    <div className="bg-white p-5 rounded-3xl shadow-sm border border-indigo-50 hover:shadow transition-all group">
                      <div className="w-10 h-10 bg-rose-100 text-rose-600 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
                        <Heart className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">
                        {translations[lang].lobbyTab}
                      </span>
                      <p className="font-extrabold mt-1 text-slate-800 leading-snug">
                        {activeResult.hobbies.join(", ")}
                      </p>
                    </div>

                    <div className="bg-white p-5 rounded-3xl shadow-sm border border-indigo-50 hover:shadow transition-all group">
                      <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
                        <Briefcase className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">
                        {translations[lang].careerTab}
                      </span>
                      <p className="font-extrabold mt-1 text-slate-800 leading-snug">
                        {activeResult.jobs.join(", ")}
                      </p>
                    </div>

                    <div className="bg-white p-5 rounded-3xl shadow-sm border border-indigo-50 hover:shadow transition-all group">
                      <div className="w-10 h-10 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
                        <BookOpen className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">
                        {translations[lang].learningTab}
                      </span>
                      <p className="font-extrabold mt-1 text-slate-800 leading-snug">
                        {activeResult.learningStyle}
                      </p>
                    </div>

                  </div>

                  {/* Sub-tab segment filters inside analysis screen */}
                  <div className="bg-white rounded-3xl p-6 shadow-sm border border-indigo-50">
                    <div className="flex border-b border-slate-100 overflow-x-auto pb-1 mb-4 gap-1 no-scrollbar">
                      <button
                        onClick={() => setActiveTab("strengths")}
                        className={`px-4 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap ${
                          activeTab === "strengths" ? "bg-indigo-50 text-indigo-600" : "text-slate-500 hover:bg-slate-50"
                        }`}
                      >
                        {translations[lang].strengthsTab}
                      </button>
                      <button
                        onClick={() => setActiveTab("weakness")}
                        className={`px-4 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap ${
                          activeTab === "weakness" ? "bg-indigo-50 text-indigo-600" : "text-slate-500 hover:bg-slate-50"
                        }`}
                      >
                        {translations[lang].weaknessTab}
                      </button>
                      <button
                        onClick={() => setActiveTab("premium-consult")}
                        className={`px-4 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
                          activeTab === "premium-consult" ? "bg-purple-100 text-purple-700 font-extrabold" : "text-slate-500 hover:bg-purple-50"
                        }`}
                      >
                        <Sparkles className="w-4 h-4 text-purple-600" />
                        <span>{translations[lang].aiConsultTab}</span>
                      </button>
                    </div>

                    {/* Tab panels content dynamic */}
                    <div className="min-h-[160px]">
                      {activeTab === "strengths" && (
                        <div className="space-y-3">
                          <p className="text-xs text-slate-400 font-black uppercase tracking-wider">{translations[lang].strengthsTab}</p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                            {translations[lang].colorDetails[activeResult.dominantColor].strengths.map((str, i) => (
                              <div key={i} className="p-3 bg-emerald-50/40 rounded-xl border border-emerald-50 flex items-start gap-2">
                                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                                <span className="text-slate-700 text-xs font-semibold">{str}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {activeTab === "weakness" && (
                        <div className="space-y-3">
                          <p className="text-xs text-slate-400 font-black uppercase tracking-wider">{translations[lang].weaknessTab}</p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                            {translations[lang].colorDetails[activeResult.dominantColor].weaknesses.map((wk, i) => (
                              <div key={i} className="p-3 bg-amber-50/40 rounded-xl border border-amber-50 flex items-start gap-2">
                                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                                <span className="text-slate-700 text-xs font-semibold">{wk}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {activeTab === "premium-consult" && (
                        <div className="space-y-4">
                          {!isPremiumUser ? (
                            <div className="p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100 text-center relative overflow-hidden">
                              <div className="absolute top-0 right-0 w-20 h-20 bg-yellow-100/40 rounded-full blur-xl"></div>
                              <h5 className="font-extrabold text-indigo-900 text-sm">
                                🔒 Premium AI Character Consultant Chatbot
                              </h5>
                              <p className="text-xs text-slate-500 max-w-lg mx-auto mt-2 leading-relaxed">
                                {lang === "id"
                                  ? "Dapatkan akses interaktif tanpa batas untuk berdiskusi dengan AI Psikolog seputar jodoh ideal, masa depan karir, dan strategi belajar personal."
                                  : "Get unlimited interactive chat session with our official premium AI Psychologist regarding relationships, carrier paths, and self goals."}
                              </p>
                              
                              <button
                                onClick={() => setShowPremiumModal(true)}
                                className="mt-4 bg-gradient-to-tr from-indigo-600 to-purple-600 text-white font-black text-xs px-5 py-2.5 rounded-xl hover:scale-105 transition-all shadow-md"
                              >
                                {translations[lang].upgradePremium}
                              </button>
                            </div>
                          ) : (
                            <div className="bg-slate-50/50 rounded-2xl p-4 border border-indigo-100">
                              <span className="text-[10px] font-black text-indigo-700 block mb-3 uppercase tracking-wider">
                                💬 PREMIUM COGNITIVE COMPASS AI WORKSPACE
                              </span>

                              {/* Chat message streams list */}
                              <div className="space-y-3 max-h-[220px] overflow-y-auto mb-4 bg-white rounded-xl p-3 border border-slate-100">
                                <div className="p-3 rounded-xl bg-indigo-50/60 border border-indigo-50 text-slate-700 text-xs leading-relaxed max-w-[90%]">
                                  {translations[lang].chatAiGreeting}
                                </div>

                                {chatHistory.map((ch, i) => (
                                  <div 
                                    key={i} 
                                    className={`p-3 rounded-xl text-xs leading-relaxed max-w-[90%] ${
                                      ch.role === "user" 
                                        ? "bg-slate-100 border border-slate-200 ml-auto text-slate-800"
                                        : "bg-indigo-50 border border-indigo-100 text-indigo-800"
                                    }`}
                                  >
                                    {ch.text}
                                  </div>
                                ))}

                                {isChatLoading && (
                                  <div className="p-3 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-800 text-xs animate-pulse max-w-[30%]">
                                    AI is writing...
                                  </div>
                                )}
                              </div>

                              <form onSubmit={handleConsultChatSubmit} className="flex gap-2">
                                <input 
                                  type="text"
                                  value={chatInput}
                                  onChange={(e) => setChatInput(e.target.value)}
                                  placeholder={translations[lang].chatPlaceholder}
                                  className="flex-1 bg-white border border-slate-200 focus:border-indigo-500 rounded-xl px-4 py-2.5 text-xs text-slate-800"
                                />
                                <button
                                  type="submit"
                                  className="bg-indigo-600 hover:bg-indigo-700 text-white p-2.5 rounded-xl transition-all"
                                >
                                  <Send className="w-4 h-4" />
                                </button>
                              </form>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Order ticker simulator */}
                  {activeOrderPending && (
                    <div className="bg-indigo-950 rounded-3xl p-5 text-white flex flex-col md:flex-row items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-white/10 rounded-2xl border border-white/10">
                          <Activity className="w-6 h-6 text-indigo-300 shrink-0" />
                        </div>
                        <div>
                          <h4 className="font-bold text-sm">
                            {lang === "id" ? "Pesanan Menunggu Verifikasi Manual Owner" : "Order Awaiting Manual Verification"}
                          </h4>
                          <p className="text-xs text-indigo-300 font-mono tracking-tight mt-0.5">
                            ID: {activeOrderPending.id} • Laporan Jodoh & Karir 100+ Hlm • Rp 49.000
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-2 w-full md:w-auto self-end md:self-center">
                        <button
                          onClick={() => handleWhatsAppSend(activeOrderPending)}
                          className="flex-1 md:flex-none justify-center bg-green-500 text-[10px] px-4 py-2 rounded-full font-black uppercase tracking-wider hover:bg-green-600 transition-all text-center flex items-center gap-1"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>{translations[lang].btnWaNotify}</span>
                        </button>
                      </div>
                    </div>
                  )}

                </div>

                {/* Right column: Upsell premium & notification controls */}
                <div className="col-span-12 xl:col-span-4 space-y-6">
                  
                  {/* High contrast Upsell Premium Box */}
                  {!isPremiumUser ? (
                    <div className="bg-gradient-to-br from-indigo-600 via-purple-700 to-indigo-800 rounded-[32px] p-6 text-white shadow-xl shadow-indigo-100 flex flex-col justify-between relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-xl"></div>
                      
                      <div className="relative">
                        <span className="text-[10px] font-black tracking-[0.2em] bg-yellow-400 text-slate-900 px-3.5 py-1.5 rounded-full mb-4 inline-block shadow-sm">
                          UNLOCK PREMIUM REPORTS
                        </span>
                        
                        <h3 className="text-xl sm:text-2xl font-black mb-2 leading-tight">
                          {translations[lang].upgradePremium}
                        </h3>
                        <p className="text-indigo-200 text-xs mb-4 leading-relaxed">
                          {translations[lang].upgradeDesc}
                        </p>

                        <div className="space-y-2 mb-6 bg-white/5 p-4 rounded-2xl border border-white/10">
                          {translations[lang].premiumFeatures.map((feat, i) => (
                            <div key={i} className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                              <span className="text-white/90 text-xs font-semibold">{feat}</span>
                            </div>
                          ))}
                        </div>

                        <div className="text-center mb-6">
                          <p className="text-xs text-yellow-300 font-bold uppercase tracking-wider">{translations[lang].pricing}</p>
                        </div>
                        
                        <div className="w-full space-y-2 mb-4">
                          <button 
                            onClick={() => {
                              setSelectedPayMethod("Saweria");
                              setShowPremiumModal(true);
                            }}
                            className="w-full bg-yellow-400 text-slate-900 py-3 rounded-2xl font-black shadow-lg hover:bg-yellow-300 transition-all hover:scale-[1.02] active:scale-95 text-xs uppercase"
                          >
                            Beli via Saweria
                          </button>
                          <button 
                            onClick={() => {
                              setSelectedPayMethod("Bank Transfer");
                              setShowPremiumModal(true);
                            }}
                            className="w-full bg-indigo-500/30 hover:bg-indigo-500/50 border border-indigo-400 text-white py-3 rounded-2xl font-bold backdrop-blur-sm transition-all text-xs"
                          >
                            Bank Transfer Manual
                          </button>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-white/10 text-center">
                        <a 
                          href="https://wa.me/082231642512" 
                          target="_blank" 
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 text-[10px] font-bold text-green-400 uppercase tracking-widest hover:underline"
                        >
                          <span className="w-2 h-2 rounded-full bg-green-400 animate-ping"></span>
                          <span>{lang === "id" ? "Hubungi WhatsApp: 082231642512" : "Support WA: 082231642512"}</span>
                        </a>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-gradient-to-br from-indigo-900 to-indigo-950 rounded-[32px] p-6 text-white shadow-xl relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl"></div>
                      <div className="text-center space-y-3">
                        <span className="text-[10px] font-black tracking-widest bg-emerald-500 text-white px-3 py-1 rounded-full uppercase">
                          PREMIUM GRANTED UNLIMITED
                        </span>
                        <Award className="w-12 h-12 text-yellow-400 mx-auto animate-bounce" />
                        <h4 className="font-extrabold text-white text-base">
                          {lang === "id" ? "Wawasan Premium Terbuka" : "Premium Insights Unlocked"}
                        </h4>
                        <p className="text-xs text-indigo-200">
                          {lang === "id" 
                            ? "Terima kasih atas pembelian Anda! Anda sekarang berhak menanyakan jutaan solusi life-path kepada Asisten Psikolog AI disamping."
                            : "Your transfer is fully cleared! Ask anything to our customized artificial intelligence companion module on the left panel."}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Daily study and notification system custom block */}
                  <div className="space-y-4">
                    <NotificationToast lang={lang} />
                  </div>

                  {/* Profile & History Timeline Widget in Dashboard Right column */}
                  <div className="bg-white rounded-[32px] p-6 shadow-sm border border-indigo-50">
                    <div className="flex justify-between items-center mb-6">
                      <h5 className="font-black text-slate-800 uppercase text-xs tracking-widest">
                        {translations[lang].historyTitle}
                      </h5>
                      <span className="text-xs text-indigo-500 font-bold hover:underline cursor-pointer" onClick={() => setCurrentStep("history")}>
                        {lang === "id" ? "Lihat Semua" : "View All"}
                      </span>
                    </div>

                    <div className="space-y-4">
                      {historyList.slice(0, 3).map((hist, idx) => (
                        <div key={idx} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-[10px] ${
                              hist.dominantColor === PersonalityColor.RED ? "bg-red-50 text-red-600" :
                              hist.dominantColor === PersonalityColor.YELLOW ? "bg-amber-50 text-amber-600" :
                              hist.dominantColor === PersonalityColor.BLUE ? "bg-blue-50 text-blue-600" :
                              "bg-slate-50 text-indigo-600"
                            }`}>
                              0{idx + 1}
                            </div>
                            <div>
                              <p className="text-xs font-bold text-slate-800">{hist.userProfile.name}</p>
                              <p className="text-[9px] text-slate-400 italic">
                                {new Date(hist.date).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <span className="text-[10px] font-black uppercase text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                            {hist.dominantColor}
                          </span>
                        </div>
                      ))}
                      {historyList.length === 0 && (
                        <p className="text-xs text-slate-400 text-center">{translations[lang].noHistory}</p>
                      )}
                    </div>
                  </div>

                </div>

              </div>
            )}

            {/* View: User History List */}
            {currentStep === "history" && (
              <div className="max-w-4xl mx-auto space-y-6">
                <div className="bg-white rounded-[32px] p-8 shadow-md border border-slate-100">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-2xl font-black text-slate-800 tracking-tight flex items-center gap-2">
                      <History className="w-6 h-6 text-indigo-600 shrink-0" />
                      {translations[lang].historyTitle}
                    </h3>
                    <button 
                      onClick={() => {
                        setHistoryList([]);
                        localStorage.removeItem("aura_history");
                        showToast(lang === "id" ? "Riwayat tes berhasil diclear." : "History list cleared.");
                      }}
                      className="text-xs font-bold text-rose-500 hover:text-rose-700 bg-rose-50 px-3 py-1.5 rounded-xl transition-all"
                    >
                      {lang === "id" ? "Hapus Semua" : "Clear All"}
                    </button>
                  </div>
                  <p className="text-xs text-slate-500">
                    {translations[lang].historySub}
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {historyList.filter(hist => hist.userId === currentUser?.id).map((hist, i) => (
                    <div 
                      key={i} 
                      className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:shadow-md transition-all"
                    >
                      <div className="flex gap-4 items-center">
                        <div className={`w-14 h-14 rounded-2xl flex flex-col items-center justify-center font-black text-white ${colorBgs[hist.dominantColor]}`}>
                          <span className="text-lg">{hist.scores[0].percentage}%</span>
                          <span className="text-[8px] uppercase">{hist.dominantColor}</span>
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-800 text-base">{hist.userProfile.name}</h4>
                          <p className="text-xs text-slate-500">
                             {hist.userProfile.age} {lang === "id" ? "Tahun" : "Years"} • {hist.userProfile.gender} • {hist.userProfile.occupation}
                          </p>
                          <p className="text-[10px] text-slate-400 font-mono mt-1">
                            {new Date(hist.date).toLocaleString()}
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-2 self-end md:self-auto">
                        <button 
                          onClick={() => {
                            setActiveResult(hist);
                            setCurrentStep("result");
                            showToast(lang === "id" ? "Membuka kalkulasi terpilih..." : "Restoring selected calculation values...");
                          }}
                          className="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold px-4 py-2 rounded-xl text-xs transition-all"
                        >
                          {lang === "id" ? "Buka Analisis" : "View Results"}
                        </button>
                      </div>
                    </div>
                  ))}

                  {historyList.filter(hist => hist.userId === currentUser?.id).length === 0 && (
                    <div className="p-12 text-center bg-white rounded-3xl border border-dashed border-indigo-200">
                      <p className="text-slate-500 text-sm">{translations[lang].noHistory}</p>
                      <button 
                        onClick={() => setCurrentStep("profile")}
                        className="mt-4 bg-indigo-600 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all"
                      >
                        {translations[lang].btnStart}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* View: User Personal simulated Transactions and invoice look */}
            {currentStep === "transactions" && (
              <div className="max-w-4xl mx-auto space-y-6">
                <div className="bg-white rounded-[32px] p-8 shadow-md border border-slate-100">
                  <h3 className="text-2xl font-black text-slate-800 tracking-tight flex items-center gap-2">
                    <FileText className="w-6 h-6 text-indigo-600 shrink-0" />
                    {lang === "id" ? "Riwayat Transaksi Saya" : "My Orders Tracking"}
                  </h3>
                  <p className="text-xs text-slate-500 mt-2">
                    {lang === "id" ? "Pantau status pesanan upgrade premium Anda menuju full report." : "Track the validation process of your premium payments."}
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {transactions.filter(t => t.userId === currentUser?.id).map((t, idx) => (
                    <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-slate-500">{t.id}</span>
                          <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase ${
                            t.status === "Success" ? "bg-emerald-100 text-emerald-700" :
                            t.status === "Pending" ? "bg-amber-100 text-amber-700" :
                            "bg-rose-100 text-rose-700"
                          }`}>
                            {t.status === "Success" ? translations[lang].statusSuccess :
                             t.status === "Pending" ? translations[lang].statusPending :
                             translations[lang].statusFailed}
                          </span>
                        </div>
                        <h4 className="font-bold text-sm text-slate-800">Premium Character Report 100+ Hlm</h4>
                        <p className="text-xs text-slate-500">
                          {lang === "id" ? "Metode Pembayaran:" : "Gateway:"} {t.paymentMethod} • Rp {t.amount.toLocaleString()}
                        </p>
                        <p className="text-[10px] text-slate-400 font-mono">
                          {new Date(t.date).toLocaleString()}
                        </p>
                      </div>

                      <div className="flex gap-2 w-full md:w-auto self-end md:self-auto">
                        <button
                          onClick={() => handleWhatsAppSend(t)}
                          className="flex-1 md:flex-none justify-center border border-green-500 text-green-700 bg-green-50 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>WhatsApp Admin</span>
                        </button>
                      </div>
                    </div>
                  ))}

                  {transactions.filter(t => t.userId === currentUser?.id).length === 0 && (
                    <div className="p-12 text-center bg-white rounded-3xl border border-dashed border-indigo-200">
                      <p className="text-slate-500 text-sm">
                        {lang === "id" ? "Anda belum melakukan transaksi order premium." : "You have no active premium order ledger entries."}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* View: Owner/Admin Order Tracking & Financial Ledger Dashboard */}
            {currentStep === "admin" && (
              <div className="space-y-6" id="owner-admin-dashboard">
                
                {/* Dashboard title header */}
                <div className="bg-white rounded-[32px] p-8 shadow-md border border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h3 className="text-2xl font-black text-slate-800 tracking-tight flex items-center gap-2">
                      <Settings className="w-6 h-6 text-indigo-600 shrink-0 animate-spin" />
                      {translations[lang].adminDashboardTitle}
                    </h3>
                    <p className="text-xs text-slate-500 mt-2">
                      {translations[lang].adminDashboardSub}
                    </p>
                  </div>

                  {/* Operational Export buttons */}
                  <div className="flex gap-2">
                    <button 
                      onClick={handleExportLedger}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs px-4 py-2.5 rounded-xl transition-all shadow-sm flex items-center gap-2"
                      id="btn-export-ledger"
                    >
                      <FileSpreadsheet className="w-4 h-4" />
                      <span>{translations[lang].exportMonthlyLedger}</span>
                    </button>

                    <button 
                      onClick={() => {
                        // Reset simulated transactions to default values
                        setTransactions([]);
                        localStorage.removeItem("aura_transactions");
                        showToast("Transactions ledger database reset simulated!");
                      }}
                      className="border border-slate-200 bg-white hover:bg-slate-50 text-slate-500 text-xs px-4 py-2.5 rounded-xl font-bold"
                    >
                      {translations[lang].importLedger}
                    </button>
                  </div>
                </div>

                {/* Simulated Core Financial Statistics */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  
                  <div className="bg-white p-6 rounded-3xl border border-indigo-50 shadow-sm flex items-center gap-4">
                    <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl">
                      <DollarSign className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{translations[lang].totalSales}</p>
                      <p className="text-lg font-black text-slate-800 mt-0.5" id="stats-revenue">Rp {totalSalesRevenue.toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-3xl border border-indigo-50 shadow-sm flex items-center gap-4">
                    <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
                      <CheckCircle className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{translations[lang].paidOrders}</p>
                      <p className="text-lg font-black text-slate-800 mt-0.5">{totalSuccessCount} {lang === "id" ? "Pcs" : "Order"}</p>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-3xl border border-indigo-50 shadow-sm flex items-center gap-4">
                    <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl">
                      <Activity className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{translations[lang].pendingOrders}</p>
                      <p className="text-lg font-black text-slate-800 mt-0.5">{totalPendingCount} {lang === "id" ? "Verif" : "Pending"}</p>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-3xl border border-indigo-50 shadow-sm flex items-center gap-4">
                    <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl">
                      <TrendingUp className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{translations[lang].conversionRate}</p>
                      <p className="text-lg font-black text-slate-800 mt-0.5">{conversionRatePct}%</p>
                    </div>
                  </div>

                </div>

                {/* Admin Sub Tab Switcher */}
                <div className="flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200 w-fit">
                  <button
                    type="button"
                    onClick={() => setAdminActiveTab("financial")}
                    className={`px-5 py-2.5 text-xs font-bold rounded-xl transition-all ${
                      adminActiveTab === "financial"
                        ? "bg-white text-indigo-600 shadow-sm border border-indigo-50"
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    {lang === "id" ? "Keuangan & Transaksi 💰" : "Financial Ledger 💰"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setAdminActiveTab("users")}
                    className={`px-5 py-2.5 text-xs font-bold rounded-xl transition-all ${
                      adminActiveTab === "users"
                        ? "bg-white text-indigo-600 shadow-sm border border-indigo-50"
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    {lang === "id" ? "Daftar Akun Klien Terdaftar 👥" : "Client User Directory 👥"}
                  </button>
                </div>

                {adminActiveTab === "financial" ? (
                  /* Sub panel: Transaction tables */
                  <div className="bg-white rounded-[32px] p-6 shadow-md border border-slate-100 overflow-hidden">
                    <div className="flex justify-between items-center mb-6">
                      <h4 className="font-extrabold text-slate-800 text-sm uppercase tracking-wider">
                        {translations[lang].transactionLogs}
                      </h4>
                      <span className="text-xs text-slate-400 font-medium">Real-time mock environment</span>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="border-b border-slate-100 text-[10px] font-black uppercase text-slate-400 tracking-wider">
                            <th className="pb-3 pl-2">ID</th>
                            <th className="pb-3">Client details</th>
                            <th className="pb-3">Payment</th>
                            <th className="pb-3 text-right">Amount</th>
                            <th className="pb-3">Notes</th>
                            <th className="pb-3 text-center">Status</th>
                            <th className="pb-3 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {transactions.map((t, idx) => (
                            <tr key={idx} className="border-b border-indigo-50 text-xs font-semibold hover:bg-slate-50 transition-all">
                              <td className="py-4 pl-2 font-mono text-indigo-600">{t.id}</td>
                              <td className="py-4">
                                <p className="font-bold text-slate-800">{t.userName}</p>
                                <p className="text-[10px] text-slate-400 font-mono mt-0.5">{t.whatsappNumber || t.userEmail}</p>
                              </td>
                              <td className="py-4">
                                <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded font-bold text-[9px] uppercase">{t.paymentMethod}</span>
                              </td>
                              <td className="py-4 text-right font-bold text-slate-800">Rp {t.amount.toLocaleString()}</td>
                              <td className="py-4 text-slate-500 max-w-[150px] truncate" title={t.notes}>{t.notes || "-"}</td>
                              <td className="py-4 text-center">
                                <span className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase ${
                                  t.status === "Success" ? "bg-emerald-100 text-emerald-800" :
                                  t.status === "Pending" ? "bg-amber-100 text-amber-800" :
                                  "bg-rose-100 text-rose-800"
                                }`}>
                                  {t.status}
                                </span>
                              </td>
                              <td className="py-4 text-right">
                                {t.status === "Pending" && (
                                  <div className="flex gap-1 justify-end">
                                    <button
                                      onClick={() => handleVerifyOrder(t.id, "Success")}
                                      className="bg-emerald-50 hover:bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded text-[10px] font-extrabold transition-all"
                                    >
                                      Verify
                                    </button>
                                    <button
                                      onClick={() => handleVerifyOrder(t.id, "Failed")}
                                      className="bg-rose-50 hover:bg-rose-100 text-rose-700 px-2.5 py-1 rounded text-[10px] font-extrabold transition-all"
                                    >
                                      Reject
                                    </button>
                                  </div>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : (
                  /* Sub panel: Registered User Accounts Directory & Color History logs */
                  <div className="bg-white rounded-[32px] p-6 shadow-md border border-slate-100 overflow-hidden">
                    <div className="flex justify-between items-center mb-6">
                      <h4 className="font-extrabold text-slate-800 text-sm uppercase tracking-wider">
                        {lang === "id" ? "Daftar Klien Terdaftar" : "Registered Client Accounts"}
                      </h4>
                      <span className="text-xs text-slate-400 font-medium">Automatic multi-user synchronization active</span>
                    </div>

                    <div className="overflow-x-auto font-sans">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="border-b border-slate-100 text-[10px] font-black uppercase text-slate-400 tracking-wider">
                            <th className="pb-3 pl-2">{lang === "id" ? "Nama Pengguna" : "Full Name"}</th>
                            <th className="pb-3">{lang === "id" ? "Kredensial Login" : "Login Identifier"}</th>
                            <th className="pb-3">{lang === "id" ? "Tipe Sensor" : "Provider"}</th>
                            <th className="pb-3 text-center">{lang === "id" ? "Jumlah Tes" : "Tests Count"}</th>
                            <th className="pb-3">{lang === "id" ? "Warna Dominan" : "Dominant Color"}</th>
                            <th className="pb-3 text-right">{lang === "id" ? "Terdaftar Pada" : "Registered At"}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {allUsers.map((user, uidx) => {
                            const userResults = historyList.filter(h => h.userId === user.id);
                            const lastResult = userResults[0];
                            return (
                              <tr key={uidx} className="border-b border-indigo-50 text-xs font-semibold hover:bg-slate-50 transition-all">
                                <td className="py-4 pl-2">
                                  <div className="flex items-center gap-2">
                                    <div className="w-7 h-7 rounded-full bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center font-bold text-slate-600">
                                      <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} alt="avatar" className="w-7 h-7" />
                                    </div>
                                    <span className="font-bold text-slate-800">{user.name}</span>
                                  </div>
                                </td>
                                <td className="py-4 font-mono text-slate-500">{user.emailOrPhone}</td>
                                <td className="py-4">
                                  {user.provider === "google" ? (
                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 text-blue-700 text-[9px] font-extrabold rounded-full border border-blue-100">
                                      <svg className="w-3 h-3" viewBox="0 0 24 24">
                                        <path
                                          fill="#4285F4"
                                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                        />
                                      </svg>
                                      GMAIL / GOOGLE
                                    </span>
                                  ) : (
                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-purple-50 text-purple-700 text-[9px] font-extrabold rounded-full border border-purple-100 border-dashed">
                                      EMAIL / PHONE
                                    </span>
                                  )}
                                </td>
                                <td className="py-4 text-center font-bold text-slate-700">
                                  <span className="px-2 py-1 bg-slate-100 text-slate-700 rounded-full text-[10px]">
                                    {userResults.length} kali tes
                                  </span>
                                </td>
                                <td className="py-4">
                                  {lastResult ? (
                                    <span className={`px-2.5 py-1 rounded-full text-[9px] font-black uppercase text-white shadow-sm border ${
                                      lastResult.dominantColor === PersonalityColor.RED ? "bg-rose-500 border-rose-600" :
                                      lastResult.dominantColor === PersonalityColor.YELLOW ? "bg-amber-500 border-amber-600" :
                                      lastResult.dominantColor === PersonalityColor.BLUE ? "bg-indigo-600 border-indigo-700" :
                                      "bg-teal-500 border-teal-600"
                                    }`}>
                                      {lastResult.dominantColor}
                                    </span>
                                  ) : (
                                    <span className="text-slate-400 font-normal italic">Belum mengisi</span>
                                  )}
                                </td>
                                <td className="py-4 text-right text-slate-400 font-mono text-[10px] pr-2">
                                  {new Date(user.createdAt).toLocaleDateString()}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

              </div>
            )}
            </>

          </div>

          <footer className="py-8 text-center text-[11px] text-slate-400 mt-auto border-t border-indigo-100/40 bg-white/20">
            <p>© 2026 Character Color Analyzer. Powered by Hartman Color Science & AI Study Lab.</p>
            <p className="mt-1 font-mono">muhammadaliirkham123@gmail.com • Contact Manager WA: 082231642512</p>
          </footer>
        </main>
          </>
        )}
      </div>

      {/* Modal Upgrade Checkout Dialog */}
      {showPremiumModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[32px] p-6 sm:p-8 max-w-lg w-full relative shadow-2xl border border-indigo-50/50 flex flex-col justify-between overflow-hidden">
            <button 
              onClick={() => setShowPremiumModal(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 bg-slate-50 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <span className="text-[10px] font-black bg-indigo-50 text-indigo-600 px-3 py-1.5 rounded-full inline-block uppercase tracking-wider mb-2">
                Checkout Premium Access
              </span>
              <h4 className="text-xl font-black text-slate-800">
                {translations[lang].payMethod}
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                Laporan detail jodoh & asmara, peta proyeksi karir 5 tahun, 100+ halaman PDF.
              </p>
            </div>

            <div className="flex gap-2 p-1 bg-slate-50 border rounded-2xl mb-6">
              <button
                onClick={() => setSelectedPayMethod("Saweria")}
                className={`flex-1 py-3 text-xs font-black rounded-xl transition-all ${
                  selectedPayMethod === "Saweria" ? "bg-yellow-400 text-slate-900 shadow-sm" : "text-slate-500 hover:bg-slate-100"
                }`}
              >
                Saweria (QRIS / E-Wallet)
              </button>
              <button
                onClick={() => setSelectedPayMethod("Bank Transfer")}
                className={`flex-1 py-3 text-xs font-black rounded-xl transition-all ${
                  selectedPayMethod === "Bank Transfer" ? "bg-indigo-600 text-white shadow-sm" : "text-slate-500 hover:bg-slate-100"
                }`}
              >
                Bank Transfer CIMB Niaga
              </button>
            </div>

            {selectedPayMethod === "Saweria" ? (
              <div className="p-4 bg-amber-50/60 rounded-2xl border border-amber-100 text-xs text-slate-700 leading-relaxed mb-6 space-y-3">
                <p className="font-semibold">{translations[lang].paySaweria}</p>
                <p>{translations[lang].saweriaDesc}</p>
                <div className="flex flex-col items-center justify-center py-2 gap-3">
                  {/* QR code simulated banner */}
                  <div className="w-32 h-32 bg-slate-800 text-white rounded-lg flex flex-col items-center justify-center font-mono text-[9px] border p-2 text-center select-none uppercase">
                    <span className="font-black text-amber-400 mb-1">SAWERIA QRIS</span>
                    <Grid className="w-12 h-12 text-white" />
                    <span>SCAN DISINI</span>
                  </div>

                  <a 
                    href="https://saweria.co/aliirkham" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-extrabold rounded-xl text-center text-xs flex items-center justify-center gap-2 shadow-sm transition-all grow w-full"
                  >
                    <Smartphone className="w-4 h-4 shrink-0" />
                    <span>Lanjutkan ke saweria.co/aliirkham</span>
                  </a>
                </div>
              </div>
            ) : (
              <div className="p-4 bg-indigo-50/60 rounded-2xl border border-indigo-100 text-xs text-slate-700 leading-relaxed mb-6 space-y-2">
                <p className="font-semibold">{translations[lang].payBank}</p>
                <p>{translations[lang].bankDesc}</p>
              </div>
            )}

            {/* Input WhatsApp verification details */}
            <form onSubmit={handlePremiumUpgradeSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] font-black uppercase text-slate-400 mb-1.5">
                  Nomor WhatsApp Verifikasi
                </label>
                <input 
                  type="text" 
                  value={userWaNumber}
                  onChange={(e) => setUserWaNumber(e.target.value)}
                  placeholder="Contoh: 0812345678" 
                  className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-xl px-4 py-3 text-xs"
                  required
                />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase text-slate-400 mb-1.5">
                  Catatan Bukti / Kirim Berkas Simulasi
                </label>
                <input 
                  type="text" 
                  value={transactionNote}
                  onChange={(e) => setTransactionNote(e.target.value)}
                  placeholder="Catatan tambahan ( opsional )..." 
                  className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-xl px-4 py-3 text-xs"
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-tr from-indigo-600 to-purple-600 text-white font-black py-4 rounded-2xl shadow-lg hover:scale-[1.01] transition-all text-xs uppercase"
                >
                  Kirim Bukti Pembayaran
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Admin Password/PIN setup */}
      {showAdminPinModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[32px] p-8 max-w-sm w-full relative shadow-2xl border border-rose-100/60 flex flex-col justify-between">
            <button 
              onClick={() => {
                setShowAdminPinModal(false);
                setAdminPinInput("");
                setAdminPinError("");
              }}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 bg-slate-50 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-3">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-black text-slate-800">
                {lang === "id" ? "Autentikasi Admin" : "Admin Authentication"}
              </h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                {lang === "id" 
                  ? "Sistem memisahkan akses personal pemilik dan pengguna. Masukkan PIN Admin untuk verifikasi." 
                  : "Symmetric role restriction is active. Enter the passcode to authenticate."}
              </p>
            </div>

            <form 
              onSubmit={(e) => {
                e.preventDefault();
                if (adminPinInput === "muhammadaliirkhamsembung101294") {
                  setCurrentUserRole("admin");
                  localStorage.setItem("aura_active_role", "admin");
                  setShowAdminPinModal(false);
                  setCurrentStep("admin");
                  showToast(lang === "id" ? "Verifikasi Berhasil! Selamat Datang, Owner Ali" : "Authenticated successfully! Welcome back, Admin");
                } else {
                  setAdminPinError(lang === "id" ? "Kode PIN salah! Silakan coba lagi." : "Incorrect PIN passcode!");
                }
              }}
              className="space-y-4"
            >
              <div>
                <input 
                  type="password" 
                  value={adminPinInput}
                  onChange={(e) => {
                    setAdminPinInput(e.target.value);
                    setAdminPinError("");
                  }}
                  placeholder="PIN Admin..." 
                  className="w-full bg-slate-50 border border-slate-200 focus:border-rose-500 rounded-xl px-4 py-3 text-sm text-center font-mono tracking-widest outline-none"
                  required
                  autoFocus
                />
                {adminPinError && (
                  <p className="text-center text-rose-600 text-xs mt-2 font-bold flex items-center justify-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{adminPinError}</span>
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-rose-600 hover:bg-rose-700 text-white font-black py-3 rounded-2xl shadow-lg transition-all text-xs uppercase"
              >
                {lang === "id" ? "Masuk Panel Admin" : "Verify & Authenticate"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Simulation Modal for OAuth Gmail Account */}
      {showGoogleModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[32px] p-8 max-w-sm w-full relative shadow-2xl border border-indigo-100 flex flex-col justify-between" id="gmail-oauth-popup">
            <button 
              onClick={() => {
                setShowGoogleModal(false);
                setGoogleEmailInput("");
                setGoogleNameInput("");
              }}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 bg-slate-50 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center mx-auto mb-3 shadow-md bg-white border border-slate-100 p-2">
                <svg viewBox="0 0 24 24" className="w-full h-full">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.53-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-8.87z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.11 0-5.74-2.11-6.68-4.96H1.21v3.15C3.18 21.88 7.31 24 12 24z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.32 14.24A7.16 7.16 0 0 1 4.91 12c0-.79.13-1.57.41-2.31V6.54H1.21A11.94 11.94 0 0 0 0 12c0 1.92.45 3.74 1.21 5.39l4.11-3.15z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.18 2.12 1.21 5.46l4.11 3.15c.94-2.85 3.57-4.96 6.68-4.96z"
                  />
                </svg>
              </div>
              <h4 className="text-lg font-black text-slate-800">
                {lang === "id" ? "Masuk Lewat Gmail" : "Google Identity Services"}
              </h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                {lang === "id" 
                  ? "Hubungkan data diri dan riwayat analisis Anda secara langsung dengan akun Gmail." 
                  : "Sync diagnostics securely via mock OAuth identity protocol."}
              </p>
            </div>

            <form 
              onSubmit={(e) => {
                e.preventDefault();
                if (!googleEmailInput.trim()) return;

                const finalName = googleNameInput.trim() || googleEmailInput.split("@")[0];
                const cleanEmail = googleEmailInput.trim();

                // Check if user already exists
                let existing = allUsers.find(
                  u => u.emailOrPhone.toLowerCase() === cleanEmail.toLowerCase()
                );

                if (!existing) {
                  existing = {
                    id: "usr-google-" + Date.now(),
                    emailOrPhone: cleanEmail,
                    name: finalName,
                    password: "google-oauth-flow",
                    provider: "google",
                    createdAt: new Date().toISOString()
                  };
                  const updatedList = [existing, ...allUsers];
                  setAllUsers(updatedList);
                  localStorage.setItem("aura_all_users", JSON.stringify(updatedList));
                }

                setCurrentUser(existing);
                localStorage.setItem("aura_current_user", JSON.stringify(existing));
                setProfile(prev => ({ ...prev, name: existing!.name }));

                setGoogleEmailInput("");
                setGoogleNameInput("");
                setShowGoogleModal(false);
                
                showToast(lang === "id" ? `Berhasil Masuk via Gmail! Halo, ${existing.name} 🙌` : `Authenticated via Gmail! Hello, ${existing.name} 👋`);
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1 pl-1">
                  Gmail Address
                </label>
                <input 
                  type="email" 
                  value={googleEmailInput}
                  onChange={(e) => setGoogleEmailInput(e.target.value)}
                  placeholder="anda@gmail.com" 
                  className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-xl px-4 py-2.5 text-xs font-semibold outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1 pl-1">
                  Nama Tampilan (Opsional)
                </label>
                <input 
                  type="text" 
                  value={googleNameInput}
                  onChange={(e) => setGoogleNameInput(e.target.value)}
                  placeholder="Nama Lengkap Google..." 
                  className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-xl px-4 py-2.5 text-xs font-semibold outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold py-3 rounded-2xl shadow-lg transition-all text-xs uppercase"
              >
                {lang === "id" ? "Konfirmasi Masuk Akun" : "Authorize OAuth Redirect"}
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
