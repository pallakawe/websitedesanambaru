"use client";
import { useEffect, useState, use } from "react";
import { supabase } from "@/lib/supabase";
import { Loader2, ArrowLeft, Calendar, User, X } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

interface NewsDetail {
    id: string;
    title: string;
    content: string;
    image_url: string | null;
    published_at: string;
    author_id: string | null;
    author_name?: string;
}

const PLACEHOLDER_IMG = "/images/backgroundberanda.jpeg";

export default function BeritaDetail({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [news, setNews] = useState<NewsDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    useEffect(() => {
        const fetchDetail = async () => {
            const { data, error: err } = await supabase
                .from("news")
                .select("id, title, content, image_url, published_at, author_id")
                .eq("id", id)
                .single();

            if (err || !data) {
                setError(true);
            } else {
                setNews(data);
            }
            setLoading(false);
        };
        fetchDetail();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-gray-400">
                <Loader2 size={40} className="animate-spin mb-4 text-primary" />
                <p className="text-lg">Memuat konten berita...</p>
            </div>
        );
    }

    if (error || !news) {
        return notFound();
    }

    const imageUrls = news.image_url ? news.image_url.split(',') : [];
    const heroImage = imageUrls.length > 0 ? imageUrls[0] : PLACEHOLDER_IMG;
    const galleryImages = imageUrls.slice(1);

    return (
        <>
            <div className="bg-gray-50 min-h-screen pb-16">
                {/* Hero Image Section */}
                <div className="w-full h-[40vh] md:h-[60vh] relative bg-muted">
                    <img
                        src={heroImage}
                        alt={news.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 md:pb-16 container mx-auto text-white">
                        <Link href="/berita" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors border border-white/20 bg-black/20 backdrop-blur-md px-4 py-2 rounded-full text-sm font-medium">
                            <ArrowLeft size={16} /> Kembali ke Daftar Berita
                        </Link>
                        <h1 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-md leading-tight max-w-4xl">{news.title}</h1>
                        <div className="flex flex-wrap items-center gap-4 text-sm md:text-base text-white/90">
                            <div className="flex items-center gap-2">
                                <Calendar size={18} />
                                {new Date(news.published_at).toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
                            </div>
                            <span className="hidden md:block">•</span>
                            <div className="flex items-center gap-2">
                                <User size={18} />
                                Admin Nambaru
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Section */}
                <div className="container mx-auto px-4 -mt-8 relative z-10">
                    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-12 max-w-4xl mx-auto min-h-[400px]">
                        <article className="prose prose-lg md:prose-xl max-w-none prose-p:text-gray-700 prose-p:leading-relaxed prose-headings:text-gray-900 prose-a:text-primary whitespace-pre-line mb-12">
                            {news.content}
                        </article>

                        {/* Galeri Foto (Jika Ada Gambar Lebih Dari Satu) */}
                        {galleryImages.length > 0 && (
                            <div className="mt-8 pt-8 border-t border-gray-100">
                                <h3 className="text-2xl font-bold text-gray-900 mb-6">Galeri Foto</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                    {galleryImages.map((imgUrl, idx) => (
                                        <div
                                            key={idx}
                                            className="rounded-xl overflow-hidden aspect-video bg-muted border border-gray-200 cursor-pointer group"
                                            onClick={() => setSelectedImage(imgUrl)}
                                        >
                                            <img src={imgUrl} alt={`Foto galeri ${idx + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Share & Footer Actions */}
                        <div className="mt-16 pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                            <p className="text-gray-500 text-sm">Terima kasih telah membaca informasi dari Desa Nambaru.</p>
                            <Link href="/berita" className="bg-primary text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-primary/90 transition shadow-sm">
                                Baca Berita Lainnya
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Lightbox / Modal */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm"
                    onClick={() => setSelectedImage(null)}
                >
                    <button
                        className="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors bg-white/10 hover:bg-white/20 rounded-full p-2"
                        onClick={() => setSelectedImage(null)}
                    >
                        <X size={24} />
                    </button>
                    <img
                        src={selectedImage}
                        alt="Enlarged view"
                        className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl scale-in-center"
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
            )}
        </>
    );
}
