const potentials = [
  {
    id: 1,
    title: "Pertanian Padi Organik",
    category: "Pertanian",
    desc: "Sawah Produktif yang memiliki hamparan luas di desa Nambaru. Sebanyak 200 hektar yang terbentang di wilayah dusun III, dusun I, dusun IV, serta dusun VI sebagai penopang beras di kecamatan Parigi Selatan.",
    img: "https://gokomodo.com/blog/4-jenis-sawah-di-indonesia-yang-perlu-kamu-tahu",
  },
  {
    id: 2,
    title: "Peternakan Ayam Potong",
    category: "Peternakan",
    desc: "Peternakan di Desa Nambaru didominasi oleh usaha peternakan ayam potong yang dikelola oleh pelaku UMKM setempat. Usaha ini berperan penting sebagai salah satu pemasok daging ayam untuk memenuhi kebutuhan masyarakat serta mendukung ketersediaan bahan pangan di pasaran. Lokasi peternakan tersebar di Dusun III dan Dusun IV, sehingga menjadi salah satu sektor unggulan yang berkontribusi terhadap perekonomian Desa Nambaru.",
    img: "https://images.unsplash.com/photo-1596733430284-f74370603735?ixlib=rb-4.0.3&w=800&q=80",
  },
  {
    id: 3,
    title: "Peternakan Sapi",
    category: "Peternakan",
    desc: "Untuk deskripsi tunggu pengambilan data.",
    img: "https://images.unsplash.com/photo-1596733430284-f74370603735?ixlib=rb-4.0.3&w=800&q=80",
  },
  {
    id: 4,
    title: "Gula Kelapa Nambaru",
    category: "UMKM",
    desc: "Desa Nambaru memiliki potensi Usaha Mikro, Kecil, dan Menengah (UMKM) yang menjadi produk unggulan, yaitu gula kelapa dan gula taplok. Kedua produk ini diolah dari nira kelapa yang berasal dari perkebunan kelapa milik masyarakat Desa Nambaru. Dengan cita rasa yang manis khas dan gurih alami, gula kelapa dan gula taplok tidak hanya dikonsumsi sebagai pemanis tradisional, tetapi juga dimanfaatkan sebagai bahan baku dalam pembuatan kecap. Keberadaan UMKM ini menjadi salah satu penopang perekonomian masyarakat sekaligus mencerminkan potensi lokal Desa Nambaru yang layak untuk terus dikembangkan.",
    img: "https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?ixlib=rb-4.0.3&w=800&q=80",
  },
  {
    id: 5,
    title: "Pisang Saleh",
    category: "UMKM",
    desc: "Menunggu Deskripsi dari turlap.",
    img: "https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?ixlib=rb-4.0.3&w=800&q=80",
  },
  {
    id: 6,
    title: "Wisata Bendungan Air",
    category: "Pariwisata",
    desc: "Destinasi wisata alam yang ada di desa Nambaru, yaitu wisata bendungan air Mouti terletak di dusun V Bonebula yang menyajikan alam yang sangat asri, air yang begitu jernih dengan kicauan burung yang ada di sekitar bendungan tersebut",
    img: "https://images.unsplash.com/photo-1506509741088-7510d9ce4546?ixlib=rb-4.0.3&w=800&q=80",
  },
  {
    id: 7,
    title: "Pantai",
    category: "Pariwisata",
    desc: "Menunggu deskripsi dari turlap",
    img: "https://images.unsplash.com/photo-1506509741088-7510d9ce4546?ixlib=rb-4.0.3&w=800&q=80",
  },
];

export default function PotensiDesa() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h1 className="text-4xl font-bold mb-4 text-primary">Potensi Desa</h1>
        <p className="text-gray-600">
          Eksplorasi sumber daya unggulan Desa Nambaru yang menjadi tumpuan
          ekonomi dan daya tarik wisata.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
        {potentials.map((item) => (
          <div
            key={item.id}
            className="group relative rounded-3xl overflow-hidden shadow-lg flex aspect-[4/3] cursor-pointer"
          >
            <img
              src={item.img}
              alt={item.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent flex flex-col justify-end p-8 text-white transition-opacity duration-500">
              <span className="bg-primary hover:bg-primary/90 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded w-max mb-3 backdrop-blur-sm transition-colors shadow-sm">
                {item.category}
              </span>
              <h3 className="text-2xl font-bold mb-2 group-hover:text-primary-foreground transition-colors">
                {item.title}
              </h3>
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
