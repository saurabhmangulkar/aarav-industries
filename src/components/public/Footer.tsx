import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, ShieldCheck, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  settings?: {
    companyName: string;
    tagline: string;
    phone: string;
    email: string;
    address: string;
  };
}

export default function Footer({ settings }: FooterProps) {
  const company = settings || {
    companyName: 'Aarav Industries',
    tagline: 'Quality Manufacturing. Reliable Solutions.',
    phone: '+91 98765 43210',
    email: 'sales@aaravindustries.example',
    address: 'Plot No. 42, MIDC Industrial Area, Hingna Road, Nagpur, Maharashtra - 440016',
  };

  return (
    <footer className="bg-industrial-950 text-industrial-300 border-t border-industrial-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-white">
              <div className="w-8 h-8 bg-white text-industrial-950 font-black flex items-center justify-center text-sm">
                AI
              </div>
              <span className="font-bold tracking-tight text-lg">{company.companyName}</span>
            </div>
            <p className="text-sm text-industrial-400 leading-relaxed">
              {company.tagline} Delivering heavy-duty engineering parts and structural fasteners built for zero-tolerance industrial operations.
            </p>
            <div className="flex items-center gap-2 text-xs text-industrial-400 pt-2">
              <ShieldCheck className="w-4 h-4 text-accent" />
              <span>ISO 9001:2015 Production Standards</span>
            </div>
          </div>

          <div>
            <h4 className="text-white text-sm font-semibold uppercase tracking-wider mb-4 border-l-2 border-accent pl-2">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/products" className="hover:text-white transition-colors flex items-center gap-1">
                  Product Catalogue <ArrowUpRight className="w-3.5 h-3.5 text-industrial-500" />
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors flex items-center gap-1">
                  Manufacturing Facility <ArrowUpRight className="w-3.5 h-3.5 text-industrial-500" />
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors flex items-center gap-1">
                  RFQs & Enquiries <ArrowUpRight className="w-3.5 h-3.5 text-industrial-500" />
                </Link>
              </li>
              <li>
                <Link href="/admin/login" className="hover:text-white transition-colors flex items-center gap-1">
                  Client / Admin Login <ArrowUpRight className="w-3.5 h-3.5 text-industrial-500" />
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white text-sm font-semibold uppercase tracking-wider mb-4 border-l-2 border-accent pl-2">
              Core Segments
            </h4>
            <ul className="space-y-2 text-sm text-industrial-400">
              <li>High-Tensile Fasteners</li>
              <li>Precision CNC Machined Parts</li>
              <li>Heavy Industrial Fabrication</li>
              <li>Structural Mounting Brackets</li>
              <li>Custom OEM Sub-assemblies</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-white text-sm font-semibold uppercase tracking-wider mb-4 border-l-2 border-accent pl-2">
              Factory & Sales Office
            </h4>
            <div className="flex items-start gap-3 text-sm">
              <MapPin className="w-5 h-5 text-accent shrink-0 mt-0.5" />
              <span>{company.address}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Phone className="w-4 h-4 text-accent shrink-0" />
              <span>{company.phone}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Mail className="w-4 h-4 text-accent shrink-0" />
              <span>{company.email}</span>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-industrial-800/80 text-xs flex flex-col md:flex-row justify-between items-center gap-4 text-industrial-500">
          <p>© {new Date().getFullYear()} {company.companyName}. All industrial rights reserved.</p>
          <p className="tracking-wide">Engineered for Indian and International OEM Specifications.</p>
        </div>
      </div>
    </footer>
  );
}