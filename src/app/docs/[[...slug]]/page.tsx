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
import {
  breadcrumbJsonLd,
  faqPageJsonLd,
  softwareSourceCodeJsonLd,
  techArticleJsonLd,
} from '@/lib/json-ld';
import { Faq } from '@/components/faq';
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

  // Google only accepts FAQ markup for questions the reader can see, so a page with `faq` data must
  // also render it under a `## FAQ` heading. Fail the build rather than ship hidden markup.
  const { faq } = page.data;
  if (faq?.length && !page.data.toc.some((item) => item.url === '#faq')) {
    throw new Error(
      `${page.path} has \`faq\` frontmatter but no "## FAQ" heading with <Faq /> under it.`,
    );
  }

  return (
    <>
      <script
        type="application/ld+json"
        // Built from our own frontmatter and slugs, not from user input.
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd(slugs, page.data.title)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            techArticleJsonLd({
              title: page.data.title,
              description: page.data.description,
              url: page.url,
              image: getPageImage(page).url,
              lastModified: page.data.lastModified,
              about: pkg ?? undefined,
            }),
          ),
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
      {faq?.length ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageJsonLd(faq)) }}
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
              Faq: () => <Faq items={faq} />,
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

  // A hand-written search title wins; otherwise the export name, disambiguated by its package.
  const { seoTitle } = page.data;
  const title = seoTitle ?? `${page.data.title}${packageTitleSuffix(params.slug ?? [])}`;

  return {
    title,
    description: page.data.description,
    openGraph: openGraph({
      title: seoTitle ?? page.data.title,
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
