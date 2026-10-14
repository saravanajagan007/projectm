import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

function decodeJwtPayload(token: string): any {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join(''),
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const accessToken = request.cookies.get('access_token')?.value;
  const refreshToken = request.cookies.get('refresh_token')?.value;
  const hasAuth = !!(accessToken || refreshToken);

  // 1. /login permanently redirects to /admin
  if (pathname === '/login') {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  // 2. /dashboard or /companies redirects to /admin/manage-companies
  if (pathname.startsWith('/dashboard') || pathname.startsWith('/companies')) {
    return NextResponse.redirect(new URL('/admin/manage-companies', request.url));
  }

  // 3. /admin/manage-companies requires authenticated session (ADMIN or ADD_COMPANY)
  const isManageCompaniesRoute = pathname.startsWith('/admin/manage-companies');
  if (isManageCompaniesRoute) {
    if (!hasAuth) {
      const adminLoginUrl = new URL('/admin', request.url);
      adminLoginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(adminLoginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/admin/:path*',
    '/companies/:path*',
    '/login',
  ],
};
