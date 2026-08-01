'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Lock, Menu, X } from 'lucide-react';

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isTransparent = isHome && !scrolled;

  const navLinks = [
    { href: '/', label: 'Beranda' },
    { href: '/profil', label: 'Profil' },
    { href: '/aparatur', label: 'Aparatur' },
    { href: '/data', label: 'Data' },
    { href: '/potensi', label: 'Potensi' },
    { href: '/berita', label: 'Berita' },
    { href: '/kontak', label: 'Kontak' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${isTransparent && !isOpen
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
              className={`font-bold text-base sm:text-lg transition-colors duration-300 ${isTransparent && !isOpen ? 'text-white drop-shadow' : 'text-primary'
                }`}
            >
              Desa Nambaru
            </span>
            <span
              className={`text-xs sm:text-sm transition-colors duration-300 ${isTransparent && !isOpen ? 'text-white/80 drop-shadow' : 'text-gray-500'
                }`}
            >
              Kabupaten Parigi Moutong
            </span>
          </div>
        </Link>

        {/* Menu Desktop */}
        <div className="hidden lg:flex gap-5 items-center">
          {navLinks.map(({ href, label }) => (
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
            title="Login Admin"
            className={`ml-2 w-9 h-9 flex items-center justify-center rounded-full transition-all shadow-sm ${isTransparent
              ? 'bg-white/20 text-white hover:bg-white/30'
              : 'bg-primary text-white hover:bg-primary/90'
              }`}
          >
            <Lock size={16} />
          </Link>
        </div>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`lg:hidden p-2 rounded-lg transition-colors ${isTransparent && !isOpen ? 'text-white' : 'text-gray-900 hover:bg-gray-100'}`}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="lg:hidden absolute top-16 left-0 right-0 w-full bg-white shadow-xl border-t border-gray-100 flex flex-col py-2 px-4 animate-in slide-in-from-top-2 duration-200">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setIsOpen(false)}
              className="py-3 px-2 border-b border-gray-50 text-gray-700 font-medium hover:text-primary hover:bg-primary/5 transition-colors rounded"
            >
              {label}
            </Link>
          ))}
          <Link
            href="/login"
            onClick={() => setIsOpen(false)}
            className="mt-4 py-3 bg-primary text-white text-center font-bold rounded-xl flex items-center justify-center gap-2 shadow-sm"
          >
            <Lock size={16} /> Login Admin Panel
          </Link>
        </div>
      )}
    </nav>
  );
}
