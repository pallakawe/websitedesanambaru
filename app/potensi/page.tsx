"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Loader2, X, ChevronLeft, ChevronRight } from "lucide-react";

export default function PotensiDesa() {
  const [potentials, setPotentials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPotensi, setSelectedPotensi] = useState<any | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchPotentials = async () => {
      const { data, error } = await supabase.from("potentials").select("*").order("created_at", { ascending: false });

      const defaultPotentials = [
        {
          id: 'default-1',
          title: "Pertanian Padi Organik",
          category: "Pertanian",
          description: "Sawah Produktif yang memiliki hamparan luas di desa Nambaru. Sebanyak 200 hektar yang terbentang di wilayah dusun III, dusun I, dusun IV, serta dusun VI sebagai penopang beras di kecamatan Parigi Selatan.",
          photo_url: "https://gokomodo.com/blog/4-jenis-sawah-di-indonesia-yang-perlu-kamu-tahu",
        },
        {
          id: 'default-2',
          title: "Peternakan Ayam Potong",
          category: "Peternakan",
          description: "Peternakan di Desa Nambaru didominasi oleh usaha peternakan ayam potong yang dikelola oleh pelaku UMKM setempat. Usaha ini berperan penting sebagai salah satu pemasok daging ayam untuk memenuhi kebutuhan masyarakat serta mendukung ketersediaan bahan pangan di pasaran. Lokasi peternakan tersebar di Dusun III dan Dusun IV, sehingga menjadi salah satu sektor unggulan yang berkontribusi terhadap perekonomian Desa Nambaru.",
          photo_url: "https://images.unsplash.com/photo-1596733430284-f74370603735?ixlib=rb-4.0.3&w=800&q=80",
        },
        {
          id: 'default-3',
          title: "Peternakan Sapi",
          category: "Peternakan",
          description: "Untuk deskripsi tunggu pengambilan data.",
          photo_url: "https://images.unsplash.com/photo-1596733430284-f74370603735?ixlib=rb-4.0.3&w=800&q=80",
        },
        {
          id: 'default-4',
          title: "Gula Kelapa Nambaru",
          category: "UMKM",
          description: "Desa Nambaru memiliki potensi Usaha Mikro, Kecil, dan Menengah (UMKM) yang menjadi produk unggulan, yaitu gula kelapa dan gula taplok. Kedua produk ini diolah dari nira kelapa yang berasal dari perkebunan kelapa milik masyarakat Desa Nambaru. Dengan cita rasa yang manis khas dan gurih alami, gula kelapa dan gula taplok tidak hanya dikonsumsi sebagai pemanis tradisional, tetapi juga dimanfaatkan sebagai bahan baku dalam pembuatan kecap. Keberadaan UMKM ini menjadi salah satu penopang perekonomian masyarakat sekaligus mencerminkan potensi lokal Desa Nambaru yang layak untuk terus dikembangkan.",
          photo_url: "https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?ixlib=rb-4.0.3&w=800&q=80",
        },
        {
          id: 'default-5',
          title: "Wisata Bendungan Air",
          category: "Pariwisata",
          description: "Destinasi wisata alam yang ada di desa Nambaru, yaitu wisata bendungan air Mouti terletak di dusun V Bonebula yang menyajikan alam yang sangat asri, air yang begitu jernih dengan kicauan burung yang ada di sekitar bendungan tersebut",
          photo_url: "https://images.unsplash.com/photo-1506509741088-7510d9ce4546?ixlib=rb-4.0.3&w=800&q=80",
        },
      ];

      if (data && data.length > 0) {
        setPotentials(data);
      } else {
        setPotentials(defaultPotentials);
      }
      setLoading(false);
    };

    fetchPotentials();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-gray-500">
        <Loader2 size={32} className="animate-spin mb-4 text-primary" />
        <p>Memuat profil potensi desa...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 relative min-h-screen">
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
            onClick={() => setSelectedPotensi(item)}
            className="group relative rounded-3xl overflow-hidden shadow-lg flex aspect-[4/3] cursor-pointer"
          >
            <img
              src={item.photo_url ? item.photo_url.split(',')[0] : '/images/backgroundberanda.jpeg'}
              alt={item.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent flex flex-col justify-end p-8 text-white transition-opacity duration-500">
              <span className="bg-primary hover:bg-primary/90 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded w-max mb-3 backdrop-blur-sm transition-colors shadow-sm border border-primary/20">
                {item.category}
              </span>
              <h3 className="text-2xl font-bold mb-2 group-hover:text-primary-foreground transition-colors">
                {item.title}
              </h3>
              <p className="text-gray-200 text-sm line-clamp-2 md:line-clamp-3">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox / Modal */}
      {selectedPotensi && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm"
          onClick={() => { setSelectedPotensi(null); setCurrentImageIndex(0); }}
        >
          <div
            className="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden flex flex-col md:flex-row shadow-2xl animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => { setSelectedPotensi(null); setCurrentImageIndex(0); }}
              className="absolute top-4 right-4 z-10 p-2 bg-black/40 hover:bg-black/70 text-white rounded-full transition-colors"
            >
              <X size={20} />
            </button>

            {/* Cover Image Slider */}
            {(() => {
              const photos = selectedPotensi.photo_url ? selectedPotensi.photo_url.split(',').filter((u: string) => u) : ['/images/backgroundberanda.jpeg'];

              const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
                const target = e.target as HTMLDivElement;
                const index = Math.round(target.scrollLeft / target.clientWidth);
                if (index !== currentImageIndex) {
                  setCurrentImageIndex(index);
                }
              };

              const scrollTo = (index: number) => {
                const slider = document.getElementById('potensi-slider');
                if (slider) {
                  slider.scrollTo({
                    left: index * slider.clientWidth,
                    behavior: 'smooth'
                  });
                }
              };

              return (
                <div className="w-full md:w-1/2 min-h-[300px] md:min-h-[400px] bg-gray-100 flex-shrink-0 relative group">
                  <div
                    id="potensi-slider"
                    className="w-full h-full absolute inset-0 flex overflow-x-auto snap-x snap-mandatory scroll-smooth"
                    onScroll={handleScroll}
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                  >
                    {photos.map((photo: string, idx: number) => (
                      <div key={idx} className="w-full h-full flex-shrink-0 snap-center relative">
                        <img
                          src={photo}
                          alt={`${selectedPotensi.title} - Foto ${idx + 1}`}
                          className="w-full h-full object-cover select-none pointer-events-none"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Gradient Overlay for Controls Visibility */}
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>

                  {photos.length > 1 && (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          const newIndex = currentImageIndex === 0 ? photos.length - 1 : currentImageIndex - 1;
                          scrollTo(newIndex);
                        }}
                        className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-black/30 hover:bg-black/60 text-white rounded-full lg:opacity-0 group-hover:opacity-100 transition-all font-bold hidden md:block"
                      >
                        <ChevronLeft size={24} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          const newIndex = currentImageIndex === photos.length - 1 ? 0 : currentImageIndex + 1;
                          scrollTo(newIndex);
                        }}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-black/30 hover:bg-black/60 text-white rounded-full lg:opacity-0 group-hover:opacity-100 transition-all font-bold hidden md:block"
                      >
                        <ChevronRight size={24} />
                      </button>

                      {/* Pagination Dots (Clickable natively) */}
                      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5 z-10 pointer-events-none md:pointer-events-auto">
                        {photos.map((_: any, idx: number) => (
                          <div
                            key={idx}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === currentImageIndex ? 'bg-white scale-125' : 'bg-white/50'}`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              );
            })()}

            {/* Detail Content */}
            <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-center overflow-y-auto max-h-[60vh] md:max-h-[85vh]">
              <div>
                <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded text-xs font-bold uppercase tracking-wider mb-4 border border-primary/20">
                  {selectedPotensi.category}
                </span>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                  {selectedPotensi.title}
                </h2>
                <div className="w-12 h-1 bg-primary/20 mb-6 rounded-full"></div>
                <p className="text-gray-600 leading-relaxed text-justify whitespace-pre-wrap text-[15px]">
                  {selectedPotensi.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
