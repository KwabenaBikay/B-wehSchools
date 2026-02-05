'use client';

import Image from 'next/image';
import { FaCheckCircle, FaFileDownload, FaPhoneAlt, FaEnvelope, FaCalendarAlt, FaBookOpen, FaFilePdf } from 'react-icons/fa';

// --- CONFIGURATION ---
const ADMISSION_STEPS = [
  {
    step: '01',
    title: 'Inquiry & Tour',
    desc: 'Contact us to schedule a school tour. We encourage parents to observe our Montessori environment in action.',
  },
  {
    step: '02',
    title: 'Application Form',
    desc: 'Download the form below or visit the school administration office.',
  },
  {
    step: '03',
    title: 'Assessment',
    desc: 'The prospective student participates in a grade-level assessment to determine placement needs.',
  },
  {
    step: '04',
    title: 'Enrollment',
    desc: 'Upon acceptance, admission fees are paid to secure the slot, and orientation details are provided.',
  },
];

//using external Links (Google Drive)
const DOCUMENTS = [
  {
    title: 'Admission Form',
    desc: 'Official application form for new students.',
    icon: <FaFilePdf className="h-8 w-8 text-red-500" />,
    // GOOGLE DRIVE LINK 
    href: 'https://drive.google.com/file/d/1mJ9xiqdC1bGQdubYLjKct9EzOR8pY-VI/view?usp=drive_link', 
    btnText: 'Download Form'
  },
  {
    title: 'School Prospectus',
    desc: 'Detailed guide on our curriculum and values.',
    icon: <FaBookOpen className="h-8 w-8 text-[#7e1b84]" />,
    // GOOGLE DRIVE LINK
    href: 'https://drive.google.com/file/d/1qPaLzBe8H5kZGaq7gFhuzBeFggRf8Gkb/view?usp=drive_link',
    btnText: 'Download Prospectus'
  },
  {
    title: 'Academic Calendar',
    desc: 'Key dates, holidays, and term schedules.',
    icon: <FaCalendarAlt className="h-8 w-8 text-fuchsia-500" />,
    // GOOGLE DRIVE LINK
    href: 'https://drive.google.com/file/d/110NfdToUxlEazWMify35pKaAJOSJHhYY/view?usp=sharing',
    btnText: 'View Calendar'
  },
];

const REQUIREMENTS = [
  'Completed Application Form',
  'Read through the Prospectus',
  'Immunization Card (Preschool)',
  'Birth Certificate',
  'Passport Size Photographs',
];

export default function AdmissionsPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      
      {/* ==================== 
          1. HERO SECTION (Background Image)
      ==================== */}
      <section className="relative h-[500px] w-full flex flex-col items-center justify-center text-center px-4">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/admissions/hero.jpg" //
            alt="B-Weh Admissions"
            fill
            className="object-cover brightness-50" // Darkens image for text readability
            priority
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-white mb-24 max-w-4xl">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl drop-shadow-lg">
            Admissions Process
          </h1>
          <p className="mx-auto mt-6 text-lg sm:text-xl text-purple-100 font-light max-w-2xl drop-shadow-md">
            We are delighted that you are considering B-Weh Schools Montessori for your child’s education.
          </p>
          <div className="mt-8">
             <span className="inline-block px-4 py-1 rounded-full border border-white/30 bg-white/10 backdrop-blur-md text-sm font-semibold tracking-wider uppercase">
                Step-by-Step Guide Below
             </span>
          </div>
        </div>
      </section>

      {/* ==================== 
          2. FLOATING STEPS SECTION (Overlays the Hero)
      ==================== */}
      <section className="px-4 sm:px-6 lg:px-8 -mt-32 relative z-20 pb-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {ADMISSION_STEPS.map((item) => (
              <div 
                key={item.step} 
                className="relative rounded-2xl bg-white p-8 shadow-xl border-t-4 border-[#7e1b84] transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className="absolute top-4 right-4 text-6xl font-black text-slate-100 -z-10 select-none">
                    {item.step}
                </div>
                <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-full bg-fuchsia-100 text-[#7e1b84] font-bold text-lg">
                  {item.step}
                </div>
                <h3 className="mb-3 text-xl font-bold text-slate-900">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-600">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== 
          3. DOWNLOADS CENTER
      ==================== */}
      <section className="bg-slate-50 pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <h3 className="text-3xl font-bold text-[#7e1b84]">Downloads Center</h3>
                <p className="text-gray-600 mt-2">Access essential documents for your application.</p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
                {DOCUMENTS.map((doc) => (
                    <div key={doc.title} className="group bg-white rounded-2xl p-8 shadow-sm border border-slate-100 flex flex-col items-center text-center transition-all hover:-translate-y-1 hover:shadow-lg">
                        <div className="mb-6 p-5 rounded-full bg-slate-50 group-hover:bg-fuchsia-50 transition-colors">
                            {doc.icon}
                        </div>
                        <h4 className="text-xl font-bold text-slate-900 mb-2">{doc.title}</h4>
                        <p className="text-sm text-gray-500 mb-8 flex-1 leading-relaxed">{doc.desc}</p>
                        
                        <a 
                            href={doc.href} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-slate-100 px-6 py-3 text-sm font-bold text-slate-700 transition-all hover:bg-gradient-to-br hover:from-[#9c27b0] hover:to-[#7e1b84] hover:text-white hover:shadow-lg"
                        >
                            <FaFileDownload /> {doc.btnText}
                        </a>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* ==================== 
          4. REQUIREMENTS SECTION 
      ==================== */}
      <div className="bg-[#1a0b1f] py-24 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#7e1b84] rounded-full mix-blend-multiply filter blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-fuchsia-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 translate-y-1/2 -translate-x-1/2"></div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid gap-16 lg:grid-cols-2 items-center">
            
            {/* Left: Text Info */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Admission Requirements</h2>
              <p className="text-slate-300 mb-10 text-lg leading-relaxed">
                To ensure a smooth enrollment process, please ensure you have the following documents ready when submitting your application.
              </p>
              <ul className="space-y-5">
                {REQUIREMENTS.map((req) => (
                  <li key={req} className="flex items-start gap-4">
                    <FaCheckCircle className="text-fuchsia-400 h-6 w-6 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-100 text-lg">{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: CTA Box */}
            <div className="rounded-3xl bg-white p-10 text-center shadow-2xl">
              <h3 className="text-2xl font-bold text-[#7e1b84] mb-4">
                Have Questions?
              </h3>
              <p className="text-gray-600 mb-8">
                Our admissions team is here to guide you through every step of the journey.
              </p>
              
              <div className="space-y-4">
                <a 
                  href="tel:+233551234567" // Update with real number
                  className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-slate-100 bg-white py-4 font-bold text-slate-700 transition-colors hover:border-[#7e1b84] hover:text-[#7e1b84]"
                >
                  <FaPhoneAlt /> Call Admissions
                </a>

                <a 
                  href="mailto:bwehschools@gmail.com"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-[#9c27b0] to-[#7e1b84] shadow-lg shadow-purple-900/30 py-4 font-bold text-white transition-transform hover:-translate-y-1 hover:bg-[#6b1670]"
                >
                  <FaEnvelope /> Email Admissions
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>

    </main>
  );
}