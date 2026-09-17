import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const SECRET_KEY = new TextEncoder().encode(
  process.env.AUTH_SECRET || 'aarav-industries-fallback-secret-minimum-32-chars-key'
);

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  if (path.startsWith('/admin') && path !== '/admin/login') {
    const token = request.cookies.get('aarav_admin_token')?.value;

    if (!token) {
      const url = new URL('/admin/login', request.url);
      url.searchParams.set('redirect', path);
      return NextResponse.redirect(url);
    }

    try {
      await jwtVerify(token, SECRET_KEY);
      return NextResponse.next();
    } catch {
      const url = new URL('/admin/login', request.url);
      return NextResponse.redirect(url);
    }
  }

  if (path === '/admin/login') {
    const token = request.cookies.get('aarav_admin_token')?.value;
    if (token) {
      try {
        await jwtVerify(token, SECRET_KEY);
        return NextResponse.redirect(new URL('/admin/dashboard', request.url));
      } catch {
        // Continue to login page if token is invalid
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};