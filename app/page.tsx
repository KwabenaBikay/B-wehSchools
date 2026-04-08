'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowRight, FaPlay, FaCheck } from 'react-icons/fa'; 
import VideoSection from '@/components/VideoSection';
import BlogSection from '@/components/BlogSection';
import TestimonialSection from '@/components/TestimonialSection';
import WhyBwehSection from '@/components/WhyBwehSection';
import UpcomingEventsSection from '@/components/UpcomingEventsSection';

// --- HERO DATA ---
const HERO_SLIDES = [
  '/images/slide.jpg',
  '/images/slide1.jpg',
  '/images/slide2.jpg',
  '/images/slide3.jpg',
  '/images/slide4.jpg',
  '/images/slide5.jpg',
  '/images/slide6.jpg',
  '/images/slide7.jpg',
  '/images/slide8.jpg',
  '/images/slide9.jpg',
  '/images/slide10.jpg',
  '/images/slide11.jpg',
  '/images/slide12.jpg',
  '/images/slide13.jpg',
  '/images/slide14.jpg',
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
        
        {/* A. CAROUSEL IMAGES */}
        {HERO_SLIDES.map((slide, index) => (
          <div
            key={slide}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={slide}
              alt={`B-weh School Environment ${index + 1}`}
              fill
              className="object-cover"
              priority={index === 0}
            />
          </div>
        ))}

        {/* B. DARK OVERLAYS */}
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

        {/* C. CONTENT */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-32 pb-20 md:px-12 lg:px-16">
          <div className="max-w-3xl">
            
            {/* 1. Pulsing Status Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-none bg-slate-900 border-l-4 border-fuchsia-500">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-none bg-fuchsia-400 opacity-75"></span>
                <span className="relative inline-flex rounded-none h-2 w-2 bg-fuchsia-400"></span>
              </span>
              <span className="text-xs font-bold uppercase tracking-widest text-fuchsia-100">
                Admissions Open 2025/2026
              </span>
            </div>

            {/* 2. Headline */}
            <h1 className="text-5xl font-extrabold leading-tight tracking-tight md:text-6xl lg:text-7xl drop-shadow-xl text-left mb-6">
              B-Weh Schools <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-200 via-fuchsia-100 to-purple-300">
                Montessori
              </span>
            </h1>

            {/* 3. Description */}
            <p className="mt-4 text-lg text-gray-100 md:text-xl font-light leading-relaxed drop-shadow-md text-left max-w-2xl border-l-4 border-fuchsia-500 pl-6">
              Quality education for every young learner with personalised mentorship, real-world
              skills, and a calm environment that mirrors top academies.
            </p>

            {/* 4. Flat, Solid Bullets */}
            <div className="mt-8 flex flex-wrap justify-start gap-3">
               {HERO_BULLETS.map((item) => (
                  <span 
                    key={item} 
                    className="inline-flex items-center rounded-none bg-slate-900 px-4 py-2 text-sm font-medium text-white transition-colors border border-transparent hover:border-fuchsia-500"
                  >
                    <span className="mr-3 flex h-5 w-5 items-center justify-center rounded-none bg-fuchsia-500 text-[10px] text-white">
                      <FaCheck />
                    </span> 
                    {item}
                  </span>
               ))}
            </div>

            {/* 5. Modern Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link
                href="/admissions"
                className="group relative inline-flex items-center justify-center rounded-none bg-[#7e1b84] px-10 py-4 text-base font-bold text-white transition-all hover:bg-[#6b1670]"
              >
                Apply Now
                <FaArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
              
              {/* Changed href to jump to the #virtual-tour section */}
             <button
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.getElementById('virtual-tour');
                  if (element) {
                    // Calculate exact position minus an 80px header offset
                    const headerOffset = 130; 
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.scrollY - headerOffset;

                    window.scrollTo({
                      top: offsetPosition,
                      behavior: 'smooth'
                    });
                  }
                }}
                className="group inline-flex items-center justify-center rounded-none border-2 border-white bg-transparent text-white px-10 py-4 text-base font-bold transition-all hover:bg-white hover:text-slate-900 cursor-pointer"
              >
                <FaPlay className="mr-3 text-xs" />
                Take a Virtual Tour
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* --- 2. NEW WHY B-WEH SECTION --- */}
      <WhyBwehSection />

      {/*---New: UPCOMING EVENTS SECTION ---*/}
      <UpcomingEventsSection />


      {/* --- 3. VIDEO SECTION --- */}
      {/* Added ID and scroll margin here! */}
      <div id="virtual-tour" className="bg-white pb-16 pt-2">
        <VideoSection youtubeUrl={YOUTUBE_EMBED_URL} />
      </div>

      {/* --- 4. TESTIMONIALS SECTION --- */}
      <TestimonialSection />

      {/* --- 5. BLOG / NEWS SECTION --- */}
      <BlogSection />
      
    </>
  ); 
}