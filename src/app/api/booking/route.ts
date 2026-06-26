import { NextRequest, NextResponse } from 'next/server';

// Proxy serveur même-origine vers l'endpoint booking du CRM.
// Le navigateur n'appelle que www.idkom.fr/api/booking (zéro CORS) ;
// le forward www -> crm se fait côté serveur.
export const dynamic = 'force-dynamic';

const CRM = process.env.NEXT_PUBLIC_CRM_URL || 'https://crm.idkom.fr';

export async function GET(req: NextRequest) {
  const r = await fetch(`${CRM}/api/booking${req.nextUrl.search}`, { cache: 'no-store' });
  const body = await r.text();
  return new NextResponse(body, { status: r.status, headers: { 'content-type': 'application/json' } });
}

export async function POST(req: NextRequest) {
  const body = await req.text();
  const r = await fetch(`${CRM}/api/booking`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body,
    cache: 'no-store',
  });
  const out = await r.text();
  return new NextResponse(out, { status: r.status, headers: { 'content-type': 'application/json' } });
}
