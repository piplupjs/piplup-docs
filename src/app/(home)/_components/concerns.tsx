import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { concerns } from '@/lib/shared';

export function Concerns() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-12">
      <h2 className="text-center text-2xl font-semibold tracking-tight">Pick the problem</h2>
      <p className="mx-auto mt-2 max-w-xl text-center text-fd-muted-foreground text-balance">
        The packages are grouped by what they solve, not by what they are built from.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {concerns.map((concern) => (
          <Link
            key={concern.href}
            href={concern.href}
            className="group flex flex-col rounded-xl border p-5 transition-colors hover:bg-fd-accent/50"
          >
            <h3 className="flex items-center gap-1.5 font-semibold">
              {concern.title}
              <ArrowRight className="size-4 opacity-0 transition-opacity group-hover:opacity-100" />
            </h3>

            <p className="mt-2 grow text-sm text-fd-muted-foreground">{concern.description}</p>

            <ul className="mt-4 flex flex-wrap gap-1.5">
              {concern.packages.map((name) => (
                <li
                  key={name}
                  className="rounded-md bg-fd-muted px-2 py-0.5 font-mono text-xs text-fd-muted-foreground"
                >
                  {name}
                </li>
              ))}
            </ul>
          </Link>
        ))}
      </div>
    </section>
  );
}
