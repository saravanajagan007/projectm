'use client';

import React, { useState } from 'react';
import {
  Phone,
  Mail,
  Clock,
  Send,
  Loader2,
  CheckCircle,
  AlertCircle,
  ShieldCheck,
} from 'lucide-react';

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: 'Custom Web & SaaS Development',
    budget: '$5,000 – $15,000',
    message: '',
    honeypot: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMsg(null);
    setErrorMsg(null);

    const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

    try {
      const response = await fetch(`${apiBase}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit inquiry. Please try again.');
      }

      setSuccessMsg(data.message || 'Thank you! Your project brief has been received.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        service: 'Custom Web & SaaS Development',
        budget: '$5,000 – $15,000',
        message: '',
        honeypot: '',
      });
    } catch (err: any) {
      setErrorMsg(err.message || 'Something went wrong. Please reach out via WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-50 text-xs font-bold text-emerald-800 mb-3">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse-dot shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
            <span>Let&apos;s Build Something Remarkable</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Ready to <span className="text-emerald-600">Scale Your Business?</span>
          </h2>

          <p className="text-slate-600 text-sm sm:text-base mt-3">
            Connect directly with our team or submit your project details below for an audit and proposal within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left: Contact Info & Channels */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-50/80 rounded-3xl p-7 border border-slate-200/80 space-y-6">
              <h3 className="text-lg font-bold text-slate-900">
                Direct Contact Channels
              </h3>

              <div className="space-y-4">
                <div className="flex items-start space-x-3.5">
                  <div className="h-10 w-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block">Direct Phone</span>
                    <a
                      href="tel:+918807649359"
                      className="text-sm font-bold text-slate-900 hover:text-emerald-600 transition-colors"
                    >
                      +91 88076 49359
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <div className="h-10 w-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0">
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.63c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.24-.74-.66-1.24-1.48-1.39-1.73-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1s.9 2.44 1.03 2.61c.13.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.44.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.12-.22-.19-.47-.32z"/>
                    </svg>
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block">WhatsApp Chat</span>
                    <a
                      href="https://wa.me/918807649359?text=Hello%20ProjectM%20Agency,%20I%20would%20like%20to%20inquire%20about%20a%20new%20website%20and%20marketing%20project."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-bold text-slate-900 hover:text-emerald-600 transition-colors"
                    >
                      +91 88076 49359
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <div className="h-10 w-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block">Email Inquiries</span>
                    <a
                      href="mailto:hello@projectm.agency"
                      className="text-sm font-bold text-slate-900 hover:text-emerald-600 transition-colors"
                    >
                      hello@projectm.agency
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <div className="h-10 w-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block">Operating Hours</span>
                    <strong className="text-xs font-bold text-slate-900">
                      Mon – Sat: 9:00 AM – 7:00 PM IST
                    </strong>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <a
                  href="https://wa.me/918807649359?text=Hello%20ProjectM%20Agency,%20I%20would%20like%20to%20inquire%20about%20a%20new%20website%20and%20marketing%20project."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
                >
                  Chat on WhatsApp
                </a>
                <a
                  href="tel:+918807649359"
                  className="w-full text-center py-2.5 px-4 rounded-xl text-xs font-bold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 transition-all cursor-pointer"
                >
                  Call +91 88076 49359
                </a>
              </div>
            </div>

            {/* Response Guarantee Badge */}
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200/80 flex items-center space-x-3 text-xs text-emerald-900">
              <ShieldCheck className="h-5 w-5 text-emerald-600 flex-shrink-0" />
              <span>
                <strong>Fast Response Guarantee:</strong> We review all inquiries promptly and provide actionable proposals within 24 hours.
              </span>
            </div>
          </div>

          {/* Right: Interactive Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl">
              <h3 className="text-xl font-bold text-slate-900 mb-1">
                Tell Us About Your Project
              </h3>
              <p className="text-xs text-slate-500 mb-6">
                Fill out the brief below and our senior strategist will analyze your requirements.
              </p>

              {successMsg && (
                <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-start space-x-3 text-sm text-emerald-800 animate-in fade-in">
                  <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-semibold">Message Received!</strong>
                    <span className="text-xs text-emerald-700">{successMsg}</span>
                  </div>
                </div>
              )}

              {errorMsg && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl flex items-start space-x-3 text-sm text-red-800 animate-in fade-in">
                  <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Honeypot anti-bot trap */}
                <input
                  type="text"
                  name="honeypot"
                  value={formData.honeypot}
                  onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. John Doe"
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                      Business Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john@company.com"
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                      Company Name
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="Acme Corp"
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                      Service Needed
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white text-slate-700 cursor-pointer"
                    >
                      <option>Custom Web & SaaS Development</option>
                      <option>Conversion-Focused UI/UX Design</option>
                      <option>Technical & Content SEO</option>
                      <option>Google & Meta Paid Advertising</option>
                      <option>High-Speed E-Commerce Systems</option>
                      <option>Complete Growth Package</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                      Estimated Budget
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white text-slate-700 cursor-pointer"
                    >
                      <option>&lt; $3,000</option>
                      <option>$3,000 – $5,000</option>
                      <option>$5,000 – $15,000</option>
                      <option>$15,000 – $30,000</option>
                      <option>$30,000+</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                    Project Details <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Briefly describe your objectives, target audience, and ideal timeline..."
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-2xl text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-600/20 disabled:opacity-50 transition-all flex items-center justify-center cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      <span>Sending inquiry...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Project Inquiry</span>
                      <Send className="h-4 w-4 ml-2" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
