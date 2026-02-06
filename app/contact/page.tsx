'use client';

import { useState } from 'react';
import Image from 'next/image';
import { 
  FaPhoneAlt, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaClock, 
  FaFacebookF, 
  FaInstagram, 
  FaTiktok, 
  FaLinkedinIn,
  FaYoutube, 
} from 'react-icons/fa';

export default function ContactPage() {
  // --- 1. EXISTING FORM LOGIC (KEPT INTACT) ---
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitStatus({
          type: 'success',
          message: data.message || 'Thank you! We will get back to you soon.',
        });
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        setSubmitStatus({
          type: 'error',
          message: data.error || 'Something went wrong. Please try again.',
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Network error. Please check your connection.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <main className="bg-slate-50 min-h-screen">
      
      {/* ==================== 
          1. HERO SECTION WITH BACKGROUND IMAGE
      ==================== */}
      <section className="relative h-[450px] w-full flex flex-col items-center justify-center text-center px-4">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/contact/hero.jpg" // Make sure this image exists!
            alt="School Campus"
            fill
            className="object-cover brightness-50" // Darkens image so text pops
            priority
          />
        </div>
        
        {/* Content */}
        <div className="relative z-10 text-white mb-20">
          <h1 className="text-4xl font-extrabold sm:text-6xl mb-4 drop-shadow-md">
            Contact Us
          </h1>
          <p className="text-purple-100 text-lg sm:text-xl max-w-2xl mx-auto drop-shadow-sm">
            We would love to hear from you. Reach out for enquiries, visits, or admissions.
          </p>
        </div>
      </section>

      {/* ==================== 
          2. FLOATING CARD SECTION
      ==================== */}
      <section className="px-4 sm:px-6 lg:px-8 -mt-32 pb-20 relative z-20">
        <div className="mx-auto max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row">
          
          {/* --- LEFT COLUMN: INFO (Shiny Purple Gradient) --- */}
          <div className="lg:w-2/5 bg-gradient-to-br from-[#9c27b0] to-[#7e1b84] p-10 text-white flex flex-col justify-between relative overflow-hidden">
            {/* Decorative Background Circles */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl"></div>
            <div className="absolute top-10 -left-10 w-40 h-40 bg-purple-500 opacity-20 rounded-full blur-3xl"></div>

            <div className="relative z-10 space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-2">Get in touch</h2>
                <p className="text-purple-200 text-sm">
                  Visit our reception or send us a message below.
                </p>
              </div>

              {/* Info Items */}
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <FaMapMarkerAlt className="text-lg" />
                  </div>
                  <div>
                    <h3 className="font-bold">School Address</h3>
                    <p className="text-purple-200 text-sm mt-1">
                      Windy Hill<br />
                      Kasoa CP, Ghana
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <FaPhoneAlt className="text-lg" />
                  </div>
                  <div>
                    <h3 className="font-bold">Phone</h3>
                    <p className="text-purple-200 text-sm mt-1">
                      +233 (0) 54 975 3104
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <FaEnvelope className="text-lg" />
                  </div>
                  <div>
                    <h3 className="font-bold">Email</h3>
                    <p className="text-purple-200 text-sm mt-1">
                      bwehschools@gmail.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <FaClock className="text-lg" />
                  </div>
                  <div>
                    <h3 className="font-bold">Office Hours</h3>
                    <p className="text-purple-200 text-sm mt-1">
                      Mon - Fri: 7:30 AM - 4:00 PM <br />
                      Sat: 9:00 AM - 11:00 AM
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Icons Section */}
            <div className="mt-12 relative z-10">
              <h4 className="font-bold mb-4 text-xs uppercase tracking-wider opacity-80">
                Follow us on Socials
              </h4>
              
              <div className="flex flex-wrap gap-3">
                
                {/* 1. Instagram */}
                <a 
                  href="https://www.instagram.com/bwehschools?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full border border-purple-300 flex items-center justify-center hover:bg-white hover:text-[#E4405F] transition-all"
                  aria-label="Instagram"
                >
                  <FaInstagram size={14} />
                </a>

                {/* 2. LinkedIn */}
                <a 
                  href="https://www.linkedin.com/company/b-weh-schools/posts/?feedView=all" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full border border-purple-300 flex items-center justify-center hover:bg-white hover:text-[#0A66C2] transition-all"
                  aria-label="LinkedIn"
                >
                  <FaLinkedinIn size={14} />
                </a>

                {/* 3. TikTok */}
                <a 
                  href="https://www.tiktok.com/@bwehschools?_r=1&_t=ZM-91y7U4wA58u" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full border border-purple-300 flex items-center justify-center hover:bg-white hover:text-black transition-all"
                  aria-label="TikTok"
                >
                  <FaTiktok size={14} />
                </a>

                {/* 4. YouTube */}
                <a 
                  href="https://www.youtube.com/@B-WEHSCHOOLSGH" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full border border-purple-300 flex items-center justify-center hover:bg-white hover:text-[#FF0000] transition-all"
                  aria-label="YouTube"
                >
                  <FaYoutube size={14} />
                </a>
                 {/* 5. Facebook */}
                <a 
                  href="https://facebook.com/#" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full border border-purple-300 flex items-center justify-center hover:bg-white hover:text-[#1877F2] transition-all"
                  aria-label="Facebook"
                >
                  <FaFacebookF size={14} />
                </a>

              </div>
            </div>
          </div>

          {/* --- RIGHT COLUMN: FORM (White Area) --- */}
          <div className="lg:w-3/5 p-8 lg:p-14 bg-white">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Send us a message</h2>
            
            {/* Status Messages */}
            {submitStatus.type && (
              <div className={`mb-6 rounded-lg p-4 text-sm ${
                submitStatus.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'
              }`}>
                {submitStatus.message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Honeypot */}
              <input type="text" name="website" tabIndex={-1} autoComplete="off" style={{ position: 'absolute', left: '-9999px' }} aria-hidden="true" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <label className="text-xs font-bold text-gray-500 uppercase mb-2">Full Name</label>
                  <input 
                    type="text" name="name" value={formData.name} onChange={handleChange} required minLength={2} disabled={isSubmitting}
                    placeholder="Kwabena Kwabena" 
                    className="w-full border-b border-gray-200 py-3 text-gray-800 focus:outline-none focus:border-[#7e1b84] transition-colors bg-transparent placeholder-gray-300" 
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-xs font-bold text-gray-500 uppercase mb-2">Phone</label>
                  <input 
                    type="tel" name="phone" value={formData.phone} onChange={handleChange} required minLength={10} disabled={isSubmitting}
                    placeholder="+233 ..." 
                    className="w-full border-b border-gray-200 py-3 text-gray-800 focus:outline-none focus:border-[#7e1b84] transition-colors bg-transparent placeholder-gray-300" 
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <label className="text-xs font-bold text-gray-500 uppercase mb-2">Email</label>
                <input 
                  type="email" name="email" value={formData.email} onChange={handleChange} required disabled={isSubmitting}
                  placeholder="kwabena@example.com" 
                  className="w-full border-b border-gray-200 py-3 text-gray-800 focus:outline-none focus:border-[#7e1b84] transition-colors bg-transparent placeholder-gray-300" 
                />
              </div>

              <div className="flex flex-col">
                <label className="text-xs font-bold text-gray-500 uppercase mb-2">Message</label>
                <textarea 
                  name="message" value={formData.message} onChange={handleChange} required rows={4} disabled={isSubmitting}
                  placeholder="How can we help you?" 
                  className="w-full border-b border-gray-200 py-3 text-gray-800 focus:outline-none focus:border-[#7e1b84] transition-colors resize-none bg-transparent placeholder-gray-300"
                ></textarea>
              </div>

              <div className="pt-2">
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="px-8 py-3 bg-[#7e1b84] text-white font-bold rounded-full shadow-lg hover:bg-[#6a1570] hover:shadow-xl transition-all transform hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            </form>
          </div>

        </div>
      </section>

      {/* ==================== 
          3. MAP SECTION 
      ==================== */}
      <section className="w-full h-[400px] bg-slate-200 relative">
        <iframe 
          title="B-weh Schools Location Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3971.250454694752!2d-0.4394337!3d5.5298154!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdfbbc1c7ccc687%3A0xda87f56109fbce9a!2sB-weh%20Schools%20(Montessori)!5e0!3m2!1sen!2sgh!4v1770296855412!5m2!1sen!2sgh"
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-full"
        />
      </section>

    </main>
  );
}