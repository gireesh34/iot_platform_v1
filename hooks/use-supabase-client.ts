import { SupabaseClient } from '@supabase/supabase-js';

import { createBrowserClient } from '@supabase/ssr';
import { useEffect, useState } from 'react';
import type { Database } from '../lib/types/database';

export const useSupabaseClient = () => {
  const [supabaseClient, setSupabaseClient] = useState<SupabaseClient<Database> | null>(null); // Explicitly type useState

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_URL');
    }
    if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_ANON_KEY');
    }

    const client = createBrowserClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );
    setSupabaseClient(client);
  }, []);

  return supabaseClient;
};