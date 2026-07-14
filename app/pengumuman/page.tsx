export default function PengumumanDesa() {
    const announcements = [
        { id: 1, title: "Pendaftaran Bantuan Bedah Rumah Tahun 2026", date: "10 Agustus 2026", desc: "Bagi warga yang rumahnya masuk dalam kategori tidak layak huni, silakan mendaftar ke kantor desa dengan membawa KK dan KTP paling lambat 30 Agustus 2026." },
        { id: 2, title: "Pemutihan Pajak Kendaraan Bermotor", date: "5 Agustus 2026", desc: "Terdapat program pemutihan pajak kendaraan bermotor yang berlangsung di Samsat Keliling di halaman Balai Desa pada tanggal 12 Agustus 2026." },
        { id: 3, title: "Pengambilan Sertifikat Tanah PTSL tahap 2", date: "1 Agustus 2026", desc: "Sertifikat tanah program PTSL tahap 2 sudah jadi dan bisa diambil di Balai Desa setiap jam kerja oleh pemohon langsung tanpa diwakilkan." },
    ];

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="text-center max-w-2xl mx-auto mb-16">
                <h1 className="text-4xl font-bold mb-4 text-primary">Pengumuman Desa</h1>
                <p className="text-gray-600">
                    Informasi penting dan pemberitahuan resmi dari Pemerintah Desa Nambaru untuk seluruh warga masyarakat.
                </p>
            </div>

            <div className="max-w-4xl mx-auto space-y-6">
                {announcements.map((item) => (
                    <div key={item.id} className="bg-white rounded-2xl p-8 border-l-4 border-l-primary shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-xl font-bold text-gray-900 leading-tight">{item.title}</h3>
                            <span className="shrink-0 text-xs font-bold bg-primary/10 text-primary px-3 py-1 rounded-full whitespace-nowrap ml-4">
                                {item.date}
                            </span>
                        </div>
                        <p className="text-gray-600 leading-relaxed text-sm md:text-base">{item.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
