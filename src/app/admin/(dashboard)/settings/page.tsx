import React from 'react';
import { prisma } from '@/lib/prisma';
import { updateSettings } from '@/lib/actions';

export const revalidate = 0;

export default async function AdminSettingsPage() {
  const settings = await prisma.siteSettings.findUnique({
    where: { id: 'default' },
  });

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-industrial-900">Site Configuration</h1>
        <p className="text-xs text-industrial-500 mt-0.5">
          Modifications here immediately update the live public website and footer.
        </p>
      </div>

      <form action={updateSettings} className="bg-white border border-industrial-200 p-6 shadow-sm space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-industrial-700 mb-1">
              Company Name
            </label>
            <input
              name="companyName"
              type="text"
              required
              defaultValue={settings?.companyName || 'Aarav Industries'}
              className="w-full px-3 py-2 border border-industrial-300 text-sm focus:outline-none focus:border-industrial-900"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-industrial-700 mb-1">
              Tagline
            </label>
            <input
              name="tagline"
              type="text"
              required
              defaultValue={settings?.tagline || 'Quality Manufacturing. Reliable Solutions.'}
              className="w-full px-3 py-2 border border-industrial-300 text-sm focus:outline-none focus:border-industrial-900"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-industrial-700 mb-1">
              Phone Number
            </label>
            <input
              name="phone"
              type="text"
              required
              defaultValue={settings?.phone || '+91 98765 43210'}
              className="w-full px-3 py-2 border border-industrial-300 text-sm focus:outline-none focus:border-industrial-900"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-industrial-700 mb-1">
              WhatsApp Number
            </label>
            <input
              name="whatsappNumber"
              type="text"
              defaultValue={settings?.whatsappNumber || '+919876543210'}
              className="w-full px-3 py-2 border border-industrial-300 text-sm focus:outline-none focus:border-industrial-900"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-industrial-700 mb-1">
              Official Email
            </label>
            <input
              name="email"
              type="email"
              required
              defaultValue={settings?.email || 'sales@aaravindustries.example'}
              className="w-full px-3 py-2 border border-industrial-300 text-sm focus:outline-none focus:border-industrial-900"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-industrial-700 mb-1">
            Factory / Operational Address
          </label>
          <input
            name="address"
            type="text"
            required
            defaultValue={settings?.address || 'MIDC Area, Nagpur, Maharashtra'}
            className="w-full px-3 py-2 border border-industrial-300 text-sm focus:outline-none focus:border-industrial-900"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-industrial-700 mb-1">
            About Company Summary
          </label>
          <textarea
            name="aboutSummary"
            rows={4}
            required
            defaultValue={settings?.aboutSummary || ''}
            className="w-full px-3 py-2 border border-industrial-300 text-sm focus:outline-none focus:border-industrial-900"
          />
        </div>

        <div className="pt-4 border-t border-industrial-200 flex justify-end">
          <button
            type="submit"
            className="px-5 py-2.5 bg-industrial-900 hover:bg-industrial-800 text-white text-xs font-semibold uppercase tracking-wider transition-colors"
          >
            Save Site Configuration
          </button>
        </div>
      </form>
    </div>
  );
}