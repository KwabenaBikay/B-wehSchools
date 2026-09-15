'use client';

import Link from 'next/link';
import { FaArrowLeft, FaGraduationCap, FaPaperPlane } from 'react-icons/fa';

export default function JHSPage() {
    return (
        <main className="min-h-screen bg-slate-50 flex items-center justify-center pt-24 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">

            {/* Background Graphic Elements */}
            <div className="absolute top-0 right-0 -z-10 translate-x-1/3 -translate-y-1/4 transform">
                <div className="h-[600px] w-[600px] rounded-full bg-fuchsia-100 blur-3xl opacity-60"></div>
            </div>
            <div className="absolute bottom-0 left-0 -z-10 -translate-x-1/3 translate-y-1/4 transform">
                <div className="h-[400px] w-[400px] rounded-full bg-blue-100 blur-3xl opacity-60"></div>
            </div>

            <div className="max-w-3xl w-full text-center z-10 relative">

                {/* Animated Floating Icon */}
                <div className="flex justify-center mb-8">
                    <div className="relative w-32 h-32 flex items-center justify-center rounded-full bg-white shadow-2xl border-4 border-fuchsia-50 animate-bounce" style={{ animationDuration: '3s' }}>
                        <FaGraduationCap className="text-6xl text-[#7e1b84]" />
                        <div className="absolute -bottom-4 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">
                            Expanding
                        </div>
                    </div>
                </div>

                {/* Typography */}
                <h2 className="text-sm font-black text-fuchsia-500 uppercase tracking-[0.3em] mb-4">
                    Junior High School
                </h2>
                <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-8 leading-tight">
                    Excellence is <br className="hidden sm:block" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9c27b0] to-[#7e1b84]">Growing.</span>
                </h1>

                <p className="text-lg sm:text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
                    We are currently developing our Junior High School curriculum to seamlessly extend the B-Weh Montessori foundation. Join the waitlist to be the first to know when admissions open.
                </p>

                {/* Waitlist Form */}
                <div className="bg-white p-2 rounded-lg shadow-xl shadow-fuchsia-900/5 max-w-md mx-auto flex flex-col sm:flex-row gap-2 border border-slate-100 mb-12">
                    <input
                        type="email"
                        placeholder="Enter your email address..."
                        className="flex-1 px-4 py-3 outline-none text-slate-700 bg-transparent rounded-md focus:bg-slate-50 transition-colors"
                    />
                    <button className="bg-slate-900 hover:bg-[#7e1b84] text-white px-6 py-3 rounded-md font-bold uppercase tracking-wider text-sm flex items-center justify-center gap-2 transition-colors duration-300">
                        Notify Me <FaPaperPlane size={12} />
                    </button>
                </div>

                {/* Back Button */}
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-slate-500 hover:text-[#7e1b84] font-bold text-sm uppercase tracking-wider transition-colors duration-300"
                >
                    <FaArrowLeft /> Return Home
                </Link>

            </div>
        </main>
    );
}