'use client';

import Image from 'next/image';
import { FaClock, FaMapMarkerAlt, FaCalendarCheck } from 'react-icons/fa';
import Link from 'next/link';

// ==========================================
// 1. FLYER UPLOAD (Comment out or empty this array if there are no active events. 
// Uncomment/replace paths below when new flyers are available)
// ==========================================
const EVENT_FLYERS: string[] = [
  // '/images/flyer1.jpg', 
  // '/images/flyer2.jpg', 
];

// ==========================================
// 2. TEXT EVENTS (Coming Soon with specific titles)
// ==========================================
const TEXT_EVENTS = [
  {
    id: 1,
    title: 'Mini Community Engagement Project'
  },
  {
    id: 2,
    title: 'Robotics Graduation'
  },
];

export default function UpcomingEventsSection() {

  // Combine flyers and text events into one sequence
  const COMBINED_TRACK = [
    ...EVENT_FLYERS.map((flyer) => ({ type: 'flyer', content: flyer })),
    ...TEXT_EVENTS.map((event) => ({ type: 'text', content: event })),
  ];

  // Duplicate it to ensure it easily fills massive desktop screens
  const LOOPED_TRACK = [...COMBINED_TRACK, ...COMBINED_TRACK, ...COMBINED_TRACK];

  return (
    <section className="py-24 bg-slate-50 border-y border-slate-200 overflow-hidden relative">

      {/* --- INJECTED CSS FOR CONTINUOUS SLIDE --- */}
      <style>{`
        @keyframes infinite-slide {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); } 
        }
        .animate-infinite-slide {
          /* 45s controls the speed. Increase number to slow it down! */
          animation: infinite-slide 45s linear infinite;
          width: max-content;
        }
        .animate-infinite-slide:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* --- SECTION HEADER --- */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div>
          <h2 className="text-sm font-bold uppercase tracking-widest text-fuchsia-500 mb-2">Mark Your Calendar</h2>
          <h3 className="text-4xl font-extrabold text-slate-900 uppercase tracking-tight">Upcoming Events</h3>
        </div>

        {/* Temporarily commented out View All Events
        <Link href="/events" className="group inline-flex items-center text-sm font-bold uppercase tracking-widest text-[#7e1b84] hover:text-slate-900 transition-colors">
          View All Events <FaArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
        </Link>
        */}
      </div>

      {/* --- FULL-BLEED HYBRID MARQUEE --- */}
      <div className="relative w-full">

        {/* The Continuous Track */}
        <div className="animate-infinite-slide flex gap-6 px-4">

          {LOOPED_TRACK.map((item, index) => {

            // IF IT IS AN UPLOADED FLYER
            if (item.type === 'flyer') {
              return (
                <div
                  key={`flyer-${index}`}
                  className="group relative w-[260px] md:w-[320px] aspect-[4/5] flex-shrink-0 overflow-hidden bg-white border border-slate-200 shadow-md transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 cursor-pointer"
                >
                  <Image
                    src={item.content as string}
                    alt="Upcoming Event Flyer"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    unoptimized={true}
                  />
                  <div className="absolute inset-0 bg-black/10 transition-colors duration-500 group-hover:bg-transparent"></div>
                </div>
              );
            }

            // IF IT IS A TEXT EVENT (Coming Soon Style)
            if (item.type === 'text') {
              const event = item.content as typeof TEXT_EVENTS[0];
              return (
                <div
                  key={`text-${event.id}-${index}`}
                  className="group relative w-[260px] md:w-[320px] aspect-[4/5] flex-shrink-0 overflow-hidden bg-gradient-to-br from-[#7e1b84] to-slate-900 text-white p-6 md:p-8 flex flex-col justify-between shadow-md transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 cursor-pointer"
                >
                  {/* The Giant Watermark Icon */}
                  <FaCalendarCheck className="absolute -bottom-8 -right-8 text-[160px] text-white/5 transition-all duration-700 transform group-hover:-rotate-12 group-hover:text-white/10 group-hover:scale-110 pointer-events-none" />

                  {/* Center Content: COMING SOON + Event Title */}
                  <div className="flex-1 flex flex-col justify-center z-10 py-4">
                    <h4 className="text-3xl md:text-4xl font-black leading-tight group-hover:text-fuchsia-300 transition-colors duration-300 uppercase tracking-widest mb-4">
                      Coming<br />Soon
                    </h4>

                    {/* The new injected Title under Coming Soon */}
                    <div className="border-t border-fuchsia-500/30 pt-4">
                      <p className="text-sm md:text-base font-medium text-fuchsia-100 leading-snug">
                        {event.title}
                      </p>
                    </div>
                  </div>

                  {/* Details Footer (Icons and "TBA") */}
                  <div className="space-y-3 z-10 border-t border-white/20 pt-4 mt-auto">
                    <div className="flex items-center text-xs md:text-sm font-bold uppercase tracking-wider text-fuchsia-100/70">
                      <FaClock className="mr-3 text-fuchsia-400 text-lg md:text-xl" />
                      TBA
                    </div>
                    <div className="flex items-center text-xs md:text-sm font-bold uppercase tracking-wider text-fuchsia-100/70">
                      <FaMapMarkerAlt className="mr-3 text-fuchsia-400 text-lg md:text-xl" />
                      TBA
                    </div>
                  </div>
                </div>
              );
            }
          })}

        </div>
      </div>

    </section>
  );
}