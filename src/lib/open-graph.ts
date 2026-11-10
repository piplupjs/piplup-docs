import type { Metadata } from 'next';
import { appName } from './shared';

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
  overrides: DistributiveOmit<OpenGraph, 'siteName' | 'locale'> & { url: string },
): OpenGraph {
  return {
    type: 'website',
    siteName: appName,
    locale: 'en_US',
    ...overrides,
  } as OpenGraph;
}
