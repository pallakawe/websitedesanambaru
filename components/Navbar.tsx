'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isTransparent = isHome && !scrolled;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${isTransparent
          ? 'border-b border-white/10 bg-transparent'
          : 'border-b border-border bg-white/90 backdrop-blur-md shadow-sm'
        }`}
    >
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        {/* Logo + Nama Desa */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/images/logokabupaten.png"
            alt="Logo Kabupaten Parigi Moutong"
            width={44}
            height={44}
            className="object-contain flex-shrink-0"
          />
          <div className="flex flex-col leading-tight">
            <span
              className={`font-bold text-base sm:text-lg transition-colors duration-300 ${isTransparent ? 'text-white drop-shadow' : 'text-primary'
                }`}
            >
              Desa Nambaru
            </span>
            <span
              className={`text-xs sm:text-sm transition-colors duration-300 ${isTransparent ? 'text-white/80 drop-shadow' : 'text-gray-500'
                }`}
            >
              Kabupaten Parigi Moutong
            </span>
          </div>
        </Link>

        {/* Menu */}
        <div className="hidden lg:flex gap-5 items-center">
          {[
            { href: '/', label: 'Beranda' },
            { href: '/profil', label: 'Profil' },
            { href: '/aparatur', label: 'Aparatur' },
            { href: '/data', label: 'Data' },
            { href: '/potensi', label: 'Potensi' },
            { href: '/berita', label: 'Berita' },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`text-sm font-medium transition-colors duration-300 ${isTransparent
                  ? 'text-white drop-shadow hover:text-white/80'
                  : 'text-gray-700 hover:text-primary'
                }`}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/login"
            className="text-sm font-medium text-white bg-primary px-4 py-2 rounded-full hover:bg-primary/90 transition-all shadow-sm ml-2"
          >
            Login Admin
          </Link>
        </div>
      </div>
    </nav>
  );
}
