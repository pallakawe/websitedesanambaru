"use client";
import { useState, useEffect } from "react";
import { Search, Trash2, MailOpen, Mail, X, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface Message {
    id: string;
    nama: string;
    kontak: string;
    pesan: string;
    is_read: boolean;
    created_at: string;
}

export default function AdminPesan() {
    const [search, setSearch] = useState("");
    const [data, setData] = useState<Message[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchMessages = async () => {
        setLoading(true);
        const { data: rows, error: err } = await supabase
            .from("messages")
            .select("*")
            .order("created_at", { ascending: false });

        if (err) setError(err.message);
        else setData(rows || []);
        setLoading(false);
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    const handleDelete = async (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        if (!window.confirm("Hapus pesan ini secara permanen?")) return;
        const { error: err } = await supabase.from("messages").delete().eq("id", id);
        if (err) setError(err.message);
        else setData(prev => prev.filter(d => d.id !== id));
    };

    const toggleReadStatus = async (msg: Message, e: React.MouseEvent) => {
        e.stopPropagation();
        const newStatus = !msg.is_read;
        const { error: err } = await supabase.from("messages").update({ is_read: newStatus }).eq("id", msg.id);
        if (err) {
            setError(err.message);
        } else {
            setData(prev => prev.map(d => d.id === msg.id ? { ...d, is_read: newStatus } : d));
        }
    };

    const filtered = data.filter(item =>
        item.nama.toLowerCase().includes(search.toLowerCase()) ||
        item.pesan.toLowerCase().includes(search.toLowerCase()) ||
        item.kontak.toLowerCase().includes(search.toLowerCase())
    );

    const unreadCount = data.filter(d => !d.is_read).length;

    return (
        <div className="max-w-6xl">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Kotak Masuk</h1>
                    <p className="text-gray-600">Terima dan kelola pesan aspirasi warga {unreadCount > 0 && <span className="text-primary font-bold">({unreadCount} belum dibaca)</span>}.</p>
                </div>
            </div>

            {error && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm flex justify-between items-start gap-2">
                    <span>⚠️ {error}</span>
                    <button onClick={() => setError(null)}><X size={16} /></button>
                </div>
            )}

            <div className="bg-white border rounded-2xl shadow-sm overflow-hidden">
                <div className="p-4 border-b bg-gray-50 flex gap-4 items-center">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Cari pengirim, kontak, isi pesan..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all bg-white"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[700px]">
                        <thead>
                            <tr className="bg-gray-50 border-b">
                                <th className="p-4 font-semibold text-gray-600 text-sm w-12 text-center">Status</th>
                                <th className="p-4 font-semibold text-gray-600 text-sm">Pengirim</th>
                                <th className="p-4 font-semibold text-gray-600 text-sm">Isi Pesan</th>
                                <th className="p-4 font-semibold text-gray-600 text-sm">Waktu Diterima</th>
                                <th className="p-4 font-semibold text-gray-600 text-sm text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="p-10 text-center text-gray-400">
                                        <Loader2 size={28} className="animate-spin mx-auto mb-2" />
                                        <p>Memuat pesan warga...</p>
                                    </td>
                                </tr>
                            ) : filtered.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="p-10 text-center text-gray-400">
                                        {search ? "Pesan tidak ditemukan." : "Yay! Belum ada pesan masuk."}
                                    </td>
                                </tr>
                            ) : (
                                filtered.map((item) => (
                                    <tr
                                        key={item.id}
                                        className={`border-b border-gray-100 last:border-0 hover:bg-primary/5 transition-colors cursor-pointer ${!item.is_read ? 'bg-primary/5' : ''}`}
                                        onClick={(e) => !item.is_read && toggleReadStatus(item, e)}
                                    >
                                        <td className="p-4 text-center">
                                            <div className="flex justify-center" title={item.is_read ? "Sudah Dibaca" : "Belum Dibaca"}>
                                                {item.is_read ? (
                                                    <MailOpen size={20} className="text-gray-400" />
                                                ) : (
                                                    <Mail size={20} className="text-primary fill-primary/20" />
                                                )}
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <p className={`font-medium ${!item.is_read ? 'text-gray-900' : 'text-gray-700'}`}>{item.nama}</p>
                                            <p className="text-xs text-gray-500 mt-0.5">{item.kontak}</p>
                                        </td>
                                        <td className="p-4">
                                            <p className={`text-sm ${!item.is_read ? 'text-gray-900 font-medium' : 'text-gray-600'}`}>
                                                {item.pesan}
                                            </p>
                                        </td>
                                        <td className="p-4 text-gray-500 text-sm whitespace-nowrap">
                                            {new Date(item.created_at).toLocaleString("id-ID", {
                                                day: 'numeric', month: 'short', year: 'numeric',
                                                hour: '2-digit', minute: '2-digit'
                                            })}
                                        </td>
                                        <td className="p-4 text-center">
                                            <div className="flex items-center justify-center gap-2">
                                                <button
                                                    className={`p-2 rounded-lg transition-colors ${item.is_read ? 'text-gray-400 hover:bg-gray-100 hover:text-gray-600' : 'text-primary hover:bg-primary/10'}`}
                                                    title={item.is_read ? "Tandai Belum Dibaca" : "Tandai Sudah Dibaca"}
                                                    onClick={(e) => toggleReadStatus(item, e)}
                                                >
                                                    {item.is_read ? <Mail size={18} /> : <MailOpen size={18} />}
                                                </button>
                                                <button
                                                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                                    title="Hapus"
                                                    onClick={(e) => handleDelete(item.id, e)}
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="p-4 border-t text-sm text-gray-500">Total: {filtered.length} pesan terdaftar</div>
            </div>
        </div>
    );
}
