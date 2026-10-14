'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '../lib/auth-context';
import { LogOut, ShieldCheck, UserCheck } from 'lucide-react';

export function Navbar() {
  const { user, isAdmin, logout } = useAuth();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left: Brand Logo without 'Enterprise Portal' */}
          <Link href="/admin/manage-companies" className="flex items-center space-x-3 group">
            <svg
              className="h-9 w-9 transition-transform group-hover:scale-105"
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="64" height="64" rx="16" fill="#ecfdf5" stroke="#10b981" strokeWidth="2" />
              <path
                d="M18 46 L18 18 L28 18 C35 18 39 22 39 27 C39 32 35 36 28 36 L24 36 L24 46 Z M24 24 L24 30 L28 30 C31 30 33 29 33 27 C33 25 31 24 28 24 Z"
                fill="url(#adminNavLogoGrad)"
              />
              <polygon points="36,46 44,20 48,20 40,46" fill="#059669" />
              <circle cx="48" cy="44" r="3.5" fill="#10b981" />
              <defs>
                <linearGradient id="adminNavLogoGrad" x1="0" y1="0" x2="64" y2="64">
                  <stop stopColor="#10b981" />
                  <stop offset="1" stopColor="#047857" />
                </linearGradient>
              </defs>
            </svg>
            <span className="font-extrabold text-xl tracking-tight text-slate-900 group-hover:text-emerald-600 transition-colors">
              ProjectM
            </span>
          </Link>

          {/* Right: User Profile & Logout (No buttons in header) */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="flex flex-col text-right">
                <span className="text-xs font-bold text-slate-900 truncate max-w-[180px]">
                  {user?.email || 'User'}
                </span>
                <div className="flex items-center justify-end space-x-1 mt-0.5">
                  {isAdmin ? (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                      <ShieldCheck className="h-3 w-3 mr-1 text-emerald-700" />
                      ADMIN
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-300">
                      <UserCheck className="h-3 w-3 mr-1 text-slate-600" />
                      ADD_COMPANY
                    </span>
                  )}
                </div>
              </div>

              <button
                onClick={() => logout()}
                title="Sign Out"
                className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all cursor-pointer"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
