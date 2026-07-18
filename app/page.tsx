export default function Home() {
  return (
    <div className="flex flex-col gap-16 pb-16">
      {/* Hero Section - full height, extends behind fixed navbar */}
      <section className="relative w-full h-screen -mt-16 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10" /> {/* Transparent overlay for readable text */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: 'url("/images/backgroundberanda.jpeg")' }}
        />
        <div className="relative z-20 text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-in slide-in-from-bottom flex flex-col gap-2">
            <span>Selamat Datang di</span>
            <span className="text-white">Desa Nambaru</span>
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-90 animate-in slide-in-from-bottom delay-150">
            Desa Kerukunan yang Tumbuh Bersama, Maju Bersama, dan Sejahtera Bersama.
          </p>
          <div className="mt-8 flex gap-4 justify-center">
            <a href="/profil" className="bg-white text-primary px-6 py-3 rounded-full font-semibold hover:bg-opacity-90 transition shadow-lg">
              Jelajahi Desa
            </a>
            <a href="/potensi" className="bg-transparent border border-white text-white px-6 py-3 rounded-full font-semibold hover:bg-white/10 transition">
              Lihat Potensi
            </a>
          </div>
        </div>
      </section>

      {/* Sambutan Kepala Desa */}
      <section className="container mx-auto px-4">
        <div className="bg-white border rounded-2xl p-8 shadow-sm max-w-4xl mx-auto flex flex-col md:flex-row gap-8 items-center border-l-4 border-l-primary">
          <div className="w-32 h-32 flex-shrink-0 bg-muted rounded-full overflow-hidden border-4 border-primary/20">
            <img src="/images/fotokades.png" alt="Kepala Desa" className="w-full h-full object-cover" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Sambutan Kepala Desa Nambaru</h2>
            <p className="text-gray-600 mb-4 italic">
              "Puji syukur ke hadirat Tuhan Yang Maha Esa. Kehadiran Website Desa Nambaru merupakan wujud komitmen Pemerintah Desa dalam memberikan pelayanan informasi yang cepat, transparan, dan mudah diakses oleh masyarakat. Melalui website ini, kami berharap seluruh informasi mengenai pemerintahan, pembangunan, potensi desa, serta berbagai layanan publik dapat tersampaikan dengan baik, sehingga mampu mempererat kebersamaan dalam mewujudkan Desa Nambaru yang maju, sejahtera, dan berbudaya."
            </p>
            <div>
              <p className="font-semibold text-primary">Asmuran</p>
              <p className="text-sm text-gray-500">Kepala Desa Nambaru</p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistik Desa */}
      <section className="bg-muted py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Statistik Desa Nambaru</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { label: 'Penduduk', value: '4.521', desc: 'Jiwa' },
              { label: 'Keluarga', value: '1.204', desc: 'Kepala Keluarga' },
              { label: 'Dusun', value: '5', desc: 'Wilayah' },
              { label: 'RT / RW', value: '24 / 8', desc: 'Total' },
            ].map((stat, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border hover:border-primary transition-colors">
                <h3 className="text-4xl font-black text-primary mb-2">{stat.value}</h3>
                <p className="font-semibold text-gray-800">{stat.label}</p>
                <p className="text-xs text-gray-500">{stat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Berita & Agenda */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Berita */}
          <div className="md:col-span-2">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Kabar Desa Terbaru</h2>
              <a href="/berita" className="text-primary text-sm font-semibold hover:underline">Lihat Semua</a>
            </div>
            <div className="grid gap-6">
              {[1, 2, 3].map((item) => (
                <a key={item} href="/berita" className="flex gap-4 group cursor-pointer">
                  <div className="w-32 h-24 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                    <img src={`https://images.unsplash.com/photo-1592888636906-8c50543fb5dd?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80&sig=${item}`} alt="Berita" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold group-hover:text-primary transition-colors line-clamp-2">Gotong Royong Bersih Desa Menjelang Hari Raya</h3>
                    <p className="text-xs text-primary font-medium mt-1 mb-2">12 Agustus 2026</p>
                    <p className="text-sm text-gray-600 line-clamp-2">Kegiatan rutin bulanan masyarakat desa melakukan kerja bakti membersihkan lingkungan.</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
          {/* Agenda */}
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Agenda Kegiatan</h2>
              <a href="/agenda" className="text-primary text-sm font-semibold hover:underline">Semua</a>
            </div>
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="bg-primary/5 p-4 rounded-xl border border-primary/10">
                  <div className="bg-primary text-white text-xs font-bold px-2 py-1 inline-block rounded mb-2">15 Aug 2026</div>
                  <h4 className="font-semibold text-gray-900">Penyuluhan Pertanian Organik</h4>
                  <p className="text-sm text-gray-600 mt-1">Balai Desa Nambaru, Pukul 09.00 WIB</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
