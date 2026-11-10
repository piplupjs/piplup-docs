import Image from 'next/image';
import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { appName, blogRoute, docsRoute, gitConfig, logoPath } from './shared';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <>
          <Image src={logoPath} alt="" width={22} height={22} priority />
          <span className="font-semibold">{appName}</span>
        </>
      ),
    },
    links: [
      { text: 'Docs', url: docsRoute },
      { text: 'Blog', url: blogRoute },
    ],
    githubUrl: `https://github.com/${gitConfig.user}`,
  };
}
