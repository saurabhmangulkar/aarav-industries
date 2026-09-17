import React from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  Package, 
  Layers, 
  MessageSquare, 
  Settings, 
  LogOut, 
  ExternalLink 
} from 'lucide-react';
import { getAdminSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAdminSession();
  if (!session) {
    redirect('/admin/login');
  }

  const navItems = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Products', href: '/admin/products', icon: Package },
    { name: 'Categories', href: '/admin/categories', icon: Layers },
    { name: 'Enquiries', href: '/admin/enquiries', icon: MessageSquare },
    { name: 'Site Settings', href: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-industrial-100 flex flex-col md:flex-row font-sans">
      <aside className="w-full md:w-64 bg-industrial-900 text-white flex flex-col justify-between shrink-0">
        <div>
          <div className="p-5 border-b border-industrial-800 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 bg-accent text-industrial-950 font-black text-xs flex items-center justify-center">
                AI
              </div>
              <span className="font-bold text-sm tracking-wide">Aarav Admin</span>
            </div>
            <Link
              href="/"
              target="_blank"
              className="text-industrial-400 hover:text-white p-1"
              title="Open Public Site"
            >
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>

          <nav className="p-4 space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center gap-3 px-3 py-2.5 text-xs font-semibold uppercase tracking-wider text-industrial-300 hover:text-white hover:bg-industrial-800 transition-colors"
                >
                  <Icon className="w-4 h-4 text-accent" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-industrial-800">
          <div className="text-xs text-industrial-400 mb-2 truncate">
            {session.email}
          </div>
          <form action="/api/auth/logout" method="POST">
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-industrial-800 hover:bg-industrial-700 text-white text-xs font-semibold uppercase tracking-wider transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              Sign Out
            </button>
          </form>
        </div>
      </aside>

      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <div className="max-w-6xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
