# 🚀 Panduan Deploy ke GitHub & Vercel

Aplikasi ini telah dikonfigurasi dengan arsitektur **Full-Stack (Vite + Express)** yang siap dideploy secara instan ke platform serverless seperti Vercel atau server mandiri.

---

## 📦 Cara 1: Hubungkan ke GitHub & Auto-Deploy ke Vercel

### 1. Push ke Repository GitHub Anda
Inisialisasi git local dan kirim kode Anda ke GitHub:
```bash
git init
git add .
git commit -m "Inisialisasi Karakter Warna App"
git branch -M main
git remote add origin https://github.com/USERNAME/NAMA-REPO.git
git push -u origin main
```

### 2. Hubungkan ke Vercel
1. Masuk ke dashboard **[Vercel](https://vercel.com/)** dan buat akun baru via GitHub.
2. Klik **Add New** -> **Project**.
3. Pilih repository GitHub yang baru saja Anda push.
4. Di panel konfigurasi build, Vercel akan secara otomatis mendeteksi konfigurasi Vite & Express.
5. **Tambahkan Environment Secrets** di pengaturan Vercel (bila diinginkan):
   * `GEMINI_API_KEY`: API Key dari Google AI Studio Anda (opsional untuk konsultasi psikolog AI premium).
6. Klik **Deploy**! Selesai!

---

## 🛠️ Cara Kerja Backend & Setup API
Aplikasi ini menggunakan backend Express (`server.ts`) yang dipanggil secara aman dari sisi klien (`/api/consult`) agar API Key Anda tetap tersembunyi dengan aman dan tidak bocor ke publik.

Bila Anda mendeploy menggunakan Serverless Functions di platform Vercel, pastikan untuk mengkonfigurasi file server sebagai serverless handler jika diperlukan, atau meng-host backend Node.js ini secara mandiri di platform gratis/murah seperti:
* **Render.com** (Mendukung full-stack Express)
* **Railway.app** (Mendukung auto-deploy server instan)
* **Hugging Face Spaces / Docker Swarm**
