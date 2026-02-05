'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowRight, FaPlay, FaCheck } from 'react-icons/fa'; // Added icons for modern feel
import VideoSection from '@/components/VideoSection';
import BlogSection from '@/components/BlogSection';
import TestimonialSection from '@/components/TestimonialSection';
import WhyBwehSection from '@/components/WhyBwehSection';

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
const YOUTUBE_EMBED_URL = 'https://www.youtube.com/youtu.be/Ur4s2IP-Meo';

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
        
        {/* A. CAROUSEL IMAGES (Original Logic) */}
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

        {/* B. DARK OVERLAYS (For text readability) */}
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

        {/* C. CONTENT (Original Layout + Modern Typography) */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-32 pb-20 md:px-12 lg:px-16">
          <div className="max-w-3xl">
            
            {/* 1. Pulsing Status Badge (New Addition) */}
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-fuchsia-900/40 border border-fuchsia-500/30 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-fuchsia-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-fuchsia-400"></span>
              </span>
              <span className="text-xs font-bold uppercase tracking-widest text-fuchsia-100">
                Admissions Open 2025/2026
              </span>
            </div>

            {/* 2. Modern Gradient Headline */}
            <h1 className="text-5xl font-extrabold leading-tight tracking-tight md:text-6xl lg:text-7xl drop-shadow-xl text-left mb-6">
              B-Weh Schools <br />
              {/* Shiny Gradient Text */}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-200 via-fuchsia-100 to-purple-300">
                Montessori
              </span>
            </h1>

            {/* 3. Refined Description Font */}
            <p className="mt-4 text-lg text-gray-100 md:text-xl font-light leading-relaxed drop-shadow-md text-left max-w-2xl border-l-4 border-fuchsia-500 pl-6">
              Quality education for every young learner with personalised mentorship, real-world
              skills, and a calm environment that mirrors top academies.
            </p>

            {/* 4. Glass-Style Bullets */}
            <div className="mt-8 flex flex-wrap justify-start gap-3">
               {HERO_BULLETS.map((item) => (
                  <span key={item} className="inline-flex items-center rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-md border border-white/10 hover:bg-white/20 transition-colors">
                    <span className="mr-2 flex h-5 w-5 items-center justify-center rounded-full bg-fuchsia-500 text-[10px] text-white">
                      <FaCheck />
                    </span> 
                    {item}
                  </span>
               ))}
            </div>

            {/* 5. Modern Buttons (Gradient & Glass) */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link
                href="/admissions"
                className="group relative inline-flex items-center justify-center rounded-full bg-[#7e1b84] px-10 py-4 text-base font-bold text-white shadow-lg shadow-purple-900/40 transition-all hover:bg-[#6b1670] hover:scale-105 hover:shadow-purple-900/60"
              >
                Apply Now
                <FaArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
              
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-md px-10 py-4 text-base font-bold transition-all hover:bg-white/20 hover:border-white"
              >
                <FaPlay className="mr-3 text-xs" />
                Book a Campus Tour
              </Link>
            </div>

          </div>
        </div>
      </div>

      {/* --- 2. NEW WHY B-WEH SECTION --- */}
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