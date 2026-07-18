export function Footer() {
    return (
        <footer className="bg-primary text-primary-foreground py-12 mt-16">
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                    <h3 className="text-xl font-bold mb-4">Desa Nambaru</h3>
                    <p className="opacity-80 max-w-sm">
                        Website resmi desa Nambaru sebagai pusat informasi publik dan pelayanan masyarakat yang transparan dan akuntabel serta fleksibel.
                    </p>
                </div>
                <div>
                    <h4 className="text-lg font-semibold mb-4">Tautan Cepat</h4>
                    <ul className="space-y-2 opacity-80">
                        <li><a href="/profil" className="hover:underline hover:opacity-100 transition">Profil Desa</a></li>
                        <li><a href="/berita" className="hover:underline hover:opacity-100 transition">Berita Terkini</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-lg font-semibold mb-4">Kontak Kami</h4>
                    <address className="opacity-80 not-italic space-y-2">
                        <p>Kantor Kepala Desa Nambaru Jl.Balai Desa</p>
                        <p>Kecamatan Parigi Selatan, Kabupaten Parigi Moutong</p>
                        <p>Email: admin@nambaru.desa.id</p>
                    </address>
                </div>
            </div>
            <div className="text-center mt-12 pt-8 border-t border-primary-foreground/20 opacity-60 text-sm">
                &copy; {new Date().getFullYear()} Pemerintah Desa Nambaru. Dikelola oleh KKN Tematik Angkatan 117 Universitas Tadulako.

            </div>
        </footer>
    );
}
