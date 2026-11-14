import * as React from 'react';

import Image from 'next/image';

import { appName, blogRoute, docsRoute, gitConfig, logoPath } from './shared';

import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

export function baseOptions(): BaseLayoutProps {
  return {
    githubUrl: `https://github.com/${gitConfig.user}`,
    links: [
      { text: 'Docs', url: docsRoute },
      { text: 'Blog', url: blogRoute },
    ],
    nav: {
      title: (
        <React.Fragment>
          <Image alt="" height={22} src={logoPath} width={22} priority />
          <span className="font-semibold">{appName}</span>
        </React.Fragment>
      ),
    },
  };
}
