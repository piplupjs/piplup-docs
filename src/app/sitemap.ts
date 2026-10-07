import type { MetadataRoute } from 'next';
import { source } from '@/lib/source';
import { domain } from '@/lib/shared';

// `/` renders the same page as `/docs` and canonicalizes to it, so only
// the docs URLs are listed. `noindex` pages are left out too.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return source.getPages().filter((page) => !page.data.noindex).map((page) => ({
    url: `${domain}${page.url}`,
    changeFrequency: 'weekly' as const,
    priority: page.url === '/docs' ? 1 : 0.7,
  }));
}
