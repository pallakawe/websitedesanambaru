"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Loader2, AlertCircle, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const router = useRouter();

    // Pastikan user belum login sebelum merender form
    useEffect(() => {
        const checkExistingSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session) {
                router.replace("/admin");
            }
        };
        checkExistingSession();
    }, [router]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg("");

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password
            });

            if (error) {
                setErrorMsg(error.message);
                setLoading(false);
                return;
            }

            if (data.session) {
                router.push("/admin");
            }
        } catch (err: any) {
            setErrorMsg(err.message || "Terjadi kesalahan saat masuk.");
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4">
            <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/50">
                <div className="text-center mb-8">
                    <img
                        src="/images/logoadmin.png"
                        alt="Logo Admin"
                        className="w-16 h-16 object-contain mx-auto mb-4"
                    />
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Login Admin</h1>
                    <p className="text-gray-500 mt-2 font-medium">Sistem Informasi Manajemen Nambaru</p>
                </div>

                {errorMsg && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200/60 rounded-xl flex items-center gap-3 text-red-700 animate-in fade-in slide-in-from-top-2">
                        <AlertCircle className="w-5 h-5 shrink-0" />
                        <p className="text-sm font-medium">{errorMsg === "Invalid login credentials" ? "Email atau Password tidak sesuai." : errorMsg}</p>
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-5">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all bg-gray-50/50 focus:bg-white"
                            placeholder="Ketik email akses admin..."
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all bg-gray-50/50 focus:bg-white pr-12"
                                placeholder="••••••••"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-primary text-white font-bold py-3.5 mt-2 rounded-xl hover:bg-primary/95 transition-all shadow-md disabled:opacity-70 disabled:cursor-not-allowed text-lg flex items-center justify-center gap-2"
                    >
                        {loading ? <><Loader2 className="w-5 h-5 animate-spin" /> Memproses...</> : "Masuk Panel"}
                    </button>
                </form>
            </div>
        </div>
    );
}
