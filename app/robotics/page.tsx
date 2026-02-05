'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FaRobot, FaBrain, FaCode, FaMicrochip, FaCalendarCheck, FaUserClock } from 'react-icons/fa';
import VideoSection from '@/components/VideoSection';

// --- CONFIGURATION ---
const ROBOTICS_VIDEO_URL = 'https://www.youtube.com/watch?v=TWuat0DqTiU'; //  video

const FEATURES = [
  {
    title: 'Hands-on Engineering',
    desc: 'Students design, build, and maintain their own mechanical creations using Lego Education and Arduino kits.',
    icon: <FaRobot className="h-8 w-8 text-white" />,
  },
  {
    title: 'AI & Machine Learning',
    desc: 'Introduction to basic AI concepts, training simple models, and understanding how computers "learn."',
    icon: <FaBrain className="h-8 w-8 text-white" />,
  },
  {
    title: 'Coding & Logic',
    desc: 'From block-based coding (Scratch) to Python, we teach the language of the future.',
    icon: <FaCode className="h-8 w-8 text-white" />,
  },
  {
    title: 'Electronic Circuits',
    desc: 'Understanding sensors, motors, and microcontrollers to bring static objects to life.',
    icon: <FaMicrochip className="h-8 w-8 text-white" />,
  },
];

export default function RoboticsPage() {
  return (
    <div className="min-h-screen bg-white">
      
      {/* --- HERO SECTION --- */}
      <div className="relative h-[60vh] min-h-[500px] w-full overflow-hidden bg-slate-900">
        <Image
          src="/images/blog10.jpg" // photo of lab
          alt="Students building robots"
          fill
          className="object-cover opacity-40"
          priority
          unoptimized={true}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#7e1b84]/90 via-[#7e1b84]/40 to-transparent" />
        
        <div className="absolute inset-0 flex items-center justify-center px-4">
          <div className="max-w-4xl text-center text-white">
            <h1 className="mb-6 text-4xl font-extrabold tracking-tight sm:text-3xl drop-shadow-lg">
              Robotics & AI Lab
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-fuchsia-100 sm:text-xl">
              Equipping the next generation of innovators with critical thinking skills, 
              engineering knowledge, and the confidence to build the future.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link 
                href="/contact"
                className="rounded-full bg-white px-8 py-3.5 text-base font-bold text-[#7e1b84] shadow-lg transition-transform hover:-translate-y-1 hover:bg-fuchsia-50"
              >
                Join the Weekend Classes
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* --- INTRO & VIDEO --- */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-sm font-bold uppercase tracking-wider text-fuchsia-500">
              See it in Action
            </h2>
            <h3 className="mt-2 text-3xl font-extrabold text-[#7e1b84] sm:text-4xl">
              Where Creativity Meets Technology
            </h3>
          </div>
          
          {/* Reusing Video Component */}
          <div className="overflow-hidden rounded-3xl shadow-2xl border border-gray-100">
             <VideoSection youtubeUrl={ROBOTICS_VIDEO_URL} />
          </div>
        </div>
      </section>

      {/* --- CORE PILLARS GRID --- */}
      <section className="bg-gradient-to-br from-[#9c27b0] to-[#7e1b84] shadow-lg shadow-purple-900/30 py-24 text-white relative overflow-hidden">
        {/* Decorative background circle */}
        <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((feature) => (
              <div key={feature.title} className="rounded-2xl bg-white/10 p-6 backdrop-blur-sm border border-white/10 hover:bg-white/20 transition-colors">
                <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-fuchsia-500 shadow-lg">
                  {feature.icon}
                </div>
                <h3 className="mb-2 text-xl font-bold">{feature.title}</h3>
                <p className="text-fuchsia-100 text-sm leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- PROGRAM DETAILS (SPLIT SECTION) --- */}
      <section className="py-24 bg-fuchsia-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            
            {/* 1. For B-Weh Students */}
            <div className="rounded-3xl bg-white p-8 shadow-xl border-l-8 border-[#7e1b84]">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-full bg-fuchsia-100 text-[#7e1b84]">
                   <FaUserClock className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">For B-Weh Students</h3>
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Robotics and Coding are integrated directly into our academic curriculum. 
                Every student gets hands-on time in the lab, ensuring they are digitally 
                literate and future-ready.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center text-sm font-medium text-gray-700">
                  <span className="mr-2 text-green-500">✓</span> Weekly scheduled lab sessions
                </li>
                <li className="flex items-center text-sm font-medium text-gray-700">
                  <span className="mr-2 text-green-500">✓</span> Integration with Science & Math subjects
                </li>
                <li className="flex items-center text-sm font-medium text-gray-700">
                  <span className="mr-2 text-green-500">✓</span> Internal school competitions
                </li>
              </ul>
            </div>

            {/* 2. For General Public (Weekend Club) */}
            <div className="rounded-3xl bg-slate-900 text-white p-8 shadow-xl border-r-8 border-fuchsia-400 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-fuchsia-500 blur-3xl opacity-20"></div>
               
              <div className="flex items-center gap-4 mb-6 relative z-10">
                <div className="p-3 rounded-full bg-white/10 text-fuchsia-300">
                   <FaCalendarCheck className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold">Weekend Robotics Classes</h3>
              </div>
              <p className="text-slate-300 mb-6 leading-relaxed relative z-10">
                Open to the general public! Does your child love technology? Join our Saturday 
                club where students from all schools come together to invent and engineer.
              </p>
              <ul className="space-y-3 relative z-10 mb-8">
                <li className="flex items-center text-sm font-medium text-slate-200">
                  <span className="mr-2 text-fuchsia-400">➜</span> Every Saturday (9:00 AM - 12:00 PM)
                </li>
                <li className="flex items-center text-sm font-medium text-slate-200">
                  <span className="mr-2 text-fuchsia-400">➜</span> Open to ages 6 - 16
                </li>
                <li className="flex items-center text-sm font-medium text-slate-200">
                  <span className="mr-2 text-fuchsia-400">➜</span> Certification upon level completion
                </li>
              </ul>
              
              <Link 
                href="/contact"
                className="inline-block w-full text-center rounded-xl bg-fuchsia-500 py-3 font-bold text-white transition-colors hover:bg-fuchsia-600 relative z-10"
              >
                Register for Weekend Club
              </Link>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}