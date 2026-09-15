import Image from 'next/image';
import {
  FaBullseye,
  FaEye,
  FaLightbulb,
  FaShieldAlt,
  FaTrophy,
  FaStar,
} from 'react-icons/fa';

export default function AboutPage() {
  return (
    <main className="bg-white">

      {/* ==================== 
          SECTION 1: HERO / WHO WE ARE 
      ==================== */}
      <section className="relative pt-28 pb-14 sm:pt-32 sm:pb-20 overflow-hidden bg-white">

        <div className="absolute top-0 right-0 -z-10 translate-x-1/3 -translate-y-1/4 transform">
          <div className="h-[600px] w-[600px] rounded-full bg-fuchsia-50 blur-3xl opacity-70"></div>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">

            {/* --- TEXT CONTENT --- */}
            <div>
              <div className="inline-block mb-4 px-3 py-1 bg-slate-900 text-white text-xs font-bold uppercase tracking-widest">
                Who We Are
              </div>
              <h1 className="mb-6 text-3xl font-extrabold text-slate-900 sm:text-5xl md:text-6xl leading-tight tracking-tight">
                Hello There!
              </h1>

              <div className="border-l-4 border-[#7e1b84] pl-6 mb-8">
                <p className="text-lg sm:text-xl text-gray-800 font-medium leading-relaxed">
                  B-weh School (Montessori) is a private Montessori school aimed to provide
                  the best and quality early childhood education service at a fair price.
                </p>
              </div>

              <p className="mb-6 text-lg text-gray-600 leading-relaxed">
                We give more attention to quality education service and aim to become a benchmark for others.
                B-weh Schools seeks to help society by molding students into reaching their full potential.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Our goal is to develop a child’s full potential by imparting ethical living practices,
                developing independent and critical thinkers, and raising kids who champion leadership and innovation.
                With the students in mind, we’ll earn all parents’ trust.
              </p>
            </div>

            {/* --- IMAGE LAYOUT  --- */}
            <div className="relative flex justify-center lg:justify-end mt-8 lg:mt-0 px-2 sm:px-4 overflow-hidden sm:overflow-visible">
              <div className="absolute inset-0 bg-gray-100 rounded-t-[100px] rounded-br-[100px] rounded-bl-3xl transform scale-105 translate-x-3 translate-y-3 -z-20"></div>

              <div className="relative z-10 h-72 sm:h-96 lg:h-[500px] w-full max-w-lg lg:max-w-xl overflow-hidden rounded-t-[100px] rounded-br-[100px] rounded-bl-3xl shadow-2xl border-4 border-white">
                <Image
                  src="/images/about/hero.jpg"
                  alt="Happy students at B-weh School"
                  fill
                  className="object-cover"
                  priority={true}
                />
              </div>

              <div className="absolute -bottom-6 -right-2 sm:-right-8 z-20 h-24 w-24 sm:h-32 sm:w-32 lg:h-48 lg:w-48 overflow-hidden rounded-full border-4 border-white shadow-xl bg-white">
                <Image
                  src="/images/about/vision.jpg"
                  alt="Students learning"
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ==================== 
          SECTION 2: VISION & MISSION 
      ==================== */}
      <section
        className="relative py-16 sm:py-20 lg:py-24 bg-scroll sm:bg-fixed bg-center bg-cover border-t border-slate-900"
        style={{ backgroundImage: "url('/images/abr.jpg')" }}
      >
        {/* Parallax Overlay */}
        <div className="absolute inset-0 bg-slate-900/60"></div>

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 z-10">

          {/* 2x2 Grid: Colored Blocks + Custom White Sketch Blocks */}
          <div className="grid grid-cols-1 md:grid-cols-2 shadow-2xl border border-white/10">

            {/* 1. Top-Left: Mission Block */}
            <div className="order-1 bg-[#7e1b84] p-6 sm:p-8 lg:p-10 flex flex-col justify-center min-h-[240px] lg:min-h-[320px]">
              <div className="relative z-10">
                <h3 className="text-2xl lg:text-3xl font-black text-white uppercase tracking-widest mb-4 drop-shadow-sm">
                  Our Mission
                </h3>
                <p className="text-fuchsia-100 text-base lg:text-lg leading-relaxed font-light">
                  Helping children reach their full potential while considering their emotional, physical, intellectual, and
                  social development through a nurturing and stimulating environment that is based on the Montessori philosophy.
                </p>
              </div>
            </div>

            {/* 2. Top-Right: Target Sketch */}
            <div className="order-2 group bg-white p-8 lg:p-10 flex items-center justify-center min-h-[300px] lg:min-h-[320px] border-b md:border-b-0 md:border-l border-gray-100 overflow-hidden relative">
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                <div className="relative w-56 h-56 lg:w-72 lg:h-72 transition-transform duration-700 ease-out scale-[1.6] lg:scale-[1.8] group-hover:scale-[1.7] lg:group-hover:scale-[1.9] group-hover:rotate-3">
                  <Image
                    src="/images/about/sketch1.svg"
                    alt="Mission Target Sketch"
                    fill
                    className="object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-500"
                    unoptimized={true}
                  />
                </div>
              </div>
            </div>

            {/* 3. Bottom-Left: Binoculars Sketch - Ordered 4th on mobile */}
            <div className="order-4 md:order-3 group bg-white p-8 lg:p-10 flex items-center justify-center min-h-[300px] lg:min-h-[320px] border-t md:border-t-0 md:border-r border-gray-100 overflow-hidden relative">
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                <div className="relative w-40 h-40 lg:w-52 lg:h-52 transition-transform duration-700 ease-out group-hover:scale-110 group-hover:-rotate-3">
                  <Image
                    src="/images/about/sketch2.svg"
                    alt="Vision Binoculars Sketch"
                    fill
                    className="object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-500"
                    unoptimized={true}
                  />
                </div>
              </div>
            </div>

            {/* 4. Bottom-Right: Vision Block - Ordered 3rd on mobile */}
            <div className="order-3 md:order-4 bg-slate-900 p-6 sm:p-8 lg:p-10 flex flex-col justify-center min-h-[240px] lg:min-h-[320px]">
              <div className="relative z-10">
                <h3 className="text-2xl lg:text-3xl font-black text-white uppercase tracking-widest mb-4 drop-shadow-sm">
                  Our Vision
                </h3>
                <div className="h-1 w-12 bg-fuchsia-500 mb-4"></div>
                <p className="text-gray-300 text-base lg:text-lg leading-relaxed font-light">
                  To provide pre-tertiary and secondary education, aimed at process and results.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ==================== 
          SECTION 3: CORE VALUES (RE-DESIGNED: Pinned Board over Dark Parallax Photo)
      ==================== */}
      <section className="relative overflow-hidden bg-white">

        {/* CSS for custom shadows and dashed path filter */}
        <style>{`
          .pinned-card {
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06), 0 10px 25px -5px rgba(0, 0, 0, 0.05);
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          }
          .pinned-card:hover {
            transform: scale(1.05) translateY(-8px) !important;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2);
            z-index: 50;
          }
          .pushpin {
            filter: drop-shadow(2px 4px 6px rgba(0,0,0,0.4));
          }
          .dashed-path {
            stroke-dasharray: 8 8;
            filter: drop-shadow(0 2px 2px rgba(0,0,0,0.05));
          }
        `}</style>

        {/* Global Background Dashed Wave Wave */}
        <div className="absolute inset-0 pointer-events-none opacity-20 z-0">
          <svg className="w-full h-full text-slate-400" fill="none" viewBox="0 0 1440 800" xmlns="http://www.w3.org/2000/svg">
            <path className="dashed-path" d="M-100 400C100 200 400 600 720 400C1040 200 1340 600 1540 400" stroke="currentColor" strokeWidth="2"></path>
          </svg>
        </div>

        {/* --- PART A: White Header Area --- */}
        <div className="relative pt-24 pb-12 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl z-10 bg-white">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tight mb-6">
              Our Core Values
            </h2>
            <div className="h-2 w-24 bg-[#7e1b84] mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 leading-relaxed font-light">
              Guided by a commitment to student success and academic excellence, these pillars define the heart of B-weh Schools.
            </p>
          </div>
        </div>

        {/* --- PART B: Parallax Cards Area --- */}
        <div
          className="relative py-20 lg:py-32 bg-fixed bg-center bg-cover border-t-4 border-[#7e1b84]"
          style={{ backgroundImage: "url('/images/abr.jpg')" }}
        >
          {/* Deep Dark Overlay to make light cards pop clearly */}
          <div className="absolute inset-0 bg-slate-900/80"></div>

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">

            {/* Values Horizontal Sequence */}
            <div className="relative max-w-7xl mx-auto">

              {/* Horizontal Connection SVG (Desktop View) - Changed to semi-transparent white */}
              <svg className="hidden lg:block absolute top-1/2 left-0 w-full h-64 -translate-y-1/2 pointer-events-none z-0" preserveAspectRatio="none" viewBox="0 0 1200 300">
                <path className="dashed-path" d="M100 150 C 300 150, 400 80, 500 120 S 700 220, 800 180 S 1000 100, 1100 150" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="3"></path>
              </svg>

              {/* 4-Column Grid Looping */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 relative z-10 place-items-center">

                {[
                  {
                    num: '01',
                    title: 'Excellence',
                    desc: 'Striving for highest standards in everything we do.',
                    bg: '#fff9f0',
                    pinColor: 'red',
                    // Use realistic pin asset from image_12.png absolutely positioned
                    pinAsset: '/images/pins/realistic-red.png',
                    pinAlt: 'Realistic red pushpin from image_12.png',
                    textColor: 'text-red-600',
                    rotate: '-rotate-2'
                  },
                  {
                    num: '02',
                    title: 'Visionary Leadership',
                    desc: 'Forward-thinking approach that prepares students for the future.',
                    bg: '#f0f4ff',
                    pinColor: 'yellow',
                    pinAsset: '/images/pins/realistic-yellow.png',
                    pinAlt: 'Realistic yellow pushpin from image_12.png',
                    textColor: 'text-yellow-600',
                    rotate: 'rotate-1'
                  },
                  {
                    num: '03',
                    title: 'Integrity',
                    desc: 'Building trust through honesty and ethical behavior.',
                    bg: '#f8f0ff',
                    pinColor: 'green',
                    pinAsset: '/images/pins/realistic-green.png',
                    pinAlt: 'Realistic green pushpin from image_12.png',
                    textColor: 'text-green-600',
                    rotate: '-rotate-1'
                  },
                  {
                    num: '04',
                    title: 'Success',
                    desc: 'Success in everything we do, finding joy in learning and discovery.',
                    bg: '#f0fdf4',
                    pinColor: 'blue',
                    pinAsset: '/images/pins/realistic-blue.png',
                    pinAlt: 'Realistic blue pushpin from image_12.png',
                    textColor: 'text-blue-600',
                    rotate: 'rotate-2'
                  }
                ].map((item, index) => (
                  <div key={index} className="flex flex-col items-center w-full">
                    {/* The White Card with Strict Height/Width (Fixes visibility) */}
                    <div
                      className={`pinned-card bg-white p-6 rounded-xl w-full max-w-[280px] aspect-square flex flex-col justify-center text-center relative ${item.rotate} z-10 border border-gray-100`}
                    >
                      {/* --- CRITICAL Fix: The Pin Area with Realistic Asset from image_12.png --- */}
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-10 h-10 pushpin z-20 pointer-events-none flex items-center justify-center">
                        <div className="relative w-full h-full">
                          <Image
                            src={item.pinAsset}
                            alt={item.pinAlt}
                            fill
                            className="object-contain"
                            unoptimized={true}
                          />
                        </div>
                      </div>

                      {/* --- Coordinated Styling Match: Number Color and Pin Color --- */}
                      <span className={`text-lg font-mono tracking-widest ${item.textColor} mb-2 block font-medium`}>{item.num}</span>
                      <h3 className="text-2xl font-bold text-slate-900 mb-3">{item.title}</h3>
                      <p className="text-sm text-gray-600 italic leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}

              </div>
            </div>

          </div>
        </div>
      </section>

    </main>
  );
}