'use client';

import React, { useState } from 'react';
import ProductCard from './ProductCard';
import { Search } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface ProductItem {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  image: string;
  categoryId: string;
  category: {
    name: string;
  };
}

interface ProductFilterProps {
  categories: Category[];
  products: ProductItem[];
}

export default function ProductFilter({ categories, products }: ProductFilterProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === 'ALL' || product.categoryId === selectedCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div>
      <div className="bg-industrial-50 border border-industrial-200 p-4 md:p-6 mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-industrial-400" />
          <input
            type="text"
            placeholder="Search specifications, parts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-industrial-300 text-sm focus:outline-none focus:border-industrial-900 bg-white"
          />
        </div>

        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          <button
            onClick={() => setSelectedCategory('ALL')}
            className={`px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors ${
              selectedCategory === 'ALL'
                ? 'bg-industrial-900 text-white'
                : 'bg-white text-industrial-700 border border-industrial-300 hover:border-industrial-500'
            }`}
          >
            All Products ({products.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-industrial-900 text-white'
                  : 'bg-white text-industrial-700 border border-industrial-300 hover:border-industrial-500'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border border-dashed border-industrial-300 bg-white p-8">
          <p className="text-industrial-600 font-medium">No matching products found.</p>
          <p className="text-sm text-industrial-400 mt-1">
            Try adjusting your search query or switching categories.
          </p>
        </div>
      )}
    </div>
  );
}