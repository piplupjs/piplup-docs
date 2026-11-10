import type { MetadataRoute } from 'next';
import { appDescription, appName, appTagline, brandColor } from '@/lib/shared';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${appName} — ${appTagline}`,
    short_name: appName,
    description: appDescription,
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: brandColor,
    icons: [
      {
        src: '/logo.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
      {
        src: '/favicon.ico',
        sizes: '48x48',
        type: 'image/x-icon',
      },
    ],
  };
}
