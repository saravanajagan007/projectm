'use client';

import React from 'react';

const STEPS = [
  {
    num: '01',
    title: 'Deep Audit & Strategy',
    desc: 'We analyze your competitors, keyword opportunities, current funnel leaks, and customer personas to formulate an unassailable roadmap.',
  },
  {
    num: '02',
    title: 'High-Converting UI/UX',
    desc: 'We prototype modern responsive interfaces with interactive Figma wireframes, optimizing every touchpoint for mobile engagement and micro-conversions.',
  },
  {
    num: '03',
    title: 'Rapid Code & Ad Launch',
    desc: 'We engineer clean, lightweight code with zero server bloat, concurrent with building targeted Google and Meta ad funnels.',
  },
  {
    num: '04',
    title: 'Scale & Optimization',
    desc: 'Post-launch, we monitor analytics, A/B test headlines and call-to-actions, and scale your organic rankings and paid ads to compound monthly ROI.',
  },
];

export function ProcessSection() {
  return (
    <section id="process" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-50 text-xs font-bold text-emerald-800 mb-3">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse-dot shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
            <span>How We Work</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Our Battle-Tested <span className="text-emerald-600">4-Step Delivery Process</span>
          </h2>

          <p className="text-slate-600 text-sm sm:text-base mt-3">
            No endless meetings or generic templates. We follow a fast, disciplined roadmap from ideation to high-converting launch.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((step, idx) => (
            <div
              key={idx}
              className="bg-slate-50/70 rounded-3xl p-7 border border-slate-200/80 hover:bg-white hover:shadow-xl hover:border-emerald-400 hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <span className="text-3xl font-black text-emerald-600/40 group-hover:text-emerald-600 group-hover:scale-105 transition-all block mb-4">
                  {step.num}
                </span>

                <h3 className="text-base font-bold text-slate-900 mb-2">
                  {step.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
