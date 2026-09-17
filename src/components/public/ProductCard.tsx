import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    slug: string;
    shortDescription: string;
    image: string;
    category: {
      name: string;
    };
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="bg-white border border-industrial-200 hover:border-industrial-400 transition-all flex flex-col h-full group">
      <div className="relative aspect-[16/10] overflow-hidden bg-industrial-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 bg-industrial-900/90 text-white text-[11px] font-semibold uppercase tracking-wider px-2 py-1">
          {product.category.name}
        </div>
      </div>

      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-bold text-industrial-900 group-hover:text-accent transition-colors">
            {product.name}
          </h3>
          <p className="mt-2 text-sm text-industrial-600 line-clamp-2 leading-relaxed">
            {product.shortDescription}
          </p>
        </div>

        <div className="mt-6 pt-4 border-t border-industrial-100 flex items-center justify-between">
          <Link
            href={`/products/${product.slug}`}
            className="text-sm font-semibold text-industrial-900 hover:text-accent flex items-center gap-1.5 transition-colors"
          >
            Technical Specs
            <ArrowRight className="w-4 h-4 text-accent group-hover:translate-x-1 transition-transform" />
          </Link>
          <span className="text-[11px] uppercase tracking-wider text-industrial-400 font-mono">B2B Supply</span>
        </div>
      </div>
    </div>
  );
}