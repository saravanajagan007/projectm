'use client';

import React from 'react';
import { Star } from 'lucide-react';

const TESTIMONIALS = [
  {
    quote:
      'ProjectM transformed our online presence completely. Our page loading time dropped to 1.1 seconds, and our lead volume surged by 340% within just three months. They are masters of both code and marketing.',
    name: 'David Larson',
    role: 'Managing Director, Apex Capital',
    initials: 'DL',
  },
  {
    quote:
      'Finding an agency that truly understands both high-conversion web development and paid ads is nearly impossible. ProjectM scaled our e-commerce store from $35K to over $180K/month with a 6.2x ROAS.',
    name: 'Sarah Jenkins',
    role: 'Founder & CEO, LuxeLiving',
    initials: 'SM',
  },
  {
    quote:
      'Their architecture made deploying on our infrastructure effortless. Fast, reliable, responsive, and their 24-hour turnaround on project inquiries is real!',
    name: 'Robert Vance',
    role: 'VP of Growth, Medix Health Network',
    initials: 'RV',
  },
];

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-50 text-xs font-bold text-emerald-800 mb-3">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse-dot shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
            <span>Client Endorsements</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            What Our <span className="text-emerald-600">Partners Say</span>
          </h2>

          <p className="text-slate-600 text-sm sm:text-base mt-3">
            Don&apos;t just take our word for it. Here is the tangible impact our web and marketing solutions delivered.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className="bg-slate-50/70 rounded-3xl p-8 border border-slate-200/80 shadow-sm flex flex-col justify-between hover:shadow-xl hover:border-emerald-400 hover:-translate-y-2 transition-all duration-300"
            >
              <div>
                <div className="flex items-center space-x-1 text-amber-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              <div className="flex items-center space-x-3 pt-4 border-t border-slate-200">
                <div className="h-10 w-10 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-xs">
                  {t.initials}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{t.name}</h4>
                  <p className="text-[11px] text-slate-500">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
