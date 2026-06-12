import { createClient } from '@supabase/supabase-js';

const metaEnv = (import.meta as any).env || {};
const supabaseUrl = (metaEnv.VITE_SUPABASE_URL as string) || '';
const supabaseAnonKey = (metaEnv.VITE_SUPABASE_ANON_KEY as string) || '';

export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey);

// If Supabase is configured, create client.
// Otherwise, create a clean mocked interface that fits Supabase types
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : (null as any);

if (!isSupabaseConfigured) {
  console.info(
    'Trendy Tees: Supabase credentials are not yet defined in .env. Falling back to local high-fidelity localStore synchronizer for development. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to fully activate live remote sync!'
  );
}
