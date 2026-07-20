"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface OfficialItem {
    id: string;
    name: string;
    position: string;
    period: string;
    photo_url: string | null;
}

const DEFAULT_OFFICIALS: OfficialItem[] = [
    { id: "default-1", name: "Asmuran", position: "Kepala Desa", photo_url: "/images/fotokades.png", period: "2026 - 2032" },
    { id: "default-2", name: "Kamarudin", position: "Sekretaris Desa", photo_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&w=400&q=80", period: "2026 - 2032" },
    { id: "default-3", name: "Muhammad Ibnu", position: "Kaur Perencanaan", photo_url: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?ixlib=rb-4.0.3&w=400&q=80", period: "2026 - 2032" },
    { id: "default-4", name: "Umi Kalsum", position: "Kaur Umum", photo_url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&w=400&q=80", period: "2026 - 2032" },
    { id: "default-5", name: "I Putu Suci Astawa", position: "Kaur Keuangan", photo_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&w=400&q=80", period: "2026 - 2032" },
    { id: "default-6", name: "Refly", position: "Kasi Pemerintahan", photo_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&w=400&q=80", period: "2026 - 2032" },
    { id: "default-7", name: "Marlina", position: "Kasi Kesejahteraan dan Pelayanan", photo_url: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&w=400&q=80", period: "2026 - 2032" },
    { id: "default-8", name: "Alwin", position: "Kepala Dusun I", photo_url: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&w=400&q=80", period: "2026 - 2032" },
    { id: "default-9", name: "Jamaluddin", position: "Kepala Dusun II", photo_url: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&w=400&q=80", period: "2026 - 2032" },
    { id: "default-10", name: "I Putu Indra Yogi", position: "Kepala Dusun III", photo_url: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&w=400&q=80", period: "2026 - 2032" },
    { id: "default-11", name: "Yerry Elshinta", position: "Kepala Dusun IV", photo_url: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&w=400&q=80", period: "2026 - 2032" },
    { id: "default-12", name: "Junaedi Biki", position: "Kepala Dusun V", photo_url: "https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-4.0.3&w=400&q=80", period: "2026 - 2032" },
    { id: "default-13", name: "Rifandi", position: "Kepala Dusun VI", photo_url: "https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?ixlib=rb-4.0.3&w=400&q=80", period: "2026 - 2032" },
];

function OrgNode({ title, name, color = "bg-white border-primary" }: { title: string; name: string; color?: string }) {
    return (
        <div className={`${color} border-2 rounded-xl px-4 py-3 text-center shadow-sm min-w-[140px]`}>
            <p className="text-[11px] font-bold uppercase tracking-wide text-primary mb-0.5">{title}</p>
            <p className="text-sm font-semibold text-gray-800 leading-tight">{name}</p>
        </div>
    );
}

export default function AparaturDesa() {
    const [officials, setOfficials] = useState<OfficialItem[]>(DEFAULT_OFFICIALS);

    useEffect(() => {
        supabase.from("officials")
            .select("id, name, position, period, photo_url")
            .order("created_at", { ascending: true })
            .then(({ data }) => {
                if (data && data.length > 0) {
                    const merged = DEFAULT_OFFICIALS.map(def => {
                        const dbMatch = data.find(item =>
                            item.position.toLowerCase().replace(/\s+/g, '') === def.position.toLowerCase().replace(/\s+/g, '')
                        );
                        return dbMatch ? { ...dbMatch, id: dbMatch.id } : def;
                    });

                    const extra = data.filter(item =>
                        !DEFAULT_OFFICIALS.some(def =>
                            def.position.toLowerCase().replace(/\s+/g, '') === item.position.toLowerCase().replace(/\s+/g, '')
                        )
                    );

                    setOfficials([...merged, ...extra]);
                }
            });
    }, []);

    const getOfficialName = (positionName: string) => {
        const found = officials.find(item =>
            item.position.toLowerCase().replace(/\s+/g, '') === positionName.toLowerCase().replace(/\s+/g, '') ||
            (positionName.includes("Kasi Kesejahteraan") && item.position.toLowerCase().includes("kesejahteraan"))
        );
        return found ? found.name : "-";
    };

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="text-center max-w-2xl mx-auto mb-16">
                <h1 className="text-4xl font-bold mb-4 text-primary">Aparatur Desa Nambaru</h1>
                <p className="text-gray-600">
                    Struktur organisasi pemerintahan Desa Nambaru yang berkomitmen melayani masyarakat dengan sepenuh hati, jujur, dan bertanggung jawab.
                </p>
            </div>

            {/* Bagan Struktur Organisasi */}
            <div className="mb-20">
                <h2 className="text-2xl font-bold text-center mb-10 text-gray-800">Bagan Struktur Organisasi</h2>

                <div className="overflow-x-auto pb-4">
                    <div className="flex flex-col items-center gap-0 min-w-[900px]">

                        {/* BPD + Kepala Desa */}
                        <div className="flex items-center justify-center gap-6 w-full">
                            <div className="border-2 border-dashed border-gray-400 rounded-xl px-4 py-3 text-center min-w-[120px]">
                                <p className="text-sm font-bold text-gray-600">BPD</p>
                            </div>
                            <div className="flex-shrink-0 w-8 border-t-2 border-dashed border-gray-400"></div>
                            <OrgNode title="Kepala Desa" name={getOfficialName("Kepala Desa")} color="bg-primary/10 border-primary" />
                        </div>

                        <div className="h-8 w-px bg-gray-400"></div>

                        <OrgNode title="Sekretaris Desa" name={getOfficialName("Sekretaris Desa")} color="bg-green-50 border-green-600" />

                        <div className="h-8 w-px bg-gray-400"></div>

                        {/* KAUR row */}
                        <div className="flex items-start justify-center gap-8 w-full relative">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[560px] h-px bg-gray-400"></div>
                            <div className="flex flex-col items-center gap-0">
                                <div className="h-8 w-px bg-gray-400"></div>
                                <OrgNode title="Kaur Perencanaan" name={getOfficialName("Kaur Perencanaan")} />
                            </div>
                            <div className="flex flex-col items-center gap-0">
                                <div className="h-8 w-px bg-gray-400"></div>
                                <OrgNode title="Kaur Umum" name={getOfficialName("Kaur Umum")} />
                            </div>
                            <div className="flex flex-col items-center gap-0">
                                <div className="h-8 w-px bg-gray-400"></div>
                                <OrgNode title="Kaur Keuangan" name={getOfficialName("Kaur Keuangan")} />
                            </div>
                        </div>

                        <div className="h-8 w-px bg-gray-400 mt-0"></div>

                        {/* KASI row */}
                        <div className="flex items-start justify-center gap-16 w-full relative">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[340px] h-px bg-gray-400"></div>
                            <div className="flex flex-col items-center gap-0">
                                <div className="h-8 w-px bg-gray-400"></div>
                                <OrgNode title="Kasi Pemerintahan" name={getOfficialName("Kasi Pemerintahan")} />
                            </div>
                            <div className="flex flex-col items-center gap-0">
                                <div className="h-8 w-px bg-gray-400"></div>
                                <OrgNode title="Kasi Kesejahteraan & Pelayanan" name={getOfficialName("Kasi Kesejahteraan dan Pelayanan")} />
                            </div>
                        </div>

                        <div className="h-8 w-px bg-gray-400"></div>

                        {/* KADUS row */}
                        <div className="flex items-start justify-center gap-4 w-full relative">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-px bg-gray-400"></div>
                            {[
                                { title: "Kepala Dusun I", name: getOfficialName("Kepala Dusun I") },
                                { title: "Kepala Dusun II", name: getOfficialName("Kepala Dusun II") },
                                { title: "Kepala Dusun III", name: getOfficialName("Kepala Dusun III") },
                                { title: "Kepala Dusun IV", name: getOfficialName("Kepala Dusun IV") },
                                { title: "Kepala Dusun V", name: getOfficialName("Kepala Dusun V") },
                                { title: "Kepala Dusun VI", name: getOfficialName("Kepala Dusun VI") },
                            ].map((kadus) => (
                                <div key={kadus.title} className="flex flex-col items-center gap-0">
                                    <div className="h-8 w-px bg-gray-400"></div>
                                    <OrgNode title={kadus.title} name={kadus.name} />
                                </div>
                            ))}
                        </div>

                        {/* Legend */}
                        <div className="flex gap-6 mt-10 text-xs text-gray-500">
                            <div className="flex items-center gap-2">
                                <div className="w-8 border-t-2 border-gray-500"></div>
                                <span>Garis Komando</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-8 border-t-2 border-dashed border-gray-400"></div>
                                <span>Garis Koordinasi</span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* Foto Aparatur */}
            <h2 className="text-2xl font-bold text-center mb-10 text-gray-800">Daftar Aparatur Desa</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {officials.map((official) => (
                    <div key={official.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border group hover:border-primary transition-all hover:shadow-md">
                        <div className="aspect-square bg-muted overflow-hidden">
                            <img src={official.photo_url || "/images/fotokades.png"} alt={official.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        </div>
                        <div className="p-6 text-center">
                            <h3 className="text-xl font-bold text-gray-900 mb-1">{official.name}</h3>
                            <p className="text-primary font-semibold">{official.position}</p>
                            <p className="text-gray-400 text-xs mt-1">Periode: {official.period}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
