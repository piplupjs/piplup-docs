import { getPageImage, getPageMarkdownUrl, source } from '@/lib/source';
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
  MarkdownCopyButton,
  ViewOptionsPopover,
} from 'fumadocs-ui/layouts/docs/page';
import { notFound } from 'next/navigation';
import { getMDXComponents } from '@/components/mdx';
import type { Metadata } from 'next';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import { gitConfig } from '@/lib/shared';
import { breadcrumbJsonLd, softwareSourceCodeJsonLd } from '@/lib/json-ld';
import { openGraph } from '@/lib/open-graph';
import { packageTitleSuffix, packageForSlugs } from '@/lib/package-meta';

export default async function Page(props: PageProps<'/docs/[[...slug]]'>) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const MDX = page.data.body;
  const markdownUrl = getPageMarkdownUrl(page).url;

  const slugs = params.slug ?? [];
  const pkg = packageForSlugs(slugs);

  return (
    <>
      <script
        type="application/ld+json"
        // Built from our own frontmatter and slugs, not from user input.
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd(slugs, page.data.title)),
        }}
      />
      {pkg && slugs[slugs.length - 1] === 'installation' ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              softwareSourceCodeJsonLd(pkg, page.data.description ?? '', page.url),
            ),
          }}
        />
      ) : null}
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription className="mb-0">{page.data.description}</DocsDescription>
      <div className="flex flex-row gap-2 items-center border-b pb-6">
        <MarkdownCopyButton markdownUrl={markdownUrl} />
        <ViewOptionsPopover
          markdownUrl={markdownUrl}
          githubUrl={`https://github.com/${gitConfig.user}/${gitConfig.repo}/blob/${gitConfig.branch}/content/docs/${page.path}`}
        />
      </div>
      <DocsBody>
        <MDX
          components={getMDXComponents({
            // this allows you to link to other pages with relative file paths
            a: createRelativeLink(source, page),
          })}
        />
      </DocsBody>
    </DocsPage>
    </>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: PageProps<'/docs/[[...slug]]'>): Promise<Metadata> {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  return {
    title: `${page.data.title}${packageTitleSuffix(params.slug ?? [])}`,
    description: page.data.description,
    openGraph: openGraph({
      title: page.data.title,
      description: page.data.description,
      url: page.url,
      images: getPageImage(page).url,
    }),
    twitter: { card: 'summary_large_image', images: getPageImage(page).url },
    alternates: {
      canonical: page.url,
    },
    robots: page.data.noindex ? { index: false, follow: true } : undefined,
  };
}
