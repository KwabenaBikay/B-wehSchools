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
  // --- 1. FORM LOGIC ---
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
      const response = await fetch('https://formspree.io/f/xzdazgeo', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json' 
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus({
          type: 'success',
          message: 'Thank you! We have received your message and will get back to you soon.',
        });
        setFormData({ name: '', email: '', phone: '', message: '' }); 
      } else {
        const data = await response.json();
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
          1. HERO SECTION 
      ==================== */}
      <section className="relative h-[450px] w-full flex flex-col items-center justify-center text-center px-4">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/contact/hero.jpg" 
            alt="School Campus"
            fill
            className="object-cover brightness-50" 
            priority
          />
        </div>
        
        {/* Content */}
        <div className="relative z-10 text-white mb-20 max-w-3xl">
          <h1 className="text-5xl font-black sm:text-6xl lg:text-7xl mb-4 uppercase tracking-tight drop-shadow-md">
            Contact Us
          </h1>
          <p className="text-purple-100 text-lg sm:text-xl font-medium max-w-2xl mx-auto drop-shadow-sm">
            We would love to hear from you. Reach out for enquiries, campus visits, or admissions details.
          </p>
        </div>
      </section>

      {/* ==================== 
          2. FLOATING CARD SECTION 
      ==================== */}
      <section className="px-4 sm:px-6 lg:px-8 -mt-32 pb-20 relative z-20">
        <div className="mx-auto max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row border border-slate-100">
          
          {/* --- LEFT COLUMN: INFO --- */}
          <div className="lg:w-2/5 bg-gradient-to-br from-[#9c27b0] to-[#7e1b84] p-10 lg:p-14 text-white flex flex-col justify-between relative overflow-hidden">
            
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl"></div>
            <div className="absolute top-10 -left-10 w-40 h-40 bg-purple-500 opacity-20 rounded-full blur-3xl"></div>

            <div className="relative z-10">
              <h2 className="text-4xl font-extrabold mb-4 tracking-tight">Let's Talk</h2>
              <p className="text-fuchsia-100 font-medium mb-10 text-lg">
                Visit our reception or send us a direct message. We respond within 24 hours.
              </p>

              {/* Info Items */}
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <FaMapMarkerAlt className="text-lg" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1 uppercase tracking-wider text-fuchsia-100 text-sm">School Address</h3>
                    <p className="text-white font-medium leading-relaxed">
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
                    <h3 className="font-bold text-lg mb-1 uppercase tracking-wider text-fuchsia-100 text-sm">Phone</h3>
                    <a href="tel:+233000000000" className="text-white font-medium hover:text-fuchsia-200 transition-colors">
                      +233 (0) 54 975 3104

                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <FaEnvelope className="text-lg" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1 uppercase tracking-wider text-fuchsia-100 text-sm">Email</h3>
                    <a href="mailto:example@email.com" className="text-white font-medium hover:text-fuchsia-200 transition-colors">
                      bwehschools@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <FaClock className="text-lg" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1 uppercase tracking-wider text-fuchsia-100 text-sm">Office Hours</h3>
                    <p className="text-white font-medium leading-relaxed">
                      Mon - Fri: 7:30 AM - 4:00 PM <br />
                      Sat: 9:00 AM - 11:00 AM
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Icons Section (Restored specific hover colors) */}
            <div className="mt-12 relative z-10">
              <h4 className="font-bold mb-4 text-xs uppercase tracking-widest text-fuchsia-200">
                Follow us on Socials
              </h4>
              <div className="flex flex-wrap gap-3">
                {[
                  { icon: <FaInstagram size={14} />, href: 'https://www.instagram.com/bwehschools?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==', label: 'Instagram', hoverColor: 'hover:text-[#E4405F]' },
                  { icon: <FaLinkedinIn size={14} />, href: 'https://www.linkedin.com/company/b-weh-schools/posts/?feedView=all', label: 'LinkedIn', hoverColor: 'hover:text-[#0A66C2]' },
                  { icon: <FaTiktok size={14} />, href: 'https://www.tiktok.com/@bwehschools?_r=1&_t=ZM-91y7U4wA58u', label: 'TikTok', hoverColor: 'hover:text-black' },
                  { icon: <FaYoutube size={14} />, href: 'https://www.youtube.com/@B-WEHSCHOOLSGH', label: 'YouTube', hoverColor: 'hover:text-[#FF0000]' },
                  { icon: <FaFacebookF size={14} />, href: 'https://facebook.com/#', label: 'Facebook', hoverColor: 'hover:text-[#1877F2]' },
                ].map((social) => (
                  <a 
                    key={social.label}
                    href={social.href} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`w-8 h-8 rounded-full border border-fuchsia-300 flex items-center justify-center transition-all hover:bg-white text-white ${social.hoverColor}`}
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* --- RIGHT COLUMN: FORM --- */}
          <div className="lg:w-3/5 p-8 lg:p-14 bg-white flex flex-col justify-center">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-8 uppercase tracking-tight">Send a Message</h2>
            
            {/* Status Messages */}
            {submitStatus.type && (
              <div className={`mb-8 p-4 text-sm font-bold uppercase tracking-wide border-l-4 ${
                submitStatus.type === 'success' ? 'bg-green-50 text-green-800 border-green-500' : 'bg-red-50 text-red-800 border-red-500'
              }`}>
                {submitStatus.message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Honeypot */}
              <input type="text" name="website" tabIndex={-1} autoComplete="off" style={{ position: 'absolute', left: '-9999px' }} aria-hidden="true" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <label className="text-xs font-bold text-slate-900 uppercase tracking-widest mb-1">Full Name</label>
                  <input 
                    type="text" name="name" value={formData.name} onChange={handleChange} required minLength={2} disabled={isSubmitting}
                    placeholder="e.g. Kwabena Mensah" 
                    className="w-full border-b border-slate-200 py-2 text-slate-900 focus:outline-none focus:border-[#7e1b84] transition-colors bg-transparent placeholder-slate-400" 
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-xs font-bold text-slate-900 uppercase tracking-widest mb-1">Phone</label>
                  <input 
                    type="tel" name="phone" value={formData.phone} onChange={handleChange} required minLength={10} disabled={isSubmitting}
                    placeholder="+233 ..." 
                    className="w-full border-b border-slate-200 py-2 text-slate-900 focus:outline-none focus:border-[#7e1b84] transition-colors bg-transparent placeholder-slate-400" 
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <label className="text-xs font-bold text-slate-900 uppercase tracking-widest mb-1">Email Address</label>
                <input 
                  type="email" name="email" value={formData.email} onChange={handleChange} required disabled={isSubmitting}
                  placeholder="kwabena@example.com" 
                  className="w-full border-b border-slate-200 py-2 text-slate-900 focus:outline-none focus:border-[#7e1b84] transition-colors bg-transparent placeholder-slate-400" 
                />
              </div>

              <div className="flex flex-col">
                <label className="text-xs font-bold text-slate-900 uppercase tracking-widest mb-1">Your Message</label>
                <textarea 
                  name="message" value={formData.message} onChange={handleChange} required rows={4} disabled={isSubmitting}
                  placeholder="How can we help you today?" 
                  className="w-full border-b border-slate-200 py-2 text-slate-900 focus:outline-none focus:border-[#7e1b84] transition-colors resize-none bg-transparent placeholder-slate-400"
                ></textarea>
              </div>

              <div className="pt-4">
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full md:w-auto px-10 py-4 bg-slate-900 text-white font-bold uppercase tracking-widest text-sm transition-colors hover:bg-[#7e1b84] disabled:opacity-70 disabled:cursor-not-allowed"
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