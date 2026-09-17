'use client';

import React, { useState, useTransition } from 'react';
import { updateEnquiryStatus } from '@/lib/actions';

interface StatusSelectProps {
  id: string;
  initialStatus: string;
}

export default function StatusSelect({ id, initialStatus }: StatusSelectProps) {
  const [status, setStatus] = useState(initialStatus);
  const [isPending, startTransition] = useTransition();

  const handleStatusChange = (newStatus: 'NEW' | 'CONTACTED' | 'CLOSED') => {
    setStatus(newStatus);
    startTransition(async () => {
      try {
        await updateEnquiryStatus(id, newStatus);
      } catch (err) {
        console.error('Failed to update status:', err);
        setStatus(initialStatus);
      }
    });
  };

  const getStatusBadge = (val: string) => {
    switch (val) {
      case 'NEW':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'CONTACTED':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'CLOSED':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="flex items-center gap-2">
      <select
        value={status}
        disabled={isPending}
        onChange={(e) => handleStatusChange(e.target.value as 'NEW' | 'CONTACTED' | 'CLOSED')}
        aria-label="Update enquiry status"
        className={`text-xs font-semibold px-2.5 py-1.5 border rounded-sm outline-none transition-all cursor-pointer ${getStatusBadge(
          status
        )} ${isPending ? 'opacity-50 cursor-wait' : ''}`}
      >
        <option value="NEW">NEW</option>
        <option value="CONTACTED">CONTACTED</option>
        <option value="CLOSED">CLOSED</option>
      </select>
    </div>
  );
}