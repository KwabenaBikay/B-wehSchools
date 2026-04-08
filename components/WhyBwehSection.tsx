'use client';

import { useEffect, useRef, useState } from 'react';
import { FaBrain, FaShapes, FaUsers } from 'react-icons/fa';

const FEATURES = [
  {
    id: 1,
    number: '01',
    title: 'Authentic Montessori',
    description: 'We follow the true Montessori method, fostering independence and a natural love for learning in a carefully prepared environment.',
    icon: <FaShapes className="text-2xl" />,
  },
  {
    id: 2,
    number: '02',
    title: 'Academic Excellence',
    description: 'Our rigorous curriculum ensures students excel in literacy, numeracy, and sciences, consistently placing top in regional rankings.',
    icon: <FaBrain className="text-2xl" />,
  },
  {
    id: 3,
    number: '03',
    title: 'Holistic Development',
    description: 'Beyond grades, we shape character. From Robotics to Creative Arts, we nurture well-rounded leaders for the future.',
    icon: <FaUsers className="text-2xl" />,
  }
];

export default function WhyBwehSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); 
        }
      },
      { threshold: 0.1 } 
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    // Deepened the background to fuchsia-100 and added a subtle border at the top
    <section 
      ref={sectionRef} 
      className="pt-24 pb-12 bg-fuchsia-100 border-t border-fuchsia-200 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* --- SECTION HEADER --- */}
        <div 
          className={`mb-16 transition-all duration-1000 transform md:flex md:items-end md:justify-between border-b-2 border-slate-900 pb-8 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="max-w-2xl">
            <h2 className="text-sm font-bold uppercase tracking-widest text-[#7e1b84] mb-3">
              Our Philosophy
            </h2>
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
              Why B-weh Schools?
            </h1>
          </div>
          <p className="mt-6 md:mt-0 max-w-md text-lg text-gray-700 font-medium md:text-right">
            We don't just teach; we inspire. Discover the unique approach that sets our students apart.
          </p>
        </div>

        {/* --- EDITORIAL FEATURES GRID --- */}
        {/* Deepened the border to fuchsia-200 to match the new background */}
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-fuchsia-200 border border-fuchsia-200 bg-white shadow-md">
          {FEATURES.map((feature, index) => (
            <div 
              key={feature.id}
              className={`relative p-8 lg:p-12 group transition-all duration-700 transform ${
                isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-20'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }} 
            >
              
              {/* Massive Editorial Number in the background */}
              {/* Changed text-slate-50 to text-slate-100 so it still shows up clearly against the white background */}
              <div className="absolute top-4 right-8 text-8xl lg:text-9xl font-black text-slate-100 group-hover:text-fuchsia-50 transition-colors duration-500 z-0 select-none">
                {feature.number}
              </div>

              {/* Content Container (z-10 keeps it above the giant number) */}
              <div className="relative z-10 flex flex-col h-full">
                
                {/* Flat, sharp icon box. No rounded corners! */}
                <div className="mb-8 inline-flex h-14 w-14 items-center justify-center bg-slate-900 text-white transition-colors duration-500 group-hover:bg-[#7e1b84]">
                  {feature.icon}
                </div>

                <h3 className="mb-4 text-2xl font-bold text-slate-900 transition-colors duration-500 group-hover:text-[#7e1b84]">
                  {feature.title}
                </h3>
                
                <p className="leading-relaxed text-gray-600">
                  {feature.description}
                </p>
                
                {/* Sharp Bottom Line decoration */}
                <div className="mt-auto pt-8">
                  <div className="h-1 w-12 bg-slate-200 transition-colors duration-500 group-hover:bg-[#7e1b84]"></div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}