import { createGenerator, createFileSystemGeneratorCache } from 'fumadocs-typescript';
import { AutoTypeTable } from 'fumadocs-typescript/ui';
import * as TabsComponents from 'fumadocs-ui/components/tabs';
import { TypeTable } from 'fumadocs-ui/components/type-table';
import defaultMdxComponents from 'fumadocs-ui/mdx';

import { Demo } from '@/components/demo';

import type { MDXComponents } from 'mdx/types';

const generator = createGenerator({
  // set a cache, necessary for serverless platform like Vercel
  cache: createFileSystemGeneratorCache('.next/fumadocs-typescript'),
});

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    AutoTypeTable: (props) => <AutoTypeTable {...props} generator={generator} />,
    Demo,
    TypeTable,
    ...TabsComponents,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
