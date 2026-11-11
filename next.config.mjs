import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  // `/docs/<page>.mdx` is rewritten to the page's markdown in `src/proxy.ts`.
  async headers() {
    return [
      {
        // Docs URLs answer with HTML or markdown depending on `Accept` (see `src/proxy.ts`), so the
        // markdown answer must tell caches to key on it, or one could hand it to a browser. Next
        // replaces this on prerendered HTML with its own `Vary`, which is harmless: a cached HTML
        // copy served to an agent is still a valid answer.
        source: '/docs/:path*',
        headers: [{ key: 'Vary', value: 'Accept' }],
      },
    ];
  },
  async redirects() {
    return [
      // @piplup/react-acl 4.0 renamed these. The old paths were linked from the
      // 3.x docs and README, so keep them resolving.
      {
        source: '/docs/react-acl/components/acl-provider',
        destination: '/docs/react-acl/components/access-control-provider',
        permanent: true,
      },
      {
        source: '/docs/react-acl/components/has-access',
        destination: '/docs/react-acl/components/can',
        permanent: true,
      },
      {
        source: '/docs/react-acl/hooks/use-acl',
        destination: '/docs/react-acl/hooks/use-access-control',
        permanent: true,
      },
      // URLs from the previous site that Google still crawls and reports as 404s.
      // rhf-adapters no longer has a single installation page, one per subpath instead, so
      // send it to the hub that lists them all.
      {
        source: '/docs/rhf-adapters/installation',
        destination: '/docs/forms',
        permanent: true,
      },
      {
        source: '/react-number-format',
        destination: '/docs/rhf-adapters/react-number-format/installation',
        permanent: true,
      },
    ];
  },
};

export default withMDX(config);
