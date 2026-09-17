import React from 'react';
import Navbar from '@/components/public/Navbar';
import Footer from '@/components/public/Footer';
import { prisma } from '@/lib/prisma';

export const revalidate = 0;

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await prisma.siteSettings.findUnique({
    where: { id: 'default' },
  });

  return (
    <div className="flex flex-col min-h-screen bg-white text-industrial-900 selection:bg-accent selection:text-white">
      <Navbar phone={settings?.phone} />
      <main className="flex-grow">{children}</main>
      <Footer settings={settings || undefined} />
    </div>
  );
}