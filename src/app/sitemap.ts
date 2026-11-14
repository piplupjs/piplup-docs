import type { MetadataRoute } from 'next';

import { blogRoute, domain } from '@/lib/shared';
import { blog, source } from '@/lib/source';

/**
 * `/` is now a landing page of its own rather than a copy of `/docs`, so it is listed first and
 * ranks highest. `noindex` pages are left out.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const home: MetadataRoute.Sitemap = [
    {
      changeFrequency: 'monthly',
      priority: 1,
      url: domain,
    },
  ];

  const docs = source
    .getPages()
    .filter((page) => !page.data.noindex)
    .map((page) => ({
      changeFrequency: 'weekly' as const,
      // `lastModified` comes from git via the collection's `lastModified` option.
      lastModified: page.data.lastModified,
      priority: page.url === '/docs' ? 0.9 : 0.7,
      url: `${domain}${page.url}`,
    }));

  const posts = blog.getPages().map((page) => ({
    changeFrequency: 'yearly' as const,
    lastModified: new Date(page.data.date),
    priority: 0.6,
    url: `${domain}${page.url}`,
  }));

  const blogIndex: MetadataRoute.Sitemap = posts.length
    ? [
        {
          changeFrequency: 'weekly',
          priority: 0.8,
          url: `${domain}${blogRoute}`,
        },
      ]
    : [];

  return [...home, ...docs, ...blogIndex, ...posts];
}
