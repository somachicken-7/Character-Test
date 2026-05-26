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

// CORS and Preflight handler middleware
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Authorization, Content-Type, Accept");
  res.setHeader("Access-Control-Max-Age", "86400"); // 24 hours cache for preflight
  
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  next();
});

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

// Server-side API proxy for Google Sheets to prevent client-side CORS/fetch limitations
app.post("/api/sheets/append", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: "Missing authorization header" });
    }

    const { spreadsheetId, range, valueInputOption, values } = req.body;
    if (!spreadsheetId || !range || !values) {
      return res.status(400).json({ error: "Missing required parameters: spreadsheetId, range, or values" });
    }

    // Call Sheets API from server context where CORS doesn't apply
    const sheetsUrl = `https://sheets.googleapis.com/v1/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(range)}:append?valueInputOption=${valueInputOption || "USER_ENTERED"}`;

    const response = await fetch(sheetsUrl, {
      method: "POST",
      headers: {
        "Authorization": authHeader,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ values })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("[GSheets Server Proxy Error]:", response.status, errorText);
      return res.status(response.status).json({ error: errorText });
    }

    const data = await response.json();
    return res.json(data);
  } catch (err: any) {
    console.error("[GSheets Server Proxy Exception]:", err);
    return res.status(500).json({ error: err.message || "Unknown server error routing to Google Sheets" });
  }
});

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
