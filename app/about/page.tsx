import Image from 'next/image';
import { FaBullseye, FaEye, FaHandHoldingHeart, FaLightbulb, FaUsers, FaStar } from 'react-icons/fa';

export default function AboutPage() {
  return (
    <main className="bg-white">
      
      {/* ==================== 
          SECTION 1: HERO / WHO WE ARE (Merged Style)
      ==================== */}
      <section className="relative pt-32 pb-20 overflow-visible bg-white">
        
        {/* Decorative background circle */}
        <div className="absolute top-0 right-0 -z-10 translate-x-1/3 -translate-y-1/4 transform">
          <div className="h-[600px] w-[600px] rounded-full bg-fuchsia-50 blur-3xl opacity-70"></div>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
            
            {/* --- TEXT CONTENT (Kept the New Premium Style!) --- */}
            <div>
              <div className="inline-block mb-4 px-3 py-1 bg-slate-900 text-white text-xs font-bold uppercase tracking-widest">
                Who We Are
              </div>
              <h1 className="mb-6 text-4xl font-extrabold text-slate-900 sm:text-5xl md:text-6xl leading-tight tracking-tight">
                Hello There!
              </h1>
              
              <div className="border-l-4 border-[#7e1b84] pl-6 mb-8">
                <p className="text-xl text-gray-800 font-medium leading-relaxed">
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
            <div className="relative flex justify-center lg:justify-end mt-12 lg:mt-0 px-4">
              
              {/* 1. Original Gray Shape Behind */}
              <div className="absolute inset-0 bg-gray-100 rounded-t-[100px] rounded-br-[100px] rounded-bl-3xl transform scale-105 translate-x-3 translate-y-3 -z-20"></div>
              
              {/* 2. MAIN IMAGE (Curved edges, border-4) */}
              <div className="relative z-10 h-72 sm:h-96 lg:h-[500px] w-full max-w-lg lg:max-w-xl overflow-hidden rounded-t-[100px] rounded-br-[100px] rounded-bl-3xl shadow-2xl border-4 border-white">
                <Image 
                  src="/images/about/hero.jpg" 
                  alt="Happy students at B-weh School"
                  fill
                  className="object-cover"
                  priority={true}
                />
              </div>

              {/* 3. SECONDARY IMAGE (Small, Round, subtle shadow and outline) */}
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
      <section className="py-20 bg-slate-50 relative border-t border-gray-100">
         <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              
              {/* Vision Card */}
              <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
                
                <div className="relative z-10">
                  <div className="h-14 w-14 bg-fuchsia-100 rounded-2xl flex items-center justify-center text-[#7e1b84] mb-6 text-2xl">
                    <FaEye />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">Our Vision</h3>
                  <p className="text-gray-600 leading-relaxed">
                    To provide pre-tertiary and secondary education, aimed at process and results.
                  </p>
                </div>
              </div>

              {/* Mission Card */}
              <div className="bg-gradient-to-br from-[#9c27b0] to-[#7e1b84] p-10 rounded-3xl shadow-lg shadow-purple-900/30 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -mr-16 -mt-16"></div>
                
                <div className="relative z-10">
                  <div className="h-14 w-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-white mb-6 text-2xl">
                    <FaBullseye />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
                  <p className="text-fuchsia-100 leading-relaxed">
                    Helping children reach their full potential while considering their emotional, physical, intellectual, and 
                    social development through a nurturing and stimulating environment that is based on the Montessori philosophy.
                  </p>
                </div>
              </div>

            </div>
         </div>
      </section>


      {/* ==================== 
          SECTION 3: CORE VALUES 
      ==================== */}
      <section className="py-24 bg-white border-t border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl mb-4">Our Core Values</h2>
            <p className="text-lg text-gray-600">
              Respect for the child and their individual learning journey.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Value 1 */}
            <div className="flex flex-col items-center text-center p-6 rounded-2xl hover:bg-fuchsia-50 transition-colors duration-300">
              <div className="h-16 w-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl mb-4">
                <FaStar />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-2">Excellence</h4>
              <p className="text-sm text-gray-500">
                Excellence in education and character development.
              </p>
            </div>

            {/* Value 2 */}
            <div className="flex flex-col items-center text-center p-6 rounded-2xl hover:bg-fuchsia-50 transition-colors duration-300">
              <div className="h-16 w-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-2xl mb-4">
                <FaHandHoldingHeart />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-2">Integrity</h4>
              <p className="text-sm text-gray-500">
                Integrity in all our interactions.
              </p>
            </div>

            {/* Value 3 */}
            <div className="flex flex-col items-center text-center p-6 rounded-2xl hover:bg-fuchsia-50 transition-colors duration-300">
              <div className="h-16 w-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-2xl mb-4">
                <FaLightbulb />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-2">Creativity</h4>
              <p className="text-sm text-gray-500">
                Community and collaboration.
              </p>
            </div>

            {/* Value 4 */}
            <div className="flex flex-col items-center text-center p-6 rounded-2xl hover:bg-fuchsia-50 transition-colors duration-300">
              <div className="h-16 w-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-2xl mb-4">
                <FaUsers />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-2">Community</h4>
              <p className="text-sm text-gray-500">
                Joy in learning and discovery.
              </p>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}