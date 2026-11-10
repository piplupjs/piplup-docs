import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/docs/:path*.mdx',
        destination: '/llms.mdx/docs/:path*',
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
    ];
  },
};

export default withMDX(config);
