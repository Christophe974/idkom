import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Rewrite /carte/[slug] → /carte-view?slug=[slug]
  // This serves the pre-built static page from CDN (zero cold start)
  // while keeping the clean URL /carte/xxx in the browser
  const match = request.nextUrl.pathname.match(/^\/carte\/([^/]+)$/);
  if (match) {
    const url = request.nextUrl.clone();
    url.pathname = '/carte-view';
    url.searchParams.set('slug', match[1]);
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/carte/:slug*',
};
