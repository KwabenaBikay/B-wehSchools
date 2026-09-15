'use client';

import { useEffect, useRef, useState } from 'react';
import { FaBrain, FaShapes, FaUsers, FaPaintBrush } from 'react-icons/fa';

const FEATURES = [
  {
    id: 1,
    number: '01',
    title: 'Authentic Montessori',
    description: 'We follow the true Montessori method, fostering independence and a natural love for learning in a carefully prepared environment.',
    icon: <FaShapes className="text-lg" />,
  },
  {
    id: 2,
    number: '02',
    title: 'Academic Excellence',
    description: 'Our rigorous curriculum ensures students excel in literacy, numeracy, and sciences, consistently placing top in regional rankings.',
    icon: <FaBrain className="text-lg" />,
  },
  {
    id: 3,
    number: '03',
    title: 'Holistic Development',
    description: 'Beyond grades, we shape character. From Robotics to Creative Arts, we nurture well-rounded leaders for the future.',
    icon: <FaUsers className="text-lg" />,
  },
  {
    id: 4,
    number: '04',
    title: 'Extracurriculars',
    description: 'We offer a vibrant range of clubs and activities from sports to coding designed to uncover hidden talents and build lifelong passions.',
    icon: <FaPaintBrush className="text-lg" />,
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
    <section
      ref={sectionRef}
      className="py-14 sm:py-20 bg-white border-t border-slate-200"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* --- HEADER --- */}
        <div
          className={`mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
        >
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-[#7e1b84] mb-3">
              Our Philosophy
            </p>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              Why B-weh Schools?
            </h2>
          </div>
          <p className="max-w-md text-lg leading-relaxed text-gray-600 md:text-right">
            We don&apos;t just teach; we inspire. Discover the unique approach that sets our students apart.
          </p>
        </div>

        {/* --- 2x2 PRINCIPLES --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
          {FEATURES.map((feature, index) => (
            <article
              key={feature.id}
              className={`group flex gap-5 border-t border-slate-200 pt-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <span className="shrink-0 text-xl font-light tracking-widest text-slate-300 group-hover:text-[#7e1b84] transition-colors">
                {feature.number}
              </span>

              <div className="min-w-0">
                <div className="mb-3 flex items-center gap-3">
                  <div className="inline-flex h-9 w-9 items-center justify-center bg-slate-900 text-white transition-colors duration-300 group-hover:bg-[#7e1b84]">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 sm:text-xl">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-[15px] leading-relaxed text-gray-600">
                  {feature.description}
                </p>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
