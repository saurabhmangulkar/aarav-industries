import React from 'react';
import { prisma } from '@/lib/prisma';
import { createProduct } from '@/lib/actions';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const revalidate = 0;

export default async function NewProductPage() {
  const categories = await prisma.category.findMany({ orderBy: { name: 'asc' } });

  async function handleCreate(formData: FormData) {
    'use server';
    await createProduct(formData);
    redirect('/admin/products');
  }

  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex items-center gap-2">
        <Link href="/admin/products" className="text-industrial-500 hover:text-industrial-900">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <h1 className="text-xl font-bold text-industrial-900">Add New Industrial Product</h1>
      </div>

      <form action={handleCreate} className="bg-white border border-industrial-200 p-6 shadow-sm space-y-5">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-industrial-700 mb-1">
            Product Name *
          </label>
          <input
            name="name"
            type="text"
            required
            placeholder="e.g. Precision CNC Machined Bushing"
            className="w-full px-3 py-2 border border-industrial-300 text-sm focus:outline-none focus:border-industrial-900"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-industrial-700 mb-1">
              Custom Slug (optional)
            </label>
            <input
              name="slug"
              type="text"
              placeholder="e.g. cnc-machined-bushing"
              className="w-full px-3 py-2 border border-industrial-300 text-sm focus:outline-none focus:border-industrial-900"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-industrial-700 mb-1">
              Category *
            </label>
            <select
              name="categoryId"
              required
              className="w-full px-3 py-2 border border-industrial-300 text-sm focus:outline-none focus:border-industrial-900 bg-white"
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-industrial-700 mb-1">
            Product Image URL
          </label>
          <input
            name="image"
            type="url"
            placeholder="https://images.unsplash.com/..."
            className="w-full px-3 py-2 border border-industrial-300 text-sm focus:outline-none focus:border-industrial-900"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-industrial-700 mb-1">
            Short Description *
          </label>
          <input
            name="shortDescription"
            type="text"
            required
            placeholder="Brief overview for catalogue cards..."
            className="w-full px-3 py-2 border border-industrial-300 text-sm focus:outline-none focus:border-industrial-900"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-industrial-700 mb-1">
            Detailed Description *
          </label>
          <textarea
            name="description"
            rows={4}
            required
            placeholder="Complete manufacturing details, applications, metallurgical properties..."
            className="w-full px-3 py-2 border border-industrial-300 text-sm focus:outline-none focus:border-industrial-900"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-industrial-700 mb-1">
            Technical Specifications (Line-by-line)
          </label>
          <textarea
            name="specifications"
            rows={4}
            placeholder="Material: AISI 316 Stainless Steel&#10;Hardness: 45 HRC&#10;Tolerance: ±0.005mm"
            className="w-full px-3 py-2 border border-industrial-300 text-sm focus:outline-none focus:border-industrial-900 font-mono text-xs"
          />
        </div>

        <div className="flex gap-6 pt-2">
          <label className="flex items-center gap-2 text-xs font-semibold text-industrial-800 cursor-pointer">
            <input type="checkbox" name="published" value="true" defaultChecked className="w-4 h-4" />
            Publish on Website
          </label>

          <label className="flex items-center gap-2 text-xs font-semibold text-industrial-800 cursor-pointer">
            <input type="checkbox" name="featured" value="true" className="w-4 h-4" />
            Feature on Homepage
          </label>
        </div>

        <div className="pt-4 border-t border-industrial-200 flex justify-end gap-3">
          <Link
            href="/admin/products"
            className="px-4 py-2 border border-industrial-300 text-xs font-semibold uppercase tracking-wider text-industrial-700 hover:bg-industrial-50"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="px-5 py-2 bg-industrial-900 hover:bg-industrial-800 text-white text-xs font-semibold uppercase tracking-wider transition-colors"
          >
            Save Product
          </button>
        </div>
      </form>
    </div>
  );
}