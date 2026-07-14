const umkmList = [
    { id: 1, name: "Kopi Nambaru Asli", owner: "Ibu Siti", desc: "Kopi robusta petik merah asli dari perkebunan Nambaru. Drosting dengan tingkat kematangan medium.", price: "Rp 35.000 / 200g", img: "https://images.unsplash.com/photo-1559525839-b184a4d698c7?ixlib=rb-4.0.3&w=600&q=80" },
    { id: 2, name: "Keripik Singkong Renyah", owner: "Pak Joni", desc: "Keripik singkong dengan berbagai varian rasa: balado, pedas manis, dan asin gurih.", price: "Rp 15.000 / bungkus", img: "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?ixlib=rb-4.0.3&w=600&q=80" },
    { id: 3, name: "Madu Hutan Liar", owner: "Bapak Yono", desc: "Madu asli dari hutan sekitar desa, tanpa campuran gula dan pengawet buatan.", price: "Rp 75.000 / botol", img: "https://images.unsplash.com/photo-1587049352847-81a56d773cac?ixlib=rb-4.0.3&w=600&q=80" },
    { id: 4, name: "Kerajinan Anyaman Bambu", owner: "Bu Darmi", desc: "Tampah, bakul, dan tutup saji yang dianyam rapi menggunakan bambu pilihan.", price: "Mulai Rp 20.000", img: "https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?ixlib=rb-4.0.3&w=600&q=80" }
];

export default function UMKMDesa() {
    return (
        <div className="container mx-auto px-4 py-12">
            <div className="text-center max-w-2xl mx-auto mb-16">
                <h1 className="text-4xl font-bold mb-4 text-primary">UMKM Unggulan Desa</h1>
                <p className="text-gray-600">
                    Dukung perekonomian lokal dengan membeli produk-produk unggulan dari warga Desa Nambaru. Kualitas terjamin dengan harga yang bersahabat.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {umkmList.map((item) => (
                    <div key={item.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border group hover:border-primary transition-all flex flex-col hover:shadow-md">
                        <div className="h-48 overflow-hidden bg-muted">
                            <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        </div>
                        <div className="p-5 flex-1 flex flex-col">
                            <h3 className="text-xl font-bold text-gray-900 mb-1">{item.name}</h3>
                            <p className="text-sm text-gray-500 mb-3">Oleh: <span className="font-semibold text-primary">{item.owner}</span></p>
                            <p className="text-gray-600 text-sm mb-6 flex-1 line-clamp-3">{item.desc}</p>
                            <div className="flex items-center justify-between mt-auto">
                                <span className="font-bold text-primary">{item.price}</span>
                                <button className="bg-primary/10 text-primary hover:bg-primary hover:text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
                                    Hubungi
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
