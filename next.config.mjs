import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        destination: '/docs',
        permanent: false,
        source: '/',
      },
    ];
  },
  async rewrites() {
    return [
      {
        destination: '/llms.mdx/docs/:path*',
        source: '/docs/:path*.mdx',
      },
    ];
  },
};

export default withMDX(config);
