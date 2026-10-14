'use client';

import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  Zap,
  TrendingUp,
  DollarSign,
  Compass,
} from 'lucide-react';

const PHRASES = [
  'Modern Websites',
  'Digital Marketing',
  'Targeted SEO',
  'Paid Ads & PPC',
  'Custom Web Apps',
];

export function HeroSection() {
  const [currentText, setCurrentText] = useState(PHRASES[0]);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const currentPhrase = PHRASES[phraseIndex];

    if (!isDeleting && currentText === currentPhrase) {
      // Pause at end of word before backspacing
      timeout = setTimeout(() => setIsDeleting(true), 2200);
    } else if (isDeleting && currentText === '') {
      // Pause before typing next word
      setIsDeleting(false);
      setPhraseIndex((prev) => (prev + 1) % PHRASES.length);
      timeout = setTimeout(() => {}, 350);
    } else {
      const speed = isDeleting ? 40 : 80;
      timeout = setTimeout(() => {
        setCurrentText((prev) =>
          isDeleting
            ? currentPhrase.substring(0, prev.length - 1)
            : currentPhrase.substring(0, prev.length + 1),
        );
      }, speed);
    }

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, phraseIndex]);

  return (
    <section id="hero" className="pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden relative bg-gradient-to-b from-emerald-50/40 via-white to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Acceptance Badge */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-xs font-semibold text-emerald-800 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse-dot shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
              <span>Accepting New Client Projects for 2026</span>
            </div>

            {/* Headline with dynamic typewriter animation */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              Scaling Brands with{' '}
              <span className="text-emerald-600 border-b-4 border-emerald-600 pb-0.5 inline-block min-h-[1.2em]">
                {currentText}
                <span className="inline-block w-[3px] h-[0.85em] bg-emerald-600 ml-1 translate-y-[2px] animate-cursor" />
              </span>
            </h1>

            {/* Subheadline description */}
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              We are <strong className="text-slate-900">ProjectM</strong> — an elite digital
              agency uniting custom web engineering with data-driven marketing campaigns to
              capture leads, accelerate sales, and dominate search results.
            </p>

            {/* Call To Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="#contact"
                className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 rounded-2xl text-base font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-600/25 hover:shadow-xl transition-all cursor-pointer"
              >
                <span>Start Your Project</span>
                <ArrowRight className="h-5 w-5 ml-2" />
              </a>

              <a
                href="#services"
                className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 rounded-2xl text-base font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 shadow-sm transition-all cursor-pointer"
              >
                <span>Explore Services</span>
                <Compass className="h-5 w-5 ml-2 text-slate-500" />
              </a>
            </div>

            {/* Trust Metrics */}
            <div className="pt-8 border-t border-slate-100 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0">
              <div className="text-left">
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  500<span className="text-emerald-600">+</span>
                </div>
                <div className="text-xs text-slate-500 font-medium mt-0.5">Websites Shipped</div>
              </div>

              <div className="text-left">
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  350<span className="text-emerald-600">%</span>
                </div>
                <div className="text-xs text-slate-500 font-medium mt-0.5">Avg. Organic Lift</div>
              </div>

              <div className="text-left">
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  98.9<span className="text-emerald-600">%</span>
                </div>
                <div className="text-xs text-slate-500 font-medium mt-0.5">Client Retention</div>
              </div>
            </div>
          </div>

          {/* Right Visual Mockup Column */}
          <div className="lg:col-span-5 relative">
            {/* Top Floating Badge */}
            <div className="absolute -top-5 -left-4 z-20 bg-white/95 backdrop-blur-md rounded-2xl p-3 border border-emerald-100 shadow-xl flex items-center space-x-3 animate-float">
              <div className="h-10 w-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <Zap className="h-5 w-5" />
              </div>
              <div>
                <strong className="text-xs font-bold text-slate-900 block">100/100 Speed Score</strong>
                <span className="text-[10px] text-slate-500">Core Web Vitals Optimized</span>
              </div>
            </div>

            {/* Main Mockup Card */}
            <div className="relative z-10 bg-white rounded-3xl border border-slate-200/80 shadow-2xl p-6 space-y-5">
              {/* Mockup Header Window Controls */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex space-x-1.5">
                  <span className="h-3 w-3 rounded-full bg-red-400" />
                  <span className="h-3 w-3 rounded-full bg-amber-400" />
                  <span className="h-3 w-3 rounded-full bg-emerald-400" />
                </div>
                <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full flex items-center">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse-dot shadow-[0_0_8px_rgba(16,185,129,0.6)] mr-1.5" />
                  Live Growth Engine Active
                </span>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-50/80 rounded-2xl p-3.5 border border-slate-100">
                  <span className="text-[11px] font-medium text-slate-500 block">Qualified Leads / Mo</span>
                  <div className="text-xl font-bold text-slate-900 mt-1">4,820</div>
                  <div className="flex items-center text-[10px] font-semibold text-emerald-600 mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    <span>+184% vs last Q</span>
                  </div>
                </div>

                <div className="bg-slate-50/80 rounded-2xl p-3.5 border border-slate-100">
                  <span className="text-[11px] font-medium text-slate-500 block">Client ROAS (Ads)</span>
                  <div className="text-xl font-bold text-slate-900 mt-1">4.82x</div>
                  <div className="flex items-center text-[10px] font-semibold text-emerald-600 mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    <span>Avg CPA $14.20</span>
                  </div>
                </div>
              </div>

              {/* Chart SVG graphic */}
              <div className="bg-slate-900 rounded-2xl p-4 text-white">
                <div className="flex justify-between items-center mb-3 text-xs">
                  <span className="font-semibold text-slate-200">Revenue & Traffic Trajectory</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 font-mono">
                    +340% Lift
                  </span>
                </div>
                <svg className="w-full h-24" viewBox="0 0 400 100" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M0,85 Q60,75 110,60 T220,38 T310,22 T400,6 L400,100 L0,100 Z"
                    fill="url(#chartGradient)"
                  />
                  <path
                    d="M0,85 Q60,75 110,60 T220,38 T310,22 T400,6"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                  <circle cx="110" cy="60" r="4.5" fill="#10b981" />
                  <circle cx="220" cy="38" r="4.5" fill="#10b981" />
                  <circle cx="310" cy="22" r="4.5" fill="#10b981" />
                  <circle cx="400" cy="6" r="5.5" fill="#34d399" stroke="#047857" strokeWidth="2" />
                </svg>
              </div>
            </div>

            {/* Bottom Floating Badge */}
            <div className="absolute -bottom-6 -right-4 z-20 bg-white/95 backdrop-blur-md rounded-2xl p-3 border border-emerald-100 shadow-xl flex items-center space-x-3 animate-float-delayed">
              <div className="h-10 w-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <DollarSign className="h-5 w-5" />
              </div>
              <div>
                <strong className="text-xs font-bold text-slate-900 block">$48M+ Client Revenue</strong>
                <span className="text-[10px] text-slate-500">Generated Across All Sectors</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
