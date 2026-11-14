import * as React from 'react';

import type { Metadata } from 'next';

import { notFound } from 'next/navigation';

import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
  MarkdownCopyButton,
  ViewOptionsPopover,
} from 'fumadocs-ui/layouts/docs/page';
import { createRelativeLink } from 'fumadocs-ui/mdx';

import { Faq } from '@/components/faq';
import { getMDXComponents } from '@/components/mdx';
import {
  breadcrumbJsonLd,
  faqPageJsonLd,
  softwareSourceCodeJsonLd,
  techArticleJsonLd,
} from '@/lib/json-ld';
import { openGraph } from '@/lib/open-graph';
import { packageTitleSuffix, packageForSlugs } from '@/lib/package-meta';
import { gitConfig } from '@/lib/shared';
import { getPageImage, getPageMarkdownUrl, source } from '@/lib/source';

export default async function Page(props: PageProps<'/docs/[[...slug]]'>) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) {
    notFound();
  }

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
    <React.Fragment>
      <script
        // Built from our own frontmatter and slugs, not from user input.
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd(slugs, page.data.title)),
        }}
        type="application/ld+json"
      />
      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            techArticleJsonLd({
              about: pkg ?? undefined,
              description: page.data.description,
              image: getPageImage(page).url,
              lastModified: page.data.lastModified,
              title: page.data.title,
              url: page.url,
            }),
          ),
        }}
        type="application/ld+json"
      />
      {pkg && slugs[slugs.length - 1] === 'installation' ? (
        <script
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              softwareSourceCodeJsonLd(pkg, page.data.description ?? '', page.url),
            ),
          }}
          type="application/ld+json"
        />
      ) : null}
      {faq?.length ? (
        <script
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageJsonLd(faq)) }}
          type="application/ld+json"
        />
      ) : null}
      <DocsPage full={page.data.full} toc={page.data.toc}>
        <DocsTitle>{page.data.title}</DocsTitle>
        <DocsDescription className="mb-0">{page.data.description}</DocsDescription>
        <div className="flex flex-row gap-2 items-center border-b pb-6">
          <MarkdownCopyButton markdownUrl={markdownUrl} />
          <ViewOptionsPopover
            githubUrl={`https://github.com/${gitConfig.user}/${gitConfig.repo}/blob/${gitConfig.branch}/content/docs/${page.path}`}
            markdownUrl={markdownUrl}
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
    </React.Fragment>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: PageProps<'/docs/[[...slug]]'>): Promise<Metadata> {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) {
    notFound();
  }

  // A hand-written search title wins; otherwise the export name, disambiguated by its package.
  const { seoTitle } = page.data;
  const title = seoTitle ?? `${page.data.title}${packageTitleSuffix(params.slug ?? [])}`;

  return {
    alternates: {
      canonical: page.url,
    },
    description: page.data.description,
    openGraph: openGraph({
      description: page.data.description,
      images: getPageImage(page).url,
      title: seoTitle ?? page.data.title,
      url: page.url,
    }),
    robots: page.data.noindex ? { follow: true, index: false } : undefined,
    title,
    twitter: { card: 'summary_large_image', images: getPageImage(page).url },
  };
}
