'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      router.push('/admin/dashboard');
    } else {
      setError('Wrong password. Try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="glass rounded-2xl p-10 w-full max-w-sm orange-border shadow-2xl">
        <div className="text-center mb-8">
          <div className="w-14 h-14 glass-orange rounded-2xl flex items-center justify-center mx-auto mb-4">
            <i className="fas fa-lock text-orange-400 text-2xl" />
          </div>
          <h1 className="text-2xl font-black text-white">Admin Panel</h1>
          <p className="text-gray-500 text-sm mt-1">Enter password to continue</p>
        </div>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-xs text-gray-500 uppercase tracking-widest mb-1.5">
              Password
            </label>
            <input
              suppressHydrationWarning
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="glass-input"
              placeholder="••••••••"
              required
              autoFocus
            />
          </div>
          {error && (
            <p className="text-red-400 text-sm flex items-center gap-2">
              <i className="fas fa-exclamation-circle" /> {error}
            </p>
          )}
          <button
            suppressHydrationWarning
            type="submit"
            disabled={loading}
            className="btn-primary w-full justify-center"
          >
            {loading ? (
              <><i className="fas fa-spinner fa-spin" /> Checking...</>
            ) : (
              <><i className="fas fa-sign-in-alt" /> Enter Admin</>
            )}
          </button>
        </form>
        <p className="text-center mt-6">
          <a href="/" className="text-gray-600 hover:text-orange-400 text-xs transition-colors">
            ← Back to portfolio
          </a>
        </p>
      </div>
    </div>
  );
}

