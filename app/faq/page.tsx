'use client';

import { useState } from 'react';
import { FaPlus, FaMinus, FaQuestionCircle } from 'react-icons/fa';

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
  // State to track which question is open (null means all closed)
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <main className="min-h-screen bg-fuchsia-50 pt-32 pb-20">
      <div className="mx-auto max-w-3xl px-6">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-white rounded-full shadow-md text-[#7e1b84] mb-4">
            <FaQuestionCircle className="text-2xl" />
          </div>
          <h1 className="text-4xl font-extrabold text-[#7e1b84] sm:text-5xl">
            Frequently Asked Questions
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Find answers to common questions about admissions, fees, and school policies.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {FAQS.map((faq, index) => (
            <div 
              key={index} 
              className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${
                openIndex === index ? 'border-[#7e1b84] shadow-lg' : 'border-gray-100 shadow-sm'
              }`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
              >
                <span className={`text-lg font-bold transition-colors ${
                  openIndex === index ? 'text-[#7e1b84]' : 'text-slate-900'
                }`}>
                  {faq.question}
                </span>
                <span className="ml-4 flex-shrink-0 text-[#7e1b84]">
                  {openIndex === index ? <FaMinus /> : <FaPlus />}
                </span>
              </button>

              {/* Expandable Answer */}
              <div 
                className={`transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="p-6 pt-0 text-gray-600 leading-relaxed border-t border-gray-50 mt-2">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Note */}
        <div className="mt-12 text-center bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-gray-600">
            Still have questions? We are here to help.
          </p>
          <a href="/contact" className="inline-block mt-4 text-sm font-bold text-[#7e1b84] hover:underline">
            Contact Us Directly &rarr;
          </a>
        </div>

      </div>
    </main>
  );
}