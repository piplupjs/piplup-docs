import { appName, appDescription, blogRoute, domain } from '@/lib/shared';
import { getSortedPosts } from '@/lib/source';

export const revalidate = false;

/** Minimal XML escaping for the text we interpolate into the feed. */
function escape(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export function GET(): Response {
  const posts = getSortedPosts();
  const feedUrl = `${domain}${blogRoute}/rss.xml`;

  const items = posts
    .map((post) => {
      const url = `${domain}${post.url}`;
      return `    <item>
      <title>${escape(post.data.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(post.data.date).toUTCString()}</pubDate>
      <author>${escape(post.data.author)}</author>
      ${post.data.tags.map((tag) => `<category>${escape(tag)}</category>`).join('\n      ')}
      <description>${escape(post.data.description ?? '')}</description>
    </item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escape(appName)} Blog</title>
    <link>${domain}${blogRoute}</link>
    <description>${escape(appDescription)}</description>
    <language>en</language>
    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      'Cache-Control': 'public, max-age=3600',
      'Content-Type': 'application/rss+xml; charset=utf-8',
    },
  });
}
