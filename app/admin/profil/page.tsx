"use client";
import { useState, useEffect } from "react";
import { Save, Loader2, X, CheckCircle2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function AdminProfil() {
    const [id, setId] = useState<string | null>(null);
    const [history, setHistory] = useState("Desa Nambaru merupakan salah satu desa di Kecamatan Parigi Selatan, Kabupaten Parigi Moutong, yang berdiri sejak tahun 1938. Pada awalnya desa ini bernama Langganesi, kemudian diubah oleh Raja Parigi menjadi Desa Nambaru, nama yang tetap digunakan hingga sekarang. Secara administratif, Desa Nambaru terdiri atas enam dusun, yaitu Dusun I, Dusun II (Kalae), Dusun III (Trimasari), Dusun IV (Masiana), Dusun V (Bonebula), dan Dusun VI (Toini).\n\nDesa Nambaru dikenal memiliki potensi pertanian yang didukung oleh jaringan irigasi yang baik. Selain itu, pada tahun 2023 Desa Nambaru ditetapkan sebagai Desa Kerukunan di Kabupaten Parigi Moutong oleh Forum Kerukunan Umat Beragama (FKUB), sebagai wujud komitmen masyarakat dalam menjaga keharmonisan antarumat beragama.");
    const [vision, setVision] = useState("Terwujudnya tata kelola pemerintahan yang bersih, jujur, inovatif, transparan, dan akuntabel demi terciptanya Desa Nambaru yang maju, sejahtera, dan berbudaya.");
    const [mission, setMission] = useState("1. Memberikan pelayanan yang baik, dan informasi yang seluas-luasnya kepada masyarakat secara efektif dan efesien dengan menyediakan sarana publik.\n2. Meningkatkan pembangunan jalan desa, gapura batas desa, jalan pertanian, dan jalan lingkungan.\n3. Rehabilitasi dan optimalisasi fungsi balai Desa Nambaru.\n4. Penataan tempat rekreasi, agrowisata, dan edukasi pertanian.\n5. Meningkatkan pemberdayaan sumber air minum untuk PAM desa.\n6. Meningkatkan pembinaan, dan pemberdayaan kapasitas kepemudaan, dan olah raga.\n7. Pembentukan komunitas peduli lingkungan, dan penanggulangan bencana.");
    const [geography, setGeography] = useState("Desa Nambaru merupakan salah satu desa yang berada di wilayah Kecamatan Parigi Selatan, Kabupaten Parigi Moutong, Provinsi Sulawesi Tengah. Desa ini memiliki luas wilayah sekitar 2.527,13 hektare dan terbagi ke dalam enam dusun. Lokasinya berada pada koordinat 120.238003° Bujur Timur dan 0.944323° Lintang Selatan, dengan jarak sekitar 19 km dari ibu kota Kabupaten Parigi Moutong.\n\nSecara topografi, Desa Nambaru berada pada ketinggian 14–18 meter di atas permukaan laut. Sebagian besar wilayahnya berupa dataran yang dimanfaatkan sebagai kawasan permukiman, lahan pertanian, dan persawahan. Kondisi iklim di desa ini memiliki curah hujan rata-rata sekitar 1.554 mm per tahun dengan sekitar 120 hari hujan. Musim hujan umumnya berlangsung pada bulan Oktober hingga Maret, sedangkan musim kemarau terjadi pada bulan April hingga September. Suhu udara harian berkisar antara 24,2°C hingga 39,4°C, dengan rata-rata sekitar 34,7°C.");
    const [borders, setBorders] = useState("Utara: Desa Sumber Sari\nSelatan: Desa Tindaki\nTimur: Teluk Tomini\nBarat: Kecamatan Palolo, Kabupaten Sigi");

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            setLoading(true);
            const { data, error: err } = await supabase.from("village_profile").select("*").limit(1).single();
            if (err) {
                if (err.code !== "PGRST116") { // not found is okay, just empty
                    setError(err.message);
                }
            } else if (data) {
                setId(data.id);
                setHistory(data.history || "");
                setVision(data.vision || "");
                setMission(data.mission || "");
                setGeography(data.geography || "");
                setBorders(data.borders || "");
            }
            setLoading(false);
        };
        fetchProfile();
    }, []);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setError(null);
        setSuccess(false);

        const payload = {
            history: history,
            vision: vision,
            mission: mission,
            geography: geography,
            borders: borders,
            updated_at: new Date().toISOString()
        };

        let err;
        if (id) {
            const { error: updateErr } = await supabase.from("village_profile").update(payload).eq("id", id);
            err = updateErr;
        } else {
            const { data, error: insertErr } = await supabase.from("village_profile").insert(payload).select().single();
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
                <p>Memuat pengaturan profil desa...</p>
            </div>
        );
    }

    return (
        <div className="max-w-4xl">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Profil & Sejarah Desa</h1>
                <p className="text-gray-600">Sesuaikan informasi naratif, visi misi, dan kondisi demografis wilayah desa.</p>
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
                    <p className="font-semibold">Profil desa berhasil diperbarui!</p>
                </div>
            )}

            <form onSubmit={handleSave} className="space-y-8">
                <div className="bg-white p-6 md:p-8 rounded-2xl border shadow-sm">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 border-b pb-4">Sejarah & Narasi Utama</h3>
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Sejarah Desa</label>
                            <p className="text-xs text-gray-500 mb-2">Tuliskan narasi lengkap mengenai asal-usul terbentuknya desa hingga perkembangannya.</p>
                            <textarea
                                rows={8}
                                value={history}
                                onChange={(e) => setHistory(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-y"
                                placeholder="..."
                            />
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 md:p-8 rounded-2xl border shadow-sm">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 border-b pb-4">Visi & Misi Desa</h3>
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Visi</label>
                            <textarea
                                rows={3}
                                value={vision}
                                onChange={(e) => setVision(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-y"
                                placeholder="Contoh: Terwujudnya Desa Nambaru yang Maju, Rukun, dan Sejahtera..."
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Misi (Pisahkan tiap poin dengan Enter/Baris Baru)</label>
                            <textarea
                                rows={6}
                                value={mission}
                                onChange={(e) => setMission(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-y"
                                placeholder="1. Meningkatkan kualitas pelayanan...&#10;2. Memberdayakan ekonomi warga..."
                            />
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 md:p-8 rounded-2xl border shadow-sm">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 border-b pb-4">Kondisi Geografis Letak & Wilayah</h3>
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Letak Geografis</label>
                            <textarea
                                rows={5}
                                value={geography}
                                onChange={(e) => setGeography(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-y"
                                placeholder="Informasi letak LU/LS, curah hujan, bentuk wilayah..."
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Batas Wilayah</label>
                            <textarea
                                rows={4}
                                value={borders}
                                onChange={(e) => setBorders(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-y"
                                placeholder="Utara: Desa A&#10;Selatan: Desa B&#10;Timur: Laut X&#10;Barat: Gunung Y"
                            />
                        </div>
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
                            <><Save size={20} /> Simpan Perubahan Profil</>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
