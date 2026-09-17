import React from 'react';
import { prisma } from '@/lib/prisma';
import StatusSelect from '@/components/admin/StatusSelect';
import { Mail, Phone, Calendar, Building2 } from 'lucide-react';

export const revalidate = 0;

export default async function EnquiriesPage() {
  const enquiries = await prisma.enquiry.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-industrial-950">Client Enquiries & RFQs</h1>
          <p className="text-sm text-industrial-600 mt-1">
            Review inbound requests, quotation demands, and communication status.
          </p>
        </div>
        <div className="bg-industrial-100 text-industrial-800 text-sm font-semibold px-4 py-2 rounded-sm border border-industrial-200">
          Total Requests: {enquiries.length}
        </div>
      </div>

      <div className="bg-white border border-industrial-200 shadow-sm overflow-hidden">
        {enquiries.length === 0 ? (
          <div className="p-12 text-center text-industrial-500">
            No enquiries received yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-industrial-50 border-b border-industrial-200 text-industrial-700 font-semibold uppercase text-xs">
                  <th className="py-3 px-4">Client / Company</th>
                  <th className="py-3 px-4">Contact</th>
                  <th className="py-3 px-4">Message / Requirements</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-industrial-200">
                {enquiries.map((enquiry) => (
                  <tr key={enquiry.id} className="hover:bg-industrial-50/60 transition-colors">
                    <td className="py-4 px-4 align-top">
                      <div className="font-semibold text-industrial-900">{enquiry.name}</div>
                      {enquiry.company && (
                        <div className="text-xs text-industrial-500 flex items-center gap-1 mt-0.5">
                          <Building2 className="w-3 h-3" />
                          {enquiry.company}
                        </div>
                      )}
                    </td>
                    <td className="py-4 px-4 align-top space-y-1">
                      <div className="flex items-center gap-1.5 text-xs text-industrial-700">
                        <Mail className="w-3.5 h-3.5 text-accent" />
                        <a href={`mailto:${enquiry.email}`} className="hover:underline">
                          {enquiry.email}
                        </a>
                      </div>
                      {enquiry.phone && (
                        <div className="flex items-center gap-1.5 text-xs text-industrial-600">
                          <Phone className="w-3.5 h-3.5 text-industrial-400" />
                          <a href={`tel:${enquiry.phone}`} className="hover:underline">
                            {enquiry.phone}
                          </a>
                        </div>
                      )}
                    </td>
                    <td className="py-4 px-4 align-top max-w-xs">
                      <p className="text-xs text-industrial-600 line-clamp-3 leading-relaxed">
                        {enquiry.message}
                      </p>
                    </td>
                    <td className="py-4 px-4 align-top text-xs text-industrial-500 whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-industrial-400" />
                        {new Date(enquiry.createdAt).toLocaleDateString('en-IN', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </div>
                    </td>
                    <td className="py-4 px-4 align-top">
                      <StatusSelect id={enquiry.id} initialStatus={enquiry.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}