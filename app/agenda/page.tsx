"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Loader2 } from "lucide-react";

const defaultAgendas = [
    { id: 1, title: "Rapat Minggon Desa", date: "15 Agustus 2026", time: "09:00 - 12:00", location: "Balai Desa Nambaru", description: "Rapat koordinasi mingguan antara kepala desa, perangkat desa, dan ketua RT/RW." },
    { id: 2, title: "Penyuluhan Pertanian Organik", date: "20 Agustus 2026", time: "08:30 - 11:30", location: "Aula Serbaguna", description: "Penyuluhan mengenai tata cara pembuatan pupuk organik dari Dinas Pertanian Kabupaten." },
    { id: 3, title: "Kerja Bakti Massal", date: "24 Agustus 2026", time: "07:00 - Selesai", location: "Sepanjang Jalan Utama", description: "Kerja bakti bersama seluruh warga untuk membersihkan saluran air dan pinggir jalan." },
    { id: 4, title: "Posyandu Balita & Lansia", date: "28 Agustus 2026", time: "08:00 - 11:00", location: "Puskesdes Nambaru", description: "Layanan rutin pemeriksaan kesehatan untuk balita, ibu hamil, dan lansia." },
];

export default function AgendaDesa() {
    const [agendas, setAgendas] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAgendas = async () => {
            const { data, error } = await supabase
                .from("agendas")
                .select("*")
                .order("event_date", { ascending: true });

            if (error || !data || data.length === 0) {
                setAgendas(defaultAgendas);
            } else {
                setAgendas(data);
            }
            setLoading(false);
        };
        fetchAgendas();
    }, []);

    const formatEventData = (agenda: any) => {
        if (typeof agenda.id === "number") {
            // ini data default lokal
            return {
                ...agenda,
                dayMonth: agenda.date.split(" ")[0],
                monthLabel: agenda.date.split(" ")[1],
            };
        }
        // Ini data dari Supabase
        const d = new Date(agenda.event_date);
        return {
            id: agenda.id,
            title: agenda.title,
            description: agenda.description,
            location: agenda.location,
            time: d.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }) + " WIB",
            dayMonth: d.toLocaleDateString("id-ID", { day: "numeric" }),
            monthLabel: d.toLocaleDateString("id-ID", { month: "long" }),
        };
    };

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="text-center max-w-2xl mx-auto mb-16">
                <h1 className="text-4xl font-bold mb-4 text-primary">Agenda Desa</h1>
                <p className="text-gray-600">
                    Jadwal kegiatan operasional, acara, dan musyawarah yang akan diselenggarakan di Desa Nambaru.
                </p>
            </div>

            <div className="max-w-4xl mx-auto space-y-6">
                {loading ? (
                    <div className="flex justify-center items-center py-20 text-gray-500">
                        <Loader2 className="w-10 h-10 animate-spin mr-3 text-primary" />
                        <span className="font-semibold text-lg">Memuat Agenda...</span>
                    </div>
                ) : (
                    agendas.map((rawItem) => {
                        const agenda = formatEventData(rawItem);
                        return (
                            <div key={agenda.id} className="bg-white rounded-2xl p-6 border shadow-sm flex flex-col md:flex-row gap-6 hover:border-primary transition-all group">
                                <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 text-center min-w-[120px] flex flex-col justify-center items-center">
                                    <span className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">{agenda.monthLabel}</span>
                                    <span className="text-4xl font-black text-primary">{agenda.dayMonth}</span>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">{agenda.title}</h3>
                                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 font-medium mb-3">
                                        <span className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full">
                                            ⏱ {agenda.time}
                                        </span>
                                        <span className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full">
                                            📍 {agenda.location}
                                        </span>
                                    </div>
                                    <p className="text-gray-600 leading-relaxed text-justify">{agenda.description}</p>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}
