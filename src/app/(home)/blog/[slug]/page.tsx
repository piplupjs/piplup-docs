import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { InlineTOC } from 'fumadocs-ui/components/inline-toc';
import { getMDXComponents } from '@/components/mdx';
import { blog, getBlogImage } from '@/lib/source';
import { blogPostingJsonLd } from '@/lib/json-ld';
import { blogRoute } from '@/lib/shared';
import { openGraph } from '@/lib/open-graph';

const dateFormat = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  timeZone: 'UTC',
});

export default async function Page(props: PageProps<'/blog/[slug]'>) {
  const params = await props.params;
  const page = blog.getPage([params.slug]);
  if (!page) notFound();

  const MDX = page.data.body;
  const date = new Date(page.data.date);

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-16">
      <script
        type="application/ld+json"
        // Built from this post's own frontmatter, which we author.
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            blogPostingJsonLd({
              title: page.data.title,
              description: page.data.description,
              author: page.data.author,
              date,
              lastModified: page.data.lastModified,
              url: page.url,
              image: getBlogImage(page).url,
            }),
          ),
        }}
      />

      <Link
        href={blogRoute}
        className="text-sm text-fd-muted-foreground hover:underline underline-offset-4"
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
          <span key={tag} className="rounded-md bg-fd-muted px-2 py-0.5 font-mono text-xs">
            {tag}
          </span>
        ))}
      </div>

      <InlineTOC items={page.data.toc} className="mt-8" />

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
  if (!page) notFound();

  const image = getBlogImage(page).url;

  return {
    title: page.data.title,
    description: page.data.description,
    alternates: { canonical: page.url },
    openGraph: openGraph({
      type: 'article',
      title: page.data.title,
      description: page.data.description,
      url: page.url,
      images: image,
      publishedTime: new Date(page.data.date).toISOString(),
      authors: [page.data.author],
      tags: [...page.data.tags],
    }),
    twitter: { card: 'summary_large_image', images: image },
  };
}
