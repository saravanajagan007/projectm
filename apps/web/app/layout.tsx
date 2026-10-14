import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '../lib/auth-context';

export const metadata: Metadata = {
  title: 'ProjectM — Premium Web Design, Development & Digital Marketing Agency',
  description:
    'ProjectM is a full-service digital agency building ultra-fast custom websites, high-converting e-commerce stores, and data-driven digital marketing campaigns that scale revenue.',
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-white font-sans antialiased text-slate-900">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
