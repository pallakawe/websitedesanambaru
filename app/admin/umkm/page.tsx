"use client";
import { useState } from "react";
import { Search, Plus, Edit, Trash2, Eye } from "lucide-react";

export default function AdminUMKM() {
    const [search, setSearch] = useState("");
    const [data, setData] = useState([
        { id: 1, name: "Kopi Nambaru Asli", owner: "Ibu Siti", price: "Rp 35.000" },
        { id: 2, name: "Keripik Singkong Renyah", owner: "Pak Joni", price: "Rp 15.000" },
        { id: 3, name: "Madu Hutan Liar", owner: "Bapak Yono", price: "Rp 75.000" },
        { id: 4, name: "Kerajinan Anyaman Bambu", owner: "Bu Darmi", price: "Rp 20.000" }
    ]);

    return (
        <div className="max-w-6xl">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Kelola UMKM</h1>
                    <p className="text-gray-600">Manajemen data usaha mikro kecil menengah (UMKM) desa.</p>
                </div>
                <button className="bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-xl font-semibold flex items-center gap-2 shadow-sm transition-all">
                    <Plus size={20} />
                    Tambah UMKM
                </button>
            </div>

            <div className="bg-white border rounded-2xl shadow-sm overflow-hidden">
                {/* Toolbar */}
                <div className="p-4 border-b bg-gray-50 flex gap-4 items-center">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Cari nama UMKM atau pemilik..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all bg-white"
                        />
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead>
                            <tr className="bg-gray-50 border-b">
                                <th className="p-4 font-semibold text-gray-600 text-sm">Nama UMKM</th>
                                <th className="p-4 font-semibold text-gray-600 text-sm">Pemilik</th>
                                <th className="p-4 font-semibold text-gray-600 text-sm">Harga (Kisaran)</th>
                                <th className="p-4 font-semibold text-gray-600 text-sm text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.filter(item => item.name.toLowerCase().includes(search.toLowerCase()) || item.owner.toLowerCase().includes(search.toLowerCase())).map((item) => (
                                <tr key={item.id} className="border-b border-gray-100 last:border-0 hover:bg-primary/5 transition-colors">
                                    <td className="p-4 font-bold text-gray-900">{item.name}</td>
                                    <td className="p-4 text-gray-600">{item.owner}</td>
                                    <td className="p-4 text-primary font-medium">{item.price}</td>
                                    <td className="p-4 flex gap-2 justify-center">
                                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Lihat">
                                            <Eye size={18} />
                                        </button>
                                        <button className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors" title="Edit">
                                            <Edit size={18} />
                                        </button>
                                        <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Hapus" onClick={() => {
                                            if (window.confirm("Apakah Anda yakin ingin menghapus data ini?")) {
                                                setData(data.filter(d => d.id !== item.id));
                                            }
                                        }}>
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {data.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="p-8 text-center text-gray-500">
                                        Data tidak ditemukan.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Dummy */}
                <div className="p-4 border-t flex justify-between items-center text-sm text-gray-600">
                    <span>Menampilkan {data.length} entri</span>
                    <div className="flex gap-1">
                        <button className="px-3 py-1 border rounded hover:bg-gray-50 disabled:opacity-50" disabled>Sebelumnya</button>
                        <button className="px-3 py-1 border rounded bg-primary text-white">1</button>
                        <button className="px-3 py-1 border rounded hover:bg-gray-50 disabled:opacity-50" disabled>Selanjutnya</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
