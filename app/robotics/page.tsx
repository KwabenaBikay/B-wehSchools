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
  FaChevronRight,
  FaTrophy,
  FaMedal,
  FaInfoCircle
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

// --- AWARDS & COMPETITIONS CONFIGURATION (Updated with details for back of card) ---
const AWARDS = [
  {
    id: 1,
    title: 'AI For Good Impact Initiative - Robotics for Good Youth Challenge (Junior Category)',
    year: '2026',
    award: '1st Place - Gold Trophy',
    image: '/images/robotics/trophy1.jpg',
    details: 'The overall championship trophy awarded to the B-Weh Robotics team for dominating the Junior Category at the National Robotics for Good Youth Challenge. A testament to our mastery of AI and structural engineering.'
  },
  {
    id: 2,
    title: 'Robotics for Good Youth Challenge',
    year: '2026',
    award: 'Winners Citation',
    image: '/images/robotics/trophy2.jpg',
    details: 'An official citation of excellence presented directly by the organizers to our winning team, recognizing our outstanding innovation, teamwork, and commitment to building technology for social good.'
  },
  {
    id: 3,
    title: 'Enjoy AI - Africa Open Championship (Battle of Tribes Challenge)',
    year: '2025',
    award: 'First Place - Gold Medal',
    image: '/images/robotics/trophy3.jpg',
    details: 'The ultimate prize from the Enjoy AI Africa Open Championship (Battle of Tribes Challenge). This was an elite international competition hosted here in Ghana, featuring the absolute best robotics teams from across the African continent.'
  },
  {
    id: 4,
    title: 'Enjoy AI - Africa Open Championship (Geometric Forest Challenge)',
    year: '2025',
    award: 'Third Place - Bronze Medal',
    image: '/images/robotics/trophy4.jpg',
    details: 'A hard-fought Bronze Medal earned during the highly competitive international at the Enjoy AI Africa Open Compition (Geometric Forest Challenge). Our team stood toe-to-toe with elite African talent and proved our programming capabilities.'
  }
];

// --- GALLERY CONFIGURATION ---
const numberedSet = (prefix: string, count: number) =>
  Array.from({ length: count }, (_, i) => `/images/robotics/${prefix}${i + 1}.jpg`);

const GALLERY_IMAGES = [
  ...numberedSet('g', 17),
  ...numberedSet('rg', 12),
  ...numberedSet('ag', 16),
];

const HERO_SLIDES = [
  '/images/robotics/hero/hero1.jpg',
  '/images/robotics/hero/hero2.jpg',
  '/images/robotics/hero/hero3.jpg',
  '/images/robotics/hero/hero4.jpg',
];

export default function RoboticsPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [heroSlide, setHeroSlide] = useState(0);
  const [flippedAward, setFlippedAward] = useState<number | null>(null);

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

  useEffect(() => {
    if (HERO_SLIDES.length <= 1) return;
    const timer = setInterval(() => {
      setHeroSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const hasMultipleSlides = GALLERY_IMAGES.length > 1;

  const getSlideOffset = (index: number) => {
    const total = GALLERY_IMAGES.length;
    let offset = (index - currentSlide) % total;
    if (offset < -Math.floor(total / 2)) offset += total;
    if (offset > Math.floor(total / 2)) offset -= total;
    return offset;
  };

  const getGalleryLabel = (src: string) => {
    const filename = src.split('/').pop() || '';

    if (filename.startsWith('rg')) return 'National Robotics for Good Challenge';
    if (filename.startsWith('ag')) return 'Enjoy AI Africa Open';
    if (filename.startsWith('g')) return 'AI for Good — Geneva, Switzerland';
    return 'B-Weh Robotics Lab';
  };

  return (
    <div className="min-h-screen bg-white">

      {/* --- HERO SECTION --- */}
      <div className="relative h-[100svh] min-h-[540px] w-full overflow-hidden bg-slate-900 border-b-8 border-[#7e1b84] sm:h-[70vh] sm:min-h-[600px]">
        {HERO_SLIDES.map((slide, index) => (
          <div
            key={slide}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === heroSlide ? 'opacity-100' : 'opacity-0'
              }`}
          >
            <Image
              src={slide}
              alt={`B-Weh Robotics & AI Lab ${index + 1}`}
              fill
              className="object-cover"
              priority={index === 0}
              unoptimized={true}
            />
          </div>
        ))}
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-slate-900/85 via-slate-900/50 to-slate-900/10" />
        <div className="absolute inset-0 z-20 flex items-end px-4 pb-10 sm:items-center sm:px-12 sm:pb-0 lg:px-24 max-w-7xl mx-auto">
          <div className="max-w-3xl text-left text-white mt-16 w-full">
            <div className="inline-block mb-6 px-4 py-1.5 bg-[#7e1b84] text-white text-xs font-bold uppercase tracking-widest shadow-lg">
              Future Ready Program
            </div>
            <h1 className="mb-4 text-4xl font-black tracking-tight sm:mb-6 sm:text-6xl lg:text-7xl uppercase leading-none drop-shadow-xl">
              Robotics <span className="text-fuchsia-400">&</span><br /> AI Lab
            </h1>
            <div className="border-l-4 border-fuchsia-500 pl-6 mb-10">
              <p className="text-base text-gray-100 sm:text-xl font-medium leading-relaxed drop-shadow-lg">
                Equipping the next generation of innovators with critical thinking skills,
                engineering knowledge, and the confidence to build the future.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <a
                href={REGISTRATION_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex w-full items-center justify-center rounded-none border-2 border-white bg-transparent text-white px-6 py-3.5 text-sm font-bold transition-all hover:bg-white hover:text-slate-900 shadow-lg sm:w-auto sm:px-10 sm:py-4 sm:text-base"
              >
                Join the Weekend Classes
                <FaArrowRight className="ml-3 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* --- INTRO & VIDEOS --- */}
      <section id="video-ad" className="py-12 sm:py-20 scroll-mt-40">
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
              <div className="lg:col-span-2 relative w-full bg-black min-h-[220px] aspect-video lg:min-h-[400px] lg:aspect-auto">
                <iframe
                  src="https://www.youtube.com/embed/TWuat0DqTiU"
                  title="B-Weh Robotics YouTube Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full"
                ></iframe>
              </div>
              <div className="lg:col-span-1 flex flex-col">
                <a
                  href={REGISTRATION_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mb-6 w-full bg-[#7e1b84] hover:bg-[#9c27b0] text-white text-center py-4 font-extrabold text-sm uppercase tracking-wide shadow-xl sm:py-5 sm:text-xl sm:tracking-widest transition-colors"
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
      <section className="bg-slate-900 py-14 sm:py-24 text-white border-t border-slate-800">
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

      {/* --- 3D COVERFLOW GALLERY --- */}
      <section className="py-14 sm:py-24 bg-white border-t border-gray-100 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-[#7e1b84] tracking-tight uppercase sm:text-4xl">
              Gallery
            </h2>
          </div>
          <div className="relative w-full h-[320px] sm:h-[400px] md:h-[500px] flex items-center justify-center perspective-1000 mb-8">
            {GALLERY_IMAGES.map((src, index) => {
              const offset = getSlideOffset(index);
              const isCenter = offset === 0;
              const isVisible = Math.abs(offset) <= 2;

              return (
                <div
                  key={index}
                  className={`absolute w-[82%] sm:w-[50%] md:w-[40%] h-full flex flex-col transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] shadow-2xl bg-white border border-gray-200 ${!isVisible ? 'opacity-0 pointer-events-none' : 'opacity-100'
                    }`}
                  style={{
                    transform: `translateX(${offset * 65}%) scale(${1 - Math.abs(offset) * 0.15})`,
                    zIndex: 30 - Math.abs(offset),
                    filter: isCenter ? 'brightness(100%)' : 'brightness(40%)',
                    cursor: isCenter ? 'default' : 'pointer'
                  }}
                  onClick={() => !isCenter && setCurrentSlide(index)}
                >
                  <div className="relative flex-grow bg-black w-full">
                    <Image
                      src={src}
                      alt={`Gallery Image ${index + 1}`}
                      fill
                      className="object-cover"
                      unoptimized={true}
                    />
                  </div>
                  <div className="bg-slate-900 border-t-4 border-[#7e1b84] py-3 px-4 flex items-center justify-center min-h-[50px]">
                    <p className="text-white text-[10px] sm:text-xs font-bold uppercase tracking-widest text-center truncate line-clamp-2 w-full leading-relaxed">
                      {getGalleryLabel(src)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {hasMultipleSlides && (
            <div className="flex items-center justify-center gap-6 mt-8 sm:mt-10">
              <button
                onClick={prevSlide}
                className="flex h-11 w-11 items-center justify-center text-gray-400 hover:text-[#7e1b84] transition-colors focus:outline-none"
                aria-label="Previous image"
              >
                <FaChevronLeft size={22} />
              </button>
              <p className="min-w-[4.5rem] text-center text-sm font-bold tabular-nums text-slate-500">
                {currentSlide + 1} / {GALLERY_IMAGES.length}
              </p>
              <button
                onClick={nextSlide}
                className="flex h-11 w-11 items-center justify-center text-gray-400 hover:text-[#7e1b84] transition-colors focus:outline-none"
                aria-label="Next image"
              >
                <FaChevronRight size={22} />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* --- AWARDS & ACHIEVEMENTS SECTION (3D FLIP CARDS) --- */}
      <section className="py-14 sm:py-24 bg-slate-900 border-t-4 border-[#7e1b84]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div className="max-w-2xl">
              <div className="flex items-center gap-4 mb-4">
                <FaTrophy className="text-4xl text-yellow-500" />
                <h2 className="text-sm font-bold uppercase tracking-widest text-yellow-500">Hall of Fame</h2>
              </div>
              <h3 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight leading-tight">
                Our Achievements
              </h3>
            </div>
            <p className="mt-6 md:mt-0 text-slate-400 text-base sm:text-lg md:text-right max-w-md">
              Tap or hover any trophy to learn more about our victories on the competitive stage.
            </p>
          </div>

          {/* Awards Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {AWARDS.map((award) => (

              // 1. The Container sets the 3D Perspective and strict fixed height
              <div
                key={award.id}
                className="group w-full h-[340px] sm:h-[480px] [perspective:1000px] cursor-pointer"
                onClick={() => setFlippedAward((current) => (current === award.id ? null : award.id))}
              >

                <div className={`relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] shadow-xl [@media(hover:hover)]:group-hover:[transform:rotateY(180deg)] ${flippedAward === award.id ? '[transform:rotateY(180deg)]' : ''}`}>

                  {/* 3. FRONT FACE */}
                  <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] bg-slate-800 border border-slate-700 flex flex-col">

                    {/* Trophy Image */}
                    <div className="relative flex-grow bg-black w-full overflow-hidden border-b border-slate-700">
                      <Image
                        src={award.image}
                        alt={award.award}
                        fill
                        className="object-cover"
                        unoptimized={true}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80" />
                      <div className="absolute top-4 right-4 bg-yellow-500 text-slate-900 text-xs font-black px-3 py-1 uppercase tracking-widest shadow-md z-10">
                        {award.year}
                      </div>
                      {/* Hint Icon to hover */}
                      <div className="absolute bottom-4 right-4 text-white/50 animate-pulse">
                        <FaInfoCircle size={20} />
                      </div>
                    </div>

                    {/* Text Title (Clamped to 3 lines) */}
                    <div className="p-4 sm:p-6 h-[140px] sm:h-[160px] flex flex-col bg-slate-800">
                      <div className="flex items-center gap-2 mb-2 text-yellow-500">
                        <FaMedal className="text-base flex-shrink-0" />
                        <span className="text-[10px] sm:text-xs font-bold tracking-widest uppercase truncate">{award.award}</span>
                      </div>
                      <h4 className="text-lg sm:text-xl font-bold text-white tracking-tight leading-snug line-clamp-3">
                        {award.title}
                      </h4>
                    </div>
                  </div>

                  {/* 4. BACK FACE (Rotated 180deg initially) */}
                  <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] bg-slate-900 border-2 border-yellow-500 p-4 sm:p-8 flex flex-col items-center justify-center text-center overflow-y-auto">
                    <FaTrophy className="text-4xl sm:text-5xl text-yellow-500 mb-6 drop-shadow-md" />
                    <h4 className="text-lg sm:text-xl font-black text-white uppercase tracking-widest mb-4">
                      {award.award}
                    </h4>
                    <div className="h-1 w-12 bg-[#7e1b84] mb-6"></div>
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-light">
                      {award.details}
                    </p>
                  </div>

                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* --- PROGRAM DETAILS --- */}
      <section className="py-14 sm:py-24 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 bg-white border border-gray-200 shadow-sm">
            <div className="p-6 sm:p-10 lg:p-16">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-4 bg-slate-100 text-[#7e1b84]">
                  <FaUserClock className="h-8 w-8" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">For B-weh Students</h3>
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
            <div className="bg-[#7e1b84] text-white p-6 sm:p-10 lg:p-16">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-4 bg-black/20 text-white">
                  <FaCalendarCheck className="h-8 w-8" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">Weekend Classes</h3>
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