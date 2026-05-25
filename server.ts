import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini SDK with telemetry header
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("Warning: GEMINI_API_KEY environment variable is not set.");
  }
  return new GoogleGenAI({
    apiKey: apiKey || "MOCK_KEY",
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
};

const ai = getGeminiClient();

// API endpoint for Premium Character Consultant powered by Gemini
app.post("/api/consult", async (req, res) => {
  try {
    const { profile, dominantColor, scores, message, chatHistory } = req.body;

    if (!process.env.GEMINI_API_KEY) {
      return res.status(200).json({
        reply: "⚠️ [MOCK MODE] GEMINI_API_KEY belum dikonfigurasi di panel Secrets. Ini adalah simulasi respons konsultan:\n\nHalo " + (profile?.name || "Kawan") + "! Analisis Aura menunjukkan dominasi karakter *" + dominantColor + "*. Sebagai seorang " + (profile?.occupation || "Profesional") + " berusia " + (profile?.age || "muda") + " tahun, Anda memiliki kekuatan besar dalam mengambil inisiatif. Untuk konsultasi karir & asmara lebih mendalam, konfigurasikan API Key Anda di panel Secrets AI Studio."
      });
    }

    // Build the system instructions context
    const profileText = `Nama: ${profile?.name || "Pengguna"}, Usia: ${profile?.age || "Tergantung"}, Jenis Kelamin: ${profile?.gender || "Sesuai"}, Pekerjaan: ${profile?.occupation || "Mahasiswa/Pekerja"}. Warna Kepribadian Dominan: ${dominantColor}. Skor Warna: ${JSON.stringify(scores)}.`;

    const systemInstruction = `Anda adalah "Premium Personality Psychologist & Life-path Consultant" bersertifikasi internasional. Anda melayani klien premium yang telah upgrade untuk mendapatkan konsultasi mendalam (aspek jodoh/percintaan, peta proyeksi karir 5 tahun, hobi yang menyembuhkan hambatan mental, dan strategi pembelajaran tingkat lanjut).
Gunakan bahasa yang hangat, penuh empati, analitis, bermartabat, dan solutif. Anda bisa berbicara dalam Bahasa Indonesia atau Inggris, sesuaikan dengan bahasa masukan pengguna. 
Gunakan ilmu psikologi warna (teORI Hartman atau DISC warna):
- Merah (Power, Visioner, dominan tapi tidak sabaran)
- Kuning (Expressive, Kreatif, sosial tapi kurang fokus)
- Biru (Analytical, Perfeksionis, setia tapi overthinker)
- Putih (Peace, Sabar, harmonis tapi pasif)

Profil Klien: ${profileText}
Berikan tips yang konkret, realistis, aplikatif, dan tidak klise. Jangan tampilkan data mentah JSON kepada pengguna.`;

    // Map chatHistory to Gemini API contents structure
    const formattedContents = [];
    if (chatHistory && Array.isArray(chatHistory)) {
      for (const turn of chatHistory) {
        formattedContents.push({
          role: turn.role === "user" ? "user" : "model",
          parts: [{ text: turn.text || "" }]
        });
      }
    }

    formattedContents.push({
      role: "user",
      parts: [{ text: message || "Berikan ringkasan analisis mendalam karir, jodoh ideal, dan saran belajar harian spesifik untuk saya." }]
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: formattedContents,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.75,
      }
    });

    const replyText = response.text || "Tidak dapat memformulasikan konsultasi. Coba ajukan pertanyaan berbeda.";
    return res.json({ reply: replyText });
  } catch (err: any) {
    console.error("Gemini invocation error:", err);
    return res.status(500).json({ error: "Gagal berinteraksi dengan AI Psikolog: " + err.message });
  }
});

// Setup Vite Dev server or production static files
async function serveApp() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting server in DEVELOPMENT mode with Vite Middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting server in PRODUCTION mode...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Express application successfully listening on port ${PORT}`);
  });
}

serveApp();
