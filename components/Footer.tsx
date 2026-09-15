import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import { FaLinkedinIn, FaInstagram, FaTiktok, FaFacebookF, FaYoutube, FaWhatsapp } from "react-icons/fa6";

export default function Footer() {
  return (
    // Background to the specific Red-Purple from your image (#7e1b84)
    <footer className="bg-gradient-to-br from-[#9c27b0] to-[#7e1b84] shadow-lg shadow-purple-900/30 text-white pt-12 pb-10 sm:pt-20 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-4 lg:gap-8">

          {/* Column 1: Brand Info */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3">
              <div className="h-12 w-12 overflow-hidden rounded-lg bg-white/10 p-1.5 backdrop-blur-sm">
                <Image
                  src="/logo.png"
                  alt="B-Weh Logo"
                  width={48}
                  height={48}
                  className="h-full w-full object-contain"
                />
              </div>
              <span className="text-xl font-bold tracking-tight">B-weh<br />Montessori</span>
            </Link>
            {/* Using fuchsia-100 because it matches Red-Purple better than blue-purple */}
            <p className="mt-6 text-sm text-fuchsia-100 leading-relaxed">
              Nurturing confident, curious, and compassionate learners for a changing world.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-fuchsia-200">Quick Links</h3>
            <ul className="mt-4 space-y-3">
              <li><Link href="/about" className="text-sm hover:text-white hover:underline transition-all">About Us</Link></li>
              <li><Link href="/admissions" className="text-sm hover:text-white hover:underline transition-all">Admissions</Link></li>
              <li><Link href="/staff" className="text-sm hover:text-white hover:underline transition-all">Our Team</Link></li>
              <li><Link href="/gallery" className="text-sm hover:text-white hover:underline transition-all">School Gallery</Link></li>
              {/* I added the Blog/News link right here! */}
              <li><Link href="/blog" className="text-sm hover:text-white hover:underline transition-all">School News</Link></li>
              <li><Link href="/faq" className="text-gray-300 hover:text-white transition-colors"> FAQs</Link></li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-fuchsia-200">Contact Us</h3>
            <ul className="mt-4 space-y-3">
              <li className="flex gap-3 text-sm text-fuchsia-100">
                <span> </span>
                <span>CP Junction, Kasoa,<br />Central Region, Ghana</span>
              </li>
              <li className="flex gap-3 text-sm text-fuchsia-100">
                <span> </span>
                <a href="tel:+233549753104" className="hover:text-white">+233 54 975 3104</a>
              </li>
              <li className="flex gap-3 text-sm text-fuchsia-100">
                <span> </span>
                <a href="mailto:bwehschools@gmail.com" className="hover:text-white">bwehschools@gmail.com</a>
              </li>
            </ul>
          </div>

          {/* Column 4: Portal */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-fuchsia-200">Staff & Parents</h3>
            <p className="mt-4 text-xs text-fuchsia-100 mb-4">Access the school management system.</p>
            <Link
              href="https://sms.bwehschools.com/login"
              target="_blank"
              rel="noopener noreferrer"
              // Text color to match the new background
              className="inline-block rounded-none bg-white px-6 py-3 text-sm font-bold text-[#7e1b84] shadow-lg transition-transform hover:-translate-y-1 hover:text-black hover:shadow-xl"
            >
              Log into Portal
            </Link>
          </div>
        </div>

        {/* --- BOTTOM BAR --- */}
        <div className="mt-16 border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">

            {/* Copyright */}
            <p className="text-xs text-fuchsia-200 text-center md:text-left">
              &copy; {new Date().getFullYear()} B-Weh Schools Montessori. All rights reserved.
            </p>

            {/* Social Media Icons */}
            <div className="flex gap-4">
              <SocialLink href="https://www.linkedin.com/company/b-weh-schools/posts/?feedView=all" icon={<FaLinkedinIn />} />
              <SocialLink href="https://www.instagram.com/bwehschools?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" icon={<FaInstagram />} />
              <SocialLink href="https://www.tiktok.com/@bwehschools?_r=1&_t=ZM-91y7U4wA58u" icon={<FaTiktok />} />
              <SocialLink href="https://www.youtube.com/@B-WEHSCHOOLSGH" icon={<FaYoutube />} />
              <SocialLink href="#" icon={<FaFacebookF />} />
            </div>
          </div>
        </div>
      </div>

      {/* --- FLOATING WHATSAPP BUTTON --- */}
      <a
        href="https://wa.me/+233549753104"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl transition-transform hover:scale-110 hover:bg-[#20bd5a] sm:bottom-6 sm:right-6"
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp className="h-8 w-8" />
      </a>

    </footer>
  );
}

// Helper Component
function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      //Hover text color to the new Red-Purple
      className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-white hover:text-[#7e1b84] hover:-translate-y-1"
    >
      {icon}
    </a>
  );
}