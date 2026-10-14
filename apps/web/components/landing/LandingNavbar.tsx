'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ArrowRight, Shield } from 'lucide-react';

export function LandingNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100 py-3'
          : 'bg-white/80 backdrop-blur-sm py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2.5 group">
            <svg
              className="h-10 w-10 transition-transform group-hover:scale-105"
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="64" height="64" rx="16" fill="#ecfdf5" stroke="#10b981" strokeWidth="2" />
              <path
                d="M18 46 L18 18 L28 18 C35 18 39 22 39 27 C39 32 35 36 28 36 L24 36 L24 46 Z M24 24 L24 30 L28 30 C31 30 33 29 33 27 C33 25 31 24 28 24 Z"
                fill="url(#navLogoGrad)"
              />
              <polygon points="36,46 44,20 48,20 40,46" fill="#059669" />
              <circle cx="48" cy="44" r="3.5" fill="#10b981" />
              <defs>
                <linearGradient id="navLogoGrad" x1="0" y1="0" x2="64" y2="64">
                  <stop stopColor="#10b981" />
                  <stop offset="1" stopColor="#047857" />
                </linearGradient>
              </defs>
            </svg>
            <span className="font-extrabold text-xl tracking-tight text-slate-900">
              Project<span className="text-emerald-600">M</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="#hero"
              className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors"
            >
              Home
            </a>
            <a
              href="#about"
              className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors"
            >
              About
            </a>
            <a
              href="#services"
              className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors"
            >
              Services
            </a>
            <a
              href="#process"
              className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors"
            >
              Process
            </a>
            <a
              href="#testimonials"
              className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors"
            >
              Reviews
            </a>
            <a
              href="#faq"
              className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors"
            >
              FAQ
            </a>
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center space-x-3">
            <Link
              href="/admin"
              className="inline-flex items-center px-3 py-2 text-xs font-semibold text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-xl transition-all"
            >
              <Shield className="h-3.5 w-3.5 mr-1 text-emerald-600" />
              <span>Admin</span>
            </Link>

            <a
              href="#contact"
              className="inline-flex items-center px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 shadow-md shadow-emerald-600/20 hover:shadow-lg transition-all"
            >
              <span>Get Free Proposal</span>
              <ArrowRight className="h-4 w-4 ml-1.5" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-2">
          <div className="flex flex-col space-y-2">
            <a
              href="#hero"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-700"
            >
              Home
            </a>
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-700"
            >
              About
            </a>
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-700"
            >
              Services
            </a>
            <a
              href="#process"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-700"
            >
              Process
            </a>
            <a
              href="#testimonials"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-700"
            >
              Reviews
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-700"
            >
              FAQ
            </a>
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-sm font-medium text-emerald-700 bg-emerald-50 flex items-center"
            >
              <Shield className="h-4 w-4 mr-1.5" />
              <span>Admin Portal Login</span>
            </Link>
          </div>

          <div className="pt-2 border-t border-slate-100 flex flex-col space-y-2">
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-xl text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 shadow-md shadow-emerald-600/20"
            >
              Get Free Proposal
            </a>
            <a
              href="https://wa.me/918807649359?text=Hello%20ProjectM%20Agency,%20I%20would%20like%20to%20inquire%20about%20a%20new%20website%20and%20marketing%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center py-2 rounded-xl text-xs font-semibold text-emerald-700 border border-emerald-300 hover:bg-emerald-50"
            >
              Chat on WhatsApp (+91 88076 49359)
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
