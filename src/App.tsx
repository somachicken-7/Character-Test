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
import { iqQuestions } from "./iqTestData";
import { psyQuestions } from "./psyTestData";

export default function App() {
  // Locale State
  const [lang, setLang] = useState<"id" | "en">("id");

  // Currency Formatter Helper
  const formatAmount = (amt: number) => {
    if (amt <= 1000) {
      return `$${amt}`;
    }
    return `Rp ${amt.toLocaleString("id-ID")}`;
  };

  // Reusable Premium Teaser Renderer
  const renderPremiumTeaser = (title: string, desc: string, icon: React.ReactNode) => {
    return (
      <div className="p-8 bg-gradient-to-br from-indigo-50/50 via-purple-50/30 to-white rounded-3xl border border-indigo-100/60 text-center relative overflow-hidden flex flex-col items-center justify-center shadow-sm">
        <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-105/30 rounded-full blur-2xl"></div>
        <div className="absolute -left-10 -bottom-10 w-24 h-24 bg-indigo-100/20 rounded-full blur-2xl"></div>
        
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-100 to-purple-100 text-indigo-600 flex items-center justify-center mb-5 shadow-sm">
          {icon}
        </div>

        <h5 className="font-extrabold text-indigo-950 text-base flex items-center gap-1.5 justify-center">
          <Lock className="w-4 h-4 text-amber-500 shrink-0" />
          <span>{title}</span>
        </h5>
        
        <p className="text-xs text-slate-500 max-w-md mx-auto mt-2.5 leading-relaxed font-semibold">
          {desc}
        </p>

        <div className="p-4 bg-white/80 rounded-2xl border border-indigo-50/70 mt-5 max-w-sm text-center shadow-sm">
          <span className="text-[10px] font-black uppercase text-indigo-600 tracking-wider">PREMIUM PRIVILEGE</span>
          <p className="text-[11px] text-slate-600 font-bold mt-1.5 leading-relaxed">
            {lang === "id"
              ? "Beli Paket Premium seharga Rp 25.000 sekarang untuk langsung membuka semua laporan eksklusif!"
              : "Upgrade to Premium for only $5 now to unlock all exclusive reports instantly!"}
          </p>
        </div>
        
        <button
          onClick={() => setShowPremiumModal(true)}
          className="mt-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 text-white font-black text-xs px-6 py-3.5 rounded-2xl hover:scale-105 transition-all shadow-md active:scale-95 flex items-center gap-2 uppercase tracking-wider"
        >
          <Sparkles className="w-4 h-4 text-yellow-300" />
          <span>{translations[lang].upgradePremium}</span>
        </button>
      </div>
    );
  };

  // Love Compatibility calculation algorithm
  const calculateCompatibility = (colorA: PersonalityColor, colorB: PersonalityColor) => {
    let score = 85;
    let chemistry = "Harmoni Kedamaian & Penjaga Stabilitas";
    let communication = 88;
    let bond = 84;
    let conflict = 80;
    let coachText = "";

    if (colorA === PersonalityColor.RED) {
      if (colorB === PersonalityColor.RED) {
        score = 72;
        chemistry = lang === "id" ? "Dua Nahkoda (Dinamika Kekuasaan Tinggi)" : "Dual Captains (High Power Dynamic)";
        communication = 65; bond = 78; conflict = 55;
        coachText = lang === "id" 
          ? "Kolaborasi luar biasa jika visi sejalan, namun rawan perang ego sengit. Belajarlah mengalah untuk menjaga kedamaian rumah tangga."
          : "Incredible joint drive if visions align, but prone to fierce ego clashes. Learn to delegate and pause before reacting.";
      } else if (colorB === PersonalityColor.YELLOW) {
        score = 84;
        chemistry = lang === "id" ? "Magnet Petualangan & Eksekusi Kuat" : "The Spark & Drive Dynamic";
        communication = 82; bond = 88; conflict = 75;
        coachText = lang === "id"
          ? "Merah fokus mengeksekusi visi, sedangkan Kuning menyulut kebahagiaan dan optimisme. Pasangan yang saling menyemangati!"
          : "Red focuses on execution of goals, while Yellow sparks constant joy and motivation. Highly supportive matching!";
      } else if (colorB === PersonalityColor.BLUE) {
        score = 79;
        chemistry = lang === "id" ? "Pilar Logika & Ambisi Sempurna" : "Analytical Drive Alliance";
        communication = 70; bond = 80; conflict = 65;
        coachText = lang === "id"
          ? "Biru mendalami detail analitis dari rencana besar Merah. Jaga komunikasi agar Merah tidak terdengar terlalu mendikte dan menekan Biru."
          : "Blue drills down on analysis which validates Red's bold vision. Exercise patience; Red should avoid bossing around Blue.";
      } else { // WHITE
        score = 91;
        chemistry = lang === "id" ? "Dinamika Penyeimbang Alami (Pendorong & Kedamaian)" : "Natural Balance (The Engine & The Anchor)";
        communication = 85; bond = 92; conflict = 94;
        coachText = lang === "id"
          ? "Putih memberikan ketenangan yang sangat dibutuhkan oleh Merah yang kompetitif, sementara Merah memberi arah dan motivasi bagi Putih."
          : "White provides the crucial calm that centers competitive Red, while Red provides momentum and direction for peaceful White.";
      }
    } else if (colorA === PersonalityColor.YELLOW) {
      if (colorB === PersonalityColor.RED) {
        score = 84;
        chemistry = lang === "id" ? "Dinamika Inspirasi & Kekuatan Tindakan" : "Inspiration & Heavy Action";
        communication = 85; bond = 80; conflict = 78;
        coachText = lang === "id"
          ? "Kuning menyeimbangkan ketegasan Merah dengan warna keceriaan, sementara Merah mengarahkan impian Kuning yang kerap melompat-lompat."
          : "Yellow softens Red's strict demeanor, while Red helps Yellow outline and focus their scattered creative ambitions.";
      } else if (colorB === PersonalityColor.YELLOW) {
        score = 76;
        chemistry = lang === "id" ? "Festival Kegembiraan (Dinamika Kesenangan Maksimal)" : "Social Carnival (Max Joy Dynamic)";
        communication = 92; bond = 82; conflict = 62;
        coachText = lang === "id"
          ? "Waktu bersama Anda berdua sangat menyenangkan dan meriah. Namun, awasi komitmen jangka panjang dan perencanaan keuangan bersama."
          : "Time spent together is highly social, exciting, and joyful. However, make sure to build discipline around budget and long-term planning.";
      } else if (colorB === PersonalityColor.BLUE) {
        score = 71;
        chemistry = lang === "id" ? "Duo Kreatif & Kehati-hatian Sempurna" : "Unpredictable Spark & Perfection";
        communication = 74; bond = 70; conflict = 58;
        coachText = lang === "id"
          ? "Kuning suka spontanitas sedangkan Biru menyukai detail rencana matang. Butuh tenggang rasa tinggi agar Biru tidak lelah menepati janji."
          : "Yellow craves spontaneity vs Blue's meticulous planning. Compassion and compromise are vital for comfort.";
      } else { // WHITE
        score = 88;
        chemistry = lang === "id" ? "Harmonika Keceriaan & Kebersamaan Sunyi" : "Cheerful Warmth & Silent Harmony";
        communication = 90; bond = 87; conflict = 89;
        coachText = lang === "id"
          ? "Kuning menjadi pembawa energi aktif dan sosial, sedangkan Putih mendukung dengan kesabaran tulus di balik layar."
          : "Yellow brings social flair and external playfulness, while White supports with steadfast, listening patience in the background.";
      }
    } else if (colorA === PersonalityColor.BLUE) {
      if (colorB === PersonalityColor.RED) {
        score = 78;
        chemistry = lang === "id" ? "Arsitek Sistem & Panglima Lapangan" : "Structure Builder & Field Marshall";
        communication = 72; bond = 77; conflict = 66;
        coachText = lang === "id"
          ? "Kolaborasi hebat dalam perencanaan dan penyelesaian target, jika tidak terhambat oleh konflik verbal yang terlalu kaku."
          : "Strong collaborative foundation for building goals, as long as boundaries don't restrict gentle daily communications.";
      } else if (colorB === PersonalityColor.YELLOW) {
        score = 72;
        chemistry = lang === "id" ? "Kontradiksi Indah (Spontan versus Terencana)" : "Beautiful Contradiction (Spontaneous vs Planned)";
        communication = 78; bond = 72; conflict = 60;
        coachText = lang === "id"
          ? "Perbedaan kontras bisa menjadi daya tarik utama: Kuning memberi warna segar bagi hidup Biru, sementara Biru merapikan kestabilan."
          : "Contrasting dynamics often attract: Yellow colors Blue's landscape with optimism, while Blue keeps Yellow grounded.";
      } else if (colorB === PersonalityColor.BLUE) {
        score = 83;
        chemistry = lang === "id" ? "Dua Jiwa Pemikir (Loyalitas Sempurna)" : "Dual Sentinels (Absolute Integrity)";
        communication = 80; bond = 88; conflict = 75;
        coachText = lang === "id"
          ? "Sangat berkomitmen, rapi, dan setia satu sama lain. Berhati-hatilah agar tidak sama-sama menumpuk overthinking menjadi bom waktu pasif."
          : "Highly loyal, detailed, and organized. Guard against double-overthinking cycles; share unsaid concerns early to avoid passive weight.";
      } else { // WHITE
        score = 89;
        chemistry = lang === "id" ? "Pilar Kesetiaan & Kenyamanan Emosional" : "Loyal Sanctuary & Safe Haven";
        communication = 84; bond = 91; conflict = 90;
        coachText = lang === "id"
          ? "Biru mendalami rasa dengan aman bersama Putih yang tenang, tanpa takut dihakimi. Kombinasi yang sangat langgeng dan damai."
          : "Blue feels safe exploring deep thoughts with non-judgmental, calm White. A highly enduring, trust-anchored marital pairing.";
      }
    } else { // WHITE
      if (colorB === PersonalityColor.RED) {
        score = 92;
        chemistry = lang === "id" ? "Piramida Kekuatan & Kedamaian Rumah" : "The Engine & The Anchor";
        communication = 86; bond = 93; conflict = 94;
        coachText = lang === "id"
          ? "Sinergi penyeimbang alami yang luar biasa stabil. Memberi rasa nyaman di dalam rumah sembari aktif meraih kesuksesan finansial."
          : "A beautiful, incredibly stable reciprocal pairing. Brings cozy security into the household while Red focuses heavily on economic success.";
      } else if (colorB === PersonalityColor.YELLOW) {
        score = 87;
        chemistry = lang === "id" ? "Dinamika Kebun Bunga & Sinar Mentari" : "Sunlight & Cozy Soil Dynamic";
        communication = 89; bond = 86; conflict = 88;
        coachText = lang === "id"
          ? "Lembut, santai, dan penuh tawa. Sangat mendukung kesehatan mental satu sama lain dari kepungan ketegangan luar."
          : "Gentle, stress-free, and full of giggles. Highly supportive of mental health and perfect for shielding against external pressures.";
      } else if (colorB === PersonalityColor.BLUE) {
        score = 88;
        chemistry = lang === "id" ? "Aliran Kedamaian & Benteng Pikiran" : "Peace Stream & Fortress of Minds";
        communication = 83; bond = 90; conflict = 92;
        coachText = lang === "id"
          ? "Kedamaian sejati terwujud dalam pasangan ini. Emosional terjaga dengan rapi, saling melengkapi kebutuhan cinta tanpa intervensi berlebih."
          : "True therapeutic peace. Both support one another's soft boundaries, nourishing emotional health with complete reassurance.";
      } else { // WHITE
        score = 81;
        chemistry = lang === "id" ? "Dua Jiwa Sunyi (Oase Kedamaian Absolut)" : "Dual Anchors (The Absolute Calm)";
        communication = 78; bond = 85; conflict = 96;
        coachText = lang === "id"
          ? "Sangat jarang bersitegang karena sama-sama menjunjung tinggi toleransi. Namun, waspadai kebiasaan mendiamkan masalah kecil demi harmoni semu."
          : "Extremely low conflict. Highly respectful. Watch out for sweeping tiny issues under the rug; sometimes active conflict is healthy.";
      }
    }

    return { score, chemistry, communication, bond, conflict, coachText };
  };

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

  // Selection of test type
  const [activeTest, setActiveTest] = useState<"character" | "iq" | "psychopath">("character");

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
  
  // IQ assessment answers state
  const [iqAnswers, setIqAnswers] = useState<Record<number, string>>({});
  
  // Psychopath checklist answers state
  const [psyAnswers, setPsyAnswers] = useState<Record<number, string>>({});

  // Active result computed
  const [activeResult, setActiveResult] = useState<AnalysisResult | null>(null);

  // IQ calculated output state
  const [iqResult, setIqResult] = useState<{
    score: number;
    level: string;
    levelEn: string;
    subScores: { logical: number; spatial: number; verbal: number; numerical: number };
    date: string;
  } | null>(null);

  // Psychopath calculated output state
  const [psyResult, setPsyResult] = useState<{
    totalPoints: number;
    level: string;
    levelEn: string;
    title: string;
    titleEn: string;
    desc: string;
    descEn: string;
    date: string;
  } | null>(null);

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
  const [activeTab, setActiveTab] = useState<
    | "strengths"
    | "weakness"
    | "career"
    | "hobbies"
    | "learning"
    | "premium-consult"
    | "premium-report"
    | "premium-match"
    | "premium-career-finance"
    | "premium-cert"
  >("strengths");

  // Premium matchmaking states
  const [matchPartnerName, setMatchPartnerName] = useState("");
  const [matchPartnerColor, setMatchPartnerColor] = useState<PersonalityColor>(PersonalityColor.RED);
  const [matchLoading, setMatchLoading] = useState(false);
  const [matchResult, setMatchResult] = useState<{
    score: number;
    chemistry: string;
    communication: number;
    bond: number;
    conflict: number;
    coachText: string;
  } | null>(null);

  // Premium report selection and career year projection
  const [reportActiveChapter, setReportActiveChapter] = useState(1);
  const [careerActiveYear, setCareerActiveYear] = useState(1);

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
          amount: 25000,
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
          amount: 25000,
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
    if (activeTest === "character") {
      setAnswers({});
    } else if (activeTest === "iq") {
      setIqAnswers({});
    } else {
      setPsyAnswers({});
    }
  };

  // Reset or retake test
  const handleRetakeTest = () => {
    setCurrentQuestionIdx(0);
    setCurrentStep("quiz");
    if (activeTest === "character") {
      setAnswers({});
    } else if (activeTest === "iq") {
      setIqAnswers({});
    } else {
      setPsyAnswers({});
    }
  };

  // Handle quiz options clicked
  const handleAnswerSelect = (color: PersonalityColor) => {
    const newAnswers = { ...answers, [currentQuestionIdx]: color };
    setAnswers(newAnswers);
    
    // Automatically proceed to next or finish
    if (currentQuestionIdx < questionsList.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIdx(prev => prev + 1);
      }, 350);
    } else {
      // Automatically generate profile after 30th question
      setTimeout(() => {
        computeAnalysis(newAnswers);
      }, 450);
    }
  };

  // Handle IQ option click
  const handleIqAnswerSelect = (optionId: string) => {
    const newAnswers = { ...iqAnswers, [currentQuestionIdx]: optionId };
    setIqAnswers(newAnswers);

    if (currentQuestionIdx < iqQuestions.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIdx(prev => prev + 1);
      }, 350);
    } else {
      setTimeout(() => {
        computeIqAnalysis(newAnswers);
      }, 450);
    }
  };

  // Handle Psychopath option click
  const handlePsyAnswerSelect = (optionId: string) => {
    const newAnswers = { ...psyAnswers, [currentQuestionIdx]: optionId };
    setPsyAnswers(newAnswers);

    if (currentQuestionIdx < psyQuestions.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIdx(prev => prev + 1);
      }, 350);
    } else {
      setTimeout(() => {
        computePsyAnalysis(newAnswers);
      }, 450);
    }
  };

  // Evaluate results scores
  const computeAnalysis = (updatedAnswers?: Record<number, PersonalityColor>) => {
    // Defensive engineering: Merge state answers and current updatedAnswers
    const activeAnswers = { ...answers, ...(updatedAnswers || {}) };
    const totalQuestions = questionsList.length;
    
    // Auto-fill any missing/lagging answers with a safe default to prevent users from getting stuck on 30th question
    for (let i = 0; i < totalQuestions; i++) {
      if (activeAnswers[i] === undefined) {
        activeAnswers[i] = PersonalityColor.BLUE;
      }
    }

    // Count colors
    const counts = {
      [PersonalityColor.RED]: 0,
      [PersonalityColor.YELLOW]: 0,
      [PersonalityColor.BLUE]: 0,
      [PersonalityColor.WHITE]: 0,
    };

    Object.values(activeAnswers).forEach(color => {
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

  // Evaluate IQ test results scores
  const computeIqAnalysis = (updatedAnswers?: Record<number, string>) => {
    const activeIqAnswers = { ...iqAnswers, ...(updatedAnswers || {}) };
    let correctCount = 0;
    const subScores = { logical: 0, spatial: 0, verbal: 0, numerical: 0 };
    const totalQuestions = iqQuestions.length;

    // Fill defaults if blank to prevent locks
    for (let i = 0; i < totalQuestions; i++) {
      if (activeIqAnswers[i] === undefined) {
        activeIqAnswers[i] = "a";
      }
    }

    iqQuestions.forEach((q, idx) => {
      const selectedOptId = activeIqAnswers[idx];
      const opt = q.options.find(o => o.id === selectedOptId);
      if (opt && opt.isCorrect) {
        correctCount += 1;
        subScores[q.category] += 1;
      }
    });

    // Score calc: 70 + (correctCount * 1.5) -> range 70 to 145!
    const score = 70 + Math.round(correctCount * 1.5);
    let level = "Rata-rata";
    let levelEn = "Average";
    if (score >= 130) {
      level = "Sangat Unggul (Very Superior)";
      levelEn = "Very Superior";
    } else if (score >= 120) {
      level = "Unggul (Superior)";
      levelEn = "Superior";
    } else if (score >= 110) {
      level = "Rata-rata Tinggi (High Average)";
      levelEn = "High Average";
    } else if (score >= 90) {
      level = "Rata-rata (Average)";
      levelEn = "Average";
    } else {
      level = "Rata-rata Rendah (Low Average)";
      levelEn = "Low Average";
    }

    setIqResult({
      score,
      level,
      levelEn,
      subScores,
      date: new Date().toISOString()
    });

    setCurrentStep("result");
    setActiveTab("strengths");
    showToast(lang === "id" ? "Analisis Skor IQ Anda sukses diformulasikan!" : "IQ Score analysis successfully generated!");
  };

  // Evaluate Psychopath test results scores
  const computePsyAnalysis = (updatedAnswers?: Record<number, string>) => {
    const activePsyAnswers = { ...psyAnswers, ...(updatedAnswers || {}) };
    let totalPoints = 0;
    const totalQuestions = psyQuestions.length;

    // Fill defaults if blank to prevent locks
    for (let i = 0; i < totalQuestions; i++) {
      if (activePsyAnswers[i] === undefined) {
        activePsyAnswers[i] = "d";
      }
    }

    psyQuestions.forEach((q, idx) => {
      const selectedOptId = activePsyAnswers[idx];
      const opt = q.options.find(o => o.id === selectedOptId);
      if (opt) {
        totalPoints += opt.points;
      }
    });

    const maxPoints = 100;
    const scorePct = Math.min(100, Math.round((totalPoints / maxPoints) * 100));

    let title = "";
    let titleEn = "";
    let desc = "";
    let descEn = "";
    let level = "";
    let levelEn = "";

    if (scorePct >= 75) {
      level = "Level Antagonis Bioskop (Tinggi)";
      levelEn = "Pop-Psych Cinematic Villain (High)";
      title = "Mastermind Sinematis";
      titleEn = "Cinematic Mastermind";
      desc = "Pola pikir berdarah dingin, mengutamakan efisiensi logis taktis di atas emosi sesaat. Anda sangat tenang di bawah bahaya luar biasa.";
      descEn = "Highly tactical cold-blooded mastermind. You prioritize pure logical efficiency over emotional drama, feeling zero fear.";
    } else if (scorePct >= 45) {
      level = "Karisma Dingin (Sedang-Tinggi)";
      levelEn = "Savage Charismatic (Medium-High)";
      title = "Skeptis Taktis";
      titleEn = "Tactical Sceptic";
      desc = "Memiliki kontrol emosi yang luar biasa tangguh dan rasionalitas tinggi. Kadang-kadang dingin namun sangat andal mengeksekusi visi bisnis.";
      descEn = "Outstanding emotional self-control and deep rational focus. Visually cold occasionally but highly reliable inside major goals.";
    } else if (scorePct >= 20) {
      level = "Rasionalitas Tenang (Rata-rata/Normal)";
      levelEn = "Calm Rational (Average/Normal)";
      title = "Rasionalis Seimbang";
      titleEn = "Balanced Rationalist";
      desc = "Sosok pragmatis mandiri yang cerdik mencari jalan tengah aman. Menjunjung tinggi empati sosial standar namun logis defensif.";
      descEn = "Clever pragmatist looking out for realistic compromises. High standard social empathy paired with smart logical guards.";
    } else {
      level = "Empati Suci (Sangat Empatis)";
      levelEn = "Empathy Saint (Highly Empathetic)";
      title = "Penjaga Kedamaian Sejati";
      titleEn = "Empathetic Peacekeeper";
      desc = "Sangat hangat, penyayang, peka akan kesejahteraan sesama makhluk hidup. Menolak keras menyakiti orang lain demi keuntungan sepihak.";
      descEn = "Warm-hearted, deeply empathic, sensitive to animal and human worries. Utterly rejects causing pain for personal progress.";
    }

    setPsyResult({
      totalPoints: scorePct,
      level,
      levelEn,
      title,
      titleEn,
      desc,
      descEn,
      date: new Date().toISOString()
    });

    setCurrentStep("result");
    setActiveTab("strengths");
    showToast(lang === "id" ? "Berdasarkan analisis fun, skor kepribadian anda terurai!" : "Your fun psychopath game score is processed!");
  };

  // Simulate payment upgrade checkout
  const handlePremiumUpgradeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userWaNumber.trim()) {
      showToast(lang === "id" ? "Masukkan nomor WhatsApp Anda untuk validasi" : "Please input your WhatsApp phone number");
      return;
    }

    const tId = "AURA-TX-" + Math.floor(Math.random() * 9000 + 1000);
    const checkoutPrice = lang === "id" ? 25000 : 5;
    const newTx: Transaction = {
      id: tId,
      userId: currentUser?.id || "user-cur",
      userName: currentUser?.name || profile.name || "Klien Guest",
      userEmail: currentUser?.emailOrPhone || "client@gmail.com",
      date: new Date().toISOString(),
      amount: checkoutPrice,
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
    const formattedAmount = formatAmount(tx.amount);
    const textMsg = lang === "id"
      ? `Halo Admin Aura. Saya baru saja melakukan pembayaran Premium Character Report.\n\n` + 
        `ID Pesanan: ${tx.id}\nNama: ${tx.userName}\nNomor WA: ${tx.whatsappNumber}\n` +
        `Metode: ${tx.paymentMethod}\nJumlah: ${formattedAmount}\nCatatan: ${tx.notes}\n\n` +
        `Mohon segera verifikasi transaksi saya!`
      : `Hello Aura Admin. I have made a transfer for Premium Character Report.\n\n` + 
        `Order ID: ${tx.id}\nName: ${tx.userName}\nPhone: ${tx.whatsappNumber}\n` +
        `Method: ${tx.paymentMethod}\nAmount: ${formattedAmount}\nNotes: ${tx.notes}\n\n` +
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

                {/* Test Selector Tabs */}
                <div className="mb-6 p-1 bg-slate-50 border border-slate-100/90 rounded-2xl grid grid-cols-3 gap-1 relative z-10">
                  <button
                    type="button"
                    onClick={() => setActiveTest("character")}
                    className={`py-3 px-1 rounded-xl text-[10px] sm:text-xs font-black transition-all flex flex-col items-center justify-center gap-1.5 ${
                      activeTest === "character"
                        ? "bg-indigo-600 text-white shadow-md shadow-indigo-150"
                        : "text-slate-600 hover:text-indigo-600 hover:bg-slate-105"
                    }`}
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>{lang === "id" ? "Aura Karakter" : "Aura Character"}</span>
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => setActiveTest("iq")}
                    className={`py-3 px-1 rounded-xl text-[10px] sm:text-xs font-black transition-all flex flex-col items-center justify-center gap-1.5 ${
                      activeTest === "iq"
                        ? "bg-indigo-600 text-white shadow-md shadow-indigo-150"
                        : "text-slate-600 hover:text-indigo-600 hover:bg-slate-105"
                    }`}
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>{lang === "id" ? "IQ Profesional" : "Professional IQ"}</span>
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => setActiveTest("psychopath")}
                    className={`py-3 px-1 rounded-xl text-[10px] sm:text-xs font-black transition-all flex flex-col items-center justify-center gap-1.5 ${
                      activeTest === "psychopath"
                        ? "bg-indigo-600 text-white shadow-md shadow-indigo-150"
                        : "text-slate-600 hover:text-indigo-600 hover:bg-slate-105"
                    }`}
                  >
                    <Activity className="w-4 h-4" />
                    <span>{lang === "id" ? "Fun Psikopat" : "Fun Psychopath"}</span>
                  </button>
                </div>

                {/* Test Description Card */}
                <div className="mb-6 p-4 rounded-2xl bg-indigo-50/50 border border-indigo-100/60 relative z-10 text-xs text-slate-600 leading-relaxed font-semibold">
                  {activeTest === "character" && (
                    <p>
                      {lang === "id" 
                        ? "🎨 Analisis karakter psikologis terpopuler berbasis 4 spektrum warna (Merah, Kuning, Biru, Putih) guna memetakan potensi finansial, proyeksi karir masa depan, hingga rahasia harmoni jodoh terbaik Anda."
                        : "🎨 Highly detailed character validation based on the 4 personality colors (Red, Yellow, Blue, White) mapping your emotional spikes, potential careers, and love match compatibility indices."}
                    </p>
                  )}
                  {activeTest === "iq" && (
                    <p>
                      {lang === "id" 
                        ? "🧠 Uji inteligensi kognitif (IQ) murni dengan 50 soal terstruktur meliputi: Penalaran Analitis & Spasial, Hubungan Verbal, Kuantitatif, serta Pola Logika bertaraf akademik internasional."
                        : "🧠 Standard cognitive intelligence assessment featuring 50 professional questions measuring your logical abstractions, quantitative reasoning, spatial modeling, and verbal associations."}
                    </p>
                  )}
                  {activeTest === "psychopath" && (
                    <p>
                      {lang === "id" 
                        ? "👾 10 Pertanyaan game skenario ekstrim untuk menimbang kadar rasionalitas independen versus kepedulian tulus hati nurani Anda. *Catatan: Tes ini bersifat rekreasional & hiburan sahaja, tidak menggambarkan diagnosis mental medis."
                        : "👾 10 interactive choice-driven roleplay story scenarios to weigh cold logical calculation margins versus organic human values. *Notice: This is purely recreational for entertainment purposes."}
                    </p>
                  )}
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
                {(() => {
                  const totalQuestions = activeTest === "character" ? questionsList.length : activeTest === "iq" ? iqQuestions.length : psyQuestions.length;
                  const currentNum = currentQuestionIdx + 1;
                  const progressPct = (currentNum / totalQuestions) * 100;
                  
                  let questionText = "";
                  if (activeTest === "character") {
                    const qObj = questionsList[currentQuestionIdx];
                    questionText = (questionStrings[lang] as any)[qObj.questionId];
                  } else if (activeTest === "iq") {
                    questionText = iqQuestions[currentQuestionIdx].q[lang];
                  } else {
                    questionText = psyQuestions[currentQuestionIdx].q[lang];
                  }

                  return (
                    <>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-2">
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-600 text-[10px] font-bold uppercase tracking-widest">
                            {activeTest === "character" ? (lang === "id" ? "TES WARNA AURA" : "AURA COLOR TEST") :
                             activeTest === "iq" ? (lang === "id" ? "TES IQ STRUKTUR" : "STRUCTURED IQ TEST") :
                             (lang === "id" ? "FUN GAME PSIKOPAT" : "CASUAL PSYCHOPATH TEST")}
                          </span>
                          <span className="text-xs font-extrabold text-slate-500">
                            {translations[lang].questionTitle} {currentNum} {translations[lang].outOf} {totalQuestions}
                          </span>
                        </div>
                        <div className="w-full sm:w-1/3 bg-slate-100 h-2.5 rounded-full overflow-hidden">
                          <div 
                            className="bg-indigo-600 h-full transition-all duration-300"
                            style={{ width: `${progressPct}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Question title */}
                      <div className="mb-8">
                        <h4 className="text-lg sm:text-xl font-bold leading-normal text-slate-800">
                          {questionText}
                        </h4>
                        {activeTest === "iq" && (
                          <div className="mt-2.5 inline-block px-3 py-1 bg-amber-50 text-amber-700 text-[10px] font-black uppercase rounded-lg tracking-wider border border-amber-100">
                            Kategori: {iqQuestions[currentQuestionIdx].category}
                          </div>
                        )}
                      </div>

                      {/* Answer option choices vertically laid out */}
                      <div className="space-y-4">
                        {activeTest === "character" && questionsList[currentQuestionIdx].options.map((opt, i) => {
                          const text = (questionStrings[lang] as any)[opt.textId];
                          const isSelected = answers[currentQuestionIdx] === opt.color;
                          
                          return (
                            <button
                              key={i}
                              onClick={() => handleAnswerSelect(opt.color)}
                              className={`w-full text-left p-4 rounded-2xl border transition-all duration-150 flex items-start gap-4 ${
                                isSelected 
                                  ? "bg-indigo-50 border-indigo-600 shadow-sm font-semibold" 
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
                                <p className="text-sm text-slate-700 leading-relaxed mt-0.5">{text}</p>
                              </div>
                            </button>
                          );
                        })}

                        {activeTest === "iq" && iqQuestions[currentQuestionIdx].options.map((opt, i) => {
                          const isSelected = iqAnswers[currentQuestionIdx] === opt.id;
                          return (
                            <button
                              key={i}
                              onClick={() => handleIqAnswerSelect(opt.id)}
                              className={`w-full text-left p-4 rounded-2xl border transition-all duration-150 flex items-start gap-4 ${
                                isSelected 
                                  ? "bg-indigo-50 border-indigo-600 shadow-sm font-semibold" 
                                  : "bg-slate-50/50 hover:bg-slate-50 border-slate-100 hover:border-slate-300"
                              }`}
                            >
                              <div className="w-8 h-8 rounded-full bg-slate-100 hover:bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xs shrink-0 transition-colors uppercase">
                                {opt.id}
                              </div>
                              <div className="flex-1">
                                <p className="text-sm text-slate-700 leading-relaxed mt-0.5">{opt.text[lang]}</p>
                              </div>
                            </button>
                          );
                        })}

                        {activeTest === "psychopath" && psyQuestions[currentQuestionIdx].options.map((opt, i) => {
                          const isSelected = psyAnswers[currentQuestionIdx] === opt.id;
                          return (
                            <button
                              key={i}
                              onClick={() => handlePsyAnswerSelect(opt.id)}
                              className={`w-full text-left p-4 rounded-2xl border transition-all duration-150 flex items-start gap-4 ${
                                isSelected 
                                  ? "bg-rose-50 border-rose-500 shadow-sm font-semibold" 
                                  : "bg-slate-50/50 hover:bg-slate-50 border-slate-100 hover:border-slate-300"
                              }`}
                            >
                              <div className="w-8 h-8 rounded-full bg-slate-100 hover:bg-rose-100 text-rose-600 flex items-center justify-center font-bold text-xs shrink-0 transition-colors uppercase">
                                {opt.id}
                              </div>
                              <div className="flex-1">
                                <p className="text-sm text-slate-700 leading-relaxed mt-0.5">{opt.text[lang]}</p>
                              </div>
                            </button>
                          );
                        })}
                      </div>

                      {/* Back / Next actions */}
                      <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setCurrentQuestionIdx(prev => Math.max(0, prev - 1))}
                            disabled={currentQuestionIdx === 0}
                            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-800 disabled:opacity-30 disabled:pointer-events-none"
                          >
                            <ChevronLeft className="w-4 h-4" />
                            <span>{translations[lang].btnPrev}</span>
                          </button>
                          
                          <button
                            onClick={() => {
                              setCurrentStep("profile");
                              setCurrentQuestionIdx(0);
                            }}
                            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-slate-400 hover:text-rose-500 transition-colors"
                          >
                            <span>{lang === "id" ? "Batal & Keluar" : "Cancel & Return"}</span>
                          </button>
                        </div>

                        {/* Submit Actions manually if needed */}
                        {(() => {
                          const isLastQuestion = currentQuestionIdx === totalQuestions - 1;
                          const answersFilled = 
                            activeTest === "character" ? (Object.keys(answers).length === totalQuestions) :
                            activeTest === "iq" ? (Object.keys(iqAnswers).length === totalQuestions) :
                            (Object.keys(psyAnswers).length === totalQuestions);
                          
                          const currentAnswerSelected = 
                            activeTest === "character" ? answers[currentQuestionIdx] !== undefined :
                            activeTest === "iq" ? iqAnswers[currentQuestionIdx] !== undefined :
                            psyAnswers[currentQuestionIdx] !== undefined;

                          if (answersFilled || isLastQuestion) {
                            return (
                              <button
                                onClick={() => {
                                  if (!currentAnswerSelected) {
                                    showToast(lang === "id" 
                                      ? "Silakan pilih salah satu jawaban terlebih dahulu" 
                                      : "Please select an option first");
                                    return;
                                  }
                                  if (activeTest === "character") {
                                    computeAnalysis();
                                  } else if (activeTest === "iq") {
                                    computeIqAnalysis();
                                  } else {
                                    computePsyAnalysis();
                                  }
                                }}
                                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold px-6 py-3.5 rounded-2xl shadow-lg transition-all uppercase text-xs animate-pulse"
                                id="btn-quiz-finish-submit"
                              >
                                <CheckCircle className="w-4 h-4" />
                                <span>{translations[lang].btnSubmit}</span>
                              </button>
                            );
                          }

                          return (
                            <span className="text-[11px] font-bold text-slate-400">
                              {lang === "id" ? "Pilih salah satu jawaban di atas" : "Choose an option above to progress"}
                            </span>
                          );
                        })()}
                      </div>
                    </>
                  );
                })()}
              </div>
            )}

            {/* Step 3: Analysis Results layout aligned with the "Vibrant Palette" theme */}
            {currentStep === "result" && (
              <div className="space-y-6">
                {/* Result Switcher tabs */}
                {(activeResult || iqResult || psyResult) && (
                  <div className="mb-6 p-1 bg-slate-50 border border-slate-100/90 rounded-2xl flex max-w-lg mx-auto gap-1 shadow-sm relative z-20">
                    {activeResult && (
                      <button 
                        onClick={() => { setActiveTest("character"); setActiveTab("strengths"); }}
                        className={`flex-1 py-2.5 rounded-xl text-[10px] sm:text-xs font-black transition-all text-center flex items-center justify-center gap-1 ${activeTest === "character" ? "bg-indigo-600 text-white shadow-md shadow-indigo-150" : "text-slate-600 hover:text-indigo-600 hover:bg-white"}`}
                      >
                        🎨 <span>{lang === "id" ? "Warna Aura" : "Aura Result"}</span>
                      </button>
                    )}
                    {iqResult && (
                      <button 
                        onClick={() => { setActiveTest("iq"); setActiveTab("strengths"); }}
                        className={`flex-1 py-2.5 rounded-xl text-[10px] sm:text-xs font-black transition-all text-center flex items-center justify-center gap-1 ${activeTest === "iq" ? "bg-indigo-600 text-white shadow-md shadow-indigo-150" : "text-slate-600 hover:text-indigo-600 hover:bg-white"}`}
                      >
                        🧠 <span>{lang === "id" ? "Hasil IQ" : "IQ Result"}</span>
                      </button>
                    )}
                    {psyResult && (
                      <button 
                        onClick={() => { setActiveTest("psychopath"); setActiveTab("strengths"); }}
                        className={`flex-1 py-2.5 rounded-xl text-[10px] sm:text-xs font-black transition-all text-center flex items-center justify-center gap-1 ${activeTest === "psychopath" ? "bg-indigo-600 text-white shadow-md shadow-indigo-150" : "text-slate-600 hover:text-indigo-600 hover:bg-white"}`}
                      >
                        💀 <span>{lang === "id" ? "Fun Psikopat" : "Psychopath"}</span>
                      </button>
                    )}
                  </div>
                )}

                {activeTest === "character" && activeResult && (
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
                        onClick={() => setActiveTab("premium-report")}
                        className={`px-4 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap flex items-center gap-1 ${
                          activeTab === "premium-report" ? "bg-purple-100 text-purple-700 font-extrabold" : "text-slate-500 hover:bg-purple-50"
                        }`}
                      >
                        {!isPremiumUser && <Lock className="w-3.5 h-3.5 text-purple-400 shrink-0" />}
                        <span>{translations[lang].reportTab}</span>
                      </button>
                      <button
                        onClick={() => setActiveTab("premium-match")}
                        className={`px-4 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap flex items-center gap-1 ${
                          activeTab === "premium-match" ? "bg-purple-100 text-purple-700 font-extrabold" : "text-slate-500 hover:bg-purple-50"
                        }`}
                      >
                        {!isPremiumUser && <Lock className="w-3.5 h-3.5 text-purple-400 shrink-0" />}
                        <span>{translations[lang].matchTab}</span>
                      </button>
                      <button
                        onClick={() => setActiveTab("premium-career-finance")}
                        className={`px-4 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap flex items-center gap-1 ${
                          activeTab === "premium-career-finance" ? "bg-purple-100 text-purple-700 font-extrabold" : "text-slate-500 hover:bg-purple-50"
                        }`}
                      >
                        {!isPremiumUser && <Lock className="w-3.5 h-3.5 text-purple-400 shrink-0" />}
                        <span>{translations[lang].careerProjTab}</span>
                      </button>
                      <button
                        onClick={() => setActiveTab("premium-consult")}
                        className={`px-4 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
                          activeTab === "premium-consult" ? "bg-purple-100 text-purple-700 font-extrabold" : "text-slate-500 hover:bg-purple-50"
                        }`}
                      >
                        {!isPremiumUser ? <Lock className="w-3.5 h-3.5 text-purple-400 shrink-0" /> : <Sparkles className="w-4 h-4 text-purple-600" />}
                        <span>{translations[lang].aiConsultTab}</span>
                      </button>
                      <button
                        onClick={() => setActiveTab("premium-cert")}
                        className={`px-4 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap flex items-center gap-1 ${
                          activeTab === "premium-cert" ? "bg-purple-100 text-purple-700 font-extrabold" : "text-slate-500 hover:bg-purple-50"
                        }`}
                      >
                        {!isPremiumUser && <Lock className="w-3.5 h-3.5 text-purple-400 shrink-0" />}
                        <span>{translations[lang].certTab}</span>
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

                      {activeTab === "premium-report" && (
                        <div className="space-y-4">
                          {!isPremiumUser ? (
                            renderPremiumTeaser(
                              translations[lang].premiumFeatures[0],
                              lang === "id"
                                ? "Ungkap analisis super mendalam setebal ratusan halaman seputar psikologi alam bawah sadar, motivasi tersembunyi, rintangan mental, dan rekayasa kepribadian Anda."
                                : "Unlock an elements-focused textbook detailed guide covering your subconscious traits, blocks, and core personal development strategy.",
                              <FileText className="w-8 h-8" />
                            )
                          ) : (
                            <div className="bg-slate-50 border border-slate-100 p-5 rounded-2xl">
                              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4 border-b border-indigo-100 pb-3">
                                <div>
                                  <span className="text-[10px] font-black tracking-widest text-indigo-600 uppercase block">E-BOOK PREMIUM STUDY GUIDE</span>
                                  <h4 className="font-extrabold text-sm text-slate-800">
                                    {lang === "id" ? "Laporan Karakter Eksklusif 112 Halaman" : "112-Page Complete Analytical Guide"}
                                  </h4>
                                </div>
                                <button
                                  onClick={handleTriggerPrint}
                                  className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold px-4 py-2 flex items-center gap-1.5 shadow"
                                >
                                  <Download className="w-3.5 h-3.5" />
                                  <span>{translations[lang].btnExportPdf}</span>
                                </button>
                              </div>

                              <div className="flex flex-col md:flex-row gap-5">
                                {/* Left column sidebar index */}
                                <div className="w-full md:w-[220px] flex flex-row md:flex-col gap-1 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0 shrink-0 border-b md:border-b-0 md:border-r border-indigo-100 pr-0 md:pr-4">
                                  {[1, 2, 3, 4, 5].map(ch => (
                                    <button
                                      key={ch}
                                      onClick={() => setReportActiveChapter(ch)}
                                      className={`px-3 py-2 text-left rounded-lg text-xs font-bold transition-all whitespace-nowrap md:whitespace-normal leading-tight ${
                                        reportActiveChapter === ch
                                          ? "bg-indigo-100 text-indigo-700"
                                          : "text-slate-500 hover:bg-slate-100"
                                      }`}
                                    >
                                      {ch === 1 ? (lang === "id" ? "Bab 1: Spektrum Teori Hartman" : "Ch 1: Hartman Theory Spectrum") :
                                       ch === 2 ? (lang === "id" ? `Bab 2: Energi Aura ${activeResult.dominantColor}` : `Ch 2: ${activeResult.dominantColor} Subconscious Energy`) :
                                       ch === 3 ? (lang === "id" ? "Bab 3: Sisi Gelap & Terang" : "Ch 3: The Shadow & Light Self") :
                                       ch === 4 ? (lang === "id" ? "Bab 4: Solusi Hambatan Mental" : "Ch 4: Solving Cognitive Blocks") :
                                       (lang === "id" ? "Bab 5: Peta Tumbuh Kembang" : "Ch 5: Holistic Growth Blueprint")}
                                    </button>
                                  ))}
                                </div>

                                {/* Reading panel content */}
                                <div className="flex-1 bg-white p-5 rounded-xl border border-indigo-50 leading-relaxed text-xs text-slate-600 font-medium max-h-[380px] overflow-y-auto font-sans shadow-inner selection:bg-indigo-100">
                                  {reportActiveChapter === 1 && (
                                    <div className="space-y-3">
                                      <h5 className="font-extrabold text-slate-800 text-sm border-b border-indigo-50 pb-1 uppercase tracking-wide">
                                        {lang === "id" ? "BAB I: Spektrum Kejiwaan & Landasan Teori Hartman" : "CHAPTER I: Scientific Foundations of the Hartman Color Code"}
                                      </h5>
                                      <p>
                                        {lang === "id"
                                          ? "Teori Kepribadian Hartman membagi spektrum motivasi dasar manusia menjadi empat koordinat warna primer yang memicu semua tindakan di dalam alam bawah sadar. Berbeda dari klasifikasi umum (MBTI atau Big Five), Hartman memfokuskan diagnosis pada 'MENGAPA' kita bertindak (Motivasi), bukan sekadar 'BAGAIMANA' kita bertindak."
                                          : "The Hartman Personality Profile partitions human motivations into four distinct core color coordinates. While traditional systems diagnose behavioral symptoms, our model explores the core 'WHY' behind sub-conscious actions."}
                                      </p>
                                      <p>
                                        {lang === "id"
                                          ? "Dengan menjejaki skor tes Anda, Anda memiliki paduan spektrum kualitatif yang unik: energi primer dan kecenderungan sekunder yang saling berbenturan atau bersinergi menciptakan kepribadian fungsional Anda saat ini."
                                          : "Through decoding your individual assessment parameters, a highly structured dynamic emerges detailing how your core color coordinates fuse with secondary color responses to shape your active self."}
                                      </p>
                                    </div>
                                  )}

                                  {reportActiveChapter === 2 && (
                                    <div className="space-y-3">
                                      <h5 className="font-extrabold text-slate-800 text-sm border-b border-indigo-50 pb-1 uppercase tracking-wide">
                                        {lang === "id" ? `BAB II: Eksplorasi Arus Frekuensi & Energi Aura ${translations[lang].colorDetails[activeResult.dominantColor].name.split("(")[0].trim()}` : `CHAPTER II: Sub-conscious Architecture of ${activeResult.dominantColor}`}
                                      </h5>
                                      <p>
                                        {activeResult.dominantColor === PersonalityColor.RED ? (
                                          lang === "id"
                                            ? "Sebagai dominan Merah, Anda didorong oleh hasrat terdalam untuk kekuasaan, efisiensi, kontrol, dan pencapaian instan. Frekuensi saraf Anda selalu terkalibrasi untuk memegang kemudi kemandirian. Anda didesain untuk mendepak ketidakpastian dan membangun kemapanan struktural secara mandiri."
                                            : "As a RED core, your primary neural motivator is Power—expressed through executive efficiency, control, and performance. You possess an innate biological urge to command uncertainty, drive boundaries, and secure results."
                                        ) : activeResult.dominantColor === PersonalityColor.YELLOW ? (
                                          lang === "id"
                                            ? "Sebagai dominan Kuning, Anda didorong oleh petualangan, optimisme sosial, kebebasan, dan pengekspresian diri tanpa batas. Jiwa Anda menolak kungkungan rutinitas kaku, selalu mencari esensi kesenangan duniawi yang dibagikan antarsesama."
                                            : "As a YELLOW core, you are biological wired toward Fun—expressed through social creativity, spontaneous playfulness, and pure freedom. Your system repels boring repetition, seeking interactive external stimulation."
                                        ) : activeResult.dominantColor === PersonalityColor.BLUE ? (
                                          lang === "id"
                                            ? "Sebagai dominan Biru, Anda dimotivasi oleh Kesetiaan, Kebenaran, Ketulusan Hubungan, dan Presisi Analitis. Jiwa Anda mencari koneksi emosional berkualitas tinggi, menuntut kejujuran maksimal, serta kehati-hatian sebelum melangkah bertindak."
                                            : "As a BLUE core, your entire system thrives on Connection and Intimacy—meaning loyalty, deep sincerity, conceptual order, and perfect precision. You analyze parameters thoroughly to ensure zero error."
                                        ) : (
                                          lang === "id"
                                            ? "Sebagai dominan Putih, Anda didorong oleh kedamaian batin, harmoni sosial, dan kestabilan bebas konflik. Anda menyukai situasi yang bersahabat, memiliki kesabaran tak bersyarat, serta mampu memediasi perselisihan dengan kepala dingin."
                                            : "As a WHITE core, your system is anchored completely in Peace—expressed through emotional tolerance, harmony, and absence of dispute. You have massive empathy reserve and quiet independent resilience."
                                        )}
                                      </p>
                                    </div>
                                  )}

                                  {reportActiveChapter === 3 && (
                                    <div className="space-y-3">
                                      <h5 className="font-extrabold text-slate-800 text-sm border-b border-indigo-50 pb-1 uppercase tracking-wide">
                                        {lang === "id" ? "BAB III: Polarisasi Karakter (Sisi Terang & Sisi Kegelapan)" : "CHAPTER III: Light & Shadow Attributes"}
                                      </h5>
                                      <p>
                                        {lang === "id"
                                          ? "Setiap individu menyimpan anugerah karunia (sisi terang) sekaligus bayang-bayang kegelapan (shadow self) yang teraktivasi saat Anda dalam kondisi stres tinggi atau kelelahan emosional."
                                          : "No personality exists in absolute homeostasis; under extreme pressure, stress constructs, or emotional burnout, your shadow aspects govern response."}
                                      </p>
                                      <p className="font-bold text-slate-700">
                                        {lang === "id" ? "🚨 Kerentanan Sistemik Anda:" : "🚨 Key Weakness Vulnerabilities:"}
                                      </p>
                                      <ul className="list-disc pl-4 space-y-1">
                                        {translations[lang].colorDetails[activeResult.dominantColor].weaknesses.map((wk, idx) => (
                                          <li key={idx}>{wk}</li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}

                                  {reportActiveChapter === 4 && (
                                    <div className="space-y-3">
                                      <h5 className="font-extrabold text-slate-800 text-sm border-b border-indigo-50 pb-1 uppercase tracking-wide">
                                        {lang === "id" ? "BAB IV: Tatalaksana Klinis & Solusi Hambatan Mental" : "CHAPTER IV: Healing Core Personal Cognitive Obstacles"}
                                      </h5>
                                      <p>
                                        {activeResult.dominantColor === PersonalityColor.RED ? (
                                          lang === "id"
                                            ? "TIPS SUKSES: Latihlah teknik pernapasan berkala sebelum merespons bawahan yang lambat. Sadarilah bahwa mendelegasikan tugas adalah kunci ekspansi bisnis Anda. Belajarlah mendengar kritik tertulis tanpa melibatkan defensif ego."
                                            : "SUCCESS TACTIC: Restructure your expectation matrix. Understand delegating isn't weakness; it is scaling power. Pause 4 seconds before reacting to unaligned speeds of team."
                                        ) : activeResult.dominantColor === PersonalityColor.YELLOW ? (
                                          lang === "id"
                                            ? "TIPS SUKSES: Gunakan sistem pemblokiran waktu harian (Time Blocking Pomodoro). Hindari mengambil komitmen ganda. Buat 'Daftar Larangan' (Not-To-Do List) agar kreativitas Anda memiliki pelindung disiplin."
                                            : "SUCCESS TACTIC: Enforce hard focus structures like the Pomodoro system. Limit concurrent projects to three. Establish strict fiscal checkpoints on dynamic desires."
                                        ) : activeResult.dominantColor === PersonalityColor.BLUE ? (
                                          lang === "id"
                                            ? "TIPS SUKSES: Kurangi overthinking dengan menerapkan prinsip 'Selesai Lebih Baik daripada Sempurna'. Sadari kecemasan Anda adalah bias kognitif proyeksi masa depan. Komunikasikan ganjalan hati secara verbal alih-alih pasif-agresif."
                                            : "SUCCESS TACTIC: Accept that 'done is healthier than perfect.' Challenge cognitive projections of catastrophe. Verbalize unsaid friction points directly to stay aligned."
                                        ) : (
                                          lang === "id"
                                            ? "TIPS SUKSES: Latihlah berkata 'TIDAK' pada permintaan yang melebihi kapasitas Anda. Mulailah berlatih mengambil inisiatif kepemimpinan dalam diskusi kelompok kecil. Kejar sasaran ambisius secara aktif."
                                            : "SUCCESS TACTIC: Intentionally select a personal boundary project. Say 'No' flatly to secondary invitations. Take active ownership of group goal formulations."
                                        )}
                                      </p>
                                    </div>
                                  )}

                                  {reportActiveChapter === 5 && (
                                    <div className="space-y-3">
                                      <h5 className="font-extrabold text-slate-800 text-sm border-b border-indigo-50 pb-1 uppercase tracking-wide">
                                        {lang === "id" ? "BAB V: Peta Jalan Transformasi Diri Jangka Panjang" : "CHAPTER V: 12-Month Holistic Self-Mastery Plan"}
                                      </h5>
                                      <p>
                                        {lang === "id"
                                          ? "Guna menghasilkan reformasi karakter yang andal, Anda wajib mengadopsi ritual pagi khusus. Buat evaluasi mingguan pada aspek emosi, keuangan, spiritual, dan fisik serta sesuaikan dengan aura pendukung Anda."
                                          : "To achieve permanent mental integration, you must install targeted micro-habits. Complete weekly journals evaluating emotional progress, savings rate, and assertiveness."}
                                      </p>
                                      <div className="bg-indigo-50/50 p-3 rounded-xl border border-indigo-100 text-[11px] font-bold text-indigo-800">
                                        {lang === "id"
                                          ? `Pesan Konsultan: Kepribadian dominan ${activeResult.dominantColor} Anda adalah anugerah terhebat. Jaga keseimbangan demi hidup seutuhnya.`
                                          : `Consultant's Note: Your core dominant color is your ultimate unique superpower. Manage your levels to avoid burning out your anchors.`}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {activeTab === "premium-match" && (
                        <div className="space-y-4">
                          {!isPremiumUser ? (
                            renderPremiumTeaser(
                              translations[lang].premiumFeatures[1],
                              lang === "id"
                                ? "Ketikkan nama pasangan atau gebetan untuk langsung memetakan kecocokan cinta, keselarasan emosi, hambatan komunikasi, dan taktik merajut keharmonisan klinis."
                                : "Check absolute energy alignments, dynamic communication sparks, core friction risks, and healing advice for your relationships.",
                              <Heart className="w-8 h-8 text-rose-500" />
                            )
                          ) : (
                            <div className="bg-rose-50/20 border border-rose-100 p-5 rounded-2xl">
                              <div className="border-b border-rose-100 pb-2 mb-4">
                                <span className="text-[10px] font-black tracking-widest text-rose-600 block uppercase">COUPLE ENERGY INTERLOCK SYSTEM</span>
                                <h4 className="font-extrabold text-sm text-slate-800">
                                  {lang === "id" ? "Analisis Kecocokan Jodoh & Pasangan" : "Love Match & Harmony Compatibility Analyzer"}
                                </h4>
                              </div>

                              {!matchResult ? (
                                <div className="space-y-4 max-w-md mx-auto py-4">
                                  <div className="space-y-1.5">
                                    <label className="text-[11px] font-bold text-slate-500 block">
                                      {lang === "id" ? "Nama Pasangan / Gebetan" : "Partner's Name / Crush"}
                                    </label>
                                    <input
                                      type="text"
                                      value={matchPartnerName}
                                      onChange={(e) => setMatchPartnerName(e.target.value)}
                                      placeholder="Contoh: Jessica, Ahmad..."
                                      className="w-full bg-white border border-slate-200 focus:border-rose-500 rounded-xl px-4 py-2.5 text-xs text-slate-800"
                                    />
                                  </div>

                                  <div className="space-y-1.5 block">
                                    <label className="text-[11px] font-bold text-slate-500 block">
                                      {lang === "id" ? "Aura Warna Pasangan (Estimasi)" : "Partner's Estimated Color Aura"}
                                    </label>
                                    <div className="grid grid-cols-2 gap-2 mt-1">
                                      {[
                                        { col: PersonalityColor.RED, label: lang === "id" ? "Merah (Dominan)" : "Red (Dominant)" },
                                        { col: PersonalityColor.YELLOW, label: lang === "id" ? "Kuning (Sosial)" : "Yellow (Social)" },
                                        { col: PersonalityColor.BLUE, label: lang === "id" ? "Biru (Analis)" : "Blue (Analytical)" },
                                        { col: PersonalityColor.WHITE, label: lang === "id" ? "Putih (Damai)" : "White (Peaceful)" }
                                      ].map(item => (
                                        <button
                                          key={item.col}
                                          type="button"
                                          onClick={() => setMatchPartnerColor(item.col)}
                                          className={`px-3 py-2.5 text-xs font-bold rounded-xl border transition-all text-left flex items-center gap-2 ${
                                            matchPartnerColor === item.col
                                              ? "bg-rose-50 border-rose-500 text-rose-700"
                                              : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                                          }`}
                                        >
                                          <span className={`w-3 h-3 rounded-full ${
                                            item.col === PersonalityColor.RED ? "bg-rose-500" :
                                            item.col === PersonalityColor.YELLOW ? "bg-amber-400" :
                                            item.col === PersonalityColor.BLUE ? "bg-blue-500" :
                                            "bg-slate-300 border border-slate-400"
                                          }`}></span>
                                          <span>{item.label}</span>
                                        </button>
                                      ))}
                                    </div>
                                  </div>

                                  <button
                                    onClick={() => {
                                      if (!matchPartnerName.trim()) {
                                        showToast(lang === "id" ? "Silakan ketik nama pasangan Anda" : "Please enter your partner name");
                                        return;
                                      }
                                      setMatchLoading(true);
                                      setTimeout(() => {
                                        const analysis = calculateCompatibility(activeResult.dominantColor, matchPartnerColor);
                                        setMatchResult({
                                          score: analysis.score,
                                          chemistry: analysis.chemistry,
                                          communication: analysis.communication,
                                          bond: analysis.bond,
                                          conflict: analysis.conflict,
                                          coachText: analysis.coachText
                                        });
                                        setMatchLoading(false);
                                      }, 800);
                                    }}
                                    disabled={matchLoading}
                                    className="w-full mt-2 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-extrabold text-xs px-5 py-3 rounded-xl hover:opacity-95 transition-all shadow-md active:scale-95 disabled:opacity-50 flex items-center justify-center gap-1.5 uppercase"
                                  >
                                    <Sparkles className="w-4 h-4 text-pink-200 shrink-0" />
                                    <span>{matchLoading ? (lang === "id" ? "MENGHITUNG DUA ENERGI..." : "SYNCING ENERGIES...") : (lang === "id" ? "Hitung Kecocokan Jodoh" : "Analyze Intimacy Chemistry")}</span>
                                  </button>
                                </div>
                              ) : (
                                <div className="space-y-4 py-1">
                                  <div className="flex flex-col md:flex-row items-center gap-6 bg-white p-5 rounded-2xl border border-rose-100">
                                    {/* Score donut visualizer */}
                                    <div className="relative shrink-0 w-28 h-28 rounded-full bg-gradient-to-br from-rose-200 to-pink-300 p-0.5 flex items-center justify-center shadow-lg shadow-rose-100/50">
                                      <div className="w-full h-full bg-white rounded-full flex flex-col items-center justify-center">
                                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-tight">Kelepasan</span>
                                        <span className="text-2xl font-black text-rose-600">{matchResult.score}%</span>
                                        <span className="text-[8px] font-extrabold text-slate-500 uppercase">MATCH</span>
                                      </div>
                                    </div>

                                    {/* Text summary info */}
                                    <div className="flex-1 space-y-2 text-center md:text-left">
                                      <div className="bg-rose-50 text-rose-700 text-[10px] font-extrabold px-3 py-1 rounded-full inline-block uppercase">
                                        {lang === "id" ? "Klasifikasi Relasi:" : "Union Pattern:"} {matchResult.chemistry}
                                      </div>
                                      <h5 className="font-extrabold text-slate-800 text-sm">
                                        {lang === "id" 
                                          ? `Analisis Kepribadian untuk ${activeResult.userProfile.name} & ${matchPartnerName}`
                                          : `Intimacy Mapping for ${activeResult.userProfile.name} & ${matchPartnerName}`}
                                      </h5>
                                      <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                                        {matchResult.coachText}
                                      </p>
                                    </div>
                                  </div>

                                  {/* Metric scores progress bars details */}
                                  <div className="grid grid-cols-2 gap-3 bg-white p-4 rounded-xl border border-rose-50">
                                    <div>
                                      <div className="flex justify-between text-[10px] font-bold text-slate-500 mb-1">
                                        <span>{lang === "id" ? "Komunikasi Teoritik" : "Communication Flow"}</span>
                                        <span className="text-indigo-600">{matchResult.communication}%</span>
                                      </div>
                                      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                        <div className="bg-indigo-505 h-full rounded-full" style={{ width: `${matchResult.communication}%` }}></div>
                                      </div>
                                    </div>

                                    <div>
                                      <div className="flex justify-between text-[10px] font-bold text-slate-500 mb-1">
                                        <span>{lang === "id" ? "Daya Tarik Kimiawi" : "Chemical Chemistry"}</span>
                                        <span className="text-rose-500">{matchResult.bond}%</span>
                                      </div>
                                      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                        <div className="bg-rose-500 h-full rounded-full" style={{ width: `${matchResult.bond}%` }}></div>
                                      </div>
                                    </div>

                                    <div>
                                      <div className="flex justify-between text-[10px] font-bold text-slate-500 mb-1">
                                        <span>{lang === "id" ? "Penyelarasan Finansial" : "Financial Trust"}</span>
                                        <span className="text-emerald-500">{matchResult.conflict}%</span>
                                      </div>
                                      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                        <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${matchResult.conflict}%` }}></div>
                                      </div>
                                    </div>

                                    <div>
                                      <div className="flex justify-between text-[10px] font-bold text-slate-500 mb-1">
                                        <span>{lang === "id" ? "Kestabilan Jangka Panjang" : "Long-Term Stability"}</span>
                                        <span className="text-amber-500">{matchResult.score + 3 > 100 ? 100 : matchResult.score + 3}%</span>
                                      </div>
                                      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                        <div className="bg-amber-500 h-full rounded-full" style={{ width: `${matchResult.score + 3 > 100 ? 100 : matchResult.score + 3}%` }}></div>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="flex justify-center">
                                    <button
                                      onClick={() => {
                                        setMatchPartnerName("");
                                        setMatchResult(null);
                                      }}
                                      className="text-xs font-bold text-rose-600 hover:text-rose-700 mt-2 hover:underline"
                                    >
                                      {lang === "id" ? "← Masukkan Nama Baru" : "← Try Another Match"}
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      )}

                      {activeTab === "premium-career-finance" && (
                        <div className="space-y-4">
                          {!isPremiumUser ? (
                            renderPremiumTeaser(
                              translations[lang].premiumFeatures[2],
                              lang === "id"
                                ? "Ungkap peta jalan karir pertahun (Tahun 1 s.d Tahun 5) serta visualisasi pembagian alokasi finansial (investasi, konsumsi, emergensi) khusus berdasarkan kelebihan tersembunyi kepribadian Anda."
                                : "Interactive year-by-year career path timeline coupled with a highly tailored financial spending formula that matches your specific attributes.",
                              <TrendingUp className="w-8 h-8 rounded text-indigo-600" />
                            )
                          ) : (
                            <div className="bg-indigo-50/20 border border-indigo-100 p-5 rounded-2xl">
                              <div className="border-b border-indigo-100 pb-2 mb-4">
                                <span className="text-[10px] font-black tracking-widest text-indigo-600 block uppercase">HOLISTIC WEALTH INTEGRATION SYSTEM</span>
                                <h4 className="font-extrabold text-sm text-slate-800">
                                  {lang === "id" ? "Proyeksi Karir 5 Tahun & Arsitektur Finansial" : "5-Year Career Projection & Financial Engine"}
                                </h4>
                              </div>

                              {/* Horizon Year Selector buttons */}
                              <div className="flex items-center justify-between gap-1 mb-4 bg-white/70 rounded-xl p-1.5 border border-indigo-50 overflow-x-auto no-scrollbar">
                                {[1, 2, 3, 4, 5].map(yr => (
                                  <button
                                    key={yr}
                                    onClick={() => setCareerActiveYear(yr)}
                                    className={`flex-1 px-2.5 py-1.5 rounded-lg text-xs font-black transition-all text-center whitespace-nowrap min-w-[70px] ${
                                      careerActiveYear === yr
                                        ? "bg-slate-900 text-white shadow-sm"
                                        : "text-slate-500 hover:bg-slate-100"
                                    }`}
                                  >
                                    {lang === "id" ? `Tahun ${yr}` : `Year ${yr}`}
                                  </button>
                                ))}
                              </div>

                              {/* Milestone roadmap card */}
                              <div className="bg-white p-4 rounded-xl border border-indigo-50 text-xs text-slate-600 font-medium space-y-2 mb-4">
                                <div className="flex items-center gap-1.5 text-indigo-600 mb-1">
                                  <Sparkles className="w-4 h-4 shrink-0" />
                                  <span className="font-black text-[10px] uppercase tracking-wider">
                                    {lang === "id" ? `Sasaran Utama Peningkatan Karir - Tahun ${careerActiveYear}` : `Major Career Target - Year ${careerActiveYear}`}
                                  </span>
                                </div>

                                <p className="font-bold text-slate-800 leading-snug">
                                  {activeResult.dominantColor === PersonalityColor.RED ? (
                                    careerActiveYear === 1 ? (lang === "id" ? "Peluncuran Divisi / Inisiatif Baru Mandiri" : "Initialize New Direct Sub-Division Division") :
                                    careerActiveYear === 2 ? (lang === "id" ? "Ekspansi Tim & Pembentukan Delegasi Tangguh" : "Team Expansion & Formal Delegation Infrastructure") :
                                    careerActiveYear === 3 ? (lang === "id" ? "Negosiasi Strategis & Kemitraan Skala Besar" : "Strategic Partnerships & High-ticket Acquisitions") :
                                    careerActiveYear === 4 ? (lang === "id" ? "Kenaikan Posisi C-level atau Peluncuran Bisnis Kedua" : "Board Directorship & Enterprise Portfolio Scaling") :
                                    (lang === "id" ? "Autonomi Operasional Penuh (Exit Strategy Awal)" : "Complete Operational Autonomy & Early Exit Strategy")
                                  ) : activeResult.dominantColor === PersonalityColor.YELLOW ? (
                                    careerActiveYear === 1 ? (lang === "id" ? "Pembangunan Brand Personal & Digital Footprint" : "Personal Branding & Digital Asset Building") :
                                    careerActiveYear === 2 ? (lang === "id" ? "Diversifikasi Konten & Networking Lintas Sektor" : "Content Diversification & Multi-sector Networking") :
                                    careerActiveYear === 3 ? (lang === "id" ? "Membentuk Agensi atau Konsultan Kreatif" : "Agency Formulation & Client Retainers Pipeline") :
                                    careerActiveYear === 4 ? (lang === "id" ? "Ekspansi Skala Pasar melalui Sistem Digital Otomatis" : "Market Amplification through Automated Systems") :
                                    (lang === "id" ? "Inspirasi Global (Pembicara Tamu / Investor Kreatif)" : "Global Advising, Keynotes & Angel Creative Investing")
                                  ) : activeResult.dominantColor === PersonalityColor.BLUE ? (
                                    careerActiveYear === 1 ? (lang === "id" ? "Optimalisasi Sertifikasi Keahlian Tingkat Tinggi" : "Niche Technical Certifications Mastery") :
                                    careerActiveYear === 2 ? (lang === "id" ? "Rancangan Standar Operasional & Arsitektur Mutu" : "Standard Operating Procedures & Quality Audit Setup") :
                                    careerActiveYear === 3 ? (lang === "id" ? "Manajemen Solusi Kompleks & Keamanan Sistem" : "Complex Systems Architecture & Senior Leadership") :
                                    careerActiveYear === 4 ? (lang === "id" ? "Direktorat Kepatuhan, Keuangan, atau Teknologi Utama" : "Directorship of QA, Compliance, or Technical Head") :
                                    (lang === "id" ? "Konsultan Independen Premium / Dewan Penasihat Ahli" : "Executive Advisor & Premium Private Security/SaaS Consultant")
                                  ) : (
                                    careerActiveYear === 1 ? (lang === "id" ? "Stabilisasi Posisi & Mediasi Hubungan Kerja" : "Establishing Stability & Corporate Mediation Hub") :
                                    careerActiveYear === 2 ? (lang === "id" ? "Inisiatif Mandiri pada Proyek Kolaborasi Lintas Tim" : "Proactive Ownership of Cross-functional Programs") :
                                    careerActiveYear === 3 ? (lang === "id" ? "Kepala Hubungan Eksekutif / Kepala HRD Organisasi" : "HR Director & Executive Harmony Coordinator") :
                                    careerActiveYear === 4 ? (lang === "id" ? "Evaluasi & Manajemen Efisiensi Operasional Umum" : "Chief Operations Officer of Harmony Foundations") :
                                    (lang === "id" ? "Direktur Dewan Mediasi / Pembimbing Spiritual Bisnis" : "Peace Advisory Director & Early Retirement Consolidation")
                                  )}
                                </p>

                                <p className="text-xs text-slate-500 leading-relaxed pt-2 border-t border-slate-100">
                                  {activeResult.dominantColor === PersonalityColor.RED ? (
                                    lang === "id" 
                                      ? "Fokus utama adalah menghindari kelelahan tim. Posisikan diri Anda sebagai arsitek visioner daripada mandor yang terus mendikte hal teknis kecil."
                                      : "Keep your micro-management impulses strictly suppressed. Build strong delegation rails and evaluate team based on output rather than hourly activity."
                                  ) : activeResult.dominantColor === PersonalityColor.YELLOW ? (
                                    lang === "id"
                                      ? "Bahaya konsistensi membayangi Anda. Pasang asisten administratif andal sesegera mungkin di Tahun Ke-2 untuk membereskan detail kontrak."
                                      : "Your focus risks decay through shiny-object symptoms. Partner with logical managers to lock downstream delivery contracts securely."
                                  ) : activeResult.dominantColor === PersonalityColor.BLUE ? (
                                    lang === "id"
                                      ? "Sifat perfeksionis Anda berisiko memicu overthinking berkepanjangan. Luncurkan program segera, perbaikan fungsional dilakukan seiring jalannya waktu."
                                      : "Mitigate analysis-paralysis. Launch products when they reach functional standard, fixing minor code blocks iteratively based on live user requests."
                                  ) : (
                                    lang === "id"
                                      ? "Bahaya kemanjaan zona nyaman. Ambil risiko terukur secara tegas. Mintalah porsi keuntungan atau shares atas mediasi sukses Anda."
                                      : "Do not hide behind agreeable shadows. Actively request pay amplifications or equity positions in programs you stabilize."
                                  )}
                                </p>
                              </div>

                              {/* Portfolio budgeting formulation visual charts */}
                              <div className="bg-white p-4 rounded-xl border border-indigo-50">
                                <div className="flex items-center gap-1.5 text-emerald-600 mb-1.5">
                                  <DollarSign className="w-4 h-4 shrink-0" />
                                  <span className="font-black text-[10px] uppercase tracking-wider">
                                    {lang === "id" ? "Rekomendasi Distribusi Finansial Berbasis Kepribadian" : "Personality-Based Financial Budget Architecture"}
                                  </span>
                                </div>

                                <div className="space-y-3 pt-1">
                                  {/* Consolidated horizontal stacked progress bar indicator */}
                                  <div className="h-6 w-full rounded-xl overflow-hidden flex text-[9px] font-black text-white text-center">
                                    <div className="bg-emerald-500 flex items-center justify-center transition-all" style={{ width: activeResult.dominantColor === PersonalityColor.RED ? "30%" : activeResult.dominantColor === PersonalityColor.YELLOW ? "15%" : activeResult.dominantColor === PersonalityColor.BLUE ? "35%" : "25%" }}>INV</div>
                                    <div className="bg-blue-500 flex items-center justify-center transition-all" style={{ width: activeResult.dominantColor === PersonalityColor.RED ? "40%" : activeResult.dominantColor === PersonalityColor.YELLOW ? "50%" : activeResult.dominantColor === PersonalityColor.BLUE ? "35%" : "45%" }}>EXP</div>
                                    <div className="bg-amber-500 flex items-center justify-center transition-all" style={{ width: activeResult.dominantColor === PersonalityColor.RED ? "15%" : activeResult.dominantColor === PersonalityColor.YELLOW ? "25%" : activeResult.dominantColor === PersonalityColor.BLUE ? "15%" : "15%" }}>DEV</div>
                                    <div className="bg-rose-500 flex items-center justify-center transition-all" style={{ width: "15%" }}>RES</div>
                                  </div>

                                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px] font-bold text-slate-500 mt-2">
                                    <div className="flex items-center gap-1.5">
                                      <span className="w-2.5 h-2.5 rounded bg-emerald-500"></span>
                                      <span>{lang === "id" ? "Investasi" : "Investment"}: {activeResult.dominantColor === PersonalityColor.RED ? "30%" : activeResult.dominantColor === PersonalityColor.YELLOW ? "15%" : activeResult.dominantColor === PersonalityColor.BLUE ? "35%" : "25%"}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                      <span className="w-2.5 h-2.5 rounded bg-blue-500"></span>
                                      <span>{lang === "id" ? "Belanja Dasar" : "Essential Exp"}: {activeResult.dominantColor === PersonalityColor.RED ? "40%" : activeResult.dominantColor === PersonalityColor.YELLOW ? "50%" : activeResult.dominantColor === PersonalityColor.BLUE ? "35%" : "45%"}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                      <span className="w-2.5 h-2.5 rounded bg-amber-500"></span>
                                      <span>{lang === "id" ? "Pengembangan Diri" : "Self Dev"}: {activeResult.dominantColor === PersonalityColor.RED ? "15%" : activeResult.dominantColor === PersonalityColor.YELLOW ? "25%" : activeResult.dominantColor === PersonalityColor.BLUE ? "15%" : "15%"}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                      <span className="w-2.5 h-2.5 rounded bg-rose-500"></span>
                                      <span>{lang === "id" ? "Cadangan Darurat" : "Emergency Reserve"}: 15%</span>
                                    </div>
                                  </div>

                                  <p className="text-[11px] text-slate-500 leading-relaxed mt-2 pt-2 border-t border-slate-100 font-semibold italic">
                                    {activeResult.dominantColor === PersonalityColor.RED ? (
                                      lang === "id"
                                        ? "Pendorong Merah didorong untuk memiliki porsi investasi agresif (saham/properti), namun pastikan cadangan darurat 15% terlindungi di kas likuid rendah-risiko demi likuiditas tak terduga."
                                        : "RED personality prefers aggressive growth portfolios (equities/realestate). Always shield a 15% liquid reserve to bypass immediate credit dependency under dry cycles."
                                    ) : activeResult.dominantColor === PersonalityColor.YELLOW ? (
                                      lang === "id"
                                        ? "Pendorong Kuning peka terhadap belanja impulsif emosional. Terapkan pemindahan saldo otomatis sebesar 15% ke investasi begitu dana cair, dan sisihkan 25% untuk edukasi/networking."
                                        : "YELLOW core suffers from impulsive lifestyle creep. Formulate strict, automated 15% auto-investments on payout to limit accessible spending buckets."
                                    ) : activeResult.dominantColor === PersonalityColor.BLUE ? (
                                      lang === "id"
                                        ? "Pendorong Biru menyukai keamanan maksimal. Porsi 35% investasi harus didelegasikan pada instrumen indeks berbiaya rendah (S&P500/reksadana obligasi) untuk mencegah stres pemantauan harian."
                                        : "BLUE core loves absolute risk mitigation. Channel your heavy 35% investment into low-cost global index trackers to eliminate daily manual market anxiety."
                                    ) : (
                                      lang === "id"
                                        ? "Pendorong Putih menyukai ketenangan. Porsi 25% investasi sebaiknya diarahkan pada obligasi pemerintah, deposito syariah, atau emas fisik yang stabil tanpa fluktuasi emosi berlebihan."
                                        : "WHITE core values absolute peaceful security. Direct your stable 25% investment share toward government-backed income indexes or gold to prevent stressful volatility."
                                    )}
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {activeTab === "premium-cert" && (
                        <div className="space-y-4">
                          {!isPremiumUser ? (
                            renderPremiumTeaser(
                              translations[lang].premiumFeatures[4],
                              lang === "id"
                                ? "Unduh sertifikat resmi kelulusan tes warna karakter Anda lengkap dengan serial nomor registrasi otentik, lencana hologram emas, dan tanda tangan dewan direksi."
                                : "Print or save your official digital certified Character Evaluation document complete with certification serial ID and gold emblems.",
                              <Award className="w-8 h-8 text-yellow-500" />
                            )
                          ) : (
                            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100/60 max-w-2xl mx-auto text-center font-sans">
                              {/* Glowing mockup cert frame */}
                              <div className="bg-indigo-950 p-6 sm:p-8 rounded-3xl border-4 border-amber-400 text-white relative overflow-hidden shadow-2xl space-y-4 shadow-indigo-200/50 print:bg-indigo-950 print:text-white print:p-8 text-center flex flex-col items-center justify-center">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl"></div>
                                <div className="absolute left-0 bottom-0 w-32 h-32 bg-amber-400/5 rounded-full blur-3xl"></div>

                                {/* Header Certificate design */}
                                <div className="space-y-1 mx-auto text-center flex flex-col items-center">
                                  <div className="flex justify-center mb-2">
                                    <Award className="w-12 h-12 text-amber-400" />
                                  </div>
                                  <h3 className="text-sm sm:text-lg font-black tracking-[0.2em] text-amber-300 uppercase text-center">
                                    {lang === "id" ? "SERTIFIKAT RESMI KARAKTER AURA" : "OFFICIAL CHARACTER CERTIFICATE"}
                                  </h3>
                                  <p className="text-[9px] text-slate-300 font-mono tracking-widest uppercase text-center block">
                                    REGISTRATION CODE: AUTH-AURA-{(activeResult.id || "res-000").split("-")[1] || "38491"}
                                  </p>
                                </div>

                                <div className="italic text-xs text-indigo-200 py-1 text-center font-serif">
                                  {lang === "id" ? "Dengan ini menyatakan bahwa rekan terdaftar:" : "This official certification verifies that:"}
                                </div>

                                {/* User's major name bold */}
                                <h2 className="text-xl sm:text-2xl font-black text-white underline decoration-amber-400 decoration-2 underline-offset-4 tracking-wide text-center">
                                  {activeResult.userProfile.name}
                                </h2>

                                <div className="max-w-md mx-auto text-center text-slate-300 text-[11px] leading-relaxed pt-2 font-medium">
                                  {lang === "id" ? (
                                    <>
                                      Telah berhasil menyelesaikan rangkaian evaluasi psikometris Spektrum Warna Kepribadian Hartman dengan formulasi dominasi berwarna <span className={`font-black ${activeResult.dominantColor === PersonalityColor.RED ? "text-rose-400" : activeResult.dominantColor === PersonalityColor.YELLOW ? "text-amber-300" : activeResult.dominantColor === PersonalityColor.BLUE ? "text-blue-300" : "text-white"}`}>{translations[lang].colorDetails[activeResult.dominantColor].name.split("(")[0].trim()}</span> ({activeResult.scores[0].percentage}% Aura). Pemilik sertifikat ini terbukti memiliki motivasi, ketahanan mental, serta potensi kepemimpinan sosial yang sah.
                                    </>
                                  ) : (
                                    <>
                                      Has successfully analyzed and authenticated their mental traits based on the scientific Hartman Personality evaluation, demonstrating a primary core of <span className={`font-black ${activeResult.dominantColor === PersonalityColor.RED ? "text-rose-400" : activeResult.dominantColor === PersonalityColor.YELLOW ? "text-amber-300" : activeResult.dominantColor === PersonalityColor.BLUE ? "text-blue-300" : "text-white"}`}>{activeResult.dominantColor}</span> ({activeResult.scores[0].percentage}% Intensity).
                                    </>
                                  )}
                                </div>

                                {/* Certification Badges Footers signature */}
                                <div className="pt-6 grid grid-cols-2 gap-4 border-t border-white/15 text-[9px] font-mono text-slate-400 w-full">
                                  <div className="text-center space-y-1">
                                    <p className="text-white font-serif italic text-xs">M. Ali Irkham</p>
                                    <p className="border-t border-slate-500/50 pt-1 tracking-wider uppercase">Hartman Lab Evaluator</p>
                                  </div>
                                  <div className="text-center space-y-1">
                                    <p className="text-white font-serif italic text-xs">Aura AI Psychologist Engine</p>
                                    <p className="border-t border-slate-500/50 pt-1 tracking-wider uppercase">AURA RESEARCH INSTITUTE</p>
                                  </div>
                                </div>
                              </div>

                              <button
                                onClick={handleTriggerPrint}
                                className="mt-4 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-5 py-2.5 rounded-xl flex items-center gap-1.5 mx-auto shadow transition-all active:scale-95"
                              >
                                <Download className="w-4 h-4 text-amber-400" />
                                <span>{lang === "id" ? "Simpan / Cetak Sertifikat Resmi" : "Save / Print Official Certificate"}</span>
                              </button>
                            </div>
                          )}
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
                            ID: {activeOrderPending.id} • {lang === "id" ? "Laporan Jodoh & Karir 100+ Hlm" : "100+ Pgs Relationship & Career Report"} • {formatAmount(activeOrderPending.amount)}
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

                {/* activeTest === 'iq' Results Panel */}
                {activeTest === "iq" && iqResult && (
                  <div className="grid grid-cols-12 gap-6" id="dashboard-results-iq-panel">
                    {/* Left Column containing scores and certificates */}
                    <div className="col-span-12 xl:col-span-8 space-y-6">
                      {/* Major Header IQ Card */}
                      <section className="bg-white rounded-[32px] p-6 sm:p-8 shadow-md border border-slate-100/40 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
                        <div className="absolute -right-10 -top-10 w-48 h-48 bg-blue-50 rounded-full blur-3xl opacity-60"></div>
                        <div className="absolute -left-10 -bottom-10 w-56 h-56 bg-indigo-50 rounded-full blur-3xl opacity-60"></div>

                        {/* IQ Donut/Circular Gauge */}
                        <div className="relative shrink-0 flex items-center justify-center">
                          <div className="w-52 h-52 sm:w-56 sm:h-56 rounded-full bg-gradient-to-br from-indigo-200 via-indigo-600 to-purple-400 p-1.5 flex items-center justify-center shadow-xl shadow-indigo-100">
                            <div className="w-full h-full bg-white rounded-full flex flex-col items-center justify-center relative overflow-hidden">
                              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                ESTIMASI SKOR IQ
                              </span>
                              <span className="text-5xl font-black mt-2 text-indigo-700">
                                {iqResult.score}
                              </span>
                              <span className="text-[10px] font-bold tracking-wider text-indigo-500 uppercase mt-2 text-center max-w-[150px]">
                                {lang === "id" ? iqResult.level : iqResult.levelEn}
                              </span>
                            </div>
                          </div>
                          
                          {/* IQ Status Icon badge over absolute position */}
                          <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 text-[10px] font-black px-3.5 py-1.5 rounded-full shadow-lg border-2 border-white uppercase">
                            GENIUS SCALE
                          </div>
                        </div>

                        {/* Right informational description and share keys */}
                        <div className="flex-1 relative z-10 space-y-4">
                          <div>
                            <span className="px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-600 text-[9px] font-bold uppercase tracking-widest">
                              STANDAR KOGNITIF AKADEMIK
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-black leading-tight text-slate-900 mt-2">
                              {lang === "id" ? "Estimasi IQ Anda: " : "Estimated Cognitive IQ: "}
                              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                                {iqResult.score} ({lang === "id" ? "Sangat Unggul" : "Very Superior"})
                              </span>
                            </h2>
                            <p className="text-slate-500 font-medium text-xs sm:text-sm italic mt-1.5">
                              {lang === "id" 
                                ? "“Struktur pemikiran analitis tajam, pola asimilasi data cepat, dan kapabilitas problem solving berpresisi tinggi.”"
                                : "“Highly structured analytical abstract reasoning, rapid data schema digestion, and precise solving speed.”"}
                            </p>
                          </div>

                          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                            {lang === "id" 
                              ? "Anda menunjukkan kapasitas pemikiran kognitif di atas rata-rata populasi dunia. Anda sangat piawai mengabstraksikan korelasi logis spasial rumit, mendeteksi inkonsistensi pola numerik tak kasat mata, serta merumuskan konklusi verbal taktis secara kilat."
                              : "You demonstrate excellent fluid cognitive potential far above standard global benchmarks. Highly proficient in structuring abstract logical relationships, synthesizing mathematical sequence layers, and mapping semantic contexts."}
                          </p>

                          <div className="flex flex-wrap gap-2.5 pt-2">
                            <button 
                              onClick={handleShareResultCopy}
                              className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-full text-xs font-bold flex items-center gap-2 transition-all hover:scale-[1.02] active:scale-95"
                            >
                              <Share2 className="w-4 h-4" />
                              <span>{copyAck ? (lang === "id" ? "Disalin!" : "Copied!") : (lang === "id" ? "Salin Laporan IQ" : "Share IQ Score")}</span>
                            </button>

                            <button 
                              onClick={handleTriggerPrint}
                              className="border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 px-5 py-2.5 rounded-full text-xs font-bold flex items-center gap-2 transition-all"
                            >
                              <Download className="w-4 h-4 text-indigo-500" />
                              <span>{lang === "id" ? "Ekspor Laporan PDF" : "Export PDF Portfolio"}</span>
                            </button>
                          </div>
                        </div>
                      </section>

                      {/* Bento grid showing 4 IQ Subscore metrics */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="bg-white p-5 rounded-3xl shadow-sm border border-indigo-50/50">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                              🧠 {lang === "id" ? "Penalaran Logis (Logical)" : "Logical Reasoning"}
                            </span>
                            <span className="text-xs font-black text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
                              {iqResult.subScores.logical} / 13
                            </span>
                          </div>
                          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                            <div className="bg-indigo-600 h-full transition-all duration-300" style={{ width: `${(iqResult.subScores.logical / 13) * 100}%` }}></div>
                          </div>
                          <p className="text-[10px] text-slate-400 mt-2 font-semibold">Mengukur pemecahan masalah teoritis abstrak dan induktif.</p>
                        </div>

                        <div className="bg-white p-5 rounded-3xl shadow-sm border border-indigo-50/50">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                              📐 {lang === "id" ? "Orientasi Spasial (Spatial)" : "Spatial Relations"}
                            </span>
                            <span className="text-xs font-black text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
                              {iqResult.subScores.spatial} / 12
                            </span>
                          </div>
                          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                            <div className="bg-indigo-600 h-full transition-all duration-300" style={{ width: `${(iqResult.subScores.spatial / 12) * 100}%` }}></div>
                          </div>
                          <p className="text-[10px] text-slate-400 mt-2 font-semibold font-sans">Mengabstraksi ruang dimensi, visualisasi bentuk, dan rekonstruksi 3D.</p>
                        </div>

                        <div className="bg-white p-5 rounded-3xl shadow-sm border border-indigo-50/50">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                              📚 {lang === "id" ? "Pemahaman Verbal (Verbal)" : "Verbal Aptitude"}
                            </span>
                            <span className="text-xs font-black text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
                              {iqResult.subScores.verbal} / 12
                            </span>
                          </div>
                          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                            <div className="bg-indigo-600 h-full transition-all duration-300" style={{ width: `${(iqResult.subScores.verbal / 12) * 100}%` }}></div>
                          </div>
                          <p className="text-[10px] text-slate-400 mt-2 font-semibold font-sans">Menguji analisis diksi korelasi kata, analogi, dan sinonim-antonim jeli.</p>
                        </div>

                        <div className="bg-white p-5 rounded-3xl shadow-sm border border-indigo-50/50">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                              🔢 {lang === "id" ? "Kuantitatif/Numerik (Numerical)" : "Numerical Sequence"}
                            </span>
                            <span className="text-xs font-black text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
                              {iqResult.subScores.numerical} / 13
                            </span>
                          </div>
                          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                            <div className="bg-indigo-600 h-full transition-all duration-300" style={{ width: `${(iqResult.subScores.numerical / 13) * 100}%` }}></div>
                          </div>
                          <p className="text-[10px] text-slate-400 mt-2 font-semibold">Menguji logika deret matematika berkelanjutan serta asimilasi kalkulasi numerik cepat.</p>
                        </div>
                      </div>

                      {/* Detail Intelligence Tabs switcher inside results layout */}
                      <div className="bg-white rounded-3xl p-6 shadow-sm border border-indigo-50">
                        <div className="flex border-b border-slate-100 overflow-x-auto pb-1 mb-4 gap-1 no-scrollbar">
                          <button
                            onClick={() => setActiveTab("strengths")}
                            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap ${
                              activeTab === "strengths" ? "bg-indigo-50 text-indigo-600" : "text-slate-500 hover:bg-slate-50"
                            }`}
                          >
                            {lang === "id" ? "Kekuatan Kognitif" : "Cognitive Strengths"}
                          </button>
                          
                          <button
                            onClick={() => setActiveTab("weakness")}
                            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap ${
                              activeTab === "weakness" ? "bg-indigo-50 text-indigo-600" : "text-slate-500 hover:bg-slate-50"
                            }`}
                          >
                            {lang === "id" ? "Sektor Butuh Asah" : "Growth Segments"}
                          </button>

                          <button
                            onClick={() => setActiveTab("premium-career-finance")}
                            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap flex items-center gap-1 ${
                              activeTab === "premium-career-finance" ? "bg-purple-100 text-purple-700 font-extrabold" : "text-slate-500 hover:bg-purple-50"
                            }`}
                          >
                            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                            <span>{lang === "id" ? "Karir & Finansial IQ" : "IQ Career Strategy"}</span>
                          </button>

                          <button
                            onClick={() => setActiveTab("premium-cert")}
                            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap flex items-center gap-1 ${
                              activeTab === "premium-cert" ? "bg-amber-50 text-amber-700 font-extrabold border border-amber-100" : "text-slate-500 hover:bg-amber-50"
                            }`}
                          >
                            <Award className="w-3.5 h-3.5 text-amber-500" />
                            <span>{lang === "id" ? "Sertifikat IQ Resmi" : "Official IQ Credentials"}</span>
                          </button>
                        </div>

                        {/* Rendering core tab view with Premium Protection */}
                        <div className="mt-4">
                          {activeTab === "strengths" && (
                            <div className="space-y-4">
                              <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider">{lang === "id" ? "ANALISIS PRESTASI KOGNITIF" : "COGNITIVE MASTERIES ANALYSIS"}</h4>
                              <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                                {lang === "id"
                                  ? "Anda memiliki kapasitas asimilasi pola logis di atas 92% populasi dunia. Anda sangat piawai mengidentifikasi problem solver teoretis rumit, mendesain hipotesis korelasi, serta menyembuhkan inefisiensi sistemik dengan kepekaan visual spasial yang luar biasa tajam."
                                  : "You possess structured cognitive patterns matching top global brackets. Your strengths include highly robust system structuring, spotting microscopic formula errors, and mapping complex dimensional objects with absolute ease."}
                              </p>
                              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                                <div>
                                  <p className="text-xs font-bold text-emerald-800">{lang === "id" ? "Akurasi Logis Ekstrim" : "Extreme Logical Accuracy"}</p>
                                  <p className="text-[11px] text-emerald-700 mt-1 font-semibold">{lang === "id" ? "Keunggulan menguraikan data bercabang besar menjadi simpulan logis solid." : "Superb capabilities in converting massive branched elements into precise analytical summaries."}</p>
                                </div>
                              </div>
                            </div>
                          )}

                          {activeTab === "weakness" && (
                            <div className="space-y-4">
                              <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider">{lang === "id" ? "STRATEGI MENGASAH SEKTOR KOGNITIF" : "COGNITIVE REFINEMENT ROADMAP"}</h4>
                              <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                                {lang === "id"
                                  ? "Meskipun kecerdasan fluid Anda luar biasa tajam, Anda kadang-kadang terjebak dalam kecenderungan 'over-thinking' atau menganalisis terlalu berlebih (analysis paralysis). Sektor kognitif verbal Anda juga membutuhkan pengayaan perbendaharaan diksi akademik sesekali agar komunikasi logis Anda tersampaikan secara sederhana namun berdampak magnetik."
                                  : "Despite stellar abstract scores, you occasional run into high cognitive friction like analysis paralysis. Refining direct pragmatic communication lines helps convert your complex mental plans into immediate team actions without cognitive noise."}
                              </p>
                            </div>
                          )}

                          {activeTab === "premium-career-finance" && (
                            isPremiumUser ? (
                              <div className="space-y-4">
                                <h4 className="text-sm font-bold text-indigo-950 uppercase tracking-wider flex items-center gap-1.5 font-sans">
                                  <Briefcase className="w-4 h-4 text-indigo-600" />
                                  <span>{lang === "id" ? "PROYEKSI EMAS KARIR & SOLUSI FINANSIAL IQ" : "HIGH-COGNITION CAREER BLUEPRINT & FINANCIALS"}</span>
                                </h4>
                                <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                                  {lang === "id"
                                    ? "IQ tinggi di rentang 120-138 sangat pas mengepalai industri sistemik rumit tingkat lanjut. Berikut adalah beberapa sektor karir berbayar tertinggi yang menyelaraskan bakat kognitif luar biasa Anda:"
                                    : "High IQ scores between 120-138 are naturally primed to command systems architecture and deep strategic modeling. Standard high-paying corporate matching includes:"}
                                </p>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                                  <div className="p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100 flex items-start gap-3">
                                    <TrendingUp className="w-5 h-5 text-indigo-600 shrink-0 mt-1" />
                                    <div>
                                      <p className="text-xs font-bold text-slate-800">{lang === "id" ? "Insinyur Kecerdasan Buatan (AI Specialist)" : "Artificial Intelligence Specialist"}</p>
                                      <p className="text-[10px] text-slate-500 font-semibold mt-1 font-sans">{lang === "id" ? "Fokus memetakan bobot pola algoritma jaringan syaraf tiruan matematis." : "Focuses on deep mathematical models and dense semantic neural network nodes."}</p>
                                      <span className="text-[10px] font-black text-indigo-600 bg-indigo-100 px-2 py-0.5 rounded mt-2 inline-block">Est: Rp 35jt - Rp 90jt/bln</span>
                                    </div>
                                  </div>

                                  <div className="p-4 bg-purple-50/50 rounded-2xl border border-purple-100 flex items-start gap-3">
                                    <DollarSign className="w-5 h-5 text-purple-600 shrink-0 mt-1" />
                                    <div>
                                      <p className="text-xs font-bold text-slate-800">{lang === "id" ? "Analis Finansial Kuantitatif (Quant Analyst)" : "Quantitative Analyst"}</p>
                                      <p className="text-[10px] text-slate-500 font-semibold mt-1">{lang === "id" ? "Trading algoritma kuantitatif berbasis tren rasi ekonomi logis spasial." : "Formulating programmatic trade calculations based on mathematical probability arrays."}</p>
                                      <span className="text-[10px] font-black text-purple-600 bg-purple-100 px-2 py-0.5 rounded mt-2 inline-block">Est: Rp 45jt - Rp 120jt/bln</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              renderPremiumTeaser(
                                lang === "id" ? "Buka Proyeksi Karir Finansial Karakter Premium" : "Unlock High-Cognition Career & Salary Blueprint",
                                lang === "id" 
                                  ? "Peta proyeksi karir berpenghasilan tertinggi nasional & internasional khusus orang ber-IQ unggul lengkap dengan kalkulator finansial masa depan Anda."
                                  : "Identify customized, ultra-high-paying roles globally aligned with your high intellectual index. Complete with future financial estimators.",
                                <Briefcase className="w-8 h-8 text-purple-600" />
                              )
                            )
                          )}

                          {activeTab === "premium-cert" && (
                            isPremiumUser ? (
                              <div className="space-y-4">
                                <h4 className="text-sm font-bold text-amber-950 uppercase tracking-widest flex items-center gap-1">
                                  <Award className="w-4 h-4 text-amber-600 animate-pulse" />
                                  <span>{lang === "id" ? "SERTIFIKAT KOGNITIF DIGITAL RESMI" : "OFFITAL DIGITAL COGNITIVE CREDENTIAL"}</span>
                                </h4>
                                <p className="text-xs text-slate-500">
                                  {lang === "id"
                                    ? "Berikut sertifikat resmi digital terdaftar Anda. Anda dapat menyematkan sertifikat tervalidasi ini pada profil LinkedIn, CV, Portofolio lamaran kerja Anda."
                                    : "Below is your validated official intelligence certification. You can share this credential link in LinkedIn, Resume portfolios, and corporate job applications."}
                                </p>

                                {/* Golden elegant IQ Certificate frame centered beautifully */}
                                <div className="p-8 bg-amber-50/50 border-4 border-amber-200 rounded-[32px] text-center relative overflow-hidden shadow-inner max-w-xl mx-auto font-serif">
                                  <div className="absolute top-0 right-0 w-32 h-32 bg-amber-100 rounded-full blur-2xl opacity-40"></div>
                                  <div className="absolute -left-10 -bottom-10 w-24 h-24 bg-indigo-100 rounded-full blur-2xl opacity-30"></div>

                                  <span className="text-[10px] font-sans font-black uppercase text-amber-600 tracking-widest block mb-1">
                                    CERTIFICATE OF COGNITIVE ACHIEVEMENT
                                  </span>
                                  <div className="w-12 h-1 bg-amber-400 mx-auto mb-6"></div>

                                  <p className="text-slate-500 text-[11px] italic mb-3">Sertifikat ini secara resmi diberikan kepada:</p>
                                  <h5 className="font-extrabold text-slate-800 text-xl tracking-tight mb-2 uppercase">{profile.name || "Klien Premium"}</h5>
                                  <p className="text-slate-400 text-[10px] italic max-w-md mx-auto line-clamp-2">
                                    {lang === "id"
                                      ? "Telah sukses menjalani rangkaian Asesmen IQ Struktur Profesional 50 Soal Akademis Internasional dan divalidasi memiliki kecerdasan fluid di atas rata-rata global."
                                      : "Has successfully completed the Professional Structured Academic Intelligence Assessment of 50 comprehensive segments and validated with superior fluid scores."}
                                  </p>

                                  <div className="my-8 py-4 bg-white/75 rounded-2xl border border-amber-100 flex justify-around items-center font-sans">
                                    <div>
                                      <p className="text-[9px] font-bold text-slate-400 tracking-widest uppercase">ESTIMATION SCORE</p>
                                      <p className="text-2xl font-black text-amber-600">{iqResult.score} IQ</p>
                                    </div>
                                    <div className="w-px h-10 bg-amber-100"></div>
                                    <div>
                                      <p className="text-[9px] font-bold text-slate-400 tracking-widest uppercase">CLASSIFICATION</p>
                                      <p className="text-[11px] text-slate-800 uppercase font-semibold">{lang === "id" ? "Sangat Unggul" : "Very Superior"}</p>
                                    </div>
                                  </div>

                                  <div className="flex justify-between items-center px-4">
                                    <div className="text-left font-sans">
                                      <p className="text-[8px] font-semibold text-slate-400">CREDENTIAL ID</p>
                                      <p className="text-[9px] font-black text-indigo-600">IQ-ID-8849-DF9</p>
                                    </div>
                                    <div className="text-center font-sans">
                                      <div className="w-10 h-10 bg-indigo-50 border border-indigo-100 mx-auto rounded-full flex items-center justify-center text-indigo-600 font-bold text-[8px] shadow-sm tracking-tighter">
                                        STAMP
                                      </div>
                                    </div>
                                    <div className="text-right font-sans">
                                      <p className="text-[8px] font-semibold text-slate-400">DATE ISSUED</p>
                                      <p className="text-[9px] font-bold text-slate-800">{new Date(iqResult.date).toLocaleDateString()}</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              renderPremiumTeaser(
                                lang === "id" ? "Buka Sertifikat Karakter Digital Resmi" : "Unlock Official Digital IQ Certificate",
                                lang === "id" 
                                  ? "Unduh sertifikat berkredensial formal khusus dengan verifikasi ID serial unik, stempel tanda tangan formal guna meningkatkan daya pikat CV profesional Anda."
                                  : "Receive your gorgeous formal certification with verified ID code and digital signature. Ready to print, share and embed in LinkedIn or CV.",
                                <Award className="w-8 h-8 text-amber-500" />
                              )
                            )
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Right column containing secondary action widgets */}
                    <div className="col-span-12 xl:col-span-4 space-y-6">
                      {/* Premium AI Consult for IQ test */}
                      <div className="bg-gradient-to-tr from-indigo-900 to-indigo-950 text-white rounded-[32px] p-6 shadow-xl border border-indigo-950/80 relative overflow-hidden text-left">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-800 rounded-full blur-2xl opacity-40 animate-pulse"></div>
                        <h4 className="font-extrabold text-base mb-1.5 flex items-center gap-1.5">
                          <Sparkles className="w-4 h-4 text-yellow-300 shrink-0 animate-spin" />
                          <span>AI Coach IQ Advisor</span>
                        </h4>
                        <p className="text-xs text-indigo-200/90 leading-relaxed">
                          {lang === "id" 
                            ? "Konsultasikan langsung hasil IQ Anda bersama Chatbot Psikolog AI Tanpa Batas kami. Dapatkan rekomendasi peningkatan fluid kearifan adaptif!"
                            : "Consult your cognitive results with our live AI Therapist widget. Obtain custom logic learning strategies tailored exclusively to you."}
                        </p>

                        <div className="mt-4 p-4 rounded-2xl bg-indigo-950 border border-indigo-800/65">
                          <span className="text-[9px] font-black text-indigo-400 block tracking-wider uppercase">AI CONSULT INTERACTIVE</span>
                          <p className="text-xs font-semibold text-slate-350 mt-2 leading-relaxed italic">
                            {lang === "id" 
                              ? "“Halo! Skor IQ Anda " + iqResult.score + " berada di peringkat teratas 2% populasi dunia. Sektor kognitif analitis Anda sangat luar biasa! Bagian mana dari tantangan verbal & logika spasial tadi yang paling menantang bagi Anda?”"
                              : "“Hello! Your intelligence index " + iqResult.score + " is remarkably high! Your abstract logic pathways are perfectly optimized. Ask me anything on career development paths...”"}
                          </p>
                        </div>

                        {!isPremiumUser && (
                          <div className="absolute inset-0 bg-slate-950/75 backdrop-blur-sm flex flex-col justify-center items-center p-4 text-center">
                            <Lock className="w-8 h-8 text-yellow-300 animate-bounce mb-2" />
                            <p className="text-xs text-white font-bold">{lang === "id" ? "Chat Psikolog AI Terkunci" : "AI Psychologist Assistant Locked"}</p>
                            <p className="text-[10px] text-slate-300 max-w-xs mt-1 leading-normal font-medium">{lang === "id" ? "Buka premium untuk mendapatkan konsultasi chat interaktif tanpa batas." : "Purchase premium unlocks unlimited chat advisor capabilities."}</p>
                            <button
                              onClick={() => setShowPremiumModal(true)}
                              className="mt-3 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-[10px] px-4 py-2 rounded-xl transition-all"
                            >
                              UPGRADE TO PREMIUM
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Small History timeline lists */}
                      <div className="bg-white rounded-[32px] p-6 shadow-sm border border-indigo-50 text-left">
                        <h5 className="font-black text-slate-800 uppercase text-xs tracking-widest mb-4">
                          IQ TEST STATS BLUEPRINT
                        </h5>
                        <div className="space-y-3.5">
                          <div className="flex justify-between items-center text-xs">
                            <span className="text-slate-500 font-medium">{lang === "id" ? "Tanggal Tes:" : "Date Evaluated:"}</span>
                            <span className="text-slate-800 font-black">{new Date(iqResult.date).toLocaleDateString()}</span>
                          </div>
                          <div className="flex justify-between items-center text-xs">
                            <span className="text-slate-500 font-medium">{lang === "id" ? "Jumlah Jawaban:" : "Questions Answered:"}</span>
                            <span className="text-slate-800 font-black">50 / 50</span>
                          </div>
                          <div className="flex justify-between items-center text-xs">
                            <span className="text-slate-500 font-medium">{lang === "id" ? "Akurasi Jawaban:" : "Scoring Precision:"}</span>
                            <span className="text-emerald-600 font-black">
                              {Math.round(((iqResult.subScores.logical + iqResult.subScores.verbal + iqResult.subScores.spatial + iqResult.subScores.numerical) / 50) * 100)}%
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* activeTest === 'psychopath' Results Panel */}
                {activeTest === "psychopath" && psyResult && (
                  <div className="grid grid-cols-12 gap-6" id="dashboard-results-psy-panel">
                    {/* Dark/Charcoal style layout container fitting psychopath theme beautifully */}
                    <div className="col-span-12 xl:col-span-8 space-y-6">
                      
                      {/* Highly responsive Entertainment Purpose Disclaimer */}
                      <div className="bg-amber-50 border border-amber-250 p-4 rounded-3xl text-amber-900 text-xs leading-relaxed flex items-start gap-3 relative z-10 text-left">
                        <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                        <div>
                          <p className="font-black text-amber-950 uppercase tracking-widest text-[11px] mb-1">
                            {lang === "id" ? "⚠️ PERNYATAAN HIBURAN PENTING (DISCLAIMER)" : "⚠️ CASUAL ENTERTAINMENT DISCLAIMER"}
                          </p>
                          <p className="text-[10px] sm:text-xs text-amber-900 font-semibold leading-relaxed">
                            {lang === "id"
                              ? "Tes ini didesain dan disusun semata-mata untuk sarana hiburan rekreasi ringan, keseruan bermain peran cerita populer, dan interaksi sosial. Angka persentase dan label karakter di bawah tidak bersifat klinis diagnosis kesehatan, kejiwaan atau penentuan kondisi mental psikiatrik sesungguhnya Anda. Jika Anda mengalami kendala psikis atau kesehatan mental klinis nyata, mohon hubungi langsung psikolog atau ahli medis profesional berlisensi demi penanganan yang absah."
                              : "This interactive play index is created purely for pop-psych entertainment, fun self-reflection, and social scenarios. Scores and cinematic titles shown below carry no psychiatric diagnosis weights and are not scientific mental health evaluations. If you seek official psychological help, please consult with a licensed professional practitioner."}
                          </p>
                        </div>
                      </div>

                      {/* Header result card with intense crimson accent overlays */}
                      <section className="bg-slate-900 text-white rounded-[32px] p-6 sm:p-8 shadow-xl border border-rose-950/70 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
                        <div className="absolute -right-10 -top-10 w-48 h-48 bg-rose-900/30 rounded-full blur-3xl opacity-60 animate-pulse"></div>
                        <div className="absolute -left-10 -bottom-10 w-56 h-56 bg-indigo-900/30 rounded-full blur-3xl opacity-60"></div>

                        {/* Psychopath Donut/Circle Graph Gauge */}
                        <div className="relative shrink-0 flex items-center justify-center">
                          <div className="w-52 h-52 sm:w-56 sm:h-56 rounded-full bg-gradient-to-br from-rose-600 via-rose-950 to-slate-900 p-1 flex items-center justify-center shadow-lg shadow-rose-900/20">
                            <div className="w-full h-full bg-slate-950 rounded-full flex flex-col items-center justify-center relative overflow-hidden">
                              <span className="text-[9px] font-bold text-rose-500 uppercase tracking-widest">
                                PSYCHOPATHY LEVEL
                              </span>
                              <span className="text-5xl font-black mt-2 text-rose-500">
                                {psyResult.totalPoints}%
                              </span>
                              <span className="text-[10px] font-bold text-slate-400 uppercase mt-2 text-center max-w-[150px] leading-relaxed">
                                {lang === "id" ? psyResult.level : psyResult.levelEn}
                              </span>
                            </div>
                          </div>

                          <div className="absolute -bottom-2 -right-2 bg-rose-600 text-white text-[10px] font-black px-3.5 py-1.5 rounded-full shadow-lg border-2 border-slate-950 uppercase tracking-widest">
                            {lang === "id" ? "TIPE FUN" : "PLAYOUT TYPE"}
                          </div>
                        </div>

                        {/* Right texts and descriptive outcomes */}
                        <div className="flex-1 relative z-10 space-y-4 text-left">
                          <div>
                            <span className="px-2.5 py-1 rounded bg-rose-900/40 text-rose-400 text-[10px] font-black tracking-widest uppercase">
                              PERSPEKTIF ARTIFAK LOGIKA
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-black leading-tight mt-2.5">
                              {lang === "id" ? "Karakter Anda: " : "Scenario Persona: "}
                              <span className="text-rose-500">
                                "{lang === "id" ? psyResult.title : psyResult.titleEn}"
                              </span>
                            </h2>
                            <p className="text-slate-400 font-medium text-xs sm:text-sm italic mt-1.5">
                              "{lang === "id" ? psyResult.desc : psyResult.descEn}"
                            </p>
                          </div>

                          <p className="text-slate-300 text-xs leading-relaxed">
                            {lang === "id"
                              ? "Melalui skenario game yang dilewati, Anda mencatatkan kecenderungan rasionalitas tinggi dengan pengendalian emosional yang mantap. Anda menyelesaikan masalah dengan logika objektif (kadangkala dingin) tetapi masih memiliki kompromi moral pada norma-norma kehidupan sehari-hari."
                              : "Through the scenario logs, you display robust analytical boundaries with outstanding strategic logic patterns. You solve hurdles using cold objectivity but maintain standard societal moral checks properly."}
                          </p>

                          <div className="flex flex-wrap gap-2.5 pt-2">
                            <button 
                              onClick={handleShareResultCopy}
                              className="bg-rose-600 hover:bg-rose-700 text-white px-5 py-2.5 rounded-full text-xs font-bold flex items-center gap-2 transition-all hover:scale-[1.02] active:scale-95"
                            >
                              <Share2 className="w-4 h-4" />
                              <span>{copyAck ? (lang === "id" ? "Disalin!" : "Copied!") : (lang === "id" ? "Bagikan Hasil" : "Share Score")}</span>
                            </button>

                            <button 
                              onClick={handleTriggerPrint}
                              className="border border-rose-800 bg-slate-950 hover:bg-slate-900 text-slate-300 px-5 py-2.5 rounded-full text-xs font-bold flex items-center gap-2 transition-all"
                            >
                              <Download className="w-4 h-4 text-rose-500" />
                              <span>{lang === "id" ? "Unduh CV Mental" : "Download PDF Certificate"}</span>
                            </button>
                          </div>
                        </div>
                      </section>

                      {/* Interactive Section showing strategic social tips with Premium Locker */}
                      <div className="bg-white rounded-3xl p-6 shadow-sm border border-indigo-50 text-left">
                        <div className="flex border-b border-slate-150 gap-2 overflow-x-auto pb-1.5 no-scrollbar mb-4">
                          <button
                            onClick={() => setActiveTab("strengths")}
                            className={`px-4 py-2 text-xs font-black rounded-xl transition-all whitespace-nowrap ${
                              activeTab === "strengths" ? "bg-rose-50 text-rose-600" : "text-slate-500 hover:bg-slate-50"
                            }`}
                          >
                            {lang === "id" ? "Bedah Logika Karakter" : "Character Logic Analysis"}
                          </button>
                          
                          <button
                            onClick={() => setActiveTab("premium-career-finance")}
                            className={`px-4 py-2 text-xs font-black rounded-xl transition-all whitespace-nowrap flex items-center gap-1 ${
                              activeTab === "premium-career-finance" ? "bg-purple-100 text-purple-700 font-extrabold" : "text-slate-500 hover:bg-purple-50"
                            }`}
                          >
                            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                            <span>{lang === "id" ? "Tips Relasi & Karir Taktis (Premium)" : "Tactical Social Tips (Premium)"}</span>
                          </button>
                        </div>

                        {/* Tab panel rendering */}
                        <div className="mt-4">
                          {activeTab === "strengths" && (
                            <div className="space-y-4">
                              <h5 className="text-xs font-bold text-slate-800 uppercase tracking-widest">{lang === "id" ? "DESTRUKSIBILITAS LOGIKA STRATEGIS" : "STRATEGIC RATIONAL LOGIC"}</h5>
                              <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                                {lang === "id"
                                  ? "Anda merespons kasus dengan kacamata pragmatis murni. Anda tidak mudah disetir oleh luapan emosional sesaat dari luar, membuat Anda menjadi eksekutor tangguh dalam skenario krusial atau tenggat waktu menekan dalam bisnis."
                                  : "You handle cases using pragmatic filters. Prone to stay calm under emotional turbulence or hectic company targets, making you an exceptional risk coordinator."}
                              </p>
                            </div>
                          )}

                          {activeTab === "premium-career-finance" && (
                            isPremiumUser ? (
                              <div className="space-y-4">
                                <h5 className="text-xs font-extrabold text-slate-800 uppercase tracking-widest">{lang === "id" ? "TIPS PERTEMUAN SOSIAL & KARIR TINGGI" : "TACTICAL RELATION BLUEPRINT"}</h5>
                                <p className="text-xs text-slate-600 font-semibold leading-relaxed">
                                  {lang === "id"
                                    ? "Dengan kadar rasionalitas tinggi, Anda sangat cocok diletakkan pada posisi penetral krisis atau manajemen negosiasi bisnis makro. Pelajari cara menyuntikkan sedikit empati imitasi demi kelicinan relasi sosial bisnis Anda:"
                                    : "With high rational control, you thrive in high-stakes negotiation or crisis mitigation. Implement active listening and empathetic loops to smoothen corporate deals easily:"}
                                </p>
                                <div className="p-4 bg-rose-50 border border-rose-100 rounded-2xl">
                                  <p className="text-xs font-bold text-rose-800">{lang === "id" ? "Karisma Berbicara" : "Charming Speeches"}</p>
                                  <p className="text-[11px] text-rose-600 font-semibold mt-1">{lang === "id" ? "Hati-hati dengan nada datar; gunakan intonasi naik-turun berkala guna mendelegasikan perintah dengan mulus tanpa menakuti tim kerja Anda." : "Exercise pitch moderation; avoid flat expressions during team delegation so members follow comfortably."}</p>
                                </div>
                              </div>
                            ) : (
                              renderPremiumTeaser(
                                lang === "id" ? "Buka Tips Relasi & Karir Taktis Premium" : "Unlock Tactical Social Tips Premium",
                                lang === "id"
                                  ? "Dapatkan tips negosiasi, strategi karir pembuat keputusan tingkat eksekutif, serta token kelulusan simulasi keberanian mental fiktif secara lengkap."
                                  : "Obtain customized executive communication strategies, game theories, and fun mental courage certificate outputs.",
                                <Activity className="w-8 h-8 text-rose-600 animate-pulse" />
                              )
                            )
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Right column with AI coach chatbot helper */}
                    <div className="col-span-12 xl:col-span-4 space-y-6">
                      {/* Dark/Intense Coach panel */}
                      <div className="bg-slate-950 text-white rounded-[32px] p-6 shadow-xl border border-rose-950 flex flex-col justify-between relative overflow-hidden text-left">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-rose-950/40 rounded-full blur-2xl"></div>
                        <div>
                          <h4 className="font-extrabold text-slate-100 text-sm mb-1.5 flex items-center gap-1.5 uppercase tracking-wide">
                            <Activity className="w-4 h-4 text-rose-500 animate-pulse" />
                            <span>AI Psycho-Logic Analyzer</span>
                          </h4>
                          <p className="text-xs text-slate-400 font-medium leading-relaxed">
                            {lang === "id"
                              ? "Konsultasikan hasil profil fiktif Anda bersama AI Psikolog khusus kami untuk membedah strategi kepemimpinan karismatik."
                              : "Review your casual scenario profile with our deep AI Psychologist tool to master charismatic negotiation patterns."}
                          </p>

                          <div className="mt-4 p-4 rounded-2xl bg-slate-900 border border-rose-950/80">
                            <span className="text-[9px] font-black text-rose-500 block tracking-wider uppercase">CONVERSATION LOG</span>
                            <p className="text-xs text-slate-300 font-semibold mt-2 italic leading-relaxed">
                              {lang === "id"
                                ? "“Analisis skenario Anda unik! Rasionalitas " + psyResult.totalPoints + "% menunjukkan Anda pengambil keputusan tangguh. Ingin tahu cara meyakinkan investor tanpa terbaca kecemasan?”"
                                : "“Excellent play indices! Your score of " + psyResult.totalPoints + "% denotes extreme resilience. Ask me how to pitch deals with zero anxiety clues...”"}
                            </p>
                          </div>
                        </div>

                        {!isPremiumUser && (
                          <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-sm flex flex-col justify-center items-center p-4 text-center">
                            <Lock className="w-8 h-8 text-rose-500 animate-bounce mb-2" />
                            <p className="text-xs text-white font-bold">{lang === "id" ? "Akses Chat Terkunci" : "AI Psychologist Log Locked"}</p>
                            <p className="text-[10px] text-slate-400 max-w-xs mt-1 leading-normal font-medium">{lang === "id" ? "Buka premium untuk mendapatkan konsultasi chat taktis tanpa batas." : "Purchase premium unlocks unlimited interaction logs."}</p>
                            <button
                              onClick={() => setShowPremiumModal(true)}
                              className="mt-3 bg-rose-600 hover:bg-rose-700 text-white font-black text-[10px] px-4 py-2 rounded-xl transition-all uppercase"
                            >
                              LOCK PREMIUM
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
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
                          {lang === "id" ? "Metode Pembayaran:" : "Gateway:"} {t.paymentMethod} • {formatAmount(t.amount)}
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
                      <p className="text-lg font-black text-slate-800 mt-0.5" id="stats-revenue">{formatAmount(totalSalesRevenue)}</p>
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
                              <td className="py-4 text-right font-bold text-slate-800">{formatAmount(t.amount)}</td>
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
