"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Loader2 } from "lucide-react";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        let mounted = true;

        const checkSession = async () => {
            const { data: { session }, error } = await supabase.auth.getSession();
            if (!session && mounted) {
                // If no active session, kick the user out to login
                router.replace("/login");
            } else if (mounted) {
                setLoading(false);
            }
        };

        checkSession();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            if ((event === 'SIGNED_OUT' || !session) && mounted) {
                router.replace('/login');
            }
        });

        return () => {
            mounted = false;
            subscription.unsubscribe();
        };
    }, [router, pathname]);

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
                <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
                <p className="text-gray-500 font-medium">Memverifikasi Sesi Keamanan...</p>
            </div>
        );
    }

    return <>{children}</>;
}
