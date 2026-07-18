const populationStats = [
    { group: "Dusun I", count: 850, percentage: 77 },
    { group: "Dusun II (Kalae)", count: 920, percentage: 83 },
    { group: "Dusun III (Trimasari)", count: 780, percentage: 70 },
    { group: "Dusun IV (Masiana)", count: 1100, percentage: 100 },
    { group: "Dusun V (Bonebula)", count: 871, percentage: 79 },
    { group: "Dusun VI (Toini)", count: 650, percentage: 59 },
];

export default function DataDesa() {
    return (
        <div className="container mx-auto px-4 py-12">
            <div className="text-center max-w-2xl mx-auto mb-16">
                <h1 className="text-4xl font-bold mb-4 text-primary">Data & Statistik Desa</h1>
                <p className="text-gray-600">
                    Visualisasi data kependudukan dan statistik wilayah Desa Nambaru berbasis data nyata secara berkala.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                {/* Ringkasan Data */}
                <div className="grid grid-cols-2 gap-6">
                    <div className="bg-primary/5 p-8 rounded-3xl border border-primary/20 text-center flex flex-col justify-center transform transition hover:scale-105">
                        <h3 className="text-5xl font-black text-primary mb-2">4.521</h3>
                        <p className="font-semibold text-gray-800 text-lg">Total Penduduk</p>
                    </div>
                    <div className="bg-white p-8 rounded-3xl border shadow-sm text-center flex flex-col justify-center transform transition hover:scale-105">
                        <h3 className="text-4xl font-black text-gray-900 mb-2">1.204</h3>
                        <p className="font-medium text-gray-600">Kepala Keluarga</p>
                    </div>
                    <div className="bg-white p-8 rounded-3xl border shadow-sm text-center flex flex-col justify-center transform transition hover:scale-105">
                        <h3 className="text-4xl font-black text-gray-900 mb-2">24</h3>
                        <p className="font-medium text-gray-600">RT (Rukun Tetangga)</p>
                    </div>
                    <div className="bg-white p-8 rounded-3xl border shadow-sm text-center flex flex-col justify-center transform transition hover:scale-105">
                        <h3 className="text-4xl font-black text-gray-900 mb-2">6</h3>
                        <p className="font-medium text-gray-600">Lingkungan/Dusun</p>
                    </div>
                </div>

                {/* Chart Sederhana */}
                <div className="bg-white p-8 rounded-3xl border shadow-sm flex flex-col justify-center">
                    <h2 className="text-2xl font-bold mb-8 text-gray-900">Distribusi Kependudukan</h2>
                    <div className="space-y-6">
                        {populationStats.map((stat, idx) => (
                            <div key={idx}>
                                <div className="flex justify-between items-end mb-2">
                                    <span className="font-semibold text-gray-700">{stat.group}</span>
                                    <span className="text-sm font-bold text-primary">{stat.count} Jiwa</span>
                                </div>
                                <div className="w-full bg-gray-100 rounded-full h-4 overflow-hidden shadow-inner">
                                    <div
                                        className="bg-primary h-full rounded-full transition-all duration-1000 ease-out"
                                        style={{ width: `${stat.percentage}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
