import { NextRequest, NextResponse } from 'next/server';

// Proxy serveur même-origine vers l'endpoint contact du CRM (évite tout CORS).
export const dynamic = 'force-dynamic';

const CRM = process.env.NEXT_PUBLIC_CRM_URL || 'https://crm.idkom.fr';

export async function POST(req: NextRequest) {
  const body = await req.text();
  const r = await fetch(`${CRM}/api/contact`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body,
    cache: 'no-store',
  });
  const out = await r.text();
  return new NextResponse(out, { status: r.status, headers: { 'content-type': 'application/json' } });
}
