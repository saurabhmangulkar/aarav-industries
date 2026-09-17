import { NextResponse } from 'next/server';
import { removeAdminSession } from '@/lib/auth';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  await removeAdminSession();

  return NextResponse.redirect(new URL('/admin/login', request.url), 303);
}