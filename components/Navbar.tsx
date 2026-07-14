import Link from 'next/link';

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-primary text-primary-foreground px-2 py-1 flex items-center justify-center rounded-md font-bold text-xl">
            Nambaru
          </div>
          <span className="hidden sm:inline-block font-semibold text-lg text-primary">Website Resmi</span>
        </Link>
        <div className="hidden lg:flex gap-5 items-center">
          <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">Beranda</Link>
          <Link href="/profil" className="text-sm font-medium hover:text-primary transition-colors">Profil</Link>
          <Link href="/aparatur" className="text-sm font-medium hover:text-primary transition-colors">Aparatur</Link>
          <Link href="/data" className="text-sm font-medium hover:text-primary transition-colors">Data</Link>
          <Link href="/potensi" className="text-sm font-medium hover:text-primary transition-colors">Potensi</Link>
          <Link href="/umkm" className="text-sm font-medium hover:text-primary transition-colors">UMKM</Link>
          <Link href="/berita" className="text-sm font-medium hover:text-primary transition-colors">Berita</Link>
          <Link href="/login" className="text-sm font-medium text-white bg-primary px-4 py-2 rounded-full hover:bg-primary/90 transition-all shadow-sm ml-2">Login Admin</Link>
        </div>
      </div>
    </nav>
  );
}
