import { defineCollections, defineConfig, defineDocs } from 'fumadocs-mdx/config';
import { metaSchema, pageSchema } from 'fumadocs-core/source/schema';
import { z } from 'zod';

export const docs = defineDocs({
  dir: 'content/docs',
  docs: {
    schema: pageSchema.extend({
      // Keeps thin or duplicated pages out of search indexes.
      noindex: z.boolean().default(false),
    }),
    postprocess: {
      includeProcessedMarkdown: true,
    },
    // Derived from git history, and used for `lastModified` in the sitemap.
    lastModified: true,
  },
  meta: {
    schema: metaSchema,
  },
});

export const blog = defineCollections({
  type: 'doc',
  dir: 'content/blog',
  schema: pageSchema.extend({
    author: z.string(),
    date: z.string().date().or(z.date()),
    tags: z.array(z.string()).default([]),
  }),
});

export default defineConfig({
  mdxOptions: {
    // MDX options
  },
});
