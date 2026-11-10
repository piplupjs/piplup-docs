import type { MetadataRoute } from 'next';
import { appDescription, appName, appTagline } from '@/lib/shared';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${appName} — ${appTagline}`,
    short_name: appName,
    description: appDescription,
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#1d4ed8',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  };
}
