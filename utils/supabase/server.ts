import { createServerClient } from '@supabase/ssr'
import { type CookieOptions } from '@supabase/ssr'
import { type Database } from '@/lib/types/database'
import { cookies } from 'next/headers'

export function createClient(cookieStore = cookies()) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseUrl.startsWith('https://')) {
    throw new Error('Invalid NEXT_PUBLIC_SUPABASE_URL')
  }

  if (!supabaseKey) {
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_ANON_KEY')
  }

  return createServerClient<Database>(
    supabaseUrl,
    supabaseKey,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          // Only set cookies in a server context
          if (typeof window === 'undefined') {
            try {
              cookieStore.set({
                name,
                value,
                path: '/',
                ...options,
                secure: process.env.NODE_ENV === 'production'
              })
            } catch (error) {
              // Silent fail in development
            }
          }
        },
        remove(name: string, options: CookieOptions) {
          // Only remove cookies in a server context
          if (typeof window === 'undefined') {
            try {
              cookieStore.delete({ name, path: '/', ...options })
            } catch (error) {
              // Silent fail in development
            }
          }
        }
      }
    }
  )
}

// Lazy initialize server client
export const supabaseServer = () => createClient()
