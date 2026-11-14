import { metaSchema, pageSchema } from 'fumadocs-core/source/schema';
import { defineCollections, defineConfig, defineDocs } from 'fumadocs-mdx/config';
import { z } from 'zod';

export const docs = defineDocs({
  dir: 'content/docs',
  docs: {
    // Derived from git history, and used for `lastModified` in the sitemap.
    lastModified: true,
    postprocess: {
      includeProcessedMarkdown: true,
    },
    schema: pageSchema.extend({
      // Rendered as a visible "FAQ" section after the body and as FAQPage structured data, from
      // this one list so the two can't drift. Answers are plain text; `backticks` render as code.
      faq: z.array(z.object({ answer: z.string(), question: z.string() })).optional(),
      // Keeps thin or duplicated pages out of search indexes.
      noindex: z.boolean().default(false),
      // The <title> and social-card title, written for the query the page should rank for
      // ("MUI TextField with React Hook Form"). `title` stays the export name, for the H1,
      // sidebar and breadcrumbs. Keep it under ~52 characters so " | Piplup" still fits.
      seoTitle: z.string().optional(),
    }),
  },
  meta: {
    schema: metaSchema,
  },
});

export const blog = defineCollections({
  dir: 'content/blog',
  // From git, for `dateModified` in the post's structured data.
  lastModified: true,
  schema: pageSchema.extend({
    author: z.string(),
    date: z.string().date().or(z.date()),
    tags: z.array(z.string()).default([]),
  }),
  type: 'doc',
});

export default defineConfig({
  mdxOptions: {
    // MDX options
  },
});
