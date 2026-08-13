import { NextRequest, NextResponse } from 'next/server';
import { createHash } from 'crypto';
import { supabase } from '@/lib/supabase';

// Node runtime : accès à crypto + entêtes de requête.
export const runtime = 'nodejs';

// User-agents de bots / crawlers / aperçus à ne PAS compter.
const BOT_RE =
  /bot|crawl|spider|slurp|mediapartners|adsbot|bingpreview|facebookexternalhit|embedly|quora|whatsapp|telegram|slackbot|discord|applebot|semrush|ahrefs|mj12|dotbot|petalbot|bytespider|yandex|baidu|duckduck|headless|phantom|puppeteer|playwright|python-requests|http-client|okhttp|java\/|curl|wget|axios|node-fetch|go-http|libwww|monitor|pingdom|uptime|statuscake|lighthouse|gtmetrix|pagespeed/i;

const SALT = process.env.VIEW_SALT || 'idkom-blog-views-v1';

export async function POST(req: NextRequest) {
  try {
    const ua = req.headers.get('user-agent') || '';
    // Pas d'UA ou UA de bot => on ignore silencieusement.
    if (!ua || BOT_RE.test(ua)) {
      return NextResponse.json({ ok: true, counted: false });
    }

    let slug = '';
    try {
      const parsed = await req.json();
      slug = typeof parsed?.slug === 'string' ? parsed.slug : '';
    } catch {
      /* corps illisible */
    }
    if (!slug) return NextResponse.json({ ok: false }, { status: 400 });

    // Identifiant visiteur pseudonyme, non réversible, qui tourne chaque jour.
    // On ne stocke jamais l'IP en clair (RGPD) — seulement ce hash.
    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      req.headers.get('x-real-ip') ||
      'unknown';
    const day = new Date().toISOString().slice(0, 10);
    const visitorHash = createHash('sha256')
      .update(`${ip}|${ua}|${slug}|${day}|${SALT}`)
      .digest('hex');

    await supabase.rpc('cms_blog_increment_views', {
      p_slug: slug,
      p_visitor_hash: visitorHash,
    });

    return NextResponse.json({ ok: true, counted: true });
  } catch {
    // Un compteur ne doit jamais provoquer d'erreur visible.
    return NextResponse.json({ ok: true, counted: false });
  }
}
