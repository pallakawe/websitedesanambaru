const potentials = [
    { id: 1, title: "Pertanian Padi Organik", category: "Pertanian", desc: "Sawah produktif memanjang 100 hektar yang ditanami padi organik berkualitas tinggi tanpa pupuk kimia sintetis.", img: "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?ixlib=rb-4.0.3&w=800&q=80" },
    { id: 2, title: "Peternakan Sapi Perah", category: "Peternakan", desc: "Pusat peternakan sapi perah mandiri yang memproduksi susu segar berkualitas untuk pasar regional.", img: "https://images.unsplash.com/photo-1596733430284-f74370603735?ixlib=rb-4.0.3&w=800&q=80" },
    { id: 3, title: "Kerajinan Bambu & Kayu", category: "Ekonomi Kreatif", desc: "Masyarakat pengrajin lokal menghasilkan karya unik berbahan bambu dan limbah kayu yang diminati banyak wisatawan.", img: "https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?ixlib=rb-4.0.3&w=800&q=80" },
    { id: 4, title: "Wisata Air Terjun", category: "Pariwisata", desc: "Destinasi wisata alam tersembunyi yang menyajikan pesona air terjun jernih dengan suasana hutan asri.", img: "https://images.unsplash.com/photo-1506509741088-7510d9ce4546?ixlib=rb-4.0.3&w=800&q=80" },
];

export default function PotensiDesa() {
    return (
        <div className="container mx-auto px-4 py-12">
            <div className="text-center max-w-2xl mx-auto mb-16">
                <h1 className="text-4xl font-bold mb-4 text-primary">Potensi Desa</h1>
                <p className="text-gray-600">
                    Eksplorasi sumber daya unggulan Desa Nambaru yang menjadi tumpuan ekonomi dan daya tarik wisata.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
                {potentials.map((item) => (
                    <div key={item.id} className="group relative rounded-3xl overflow-hidden shadow-lg flex aspect-[4/3] cursor-pointer">
                        <img src={item.img} alt={item.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent flex flex-col justify-end p-8 text-white transition-opacity duration-500">
                            <span className="bg-primary hover:bg-primary/90 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded w-max mb-3 backdrop-blur-sm transition-colors shadow-sm">
                                {item.category}
                            </span>
                            <h3 className="text-2xl font-bold mb-2 group-hover:text-primary-foreground transition-colors">{item.title}</h3>
                            <p className="text-gray-200 text-sm line-clamp-2 md:line-clamp-3">
                                {item.desc}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
