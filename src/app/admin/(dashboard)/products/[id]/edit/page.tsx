import React from 'react';
import { prisma } from '@/lib/prisma';
import { updateProduct } from '@/lib/actions';
import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const revalidate = 0;

interface Props {
  params: { id: string };
}

export default async function EditProductPage({ params }: Props) {
  const [product, categories] = await Promise.all([
    prisma.product.findUnique({ where: { id: params.id } }),
    prisma.category.findMany({ orderBy: { name: 'asc' } }),
  ]);

  if (!product) notFound();

  async function handleUpdate(formData: FormData) {
    'use server';
    await updateProduct(product!.id, formData);
    redirect('/admin/products');
  }

  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex items-center gap-2">
        <Link href="/admin/products" className="text-industrial-500 hover:text-industrial-900">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <h1 className="text-xl font-bold text-industrial-900">Edit Product: {product.name}</h1>
      </div>

      <form action={handleUpdate} className="bg-white border border-industrial-200 p-6 shadow-sm space-y-5">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-industrial-700 mb-1">
            Product Name *
          </label>
          <input
            name="name"
            type="text"
            required
            defaultValue={product.name}
            className="w-full px-3 py-2 border border-industrial-300 text-sm focus:outline-none focus:border-industrial-900"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-industrial-700 mb-1">
              Custom Slug *
            </label>
            <input
              name="slug"
              type="text"
              required
              defaultValue={product.slug}
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
              defaultValue={product.categoryId}
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
            defaultValue={product.image}
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
            defaultValue={product.shortDescription}
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
            defaultValue={product.description}
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
            defaultValue={product.specifications || ''}
            className="w-full px-3 py-2 border border-industrial-300 text-sm focus:outline-none focus:border-industrial-900 font-mono text-xs"
          />
        </div>

        <div className="flex gap-6 pt-2">
          <label className="flex items-center gap-2 text-xs font-semibold text-industrial-800 cursor-pointer">
            <input
              type="checkbox"
              name="published"
              value="true"
              defaultChecked={product.published}
              className="w-4 h-4"
            />
            Published
          </label>

          <label className="flex items-center gap-2 text-xs font-semibold text-industrial-800 cursor-pointer">
            <input
              type="checkbox"
              name="featured"
              value="true"
              defaultChecked={product.featured}
              className="w-4 h-4"
            />
            Featured on Homepage
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
            Update Product
          </button>
        </div>
      </form>
    </div>
  );
}