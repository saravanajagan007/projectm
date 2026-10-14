'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Building2, Mail, Lock, Loader2, AlertCircle, Shield, UserCheck, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { loginSchema, LoginInput } from '@projectm/shared';
import { useAuth } from '../../lib/auth-context';

export default function AdminLoginPage() {
  const { user, login, loading: authLoading, isAdmin } = useAuth();
  const router = useRouter();

  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If already logged in, redirect to manage companies page
  useEffect(() => {
    if (!authLoading && user) {
      router.replace('/admin/manage-companies');
    }
  }, [authLoading, user, router]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginInput) => {
    setIsSubmitting(true);
    setErrorMsg(null);
    try {
      await login(data.email, data.password);
      // login() handles router navigation in auth-context or effect
    } catch (err: any) {
      setErrorMsg(err.message || 'Invalid administrator credentials. Access denied.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const fillCredentials = (email: string, pass: string) => {
    setValue('email', email, { shouldValidate: true });
    setValue('password', pass, { shouldValidate: true });
    setErrorMsg(null);
  };

  if (authLoading || user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
        <div className="flex flex-col items-center space-y-3">
          <Loader2 className="h-8 w-8 text-emerald-500 animate-spin" />
          <p className="text-sm text-slate-400">Verifying administrator session...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 text-slate-100 relative">
      {/* Return to Public Website Link */}
      <div className="absolute top-6 left-6 z-10">
        <Link
          href="/"
          className="inline-flex items-center text-xs font-semibold text-slate-400 hover:text-white transition-colors px-3 py-2 rounded-xl bg-slate-800/60 border border-slate-700/60"
        >
          <ArrowLeft className="h-3.5 w-3.5 mr-1.5" />
          <span>Back to Main Website</span>
        </Link>
      </div>

      <div className="max-w-md w-full bg-slate-900/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-800 p-8 sm:p-10 relative">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="mx-auto h-14 w-14 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/25 mb-4">
            <Shield className="h-7 w-7" />
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Admin Portal Login
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Restricted access for Company Administrators & Operators
          </p>
        </div>

        {/* Global Error Banner */}
        {errorMsg && (
          <div className="mb-6 p-4 bg-red-950/80 border border-red-800 rounded-2xl flex items-start space-x-3 text-xs text-red-300 animate-in fade-in">
            <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">Authentication Failed</p>
              <p className="text-red-400 mt-0.5">{errorMsg}</p>
            </div>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
              Email Address
            </label>
            <div className="relative rounded-xl shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                <Mail className="h-4 w-4" />
              </div>
              <input
                type="email"
                {...register('email')}
                placeholder="admin@projectm.com"
                className={`block w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border bg-slate-800/80 text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-all ${
                  errors.email
                    ? 'border-red-500 focus:ring-red-400'
                    : 'border-slate-700 focus:ring-emerald-500 focus:border-emerald-500'
                }`}
              />
            </div>
            {errors.email && (
              <p className="mt-1.5 text-xs text-red-400 font-medium">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
              Password
            </label>
            <div className="relative rounded-xl shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                <Lock className="h-4 w-4" />
              </div>
              <input
                type="password"
                {...register('password')}
                placeholder="••••••••••••"
                className={`block w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border bg-slate-800/80 text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-all ${
                  errors.password
                    ? 'border-red-500 focus:ring-red-400'
                    : 'border-slate-700 focus:ring-emerald-500 focus:border-emerald-500'
                }`}
              />
            </div>
            {errors.password && (
              <p className="mt-1.5 text-xs text-red-400 font-medium">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 px-4 rounded-xl text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 shadow-lg shadow-emerald-600/30 disabled:opacity-50 transition-all flex items-center justify-center cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin h-4 w-4 mr-2" />
                <span>Authenticating...</span>
              </>
            ) : (
              <span>Sign In to Admin Portal</span>
            )}
          </button>
        </form>

        {/* Quick Testing Demo Accounts */}
        <div className="mt-8 pt-6 border-t border-slate-800">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider text-center mb-3">
            Quick Fill Demo Accounts
          </p>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => fillCredentials('admin@projectm.com', 'Password123!')}
              className="p-2.5 rounded-xl border border-purple-900/60 bg-purple-950/30 hover:bg-purple-900/40 text-left transition-colors cursor-pointer group"
            >
              <div className="flex items-center space-x-1.5 mb-1 text-purple-400 font-bold text-xs">
                <Shield className="h-3 w-3" />
                <span>ADMIN</span>
              </div>
              <p className="text-[10px] text-slate-300 font-mono truncate">admin@projectm.com</p>
              <p className="text-[9px] text-slate-500">Password123!</p>
            </button>

            <button
              type="button"
              onClick={() => fillCredentials('operator@projectm.com', 'Password123!')}
              className="p-2.5 rounded-xl border border-emerald-900/60 bg-emerald-950/30 hover:bg-emerald-900/40 text-left transition-colors cursor-pointer group"
            >
              <div className="flex items-center space-x-1.5 mb-1 text-emerald-400 font-bold text-xs">
                <UserCheck className="h-3 w-3" />
                <span>ADD_COMPANY</span>
              </div>
              <p className="text-[10px] text-slate-300 font-mono truncate">operator@projectm.com</p>
              <p className="text-[9px] text-slate-500">Password123!</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
