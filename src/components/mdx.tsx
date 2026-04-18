import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";
import { AutoTypeTable } from "fumadocs-typescript/ui";
import { TypeTable } from "fumadocs-ui/components/type-table";
import * as TabsComponents from "fumadocs-ui/components/tabs";
import { Demo } from "@/components/demo";
import {
  createGenerator,
  createFileSystemGeneratorCache,
} from "fumadocs-typescript";

const generator = createGenerator({
  // set a cache, necessary for serverless platform like Vercel
  cache: createFileSystemGeneratorCache(".next/fumadocs-typescript"),
});

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    Demo,
    AutoTypeTable: (props) => (
      <AutoTypeTable {...props} generator={generator} />
    ),
    TypeTable,
    ...TabsComponents,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
