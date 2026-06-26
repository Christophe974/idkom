import { createClient } from '@supabase/supabase-js';

// Lectures publiques anonymes du CMS (RLS : seul le contenu publié est lisible).
// URL + clé anon sont publiques (publishable) — même logique que le fallback
// NEXT_PUBLIC_API_URL ; la sécurité repose sur les policies RLS, pas le secret.
const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://olmcbqiojczhupspzedo.supabase.co';
const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9sbWNicWlvamN6aHVwc3B6ZWRvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAxNDAwOTcsImV4cCI6MjA5NTcxNjA5N30.MmUJ5js_1_2R9sSkazGbydAqifQApbCJ1cGHnkeum84';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: { persistSession: false, autoRefreshToken: false },
  global: {
    // Cache ISR 5 min côté Next (équivalent de l'ancien fetchApi).
    fetch: (input: RequestInfo | URL, init?: RequestInit) =>
      fetch(input, { ...init, next: { revalidate: 300 } } as RequestInit),
  },
});
