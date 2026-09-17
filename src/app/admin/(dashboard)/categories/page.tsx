import React from 'react';
import { prisma } from '@/lib/prisma';
import { createCategory, deleteCategory } from '@/lib/actions';
import { Trash2 } from 'lucide-react';

export const revalidate = 0;

export default async function AdminCategoriesPage() {
  const categories = await prisma.category.findMany({
    include: { _count: { select: { products: true } } },
    orderBy: { name: 'asc' },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-industrial-900">Catalogue Categories</h1>
        <p className="text-xs text-industrial-500 mt-0.5">
          Organize components into logical manufacturing groups.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="bg-white p-5 border border-industrial-200 shadow-sm h-fit">
          <h2 className="text-sm font-bold uppercase tracking-wider text-industrial-900 mb-4">
            Add New Category
          </h2>
          <form action={createCategory} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-industrial-700 mb-1">
                Category Name *
              </label>
              <input
                name="name"
                type="text"
                required
                placeholder="e.g. Hydraulic Fittings"
                className="w-full px-3 py-2 border border-industrial-300 text-sm focus:outline-none focus:border-industrial-900"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-industrial-700 mb-1">
                Description (Optional)
              </label>
              <textarea
                name="description"
                rows={3}
                placeholder="Brief summary..."
                className="w-full px-3 py-2 border border-industrial-300 text-sm focus:outline-none focus:border-industrial-900"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-industrial-900 hover:bg-industrial-800 text-white text-xs font-semibold uppercase tracking-wider transition-colors"
            >
              Create Category
            </button>
          </form>
        </div>

        <div className="lg:col-span-2 bg-white border border-industrial-200 shadow-sm overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-industrial-50 border-b border-industrial-200 text-industrial-600 uppercase font-semibold">
              <tr>
                <th className="px-5 py-3">Name</th>
                <th className="px-5 py-3">Slug</th>
                <th className="px-5 py-3">Products</th>
                <th className="px-5 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-industrial-100">
              {categories.map((cat) => (
                <tr key={cat.id} className="hover:bg-industrial-50/70">
                  <td className="px-5 py-3 font-semibold text-industrial-900">{cat.name}</td>
                  <td className="px-5 py-3 text-industrial-500 font-mono">{cat.slug}</td>
                  <td className="px-5 py-3">
                    <span className="px-2 py-0.5 bg-industrial-100 text-industrial-800 text-[10px] font-bold">
                      {cat._count.products} item(s)
                    </span>
                  </td>
                  <td className="px-5 py-3 text-right">
                    {cat._count.products === 0 ? (
                      <form
                        action={async () => {
                          'use server';
                          await deleteCategory(cat.id);
                        }}
                      >
                        <button
                          type="submit"
                          className="text-red-600 hover:text-red-800 p-1"
                          title="Delete Category"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </form>
                    ) : (
                      <span className="text-[10px] text-industrial-400">Assigned</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}