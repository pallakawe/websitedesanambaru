import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Website Desa Nambaru',
        short_name: 'Desa Nambaru',
        description: 'Sistem Informasi Web dan Manajemen Desa Nambaru, Kabupaten Parigi Moutong',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#16a34a', // Warna hijau primer
        icons: [
            {
                src: '/images/logokabupaten.png',
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: '/images/logokabupaten.png',
                sizes: '512x512',
                type: 'image/png',
            },
        ],
    }
}
