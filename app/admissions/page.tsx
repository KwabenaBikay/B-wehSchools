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

// External Links
const DOCUMENTS = [
  {
    title: 'Admission Form',
    desc: 'Official application form for new students.',
    icon: <FaFilePdf className="h-10 w-10 text-red-500" />,
    href: 'https://drive.google.com/file/d/1mJ9xiqdC1bGQdubYLjKct9EzOR8pY-VI/view?usp=drive_link',
    btnText: 'Download Form'
  },
  {
    title: 'School Prospectus',
    desc: 'Detailed guide on our curriculum and values.',
    icon: <FaBookOpen className="h-10 w-10 text-[#7e1b84]" />,
    href: 'https://drive.google.com/file/d/1qPaLzBe8H5kZGaq7gFhuzBeFggRf8Gkb/view?usp=drive_link',
    btnText: 'Download Prospectus'
  },
  {
    title: 'Academic Calendar',
    desc: 'Key dates, holidays, and term schedules.',
    icon: <FaCalendarAlt className="h-10 w-10 text-fuchsia-500" />,
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
    <main className="min-h-screen bg-white">

      {/* ==================== 
          1. HERO SECTION 
      ==================== */}
      <section className="relative h-[100svh] min-h-[480px] w-full flex flex-col items-center justify-end sm:justify-center text-center px-4 bg-slate-900 sm:h-[65vh] sm:min-h-[550px]">

        <div className="absolute inset-0 z-0">
          <Image
            src="/images/admissions/hero.jpg"
            alt="B-Weh Admissions"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="absolute inset-0 bg-slate-900/60 z-10" />

        <div className="relative z-20 text-white mb-16 sm:mb-24 max-w-4xl">
          <div className="inline-block mb-6 px-4 py-1.5 bg-[#7e1b84] text-white text-xs font-bold uppercase tracking-widest">
            Join Our Family
          </div>
          <h1 className="text-4xl font-black tracking-tight sm:text-6xl lg:text-7xl uppercase drop-shadow-lg">
            Admissions Process
          </h1>
          <p className="mx-auto mt-6 text-lg sm:text-xl text-slate-200 font-medium max-w-2xl drop-shadow-md">
            We are delighted that you are considering B-weh Schools Montessori for your child’s education. Follow our simple guide below to begin.
          </p>
        </div>
      </section>

      {/* ==================== 
          2. FLOATING STEPS SECTION 
      ==================== */}
      <section className="px-4 sm:px-6 lg:px-8 -mt-16 sm:-mt-32 relative z-30 pb-16 sm:pb-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {ADMISSION_STEPS.map((item) => (
              <div
                key={item.step}
                className="relative rounded-none bg-white p-8 shadow-xl border-t-4 border-[#7e1b84] transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl overflow-hidden group"
              >
                <div className="absolute -top-4 -right-2 text-8xl font-black text-slate-50 z-0 select-none transition-transform duration-500 group-hover:scale-110">
                  {item.step}
                </div>

                <div className="relative z-10">
                  <div className="mb-6 inline-flex items-center justify-center w-12 h-12 bg-slate-900 text-white font-bold text-lg rounded-none">
                    {item.step}
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-slate-900 uppercase tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-600 font-medium">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== 
          3. DOWNLOADS CENTER (New Contrast Background!)
      ==================== */}
      {/* Changed to bg-slate-100 and added py-24 for a distinct block */}
      <section className="bg-slate-100 py-14 sm:py-24 border-y border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-extrabold text-[#7e1b84] uppercase tracking-tight">Downloads Center</h3>
            <div className="mt-4 h-1 w-16 bg-fuchsia-500 mx-auto"></div>
            <p className="text-gray-600 mt-4 font-medium">Access essential documents for your application.</p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {DOCUMENTS.map((doc) => (
              // Cards are now pure bg-white with a shadow to pop off the slate background
              <div key={doc.title} className="group bg-white p-6 sm:p-10 border border-transparent shadow-md transition-all duration-300 hover:border-[#7e1b84] hover:shadow-xl flex flex-col items-center text-center rounded-none">
                <div className="mb-8 p-4 text-slate-900 transition-transform duration-500 group-hover:scale-110 group-hover:text-[#7e1b84]">
                  {doc.icon}
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-3">{doc.title}</h4>
                <p className="text-sm text-gray-500 mb-10 flex-1 leading-relaxed font-medium">{doc.desc}</p>

                <a
                  href={doc.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-3 rounded-none border-2 border-slate-900 bg-transparent px-6 py-4 text-sm font-bold uppercase tracking-widest text-slate-900 transition-all hover:bg-slate-900 hover:text-white"
                >
                  <FaFileDownload size={16} /> {doc.btnText}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== 
          4. REQUIREMENTS & CONTACT 
      ==================== */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">

            {/* Left: Requirements */}
            <div className="border border-slate-200 bg-slate-50 p-10 lg:p-14 flex flex-col justify-center relative shadow-sm">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-[#7e1b84]"></div>

              <h2 className="text-3xl font-extrabold text-slate-900 uppercase tracking-tight mb-4">What You Need</h2>
              <p className="text-slate-600 text-lg mb-10 font-medium">
                To ensure a smooth enrollment process, please have the following documents ready when submitting your application.
              </p>

              <ul className="space-y-6">
                {REQUIREMENTS.map((req) => (
                  <li key={req} className="flex items-start gap-4">
                    <FaCheckCircle className="text-fuchsia-500 h-6 w-6 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-800 font-bold text-lg">{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: Contact CTA */}
            <div className="bg-[#7e1b84] p-10 lg:p-14 text-white flex flex-col justify-center relative shadow-xl">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-fuchsia-400"></div>

              <h3 className="text-4xl font-extrabold mb-4 tracking-tight">
                Have Questions?
              </h3>
              <p className="text-fuchsia-100 mb-12 text-lg leading-relaxed font-medium">
                Our admissions team is here to guide you through every step of the journey. We are available Monday to Friday during school hours.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 w-full mt-auto">
                <a
                  href="tel:+233 54 975 3104"
                  className="group flex-1 flex items-center justify-center gap-3 rounded-none border-2 border-white bg-white px-6 py-4 font-bold text-[#7e1b84] transition-colors hover:bg-transparent hover:text-white uppercase tracking-widest text-sm"
                >
                  <FaPhoneAlt /> Call Us
                </a>

                <a
                  href="mailto:bwehschools@gmail.com"
                  className="group flex-1 flex items-center justify-center gap-3 rounded-none border-2 border-white bg-transparent px-6 py-4 font-bold text-white transition-colors hover:bg-white hover:text-[#7e1b84] uppercase tracking-widest text-sm"
                >
                  <FaEnvelope /> Email Us
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

    </main>
  );
}