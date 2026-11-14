import { Blocks, FileCode2, Scale, ShieldCheck } from 'lucide-react';

const points = [
  {
    body: 'Each package covers one concern and ships ESM and CJS with `sideEffects: false`, so your bundler drops what you do not import.',
    icon: Scale,
    title: 'Small on purpose',
  },
  {
    body: 'Types are generated from the source, not hand-maintained. Permission and role names can be narrowed to your own strings so a typo fails the build.',
    icon: FileCode2,
    title: 'Typed end to end',
  },
  {
    body: 'Every adapter is a hook returning props and an element that spreads them. When the element does not fit, drop to the hook instead of forking it.',
    icon: Blocks,
    title: 'Adapters, not wrappers',
  },
  {
    body: 'React, MUI and react-hook-form stay peers, so you control their versions and never end up with two copies in one app.',
    icon: ShieldCheck,
    title: 'Peer-dependency honest',
  },
];

export function Why() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-12">
      <div className="grid gap-8 sm:grid-cols-2">
        {points.map((point) => (
          <div className="flex gap-4" key={point.title}>
            <point.icon className="mt-0.5 size-5 shrink-0 text-fd-muted-foreground" />
            <div>
              <h3 className="font-semibold">{point.title}</h3>
              <p className="mt-1 text-sm text-fd-muted-foreground">{point.body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
