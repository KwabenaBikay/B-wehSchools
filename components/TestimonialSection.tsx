'use client';

import Image from 'next/image';
import { FaStar } from 'react-icons/fa';

const TESTIMONIALS = [
  {
    id: 1,
    name: "Mrs. Jennifer Opare",
    role: "Parent, Nursery 1",
    image: "/images/testi/p1.jpg", 
    text: "The transformation in my son's confidence since joining B-Weh has been remarkable. The personalized attention he gets in the Montessori system is exactly what he needed.",
    rating: 5,
  },
  {
    id: 2,
    name: "Mr. Bandari Thomas",
    role: "Parent, Grade 1",
    image: "/images/testi/p1.jpg",
    text: "I was worried about my daughter's transition to school, but the teachers here are so nurturing. She wakes up every morning excited to go to school. Best decision we made!",
    rating: 5,
  },
  {
    id: 3,
    name: "Dr. & Mrs. Mensah",
    role: "Parents, KG 2",
    image: "/images/testi/p1.jpg",
    text: "The balance between strict academic standards and creative extracurriculars like Robotics is impressive. B-Weh is truly preparing children for the modern world.",
    rating: 5,
  },
];

export default function TestimonialSection() {
  return (
    <section className="relative py-24 bg-slate-900 overflow-hidden border-y border-slate-800">
      
      {/* --- SUBTLE BRAND GLOW (Very faint, cinematic lighting) --- */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[500px] bg-[#7e1b84]/20 blur-[120px] pointer-events-none"></div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* --- HEADER (Updated for Dark Background) --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-sm font-bold uppercase tracking-widest text-fuchsia-400 mb-4">
              Parent Stories
            </h2>
            <h3 className="text-4xl font-extrabold text-white uppercase tracking-tight sm:text-5xl">
              Trusted by Families
            </h3>
          </div>
          <p className="text-lg text-slate-400 font-medium max-w-sm md:text-right">
            Hear directly from the community that trusts us with their children's future.
          </p>
        </div>

        {/* --- GRID (Bright White Cards that pop against the dark background) --- */}
        <div className="grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <div 
              key={t.id} 
              className="group relative bg-white p-8 md:p-10 flex flex-col justify-between transition-colors duration-500 hover:bg-[#7e1b84] shadow-2xl"
            >
              
              {/* Massive Decorative Quote Mark */}
              <div className="absolute top-6 right-6 text-7xl font-serif font-black text-slate-100 leading-none group-hover:text-fuchsia-400/20 transition-colors pointer-events-none select-none">
                "
              </div>

              {/* Content Wrapper */}
              <div className="relative z-10 flex-grow">
                {/* Stars */}
                <div className="flex gap-1 mb-8 text-[#7e1b84] group-hover:text-yellow-400 transition-colors">
                  {[...Array(t.rating)].map((_, i) => (
                    <FaStar key={i} size={14} />
                  ))}
                </div>

                {/* Text */}
                <p className="text-slate-700 text-lg font-medium leading-relaxed mb-10 group-hover:text-white transition-colors">
                  {t.text}
                </p>
              </div>

              {/* User Info & Footer */}
              <div className="relative z-10 flex items-center gap-5 mt-auto pt-6 border-t border-slate-100 group-hover:border-white/20 transition-colors">
                
                {/* Square Image Avatar */}
                <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden bg-slate-200 grayscale group-hover:grayscale-0 transition-all duration-500">
                  <Image
                    src={t.image}
                    alt={t.name}
                    fill
                    className="object-cover"
                    unoptimized={true}
                  />
                </div>
                
                {/* Author Name */}
                <div>
                  <h4 className="text-base font-bold text-slate-900 uppercase tracking-wider group-hover:text-white transition-colors">
                    {t.name}
                  </h4>
                  <p className="text-xs font-bold text-[#7e1b84] uppercase tracking-widest mt-1 group-hover:text-fuchsia-300 transition-colors">
                    {t.role}
                  </p>
                </div>

              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}