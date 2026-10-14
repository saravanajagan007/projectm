'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Shield } from 'lucide-react';

export function LandingFooter() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-400 text-xs py-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <svg className="h-9 w-9" viewBox="0 0 64 64" fill="none">
                <rect width="64" height="64" rx="16" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                <path
                  d="M18 46 L18 18 L28 18 C35 18 39 22 39 27 C39 32 35 36 28 36 L24 36 L24 46 Z M24 24 L24 30 L28 30 C31 30 33 29 33 27 C33 25 31 24 28 24 Z"
                  fill="#10b981"
                />
                <polygon points="36,46 44,20 48,20 40,46" fill="#34d399" />
                <circle cx="48" cy="44" r="3.5" fill="#10b981" />
              </svg>
              <span className="font-extrabold text-xl tracking-tight text-white">
                Project<span className="text-emerald-500">M</span>
              </span>
            </Link>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Full-service digital agency building ultra-fast custom websites and executing high-converting digital marketing campaigns that scale bottom-line revenue.
            </p>

            <div className="pt-2">
              <Link
                href="/admin"
                className="inline-flex items-center space-x-1.5 text-slate-500 hover:text-emerald-400 transition-colors"
              >
                <Shield className="h-3.5 w-3.5" />
                <span>Admin Portal</span>
              </Link>
            </div>
          </div>

          {/* Services Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Services
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#services" className="hover:text-emerald-400 transition-colors">
                  Custom Web & SaaS Development
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-emerald-400 transition-colors">
                  Conversion-Focused UI/UX Design
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-emerald-400 transition-colors">
                  Technical & Content SEO
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-emerald-400 transition-colors">
                  Google & Meta Paid Advertising
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-emerald-400 transition-colors">
                  High-Speed E-Commerce Systems
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#hero" className="hover:text-emerald-400 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-emerald-400 transition-colors">
                  About ProjectM
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-emerald-400 transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#process" className="hover:text-emerald-400 transition-colors">
                  4-Step Process
                </a>
              </li>
              <li>
                <a href="#testimonials" className="hover:text-emerald-400 transition-colors">
                  Reviews
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-emerald-400 transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Growth Insights
            </h4>
            <p className="text-slate-400 text-xs">
              Receive our monthly breakdown of high-ROI marketing strategies and web speed benchmarks.
            </p>

            {subscribed ? (
              <div className="p-2.5 rounded-xl bg-emerald-950/80 text-emerald-400 border border-emerald-800 text-xs">
                ✓ Thank you for subscribing!
              </div>
            ) : (
              <form onSubmit={handleNewsletter} className="flex space-x-2">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter business email"
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer"
                >
                  Join
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-4">
          <div>© {new Date().getFullYear()} ProjectM Agency. All rights reserved.</div>
          <div className="flex items-center space-x-4">
            <a href="#hero" className="hover:text-emerald-400 transition-colors">
              Privacy Policy
            </a>
            <span>•</span>
            <a href="#hero" className="hover:text-emerald-400 transition-colors">
              Terms of Service
            </a>
            <span>•</span>
            <a href="#hero" className="hover:text-emerald-400 transition-colors">
              Security
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
