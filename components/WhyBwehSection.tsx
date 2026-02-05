'use client';

import { useEffect, useRef, useState } from 'react';
import { FaBrain, FaShapes, FaUsers, FaLeaf } from 'react-icons/fa';

const FEATURES = [
  {
    id: 1,
    title: 'Authentic Montessori',
    description: 'We follow the true Montessori method, fostering independence and a natural love for learning in a carefully prepared environment.',
    icon: <FaShapes className="text-4xl text-white" />,
    color: 'bg-gradient-to-br from-[#9c27b0] to-[#7e1b84] shadow-lg shadow-purple-900/30'
  },
  {
    id: 2,
    title: 'Academic Excellence',
    description: 'Our rigorous curriculum ensures students excel in literacy, numeracy, and sciences, consistently placing top in regional rankings.',
    icon: <FaBrain className="text-4xl text-white" />,
    color: 'bg-fuchsia-500'
  },
  {
    id: 3,
    title: 'Holistic Development',
    description: 'Beyond grades, we shape character. From Robotics to Creative Arts, we nurture well-rounded leaders for the future.',
    icon: <FaUsers className="text-4xl text-white" />,
    color: 'bg-indigo-600' // Using a complementary deep purple/indigo
  }
];

export default function WhyBwehSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // This effect detects when the section is scrolled into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Only animate once
        }
      },
      { threshold: 0.1 } // Trigger when 10% of the section is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="py-24 bg-fuchsia-50 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* --- SECTION HEADER --- */}
        <div 
          className={`text-center mb-16 transition-all duration-1000 transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-sm font-bold uppercase tracking-wider text-fuchsia-500">
            Our Philosophy
          </h2>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Why B-Weh Schools?
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
            We don't just teach; we inspire. Discover the unique approach that sets our students apart.
          </p>
        </div>

        {/* --- FEATURES GRID --- */}
        <div className="grid gap-8 md:grid-cols-3">
          {FEATURES.map((feature, index) => (
            <div 
              key={feature.id}
              className={`relative overflow-hidden rounded-3xl bg-white p-8 shadow-lg transition-all duration-700 transform hover:-translate-y-2 hover:shadow-2xl ${
                isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-20'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }} // Staggered delay (0ms, 200ms, 400ms)
            >
              {/* Decorative Blob */}
              <div className={`absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-20 transition-transform duration-500 group-hover:scale-150 ${feature.color}`}></div>

              {/* Icon Box */}
              <div className={`mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl shadow-md ${feature.color}`}>
                {feature.icon}
              </div>

              <h3 className="mb-3 text-xl font-bold text-slate-900">
                {feature.title}
              </h3>
              <p className="leading-relaxed text-gray-600">
                {feature.description}
              </p>
              
              {/* Bottom Line decoration */}
              <div className={`mt-6 h-1 w-12 rounded-full ${feature.color}`}></div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}