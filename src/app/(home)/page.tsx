import type { Metadata } from 'next';
import Link from 'next/link';
import { CodeSample } from './_components/code-sample';
import { Concerns } from './_components/concerns';
import { Hero } from './_components/hero';
import { Why } from './_components/why';
import { appDescription, appName, appTagline, blogRoute, docsRoute, npmOrg } from '@/lib/shared';
import { organizationJsonLd, webSiteJsonLd } from '@/lib/json-ld';

export const metadata: Metadata = {
  title: appTagline,
  description: appDescription,
  alternates: { canonical: '/' },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        // The payload is built from our own constants, never from user input.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteJsonLd()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
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
            href={docsRoute}
            className="rounded-lg bg-fd-primary px-5 py-2.5 text-sm font-medium text-fd-primary-foreground transition-opacity hover:opacity-90"
          >
            Browse the docs
          </Link>
          <Link
            href={blogRoute}
            className="rounded-lg border px-5 py-2.5 text-sm font-medium transition-colors hover:bg-fd-accent"
          >
            Read the blog
          </Link>
          <a
            href={npmOrg}
            className="rounded-lg border px-5 py-2.5 text-sm font-medium transition-colors hover:bg-fd-accent"
          >
            {appName} on npm
          </a>
        </div>
      </section>
    </>
  );
}
