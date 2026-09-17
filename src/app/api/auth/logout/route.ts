import { NextResponse } from 'next/server';
import { removeAdminSession } from '@/lib/auth';

export async function POST(request: Request) {
  await removeAdminSession();
  return NextResponse.redirect(new URL('/admin/login', request.url), 303);
}