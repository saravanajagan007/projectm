'use client';

import React from 'react';

const PARTNERS = [
  {
    name: 'Google Premier Partner',
    desc: 'Top 3% Agency Tier',
    icon: (
      <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-6h2v6zm0-8h-2V7h2v2zm4 8h-2v-4h2v4zm0-6h-2v-2h2v2z" />
      </svg>
    ),
  },
  {
    name: 'Meta Ads Certified',
    desc: 'Official Marketing Partner',
    icon: (
      <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
        <path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96A10 10 0 0 0 22 12.06C22 6.53 17.5 2.04 12 2.04Z" />
      </svg>
    ),
  },
  {
    name: 'Stripe Payments',
    desc: 'Certified Architecture',
    icon: (
      <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
        <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252 1.054 16.126.5 13.722.5 8.163.5 4.3 3.42 4.3 8.358c0 5.485 5.567 6.195 8.219 7.18 2.08.775 2.87 1.48 2.87 2.476 0 1.02-.916 1.547-2.316 1.547-2.394 0-5.32-.977-7.25-1.99l-.92 5.61C6.72 23.95 9.38 24.5 12.18 24.5c5.78 0 9.82-2.73 9.82-8.08 0-4.66-3.69-6.46-8.024-7.27z" />
      </svg>
    ),
  },
  {
    name: 'Shopify Plus Partners',
    desc: 'High-Volume Commerce',
    icon: (
      <svg className="h-5 w-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    name: 'Vercel Edge Cloud',
    desc: 'Fast Web Infrastructure',
    icon: (
      <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
        <path d="M12 0L24 24H0L12 0z" />
      </svg>
    ),
  },
  {
    name: 'HubSpot Inbound',
    desc: 'Lead Flow Automation',
    icon: (
      <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
        <path d="M18.5 2H5.5C3.57 2 2 3.57 2 5.5v13C2 20.43 3.57 22 5.5 22h13c1.93 0 3.5-1.57 3.5-3.5v-13C22 3.57 20.43 2 18.5 2z" />
      </svg>
    ),
  },
];

export function PartnersMarquee() {
  return (
    <section className="py-10 border-y border-slate-100 bg-slate-50/70 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <p className="text-center text-xs font-bold uppercase tracking-widest text-slate-400">
          Trusted by High-Growth Startups & Enterprise Brands Worldwide
        </p>
      </div>

      {/* Infinite Scrolling Marquee Container with edge fades */}
      <div className="relative w-full overflow-hidden mask-marquee py-2">
        <div className="animate-marquee flex items-center space-x-8 hover:[animation-play-state:paused] cursor-pointer">
          {/* First loop */}
          {PARTNERS.map((partner, idx) => (
            <div
              key={`p1-${idx}`}
              className="flex items-center space-x-3.5 px-6 py-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:border-emerald-400 hover:shadow-md transition-all flex-shrink-0 group"
            >
              <div className="h-9 w-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                {partner.icon}
              </div>
              <div className="text-left">
                <span className="text-sm font-bold text-slate-800 block leading-tight">
                  {partner.name}
                </span>
                <span className="text-[11px] text-slate-400 font-medium">
                  {partner.desc}
                </span>
              </div>
            </div>
          ))}

          {/* Duplicate set for seamless continuous looping */}
          {PARTNERS.map((partner, idx) => (
            <div
              key={`p2-${idx}`}
              className="flex items-center space-x-3.5 px-6 py-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:border-emerald-400 hover:shadow-md transition-all flex-shrink-0 group"
            >
              <div className="h-9 w-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                {partner.icon}
              </div>
              <div className="text-left">
                <span className="text-sm font-bold text-slate-800 block leading-tight">
                  {partner.name}
                </span>
                <span className="text-[11px] text-slate-400 font-medium">
                  {partner.desc}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
