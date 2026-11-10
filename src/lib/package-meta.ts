/**
 * Maps a docs page's slugs back to the npm package it documents.
 *
 * The concern folders are parenthesised, so they contribute nothing to a page's slugs — the first
 * slug segment is still the package directory, exactly as it was before the regroup.
 */
const PACKAGE_BY_SEGMENT: Record<string, string> = {
  'rhf-core': '@piplup/rhf-core',
  'rhf-adapters': '@piplup/rhf-adapters',
  'react-acl': '@piplup/react-acl',
  utils: '@piplup/utils',
  'cache-buster': '@piplup/cache-buster',
  'vite-plugin-cache-buster': '@piplup/vite-plugin-cache-buster',
};

/** The npm package a docs page belongs to, or `null` for the overview and concern hub pages. */
export function packageForSlugs(slugs: readonly string[]): string | null {
  const first = slugs[0];
  return first ? (PACKAGE_BY_SEGMENT[first] ?? null) : null;
}

/**
 * A suffix that disambiguates otherwise bare page titles.
 *
 * Component and hook pages are titled with just the export name — `MuiTextFieldElement`,
 * `useFormReset` — which reads as a duplicate in search results across six packages. The root
 * metadata template appends the site name, so a page ends up as
 * `MuiTextFieldElement · @piplup/rhf-adapters | Piplup`.
 *
 * Installation pages already carry the package in their frontmatter title, so they get nothing.
 */
export function packageTitleSuffix(slugs: readonly string[]): string {
  const pkg = packageForSlugs(slugs);
  if (!pkg) return '';

  const last = slugs[slugs.length - 1];
  if (last === 'installation') return '';

  return ` · ${pkg}`;
}
