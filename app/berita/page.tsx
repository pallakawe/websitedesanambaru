"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Loader2 } from "lucide-react";

interface NewsItem {
    id: string;
    title: string;
    content: string;
    image_url: string | null;
    published_at: string;
}

const PLACEHOLDER_IMG = "https://images.unsplash.com/photo-1505929606132-756ef26e0be4?ixlib=rb-4.0.3&w=600&q=80";

export default function BeritaDesa() {
    const [newsList, setNewsList] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const fetchNews = async () => {
            const { data } = await supabase
                .from("news")
                .select("id, title, content, image_url, published_at")
                .order("published_at", { ascending: false });
            setNewsList(data || []);
            setLoading(false);
        };
        fetchNews();
    }, []);

    const filtered = newsList.filter((n) =>
        n.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
                <div>
                    <h1 className="text-4xl font-bold text-primary mb-2 text-center md:text-left">Berita Desa</h1>
                    <p className="text-gray-600 text-center md:text-left">Informasi terbaru seputar kegiatan dan pengumuman Desa Nambaru.</p>
                </div>
                <div className="w-full md:w-80">
                    <input
                        type="search"
                        placeholder="Cari berita..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full px-5 py-3 rounded-full border border-gray-200 outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all shadow-sm"
                    />
                </div>
            </div>

            {loading ? (
                <div className="flex flex-col items-center justify-center py-24 text-gray-400">
                    <Loader2 size={36} className="animate-spin mb-3" />
                    <p>Memuat berita...</p>
                </div>
            ) : filtered.length === 0 ? (
                <div className="text-center py-24 text-gray-400">
                    <p className="text-lg">{search ? "Berita tidak ditemukan." : "Belum ada berita yang dipublikasikan."}</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {filtered.map((news) => (
                        <div key={news.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border group flex flex-col sm:flex-row hover:border-primary transition-all hover:shadow-md">
                            <div className="w-full sm:w-2/5 h-48 sm:h-auto bg-muted overflow-hidden flex-shrink-0">
                                <img
                                    src={news.image_url || PLACEHOLDER_IMG}
                                    alt={news.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            <div className="p-6 flex flex-col justify-center flex-1">
                                <p className="text-xs font-bold tracking-wider text-primary mb-2 uppercase">
                                    {new Date(news.published_at).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
                                </p>
                                <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors line-clamp-2">{news.title}</h3>
                                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{news.content}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
