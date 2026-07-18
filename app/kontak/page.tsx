"use client";
import { Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";

export default function KontakDesa() {
    const [nama, setNama] = useState('');
    const [kontak, setKontak] = useState('');
    const [pesan, setPesan] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const teks = `Halo Desa Nambaru,%0ANama: ${nama}%0AKontak: ${kontak}%0APesan: ${pesan}`;
        window.open(`https://wa.me/+6281234567890?text=${teks}`, '_blank');
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
                            <p className="text-gray-600 leading-relaxed">
                                Jalan Nambaru Raya No. 1<br />
                                Kecamatan Contoh, Kabupaten Contoh<br />
                                Provinsi Jawa Barat, 40123
                            </p>
                        </div>
                    </div>
                    <div className="bg-white p-8 rounded-2xl shadow-sm border flex gap-6 items-start">
                        <div className="bg-primary/10 p-4 rounded-xl text-primary">
                            <Phone className="w-8 h-8" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Telepon / WhatsApp</h3>
                            <p className="text-gray-600 leading-relaxed">
                                +62 812 3456 7890 (Layanan Warga)<br />
                                +62 812 0987 6543 (Kegawatdaruratan)
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
                                admin@nambaru.desa.id<br />
                                layanan@nambaru.desa.id
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
                        <button type="submit" className="mt-auto bg-primary text-white font-bold py-4 rounded-xl hover:bg-opacity-90 transition-all shadow-md">
                            Kirim Ke Desa
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
