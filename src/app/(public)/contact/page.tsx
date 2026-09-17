import React from 'react';
import { prisma } from '@/lib/prisma';
import EnquiryModal from '@/components/public/EnquiryModal';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

export const revalidate = 0;

export default async function ContactPage() {
  const settings = await prisma.siteSettings.findUnique({
    where: { id: 'default' },
  });

  const phone = settings?.phone || '+91 98765 43210';
  const email = settings?.email || 'sales@aaravindustries.example';
  const address = settings?.address || 'MIDC Area, Nagpur, Maharashtra';

  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-industrial-200 pb-8 mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-accent">Commercial Department</span>
          <h1 className="text-3xl sm:text-4xl font-black text-industrial-900 mt-2">
            Contact & Request Quotation
          </h1>
          <p className="mt-2 text-industrial-600 text-sm max-w-xl">
            Submit your RFQs, specification drawings, or schedule a visit to our manufacturing facility.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="space-y-6">
            <div className="border border-industrial-200 p-6 bg-industrial-50 space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-industrial-900 border-b border-industrial-200 pb-2">
                Plant Location
              </h3>
              <div className="flex items-start gap-3 text-sm text-industrial-700">
                <MapPin className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <span>{address}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-industrial-700">
                <Phone className="w-4 h-4 text-accent shrink-0" />
                <span>{phone}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-industrial-700">
                <Mail className="w-4 h-4 text-accent shrink-0" />
                <span>{email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-industrial-700">
                <Clock className="w-4 h-4 text-accent shrink-0" />
                <span>Mon – Sat: 08:30 AM – 06:00 PM IST</span>
              </div>
            </div>

            <div className="p-6 bg-industrial-900 text-white text-xs space-y-2">
              <p className="font-bold uppercase tracking-wider text-accent">Vendor Registrations</p>
              <p className="text-industrial-300">
                Direct all public tenders, vendor qualification forms, and compliance audits to our commercial desk.
              </p>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-lg font-bold text-industrial-900 mb-4">Send an Official Enquiry</h3>
            <EnquiryModal />
          </div>
        </div>
      </div>
    </div>
  );
}
