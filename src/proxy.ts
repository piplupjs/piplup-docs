import { NextRequest, NextResponse } from 'next/server';
import { isMarkdownPreferred, rewritePath } from 'fumadocs-core/negotiation';
import { docsContentRoute, docsRoute } from '@/lib/shared';

/*
 * Serves the markdown copy of a docs page at `/docs/<page>.mdx`, and at `/docs/<page>` for clients
 * that prefer markdown in `Accept` (agents, `curl -H 'Accept: text/markdown'`). Browsers and
 * Googlebot rank `text/html` higher, so they always get the HTML page.
 *
 * This file has to live in `src/` because the app does: Next only looks for the proxy next to the
 * `app` directory, and silently ignored it at the repo root.
 */

const { rewrite: rewriteDocs } = rewritePath(
  `${docsRoute}{/*path}`,
  `${docsContentRoute}{/*path}/content.md`,
);
const { rewrite: rewriteSuffix } = rewritePath(
  `${docsRoute}{/*path}.mdx`,
  `${docsContentRoute}{/*path}/content.md`,
);

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const suffixed = rewriteSuffix(pathname);
  if (suffixed) {
    return NextResponse.rewrite(new URL(suffixed, request.nextUrl));
  }

  // `Vary: Accept` comes from `headers()` in `next.config.mjs`, not from here.
  if (isMarkdownPreferred(request)) {
    const negotiated = rewriteDocs(pathname);
    if (negotiated) {
      return NextResponse.rewrite(new URL(negotiated, request.nextUrl));
    }
  }

  return NextResponse.next();
}

export const config = {
  // Only docs pages negotiate; everything else skips the proxy entirely.
  matcher: ['/docs', '/docs.mdx', '/docs/:path*'],
};
