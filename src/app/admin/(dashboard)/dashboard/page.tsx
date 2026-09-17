import React from 'react';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Package, Layers, MessageSquare, ArrowRight } from 'lucide-react';

export const revalidate = 0;

export default async function AdminDashboardPage() {
  const [
    totalProducts,
    publishedProducts,
    totalCategories,
    newEnquiriesCount,
    recentEnquiries,
  ] = await Promise.all([
    prisma.product.count(),
    prisma.product.count({ where: { published: true } }),
    prisma.category.count(),
    prisma.enquiry.count({ where: { status: 'NEW' } }),
    prisma.enquiry.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: { product: true },
    }),
  ]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-industrial-900">Operations Dashboard</h1>
        <p className="text-xs text-industrial-500 mt-1">Live status of catalogue and inbound commercial enquiries.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-5 border border-industrial-200 shadow-sm">
          <div className="flex items-center justify-between text-industrial-500">
            <span className="text-xs font-bold uppercase tracking-wider">Total Products</span>
            <Package className="w-4 h-4 text-accent" />
          </div>
          <p className="text-3xl font-black text-industrial-900 mt-2">{totalProducts}</p>
        </div>

        <div className="bg-white p-5 border border-industrial-200 shadow-sm">
          <div className="flex items-center justify-between text-industrial-500">
            <span className="text-xs font-bold uppercase tracking-wider">Published Online</span>
            <Package className="w-4 h-4 text-green-600" />
          </div>
          <p className="text-3xl font-black text-industrial-900 mt-2">{publishedProducts}</p>
        </div>

        <div className="bg-white p-5 border border-industrial-200 shadow-sm">
          <div className="flex items-center justify-between text-industrial-500">
            <span className="text-xs font-bold uppercase tracking-wider">Categories</span>
            <Layers className="w-4 h-4 text-accent" />
          </div>
          <p className="text-3xl font-black text-industrial-900 mt-2">{totalCategories}</p>
        </div>

        <div className="bg-white p-5 border border-industrial-200 shadow-sm">
          <div className="flex items-center justify-between text-industrial-500">
            <span className="text-xs font-bold uppercase tracking-wider">New Enquiries</span>
            <MessageSquare className="w-4 h-4 text-amber-600" />
          </div>
          <p className="text-3xl font-black text-industrial-900 mt-2">{newEnquiriesCount}</p>
        </div>
      </div>

      <div className="bg-white border border-industrial-200 shadow-sm">
        <div className="p-5 border-b border-industrial-200 flex items-center justify-between">
          <h3 className="font-bold text-sm uppercase tracking-wider text-industrial-900">
            Recent Client Enquiries
          </h3>
          <Link
            href="/admin/enquiries"
            className="text-xs font-semibold text-accent hover:underline flex items-center gap-1"
          >
            Manage All <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-industrial-50 border-b border-industrial-200 text-industrial-600 uppercase font-semibold">
              <tr>
                <th className="px-5 py-3">Customer</th>
                <th className="px-5 py-3">Company</th>
                <th className="px-5 py-3">Product</th>
                <th className="px-5 py-3">Date</th>
                <th className="px-5 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-industrial-100">
              {recentEnquiries.length > 0 ? (
                recentEnquiries.map((enq) => (
                  <tr key={enq.id} className="hover:bg-industrial-50/80">
                    <td className="px-5 py-3 font-semibold text-industrial-900">{enq.name}</td>
                    <td className="px-5 py-3 text-industrial-600">{enq.company}</td>
                    <td className="px-5 py-3 text-industrial-600">{enq.product?.name || 'General Enquiry'}</td>
                    <td className="px-5 py-3 text-industrial-400 font-mono">
                      {new Date(enq.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-5 py-3">
                      <span
                        className={`inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-sm ${
                          enq.status === 'NEW'
                            ? 'bg-amber-100 text-amber-800'
                            : enq.status === 'CONTACTED'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-green-100 text-green-800'
                        }`}
                      >
                        {enq.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-5 py-6 text-center text-industrial-400">
                    No enquiries recorded yet.
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