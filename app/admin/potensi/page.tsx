"use client";

import { useState, useEffect, useRef } from "react";
import { Plus, Edit, Trash2, Save, X, Loader2, Image as ImageIcon, CheckCircle2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface Potensi {
    id: string;
    title: string;
    category: string;
    description: string;
    photo_url: string;
    created_at?: string;
}

export default function AdminPotensi() {
    const [items, setItems] = useState<Potensi[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    // Editor State
    const [isEditing, setIsEditing] = useState(false);
    const [currentId, setCurrentId] = useState<string | null>(null);
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("Pertanian");
    const [description, setDescription] = useState("");
    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    const [existingImageUrls, setExistingImageUrls] = useState<string[]>([]);
    const [saving, setSaving] = useState(false);
    const [dragging, setDragging] = useState(false);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const fetchItems = async () => {
        setLoading(true);
        const { data, error: err } = await supabase.from("potentials").select("*").order("created_at", { ascending: true });

        const defaultPotentials = [
            {
                title: "Pertanian Padi Organik",
                category: "Pertanian",
                description: "Sawah Produktif yang memiliki hamparan luas di desa Nambaru. Sebanyak 200 hektar yang terbentang di wilayah dusun III, dusun I, dusun IV, serta dusun VI sebagai penopang beras di kecamatan Parigi Selatan.",
                photo_url: "https://gokomodo.com/blog/4-jenis-sawah-di-indonesia-yang-perlu-kamu-tahu",
            },
            {
                title: "Peternakan Ayam Potong",
                category: "Peternakan",
                description: "Peternakan di Desa Nambaru didominasi oleh usaha peternakan ayam potong yang dikelola oleh pelaku UMKM setempat. Usaha ini berperan penting sebagai salah satu pemasok daging ayam untuk memenuhi kebutuhan masyarakat serta mendukung ketersediaan bahan pangan di pasaran. Lokasi peternakan tersebar di Dusun III dan Dusun IV, sehingga menjadi salah satu sektor unggulan yang berkontribusi terhadap perekonomian Desa Nambaru.",
                photo_url: "https://images.unsplash.com/photo-1596733430284-f74370603735?ixlib=rb-4.0.3&w=800&q=80",
            },
            {
                title: "Peternakan Sapi",
                category: "Peternakan",
                description: "Untuk deskripsi tunggu pengambilan data.",
                photo_url: "https://images.unsplash.com/photo-1596733430284-f74370603735?ixlib=rb-4.0.3&w=800&q=80",
            },
            {
                title: "Gula Kelapa Nambaru",
                category: "UMKM",
                description: "Desa Nambaru memiliki potensi Usaha Mikro, Kecil, dan Menengah (UMKM) yang menjadi produk unggulan, yaitu gula kelapa dan gula taplok. Kedua produk ini diolah dari nira kelapa yang berasal dari perkebunan kelapa milik masyarakat Desa Nambaru. Dengan cita rasa yang manis khas dan gurih alami, gula kelapa dan gula taplok tidak hanya dikonsumsi sebagai pemanis tradisional, tetapi juga dimanfaatkan sebagai bahan baku dalam pembuatan kecap. Keberadaan UMKM ini menjadi salah satu penopang perekonomian masyarakat sekaligus mencerminkan potensi lokal Desa Nambaru yang layak untuk terus dikembangkan.",
                photo_url: "https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?ixlib=rb-4.0.3&w=800&q=80",
            },
            {
                title: "Wisata Bendungan Air",
                category: "Pariwisata",
                description: "Destinasi wisata alam yang ada di desa Nambaru, yaitu wisata bendungan air Mouti terletak di dusun V Bonebula yang menyajikan alam yang sangat asri, air yang begitu jernih dengan kicauan burung yang ada di sekitar bendungan tersebut",
                photo_url: "https://images.unsplash.com/photo-1506509741088-7510d9ce4546?ixlib=rb-4.0.3&w=800&q=80",
            }
        ];

        if (err || !data || data.length === 0) {
            // Auto Seed DB with default 5 values if empty
            const { error: seedErr } = await supabase.from("potentials").insert(defaultPotentials);

            if (!seedErr) {
                // Fetch newly inserted values with proper UUIDs
                const { data: refetched } = await supabase.from("potentials").select("*").order("created_at", { ascending: true });
                if (refetched) setItems(refetched);
            } else {
                // If RLS blocked insert, show gracefully as fallbacks in UI, prefix id with 'default-'
                const fallbacks = defaultPotentials.map((item, i) => ({ ...item, id: `default-${i}` }));
                setItems(fallbacks as Potensi[]);
            }
        } else {
            setItems(data);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchItems();
    }, []);

    const resetForm = () => {
        setIsEditing(false);
        setCurrentId(null);
        setTitle("");
        setCategory("Pertanian");
        setDescription("");
        setImageFiles([]);
        setImagePreviews([]);
        setExistingImageUrls([]);
        setError(null);
        setSuccess(null);
    };

    const handleEdit = (item: Potensi) => {
        setIsEditing(true);
        setCurrentId(item.id);
        setTitle(item.title);
        setCategory(item.category);
        setDescription(item.description);
        setImageFiles([]);
        setImagePreviews([]);
        setExistingImageUrls(item.photo_url ? item.photo_url.split(',').filter(u => u) : []);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            setImageFiles(prev => [...prev, ...files]);

            files.forEach(file => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setImagePreviews(prev => [...prev, reader.result as string]);
                };
                reader.readAsDataURL(file);
            });
        }
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragging(false);
        if (e.dataTransfer.files) {
            const files = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith('image/'));
            setImageFiles(prev => [...prev, ...files]);

            files.forEach(file => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setImagePreviews(prev => [...prev, reader.result as string]);
                };
                reader.readAsDataURL(file);
            });
        }
    };

    const removeNewImage = (index: number) => {
        setImageFiles(prev => prev.filter((_, i) => i !== index));
        setImagePreviews(prev => prev.filter((_, i) => i !== index));
    };

    const removeExistingImage = (index: number) => {
        setExistingImageUrls(prev => prev.filter((_, i) => i !== index));
    };

    const handleDelete = async (id: string, photo_url: string) => {
        if (!window.confirm("Hapus potensi ini secara permanen?")) return;

        // Try Delete image from storage
        if (photo_url && photo_url.includes('umkm')) {
            const pathUrl = photo_url.split('/umkm/')[1];
            if (pathUrl) await supabase.storage.from("umkm").remove([pathUrl]);
        }

        const { error: err } = await supabase.from("potentials").delete().eq("id", id);
        if (err) setError(err.message);
        else {
            setItems(items.filter(i => i.id !== id));
            showSuccess("Data potensi berhasil dihapus.");
        }
    };

    const showSuccess = (msg: string) => {
        setSuccess(msg);
        setTimeout(() => setSuccess(null), 3000);
    };

    const uploadImageContent = async (file: File): Promise<string | null> => {
        const fileExt = file.name.split('.').pop();
        const randId = Math.random().toString(36).substring(2, 9);
        const fileName = `${Date.now()}_${randId}.${fileExt}`;
        const { error: uploadError } = await supabase.storage
            .from("umkm")
            .upload(`${fileName}`, file, { upsert: true });

        if (uploadError) {
            setError(`Gagal mengunggah gambar ${file.name}: ` + uploadError.message);
            return null;
        }

        const { data: { publicUrl } } = supabase.storage.from("umkm").getPublicUrl(`${fileName}`);
        return publicUrl;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setError(null);

        try {
            let newUrls: string[] = [];
            if (imageFiles.length > 0) {
                const uploadPromises = imageFiles.map(file => uploadImageContent(file));
                const uploadedUrls = await Promise.all(uploadPromises);

                newUrls = uploadedUrls.filter((url): url is string => url !== null);
                if (newUrls.length === 0 && imageFiles.length > 0) {
                    throw new Error("Semua unggahan gambar baru gagal.");
                }
            }

            const finalUrls = [...existingImageUrls, ...newUrls];
            const finalPhotoUrl = finalUrls.length > 0 ? finalUrls.join(",") : "";

            const payload = {
                title,
                category,
                description,
                photo_url: finalPhotoUrl,
                updated_at: new Date().toISOString()
            };

            const isDummyId = currentId && currentId.toString().startsWith('default-');

            if (currentId && !isDummyId) {
                const { error: updateErr } = await supabase.from("potentials").update(payload).eq("id", currentId);
                if (updateErr) throw updateErr;
                showSuccess("Data potensi diperbarui!");
            } else {
                const { error: insertErr } = await supabase.from("potentials").insert(payload);
                if (insertErr) throw insertErr;
                showSuccess("Data potensi ditambahkan!");
            }

            resetForm();
            fetchItems();
        } catch (err: any) {
            setError(err.message || "Terjadi kesalahan sistem.");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="max-w-6xl">
            <div className="mb-8 flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Manajemen Potensi Desa</h1>
                    <p className="text-gray-600">Kelola daftar potensi pertanian, UMKM, pariwisata yang ditampilkan di website.</p>
                </div>
                {!isEditing && (
                    <button
                        onClick={() => { resetForm(); setIsEditing(true); }}
                        className="bg-primary text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-primary/90 flex gap-2 items-center"
                    >
                        <Plus size={20} /> Tambah Potensi
                    </button>
                )}
            </div>

            {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 flex items-start gap-3">
                    <X className="w-5 h-5 shrink-0 mt-0.5" />
                    <div><p className="font-semibold">Galat Sistem</p><p className="text-sm opacity-90">{error}</p></div>
                </div>
            )}

            {success && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 shrink-0" />
                    <p className="font-semibold">{success}</p>
                </div>
            )}

            {isEditing && (
                <div className="bg-white p-6 md:p-8 rounded-2xl border shadow-sm mb-12 animate-in fade-in slide-in-from-top-4">
                    <div className="flex justify-between items-center mb-6 border-b pb-4">
                        <h3 className="text-xl font-bold text-gray-900">{currentId ? 'Edit Potensi' : 'Tambah Potensi Baru'}</h3>
                        <button onClick={resetForm} className="text-gray-400 hover:text-gray-600"><X size={24} /></button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Nama Produk / Potensi</label>
                                <input required type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" placeholder="Contoh: Pisang Saleh" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Kategori</label>
                                <select required value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none bg-white">
                                    <option value="Pertanian">Pertanian</option>
                                    <option value="Peternakan">Peternakan</option>
                                    <option value="Pariwisata">Pariwisata</option>
                                    <option value="UMKM">UMKM</option>
                                    <option value="Lainnya">Lainnya</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Deskripsi Lengkap</label>
                            <textarea required rows={4} value={description} onChange={(e) => setDescription(e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none resize-y" placeholder="Deskripsikan potensi ini secara mendetail..." />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Foto Galeri Potensi (Bisa Pilih Banyak)</label>
                            <input type="file" ref={fileInputRef} onChange={handleImageChange} accept="image/*" multiple className="hidden" />
                            <div
                                onClick={() => fileInputRef.current?.click()}
                                onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                                onDragLeave={() => setDragging(false)}
                                onDrop={handleDrop}
                                className={`w-full min-h-[150px] p-6 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition ${dragging ? 'border-primary bg-primary/5' : (existingImageUrls.length > 0 || imagePreviews.length > 0) ? 'border-primary/50' : 'border-gray-300 hover:border-primary bg-gray-50'}`}
                            >
                                {(existingImageUrls.length > 0 || imagePreviews.length > 0) ? (
                                    <div className="w-full">
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4" onClick={(e) => e.stopPropagation()}>
                                            {existingImageUrls.map((url, idx) => (
                                                <div key={`existing-${idx}`} className="relative group rounded-xl overflow-hidden border aspect-[4/3]">
                                                    <img src={url} alt={`existing-${idx}`} className="w-full h-full object-cover" />
                                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                                                        <button type="button" onClick={() => removeExistingImage(idx)} className="bg-red-500 text-white rounded-full p-2 hover:bg-red-600 shadow-sm"><X size={16} /></button>
                                                    </div>
                                                </div>
                                            ))}
                                            {imagePreviews.map((preview, idx) => (
                                                <div key={`new-${idx}`} className="relative group rounded-xl overflow-hidden border aspect-[4/3]">
                                                    <img src={preview} alt={`preview-${idx}`} className="w-full h-full object-cover" />
                                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                                                        <button type="button" onClick={() => removeNewImage(idx)} className="bg-red-500 text-white rounded-full p-2 hover:bg-red-600 shadow-sm"><X size={16} /></button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <p className="text-center text-sm text-gray-500 mt-4 underline decoration-dashed cursor-pointer">Klik di ruang kosong ini untuk menambah gambar lagi</p>
                                    </div>
                                ) : (
                                    <>
                                        <ImageIcon size={32} className="text-gray-400 mb-2" />
                                        <span className="text-sm font-medium text-gray-500">Klik / Tarik banyak gambar ke sini</span>
                                    </>
                                )}
                            </div>
                        </div>

                        <div className="pt-4 border-t flex justify-end gap-3">
                            <button type="button" onClick={resetForm} className="px-6 py-2.5 rounded-xl font-semibold text-gray-600 hover:bg-gray-100 transition">Batal</button>
                            <button type="submit" disabled={saving || (existingImageUrls.length === 0 && imagePreviews.length === 0)} className="bg-primary text-white font-semibold px-8 py-2.5 rounded-xl hover:bg-primary/90 transition flex items-center justify-center gap-2">
                                {saving ? <><Loader2 size={18} className="animate-spin" /> Menyimpan</> : <><Save size={18} /> Simpan Data</>}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {!isEditing && (
                <div className="bg-white border rounded-2xl shadow-sm overflow-hidden">
                    {loading ? (
                        <div className="p-12 text-center text-gray-500"><Loader2 size={32} className="animate-spin mx-auto mb-3" /> Memuat data...</div>
                    ) : items.length === 0 ? (
                        <div className="p-12 text-center text-gray-500">Belum ada potensi terdaftar.</div>
                    ) : (
                        <div className="divide-y">
                            {items.map((item) => (
                                <div key={item.id} className="p-6 flex flex-col sm:flex-row gap-6 items-start hover:bg-gray-50 transition">
                                    <div className="w-full sm:w-48 aspect-[4/3] bg-gray-100 rounded-xl overflow-hidden shrink-0 relative">
                                        <img src={item.photo_url ? item.photo_url.split(',')[0] : '/images/backgroundberanda.jpeg'} alt={item.title} className="w-full h-full object-cover" />
                                        {(item.photo_url && item.photo_url.split(',').length > 1) && (
                                            <div className="absolute bottom-2 right-2 bg-black/60 text-white text-[10px] font-bold px-2 py-1 rounded-md flex items-center gap-1 backdrop-blur-sm">
                                                <ImageIcon size={10} /> +{item.photo_url.split(',').length - 1}
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <span className="bg-primary/10 text-primary px-3 py-1 rounded text-xs font-bold uppercase tracking-wider mb-2 inline-block">{item.category}</span>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                                        <p className="text-gray-600 text-sm line-clamp-3">{item.description}</p>
                                    </div>
                                    <div className="flex sm:flex-col gap-2 shrink-0">
                                        <button onClick={() => handleEdit(item)} className="p-2.5 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-xl transition" title="Edit"><Edit size={18} /></button>
                                        <button onClick={() => handleDelete(item.id, item.photo_url)} className="p-2.5 text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition" title="Hapus"><Trash2 size={18} /></button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
