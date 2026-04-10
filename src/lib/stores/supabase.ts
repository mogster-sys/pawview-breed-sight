import { createClient } from '@supabase/supabase-js';
import { writable } from 'svelte/store';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseKey);

export const user = writable(null);
export const session = writable(null);

if (typeof window !== 'undefined') {
  supabase.auth.getSession().then(({ data: { session: s } }) => {
    session.set(s);
    user.set(s?.user ?? null);
  }).catch(() => { /* Supabase not configured */ });

  supabase.auth.onAuthStateChange((_event, s) => {
    session.set(s);
    user.set(s?.user ?? null);
  });
}
