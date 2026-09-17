import React from 'react';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { toggleProductStatus, deleteProduct } from '@/lib/actions';

export const revalidate = 0;

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    include: { category: true },
    orderBy: { updatedAt: 'desc' },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-industrial-900">Product Management</h1>
          <p className="text-xs text-industrial-500 mt-0.5">
            Add, update specifications, or publish items dynamically.
          </p>
        </div>
        <Link
          href="/admin/products/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-industrial-900 hover:bg-industrial-800 text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4 text-accent" />
          Add Product
        </Link>
      </div>

      <div className="bg-white border border-industrial-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-industrial-50 border-b border-industrial-200 text-industrial-600 uppercase font-semibold">
              <tr>
                <th className="px-5 py-3.5">Product</th>
                <th className="px-5 py-3.5">Category</th>
                <th className="px-5 py-3.5">Published</th>
                <th className="px-5 py-3.5">Featured</th>
                <th className="px-5 py-3.5">Last Updated</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-industrial-100">
              {products.length > 0 ? (
                products.map((product) => (
                  <tr key={product.id} className="hover:bg-industrial-50/70">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-10 h-10 object-cover bg-industrial-100 border border-industrial-200 shrink-0"
                        />
                        <div>
                          <p className="font-bold text-industrial-900">{product.name}</p>
                          <p className="text-[11px] text-industrial-400 font-mono">/{product.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-industrial-600 font-medium">
                      {product.category.name}
                    </td>
                    <td className="px-5 py-3">
                      <form action={toggleProductStatus.bind(null, product.id, 'published')}>
                        <button
                          type="submit"
                          className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-sm ${
                            product.published
                              ? 'bg-green-100 text-green-800 hover:bg-green-200'
                              : 'bg-industrial-100 text-industrial-600 hover:bg-industrial-200'
                          }`}
                        >
                          {product.published ? 'Published' : 'Draft'}
                        </button>
                      </form>
                    </td>
                    <td className="px-5 py-3">
                      <form action={toggleProductStatus.bind(null, product.id, 'featured')}>
                        <button
                          type="submit"
                          className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-sm ${
                            product.featured
                              ? 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                              : 'bg-industrial-100 text-industrial-400 hover:bg-industrial-200'
                          }`}
                        >
                          {product.featured ? 'Featured' : 'Standard'}
                        </button>
                      </form>
                    </td>
                    <td className="px-5 py-3 text-industrial-400 font-mono">
                      {new Date(product.updatedAt).toLocaleDateString()}
                    </td>
                    <td className="px-5 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/products/${product.id}/edit`}
                          className="p-1.5 text-industrial-600 hover:text-industrial-900 hover:bg-industrial-100"
                          title="Edit"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </Link>
                        <form
                          action={async () => {
                            'use server';
                            await deleteProduct(product.id);
                          }}
                        >
                          <button
                            type="submit"
                            className="p-1.5 text-red-600 hover:text-red-800 hover:bg-red-50"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-5 py-8 text-center text-industrial-400">
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}