import type { MetadataRoute } from 'next';
import { blog, source } from '@/lib/source';
import { blogRoute, domain } from '@/lib/shared';

/**
 * `/` is now a landing page of its own rather than a copy of `/docs`, so it is listed first and
 * ranks highest. `noindex` pages are left out.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const home: MetadataRoute.Sitemap = [
    {
      url: domain,
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];

  const docs = source
    .getPages()
    .filter((page) => !page.data.noindex)
    .map((page) => ({
      url: `${domain}${page.url}`,
      // `lastModified` comes from git via the collection's `lastModified` option.
      lastModified: page.data.lastModified,
      changeFrequency: 'weekly' as const,
      priority: page.url === '/docs' ? 0.9 : 0.7,
    }));

  const posts = blog.getPages().map((page) => ({
    url: `${domain}${page.url}`,
    lastModified: new Date(page.data.date),
    changeFrequency: 'yearly' as const,
    priority: 0.6,
  }));

  const blogIndex: MetadataRoute.Sitemap = posts.length
    ? [
        {
          url: `${domain}${blogRoute}`,
          changeFrequency: 'weekly',
          priority: 0.8,
        },
      ]
    : [];

  return [...home, ...docs, ...blogIndex, ...posts];
}
