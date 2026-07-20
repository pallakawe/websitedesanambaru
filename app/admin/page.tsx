"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function AdminDashboard() {
    const [newsCount, setNewsCount] = useState<number | null>(null);
    const [agendaCount, setAgendaCount] = useState<number | null>(null);
    const [recentNews, setRecentNews] = useState<{ id: string; title: string; published_at: string }[]>([]);
    const [recentAgenda, setRecentAgenda] = useState<{ id: string; title: string; event_date: string }[]>([]);

    useEffect(() => {
        // Count berita
        supabase.from("news").select("id", { count: "exact", head: true }).then(({ count }) => setNewsCount(count ?? 0));
        // Count agenda mendatang
        supabase.from("agendas").select("id", { count: "exact", head: true }).then(({ count }) => setAgendaCount(count ?? 0));
        // Recent berita
        supabase.from("news").select("id, title, published_at").order("published_at", { ascending: false }).limit(3).then(({ data }) => setRecentNews(data || []));
        // Recent agenda
        supabase.from("agendas").select("id, title, event_date").order("event_date", { ascending: true }).limit(3).then(({ data }) => setRecentAgenda(data || []));
    }, []);

    const stats = [
        { label: "Total Berita", value: newsCount !== null ? String(newsCount) : "...", icon: "📰", color: "bg-blue-100 text-blue-600 border-blue-200" },
        { label: "Agenda Dijadwalkan", value: agendaCount !== null ? String(agendaCount) : "...", icon: "📅", color: "bg-green-100 text-green-600 border-green-200" },
    ];

    const shortcuts = [
        { icon: "✍️", label: "Tulis Berita", desc: "Buat kabar terbaru untuk warga", href: "/admin/berita", bg: "bg-blue-50" },
        { icon: "📅", label: "Buat Agenda", desc: "Jadwalkan acara atau musyawarah", href: "/admin/agenda", bg: "bg-green-50" },
    ];

    return (
        <div className="max-w-6xl">
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">Selayang Pandang</h1>
                <p className="text-gray-600">Selamat datang kembali! Berikut ringkasan statistik website Desa Nambaru saat ini.</p>
            </div>

            {/* Stats Real */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
                {stats.map((stat, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-2xl border shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
                        <div>
                            <p className="text-gray-500 font-medium mb-1">{stat.label}</p>
                            <h3 className="text-4xl font-black text-gray-900">{stat.value}</h3>
                        </div>
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl border shadow-sm ${stat.color}`}>
                            {stat.icon}
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Berita Terbaru */}
                <div className="bg-white border rounded-2xl shadow-sm p-8">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold">Berita Terbaru</h3>
                        <Link href="/admin/berita" className="text-primary text-sm font-semibold hover:underline">Kelola Berita</Link>
                    </div>
                    <div className="space-y-4">
                        {recentNews.length === 0 ? (
                            <p className="text-gray-400 text-sm">Belum ada berita. <Link href="/admin/berita" className="text-primary underline">Tambah sekarang</Link></p>
                        ) : recentNews.map((n) => (
                            <div key={n.id} className="flex gap-3 items-start pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                                <div className="w-2.5 h-2.5 rounded-full bg-primary mt-1.5 shrink-0" />
                                <div className="flex-1 min-w-0">
                                    <h4 className="text-gray-900 font-semibold truncate text-sm">{n.title}</h4>
                                    <p className="text-xs text-gray-400 mt-0.5">
                                        {new Date(n.published_at).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Agenda Terdekat + Jalan Pintas */}
                <div className="flex flex-col gap-8">
                    {/* Agenda */}
                    <div className="bg-white border rounded-2xl shadow-sm p-8">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold">Agenda Terdekat</h3>
                            <Link href="/admin/agenda" className="text-primary text-sm font-semibold hover:underline">Kelola Agenda</Link>
                        </div>
                        <div className="space-y-3">
                            {recentAgenda.length === 0 ? (
                                <p className="text-gray-400 text-sm">Belum ada agenda. <Link href="/admin/agenda" className="text-primary underline">Buat sekarang</Link></p>
                            ) : recentAgenda.map((a) => (
                                <div key={a.id} className="flex gap-3 items-start">
                                    <div className="bg-primary text-white text-xs font-bold px-2 py-1 rounded shrink-0 mt-0.5">
                                        {new Date(a.event_date).toLocaleDateString("id-ID", { day: "numeric", month: "short" })}
                                    </div>
                                    <p className="text-sm font-medium text-gray-800 leading-relaxed">{a.title}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Jalan Pintas */}
                    <div className="bg-white border rounded-2xl shadow-sm p-6">
                        <h3 className="text-xl font-bold mb-4">Jalan Pintas</h3>
                        <div className="grid grid-cols-2 gap-3">
                            {shortcuts.map((s) => (
                                <Link key={s.href} href={s.href} className="p-4 border border-gray-100 rounded-xl hover:border-primary hover:bg-primary/5 transition flex flex-col gap-2 group">
                                    <span className={`text-2xl w-10 h-10 flex items-center justify-center rounded-lg group-hover:scale-110 transition-transform ${s.bg}`}>{s.icon}</span>
                                    <span className="font-bold text-gray-800 text-sm">{s.label}</span>
                                    <span className="text-xs text-gray-500">{s.desc}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
