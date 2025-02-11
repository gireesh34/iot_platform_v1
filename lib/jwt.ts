import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { type NextRequest } from 'next/server'
import { logger } from './logger'

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-secret-key'
)

export async function sign(payload: { sub: string; jti: string; iat: number }): Promise<string> {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('24h')
    .sign(JWT_SECRET)
}

export async function verify(token: string): Promise<any> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    return payload
  } catch (error) {
    return null
  }
}

export async function getJWTFromRequest(request: NextRequest) {
  const token = request.headers.get('authorization')?.replace('Bearer ', '')
  if (!token) return null
  return await verify(token)
}

export async function getJWTFromCookies() {
  const cookieStore = cookies()
  const token = cookieStore.get('jwt')?.value
  if (!token) return null
  return await verify(token)
}