// @ts-check
import { configs, ignores } from '@piplup/code-infra/eslint';
import { configs as docsConfigs } from '@piplup/code-infra/eslint/docs';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig(
  ignores(import.meta.dirname),
  globalIgnores([
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    '.source/**',
    'graphify-out/**',
  ]),
  configs.recommended,
  {
    extends: [docsConfigs.docs],
    // The Next.js rules crash on JSON files, so keep them to code and MDX.
    files: ['**/*.{js,mjs,cjs,jsx,ts,mts,cts,tsx,md,mdx}'],
    settings: { next: { rootDir: '.' } },
  },
  {
    rules: {
      // Next.js uses the automatic JSX runtime.
      'react/react-in-jsx-scope': 'off',
    },
  },
  {
    // The demos show what a form submitted with alert().
    files: ['src/demo/**'],
    rules: {
      // `role` on <Can> is a prop, not an ARIA role.
      'jsx-a11y/aria-role': ['error', { ignoreNonDOM: true }],
      'no-alert': 'off',
    },
  },
  {
    // The pages inline JSON-LD built from our own content.
    files: ['src/app/**/page.tsx'],
    rules: { 'react/no-danger': 'off' },
  },
);
