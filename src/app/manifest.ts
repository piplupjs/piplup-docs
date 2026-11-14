import type { MetadataRoute } from 'next';

import { appDescription, appName, appTagline, brandColor } from '@/lib/shared';

export default function manifest(): MetadataRoute.Manifest {
  return {
    background_color: '#ffffff',
    description: appDescription,
    display: 'standalone',
    icons: [
      {
        sizes: 'any',
        src: '/logo.svg',
        type: 'image/svg+xml',
      },
      {
        sizes: '48x48',
        src: '/favicon.ico',
        type: 'image/x-icon',
      },
    ],
    name: `${appName} — ${appTagline}`,
    short_name: appName,
    start_url: '/',
    theme_color: brandColor,
  };
}
