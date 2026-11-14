import type { Metadata } from 'next';

import Link from 'next/link';
import { notFound } from 'next/navigation';

import { InlineTOC } from 'fumadocs-ui/components/inline-toc';

import { getMDXComponents } from '@/components/mdx';
import { blogPostingJsonLd } from '@/lib/json-ld';
import { openGraph } from '@/lib/open-graph';
import { blogRoute } from '@/lib/shared';
import { blog, getBlogImage } from '@/lib/source';

const dateFormat = new Intl.DateTimeFormat('en-US', {
  day: 'numeric',
  month: 'long',
  timeZone: 'UTC',
  year: 'numeric',
});

export default async function Page(props: PageProps<'/blog/[slug]'>) {
  const params = await props.params;
  const page = blog.getPage([params.slug]);
  if (!page) {
    notFound();
  }

  const MDX = page.data.body;
  const date = new Date(page.data.date);

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-16">
      <script
        // Built from this post's own frontmatter, which we author.
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            blogPostingJsonLd({
              author: page.data.author,
              date,
              description: page.data.description,
              image: getBlogImage(page).url,
              lastModified: page.data.lastModified,
              title: page.data.title,
              url: page.url,
            }),
          ),
        }}
        type="application/ld+json"
      />

      <Link
        className="text-sm text-fd-muted-foreground hover:underline underline-offset-4"
        href={blogRoute}
      >
        ← Blog
      </Link>

      <h1 className="mt-4 text-3xl font-bold tracking-tight text-balance">{page.data.title}</h1>
      <p className="mt-3 text-fd-muted-foreground">{page.data.description}</p>

      <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-fd-muted-foreground">
        <span>{page.data.author}</span>
        <span aria-hidden>·</span>
        <time dateTime={date.toISOString()}>{dateFormat.format(date)}</time>
        {page.data.tags.map((tag) => (
          <span className="rounded-md bg-fd-muted px-2 py-0.5 font-mono text-xs" key={tag}>
            {tag}
          </span>
        ))}
      </div>

      <InlineTOC className="mt-8" items={page.data.toc} />

      <div className="prose mt-8">
        <MDX components={getMDXComponents()} />
      </div>
    </main>
  );
}

export function generateStaticParams() {
  return blog.getPages().map((page) => ({ slug: page.slugs[0] as string }));
}

export async function generateMetadata(props: PageProps<'/blog/[slug]'>): Promise<Metadata> {
  const params = await props.params;
  const page = blog.getPage([params.slug]);
  if (!page) {
    notFound();
  }

  const image = getBlogImage(page).url;

  return {
    alternates: { canonical: page.url },
    description: page.data.description,
    openGraph: openGraph({
      authors: [page.data.author],
      description: page.data.description,
      images: image,
      publishedTime: new Date(page.data.date).toISOString(),
      tags: [...page.data.tags],
      title: page.data.title,
      type: 'article',
      url: page.url,
    }),
    title: page.data.title,
    twitter: { card: 'summary_large_image', images: image },
  };
}
