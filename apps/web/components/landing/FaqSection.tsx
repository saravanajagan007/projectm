'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQS = [
  {
    q: 'Can this website be hosted on standard shared webhosting (cPanel / Apache / LiteSpeed)?',
    a: 'Yes, absolutely! The application can be built and deployed cleanly or exported as static assets, or containerized via Docker/Node for enterprise hosting. You have full flexibility without vendor lock-in.',
  },
  {
    q: 'How long does a typical custom website design and build take?',
    a: 'Most custom landing pages and sales funnels are completed within 7 to 10 days. Comprehensive corporate websites or e-commerce stores typically launch in 2 to 4 weeks. Because we write clean, unbloated code rather than relying on clunky site-builders, our development speed and code quality are unmatched.',
  },
  {
    q: 'Do you handle both web development and ongoing digital marketing?',
    a: 'Yes. That is our core superpower. Having separate design, engineering, and marketing teams often causes silos and broken analytics. At ProjectM, your website is engineered from day one around technical SEO, high conversion rates, and paid ad tracking pixels.',
  },
  {
    q: 'Do I own the full source code and intellectual property?',
    a: '100% yes. Upon project completion, all source code, graphic assets, ad account access, and intellectual property belong entirely to you with zero vendor lock-in or recurring proprietary licensing fees.',
  },
  {
    q: 'How do you protect forms and endpoints from spam and abuse?',
    a: 'Our forms implement invisible honeypot traps to intercept automated bots silently, coupled with server-side rate limiting and NestJS throttlers to prevent spam bursts without subjecting human visitors to annoying puzzles.',
  },
];

export function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx((prev) => (prev === idx ? null : idx));
  };

  return (
    <section id="faq" className="py-24 bg-slate-50/70 relative border-t border-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-50 text-xs font-bold text-emerald-800 mb-3">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse-dot shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
            <span>Answers You Need</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Frequently Asked <span className="text-emerald-600">Questions</span>
          </h2>

          <p className="text-slate-600 text-sm sm:text-base mt-3">
            Clear, transparent answers about our technology stack, hosting requirements, and timelines.
          </p>
        </div>

        <div className="space-y-3.5">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden transition-all duration-200 hover:border-emerald-300"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between text-slate-900 hover:text-emerald-700 transition-colors cursor-pointer"
                >
                  <span className="font-bold text-sm sm:text-base pr-4">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 text-slate-400 flex-shrink-0 transition-transform duration-300 ease-out ${
                      isOpen ? 'rotate-180 text-emerald-600' : ''
                    }`}
                  />
                </button>

                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-50">
                      {faq.a}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
