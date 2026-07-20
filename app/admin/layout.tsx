import Link from "next/link";
import { LayoutDashboard, FileText, Megaphone, Calendar, Settings, LogOut } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const menuItems = [
        { name: "Dashboard", href: "/admin", icon: <LayoutDashboard size={20} /> },
        { name: "Berita", href: "/admin/berita", icon: <Megaphone size={20} /> },
        { name: "Agenda", href: "/admin/agenda", icon: <Calendar size={20} /> },
        { name: "Pengaturan", href: "/admin", icon: <Settings size={20} /> },
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row -mx-4 md:mx-0">
            <aside className="w-full md:w-64 bg-white border-r border-gray-200 p-4 shrink-0 flex-col hidden md:flex min-h-[calc(100vh-64px)] overflow-y-auto">
                <div className="mb-8 px-2 flex items-center gap-3">
                    <div className="bg-primary text-white p-2 rounded-lg font-bold">N</div>
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
                    <Link href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors font-medium">
                        <LogOut size={20} />
                        Keluar Panel
                    </Link>
                </div>
            </aside>

            {/* Mobile nav indicator */}
            <div className="md:hidden bg-white p-4 border-b flex justify-between items-center text-sm font-semibold max-w-full">
                <span className="text-primary pr-2">Admin Dashboard Panel</span>
                <Link href="/" className="text-red-500 underline ml-auto pl-2 border-l border-gray-200">Keluar</Link>
            </div>

            <main className="flex-1 p-4 md:p-8 overflow-y-auto w-full text-left">
                {children}
            </main>
        </div>
    );
}
