export default function ProfilDesa() {
    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold text-center mb-12 text-primary">Profil Desa Nambaru</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                <div className="space-y-6">
                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-gray-800 border-b-2 border-primary/20 pb-2">Sejarah Desa</h2>
                        <p className="text-gray-600 leading-relaxed text-justify">
                            Desa Nambaru didirikan pada tahun 1920. Nama Nambaru berasal dari gabungan kata "Nam" yang berarti subur, dan "Baru" yang berarti semangat yang terus diperbarui. Masyarakat awal di desa ini merupakan pendatang yang mulai membuka lahan pertanian baru. Seiring berjalannya waktu, Nambaru berkembang menjadi pusat pertanian yang mandiri.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-gray-800 border-b-2 border-primary/20 pb-2">Visi & Misi</h2>
                        <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10">
                            <h3 className="font-bold text-lg mb-2 text-primary">Visi</h3>
                            <p className="text-gray-700 italic mb-4">"Mewujudkan Desa Nambaru yang Subur, Sejahtera, dan Berbudaya melalui Pemberdayaan Petani dan UMKM Mandiri."</p>

                            <h3 className="font-bold text-lg mb-2 text-primary">Misi</h3>
                            <ul className="list-disc list-inside text-gray-700 space-y-2">
                                <li>Meningkatkan infrastruktur dan jalan usaha tani.</li>
                                <li>Mendorong pertumbuhan UMKM lokal melalui pemasaran digital.</li>
                                <li>Mewujudkan transparansi tata kelola pemerintahan desa.</li>
                                <li>Menjaga kelestarian lingkungan dan budaya gotong royong.</li>
                            </ul>
                        </div>
                    </section>
                </div>

                <div className="space-y-6">
                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-gray-800 border-b-2 border-primary/20 pb-2">Letak Geografis</h2>
                        <div className="w-full h-48 bg-muted rounded-xl mb-4 overflow-hidden border">
                            <img src="https://images.unsplash.com/photo-1542273917363-3b1817f69a5d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Pemandangan Desa" className="w-full h-full object-cover" />
                        </div>
                        <p className="text-gray-600 leading-relaxed">
                            Desa Nambaru terletak di daerah perbukitan dengan ketinggian 400 meter di atas permukaan laut. Suhu rata-rata harian yang sejuk menjadikannya tempat ideal untuk perkebunan dan pertanian padi organik.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-gray-800 border-b-2 border-primary/20 pb-2">Batas Wilayah</h2>
                        <ul className="space-y-3">
                            <li className="flex justify-between p-3 bg-white border rounded">
                                <span className="font-medium">Utara</span>
                                <span className="text-gray-600">Desa Maju Jaya</span>
                            </li>
                            <li className="flex justify-between p-3 bg-white border rounded">
                                <span className="font-medium">Selatan</span>
                                <span className="text-gray-600">Hutan Lindung Gunung Pura</span>
                            </li>
                            <li className="flex justify-between p-3 bg-white border rounded">
                                <span className="font-medium">Timur</span>
                                <span className="text-gray-600">Sungai Citarum</span>
                            </li>
                            <li className="flex justify-between p-3 bg-white border rounded">
                                <span className="font-medium">Barat</span>
                                <span className="text-gray-600">Desa Suka Makmur</span>
                            </li>
                        </ul>
                    </section>
                </div>
            </div>
        </div>
    );
}
