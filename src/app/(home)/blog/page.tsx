import type { Metadata } from 'next';
import Link from 'next/link';
import { getSortedPosts } from '@/lib/source';
import { appName, blogRoute } from '@/lib/shared';
import { openGraph } from '@/lib/open-graph';

export const metadata: Metadata = {
  title: 'Blog',
  description: `Release notes and writing about the ${appName} packages — what changed, why, and how to migrate.`,
  openGraph: openGraph({
    title: 'Blog',
    description: `Release notes and writing about the ${appName} packages.`,
    url: blogRoute,
  }),
  alternates: {
    canonical: blogRoute,
    types: { 'application/rss+xml': `${blogRoute}/rss.xml` },
  },
};

const dateFormat = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  timeZone: 'UTC',
});

export default function Page() {
  const posts = getSortedPosts();
  const tags = [...new Set(posts.flatMap((post) => post.data.tags))].sort();

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-bold tracking-tight">Blog</h1>
      <p className="mt-2 text-fd-muted-foreground">
        Release notes and writing about the {appName} packages.{' '}
        <a href={`${blogRoute}/rss.xml`} className="underline underline-offset-4">
          RSS
        </a>
      </p>

      {tags.length > 0 ? (
        <ul className="mt-6 flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <li
              key={tag}
              className="rounded-md bg-fd-muted px-2 py-0.5 font-mono text-xs text-fd-muted-foreground"
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
              <Link href={post.url} className="group flex flex-col py-6">
                <time
                  dateTime={new Date(post.data.date).toISOString()}
                  className="text-xs text-fd-muted-foreground"
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
