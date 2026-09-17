import React from 'react';
import { prisma } from '@/lib/prisma';
import ProductFilter from '@/components/public/ProductFilter';

export const revalidate = 0;

export default async function ProductsCatalogPage() {
  const [categories, products] = await Promise.all([
    prisma.category.findMany({
      orderBy: { name: 'asc' },
    }),
    prisma.product.findMany({
      where: { published: true },
      include: { category: true },
      orderBy: { createdAt: 'desc' },
    }),
  ]);

  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-industrial-200 pb-8 mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-accent">Production Catalogue</span>
          <h1 className="text-3xl sm:text-4xl font-black text-industrial-900 mt-2">
            Industrial Components & Fasteners
          </h1>
          <p className="mt-3 text-industrial-600 max-w-2xl text-sm">
            Browse our complete inventory of standard fasteners, metal parts, and structural assemblies. For bespoke specifications, request a custom quote.
          </p>
        </div>

        <ProductFilter categories={categories} products={products} />
      </div>
    </div>
  );
}