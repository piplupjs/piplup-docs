import { blog as blogPosts, docs } from 'collections/server';
import { type InferPageType, loader } from 'fumadocs-core/source';
import { lucideIconsPlugin } from 'fumadocs-core/source/lucide-icons';
import { toFumadocsSource } from 'fumadocs-mdx/runtime/server';
import { blogImageRoute, blogRoute, docsContentRoute, docsImageRoute, docsRoute } from './shared';

// See https://fumadocs.dev/docs/headless/source-api for more info
export const source = loader({
  baseUrl: docsRoute,
  source: docs.toFumadocsSource(),
  plugins: [lucideIconsPlugin()],
});

/**
 * `defineCollections` produces a plain array of entries rather than the object `defineDocs` returns,
 * so it has no `toFumadocsSource()` method of its own — the standalone helper takes the pages and a
 * (here empty) list of meta files. The blog has no meta.json; ordering comes from the `date`
 * frontmatter.
 */
export const blog = loader({
  baseUrl: blogRoute,
  source: toFumadocsSource(blogPosts, []),
});

export type BlogPage = InferPageType<typeof blog>;

/** Posts newest first. */
export function getSortedPosts(): BlogPage[] {
  return [...blog.getPages()].sort(
    (a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime(),
  );
}

export function getPageImage(page: InferPageType<typeof source>) {
  const segments = [...page.slugs, 'image.png'];

  return {
    segments,
    url: `${docsImageRoute}/${segments.join('/')}`,
  };
}

export function getBlogImage(page: BlogPage) {
  const segments = [...page.slugs, 'image.png'];

  return {
    segments,
    url: `${blogImageRoute}/${segments.join('/')}`,
  };
}

export function getPageMarkdownUrl(page: InferPageType<typeof source>) {
  const segments = [...page.slugs, 'content.md'];

  return {
    segments,
    url: `${docsContentRoute}/${segments.join('/')}`,
  };
}

export async function getLLMText(page: InferPageType<typeof source>) {
  const processed = await page.data.getText('processed');

  return `# ${page.data.title} (${page.url})

${processed}`;
}
