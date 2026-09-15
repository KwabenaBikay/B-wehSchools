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
  { name: 'Roselyn Biney', role: 'Facilitator', photo: '/images/staff/roselyn.jpg', category: 'Teaching' },
  { name: 'Elizabeth Esi Narh', role: 'Facilitator', photo: '/images/staff/esi.jpg', category: 'Teaching' },

  { name: 'Sophia P. Dotse', role: 'Cook', photo: '/images/staff/IMG_4365.jpg', category: 'Non-teaching' },
  { name: 'Tetteh Richard', role: 'Driver', photo: '/images/staff/TT.jpg', category: 'Non-teaching' },
  { name: 'Sarah Donkoh', role: 'Janitor', photo: '/images/staff/s.jpg', category: 'Non-teaching' },
  { name: 'Joshua', role: 'Security Officer', photo: '/images/staff/j.jpg', category: 'Non-teaching' },
];

export default function StaffPage() {
  const [filter, setFilter] = useState<'All' | 'Administration' | 'Teaching' | 'Non-teaching'>('All');

  const filteredStaff = filter === 'All'
    ? staff
    : staff.filter(s => s.category === filter);

  const categories = ['All', 'Administration', 'Teaching', 'Non-teaching'];

  return (
    <div className="min-h-screen bg-white pt-28 pb-16 sm:pt-40 sm:pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* --- PAGE HEADER --- */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-sm font-bold uppercase tracking-widest text-[#7e1b84] mb-3">Facilitators</h2>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
            Our leadership team
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 font-medium">
            Meet the dedicated educators and professionals at the helm of B-Weh Schools Montessori.
          </p>
        </div>

        {/* --- CATEGORY FILTER TABS --- */}
        <div className="-mx-4 mb-10 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:mb-20 sm:flex-wrap sm:justify-center sm:gap-4 sm:overflow-visible sm:border-b sm:border-gray-100 sm:px-0 sm:pb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat as any)}
              className={`shrink-0 px-4 py-2 text-xs font-bold uppercase tracking-widest transition-all sm:px-6 sm:text-sm ${filter === cat
                ? 'text-[#7e1b84] border-b-2 border-[#7e1b84]'
                : 'text-gray-400 hover:text-slate-600'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* --- STAFF GRID --- */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12 sm:gap-x-10 sm:gap-y-16">
          {filteredStaff.map((s, index) => {
            return (
              <div key={`${s.name}-${index}`} className="flex flex-col items-center text-center">

                <div className="relative mb-5 w-full max-w-[300px] aspect-square overflow-hidden rounded-full bg-white shadow-md">
                  <Image
                    src={s.photo}
                    alt={s.name}
                    fill
                    sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 22vw"
                    priority={index < 4}
                    className="object-cover object-top"
                  />
                </div>

                <div className="px-1">
                  <h3 className="text-lg font-bold leading-tight text-slate-900 sm:text-xl">
                    {s.name}
                  </h3>
                  <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-slate-500 sm:text-xs">
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