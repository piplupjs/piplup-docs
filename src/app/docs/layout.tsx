import { DocsLayout } from 'fumadocs-ui/layouts/docs';

import { baseOptions } from '@/lib/layout.shared';
import { source } from '@/lib/source';

// `metadataBase` lives in the root layout now, so it is not repeated here.
export default function Layout({ children }: LayoutProps<'/docs'>) {
  return (
    <DocsLayout tree={source.getPageTree()} {...baseOptions()}>
      {children}
    </DocsLayout>
  );
}
