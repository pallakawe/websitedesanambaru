"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface NewsItem { id: string; title: string; content: string; image_url: string | null; published_at: string; }
interface AgendaItem { id: string; title: string; event_date: string; location: string; }

const PLACEHOLDER_IMG = "/images/backgroundberanda.jpeg";

export default function Home() {
  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [agendaList, setAgendaList] = useState<AgendaItem[]>([]);

  useEffect(() => {
    supabase.from("news").select("id, title, content, image_url, published_at").order("published_at", { ascending: false }).limit(3).then(({ data }) => setNewsList(data || []));
    supabase.from("agendas").select("id, title, event_date, location").order("event_date", { ascending: true }).limit(3).then(({ data }) => setAgendaList(data || []));
  }, []);

  return (
    <div className="flex flex-col gap-16 pb-16">
      {/* Hero Section */}
      <section className="relative w-full h-screen -mt-16 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <div className="absolute inset-0 z-0 bg-cover bg-center" style={{ backgroundImage: 'url("/images/backgroundberanda.jpeg")' }} />
        <div className="relative z-20 text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-in slide-in-from-bottom flex flex-col gap-2">
            <span>Selamat Datang di</span>
            <span className="text-white">Desa Nambaru</span>
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-90 animate-in slide-in-from-bottom delay-150">
            Desa Kerukunan yang Tumbuh Bersama, Maju Bersama, dan Sejahtera Bersama.
          </p>
          <div className="mt-8 flex gap-4 justify-center">
            <a href="/profil" className="bg-white text-primary px-6 py-3 rounded-full font-semibold hover:bg-opacity-90 transition shadow-lg">Jelajahi Desa</a>
            <a href="/potensi" className="bg-transparent border border-white text-white px-6 py-3 rounded-full font-semibold hover:bg-white/10 transition">Lihat Potensi</a>
          </div>
        </div>
      </section>

      {/* Sambutan Kepala Desa */}
      <section className="container mx-auto px-4">
        <div className="bg-white border rounded-2xl p-8 shadow-sm max-w-4xl mx-auto flex flex-col md:flex-row gap-8 items-center border-l-4 border-l-primary">
          <div className="w-32 h-32 flex-shrink-0 bg-muted rounded-full overflow-hidden border-4 border-primary/20">
            <img src="/images/fotokades.png" alt="Kepala Desa" className="w-full h-full object-cover" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Sambutan Kepala Desa Nambaru</h2>
            <p className="text-gray-600 mb-4 italic">
              &quot;Puji syukur ke hadirat Tuhan Yang Maha Esa. Kehadiran Website Desa Nambaru merupakan wujud komitmen Pemerintah Desa dalam memberikan pelayanan informasi yang cepat, transparan, dan mudah diakses oleh masyarakat. Melalui website ini, kami berharap seluruh informasi mengenai pemerintahan, pembangunan, potensi desa, serta berbagai layanan publik dapat tersampaikan dengan baik, sehingga mampu mempererat kebersamaan dalam mewujudkan Desa Nambaru yang maju, sejahtera, dan berbudaya.&quot;
            </p>
            <div>
              <p className="font-semibold text-primary">Asmuran</p>
              <p className="text-sm text-gray-500">Kepala Desa Nambaru</p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistik */}
      <section className="bg-muted py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Statistik Desa Nambaru</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { label: 'Penduduk', value: '4.521', desc: 'Jiwa' },
              { label: 'Keluarga', value: '1.204', desc: 'Kepala Keluarga' },
              { label: 'Dusun', value: '6', desc: 'Wilayah' },
              { label: 'RT / RW', value: '24 / 8', desc: 'Total' },
            ].map((stat, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border hover:border-primary transition-colors">
                <h3 className="text-4xl font-black text-primary mb-2">{stat.value}</h3>
                <p className="font-semibold text-gray-800">{stat.label}</p>
                <p className="text-xs text-gray-500">{stat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Berita & Agenda */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Berita Dinamis */}
          <div className="md:col-span-2">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Kabar Desa Terbaru</h2>
              <a href="/berita" className="text-primary text-sm font-semibold hover:underline">Lihat Semua</a>
            </div>
            <div className="grid gap-6">
              {newsList.length === 0 ? (
                <p className="text-gray-400 text-sm py-4">Belum ada berita yang dipublikasikan.</p>
              ) : newsList.map((item) => (
                <a key={item.id} href="/berita" className="flex gap-4 group cursor-pointer">
                  <div className="w-32 h-24 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                    <img src={item.image_url || PLACEHOLDER_IMG} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold group-hover:text-primary transition-colors line-clamp-2">{item.title}</h3>
                    <p className="text-xs text-primary font-medium mt-1 mb-2">
                      {new Date(item.published_at).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
                    </p>
                    <p className="text-sm text-gray-600 line-clamp-2">{item.content}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Agenda Dinamis */}
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Agenda Kegiatan</h2>
              <a href="/agenda" className="text-primary text-sm font-semibold hover:underline">Semua</a>
            </div>
            <div className="space-y-4">
              {agendaList.length === 0 ? (
                <p className="text-gray-400 text-sm py-4">Belum ada agenda yang dijadwalkan.</p>
              ) : agendaList.map((item) => (
                <div key={item.id} className="bg-primary/5 p-4 rounded-xl border border-primary/10">
                  <div className="bg-primary text-white text-xs font-bold px-2 py-1 inline-block rounded mb-2">
                    {new Date(item.event_date).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}
                  </div>
                  <h4 className="font-semibold text-gray-900">{item.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{item.location}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
