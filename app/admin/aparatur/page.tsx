"use client";
import { useState, useEffect, useRef, DragEvent } from "react";
import { Search, Plus, Trash2, X, Loader2, Upload, User as UserIcon } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface OfficialItem {
    id: string;
    name: string;
    position: string;
    period: string;
    photo_url: string | null;
}

export default function AdminAparatur() {
    const [search, setSearch] = useState("");
    const [data, setData] = useState<OfficialItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Form state
    const [name, setName] = useState("");
    const [position, setPosition] = useState("");
    const [period, setPeriod] = useState("2026 - 2032"); // Default period
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [dragging, setDragging] = useState(false);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const fetchOfficials = async () => {
        setLoading(true);
        const { data: rows, error: err } = await supabase
            .from("officials")
            .select("id, name, position, period, photo_url")
            .order("created_at", { ascending: true });
        if (err) setError(err.message);
        else setData(rows || []);
        setLoading(false);
    };

    useEffect(() => { fetchOfficials(); }, []);

    const handleFileSelected = (file: File) => {
        if (!file.type.startsWith("image/")) return;
        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragging(false);
        const file = e.dataTransfer.files[0];
        if (file) handleFileSelected(file);
    };

    const uploadImage = async (file: File): Promise<string | null> => {
        setUploading(true);
        const ext = file.name.split(".").pop();
        const filename = `${Date.now()}.${ext}`;
        const { error: uploadErr } = await supabase.storage
            .from("officials")
            .upload(filename, file, { upsert: true });
        if (uploadErr) {
            setError("Gagal upload foto: " + uploadErr.message);
            setUploading(false);
            return null;
        }
        const { data: urlData } = supabase.storage.from("officials").getPublicUrl(filename);
        setUploading(false);
        return urlData.publicUrl;
    };

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim() || !position.trim() || !period.trim()) return;
        setSaving(true);
        setError(null);

        let finalPhotoUrl: string | null = null;
        if (imageFile) {
            finalPhotoUrl = await uploadImage(imageFile);
            if (!finalPhotoUrl) { setSaving(false); return; }
        }

        const { error: err } = await supabase.from("officials").insert({
            name: name.trim(),
            position: position.trim(),
            period: period.trim(),
            photo_url: finalPhotoUrl,
        });
        if (err) {
            setError(err.message);
        } else {
            setName(""); setPosition(""); setPeriod("2026 - 2032"); setImageFile(null); setImagePreview(null);
            setShowForm(false);
            await fetchOfficials();
        }
        setSaving(false);
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm("Hapus data aparatur ini? Tindakan tidak bisa dibatalkan.")) return;
        const { error: err } = await supabase.from("officials").delete().eq("id", id);
        if (err) setError(err.message);
        else setData((prev) => prev.filter((d) => d.id !== id));
    };

    const resetForm = () => {
        setName(""); setPosition(""); setPeriod("2026 - 2032"); setImageFile(null); setImagePreview(null);
        setShowForm(false); setError(null);
    };

    const filtered = data.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.position.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="max-w-6xl">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Kelola Aparatur Desa</h1>
                    <p className="text-gray-600">Manajemen foto, nama, dan jabatan perangkat Desa Nambaru.</p>
                </div>
                <button onClick={() => setShowForm(true)} className="bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-xl font-semibold flex items-center gap-2 shadow-sm transition-all">
                    <Plus size={20} /> Tambah Aparatur
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
                            <h2 className="text-xl font-bold text-gray-900">Tambah Aparatur Baru</h2>
                            <button onClick={resetForm} className="text-gray-400 hover:text-gray-700 transition-colors"><X size={22} /></button>
                        </div>
                        <form onSubmit={handleAdd} className="p-6 space-y-5">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Nama Lengkap <span className="text-red-500">*</span></label>
                                <input type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Masukkan nama..." className="w-full px-4 py-2.5 border border-gray-200 rounded-xl outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Jabatan <span className="text-red-500">*</span></label>
                                <input type="text" required value={position} onChange={(e) => setPosition(e.target.value)} placeholder="Contoh: Sekretaris Desa" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Masa Jabatan / Periode <span className="text-red-500">*</span></label>
                                <input type="text" required value={period} onChange={(e) => setPeriod(e.target.value)} placeholder="Contoh: 2026 - 2032" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" />
                            </div>

                            {/* Drag and Drop Photo Upload */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Foto Resmi (opsional)</label>
                                <div
                                    onClick={() => fileInputRef.current?.click()}
                                    onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                                    onDragLeave={() => setDragging(false)}
                                    onDrop={handleDrop}
                                    className={`relative w-full border-2 border-dashed rounded-xl transition-all cursor-pointer overflow-hidden
                                        ${dragging ? "border-primary bg-primary/5 scale-[1.01]" : "border-gray-200 hover:border-primary hover:bg-primary/5"}`}
                                >
                                    {imagePreview ? (
                                        <div className="relative">
                                            <img src={imagePreview} alt="preview" className="w-full h-40 object-cover" />
                                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                                                <p className="text-white text-sm font-semibold">Klik untuk ganti foto</p>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={(e) => { e.stopPropagation(); setImageFile(null); setImagePreview(null); }}
                                                className="absolute top-2 right-2 bg-white/90 rounded-full p-1 hover:bg-white transition-colors"
                                            >
                                                <X size={14} className="text-gray-700" />
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center justify-center py-8 gap-3 text-gray-400">
                                            {dragging ? <Upload size={32} className="text-primary animate-bounce" /> : <UserIcon size={32} />}
                                            <div className="text-center">
                                                <p className="text-sm font-medium text-gray-600">{dragging ? "Lepaskan foto di sini" : "Drag & drop foto ke sini"}</p>
                                                <p className="text-xs mt-1">atau klik untuk pilih file (JPG, PNG, WEBP)</p>
                                            </div>
                                        </div>
                                    )}
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={(e) => { if (e.target.files?.[0]) handleFileSelected(e.target.files[0]); }}
                                    />
                                </div>
                            </div>

                            <div className="flex gap-3 pt-2">
                                <button type="button" onClick={resetForm} className="flex-1 py-2.5 rounded-xl border border-gray-200 font-semibold text-gray-600 hover:bg-gray-50 transition-all">Batal</button>
                                <button type="submit" disabled={saving || uploading} className="flex-1 py-2.5 rounded-xl bg-primary text-white font-semibold hover:bg-primary/90 transition-all flex items-center justify-center gap-2 disabled:opacity-60">
                                    {(saving || uploading) && <Loader2 size={16} className="animate-spin" />}
                                    {uploading ? "Upload foto..." : saving ? "Menyimpan..." : "Simpan Aparatur"}
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
                        <input type="text" placeholder="Cari nama atau jabatan..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all bg-white" />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[600px]">
                        <thead>
                            <tr className="bg-gray-50 border-b">
                                <th className="p-4 font-semibold text-gray-600 text-sm w-16">Foto</th>
                                <th className="p-4 font-semibold text-gray-600 text-sm">Nama Lengkap</th>
                                <th className="p-4 font-semibold text-gray-600 text-sm">Jabatan</th>
                                <th className="p-4 font-semibold text-gray-600 text-sm">Periode</th>
                                <th className="p-4 font-semibold text-gray-600 text-sm text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan={5} className="p-10 text-center text-gray-400"><Loader2 size={28} className="animate-spin mx-auto mb-2" /><p>Memuat data aparatur...</p></td></tr>
                            ) : filtered.length === 0 ? (
                                <tr><td colSpan={5} className="p-10 text-center text-gray-400">{search ? "Data tidak ditemukan." : "Belum ada data aparatur. Klik Tambah Aparatur untuk memulai."}</td></tr>
                            ) : (
                                filtered.map((item) => (
                                    <tr key={item.id} className="border-b border-gray-100 last:border-0 hover:bg-primary/5 transition-colors">
                                        <td className="p-4">
                                            {item.photo_url ? (
                                                <img src={item.photo_url} alt={item.name} className="w-12 h-12 object-cover rounded-lg" />
                                            ) : (
                                                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center"><UserIcon size={18} className="text-gray-400" /></div>
                                            )}
                                        </td>
                                        <td className="p-4 font-semibold text-gray-900">{item.name}</td>
                                        <td className="p-4 text-primary font-medium">{item.position}</td>
                                        <td className="p-4 text-gray-600">{item.period}</td>
                                        <td className="p-4 text-center">
                                            <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Hapus" onClick={() => handleDelete(item.id)}>
                                                <Trash2 size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="p-4 border-t text-sm text-gray-500">Total: {filtered.length} perangkat desa</div>
            </div>
        </div>
    );
}
