const newsList = [
    { id: 1, title: "Gotong Royong Bersih Desa Menjelang Hari Raya", date: "12 Agustus 2026", excerpt: "Kegiatan rutin bulanan masyarakat desa melakukan kerja bakti membersihkan lingkungan.", img: "https://images.unsplash.com/photo-1592888636906-8c50543fb5dd?ixlib=rb-4.0.3&w=600&q=80" },
    { id: 2, title: "Penyaluran Bantuan Langsung Tunai (BLT) Tahap 3", date: "10 Agustus 2026", excerpt: "Pemerintah Desa Nambaru menyalurkan BLT Dana Desa kepada 120 Keluarga Penerima Manfaat.", img: "https://images.unsplash.com/photo-1560278772-40a2bbdc3265?ixlib=rb-4.0.3&w=600&q=80" },
    { id: 3, title: "Lomba Senam Ibu-Ibu PKK se-Kecamatan", date: "5 Agustus 2026", excerpt: "Ibu-ibu PKK Desa Nambaru berhasil meraih juara pertama dalam lomba senam.", img: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixlib=rb-4.0.3&w=600&q=80" },
    { id: 4, title: "Pembangunan Saluran Irigasi Petani", date: "1 Agustus 2026", excerpt: "Proyek pembaruan saluran irigasi guna mendukung hasil panen padi unggulan desa.", img: "https://images.unsplash.com/photo-1505929606132-756ef26e0be4?ixlib=rb-4.0.3&w=600&q=80" },
];

export default function BeritaDesa() {
    return (
        <div className="container mx-auto px-4 py-12">
            <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
                <div>
                    <h1 className="text-4xl font-bold text-primary mb-2 text-center md:text-left">Berita Desa</h1>
                    <p className="text-gray-600 text-center md:text-left">Informasi terbaru seputar kegiatan dan pengumuman Desa Nambaru.</p>
                </div>
                <div className="w-full md:w-80">
                    <input type="search" placeholder="Cari berita..." className="w-full px-5 py-3 rounded-full border border-gray-200 outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all shadow-sm" />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {newsList.map((news) => (
                    <div key={news.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border group flex flex-col sm:flex-row hover:border-primary transition-all hover:shadow-md">
                        <div className="w-full sm:w-2/5 h-48 sm:h-auto bg-muted overflow-hidden flex-shrink-0">
                            <img src={news.img} alt={news.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        </div>
                        <div className="p-6 flex flex-col justify-center flex-1">
                            <p className="text-xs font-bold tracking-wider text-primary mb-2 uppercase">{news.date}</p>
                            <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors line-clamp-2">{news.title}</h3>
                            <p className="text-gray-600 text-sm mb-4 line-clamp-2">{news.excerpt}</p>
                            <a href={`/berita/${news.id}`} className="text-sm font-semibold text-primary hover:underline mt-auto inline-flex items-center gap-1">
                                Baca Selengkapnya →
                            </a>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}
