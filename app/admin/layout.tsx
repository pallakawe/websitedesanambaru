"use client";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { LayoutDashboard, FileText, Megaphone, Calendar, Settings, LogOut, Users, MessageSquare, BookOpen, BarChart3, TrendingUp, Loader2, Menu, X } from "lucide-react";
import AuthGuard from "@/components/AuthGuard";
import { useState, useEffect } from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const [loggingOut, setLoggingOut] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Otomatis tutup menu mobile kalau rutenya berubah (sudah diklik)
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname]);

    const menuItems = [
        { name: "Dashboard", href: "/admin", icon: <LayoutDashboard size={20} /> },
        { name: "Profil Desa", href: "/admin/profil", icon: <BookOpen size={20} /> },
        { name: "Statistik", href: "/admin/data", icon: <BarChart3 size={20} /> },
        { name: "Potensi Desa", href: "/admin/potensi", icon: <TrendingUp size={20} /> },
        { name: "Aparatur", href: "/admin/aparatur", icon: <Users size={20} /> },
        { name: "Berita", href: "/admin/berita", icon: <Megaphone size={20} /> },
        { name: "Agenda", href: "/admin/agenda", icon: <Calendar size={20} /> },
        { name: "Kotak Masuk", href: "/admin/pesan", icon: <MessageSquare size={20} /> },
    ];

    const handleLogout = async () => {
        setLoggingOut(true);
        await supabase.auth.signOut();
        router.push("/login");
    };

    const SidebarContent = () => (
        <>
            <div className="mb-8 px-2 flex items-center gap-3">
                <img src="/images/logoadmin.png" alt="Logo Admin" className="w-10 h-10 object-contain" />
                <span className="font-bold text-lg text-gray-800 tracking-wide">Admin Panel</span>
            </div>
            <nav className="flex-1 space-y-2 relative overflow-y-auto">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link key={item.name} href={item.href} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors font-medium ${isActive ? 'bg-primary/10 text-primary' : 'text-gray-600 hover:bg-primary/5 hover:text-primary'}`}>
                            {item.icon}
                            {item.name}
                        </Link>
                    )
                })}
            </nav>
            <div className="mt-8 border-t pt-4">
                <button onClick={handleLogout} disabled={loggingOut} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors font-medium disabled:opacity-50">
                    {loggingOut ? <Loader2 size={20} className="animate-spin" /> : <LogOut size={20} />}
                    {loggingOut ? "Keluar..." : "Keluar Panel"}
                </button>
            </div>
        </>
    );

    return (
        <AuthGuard>
            <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row max-w-[100vw] overflow-x-hidden">
                {/* Desktop Sidebar */}
                <aside className="w-64 bg-white border-r border-gray-200 p-4 shrink-0 flex-col hidden md:flex min-h-screen sticky top-0">
                    <SidebarContent />
                </aside>

                {/* Mobile Header */}
                <div className="md:hidden bg-white p-4 border-b flex justify-between items-center text-sm font-semibold sticky top-0 z-40 shadow-sm w-full">
                    <div className="flex items-center gap-3">
                        <button onClick={() => setIsMobileMenuOpen(true)} className="p-1 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">
                            <Menu size={24} />
                        </button>
                        <span className="text-primary text-base">Dasbor Nambaru</span>
                    </div>
                </div>

                {/* Mobile Sidebar Overlay */}
                {isMobileMenuOpen && (
                    <div className="fixed inset-0 z-50 flex md:hidden lg:hidden animate-in fade-in duration-200">
                        {/* Dark backdrop */}
                        <div className="fixed inset-0 bg-black/50" onClick={() => setIsMobileMenuOpen(false)}></div>

                        {/* Drawer */}
                        <div className="w-72 max-w-[80vw] h-full bg-white shadow-2xl relative flex flex-col p-4 animate-in slide-in-from-left-4 duration-300">
                            <button onClick={() => setIsMobileMenuOpen(false)} className="absolute top-4 right-4 p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors z-10">
                                <X size={20} />
                            </button>
                            <SidebarContent />
                        </div>
                    </div>
                )}

                {/* Main Content Area */}
                <main className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto w-full text-left">
                    {children}
                </main>
            </div>
        </AuthGuard>
    );
}
