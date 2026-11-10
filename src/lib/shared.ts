export const appName = 'Piplup';
export const appTagline = 'Lightweight, modular React libraries';
export const appDescription =
  'A collection of small, typed React libraries: react-hook-form adapters for MUI and native inputs, permission-based access control, cache busting for deployed apps, and the utility hooks underneath them.';
export const domain = 'https://www.piplupjs.com';
export const docsRoute = '/docs';
export const blogRoute = '/blog';
export const docsImageRoute = '/og/docs';
export const blogImageRoute = '/og/blog';
export const docsContentRoute = '/llms.mdx/docs';

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
    title: 'Forms',
    description:
      'Bind react-hook-form to MUI, the X date pickers or native inputs without rewriting the same Controller boilerplate on every field.',
    href: '/docs/forms',
    packages: ['@piplup/rhf-core', '@piplup/rhf-adapters'],
  },
  {
    title: 'Access control',
    description:
      'Gate UI on the signed-in user’s roles and permissions, with hierarchical wildcard grants and permission names TypeScript checks for you.',
    href: '/docs/access-control',
    packages: ['@piplup/react-acl'],
  },
  {
    title: 'Cache busting',
    description:
      'Notice that a new build has shipped and reload clients still running the old bundle, instead of leaving users on a stale release.',
    href: '/docs/cache-busting',
    packages: ['@piplup/cache-buster', '@piplup/vite-plugin-cache-buster'],
  },
  {
    title: 'Utilities',
    description:
      'The ref helpers, stable callbacks and reactive localStorage hook the other packages are built on, published on their own.',
    href: '/docs/utilities',
    packages: ['@piplup/utils'],
  },
] as const;
