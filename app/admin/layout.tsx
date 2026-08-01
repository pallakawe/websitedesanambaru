"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { LayoutDashboard, FileText, Megaphone, Calendar, Settings, LogOut, Users, MessageSquare, BookOpen, BarChart3, TrendingUp, Loader2 } from "lucide-react";
import AuthGuard from "@/components/AuthGuard";
import { useState } from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [loggingOut, setLoggingOut] = useState(false);

    const menuItems = [
        { name: "Dashboard", href: "/admin", icon: <LayoutDashboard size={20} /> },
        { name: "Profil Desa", href: "/admin/profil", icon: <BookOpen size={20} /> },
        { name: "Statistik", href: "/admin/data", icon: <BarChart3 size={20} /> },
        { name: "Potensi Desa", href: "/admin/potensi", icon: <TrendingUp size={20} /> },
        { name: "Aparatur", href: "/admin/aparatur", icon: <Users size={20} /> },
        { name: "Berita", href: "/admin/berita", icon: <Megaphone size={20} /> },
        { name: "Agenda", href: "/admin/agenda", icon: <Calendar size={20} /> },
        { name: "Kotak Masuk", href: "/admin/pesan", icon: <MessageSquare size={20} /> },
        { name: "Pengaturan", href: "/admin", icon: <Settings size={20} /> },
    ];

    const handleLogout = async () => {
        setLoggingOut(true);
        await supabase.auth.signOut();
        router.push("/login");
    };

    return (
        <AuthGuard>
            <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row -mx-4 md:mx-0">
                <aside className="w-full md:w-64 bg-white border-r border-gray-200 p-4 shrink-0 flex-col hidden md:flex min-h-[calc(100vh-64px)] overflow-y-auto">
                    <div className="mb-8 px-2 flex items-center gap-3">
                        <img src="/images/logoadmin.png" alt="Logo Admin" className="w-10 h-10 object-contain" />
                        <span className="font-bold text-lg text-gray-800 tracking-wide">Admin Mode</span>
                    </div>
                    <nav className="flex-1 space-y-2 relative">
                        {menuItems.map((item) => (
                            <Link key={item.name} href={item.href} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-primary/10 hover:text-primary transition-colors font-medium">
                                {item.icon}
                                {item.name}
                            </Link>
                        ))}
                    </nav>
                    <div className="mt-8 border-t pt-4">
                        <button onClick={handleLogout} disabled={loggingOut} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors font-medium disabled:opacity-50">
                            {loggingOut ? <Loader2 size={20} className="animate-spin" /> : <LogOut size={20} />}
                            {loggingOut ? "Keluar..." : "Keluar Panel"}
                        </button>
                    </div>
                </aside>

                {/* Mobile nav indicator */}
                <div className="md:hidden bg-white p-4 border-b flex justify-between items-center text-sm font-semibold max-w-full">
                    <span className="text-primary pr-2">Admin Dashboard Panel</span>
                    <button onClick={handleLogout} disabled={loggingOut} className="text-red-500 underline ml-auto pl-2 border-l border-gray-200">
                        {loggingOut ? "Memproses..." : "Keluar"}
                    </button>
                </div>

                <main className="flex-1 p-4 md:p-8 overflow-y-auto w-full text-left">
                    {children}
                </main>
            </div>
        </AuthGuard>
    );
}
