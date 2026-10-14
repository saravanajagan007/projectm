'use client';

import React from 'react';
import { ModalProvider } from '../../lib/modal-context';
import { Navbar } from '../../components/Navbar';
import { useAuth } from '../../lib/auth-context';
import { Loader2 } from 'lucide-react';

function DashboardLayoutContent({ children }: { children: React.ReactNode }) {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center space-y-3">
          <Loader2 className="h-8 w-8 text-emerald-600 animate-spin" />
          <p className="text-sm font-semibold text-slate-500">Loading secure workspace...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/60 flex flex-col font-sans">
      <Navbar />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <ModalProvider>
      <DashboardLayoutContent>{children}</DashboardLayoutContent>
    </ModalProvider>
  );
}
