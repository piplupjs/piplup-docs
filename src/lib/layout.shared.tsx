import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { appName, blogRoute, docsRoute, gitConfig } from './shared';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: { title: appName },
    links: [
      { text: 'Docs', url: docsRoute },
      { text: 'Blog', url: blogRoute },
    ],
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
  };
}
