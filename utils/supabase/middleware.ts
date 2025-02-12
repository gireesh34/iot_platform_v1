import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from './server';

export async function middleware(req: NextRequest) {
  const tokenCookie = req.cookies.get('sb-access-token');
  const token = tokenCookie ? tokenCookie.value : null;

  if (!token) {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  const supabase = supabaseServer()
  const { data, error } = await supabase.auth.getUser(token);

  if (error || !data.user) {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/app/:path*', '/dashboard/:path*'],
};
