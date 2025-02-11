import { createClient } from '@supabase/supabase-js'
import { Database } from '../lib/types/database.js'
import * as dotenv from 'dotenv'

dotenv.config()

async function validateSchema() {
  try {
    // Validate environment variables
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL')
    }
    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY')
    }

    // Initialize Supabase client
    const supabase = createClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    )

    // Validate tables exist and are accessible
    const tables = ['devices', 'drones', 'telemetry']
    
    for (const table of tables) {
      console.log(`Checking ${table} table...`)
      const { data, error } = await supabase
        .from(table)
        .select('id')
        .limit(1)
      
      if (error) {
        throw new Error(`${table} table error: ${error.message}`)
      }
      console.log(`✅ ${table} table verified`)
    }

    console.log('\n✅ Database schema validation successful')
    process.exit(0)
  } catch (err) {
    console.error('\n❌ Validation failed:', err instanceof Error ? err.message : err)
    process.exit(1)
  }
}

validateSchema().catch(err => {
  console.error('Fatal error:', err)
  process.exit(1)
})
