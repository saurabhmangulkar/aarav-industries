import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
export const runtime = 'nodejs';
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, company, email, phone, message, productId } = body;

    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { message: 'Missing required contact fields' },
        { status: 400 }
      );
    }

    const enquiry = await prisma.enquiry.create({
      data: {
        name,
        company: company || 'Individual / Contractor',
        email,
        phone,
        message,
        productId: productId || null,
        status: 'NEW',
      },
    });

    return NextResponse.json({ success: true, data: enquiry });
  } catch (error: any) {
    return NextResponse.json(
      { message: 'Failed to record enquiry', error: error.message },
      { status: 500 }
    );
  }
}