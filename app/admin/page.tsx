export default function AdminDashboard() {
    const stats = [
        { label: "Total Berita", value: "24", icon: "📰", color: "bg-blue-100 text-blue-600 border-blue-200" },
        { label: "Agenda Mendatang", value: "3", icon: "📅", color: "bg-green-100 text-green-600 border-green-200" },
        { label: "UMKM Terdaftar", value: "15", icon: "📦", color: "bg-purple-100 text-purple-600 border-purple-200" },
        { label: "Pesan Masuk", value: "8", icon: "✉️", color: "bg-orange-100 text-orange-600 border-orange-200" },
    ];

    return (
        <div className="max-w-6xl">
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">Selayang Pandang</h1>
                <p className="text-gray-600">Selamat datang kembali! Berikut ringkasan statistik website Desa Nambaru saat ini.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {stats.map((stat, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-2xl border shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
                        <div>
                            <p className="text-gray-500 font-medium mb-1">{stat.label}</p>
                            <h3 className="text-4xl font-black text-gray-900">{stat.value}</h3>
                        </div>
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl border shadow-sm ${stat.color}`}>
                            {stat.icon}
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white border rounded-2xl shadow-sm p-8">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold">Aktivitas Terakhir</h3>
                        <button className="text-primary text-sm font-semibold hover:underline">Lihat Semua</button>
                    </div>
                    <div className="space-y-6">
                        {[
                            { activity: "Menambahkan berita baru Pembangunan Irigasi", time: "2 jam yang lalu" },
                            { activity: "Memperbarui foto Kepala Desa", time: "5 jam yang lalu" },
                            { activity: "Mendaftarkan UMKM Kopi Nambaru", time: "1 hari yang lalu" },
                            { activity: "Mengubah konfigurasi Kontak Desa", time: "2 hari yang lalu" }
                        ].map((act, i) => (
                            <div key={i} className="flex gap-4 items-start pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                                <div className="w-2.5 h-2.5 rounded-full bg-primary mt-2 shrink-0"></div>
                                <div>
                                    <h4 className="text-gray-900 font-semibold mb-1">{act.activity}</h4>
                                    <p className="text-sm text-gray-500">{act.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white border rounded-2xl shadow-sm p-8">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold">Jalan Pintas</h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-6 border border-gray-100 rounded-xl hover:border-primary hover:bg-primary/5 transition flex flex-col gap-3 cursor-pointer group">
                            <span className="text-3xl bg-blue-50 w-12 h-12 flex items-center justify-center rounded-lg group-hover:scale-110 transition-transform">✍️</span>
                            <span className="font-bold text-gray-800">Tulis Berita</span>
                            <span className="text-xs text-gray-500">Buat kabar terbaru untuk warga</span>
                        </div>
                        <div className="p-6 border border-gray-100 rounded-xl hover:border-primary hover:bg-primary/5 transition flex flex-col gap-3 cursor-pointer group">
                            <span className="text-3xl bg-orange-50 w-12 h-12 flex items-center justify-center rounded-lg group-hover:scale-110 transition-transform">🏪</span>
                            <span className="font-bold text-gray-800">UMKM Baru</span>
                            <span className="text-xs text-gray-500">Daftarkan usaha masyarakat</span>
                        </div>
                        <div className="p-6 border border-gray-100 rounded-xl hover:border-primary hover:bg-primary/5 transition flex flex-col gap-3 cursor-pointer group">
                            <span className="text-3xl bg-green-50 w-12 h-12 flex items-center justify-center rounded-lg group-hover:scale-110 transition-transform">📅</span>
                            <span className="font-bold text-gray-800">Buat Agenda</span>
                            <span className="text-xs text-gray-500">Acara atau musyawarah</span>
                        </div>
                        <div className="p-6 border border-gray-100 rounded-xl hover:border-primary hover:bg-primary/5 transition flex flex-col gap-3 cursor-pointer group">
                            <span className="text-3xl bg-purple-50 w-12 h-12 flex items-center justify-center rounded-lg group-hover:scale-110 transition-transform">⚙️</span>
                            <span className="font-bold text-gray-800">Pengaturan</span>
                            <span className="text-xs text-gray-500">Ubah info dan konfigurasi form</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
