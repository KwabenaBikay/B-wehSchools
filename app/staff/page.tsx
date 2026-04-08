'use client';

import { useState } from 'react';
import Image from 'next/image';

type Staff = {
  name: string;
  role: string;
  photo: string;
  category: 'Administration' | 'Teaching' | 'Non-teaching';
};

const staff: Staff[] = [
  { name: 'Rebecca Efua Mankoh', role: 'Admin Academic Affairs', photo: '/images/staff/becky.jpg', category: 'Administration' },
  { name: 'Rhoda Yaa Adjei', role: 'Admin Administrative Affairs', photo: '/images/staff/rhoda.jpg', category: 'Administration' },
  { name: 'Sarah Narki Dzamefe', role: 'Facilitator', photo: '/images/staff/sarah1.jpg', category: 'Teaching' },
  { name: 'Priscilla Okyere', role: 'Facilitator', photo: '/images/staff/IMG_4359.jpg', category: 'Teaching' },
  { name: 'Samuel Ofosu Yeboah', role: 'Facilitator', photo: '/images/staff/IMG_4333.jpg', category: 'Teaching' },
  { name: 'Jestine Dzovakpor', role: 'Facilitator', photo: '/images/staff/jestine.jpg', category: 'Teaching' },
  { name: 'Prosper Akouete', role: 'French Facilitator', photo: '/images/staff/french.jpg', category: 'Teaching' },
  { name: 'Pearl Asuako Osei', role: 'Facilitator', photo: '/images/staff/pearl.jpg', category: 'Teaching' },
  { name: 'Edith Ayensu', role: 'Facilitator', photo: '/images/staff/edit.jpg', category: 'Teaching' },
  { name: 'Sefa Boakye Nana Ama', role: 'Facilitator', photo: '/images/staff/IMG_4323.jpg', category: 'Teaching' },
  { name: 'Mary Osei', role: 'Facilitator', photo: '/images/staff/IMG_4402.jpg', category: 'Teaching' },
  { name: 'Priscilla Gagakuma', role: 'Facilitator', photo: '/images/staff/Priscilla.jpg', category: 'Teaching' },
  { name: 'Sophia P. Dotse', role: 'Cook', photo: '/images/staff/IMG_4365.jpg', category: 'Non-teaching' },
  { name: 'Tetteh Richard', role: 'Driver', photo: '/images/staff/TT.jpg', category: 'Non-teaching' },
  { name: 'Sarah Donkoh', role: 'Janitor 1', photo: '/images/staff/s.jpg', category: 'Non-teaching' },
  { name: 'Faith Aweieriba', role: 'Janitor 2', photo: '/images/staff/f.jpg', category: 'Non-teaching' },
  { name: 'Joshua', role: 'Security Officer', photo: '/images/staff/j.jpg', category: 'Non-teaching' },
];

const PURPLE_PALETTE = [
  'bg-fuchsia-100',  
  'bg-purple-100',   
  'bg-violet-100',   
  'bg-fuchsia-200',  
  'bg-indigo-100',   
];

export default function StaffPage() {
  const [filter, setFilter] = useState<'All' | 'Administration' | 'Teaching' | 'Non-teaching'>('All');

  const filteredStaff = filter === 'All' 
    ? staff 
    : staff.filter(s => s.category === filter);

  const categories = ['All', 'Administration', 'Teaching', 'Non-teaching'];

  return (
    <div className="min-h-screen bg-white pt-40 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* --- PAGE HEADER --- */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-sm font-bold uppercase tracking-widest text-[#7e1b84] mb-3">Facilitators</h2>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
            Our leadership team
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 font-medium">
            Meet the dedicated educators and professionals at the helm of B-Weh Schools Montessori.
          </p>
        </div>

        {/* --- CATEGORY FILTER TABS --- */}
        <div className="flex flex-wrap justify-center gap-4 mb-20 border-b border-gray-100 pb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat as any)}
              className={`px-6 py-2 text-sm font-bold uppercase tracking-widest transition-all ${
                filter === cat 
                ? 'text-[#7e1b84] border-b-2 border-[#7e1b84]' 
                : 'text-gray-400 hover:text-slate-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* --- STAFF GRID --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
          {filteredStaff.map((s, index) => {
            const bgColor = PURPLE_PALETTE[index % PURPLE_PALETTE.length];

            return (
              <div key={`${s.name}-${index}`} className="group flex flex-col cursor-pointer">
                
                {/* 1. THE OFFSET FLAT SHADOW CONTAINER */}
                {/* ml-4 gives room on the left for the thicker offset shadow without getting clipped */}
                <div className="relative w-full aspect-[2/3] mb-6 ml-4 mt-2">
                  
                  {/* The Bigger Offset Box (-bottom-4 -left-4 makes it twice as thick!) */}
                  <div className={`absolute -bottom-4 -left-4 w-full h-full ${bgColor} transition-colors duration-500 group-hover:bg-[#7e1b84] z-0 rounded-none`} />
                  
                  {/* The Person's Image */}
                  <div className="relative z-10 w-full h-full overflow-hidden border-2 border-white bg-white shadow-md">
                    <Image
                      src={s.photo}
                      alt={s.name}
                      fill
                      // SPEED OPTIMIZATIONS BELOW:
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      priority={index < 4} // Instantly loads the first 4 images!
                      className="object-cover transition-transform duration-700 group-hover:scale-105" 
                    />
                  </div>
                  
                </div>

                {/* 2. TEXT CONTENT */}
                <div className="text-left mt-3 pl-4">
                  <h3 className="text-2xl font-bold text-slate-900 group-hover:text-[#7e1b84] transition-colors leading-tight mb-1">
                    {s.name}
                  </h3>
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-500 group-hover:text-slate-900 transition-colors">
                    {s.role}
                  </p>
                </div>
                
              </div>
            );
          })}
        </div>
        
      </div>
    </div>
  );
}