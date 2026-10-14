'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldAlert, ArrowLeft } from 'lucide-react';

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 text-center border border-slate-100">
        <div className="mx-auto h-16 w-16 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mb-4">
          <ShieldAlert className="h-8 w-8" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Access Denied</h1>
        <p className="text-sm text-slate-600 mb-6 leading-relaxed">
          Your current account role does not have administrative permissions to view or manage
          this section.
        </p>
        <Link
          href="/dashboard"
          className="inline-flex items-center px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/20 transition-all"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          <span>Return to Company Directory</span>
        </Link>
      </div>
    </div>
  );
}
