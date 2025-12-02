import 'server-only';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Admin Supabase client with Service Role Key to bypass RLS
// NEVER use this in client components or expose to the browser
let supabaseAdminClient: SupabaseClient | undefined = (
  globalThis as typeof globalThis & {
    __supabaseAdminClient?: SupabaseClient;
  }
).__supabaseAdminClient;

export function getSupabaseAdminClient(): SupabaseClient {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url) {
    throw new Error('Missing SUPABASE_URL environment variable');
  }

  // If no service role key, fallback to anon key (but warn about it)
  // This allows the app to run even if service key is missing, though RLS will still block
  const key =
    serviceRoleKey || process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!key) {
    throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY or ANON_KEY');
  }

  if (!supabaseAdminClient) {
    supabaseAdminClient = createClient(url, key, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });
    (
      globalThis as typeof globalThis & {
        __supabaseAdminClient?: SupabaseClient;
      }
    ).__supabaseAdminClient = supabaseAdminClient;
  }

  return supabaseAdminClient;
}
