"use client";
import { useState, useEffect } from "react";
import { Save, Loader2, X, CheckCircle2, Plus, Trash2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface DusunStat {
    group: string;
    count: number;
}

export default function AdminStatistik() {
    const [id, setId] = useState<string | null>(null);
    const [population, setPopulation] = useState(3365);
    const [families, setFamilies] = useState(972);
    const [hamlets, setHamlets] = useState(6);
    const [totalRt, setTotalRt] = useState(12);
    const [dusunData, setDusunData] = useState<DusunStat[]>([
        { group: "Dusun I", count: 923 },
        { group: "Dusun II (Kalae)", count: 947 },
        { group: "Dusun III (Trimasari)", count: 572 },
        { group: "Dusun IV (Masiana)", count: 422 },
        { group: "Dusun V (Bonebula)", count: 436 },
        { group: "Dusun VI (Toini)", count: 94 },
    ]);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const fetchStats = async () => {
            setLoading(true);
            const { data, error: err } = await supabase.from("village_statistics").select("*").limit(1).single();
            if (err) {
                if (err.code !== "PGRST116") {
                    setError(err.message);
                }
            } else if (data) {
                setId(data.id);
                setPopulation(data.population || 0);
                setFamilies(data.families || 0);
                setHamlets(data.hamlets || 0);

                if (data.rt_rw) {
                    try {
                        const parsed = JSON.parse(data.rt_rw);
                        if (parsed.total_rt) setTotalRt(parsed.total_rt);
                        if (parsed.dusun_data) setDusunData(parsed.dusun_data);
                    } catch (e) {
                        // fallback if it wasn't JSON
                        setTotalRt(parseInt(data.rt_rw) || 0);
                    }
                }
            }
            setLoading(false);
        };
        fetchStats();
    }, []);

    const handleAddDusun = () => {
        setDusunData([...dusunData, { group: `Dusun Baru ${dusunData.length + 1}`, count: 0 }]);
    };

    const handleRemoveDusun = (index: number) => {
        setDusunData(dusunData.filter((_, i) => i !== index));
    };

    const handleDusunChange = (index: number, field: keyof DusunStat, value: string | number) => {
        const newData = [...dusunData];
        newData[index] = { ...newData[index], [field]: value };
        setDusunData(newData);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setError(null);
        setSuccess(false);

        const rt_rw_json = JSON.stringify({
            total_rt: totalRt,
            dusun_data: dusunData
        });

        const payload = {
            population: population,
            families: families,
            hamlets: hamlets,
            rt_rw: rt_rw_json,
            updated_at: new Date().toISOString()
        };

        let err;
        if (id) {
            const { error: updateErr } = await supabase.from("village_statistics").update(payload).eq("id", id);
            err = updateErr;
        } else {
            const { data, error: insertErr } = await supabase.from("village_statistics").insert(payload).select().single();
            err = insertErr;
            if (data) setId(data.id);
        }

        if (err) {
            setError(err.message);
        } else {
            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);
        }
        setSaving(false);
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-gray-500">
                <Loader2 size={32} className="animate-spin mb-4 text-primary" />
                <p>Memuat pengaturan statistik...</p>
            </div>
        );
    }

    return (
        <div className="max-w-4xl">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Data & Statistik Desa</h1>
                <p className="text-gray-600">Sesuaikan angka populasi, keluarga, dan komposisi tiap dusun agar grafik tabel data publik tetap sinkron real-time.</p>
            </div>

            {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 flex items-start gap-3">
                    <X className="w-5 h-5 shrink-0 mt-0.5" />
                    <div>
                        <p className="font-semibold">Gagal menyimpan perubahan</p>
                        <p className="text-sm opacity-90">{error}</p>
                    </div>
                </div>
            )}

            {success && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 shrink-0" />
                    <p className="font-semibold">Data demografi berhasil diperbarui!</p>
                </div>
            )}

            <form onSubmit={handleSave} className="space-y-8">
                <div className="bg-white p-6 md:p-8 rounded-2xl border shadow-sm">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 border-b pb-4">Statistik Utama (Card Beranda)</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Total Penduduk (Jiwa)</label>
                            <input
                                type="number"
                                value={population || ''}
                                onChange={(e) => setPopulation(parseInt(e.target.value) || 0)}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Kepala Keluarga</label>
                            <input
                                type="number"
                                value={families || ''}
                                onChange={(e) => setFamilies(parseInt(e.target.value) || 0)}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Jumlah RT</label>
                            <input
                                type="number"
                                value={totalRt || ''}
                                onChange={(e) => setTotalRt(parseInt(e.target.value) || 0)}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Jumlah Lingkungan / Dusun</label>
                            <input
                                type="number"
                                value={hamlets || ''}
                                onChange={(e) => setHamlets(parseInt(e.target.value) || 0)}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                            />
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 md:p-8 rounded-2xl border shadow-sm">
                    <div className="flex justify-between items-center mb-6 border-b pb-4">
                        <h3 className="text-xl font-bold text-gray-900">Populasi Per Dusun (Grafik)</h3>
                        <button type="button" onClick={handleAddDusun} className="bg-primary/10 text-primary px-4 py-2 rounded-lg font-semibold hover:bg-primary/20 transition flex gap-2 items-center text-sm">
                            <Plus size={16} /> Tambah Dusun
                        </button>
                    </div>

                    <div className="space-y-4">
                        {dusunData.length === 0 && (
                            <p className="text-gray-400 text-center py-4">Belum ada blok data dusun yang tercatat.</p>
                        )}
                        {dusunData.map((dusun, idx) => (
                            <div key={idx} className="flex gap-4 items-end bg-gray-50 p-4 rounded-xl border">
                                <div className="flex-1">
                                    <label className="block text-xs font-semibold text-gray-500 mb-1">Nama Kelompok / Dusun</label>
                                    <input
                                        type="text"
                                        value={dusun.group}
                                        onChange={(e) => handleDusunChange(idx, "group", e.target.value)}
                                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none"
                                        placeholder="Contoh: Dusun II (Kalae)"
                                    />
                                </div>
                                <div className="w-40">
                                    <label className="block text-xs font-semibold text-gray-500 mb-1">Jumlah Jiwa</label>
                                    <input
                                        type="number"
                                        value={dusun.count || ''}
                                        onChange={(e) => handleDusunChange(idx, "count", parseInt(e.target.value) || 0)}
                                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none"
                                    />
                                </div>
                                <button type="button" onClick={() => handleRemoveDusun(idx)} className="p-3 text-red-500 bg-red-50 hover:bg-red-100 rounded-lg transition" title="Hapus">
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex justify-end gap-3 sticky bottom-4">
                    <button
                        type="submit"
                        disabled={saving}
                        className="bg-primary text-white font-semibold px-8 py-3 rounded-xl hover:bg-primary/90 transition shadow-lg flex items-center justify-center gap-2 min-w-[200px]"
                    >
                        {saving ? (
                            <><Loader2 size={20} className="animate-spin" /> Menyimpan...</>
                        ) : (
                            <><Save size={20} /> Simpan Data Penduduk</>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
