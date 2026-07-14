const officials = [
    { id: 1, name: "Budi Santoso", position: "Kepala Desa", period: "2020-2026", photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&w=400&q=80" },
    { id: 2, name: "Ahmad Riyadi", position: "Sekretaris Desa", period: "2022-2028", photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&w=400&q=80" },
    { id: 3, name: "Siti Aminah", position: "Bendahara Desa", period: "2021-2027", photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&w=400&q=80" },
    { id: 4, name: "Hasan Basri", position: "Kasi Pemerintahan", period: "2019-2025", photo: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?ixlib=rb-4.0.3&w=400&q=80" },
    { id: 5, name: "Dewi Lestari", position: "Kasi Pelayanan", period: "2023-2029", photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&w=400&q=80" },
    { id: 6, name: "Agus Salim", position: "Kasi Kesejahteraan", period: "2020-2026", photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&w=400&q=80" }
];

export default function AparaturDesa() {
    return (
        <div className="container mx-auto px-4 py-12">
            <div className="text-center max-w-2xl mx-auto mb-16">
                <h1 className="text-4xl font-bold mb-4 text-primary">Aparatur Desa Nambaru</h1>
                <p className="text-gray-600">
                    Struktur organisasi pemerintahan Desa Nambaru yang berkomitmen melayani masyarakat dengan sepenuh hati, jujur, dan bertanggung jawab.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {officials.map((official) => (
                    <div key={official.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border group hover:border-primary transition-all hover:shadow-md">
                        <div className="aspect-square bg-muted overflow-hidden">
                            <img src={official.photo} alt={official.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        </div>
                        <div className="p-6 text-center">
                            <h3 className="text-xl font-bold text-gray-900 mb-1">{official.name}</h3>
                            <p className="text-primary font-semibold mb-2">{official.position}</p>
                            <div className="inline-block bg-muted px-3 py-1 rounded text-xs text-gray-600 font-medium">
                                Periode: {official.period}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
