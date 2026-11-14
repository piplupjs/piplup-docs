import { llms } from 'fumadocs-core/source';

import { markdownCopyHeaders } from '@/lib/shared';
import { source } from '@/lib/source';

export const revalidate = false;

export async function GET() {
  return new Response(await llms(source).index(), { headers: markdownCopyHeaders });
}
