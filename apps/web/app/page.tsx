import React from 'react';
import { LandingNavbar } from '../components/landing/LandingNavbar';
import { HeroSection } from '../components/landing/HeroSection';
import { PartnersMarquee } from '../components/landing/PartnersMarquee';
import { AboutSection } from '../components/landing/AboutSection';
import { ServicesSection } from '../components/landing/ServicesSection';
import { ProcessSection } from '../components/landing/ProcessSection';
import { StatsCounterSection } from '../components/landing/StatsCounterSection';
import { TestimonialsSection } from '../components/landing/TestimonialsSection';
import { FaqSection } from '../components/landing/FaqSection';
import { ContactSection } from '../components/landing/ContactSection';
import { LandingFooter } from '../components/landing/LandingFooter';
import { FloatingActions } from '../components/landing/FloatingActions';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-emerald-500 selection:text-white">
      <LandingNavbar />
      <main>
        <HeroSection />
        <PartnersMarquee />
        <AboutSection />
        <ServicesSection />
        <ProcessSection />
        <StatsCounterSection />
        <TestimonialsSection />
        <FaqSection />
        <ContactSection />
      </main>
      <LandingFooter />
      <FloatingActions />
    </div>
  );
}
