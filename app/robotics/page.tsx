'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  FaRobot,
  FaBrain,
  FaCode,
  FaMicrochip,
  FaCalendarCheck,
  FaUserClock,
  FaArrowRight,
  FaChevronLeft,
  FaChevronRight
} from 'react-icons/fa';

// --- CONFIGURATION ---
const REGISTRATION_LINK = 'https://forms.gle/BvdGVvUsPdePzErw9';

const FEATURES = [
  {
    title: 'Hands-on Engineering',
    desc: 'Students design, build, and maintain their own mechanical creations using Lego Education and Arduino kits.',
    icon: <FaRobot className="h-10 w-10" />,
  },
  {
    title: 'AI & Machine Learning',
    desc: 'Introduction to basic AI concepts, training simple models, and understanding how computers "learn."',
    icon: <FaBrain className="h-10 w-10" />,
  },
  {
    title: 'Coding & Logic',
    desc: 'From block-based coding (Scratch) to Python, we teach the language of the future.',
    icon: <FaCode className="h-10 w-10" />,
  },
  {
    title: 'Electronic Circuits',
    desc: 'Understanding sensors, motors, and microcontrollers to bring static objects to life.',
    icon: <FaMicrochip className="h-10 w-10" />,
  },
];

// --- GALLERY CONFIGURATION ---
const GALLERY_IMAGES = [
  '/images/robotics/1.jpg',
  '/images/robotics/2.jpg',
  '/images/robotics/3.jpg',
  '/images/robotics/4.jpg',
  '/images/robotics/5.jpg',
  '/images/robotics/6.jpg',
  '/images/robotics/7.jpg',
  '/images/robotics/8.jpg',
  '/images/robotics/9.jpg',
  '/images/robotics/10.jpg',
  '/images/robotics/11.jpg',
  '/images/robotics/12.jpg',
  '/images/robotics/13.jpg',
  '/images/robotics/14.jpg',
  '/images/robotics/15.jpg',
];

export default function RoboticsPage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? GALLERY_IMAGES.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === GALLERY_IMAGES.length - 1 ? 0 : prev + 1));
  };

  // Autoplay Effect
  useEffect(() => {
    if (GALLERY_IMAGES.length <= 1) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 4000);
    return () => clearInterval(timer);
  }, [currentSlide]);

  const hasMultipleSlides = GALLERY_IMAGES.length > 1;

  // Calculates the relative position of each slide to create the 3D overlapping effect
  const getSlideOffset = (index: number) => {
    const total = GALLERY_IMAGES.length;
    let offset = (index - currentSlide) % total;
    // Adjust for circular looping
    if (offset < -Math.floor(total / 2)) offset += total;
    if (offset > Math.floor(total / 2)) offset -= total;
    return offset;
  };

  return (
    <div className="min-h-screen bg-white">

      {/* --- HERO SECTION --- */}
      <div className="relative h-[70vh] min-h-[600px] w-full bg-slate-900 border-b-8 border-[#7e1b84]">

        <Image
          src="/images/blog10.jpg"
          alt="Students building robots"
          fill
          className="object-cover"
          priority
          unoptimized={true}
        />

        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/85 via-slate-900/50 to-slate-900/10" />

        <div className="absolute inset-0 flex items-center px-4 sm:px-12 lg:px-24 max-w-7xl mx-auto">

          <div className="max-w-3xl text-left text-white mt-16">
            <div className="inline-block mb-6 px-4 py-1.5 bg-[#7e1b84] text-white text-xs font-bold uppercase tracking-widest shadow-lg">
              Future Ready Program
            </div>

            <h1 className="mb-6 text-5xl font-black tracking-tight sm:text-6xl lg:text-7xl uppercase leading-none drop-shadow-xl">
              Robotics <span className="text-fuchsia-400">&</span><br /> AI Lab
            </h1>

            <div className="border-l-4 border-fuchsia-500 pl-6 mb-10">
              <p className="text-lg text-gray-100 sm:text-xl font-medium leading-relaxed drop-shadow-lg">
                Equipping the next generation of innovators with critical thinking skills,
                engineering knowledge, and the confidence to build the future.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <a
                href={REGISTRATION_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center rounded-none border-2 border-white bg-transparent text-white px-10 py-4 text-base font-bold transition-all hover:bg-white hover:text-slate-900 shadow-lg"
              >
                Join the Weekend Classes
                <FaArrowRight className="ml-3 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* --- INTRO & VIDEOS --- */}
      <section id="video-ad" className="py-20 scroll-mt-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-sm font-bold uppercase tracking-wider text-fuchsia-500">
              See it in Action
            </h2>
            <h3 className="mt-2 text-3xl font-extrabold text-[#7e1b84] sm:text-4xl">
              Where Creativity Meets Technology
            </h3>
          </div>

          <div className="relative mb-20">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">

              {/* Main YouTube Video */}
              <div className="lg:col-span-2 relative w-full bg-black min-h-[400px]">
                <iframe
                  src="https://www.youtube.com/embed/TWuat0DqTiU"
                  title="B-Weh Robotics YouTube Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full"
                ></iframe>
              </div>

              {/* Side Promo Video & Registration Button */}
              <div className="lg:col-span-1 flex flex-col">
                <a
                  href={REGISTRATION_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mb-6 w-full bg-[#7e1b84] hover:bg-[#9c27b0] text-white text-center py-5 font-extrabold text-xl uppercase tracking-widest shadow-xl animate-bounce transition-colors"
                >
                  Click Here to Register
                </a>

                <div className="w-full flex-grow bg-black flex items-center justify-center border border-slate-800 shadow-xl">
                  <video
                    src="/videos/robotics-promo.mp4"
                    controls
                    playsInline
                    poster="/images/video-thumbnail.jpg"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* --- CORE PILLARS GRID --- */}
      <section className="bg-slate-900 py-24 text-white border-t border-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">Lab Capabilities</h2>
            <div className="mt-4 h-1 w-20 bg-fuchsia-500 mx-auto"></div>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((feature) => (
              <div
                key={feature.title}
                className="group border border-slate-700 bg-slate-800/50 p-8 transition-colors hover:bg-slate-800 hover:border-fuchsia-500"
              >
                <div className="mb-6 text-fuchsia-500 transition-colors group-hover:text-fuchsia-400">
                  {feature.icon}
                </div>
                <h3 className="mb-3 text-xl font-bold">{feature.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- 3D COVERFLOW GALLERY (Clean & Resized) --- */}
      <section className="py-24 bg-white border-t border-gray-100 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-[#7e1b84] tracking-tight uppercase">
              Gallery
            </h2>
          </div>

          {/* 3D Carousel Container - Reduced Height */}
          <div className="relative w-full h-[250px] sm:h-[300px] md:h-[400px] flex items-center justify-center perspective-1000 mb-8">

            {GALLERY_IMAGES.map((src, index) => {
              const offset = getSlideOffset(index);
              const isCenter = offset === 0;
              // Determine if image is within the visible threshold (-2 to 2)
              const isVisible = Math.abs(offset) <= 2;

              return (
                <div
                  key={index}
                  // Reduced Width so it doesn't span as wide on the screen
                  className={`absolute w-[60%] sm:w-[50%] md:w-[40%] h-full transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] shadow-2xl bg-black ${!isVisible ? 'opacity-0 pointer-events-none' : 'opacity-100'
                    }`}
                  style={{
                    // Math logic for the overlap, scale, and z-index positioning
                    transform: `translateX(${offset * 65}%) scale(${1 - Math.abs(offset) * 0.15})`,
                    zIndex: 30 - Math.abs(offset),
                    filter: isCenter ? 'brightness(100%)' : 'brightness(40%)',
                    cursor: isCenter ? 'default' : 'pointer'
                  }}
                  onClick={() => !isCenter && setCurrentSlide(index)}
                >
                  <Image
                    src={src}
                    alt={`Gallery Image ${index + 1}`}
                    fill
                    className="object-cover"
                    unoptimized={true}
                  />
                </div>
              );
            })}
          </div>

          {/* Navigation Controls (Arrows and Dots below the gallery) */}
          {hasMultipleSlides && (
            <div className="flex items-center justify-center gap-6 mt-10">

              <button
                onClick={prevSlide}
                className="p-2 text-gray-400 hover:text-[#7e1b84] transition-colors focus:outline-none"
                aria-label="Previous image"
              >
                <FaChevronLeft size={24} />
              </button>

              <div className="flex gap-3">
                {GALLERY_IMAGES.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`h-3 w-3 rounded-full transition-all duration-300 ${currentSlide === index
                      ? 'bg-[#8dc63f] scale-125'
                      : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={nextSlide}
                className="p-2 text-gray-400 hover:text-[#7e1b84] transition-colors focus:outline-none"
                aria-label="Next image"
              >
                <FaChevronRight size={24} />
              </button>

            </div>
          )}

        </div>
      </section>

      {/* --- PROGRAM DETAILS --- */}
      <section className="py-24 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="grid grid-cols-1 lg:grid-cols-2 bg-white border border-gray-200 shadow-sm">

            <div className="p-10 lg:p-16">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-4 bg-slate-100 text-[#7e1b84]">
                  <FaUserClock className="h-8 w-8" />
                </div>
                <h3 className="text-3xl font-bold text-slate-900 tracking-tight">For B-weh Students</h3>
              </div>
              <p className="text-gray-650 text-lg mb-8 leading-relaxed">
                Robotics and Coding are integrated directly into our academic curriculum.
                Every student gets hands-on time in the lab, ensuring they are digitally
                literate and future-ready.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center text-base font-bold text-slate-700">
                  <span className="mr-3 text-fuchsia-500 text-xl">✓</span> Weekly scheduled lab sessions
                </li>
                <li className="flex items-center text-base font-bold text-slate-700">
                  <span className="mr-3 text-fuchsia-500 text-xl">✓</span> Integration with Science & Math
                </li>
                <li className="flex items-center text-base font-bold text-slate-700">
                  <span className="mr-3 text-fuchsia-500 text-xl">✓</span> Internal school competitions
                </li>
              </ul>
            </div>

            <div className="bg-[#7e1b84] text-white p-10 lg:p-16">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-4 bg-black/20 text-white">
                  <FaCalendarCheck className="h-8 w-8" />
                </div>
                <h3 className="text-3xl font-bold tracking-tight">Weekend Classes</h3>
              </div>
              <p className="text-fuchsia-100 text-lg mb-8 leading-relaxed">
                Open to the general public! Does your child love technology? Join our Saturday
                club where students from all schools come together to invent and engineer.
              </p>
              <ul className="space-y-4 mb-12">
                <li className="flex items-center text-base font-bold text-white">
                  <span className="mr-3 text-fuchsia-300">➜</span> Every Saturday (9:00 AM - 12:00 PM)
                </li>
                <li className="flex items-center text-base font-bold text-white">
                  <span className="mr-3 text-fuchsia-300">➜</span> Open to ages 6 - 16
                </li>
                <li className="flex items-center text-base font-bold text-white">
                  <span className="mr-3 text-fuchsia-300">➜</span> Certification upon completion
                </li>
              </ul>

              <a
                href={REGISTRATION_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block w-full text-center rounded-none bg-white py-4 text-lg font-bold text-[#7e1b84] transition-colors hover:bg-slate-100"
              >
                Register for Weekend Classes
              </a>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}