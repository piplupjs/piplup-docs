import type { MetadataRoute } from 'next';

import { domain } from '@/lib/shared';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      allow: '/',
      userAgent: '*',
    },
    sitemap: `${domain}/sitemap.xml`,
  };
}
