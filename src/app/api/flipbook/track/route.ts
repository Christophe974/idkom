import { NextRequest, NextResponse } from 'next/server';
import { createHash } from 'crypto';
import { supabase } from '@/lib/supabase';

// Compteur des liseuses (/12ponts.html…) : même principe que /api/blog/track,
// sans cookie, IP jamais stockée (hash journalier non réversible).
export const runtime = 'nodejs';

const BOT_RE =
  /bot|crawl|spider|slurp|mediapartners|adsbot|bingpreview|facebookexternalhit|embedly|quora|whatsapp|telegram|slackbot|discord|applebot|semrush|ahrefs|mj12|dotbot|petalbot|bytespider|yandex|baidu|duckduck|headless|phantom|puppeteer|playwright|python-requests|http-client|okhttp|java\/|curl|wget|axios|node-fetch|go-http|libwww|monitor|pingdom|uptime|statuscake|lighthouse|gtmetrix|pagespeed|linkedin|skype|outlook|google-pagerenderer/i;

const SALT = process.env.VIEW_SALT || 'idkom-blog-views-v1';
const EVENTS = new Set(['open', 'page', 'video', 'click', 'leave']);

export async function POST(req: NextRequest) {
  try {
    const ua = req.headers.get('user-agent') || '';
    if (!ua || BOT_RE.test(ua)) return NextResponse.json({ ok: true, counted: false });

    let b: Record<string, unknown> = {};
    try {
      b = JSON.parse(await req.text());
    } catch {
      /* corps illisible */
    }
    const book = typeof b.book === 'string' ? b.book : '';
    const event = typeof b.e === 'string' ? b.e : '';
    const session = typeof b.s === 'string' ? b.s : '';
    if (!book || !session || !EVENTS.has(event)) return NextResponse.json({ ok: false }, { status: 400 });

    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      req.headers.get('x-real-ip') ||
      'unknown';
    const day = new Date().toISOString().slice(0, 10);
    const visitor = createHash('sha256').update(`${ip}|${ua}|${book}|${day}|${SALT}`).digest('hex');
    const device = /ipad|tablet/i.test(ua) ? 'tablette' : /mobi|android|iphone/i.test(ua) ? 'mobile' : 'ordinateur';

    await supabase.rpc('flipbook_track', {
      p_book: book,
      p_session: session,
      p_visitor: visitor,
      p_event: event,
      p_detail: typeof b.d === 'string' ? b.d : null,
      p_device: device,
      p_ref: typeof b.ref === 'string' ? b.ref : null,
      p_seconds: typeof b.sec === 'number' ? Math.round(b.sec) : null,
    });
    return NextResponse.json({ ok: true, counted: true });
  } catch {
    // Un compteur ne doit jamais provoquer d'erreur visible.
    return NextResponse.json({ ok: true, counted: false });
  }
}
