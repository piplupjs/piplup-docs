export const appName = 'Piplup';
export const appTagline = 'Lightweight, modular React libraries';
/** The meta description for the home page and the default for others: keep it under 160 characters. */
export const appDescription =
  'Small, typed React libraries: react-hook-form adapters for MUI and native inputs, role-based access control, cache busting and utility hooks.';
export const domain = 'https://www.piplupjs.com';
/** From the Piplup mark in public/logo.svg. */
export const brandColor = '#30b952';
export const logoPath = '/logo.svg';
export const logoWithTextPath = '/logo-with-text.svg';
/** 1210x630 branded card, used as the default Open Graph image. */
export const socialCardPath = '/piplup-social-card.png';
export const docsRoute = '/docs';
export const blogRoute = '/blog';
export const docsImageRoute = '/og/docs';
export const blogImageRoute = '/og/blog';
export const docsContentRoute = '/llms.mdx/docs';

/**
 * Sent with every machine-readable copy of the docs: the per-page markdown (served at
 * `/docs/<page>.mdx` and on `Accept: text/markdown`), `llms.txt` and `llms-full.txt`. Without it
 * Google can index each page twice, once as HTML and once as markdown, and split ranking between
 * them. `noindex` rather than a canonical `Link` header: Google advises against sending both, and a
 * canonical is only a hint.
 */
export const markdownCopyHeaders = { 'X-Robots-Tag': 'noindex, follow' } as const;

export const gitConfig = {
  user: 'piplupjs',
  repo: 'piplup-docs',
  branch: 'main',
};

/** The npm organisation the documented packages are published under. */
export const npmOrg = 'https://www.npmjs.com/org/piplup';

/**
 * The four problem areas the packages are grouped into. This is the same grouping as the docs
 * sidebar roots in `content/docs/(*)/meta.json`, and the landing page renders from it.
 */
export const concerns = [
  {
    title: 'React Hook Form adapters',
    description:
      'Bind react-hook-form to MUI, the X date pickers or native inputs without rewriting the same Controller boilerplate on every field.',
    href: '/docs/forms',
    packages: ['@piplup/rhf-core', '@piplup/rhf-adapters'],
  },
  {
    title: 'Access control for React',
    description:
      'Gate UI on the signed-in user’s roles and permissions, with hierarchical wildcard grants and permission names TypeScript checks for you.',
    href: '/docs/access-control',
    packages: ['@piplup/react-acl'],
  },
  {
    title: 'Cache busting for React and Vite',
    description:
      'Notice that a new build has shipped and reload clients still running the old bundle, instead of leaving users on a stale release.',
    href: '/docs/cache-busting',
    packages: ['@piplup/cache-buster', '@piplup/vite-plugin-cache-buster'],
  },
  {
    title: 'React utility hooks',
    description:
      'The ref helpers, stable callbacks and reactive localStorage hook the other packages are built on, published on their own.',
    href: '/docs/utilities',
    packages: ['@piplup/utils'],
  },
] as const;
