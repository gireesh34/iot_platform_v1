// Replace jsonwebtoken with Web Crypto API implementation
import { SignJWT, jwtVerify } from 'jose'

export async function verify(token: string) {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET)
  try {
    const { payload } = await jwtVerify(token, secret)
    return payload
  } catch (err) {
    return null
  }
}

export async function sign(payload: any) {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET)
  const jwt = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(secret)
  return jwt
}
