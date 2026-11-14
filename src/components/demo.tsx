import { readFileSync } from 'fs';
import { join } from 'path';

import * as React from 'react';

import { DynamicCodeBlock } from 'fumadocs-ui/components/dynamic-codeblock';
import { Tab, Tabs } from 'fumadocs-ui/components/tabs';

import { DemoPreview } from '@/components/demo-preview';

const readLocalFile = (filePath: string) => {
  let content = '';

  try {
    content = readFileSync(filePath, 'utf8');
  } catch {
    content = '';
  }

  return content;
};

const fetchRemoteFile = async (url: string) => {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error('Failed to fetch');
    }
    return res.text();
  } catch {
    return '';
  }
};

const isUrl = (path: string) => /^https?:\/\//.test(path);

const DEMO_DIR = 'demo/';

// The static `../demo/` prefix lets the bundler include every demo module.
const loadDemoComponent = async (path: string) => {
  if (!path.startsWith(DEMO_DIR)) {
    return null;
  }

  try {
    const mod = await import(`../demo/${path.slice(DEMO_DIR.length)}`);
    return (mod.default as React.ComponentType | undefined) ?? null;
  } catch {
    return null;
  }
};

type DemoProps = {
  tabs: Array<{
    label: string;
    path: string;
  }>;
};

export async function Demo({ tabs }: DemoProps) {
  const results = await Promise.all(
    tabs.map(async (tab) => {
      if (isUrl(tab.path)) {
        const code = await fetchRemoteFile(tab.path);
        return { code, Component: null, tab };
      }
      const filePath = join(process.cwd(), 'src', tab.path);
      const code = readLocalFile(filePath);
      const Component = await loadDemoComponent(tab.path);
      return { code, Component, tab };
    }),
  );

  return (
    <Tabs items={tabs.map((tab) => tab.label)}>
      {results.map(({ code, Component, tab }) => {
        if (!code) {
          return null;
        }
        return (
          <Tab key={tab.label} value={tab.label}>
            {Component ? (
              <DemoPreview>
                <Component />
              </DemoPreview>
            ) : null}
            <DynamicCodeBlock code={code} lang="tsx" />
          </Tab>
        );
      })}
    </Tabs>
  );
}
