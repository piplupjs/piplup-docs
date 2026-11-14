import {
  appAlternateNames,
  appDescription,
  appName,
  docsRoute,
  domain,
  gitConfig,
  logoPath,
  npmOrg,
} from './shared';

/**
 * Structured data helpers. Every payload is built from our own constants and from page frontmatter
 * we author, so the JSON is ours — there is no user input to escape.
 */

function absolute(path: string): string {
  return new URL(path, domain).toString();
}

export function webSiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    alternateName: appAlternateNames,
    description: appDescription,
    name: appName,
    potentialAction: {
      '@type': 'SearchAction',
      'query-input': 'required name=search_term_string',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${domain}${docsRoute}?q={search_term_string}`,
      },
    },
    publisher: { '@type': 'Organization', name: appName, url: domain },
    url: domain,
  };
}

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    alternateName: appAlternateNames,
    logo: absolute(logoPath),
    name: appName,
    sameAs: [`https://github.com/${gitConfig.user}`, npmOrg],
    url: domain,
  };
}

/**
 * A trail built from a docs page's slugs. `/docs/rhf-adapters/mui-material/components/x` becomes
 * Docs › rhf-adapters › mui-material › components › x. Intermediate segments are included even
 * when they have no page of their own, which is what Google expects from a breadcrumb.
 */
export function breadcrumbJsonLd(slugs: string[], title: string) {
  const items = [{ name: 'Docs', url: absolute(docsRoute) }];

  slugs.forEach((slug, index) => {
    const isLast = index === slugs.length - 1;
    items.push({
      name: isLast ? title : slug,
      url: absolute(`${docsRoute}/${slugs.slice(0, index + 1).join('/')}`),
    });
  });

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      item: item.url,
      name: item.name,
      position: index + 1,
    })),
  };
}

/** For a package's installation page, which is the page that describes the package itself. */
export function softwareSourceCodeJsonLd(packageName: string, description: string, url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareSourceCode',
    author: { '@type': 'Organization', name: appName, url: domain },
    codeRepository: `https://github.com/${gitConfig.user}`,
    description,
    license: 'https://opensource.org/licenses/MIT',
    name: packageName,
    programmingLanguage: 'TypeScript',
    runtimePlatform: 'React',
    url: absolute(url),
  };
}

/**
 * Every docs page. `dateModified` comes from git, which is the freshness signal Google reads for
 * reference docs; it is left out rather than guessed when git history is unavailable.
 */
export function techArticleJsonLd(page: {
  /** The npm package the page documents, if any. */
  about?: string;
  description?: string;
  image: string;
  lastModified?: Date;
  title: string;
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    description: page.description,
    headline: page.title,
    image: absolute(page.image),
    inLanguage: 'en',
    mainEntityOfPage: { '@id': absolute(page.url), '@type': 'WebPage' },
    url: absolute(page.url),
    ...(page.lastModified ? { dateModified: page.lastModified.toISOString() } : {}),
    ...(page.about ? { about: { '@type': 'SoftwareSourceCode', name: page.about } } : {}),
    author: { '@type': 'Organization', name: appName, url: domain },
    publisher: {
      '@type': 'Organization',
      logo: { '@type': 'ImageObject', url: absolute(logoPath) },
      name: appName,
      url: domain,
    },
  };
}

/** From a page's `faq` frontmatter, which is also rendered visibly, as Google requires. */
export function faqPageJsonLd(faq: ReadonlyArray<{ answer: string; question: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map(({ answer, question }) => ({
      '@type': 'Question',
      // Structured data is plain text, so drop the code markers the visible copy renders.
      acceptedAnswer: { '@type': 'Answer', text: answer.replaceAll('`', '') },
      name: question,
    })),
  };
}

export function blogPostingJsonLd(post: {
  author: string;
  date: Date;
  description?: string;
  image: string;
  /** Last git change to the post; falls back to `date`. */
  lastModified?: Date;
  title: string;
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    author: { '@type': 'Person', name: post.author },
    // A post first committed before its `date` would otherwise claim to be modified before it
    // was published.
    dateModified: (post.lastModified && post.lastModified > post.date
      ? post.lastModified
      : post.date
    ).toISOString(),
    datePublished: post.date.toISOString(),
    description: post.description,
    headline: post.title,
    image: absolute(post.image),
    mainEntityOfPage: { '@id': absolute(post.url), '@type': 'WebPage' },
    publisher: { '@type': 'Organization', name: appName, url: domain },
  };
}
