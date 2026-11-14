import type { Metadata } from 'next';

import Link from 'next/link';

import { openGraph } from '@/lib/open-graph';
import { appName, blogRoute } from '@/lib/shared';
import { getSortedPosts } from '@/lib/source';

export const metadata: Metadata = {
  alternates: {
    canonical: blogRoute,
    types: { 'application/rss+xml': `${blogRoute}/rss.xml` },
  },
  description: `Release notes and writing about the ${appName} packages — what changed, why, and how to migrate.`,
  openGraph: openGraph({
    description: `Release notes and writing about the ${appName} packages.`,
    title: 'Blog',
    url: blogRoute,
  }),
  title: 'Blog',
};

const dateFormat = new Intl.DateTimeFormat('en-US', {
  day: 'numeric',
  month: 'long',
  timeZone: 'UTC',
  year: 'numeric',
});

export default function Page() {
  const posts = getSortedPosts();
  const tags = [...new Set(posts.flatMap((post) => post.data.tags))].sort();

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-bold tracking-tight">Blog</h1>
      <p className="mt-2 text-fd-muted-foreground">
        Release notes and writing about the {appName} packages.{' '}
        <a className="underline underline-offset-4" href={`${blogRoute}/rss.xml`}>
          RSS
        </a>
      </p>

      {tags.length > 0 ? (
        <ul className="mt-6 flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <li
              className="rounded-md bg-fd-muted px-2 py-0.5 font-mono text-xs text-fd-muted-foreground"
              key={tag}
            >
              {tag}
            </li>
          ))}
        </ul>
      ) : null}

      {posts.length === 0 ? (
        <p className="mt-12 text-fd-muted-foreground">No posts yet.</p>
      ) : (
        <ul className="mt-10 flex flex-col divide-y border-t">
          {posts.map((post) => (
            <li key={post.url}>
              <Link className="group flex flex-col py-6" href={post.url}>
                <time
                  className="text-xs text-fd-muted-foreground"
                  dateTime={new Date(post.data.date).toISOString()}
                >
                  {dateFormat.format(new Date(post.data.date))}
                </time>
                <h2 className="mt-1 font-semibold group-hover:underline underline-offset-4">
                  {post.data.title}
                </h2>
                <p className="mt-1.5 text-sm text-fd-muted-foreground">{post.data.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
