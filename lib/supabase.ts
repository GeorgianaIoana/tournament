import { createClient } from '@supabase/supabase-js';

// Supabase client for server-side use
// Uses service role key for admin operations (bypasses RLS)

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

// Database types
export interface Registration {
  id: string;
  created_at: string;
  full_name: string;
  email: string;
  phone: string;
  fide_id: string;
  club: string;
  category: string;
  amount_ron: number;
  status: 'pending' | 'paid' | 'confirmed' | 'cancelled';
  is_free_entry: boolean;
  free_entry_reason?: string;
  stripe_checkout_session_id?: string;
  paid_at?: string;
  agreement_accepted_at: string;
}

export type NewRegistration = Omit<Registration, 'id' | 'created_at' | 'paid_at'>;
