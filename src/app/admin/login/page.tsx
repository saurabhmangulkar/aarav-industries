'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Mail, ShieldAlert } from 'lucide-react';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Invalid credentials');
      }

      router.push('/admin/dashboard');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Authentication error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-industrial-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="w-12 h-12 bg-accent text-industrial-950 font-black flex items-center justify-center mx-auto text-xl">
          AI
        </div>
        <h2 className="mt-4 text-2xl font-extrabold text-white tracking-tight">
          Aarav Industries Admin Portal
        </h2>
        <p className="mt-1 text-xs text-industrial-400">
          Authorize credentials to manage website catalogue & enquiries
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow sm:px-10 border border-industrial-800">
          <form className="space-y-5" onSubmit={handleLogin}>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-3 flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-industrial-700 mb-1">
                Admin Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@aaravindustries.com"
                  className="w-full pl-10 pr-3 py-2 border border-industrial-300 text-sm focus:outline-none focus:border-industrial-900"
                />
                <Mail className="w-4 h-4 text-industrial-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-industrial-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-3 py-2 border border-industrial-300 text-sm focus:outline-none focus:border-industrial-900"
                />
                <Lock className="w-4 h-4 text-industrial-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-industrial-900 hover:bg-industrial-800 text-white font-semibold text-sm uppercase tracking-wider transition-colors"
            >
              {loading ? 'Authenticating...' : 'Sign In to Console'}
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-industrial-100 text-center text-xs text-industrial-500">
            Default credentials: <br />
            <span className="font-mono text-industrial-800">admin@aaravindustries.com</span> / <span className="font-mono text-industrial-800">AdminSecurePassword123!</span>
          </div>
        </div>
      </div>
    </div>
  );
}