import 'server-only';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Server-side Supabase client (do not expose keys to the browser)
// Uses a global singleton to avoid re-instantiation during hot reloads
let supabaseClient: SupabaseClient | undefined = (
  globalThis as typeof globalThis & {
    __supabaseServerClient?: SupabaseClient;
  }
).__supabaseServerClient;

export function getSupabaseServerClient(): SupabaseClient {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error('Missing SUPABASE_URL or SUPABASE_ANON_KEY environment variables');
  }

  if (!supabaseClient) {
    supabaseClient = createClient(url, anonKey, {
      auth: {
        // Server-side only; avoid storing sessions
        persistSession: false,
        autoRefreshToken: false,
      },
    });
    (
      globalThis as typeof globalThis & {
        __supabaseServerClient?: SupabaseClient;
      }
    ).__supabaseServerClient = supabaseClient;
  }

  return supabaseClient;
}
