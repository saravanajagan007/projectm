'use client';

import React from 'react';
import { Zap, TrendingUp, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';

export function AboutSection() {
  return (
    <section id="about" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-50 text-xs font-bold text-emerald-800">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse-dot shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
              <span>About ProjectM</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              An Agile Digital Agency Built for{' '}
              <span className="text-emerald-600">Measurable Growth</span>
            </h2>

            <p className="text-base text-slate-600 leading-relaxed">
              We bridge the gap between creative web craftsmanship and performance digital marketing.
              Founded on the belief that modern businesses need fast, reliable web technology and transparent
              marketing campaigns, ProjectM helps brands establish a dominant digital footprint without bloated
              overhead or sluggish development cycles.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start space-x-4 p-4 rounded-2xl bg-slate-50/70 border border-slate-100">
                <div className="h-10 w-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Zap className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Zero-Bloat Engineering</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-normal">
                    Lightweight, high-performance code with instantaneous load times and 100/100 Core Web Vitals across every device.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 rounded-2xl bg-slate-50/70 border border-slate-100">
                <div className="h-10 w-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Data-Driven Acquisition</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-normal">
                    Targeted SEO and PPC ad structures designed around lowering your customer acquisition cost (CPA) and maximizing ROAS.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 rounded-2xl bg-slate-50/70 border border-slate-100">
                <div className="h-10 w-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Direct Accountability</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-normal">
                    No layers of junior middlemen. You collaborate directly with senior web architects and marketing specialists.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Highlights Card */}
          <div className="lg:col-span-5">
            <div className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden border border-slate-800">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 mb-4">
                Our Commitment
              </span>

              <h3 className="text-xl font-bold tracking-tight mb-2">
                Craftsmanship, Speed & Client Retention
              </h3>
              <p className="text-xs text-slate-400 mb-6 leading-relaxed">
                Every project we ship is backed by continuous communication, rapid delivery, and complete source code ownership.
              </p>

              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-slate-800/80 rounded-2xl p-4 border border-slate-700/60">
                  <div className="text-2xl font-black text-white">500+</div>
                  <div className="text-[11px] text-slate-400 mt-1">Web Projects Shipped</div>
                </div>

                <div className="bg-slate-800/80 rounded-2xl p-4 border border-slate-700/60">
                  <div className="text-2xl font-black text-emerald-400">98.9%</div>
                  <div className="text-[11px] text-slate-400 mt-1">Client Retention</div>
                </div>

                <div className="bg-slate-800/80 rounded-2xl p-4 border border-slate-700/60">
                  <div className="text-2xl font-black text-white">24h</div>
                  <div className="text-[11px] text-slate-400 mt-1">Response Guarantee</div>
                </div>

                <div className="bg-slate-800/80 rounded-2xl p-4 border border-slate-700/60">
                  <div className="text-2xl font-black text-emerald-400">100%</div>
                  <div className="text-[11px] text-slate-400 mt-1">Code Ownership</div>
                </div>
              </div>

              <a
                href="#contact"
                className="w-full inline-flex items-center justify-center px-5 py-3 rounded-xl text-sm font-bold text-slate-900 bg-white hover:bg-emerald-400 transition-colors cursor-pointer"
              >
                <span>Connect With Our Team</span>
                <ArrowRight className="h-4 w-4 ml-2" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
