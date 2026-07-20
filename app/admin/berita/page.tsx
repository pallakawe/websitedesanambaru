"use client";
import { useState, useEffect } from "react";
import { Search, Plus, Trash2, X, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface NewsItem {
    id: string;
    title: string;
    content: string;
    image_url: string | null;
    published_at: string;
}

export default function AdminBerita() {
    const [search, setSearch] = useState("");
    const [data, setData] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Form state
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    const fetchNews = async () => {
        setLoading(true);
        const { data: rows, error: err } = await supabase
            .from("news")
            .select("id, title, content, image_url, published_at")
            .order("published_at", { ascending: false });
        if (err) setError(err.message);
        else setData(rows || []);
        setLoading(false);
    };

    useEffect(() => {
        fetchNews();
    }, []);

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim() || !content.trim()) return;
        setSaving(true);
        setError(null);
        const { error: err } = await supabase.from("news").insert({
            title: title.trim(),
            content: content.trim(),
            image_url: imageUrl.trim() || null,
        });
        if (err) {
            setError(err.message);
        } else {
            setTitle("");
            setContent("");
            setImageUrl("");
            setShowForm(false);
            await fetchNews();
        }
        setSaving(false);
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm("Hapus berita ini? Tindakan tidak bisa dibatalkan.")) return;
        const { error: err } = await supabase.from("news").delete().eq("id", id);
        if (err) setError(err.message);
        else setData((prev) => prev.filter((d) => d.id !== id));
    };

    const filtered = data.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="max-w-6xl">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Kelola Berita</h1>
                    <p className="text-gray-600">Manajemen publikasi berita dan artikel desa.</p>
                </div>
                <button
                    onClick={() => setShowForm(true)}
                    className="bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-xl font-semibold flex items-center gap-2 shadow-sm transition-all"
                >
                    <Plus size={20} />
                    Tambah Berita
                </button>
            </div>

            {error && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm flex justify-between items-start gap-2">
                    <span>⚠️ {error}</span>
                    <button onClick={() => setError(null)}><X size={16} /></button>
                </div>
            )}

            {/* Form Modal */}
            {showForm && (
                <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
                        <div className="flex justify-between items-center p-6 border-b">
                            <h2 className="text-xl font-bold text-gray-900">Tambah Berita Baru</h2>
                            <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-700 transition-colors">
                                <X size={22} />
                            </button>
                        </div>
                        <form onSubmit={handleAdd} className="p-6 space-y-5">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Judul Berita <span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    required
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Masukkan judul berita..."
                                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Isi / Konten <span className="text-red-500">*</span></label>
                                <textarea
                                    required
                                    rows={5}
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    placeholder="Tulis isi berita di sini..."
                                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">URL Gambar (opsional)</label>
                                <input
                                    type="url"
                                    value={imageUrl}
                                    onChange={(e) => setImageUrl(e.target.value)}
                                    placeholder="https://..."
                                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                />
                            </div>
                            <div className="flex gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setShowForm(false)}
                                    className="flex-1 py-2.5 rounded-xl border border-gray-200 font-semibold text-gray-600 hover:bg-gray-50 transition-all"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="flex-1 py-2.5 rounded-xl bg-primary text-white font-semibold hover:bg-primary/90 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
                                >
                                    {saving && <Loader2 size={16} className="animate-spin" />}
                                    {saving ? "Menyimpan..." : "Simpan Berita"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="bg-white border rounded-2xl shadow-sm overflow-hidden">
                {/* Toolbar */}
                <div className="p-4 border-b bg-gray-50 flex gap-4 items-center">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Cari judul berita..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all bg-white"
                        />
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[600px]">
                        <thead>
                            <tr className="bg-gray-50 border-b">
                                <th className="p-4 font-semibold text-gray-600 text-sm">Judul Berita</th>
                                <th className="p-4 font-semibold text-gray-600 text-sm">Tanggal Publish</th>
                                <th className="p-4 font-semibold text-gray-600 text-sm text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan={3} className="p-10 text-center text-gray-400">
                                        <Loader2 size={28} className="animate-spin mx-auto mb-2" />
                                        <p>Memuat data berita...</p>
                                    </td>
                                </tr>
                            ) : filtered.length === 0 ? (
                                <tr>
                                    <td colSpan={3} className="p-10 text-center text-gray-400">
                                        {search ? "Berita tidak ditemukan." : "Belum ada berita. Klik Tambah Berita untuk memulai."}
                                    </td>
                                </tr>
                            ) : (
                                filtered.map((item) => (
                                    <tr key={item.id} className="border-b border-gray-100 last:border-0 hover:bg-primary/5 transition-colors">
                                        <td className="p-4 font-medium text-gray-900 max-w-xs">
                                            <p className="truncate">{item.title}</p>
                                            <p className="text-xs text-gray-400 mt-0.5 truncate">{item.content.slice(0, 80)}...</p>
                                        </td>
                                        <td className="p-4 text-gray-600 whitespace-nowrap">
                                            {new Date(item.published_at).toLocaleDateString("id-ID", {
                                                day: "numeric", month: "long", year: "numeric"
                                            })}
                                        </td>
                                        <td className="p-4 text-center">
                                            <button
                                                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                                title="Hapus"
                                                onClick={() => handleDelete(item.id)}
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="p-4 border-t text-sm text-gray-500">
                    Total: {filtered.length} berita
                </div>
            </div>
        </div>
    );
}
