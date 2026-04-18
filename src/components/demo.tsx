import * as React from "react";
import { readFileSync } from "fs";
import { join } from "path";
import { Tab, Tabs } from "fumadocs-ui/components/tabs";
import { DynamicCodeBlock } from "fumadocs-ui/components/dynamic-codeblock";

const readLocalFile = (filePath: string) => {
  let content = "";

  try {
    content = readFileSync(filePath, "utf8");
  } catch {
    content = "";
  }

  return content;
};

const fetchRemoteFile = async (url: string) => {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("Failed to fetch");
    }
    return res.text();
  } catch {
    return "";
  }
};

const isUrl = (path: string) => /^https?:\/\//.test(path);

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
        return { tab, code, isRemote: true };
      } else {
        const filePath = join(process.cwd(), "src", tab.path);
        const code = await readLocalFile(filePath);
        return { tab, code, isRemote: false };
      }
    }),
  );

  return (
    <Tabs items={tabs.map((tab) => tab.label)}>
      {results.map((result) => {
        if (!result.code) {
          return null;
        }
        return (
          <Tab value={result.tab.label} key={result.tab.label}>
            <DynamicCodeBlock code={result.code} lang="tsx" />
          </Tab>
        );
      })}
    </Tabs>
  );
}
