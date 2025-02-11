import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import type { Database } from '../lib/types/database';

dotenv.config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // Using service role key for full access

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials in environment variables');
  console.log('Required variables:');
  console.log('- NEXT_PUBLIC_SUPABASE_URL');
  console.log('- SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient<Database>(supabaseUrl, supabaseKey);

async function testConnection() {
  console.log('🔄 Testing Supabase connection...\n');
  
  try {
    // Test 1: Basic Connection
    console.log('1. Testing basic connection...');
    const { data: { session }, error: authError } = await supabase.auth.getSession();
    if (authError) throw authError;
    console.log('✅ Basic connection successful\n');

    // Test 2: Required Tables
    console.log('2. Checking required tables...');
    const tables = ['devices', 'drones', 'telemetry'];
    
    for (const table of tables) {
      const { error } = await supabase.from(table).select('id').limit(1);
      if (error) {
        console.error(`❌ Table '${table}' error:`, error.message);
        throw error;
      }
      console.log(`✅ Table '${table}' exists and is accessible`);
    }
    console.log('\n3. Connection Details:');
    console.log(`URL: ${supabaseUrl}`);
    console.log('Auth: Service Role (Full Access)');
    console.log('Tables: All Required Tables Present');
    
    console.log('\n✅ All connection tests passed successfully!');
  } catch (error) {
    console.error('\n❌ Connection test failed');
    console.error('Error details:', error);
    process.exit(1);
  }
}

testConnection();
