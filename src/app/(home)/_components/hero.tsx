import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { appSearchName, appTagline, docsRoute, gitConfig } from '@/lib/shared';

export function Hero() {
  return (
    <section className="mx-auto flex max-w-3xl flex-col items-center px-4 pt-20 pb-16 text-center sm:pt-28">
      <p className="mb-4 rounded-full border px-3 py-1 text-xs font-medium text-fd-muted-foreground">
        React 19 · TypeScript · tree-shakeable
      </p>

      <h1 className="text-4xl font-bold tracking-tight text-balance sm:text-5xl">{appTagline}</h1>

      <p className="mt-5 text-lg text-fd-muted-foreground text-balance">
        {appSearchName} is a set of small packages that each solve one problem well — React Hook Form adapters for MUI,
        role-based access control, cache busting — so you install what you need and nothing else.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href={docsRoute}
          className="inline-flex items-center gap-1.5 rounded-lg bg-fd-primary px-5 py-2.5 text-sm font-medium text-fd-primary-foreground transition-opacity hover:opacity-90"
        >
          Read the docs
          <ArrowRight className="size-4" />
        </Link>
        <a
          href={`https://github.com/${gitConfig.user}`}
          className="rounded-lg border px-5 py-2.5 text-sm font-medium transition-colors hover:bg-fd-accent"
        >
          GitHub
        </a>
      </div>
    </section>
  );
}
