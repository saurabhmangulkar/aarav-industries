import React from 'react';
import { prisma } from '@/lib/prisma';
import { CheckCircle } from 'lucide-react';

export const revalidate = 0;

export default async function AboutPage() {
  const settings = await prisma.siteSettings.findUnique({
    where: { id: 'default' },
  });

  return (
    <div className="bg-white">
      <section className="bg-industrial-950 text-white py-20 border-b border-industrial-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-bold uppercase tracking-widest text-accent">Industrial Excellence</span>
          <h1 className="text-4xl font-black mt-2">About Aarav Industries</h1>
          <p className="mt-4 text-industrial-300 max-w-2xl text-base leading-relaxed">
            Leading manufacturer of high-tolerance fasteners, machined engineering parts, and structural assemblies for critical industrial applications.
          </p>
        </div>
      </section>

      <div className="border-b border-industrial-200 bg-industrial-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl font-black text-industrial-900">10+</p>
              <p className="text-xs uppercase tracking-wider text-industrial-500 font-semibold mt-1">Years Experience</p>
            </div>
            <div>
              <p className="text-4xl font-black text-industrial-900">50+</p>
              <p className="text-xs uppercase tracking-wider text-industrial-500 font-semibold mt-1">Industrial Products</p>
            </div>
            <div>
              <p className="text-4xl font-black text-industrial-900">25+</p>
              <p className="text-xs uppercase tracking-wider text-industrial-500 font-semibold mt-1">Industrial Clients</p>
            </div>
            <div>
              <p className="text-4xl font-black text-industrial-900">5+</p>
              <p className="text-xs uppercase tracking-wider text-industrial-500 font-semibold mt-1">States Served</p>
            </div>
          </div>
        </div>
      </div>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-4 text-industrial-700 leading-relaxed text-sm">
              <span className="text-xs font-bold uppercase tracking-widest text-accent">Our Journey</span>
              <h2 className="text-3xl font-bold text-industrial-900">
                Precision Rooted in Heavy Manufacturing
              </h2>
              <p>
                {settings?.aboutSummary ||
                  'Founded to fulfill the rigorous demands of infrastructure and manufacturing sectors, Aarav Industries has expanded into a full-scale precision manufacturing facility based in Nagpur, Maharashtra.'}
              </p>
              <p>
                We blend traditional metallurgy discipline with modern CNC machining lines and computerized quality assurance. Every order undergoes dimensional inspection, hardness testing, and thread inspection before delivery.
              </p>
              <div className="pt-4 border-t border-industrial-100 space-y-2">
                <div className="flex items-center gap-2 text-industrial-900 font-medium">
                  <CheckCircle className="w-4 h-4 text-accent" />
                  <span>Mission: Deliver dependable, zero-defect mechanical solutions that empower heavy industries.</span>
                </div>
                <div className="flex items-center gap-2 text-industrial-900 font-medium">
                  <CheckCircle className="w-4 h-4 text-accent" />
                  <span>Vision: Become the most reliable tier-1 manufacturing partner across India.</span>
                </div>
              </div>
            </div>

            <div className="aspect-[4/3] bg-industrial-200 border border-industrial-300 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?auto=format&fit=crop&w=1200&q=80"
                alt="Factory Floor"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}