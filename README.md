# Website Desa Nambaru (Proyek KKN)

Website Resmi Desa Nambaru, dikembangkan menggunakan teknologi modern untuk memberikan pengalaman pengguna yang responsif, cepat, dan mudah dipelihara. Proyek ini disiapkan khusus untuk digunakan dan dikembangkan lebih lanjut oleh Mahasiswa KKN.

## 🚀 Teknologi yang Digunakan
- **Framework**: Next.js 15 (App Router)
- **Bahasa**: TypeScript
- **Styling**: Tailwind CSS & shadcn/ui
- **Database & Auth**: Supabase (PostgreSQL)
- **Ikon**: Lucide React

## 📂 Struktur Folder (Clean Architecture)
- `app/`: Berisi seluruh routing halaman publik dan halaman admin (`/admin`, `/login`).
- `components/`: Komponen UI modular dan *reusable* (Navbar, Footer, tombol).
- `supabase/`: Berisi skrip SQL untuk migrasi database (`schema.sql`) dan pengaturan storage (`storage.sql`).
- `public/`: Asset gambar statis dan ikon.

## 🛠 Panduan Instalasi Lokal

1. **Jalankan Instalasi Node Modules**
   ```bash
   npm install
   ```

2. **Konfigurasi Variabel Lingkungan**
   Ubah nama file `env.template` menjadi `.env.local` dan isi nilainya dari Dashboard Supabase Anda:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL
   NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
   ```

3. **Inisialisasi Database (Supabase)**
   - Buka SQL Editor di Dashboard Supabase.
   - Jalankan seluruh query yang ada di dalam `supabase/schema.sql` untuk membuat tabel dan aturan RLS.
   - Jalankan query dari `supabase/storage.sql` untuk menyiapkan tempat penyimpanan unggah foto.

4. **Jalankan Aplikasi**
   ```bash
   npm run dev
   ```
   Aplikasi akan berjalan di [http://localhost:3000](http://localhost:3000).

## 📌 Halaman Demo & Admin
Saat ini sistem telah diisi data dummy serealistis mungkin:
- Halaman panel admin bisa diakses di `/login`. (Silakan isi sembarang data agar masuk ke mode simulasi).
- Telah tersedia referensi antarmuka CRUD (Create, Read, Update, Delete) yang lengkap pada menu **Kelola Berita** (`/admin/berita`). Anda dapat melihat kode UI tersebut untuk menduplikasi logika CRUD ke menu admin lainnya dengan mudah.

## 🌐 Deployment (Vercel)
Aplikasi Next.js ini sangat ramah untuk di-deploy ke Vercel:
1. Hubungkan proyek ini ke repositori akun GitHub/GitLab Anda.
2. Login ke [Vercel](https://vercel.com/) dan import repository tersebut.
3. Pada tahap konfigurasi, tambahkan **Environment Variables** (URL & Key Supabase).
4. Selesai! Web sudah online secara publik.
