import { createServerClient } from '@supabase/ssr'
import { type CookieOptions } from '@supabase/ssr'
import { type Database } from '@/lib/types/database'
import { cookies } from 'next/headers'

export function createClient(cookieStore = cookies()) {
  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options })
          } catch (error) {
            // Handle cookie errors silently in production
            if (process.env.NODE_ENV === 'development') {
              console.error('Cookie set error:', error)
            }
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.delete({ name, ...options })
          } catch (error) {
            // Handle cookie errors silently in production
            if (process.env.NODE_ENV === 'development') {
              console.error('Cookie remove error:', error)
            }
          }
        }
      }
    }
  )
}

// Create a singleton instance for server-side usage
export const supabaseServer = createClient()
