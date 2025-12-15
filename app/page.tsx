'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import VideoSection from '@/components/VideoSection';
import BlogSection from '@/components/BlogSection';
import TestimonialSection from '@/components/TestimonialSection';
import WhyBwehSection from '@/components/WhyBwehSection'; // Ensures this is imported

// --- HERO DATA ---
const HERO_SLIDES = [
  '/images/slide1.jpg',
  '/images/slide2.jpg',
  '/images/slide3.jpg',
  '/images/slide4.jpg',
  '/images/slide5.jpg',
  '/images/slide6.jpg',
  '/images/slide7.jpg',
  '/images/slide8.jpg',
  '/images/slide9.jpg',
];

const HERO_BULLETS = [
  'Calm, joyful Montessori environments',
  'One-on-one parent accountability check-ins',
  'STEM, music, arts, and leadership clubs',
];

// --- YOUTUBE EMBED URL ---

const YOUTUBE_EMBED_URL = 'https://www.youtube.com/watch?v=TWuat0DqTiU';

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {/* --- 1. HERO SECTION --- */}
      <div className="relative flex min-h-screen items-center overflow-hidden bg-slate-900 text-white">
        {HERO_SLIDES.map((slide, index) => (
          <div
            key={slide}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={slide}
              alt={`B-Weh School Environment ${index + 1}`}
              fill
              className="object-cover"
              priority={index === 0}
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-32 pb-20 md:px-12 lg:px-16">
          <div className="max-w-3xl">
            <h2 className="text-5xl font-extrabold leading-tight tracking-tight md:text-6xl lg:text-7xl drop-shadow-lg text-left">
              B-Weh Schools Montessori 
            </h2>
            <p className="mt-6 text-lg text-slate-100 md:text-xl font-light leading-relaxed drop-shadow-md text-left max-w-2xl">
              Quality education for every young learner with personalised mentorship, real-world
              skills, and a calm environment that mirrors top academies.
            </p>
            <div className="mt-8 flex flex-wrap justify-start gap-3">
               {HERO_BULLETS.map((item) => (
                  <span key={item} className="inline-flex items-center rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-md border border-white/20 shadow-sm">
                    <span className="mr-2 text-fuchsia-300">✓</span> {item}
                  </span>
               ))}
            </div>
            <div className="mt-12 flex flex-col sm:flex-row gap-4">
              <Link
                href="/admissions"
                className="inline-flex items-center justify-center rounded-full bg-white text-[#7e1b84] px-10 py-4 text-base font-bold shadow-xl transition-all hover:-translate-y-1 hover:bg-fuchsia-50"
              >
                Admissions are Open
                <span className="ml-2">→</span>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full border-2 border-white/30 bg-white/10 text-white backdrop-blur-md px-10 py-4 text-base font-bold transition-all hover:bg-white/20 hover:border-white"
              >
                Book a Campus Tour
                <span className="ml-2">↗</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* --- 2. NEW WHY B-WEH SECTION (Replaces old Highlights) --- */}
      <WhyBwehSection />

      {/* --- 3. VIDEO SECTION --- */}
      <div className="bg-white py-12">
        <VideoSection youtubeUrl={YOUTUBE_EMBED_URL} />
      </div>

      {/* --- 4. TESTIMONIALS SECTION --- */}
      <TestimonialSection />

      {/* --- 5. BLOG / NEWS SECTION --- */}
      <BlogSection />
      
    </>
  );
}