import { appDescription, appName, docsRoute, domain, gitConfig, logoPath, npmOrg } from './shared';

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
    name: appName,
    description: appDescription,
    url: domain,
    publisher: { '@type': 'Organization', name: appName, url: domain },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${domain}${docsRoute}?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: appName,
    url: domain,
    logo: absolute(logoPath),
    sameAs: [`https://github.com/${gitConfig.user}`, npmOrg],
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
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/** For a package's installation page, which is the page that describes the package itself. */
export function softwareSourceCodeJsonLd(packageName: string, description: string, url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareSourceCode',
    name: packageName,
    description,
    url: absolute(url),
    codeRepository: `https://github.com/${gitConfig.user}`,
    programmingLanguage: 'TypeScript',
    runtimePlatform: 'React',
    license: 'https://opensource.org/licenses/MIT',
    author: { '@type': 'Organization', name: appName, url: domain },
  };
}

export function blogPostingJsonLd(post: {
  title: string;
  description?: string;
  author: string;
  date: Date;
  url: string;
  image: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date.toISOString(),
    dateModified: post.date.toISOString(),
    author: { '@type': 'Person', name: post.author },
    publisher: { '@type': 'Organization', name: appName, url: domain },
    image: absolute(post.image),
    mainEntityOfPage: { '@type': 'WebPage', '@id': absolute(post.url) },
  };
}
