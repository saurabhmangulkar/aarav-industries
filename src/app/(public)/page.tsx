import React from 'react';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import ProductCard from '@/components/public/ProductCard';
import { 
  ShieldCheck, 
  Clock, 
  Cpu, 
  Handshake, 
  ArrowRight, 
  CheckCircle2, 
  Layers, 
  Truck, 
  Award, 
  Settings 
} from 'lucide-react';

export const revalidate = 0;

export default async function HomePage() {
  const featuredProducts = await prisma.product.findMany({
    where: { published: true, featured: true },
    include: { category: true },
    take: 4,
    orderBy: { updatedAt: 'desc' },
  });

  const settings = await prisma.siteSettings.findUnique({
    where: { id: 'default' },
  });

  return (
    <div>
      <section className="relative bg-industrial-950 text-white py-24 md:py-36 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-luminosity"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1920&q=80')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-industrial-950 via-industrial-950/90 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-industrial-900 border border-industrial-700 text-xs font-semibold uppercase tracking-widest text-accent mb-6">
              <Award className="w-3.5 h-3.5" />
              Heavy Engineering & Manufacturing
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-white">
              Engineering Quality Into Every Product.
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-industrial-300 font-light leading-relaxed max-w-2xl">
              {settings?.tagline || 'Quality Manufacturing. Reliable Solutions.'} We deliver reliable manufacturing solutions with a focus on quality, consistency, and long-term partnerships.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/products"
                className="px-6 py-3.5 bg-accent hover:bg-accent-hover text-industrial-950 font-bold text-sm uppercase tracking-wider transition-colors inline-flex items-center gap-2 shadow-sm"
              >
                Explore Products
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="px-6 py-3.5 bg-industrial-900 hover:bg-industrial-800 border border-industrial-700 text-white font-semibold text-sm uppercase tracking-wider transition-colors"
              >
                Talk to Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white border-b border-industrial-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-accent">
                Capabilities & Heritage
              </span>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-industrial-900 sm:text-4xl">
                Built on Quality. Driven by Reliability.
              </h2>
              <p className="mt-5 text-industrial-600 leading-relaxed text-base">
                Aarav Industries operates a production footprint engineered for zero-defect machining, industrial stamping, and high-tensile fastener fabrication. From raw billet alloy inspection to multi-stage surface treatments, our facilities adhere to uncompromising international standards.
              </p>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                  <div>
                    <h4 className="font-semibold text-industrial-900 text-sm">Quality-Focused Production</h4>
                    <p className="text-xs text-industrial-500 mt-0.5">Rigorous dimensional testing and metallurgy certificates.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                  <div>
                    <h4 className="font-semibold text-industrial-900 text-sm">Modern CNC Machining</h4>
                    <p className="text-xs text-industrial-500 mt-0.5">Automated multi-axis turning and laser profiling.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                  <div>
                    <h4 className="font-semibold text-industrial-900 text-sm">Reliable Supply Timelines</h4>
                    <p className="text-xs text-industrial-500 mt-0.5">Streamlined supply chains for scheduled industrial orders.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                  <div>
                    <h4 className="font-semibold text-industrial-900 text-sm">Customer-Focused Service</h4>
                    <p className="text-xs text-industrial-500 mt-0.5">Dedicated engineering support for customized tooling.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/3] bg-industrial-200 border border-industrial-300 overflow-hidden shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80"
                  alt="Industrial Machine Shop"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-industrial-900 text-white p-6 hidden sm:block border-l-4 border-accent max-w-xs shadow-xl">
                <p className="text-xs font-mono uppercase tracking-widest text-industrial-400">MIDC Facility</p>
                <p className="text-base font-bold mt-1">High-Precision Production Plant in Nagpur</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-industrial-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-accent">
                Standard & Custom Components
              </span>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-industrial-900 sm:text-4xl">
                Featured Industrial Products
              </h2>
            </div>
            <Link
              href="/products"
              className="mt-4 md:mt-0 inline-flex items-center text-sm font-semibold text-industrial-900 hover:text-accent transition-colors"
            >
              View Complete Catalogue <ArrowRight className="w-4 h-4 ml-1.5" />
            </Link>
          </div>

          {featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white border border-industrial-200 p-6">
              <p className="text-industrial-600">No featured products currently published.</p>
            </div>
          )}
        </div>
      </section>

      <section className="py-20 bg-white border-b border-industrial-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-accent">Reliability In Action</span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-industrial-900 sm:text-4xl">
              Why Industrial Leaders Choose Aarav
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="p-6 bg-industrial-50 border border-industrial-200">
              <div className="w-12 h-12 bg-industrial-900 text-accent flex items-center justify-center mb-5">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-industrial-900">Quality First</h3>
              <p className="mt-2 text-sm text-industrial-600 leading-relaxed">
                Consistent quality guaranteed across every production batch with standardized alloy testing.
              </p>
            </div>

            <div className="p-6 bg-industrial-50 border border-industrial-200">
              <div className="w-12 h-12 bg-industrial-900 text-accent flex items-center justify-center mb-5">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-industrial-900">Reliable Delivery</h3>
              <p className="mt-2 text-sm text-industrial-600 leading-relaxed">
                Focused on dependable timelines to ensure our clients' manufacturing assembly lines never stall.
              </p>
            </div>

            <div className="p-6 bg-industrial-50 border border-industrial-200">
              <div className="w-12 h-12 bg-industrial-900 text-accent flex items-center justify-center mb-5">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-industrial-900">Modern Processes</h3>
              <p className="mt-2 text-sm text-industrial-600 leading-relaxed">
                Controlled manufacturing procedures with CAD/CAM drafting and multi-station quality gates.
              </p>
            </div>

            <div className="p-6 bg-industrial-50 border border-industrial-200">
              <div className="w-12 h-12 bg-industrial-900 text-accent flex items-center justify-center mb-5">
                <Handshake className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-industrial-900">Long-Term Partnerships</h3>
              <p className="mt-2 text-sm text-industrial-600 leading-relaxed">
                Building durable supplier-vendor contracts that span continuous production cycles and growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-industrial-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-accent">Target Sectors</span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Industries We Serve
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { name: 'Automotive', icon: Truck },
              { name: 'Construction', icon: Layers },
              { name: 'Engineering', icon: Settings },
              { name: 'Electrical', icon: Cpu },
              { name: 'Infrastructure', icon: Award },
              { name: 'Manufacturing', icon: ShieldCheck },
            ].map((ind) => {
              const Icon = ind.icon;
              return (
                <div
                  key={ind.name}
                  className="bg-industrial-950/80 border border-industrial-800 p-6 text-center hover:border-accent transition-colors"
                >
                  <Icon className="w-8 h-8 mx-auto text-accent mb-3" />
                  <span className="text-sm font-semibold tracking-wide block">{ind.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}