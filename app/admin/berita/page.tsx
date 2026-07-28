"use client";
import { useState, useEffect, useRef, DragEvent } from "react";
import { Search, Plus, Trash2, X, Loader2, Upload, Image as ImageIcon, Edit } from "lucide-react";
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
    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    const [existingImageUrls, setExistingImageUrls] = useState<string[]>([]);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [dragging, setDragging] = useState(false);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

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

    useEffect(() => { fetchNews(); }, []);

    const handleFilesSelected = (files: FileList | null) => {
        if (!files) return;
        const newFiles = Array.from(files).filter(f => f.type.startsWith("image/"));
        if (newFiles.length === 0) return;

        setImageFiles(prev => [...prev, ...newFiles]);

        const newPreviews = newFiles.map(file => URL.createObjectURL(file));
        setImagePreviews(prev => [...prev, ...newPreviews]);
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragging(false);
        handleFilesSelected(e.dataTransfer.files);
    };

    const removeImage = (index: number) => {
        setImageFiles(prev => prev.filter((_, i) => i !== index));
        setImagePreviews(prev => prev.filter((_, i) => i !== index));
    };

    const removeExistingImage = (index: number) => {
        setExistingImageUrls(prev => prev.filter((_, i) => i !== index));
    };

    const handleEditClick = (item: NewsItem) => {
        setTitle(item.title);
        setContent(item.content);
        setEditingId(item.id);
        setExistingImageUrls(item.image_url ? item.image_url.split(',') : []);
        setImageFiles([]);
        setImagePreviews([]);
        setShowForm(true);
    };

    const uploadImage = async (file: File): Promise<string | null> => {
        setUploading(true);
        const ext = file.name.split(".").pop();
        const filename = `${Date.now()}.${ext}`;
        const { error: uploadErr } = await supabase.storage
            .from("news")
            .upload(filename, file, { upsert: true });
        if (uploadErr) {
            setError("Gagal upload gambar: " + uploadErr.message);
            setUploading(false);
            return null;
        }
        const { data: urlData } = supabase.storage.from("news").getPublicUrl(filename);
        setUploading(false);
        return urlData.publicUrl;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim() || !content.trim()) return;
        setSaving(true);
        setError(null);

        let newUrls: string[] = [];
        if (imageFiles.length > 0) {
            const uploadPromises = imageFiles.map(file => uploadImage(file));
            const uploadedUrls = await Promise.all(uploadPromises);

            // Filter out nulls in case of failures
            newUrls = uploadedUrls.filter((url): url is string => url !== null);
            if (newUrls.length === 0) {
                setSaving(false);
                return;
            }
        }

        const finalUrls = [...existingImageUrls, ...newUrls];
        const finalImageUrl = finalUrls.length > 0 ? finalUrls.join(",") : null;

        const payload = {
            title: title.trim(),
            content: content.trim(),
            image_url: finalImageUrl,
        };

        let err;
        if (editingId) {
            const { error } = await supabase.from("news").update(payload).eq("id", editingId);
            err = error;
        } else {
            const { error } = await supabase.from("news").insert(payload);
            err = error;
        }

        if (err) {
            setError(err.message);
        } else {
            resetForm();
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

    const resetForm = () => {
        setTitle(""); setContent(""); setImageFiles([]); setImagePreviews([]);
        setExistingImageUrls([]); setEditingId(null);
        setShowForm(false); setError(null);
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
                <button onClick={() => setShowForm(true)} className="bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-xl font-semibold flex items-center gap-2 shadow-sm transition-all">
                    <Plus size={20} /> Tambah Berita
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
                <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4 overflow-y-auto">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg my-4">
                        <div className="flex justify-between items-center p-6 border-b">
                            <h2 className="text-xl font-bold text-gray-900">{editingId ? "Edit Berita" : "Tambah Berita Baru"}</h2>
                            <button onClick={resetForm} className="text-gray-400 hover:text-gray-700 transition-colors"><X size={22} /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-5">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Judul Berita <span className="text-red-500">*</span></label>
                                <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Masukkan judul berita..." className="w-full px-4 py-2.5 border border-gray-200 rounded-xl outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Isi / Konten <span className="text-red-500">*</span></label>
                                <textarea required rows={5} value={content} onChange={(e) => setContent(e.target.value)} placeholder="Tulis isi berita di sini..." className="w-full px-4 py-2.5 border border-gray-200 rounded-xl outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none" />
                            </div>

                            {/* Drag and Drop Image Upload */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Gambar Berita (opsional)</label>
                                <div
                                    onClick={() => fileInputRef.current?.click()}
                                    onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                                    onDragLeave={() => setDragging(false)}
                                    onDrop={handleDrop}
                                    className={`relative w-full border-2 border-dashed rounded-xl transition-all cursor-pointer overflow-hidden
                                        ${dragging ? "border-primary bg-primary/5 scale-[1.01]" : "border-gray-200 hover:border-primary hover:bg-primary/5"}`}
                                >
                                    {(imagePreviews.length > 0 || existingImageUrls.length > 0) ? (
                                        <div className="p-4 bg-gray-50/50">
                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                                {existingImageUrls.map((url, idx) => (
                                                    <div key={`existing-${idx}`} className="relative group rounded-lg overflow-hidden border border-gray-200 aspect-video">
                                                        <img src={url} alt={`existing-${idx}`} className="w-full h-full object-cover" />
                                                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                                                            <button
                                                                type="button"
                                                                onClick={(e) => { e.stopPropagation(); removeExistingImage(idx); }}
                                                                className="bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 shadow-sm transition-colors"
                                                            >
                                                                <X size={14} />
                                                            </button>
                                                        </div>
                                                        {idx === 0 && (
                                                            <div className="absolute top-1 left-1 bg-primary text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow">Cover</div>
                                                        )}
                                                    </div>
                                                ))}
                                                {imagePreviews.map((preview, idx) => (
                                                    <div key={`new-${idx}`} className="relative group rounded-lg overflow-hidden border border-gray-200 aspect-video">
                                                        <img src={preview} alt={`preview-${idx}`} className="w-full h-full object-cover" />
                                                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                                                            <button
                                                                type="button"
                                                                onClick={(e) => { e.stopPropagation(); removeImage(idx); }}
                                                                className="bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 shadow-sm transition-colors"
                                                            >
                                                                <X size={14} />
                                                            </button>
                                                        </div>
                                                        {(idx === 0 && existingImageUrls.length === 0) && (
                                                            <div className="absolute top-1 left-1 bg-primary text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow">Cover</div>
                                                        )}
                                                    </div>
                                                ))}
                                                <div
                                                    className="relative rounded-lg border-2 border-dashed border-gray-300 hover:border-primary flex flex-col items-center justify-center cursor-pointer bg-white aspect-video group"
                                                    onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
                                                >
                                                    <Plus className="text-gray-400 group-hover:text-primary transition-colors" size={24} />
                                                    <span className="text-[10px] font-medium text-gray-500 mt-1">Tambah Foto</span>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center justify-center py-8 gap-3 text-gray-400" onClick={() => fileInputRef.current?.click()}>
                                            {dragging ? <Upload size={32} className="text-primary animate-bounce" /> : <ImageIcon size={32} />}
                                            <div className="text-center">
                                                <p className="text-sm font-medium text-gray-600">{dragging ? "Lepaskan gambar di sini" : "Drag & drop banyak gambar ke sini"}</p>
                                                <p className="text-xs mt-1">atau klik untuk pilih multi file (JPG, PNG, WEBP)</p>
                                            </div>
                                        </div>
                                    )}
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/*"
                                        multiple
                                        className="hidden"
                                        onChange={(e) => handleFilesSelected(e.target.files)}
                                    />
                                </div>
                            </div>

                            <div className="flex gap-3 pt-2">
                                <button type="button" onClick={resetForm} className="flex-1 py-2.5 rounded-xl border border-gray-200 font-semibold text-gray-600 hover:bg-gray-50 transition-all">Batal</button>
                                <button type="submit" disabled={saving || uploading} className="flex-1 py-2.5 rounded-xl bg-primary text-white font-semibold hover:bg-primary/90 transition-all flex items-center justify-center gap-2 disabled:opacity-60">
                                    {(saving || uploading) && <Loader2 size={16} className="animate-spin" />}
                                    {uploading ? `Upload ${imageFiles.length} gambar...` : saving ? "Menyimpan..." : "Simpan Berita"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="bg-white border rounded-2xl shadow-sm overflow-hidden">
                <div className="p-4 border-b bg-gray-50 flex gap-4 items-center">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input type="text" placeholder="Cari judul berita..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all bg-white" />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[600px]">
                        <thead>
                            <tr className="bg-gray-50 border-b">
                                <th className="p-4 font-semibold text-gray-600 text-sm w-16">Foto</th>
                                <th className="p-4 font-semibold text-gray-600 text-sm">Judul Berita</th>
                                <th className="p-4 font-semibold text-gray-600 text-sm">Tanggal Publish</th>
                                <th className="p-4 font-semibold text-gray-600 text-sm text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan={4} className="p-10 text-center text-gray-400"><Loader2 size={28} className="animate-spin mx-auto mb-2" /><p>Memuat data berita...</p></td></tr>
                            ) : filtered.length === 0 ? (
                                <tr><td colSpan={4} className="p-10 text-center text-gray-400">{search ? "Berita tidak ditemukan." : "Belum ada berita. Klik Tambah Berita untuk memulai."}</td></tr>
                            ) : (
                                filtered.map((item) => (
                                    <tr key={item.id} className="border-b border-gray-100 last:border-0 hover:bg-primary/5 transition-colors">
                                        <td className="p-4">
                                            {item.image_url ? (
                                                <img src={item.image_url.split(',')[0]} alt={item.title} className="w-12 h-12 object-cover rounded-lg" />
                                            ) : (
                                                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center"><ImageIcon size={18} className="text-gray-400" /></div>
                                            )}
                                        </td>
                                        <td className="p-4 font-medium text-gray-900 max-w-xs">
                                            <p className="truncate">{item.title}</p>
                                            <p className="text-xs text-gray-400 mt-0.5 truncate">{item.content.slice(0, 70)}...</p>
                                        </td>
                                        <td className="p-4 text-gray-600 whitespace-nowrap">
                                            {new Date(item.published_at).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
                                        </td>
                                        <td className="p-4 text-center">
                                            <div className="flex items-center justify-center gap-2">
                                                <button className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors" title="Edit" onClick={() => handleEditClick(item)}>
                                                    <Edit size={18} />
                                                </button>
                                                <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Hapus" onClick={() => handleDelete(item.id)}>
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="p-4 border-t text-sm text-gray-500">Total: {filtered.length} berita</div>
            </div>
        </div>
    );
}
