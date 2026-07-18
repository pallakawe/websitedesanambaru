export function Footer() {
    return (
        <footer className="bg-primary text-primary-foreground py-12 mt-16">
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                    <h3 className="text-xl font-bold mb-4">Desa Nambaru</h3>
                    <p className="opacity-80 max-w-sm mb-6">
                        Website resmi desa Nambaru sebagai pusat informasi publik dan pelayanan masyarakat yang transparan dan akuntabel serta fleksibel.
                    </p>
                    <div className="flex gap-3">
                        <a href="#" className="p-2.5 bg-primary-foreground/15 rounded-full hover:bg-primary-foreground/25 hover:scale-105 transition-all text-primary-foreground flex items-center justify-center" title="Facebook">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                            </svg>
                        </a>
                        <a href="#" className="p-2.5 bg-primary-foreground/15 rounded-full hover:bg-primary-foreground/25 hover:scale-105 transition-all text-primary-foreground flex items-center justify-center" title="Instagram">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                            </svg>
                        </a>
                        <a href="#" className="p-2.5 bg-primary-foreground/15 rounded-full hover:bg-primary-foreground/25 hover:scale-105 transition-all text-primary-foreground flex items-center justify-center" title="YouTube">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                                <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17z" />
                                <polygon points="10 15 15 12 10 9" fill="currentColor" />
                            </svg>
                        </a>
                    </div>
                </div>
                <div>
                    <h4 className="text-lg font-semibold mb-4">Tautan Cepat</h4>
                    <ul className="space-y-2 opacity-80">
                        <li><a href="/profil" className="hover:underline hover:opacity-100 transition">Profil Desa</a></li>
                        <li><a href="/berita" className="hover:underline hover:opacity-100 transition">Berita Terkini</a></li>
                        <li><a href="/kontak" className="hover:underline hover:opacity-100 transition">Kontak Kami</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-lg font-semibold mb-4">Kontak Kami</h4>
                    <address className="opacity-80 not-italic space-y-2">
                        <p>Kantor Kepala Desa Nambaru Jl. Balai Desa</p>
                        <p>Kecamatan Parigi Selatan, Kabupaten Parigi Moutong</p>
                        <p>WhatsApp: +62 823-4747-1117</p>
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
