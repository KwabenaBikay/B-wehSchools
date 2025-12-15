'use client';

import Link from 'next/link';
import { FaCheckCircle, FaFileDownload, FaPhoneAlt, FaEnvelope, FaCalendarAlt, FaBookOpen, FaFilePdf } from 'react-icons/fa';

// --- CONFIGURATION ---
const ADMISSION_STEPS = [
  {
    step: '01',
    title: 'Inquiry & Tour',
    desc: 'Contact us to schedule a campus tour. We encourage parents to observe our Montessori environment in action.',
  },
  {
    step: '02',
    title: 'Application Form',
    desc: 'Download the form below or purchase it from the school administration office.',
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
    href: 'https://drive.google.com/file/d/YOUR_CALENDAR_FILE_ID/view?usp=sharing',
    btnText: 'View Calendar'
  },
];

const REQUIREMENTS = [
  'Completed Application Form',
  '2 Recent Passport Pictures',
  'Copy of Birth Certificate',
  'Cumulative Records from Previous School',
  'Immunization Card (Preschool)',
];

export default function AdmissionsPage() {
  return (
    <div className="min-h-screen bg-white pt-32 pb-20">
      
      {/* --- HEADER --- */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center mb-16">
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-[#7e1b84] sm:text-5xl">
          Admissions Process
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
          We are delighted that you are considering B-Weh Schools Montessori for your child’s education.
        </p>
      </div>

      {/* --- STEP BY STEP GUIDE --- */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-24">
        <div className="text-center mb-10">
           <h3 className="text-2xl font-bold text-slate-800">Step-by-Step Guide</h3>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {ADMISSION_STEPS.map((item) => (
            <div key={item.step} className="relative rounded-2xl bg-fuchsia-50 p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md border border-fuchsia-100">
              <div className="mb-4 text-5xl font-black text-[#7e1b84]/20">
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

      {/* --- DOWNLOADS CENTER (Google Drive Links) --- */}
      <section className="bg-slate-50 py-20 mb-20 border-y border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <h3 className="text-2xl font-bold text-[#7e1b84]">Downloads Center</h3>
                <p className="text-gray-600">Access essential documents for your application.</p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
                {DOCUMENTS.map((doc) => (
                    <div key={doc.title} className="bg-white rounded-xl p-8 shadow-sm border border-slate-100 flex flex-col items-center text-center transition-transform hover:-translate-y-1 hover:shadow-lg">
                        <div className="mb-6 p-4 rounded-full bg-slate-50">
                            {doc.icon}
                        </div>
                        <h4 className="text-xl font-bold text-slate-900 mb-2">{doc.title}</h4>
                        <p className="text-sm text-gray-500 mb-6 flex-1">{doc.desc}</p>
                        
                        <a 
                            href={doc.href} 
                            target="_blank" // Important: Opens Drive in new tab
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-full bg-fuchsia-100 px-6 py-2.5 text-sm font-bold text-[#7e1b84] transition-colors hover:bg-[#7e1b84] hover:text-white"
                        >
                            <FaFileDownload /> {doc.btnText}
                        </a>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* --- REQUIREMENTS SECTION --- */}
      <div className="bg-slate-900 py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            
            {/* Left: Text Info */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Admission Requirements</h2>
              <p className="text-slate-300 mb-8 text-lg">
                To ensure a smooth enrollment process, please ensure you have the following documents ready when submitting your application.
              </p>
              <ul className="space-y-4">
                {REQUIREMENTS.map((req) => (
                  <li key={req} className="flex items-center gap-3">
                    <FaCheckCircle className="text-fuchsia-400 h-5 w-5 flex-shrink-0" />
                    <span className="text-slate-100">{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: CTA Box */}
            <div className="rounded-2xl bg-white p-8 text-center shadow-2xl">
              <h3 className="text-2xl font-bold text-[#7e1b84] mb-4">
                Have Questions?
              </h3>
              <p className="text-gray-600 mb-8">
                Our admissions team is here to guide you through every step of the journey.
              </p>
              
              <div className="space-y-4">
                <a 
                  href="tel:+233549753104" 
                  className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-fuchsia-100 bg-white py-3 font-bold text-slate-700 transition-colors hover:border-[#7e1b84] hover:text-[#7e1b84]"
                >
                  <FaPhoneAlt /> +233 54 975 3104
                </a>

                <a 
                  href="mailto:bwehschools@gmail.com"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#7e1b84] py-3 font-bold text-white shadow-lg transition-transform hover:-translate-y-1 hover:bg-[#6b1670]"
                >
                  <FaEnvelope /> Contact Admissions Office
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}