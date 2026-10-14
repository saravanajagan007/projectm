'use client';

import React, { useState, useEffect, useRef } from 'react';

interface StatItem {
  target: number;
  prefix: string;
  suffix: string;
  isDecimal: boolean;
  label: string;
}

const STATS: StatItem[] = [
  { target: 48, prefix: '$', suffix: 'M+', isDecimal: false, label: 'Client Revenue Generated' },
  { target: 520, prefix: '', suffix: '+', isDecimal: false, label: 'Custom Projects Shipped' },
  { target: 99.4, prefix: '', suffix: '%', isDecimal: true, label: 'Client Satisfaction & Retainers' },
  { target: 4.2, prefix: '', suffix: 'x', isDecimal: true, label: 'Average Paid Campaign ROAS' },
];

export function StatsCounterSection() {
  const [counts, setCounts] = useState<number[]>(STATS.map(() => 0));
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          const duration = 1800; // ms
          const steps = 60;
          const stepTime = duration / steps;
          let currentStep = 0;

          const timer = setInterval(() => {
            currentStep++;
            const progress = currentStep / steps;
            // Ease-out cubic curve: 1 - pow(1 - progress, 3)
            const easeOut = 1 - Math.pow(1 - progress, 3);

            setCounts(
              STATS.map((stat) => {
                if (currentStep >= steps) return stat.target;
                return stat.target * easeOut;
              }),
            );

            if (currentStep >= steps) {
              clearInterval(timer);
            }
          }, stepTime);
        }
      },
      { threshold: 0.25 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <section
      id="statsSection"
      ref={sectionRef}
      className="py-20 bg-emerald-900 text-white relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {STATS.map((stat, idx) => {
            const val = stat.isDecimal ? counts[idx].toFixed(1) : Math.floor(counts[idx]);
            return (
              <div key={idx} className="space-y-1">
                <div className="text-3xl sm:text-5xl font-black text-emerald-400 tracking-tight tabular-nums">
                  {stat.prefix}
                  {val}
                  {stat.suffix}
                </div>
                <div className="text-xs sm:text-sm text-emerald-100/80 font-medium">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
