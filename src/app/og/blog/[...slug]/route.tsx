import { notFound } from 'next/navigation';
import { ImageResponse } from 'next/og';

import { generate as DefaultImage } from 'fumadocs-ui/og';

import { appName } from '@/lib/shared';
import { blog, getBlogImage } from '@/lib/source';

export const revalidate = false;

export async function GET(_req: Request, { params }: RouteContext<'/og/blog/[...slug]'>) {
  const { slug } = await params;
  // The last segment is `image.png`.
  const page = blog.getPage(slug.slice(0, -1));
  if (!page) {
    notFound();
  }

  return new ImageResponse(
    <DefaultImage description={page.data.description} site={appName} title={page.data.title} />,
    {
      height: 630,
      width: 1200,
    },
  );
}

export function generateStaticParams() {
  return blog.getPages().map((page) => ({
    slug: getBlogImage(page).segments,
  }));
}
