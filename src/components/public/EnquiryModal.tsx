'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';

interface EnquiryModalProps {
  productId?: string;
  productName?: string;
}

export default function EnquiryModal({ productId, productName }: EnquiryModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    message: productName ? `Requesting quotation and specification sheet for: ${productName}` : '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, productId }),
      });

      if (!res.ok) throw new Error('Submission failed');
      setSuccess(true);
    } catch {
      setError('Unable to send enquiry right now. Please try calling directly.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-industrial-50 border border-green-600/30 p-8 text-center">
        <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto mb-3" />
        <h3 className="text-xl font-bold text-industrial-900">Enquiry Transmitted</h3>
        <p className="text-sm text-industrial-600 mt-2 max-w-md mx-auto">
          Thank you. Our sales engineering team will review your requirements and reply within one business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-industrial-200 p-6 sm:p-8 space-y-4">
      {error && (
        <div className="p-3 text-xs bg-red-50 text-red-700 border border-red-200">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-industrial-700 mb-1">
            Contact Person *
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-3 py-2 border border-industrial-300 text-sm focus:outline-none focus:border-industrial-900"
            placeholder="e.g. Suresh Patel"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-industrial-700 mb-1">
            Company Name *
          </label>
          <input
            type="text"
            required
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            className="w-full px-3 py-2 border border-industrial-300 text-sm focus:outline-none focus:border-industrial-900"
            placeholder="e.g. Apex Heavy Fabricators"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-industrial-700 mb-1">
            Business Email *
          </label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-3 py-2 border border-industrial-300 text-sm focus:outline-none focus:border-industrial-900"
            placeholder="suresh@company.com"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-industrial-700 mb-1">
            Phone / Mobile *
          </label>
          <input
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-3 py-2 border border-industrial-300 text-sm focus:outline-none focus:border-industrial-900"
            placeholder="+91 98000 00000"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-industrial-700 mb-1">
          Technical Specifications / Order Quantity *
        </label>
        <textarea
          required
          rows={4}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full px-3 py-2 border border-industrial-300 text-sm focus:outline-none focus:border-industrial-900"
          placeholder="Mention part numbers, expected volume, material grades, or project timelines."
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 bg-industrial-900 hover:bg-industrial-800 text-white font-semibold text-sm tracking-wider uppercase transition-colors flex items-center justify-center gap-2"
      >
        <Send className="w-4 h-4 text-accent" />
        {loading ? 'Submitting...' : 'Submit Industrial RFQ'}
      </button>
    </form>
  );
}
