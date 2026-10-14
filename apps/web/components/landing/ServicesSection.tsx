'use client';

import React, { useState } from 'react';
import {
  Code,
  Layout,
  Search,
  Target,
  ShoppingCart,
  Check,
} from 'lucide-react';

const SERVICES = [
  {
    id: 'web-dev',
    category: 'web',
    title: 'Custom Web & SaaS Development',
    icon: Code,
    desc: 'Tailored, lightweight, lightning-fast web applications engineered for 99+ PageSpeed scores, extreme security, and seamless API integrations.',
    features: [
      'Zero bloat, fully responsive architecture',
      'Instant load times with clean semantic code',
      'Robust API and database integrations',
    ],
  },
  {
    id: 'ui-ux',
    category: 'web',
    title: 'Conversion-Focused UI/UX Design',
    icon: Layout,
    desc: 'Clean, intuitive storefronts and sales funnels. Every button placement, contrast ratio, and layout hierarchy is engineered to turn visitors into buyers.',
    features: [
      'Mobile-first touch optimization',
      'Interactive Figma prototypes & design tokens',
      'High-converting checkout & lead funnels',
    ],
  },
  {
    id: 'seo',
    category: 'marketing',
    title: 'Technical & Content SEO',
    icon: Search,
    desc: 'Rank at the top of Google for high-intent, buyer-ready search terms with comprehensive audits, Schema.org integration, and content conquesting.',
    features: [
      'Core Web Vitals & technical fixes',
      'High-ranking authority pillar strategy',
      'Local maps and international search visibility',
    ],
  },
  {
    id: 'ppc',
    category: 'marketing',
    title: 'Google & Meta Paid Advertising',
    icon: Target,
    desc: 'Laser-targeted paid ad campaigns on Google Search, YouTube, Meta (Instagram/Facebook), and LinkedIn with aggressive CPA reduction and ROAS tracking.',
    features: [
      'High-converting ad copy & video creative',
      'Multi-tier retargeting funnels',
      'Live ROAS performance analytics dashboard',
    ],
  },
  {
    id: 'ecommerce',
    category: 'web',
    title: 'High-Speed E-Commerce Systems',
    icon: ShoppingCart,
    desc: 'Custom catalog design, secure payment gateway integrations (Stripe, PayPal), frictionless 1-page checkouts, and automated inventory sync.',
    features: [
      'Instant search and filter indexing',
      'Cart abandonment recovery sequences',
      'PCI-compliant secure checkout processing',
    ],
  },
];

export function ServicesSection() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'web' | 'marketing'>('all');

  const filteredServices = SERVICES.filter(
    (s) => activeFilter === 'all' || s.category === activeFilter,
  );

  return (
    <section id="services" className="py-24 bg-slate-50/60 relative border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-50 text-xs font-bold text-emerald-800 mb-3">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse-dot shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
            <span>End-to-End Capabilities</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Everything You Need to{' '}
            <span className="text-emerald-600">Dominate Your Market</span>
          </h2>

          <p className="text-slate-600 text-sm sm:text-base mt-3">
            We merge stunning user interfaces, lightweight web technology, and aggressive revenue marketing into one unified growth engine.
          </p>

          {/* Filter Tabs */}
          <div className="inline-flex items-center p-1 bg-white rounded-2xl border border-slate-200 mt-8 shadow-sm">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeFilter === 'all'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Services
            </button>
            <button
              onClick={() => setActiveFilter('web')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeFilter === 'web'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Web Development
            </button>
            <button
              onClick={() => setActiveFilter('marketing')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeFilter === 'marketing'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Digital Marketing
            </button>
          </div>
        </div>

        {/* Services Grid with smooth transition */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-300">
          {filteredServices.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className="bg-white rounded-3xl p-7 border border-slate-200/80 shadow-sm hover:shadow-2xl hover:border-emerald-400 hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="h-12 w-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                    <Icon className="h-6 w-6" />
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {service.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed mb-6">
                    {service.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 space-y-2.5">
                  {service.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-center text-xs text-slate-700">
                      <div className="h-4 w-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mr-2 flex-shrink-0">
                        <Check className="h-2.5 w-2.5 stroke-[3]" />
                      </div>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
