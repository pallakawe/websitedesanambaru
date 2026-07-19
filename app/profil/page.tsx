export default function ProfilDesa() {
    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold text-center mb-12 text-primary">Profil Desa Nambaru</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                <div className="space-y-6">
                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-gray-800 border-b-2 border-primary/20 pb-2">Sejarah Desa</h2>
                        <div className="w-full h-48 bg-muted rounded-xl mb-4 overflow-hidden border">
                            <img src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Sejarah Desa Nambaru" className="w-full h-full object-cover" />
                        </div>
                        <div className="text-gray-600 leading-relaxed text-justify space-y-4">
                            <p>
                                Desa Nambaru merupakan salah satu desa di Kecamatan Parigi Selatan, Kabupaten Parigi Moutong, yang berdiri sejak tahun 1938. Pada awalnya desa ini bernama Langganesi, kemudian diubah oleh Raja Parigi menjadi Desa Nambaru, nama yang tetap digunakan hingga sekarang. Secara administratif, Desa Nambaru terdiri atas enam dusun, yaitu Dusun I, Dusun II (Kalae), Dusun III (Trimasari), Dusun IV (Masiana), Dusun V (Bonebula), dan Dusun VI (Toini).
                            </p>
                            <p>
                                Desa Nambaru dikenal memiliki potensi pertanian yang didukung oleh jaringan irigasi yang baik. Selain itu, pada tahun 2023 Desa Nambaru ditetapkan sebagai Desa Kerukunan di Kabupaten Parigi Moutong oleh Forum Kerukunan Umat Beragama (FKUB), sebagai wujud komitmen masyarakat dalam menjaga keharmonisan antarumat beragama.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-gray-800 border-b-2 border-primary/20 pb-2">Visi & Misi</h2>
                        <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10">
                            <h3 className="font-bold text-lg mb-2 text-primary">Visi</h3>
                            <p className="text-gray-700 italic mb-6">"Terwujudnya tata kelola pemerintahan yang bersih, jujur, inovatif, transparan, dan akuntabel demi terciptanya Desa Nambaru yang maju, sejahtera, dan berbudaya."</p>

                            <h3 className="font-bold text-lg mb-2 text-primary">Misi</h3>
                            <ul className="list-decimal list-outside ml-5 text-gray-700 space-y-2">
                                <li>Memberikan pelayanan yang baik, dan informasi yang seluas-luasnya kepada masyarakat secara efektif dan efesien dengan menyediakan sarana publik.</li>
                                <li>Meningkatkan pembangunan jalan desa, gapura batas desa, jalan pertanian, dan jalan lingkungan.</li>
                                <li>Rehabilitasi dan optimalisasi fungsi balai Desa Nambaru.</li>
                                <li>Penataan tempat rekreasi, agrowisata, dan edukasi pertanian.</li>
                                <li>Meningkatkan pemberdayaan sumber air minum untuk PAM desa.</li>
                                <li>Meningkatkan pembinaan, dan pemberdayaan kapasitas kepemudaan, dan olah raga.</li>
                                <li>Pembentukan komunitas peduli lingkungan, dan penanggulangan bencana.</li>
                            </ul>
                        </div>
                    </section>
                </div>

                <div className="space-y-6">
                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-gray-800 border-b-2 border-primary/20 pb-2">Letak Geografis</h2>
                        <div className="w-full h-48 bg-muted rounded-xl mb-4 overflow-hidden border">
                            <img src="/images/Untukgeografis.jpeg" alt="Peta Administratif Desa Nambaru" className="w-full h-full object-cover" />
                        </div>
                        <div className="text-gray-600 leading-relaxed text-justify space-y-4">
                            <p>
                                Desa Nambaru merupakan salah satu desa yang berada di wilayah Kecamatan Parigi Selatan, Kabupaten Parigi Moutong, Provinsi Sulawesi Tengah. Desa ini memiliki luas wilayah sekitar 2.527,13 hektare dan terbagi ke dalam enam dusun. Lokasinya berada pada koordinat 120.238003° Bujur Timur dan 0.944323° Lintang Selatan, dengan jarak sekitar 19 km dari ibu kota Kabupaten Parigi Moutong.
                            </p>
                            <p>
                                Secara topografi, Desa Nambaru berada pada ketinggian 14–18 meter di atas permukaan laut. Sebagian besar wilayahnya berupa dataran yang dimanfaatkan sebagai kawasan permukiman, lahan pertanian, dan persawahan. Kondisi iklim di desa ini memiliki curah hujan rata-rata sekitar 1.554 mm per tahun dengan sekitar 120 hari hujan. Musim hujan umumnya berlangsung pada bulan Oktober hingga Maret, sedangkan musim kemarau terjadi pada bulan April hingga September. Suhu udara harian berkisar antara 24,2°C hingga 39,4°C, dengan rata-rata sekitar 34,7°C.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-gray-800 border-b-2 border-primary/20 pb-2">Batas Wilayah</h2>
                        <div className="flex flex-col md:flex-row gap-4">
                            {/* Tabel Batas */}
                            <div className="flex-1">
                                <ul className="space-y-3">
                                    <li className="flex justify-between p-3 bg-white border rounded">
                                        <span className="font-medium">Utara</span>
                                        <span className="text-gray-600">Desa Sumber Sari</span>
                                    </li>
                                    <li className="flex justify-between p-3 bg-white border rounded">
                                        <span className="font-medium">Selatan</span>
                                        <span className="text-gray-600">Desa Tindaki</span>
                                    </li>
                                    <li className="flex justify-between p-3 bg-white border rounded">
                                        <span className="font-medium">Timur</span>
                                        <span className="text-gray-600">Teluk Tomini</span>
                                    </li>
                                    <li className="flex justify-between items-start p-3 bg-white border rounded">
                                        <span className="font-medium flex-shrink-0">Barat</span>
                                        <span className="text-gray-600 text-right ml-2">Kecamatan Palolo, Kabupaten Sigi</span>
                                    </li>
                                </ul>
                            </div>
                            {/* Google Maps Embed */}
                            <div className="flex-1 min-h-[220px] rounded-xl overflow-hidden border shadow-sm">
                                <iframe
                                    title="Peta Desa Nambaru"
                                    src="https://maps.google.com/maps?q=-0.944323,120.238003&z=14&output=embed"
                                    width="100%"
                                    height="100%"
                                    style={{ minHeight: '220px', border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                />
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
