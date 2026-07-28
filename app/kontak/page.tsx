"use client";
import { Mail, MapPin, Phone, CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function KontakDesa() {
    const [nama, setNama] = useState('');
    const [kontak, setKontak] = useState('');
    const [pesan, setPesan] = useState('');
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [errorMsg, setErrorMsg] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!nama.trim() || !kontak.trim() || !pesan.trim()) return;

        setLoading(true);
        setStatus('idle');

        const { error } = await supabase.from('messages').insert({
            nama: nama.trim(),
            kontak: kontak.trim(),
            pesan: pesan.trim()
        });

        if (error) {
            console.error(error);
            setErrorMsg("Gagal mengirim pesan. Silakan coba beberapa saat lagi.");
            setStatus('error');
        } else {
            setNama('');
            setKontak('');
            setPesan('');
            setStatus('success');

            // Hilangkan success message setelah 5 detik
            setTimeout(() => {
                setStatus('idle');
            }, 5000);
        }

        setLoading(false);
    };
    return (
        <div className="container mx-auto px-4 py-12">
            <div className="text-center max-w-2xl mx-auto mb-16">
                <h1 className="text-4xl font-bold mb-4 text-primary">Hubungi Kami</h1>
                <p className="text-gray-600">
                    Sampaikan pertanyaan, kritik, maupun saran. Kami selalu terbuka untuk mendengarkan masukan demi kemajuan Desa Nambaru.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                <div className="space-y-8">
                    <div className="bg-white p-8 rounded-2xl shadow-sm border flex gap-6 items-start">
                        <div className="bg-primary/10 p-4 rounded-xl text-primary">
                            <MapPin className="w-8 h-8" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Alamat Balai Desa</h3>
                            <p className="text-gray-600 leading-relaxed font-normal">
                                Kantor Kepala Desa Nambaru Jl. Balai Desa<br />
                                Kecamatan Parigi Selatan, Kabupaten Parigi Moutong
                            </p>
                        </div>
                    </div>
                    <div className="bg-white p-8 rounded-2xl shadow-sm border flex gap-6 items-start">
                        <div className="bg-primary/10 p-4 rounded-xl text-primary">
                            <Phone className="w-8 h-8" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Telepon / WhatsApp</h3>
                            <p className="text-gray-600 leading-relaxed font-normal">
                                +62 823-4747-1117 (Layanan Warga)
                            </p>
                        </div>
                    </div>
                    <div className="bg-white p-8 rounded-2xl shadow-sm border flex gap-6 items-start">
                        <div className="bg-primary/10 p-4 rounded-xl text-primary">
                            <Mail className="w-8 h-8" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Email Resmi</h3>
                            <p className="text-gray-600 leading-relaxed">
                                desanambaru1@gmail.com
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-sm border flex flex-col">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Kirim Pesan</h3>
                    <form className="flex-1 flex flex-col gap-5" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Nama Lengkap</label>
                            <input type="text" value={nama} onChange={e => setNama(e.target.value)} required className="w-full px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all bg-gray-50 focus:bg-white" placeholder="Masukkan nama..." />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Email atau Nomor Telepon</label>
                            <input type="text" value={kontak} onChange={e => setKontak(e.target.value)} required className="w-full px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all bg-gray-50 focus:bg-white" placeholder="Masukkan kontak..." />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Pesan</label>
                            <textarea rows={4} value={pesan} onChange={e => setPesan(e.target.value)} required className="w-full px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all bg-gray-50 focus:bg-white resize-none" placeholder="Tulis pesan Anda di sini..."></textarea>
                        </div>
                        {status === 'success' && (
                            <div className="bg-green-50 text-green-700 p-4 rounded-xl text-sm border border-green-200 flex items-start gap-3">
                                <CheckCircle2 className="w-5 h-5 mt-0.5 shrink-0" />
                                <div>
                                    <p className="font-semibold">Pesan Berhasil Terkirim!</p>
                                    <p className="opacity-90">Terima kasih, pesan Anda telah masuk dengan aman ke kotak masuk administrasi desa kami.</p>
                                </div>
                            </div>
                        )}

                        {status === 'error' && (
                            <div className="bg-red-50 text-red-700 p-4 rounded-xl text-sm border border-red-200 flex items-start gap-3">
                                <AlertCircle className="w-5 h-5 mt-0.5 shrink-0" />
                                <div>
                                    <p className="font-semibold">Mohon Maaf</p>
                                    <p className="opacity-90">{errorMsg}</p>
                                </div>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading || status === 'success'}
                            className="mt-auto bg-primary text-white font-bold py-4 rounded-xl hover:bg-opacity-90 transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <>
                                    <Loader2 size={20} className="animate-spin" /> Mengirim Pesan...
                                </>
                            ) : status === 'success' ? (
                                <>
                                    <CheckCircle2 size={20} /> Terkirim
                                </>
                            ) : (
                                "Kirim Ke Admin Desa"
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
