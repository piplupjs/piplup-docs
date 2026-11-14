import * as React from 'react';

import type { Metadata } from 'next';

import Link from 'next/link';

import { organizationJsonLd, webSiteJsonLd } from '@/lib/json-ld';
import { openGraph } from '@/lib/open-graph';
import {
  appDescription,
  appName,
  appSearchName,
  blogRoute,
  docsRoute,
  npmOrg,
  socialCardPath,
} from '@/lib/shared';

import { CodeSample } from './_components/code-sample';
import { Concerns } from './_components/concerns';
import { Hero } from './_components/hero';
import { Why } from './_components/why';

/**
 * The tagline stays the H1, but nobody searches for "lightweight, modular React libraries", so the
 * <title> names what the packages do. Brand first, as "PiplupJS": that is the query this page can
 * win, since "piplup" alone belongs to the Pokémon and Google autocorrects "piplupjs" towards it.
 */
const homeTitle = `${appSearchName}: React Hook Form for MUI, RBAC, cache busting`;

export const metadata: Metadata = {
  alternates: { canonical: '/' },
  description: appDescription,
  openGraph: openGraph({
    description: appDescription,
    images: socialCardPath,
    title: homeTitle,
    url: '/',
  }),
  title: { absolute: homeTitle },
};

export default function Page() {
  return (
    <React.Fragment>
      <script
        // The payload is built from our own constants, never from user input.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteJsonLd()) }}
        type="application/ld+json"
      />
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
        type="application/ld+json"
      />

      <Hero />
      <Concerns />
      <CodeSample />
      <Why />

      <section className="mx-auto max-w-3xl px-4 py-16 text-center">
        <h2 className="text-2xl font-semibold tracking-tight">Start with the problem you have</h2>
        <p className="mx-auto mt-2 max-w-lg text-fd-muted-foreground text-balance">
          Every package has an installation page with a runnable example, and the API pages are
          generated from the types they ship.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            className="rounded-lg bg-fd-primary px-5 py-2.5 text-sm font-medium text-fd-primary-foreground transition-opacity hover:opacity-90"
            href={docsRoute}
          >
            Browse the docs
          </Link>
          <Link
            className="rounded-lg border px-5 py-2.5 text-sm font-medium transition-colors hover:bg-fd-accent"
            href={blogRoute}
          >
            Read the blog
          </Link>
          <a
            className="rounded-lg border px-5 py-2.5 text-sm font-medium transition-colors hover:bg-fd-accent"
            href={npmOrg}
          >
            {appName} on npm
          </a>
        </div>
      </section>
    </React.Fragment>
  );
}
