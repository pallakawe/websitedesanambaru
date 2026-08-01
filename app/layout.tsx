import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Website Desa Nambaru | Parigi Moutong",
  description: "Website resmi Desa Nambaru, Kecamatan Parigi Selatan, Kabupaten Parigi Moutong. Media informasi profil desa, data statistik, potensi UMKM, dan pelayanan masyarakat.",
  keywords: ["Desa Nambaru", "Nambaru", "Parigi Moutong", "Desa Nambaru Parigi Selatan", "Website Desa Nambaru", "Profil Desa Nambaru", "Sistem Informasi Desa Nambaru"],
  authors: [{ name: "Pemerintah Desa Nambaru" }],
  robots: "index, follow",
  openGraph: {
    title: "Website Resmi Desa Nambaru",
    description: "Media informasi profil desa, data statistik, potensi UMKM, dan pelayanan masyarakat Desa Nambaru.",
    url: "https://desanambaru.vercel.app",
    siteName: "Desa Nambaru",
    images: [
      {
        url: "/images/backgroundberanda.jpeg",
        width: 1200,
        height: 630,
        alt: "Balai Desa Nambaru",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <Navbar />
        <main className="flex-1 pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
