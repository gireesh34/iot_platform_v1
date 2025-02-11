import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Error: Missing Supabase credentials in environment variables');
  console.log('Please ensure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  console.log('Testing Supabase connection...');
  
  try {
    // Test connection by retrieving auth config (doesn't require table access)
    const { data, error } = await supabase.auth.getSession();
    
    if (error) {
      throw error;
    }
    
    console.log('✅ Successfully connected to Supabase!');
    console.log('Connection Details:');
    console.log(`URL: ${supabaseUrl}`);
    console.log('Auth status: Valid');
    
  } catch (error) {
    console.error('❌ Failed to connect to Supabase');
    console.error('Error details:', error);
    process.exit(1);
  }
}

testConnection();