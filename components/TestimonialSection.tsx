'use client';

import Image from 'next/image';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';

const TESTIMONIALS = [
  {
    id: 1,
    name: "Mrs. Jennifer Opare",
    role: "Parent, Grade 3",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80", // Replace with real parent image
    text: "The transformation in my son's confidence since joining B-Weh has been remarkable. The personalized attention he gets in the Montessori system is exactly what he needed.",
    rating: 5,
  },
  {
    id: 2,
    name: "Mr. Kwesi Boateng",
    role: "Parent, Preschool",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    text: "I was worried about my daughter's transition to school, but the teachers here are so nurturing. She wakes up every morning excited to go to school. Best decision we made!",
    rating: 5,
  },
  {
    id: 3,
    name: "Dr. & Mrs. Mensah",
    role: "Parents, JHS 1",
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&q=80",
    text: "The balance between strict academic standards and creative extracurriculars like Robotics is impressive. B-Weh is truly preparing children for the modern world.",
    rating: 5,
  },
];

export default function TestimonialSection() {
  return (
    <section className="bg-[#7e1b84] py-24 relative overflow-hidden">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-fuchsia-500/20 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold uppercase tracking-wider text-fuchsia-300">
            Parent Stories
          </h2>
          <h3 className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">
            What Families Say About Us
          </h3>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-fuchsia-100">
            Don't just take our word for it. Hear from the community that trusts us with their children's future.
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-8 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <div 
              key={t.id} 
              className="bg-white rounded-2xl p-8 shadow-xl transition-transform hover:-translate-y-2"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4 text-yellow-400">
                {[...Array(t.rating)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>

              {/* Quote Icon */}
              <FaQuoteLeft className="text-fuchsia-100 text-4xl mb-4" />

              {/* Text */}
              <p className="text-gray-600 italic mb-8 leading-relaxed">
                "{t.text}"
              </p>

              {/* User Info */}
              <div className="flex items-center gap-4 mt-auto">
                <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-full border-2 border-fuchsia-100">
                  <Image
                    src={t.image}
                    alt={t.name}
                    fill
                    className="object-cover"
                    unoptimized={true}
                  />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{t.name}</h4>
                  <p className="text-xs text-[#7e1b84] font-semibold">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}