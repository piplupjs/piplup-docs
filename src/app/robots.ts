import type { MetadataRoute } from 'next'
import { domain } from '@/lib/shared';
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${domain}/sitemap.xml`,
  }
}
