import type { Metadata } from 'next';
import './globals.css';
import { Montserrat, Playfair_Display } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-serif',
});

export const metadata: Metadata = {
  title: 'B-Weh Schools Montessori',
  description:
    'B-Weh Schools Montessori – a premium Montessori experience for discerning families, nurturing confident, curious and compassionate learners.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} ${playfair.variable} bg-slate-50 text-slate-900 antialiased`}
      >
        <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100">
          <Navbar />
          {/* Removed pt-24 here so the Hero can touch the top */}
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}