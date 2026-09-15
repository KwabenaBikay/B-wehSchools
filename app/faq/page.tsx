'use client';

import { useState } from 'react';
import { FaPlus, FaMinus, FaQuestionCircle, FaArrowRight } from 'react-icons/fa';
import Link from 'next/link';

// --- YOUR FAQ DATA ---
const FAQS = [
  {
    question: "What documents do I need to enroll my child?",
    answer: "You will need a completed Admission Form, Medical History particulars, a Birth Certificate, a passport-size photo of the child, and a copy of the Parent's ID."
  },
  {
    question: "Who do I talk to at B-Weh when I need help?",
    answer: "Please visit our reception for general inquiries. If you need to speak specifically with the Head of School, kindly visit the reception desk first to book an appointment."
  },
  {
    question: "Do you have a fee payment structure?",
    answer: "Yes. We understand that the current economy can be challenging. To support our cherished parents, we have a flexible payment plan outlined for ease of payment. Kindly visit our reception for further details."
  }
];

export default function FAQPage() {
  // State to track which question is open
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <main className="min-h-screen bg-white pt-28 pb-16 sm:pt-32 sm:pb-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">

        {/* --- HEADER (Clean & Breathable) --- */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center mb-4 text-fuchsia-500">
            <FaQuestionCircle className="text-3xl" />
          </div>
          <h2 className="text-sm font-bold uppercase tracking-widest text-[#7e1b84] mb-4">
            Knowledge Base
          </h2>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-6xl uppercase">
            Frequently Asked <br /> Questions
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-500 font-medium leading-relaxed">
            Find clear answers about admissions, fees, and school policies.
          </p>
        </div>

        {/* --- FAQ ACCORDION (Editorial Flush List) --- */}
        {/* We use a thick top border to anchor the list */}
        <div className="border-t-4 border-slate-900">
          {FAQS.map((faq, index) => (
            <div
              key={index}
              // Removed rounded edges and gaps. Just a clean bottom border.
              className={`border-b border-slate-200 transition-colors duration-300 ${openIndex === index ? 'bg-slate-50' : 'bg-white hover:bg-slate-50/50'
                }`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between py-6 px-4 sm:px-8 text-left focus:outline-none group"
              >
                <span className={`text-lg sm:text-xl font-extrabold tracking-tight transition-colors ${openIndex === index ? 'text-[#7e1b84]' : 'text-slate-900 group-hover:text-[#7e1b84]'
                  }`}>
                  {faq.question}
                </span>

                {/* Sharp icons */}
                <span className={`ml-6 flex-shrink-0 transition-transform duration-300 ${openIndex === index ? 'text-[#7e1b84] rotate-180' : 'text-slate-400 group-hover:text-[#7e1b84]'
                  }`}>
                  {openIndex === index ? <FaMinus size={20} /> : <FaPlus size={20} />}
                </span>
              </button>

              {/* Expandable Answer (Using max-h-[500px] instead of 48 so long answers don't get cut off) */}
              <div
                className={`transition-all duration-500 ease-in-out overflow-hidden ${openIndex === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
              >
                <div className="px-4 sm:px-8 pb-8 text-slate-600 text-lg leading-relaxed font-medium">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* --- CONTACT BANNER (Sharp CTA Box) --- */}
        <div className="mt-20 bg-[#7e1b84] p-10 lg:p-14 flex flex-col sm:flex-row items-center justify-between relative shadow-xl">
          {/* Sharp decorative top border */}
          <div className="absolute top-0 left-0 w-full h-1.5 bg-fuchsia-400"></div>

          <div className="text-center sm:text-left mb-6 sm:mb-0">
            <h3 className="text-2xl font-extrabold text-white mb-2 uppercase tracking-tight">Still have questions?</h3>
            <p className="text-fuchsia-100 font-medium">Our administration team is here to help you.</p>
          </div>

          <Link
            href="/contact"
            className="group flex items-center justify-center gap-3 rounded-none border-2 border-white bg-white px-8 py-4 font-bold text-[#7e1b84] transition-colors hover:bg-transparent hover:text-white uppercase tracking-widest text-sm whitespace-nowrap"
          >
            Contact Us <FaArrowRight className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

      </div>
    </main>
  );
}