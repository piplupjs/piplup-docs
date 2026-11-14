import type { Metadata } from 'next';

import { appName, socialCardPath } from './shared';

type OpenGraph = NonNullable<Metadata['openGraph']>;

/**
 * `OpenGraph` is a discriminated union (website, article, …). A plain `Omit` over it collapses the
 * union and loses the `type` discriminant, so distribute over the branches instead.
 */
type DistributiveOmit<T, K extends PropertyKey> = T extends unknown ? Omit<T, K> : never;

/**
 * Next replaces `openGraph` wholesale rather than deep-merging it with the root layout's, so a page
 * that sets only `images` silently drops `siteName`, `type`, `locale` and `url`. Every page builds
 * its Open Graph object through here so those survive.
 */
export function openGraph(
  overrides: DistributiveOmit<OpenGraph, 'locale' | 'siteName'> & { url: string },
): OpenGraph {
  return {
    // Pages with a generated card pass their own; the rest fall back to the branded one rather
    // than ending up with no image, which is what happened before this default existed.
    images: socialCardPath,
    locale: 'en_US',
    siteName: appName,
    type: 'website',
    ...overrides,
  } as OpenGraph;
}
