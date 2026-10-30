"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

interface NewsItem { id: string; title: string; content: string; image_url: string | null; published_at: string; }
interface AgendaItem { id: string; title: string; event_date: string; location: string; }

const PLACEHOLDER_IMG = "/images/backgroundberanda.jpeg";

export default function Home() {
  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [agendaList, setAgendaList] = useState<AgendaItem[]>([]);
  const [stats, setStats] = useState({ population: 3365, families: 972, hamlets: 6, totalRt: 12 });

  useEffect(() => {
    supabase.from("news").select("id, title, content, image_url, published_at").order("published_at", { ascending: false }).limit(3).then(({ data }) => setNewsList(data || []));
    supabase.from("agendas").select("id, title, event_date, location").order("event_date", { ascending: true }).limit(3).then(({ data }) => setAgendaList(data || []));

    // Fetch stats
    supabase.from("village_statistics").select("*").limit(1).single().then(({ data }) => {
      if (data) {
        let parsedRt = 12;
        if (data.rt_rw) {
          try {
            const p = JSON.parse(data.rt_rw);
            if (p.total_rt) parsedRt = p.total_rt;
          } catch (e) { }
        }
        setStats({
          population: data.population || 3365,
          families: data.families || 972,
          hamlets: data.hamlets || 6,
          totalRt: parsedRt
        });
      }
    });
  }, []);

  return (
    <div className="flex flex-col gap-14 md:gap-20 pb-20 bg-white">
      {/* Hero Section */}
      <section className="relative w-full min-h-[640px] sm:min-h-[690px] -mt-16 flex items-center overflow-hidden pt-28 pb-24">
        <div className="absolute inset-0 bg-[#123c2c]/65 z-10" />
        <div className="absolute inset-0 z-0 bg-cover bg-center" style={{ backgroundImage: 'url("/images/backgroundberanda.jpeg")' }} />
        <div className="relative z-20 text-left text-white px-6 sm:px-10 lg:px-16 w-full max-w-7xl mx-auto">
          <div className="text-xs sm:text-sm font-bold tracking-[0.18em] uppercase text-amber-100 mb-6">Website Resmi Pemerintah Desa Nambaru</div>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 flex flex-col gap-1 leading-tight tracking-tight">
            <span>Selamat Datang di</span>
            <span className="text-white">Desa Nambaru</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl max-w-xl leading-relaxed text-white/90">
            Desa Kerukunan yang Tumbuh Bersama, Maju Bersama, dan Sejahtera Bersama.
          </p>
          <div className="mt-9 flex flex-col sm:flex-row gap-3 sm:gap-5 items-start sm:items-center">
            <a href="/profil" className="inline-block bg-white text-emerald-900 text-center px-7 py-3.5 rounded-md font-semibold hover:bg-amber-50 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">Jelajahi Desa</a>
            <a href="/potensi" className="inline-block border border-white/80 text-white text-center px-7 py-3.5 rounded-md font-semibold hover:bg-white/10 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">Lihat Potensi</a>
          </div>
        </div>
      </section>

      {/* Akses cepat ke informasi desa */}
      <section className="container mx-auto px-4 sm:px-6" aria-label="Informasi desa">
        <div className="grid grid-cols-2 lg:grid-cols-4 border border-stone-200 bg-[#f9f8f4] rounded-md overflow-hidden divide-x divide-y lg:divide-y-0 divide-stone-200">
          {[{ title: 'Profil Desa', subtitle: 'Sejarah dan wilayah', href: '/profil' }, { title: 'Pemerintahan', subtitle: 'Aparatur desa', href: '/aparatur' }, { title: 'Data Desa', subtitle: 'Statistik penduduk', href: '/data' }, { title: 'Potensi', subtitle: 'Potensi lokal', href: '/potensi' }].map(item => (
            <Link key={item.href} href={item.href} className="p-5 sm:p-7 hover:bg-emerald-50 transition-colors group">
              <span className="text-lg font-bold text-stone-900 block group-hover:text-emerald-800">{item.title}</span>
              <span className="text-sm text-stone-500 mt-1 block">{item.subtitle} <span aria-hidden="true">→</span></span>
            </Link>
          ))}
        </div>
      </section>

      {/* Sambutan Kepala Desa */}
      <section className="container mx-auto px-4">
        <div className="bg-white max-w-6xl mx-auto flex flex-col md:flex-row gap-7 sm:gap-12 items-center md:items-start">
          <div className="w-48 h-56 sm:w-60 sm:h-72 flex-shrink-0 bg-stone-100 rounded-md overflow-hidden">
            <img src="/images/fotokades.png" alt="Kepala Desa" className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.17em] text-emerald-800 mb-2">Pesan Pemerintah Desa</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">Sambutan Kepala Desa Nambaru</h2>
            <p className="text-stone-600 mb-5 leading-relaxed">
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
      <section className="bg-[#f8f8f4] py-16 sm:py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10 text-gray-900">Statistik Desa Nambaru</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 text-center">
            {[
              { label: 'Penduduk', value: stats.population.toLocaleString('id-ID'), desc: 'Jiwa' },
              { label: 'Keluarga', value: stats.families.toLocaleString('id-ID'), desc: 'Kepala Keluarga' },
              { label: 'Dusun', value: stats.hamlets, desc: 'Wilayah' },
              { label: 'Rukun Tetangga', value: stats.totalRt, desc: 'Total' },
            ].map((stat, i) => (
              <div key={i} className="bg-white p-4 sm:p-7 rounded-md border border-stone-200 hover:border-emerald-700 transition-colors">
                <h3 className="text-3xl sm:text-4xl font-black text-emerald-700 mb-2 break-words">{stat.value}</h3>
                <p className="font-semibold text-gray-800">{stat.label}</p>
                <p className="text-xs text-gray-500">{stat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Berita & Agenda */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-12">
          {/* Berita Dinamis */}
          <div className="lg:col-span-2">
            <div className="flex flex-wrap gap-2 justify-between items-center mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Kabar Desa Terbaru</h2>
              <a href="/berita" className="text-primary text-sm font-semibold hover:underline">Lihat Semua</a>
            </div>
            <div className="grid gap-6">
              {newsList.length === 0 ? (
                <p className="text-gray-400 text-sm py-4">Belum ada berita yang dipublikasikan.</p>
              ) : newsList.map((item) => (
                <Link key={item.id} href={`/berita/${item.id}`} className="flex flex-col sm:flex-row gap-4 group p-3 sm:p-4 border-b border-stone-200 hover:bg-stone-50 transition-colors">
                  <div className="w-full sm:w-40 h-44 sm:h-28 bg-muted rounded-md overflow-hidden flex-shrink-0">
                    <img src={item.image_url?.split(',')[0] || PLACEHOLDER_IMG} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold group-hover:text-primary transition-colors line-clamp-2">{item.title}</h3>
                    <p className="text-xs text-primary font-medium mt-1 mb-2">
                      {new Date(item.published_at).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
                    </p>
                    <p className="text-sm text-gray-600 line-clamp-2">{item.content}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Agenda Dinamis */}
          <div>
            <div className="flex flex-wrap gap-2 justify-between items-center mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Agenda Kegiatan</h2>
              <a href="/agenda" className="text-primary text-sm font-semibold hover:underline">Semua</a>
            </div>
            <div className="space-y-4">
              {agendaList.length === 0 ? (
                <p className="text-gray-400 text-sm py-4">Belum ada agenda yang dijadwalkan.</p>
              ) : agendaList.map((item) => (
                <div key={item.id} className="bg-[#f9f8f4] p-5 border-l-4 border-emerald-800 hover:bg-emerald-50 transition-colors">
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
