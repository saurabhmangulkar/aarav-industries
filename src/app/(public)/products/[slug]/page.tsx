import React from 'react';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import EnquiryModal from '@/components/public/EnquiryModal';
import { ShieldCheck, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export const revalidate = 0;

interface Props {
  params: { slug: string };
}

export default async function ProductDetailPage({ params }: Props) {
  const product = await prisma.product.findUnique({
    where: { slug: params.slug },
    include: { category: true },
  });

  if (!product || !product.published) {
    notFound();
  }

  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link
            href="/products"
            className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-industrial-600 hover:text-industrial-900"
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-1" />
            Back to Products Catalogue
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="aspect-[4/3] bg-industrial-100 border border-industrial-200 overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="mt-4 p-4 bg-industrial-50 border border-industrial-200 text-xs text-industrial-600 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-accent" />
                Raw material test reports available on request
              </span>
              <span className="font-mono text-industrial-500">SKU: {product.slug.toUpperCase()}</span>
            </div>
          </div>

          <div>
            <div className="inline-block px-2.5 py-1 bg-industrial-100 text-industrial-800 text-xs font-semibold uppercase tracking-wider mb-3">
              {product.category.name}
            </div>
            <h1 className="text-3xl font-black text-industrial-900">{product.name}</h1>
            <p className="mt-4 text-base text-industrial-700 leading-relaxed">
              {product.description}
            </p>

            <div className="mt-8 border border-industrial-200 p-6 bg-white">
              <h3 className="text-xs font-bold uppercase tracking-wider text-industrial-900 mb-4 border-b border-industrial-100 pb-2">
                Technical Specifications
              </h3>
              {product.specifications ? (
                <pre className="font-sans text-sm text-industrial-700 whitespace-pre-line leading-relaxed">
                  {product.specifications}
                </pre>
              ) : (
                <p className="text-sm text-industrial-500 italic">
                  Standard industrial grades and custom dimensional tolerances available upon enquiry.
                </p>
              )}
            </div>

            <div className="mt-6 flex flex-wrap gap-4">
              <a
                href="#enquiry-form"
                className="px-6 py-3 bg-industrial-900 hover:bg-industrial-800 text-white font-semibold text-sm uppercase tracking-wider transition-colors inline-block"
              >
                Request a Quote
              </a>
            </div>
          </div>
        </div>

        <div id="enquiry-form" className="mt-16 pt-12 border-t border-industrial-200">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <span className="text-xs font-bold uppercase tracking-widest text-accent">Direct Factory Enquiry</span>
              <h2 className="text-2xl font-bold text-industrial-900 mt-1">
                Order or Request Quotation for {product.name}
              </h2>
              <p className="text-sm text-industrial-600 mt-1">
                Fill in your commercial details and requirements below.
              </p>
            </div>
            <EnquiryModal productId={product.id} productName={product.name} />
          </div>
        </div>
      </div>
    </div>
  );
}