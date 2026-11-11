import { defineCollections, defineConfig, defineDocs } from 'fumadocs-mdx/config';
import { metaSchema, pageSchema } from 'fumadocs-core/source/schema';
import { z } from 'zod';

export const docs = defineDocs({
  dir: 'content/docs',
  docs: {
    schema: pageSchema.extend({
      // Keeps thin or duplicated pages out of search indexes.
      noindex: z.boolean().default(false),
      // The <title> and social-card title, written for the query the page should rank for
      // ("MUI TextField with React Hook Form"). `title` stays the export name, for the H1,
      // sidebar and breadcrumbs. Keep it under ~52 characters so " | Piplup" still fits.
      seoTitle: z.string().optional(),
      // Rendered as a visible "FAQ" section after the body and as FAQPage structured data, from
      // this one list so the two can't drift. Answers are plain text; `backticks` render as code.
      faq: z.array(z.object({ question: z.string(), answer: z.string() })).optional(),
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
  // From git, for `dateModified` in the post's structured data.
  lastModified: true,
});

export default defineConfig({
  mdxOptions: {
    // MDX options
  },
});
