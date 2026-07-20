"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulate auth logic
        setTimeout(() => {
            setLoading(false);
            router.push("/admin");
        }, 1000);
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4">
            <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                <div className="text-center mb-8">
                    <img
                        src="/images/logoadmin.png"
                        alt="Logo Admin"
                        className="w-16 h-16 object-contain mx-auto mb-4"
                    />
                    <h1 className="text-3xl font-bold text-gray-900">Login Admin</h1>
                    <p className="text-gray-500 mt-2">Sistem Informasi Manajemen Nambaru</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all bg-gray-50 focus:bg-white"
                            placeholder="admin@nambaru.desa.id"
                        />
                    </div>
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label className="block text-sm font-semibold text-gray-700">Password</label>
                        </div>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all bg-gray-50 focus:bg-white"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-primary text-white font-bold py-3 rounded-xl hover:bg-opacity-90 transition-all shadow-md disabled:opacity-70 disabled:cursor-not-allowed text-lg"
                    >
                        {loading ? "Memproses..." : "Masuk"}
                    </button>
                </form>

                <div className="mt-8 text-center text-sm text-blue-800 bg-blue-50 p-4 rounded-xl border border-blue-200">
                    <p><strong>Demo Mode (Tanpa Supabase Backend):</strong> <br /> Masukkan sembarang email & password untuk mencoba alur masuk ke dashboard.</p>
                </div>
            </div>
        </div>
    );
}
