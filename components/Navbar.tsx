'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { FaLock, FaChevronDown } from 'react-icons/fa';

// --- NAVIGATION CONFIGURATION ---
const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { 
    label: 'Academics', 
    href: '#', 
    children: [
      { href: '/robotics', label: 'Robotics & AI Lab' },
    ]
  },
  { href: '/staff', label: 'Our Staff' },
  { href: '/admissions', label: 'Admissions' },
  { href: '/student-spotlight', label: 'Spotlight' }, 
  { href: '/gallery', label: 'Gallery' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState<string | null>(null);

  const pagesWithDarkHero = ['/', '/robotics'];
  const hasDarkHero = pagesWithDarkHero.includes(pathname);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const useLightMode = hasDarkHero && !scrolled;

  const toggleMobileDropdown = (label: string) => {
    if (mobileDropdownOpen === label) {
      setMobileDropdownOpen(null);
    } else {
      setMobileDropdownOpen(label);
    }
  };

  return (
    <header 
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="mx-auto flex max-w-[98%] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        
        {/* --- LEFT: Logo --- */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className={`h-16 w-16 overflow-hidden rounded-md border p-1 backdrop-blur-sm shadow-lg transition-colors duration-300 ${
            useLightMode
              ? 'border-white/30 bg-white/10' 
              : 'border-fuchsia-100 bg-fuchsia-50' 
          }`}>
            <Image
              src="/logo.png"
              alt="B-Weh Logo"
              width={70}
              height={70}
              className="h-full w-full object-contain"
              priority
            />
          </div>
          
          <div className="flex flex-col justify-center">
            <span className={`text-[10px] font-bold uppercase tracking-[0.2em] transition-colors duration-300 ${
              useLightMode ? 'text-white/90' : 'text-slate-500'
            }`}>
              B-Weh Schools
            </span>
            <span className={`text-xl font-bold leading-none drop-shadow-md transition-colors duration-300 ${
              useLightMode ? 'text-white' : 'text-[#7e1b84]' 
            }`}>
              Montessori
            </span>
          </div>
        </Link>

        {/* --- CENTER: Navigation (Desktop) --- */}
        <nav className="hidden xl:flex flex-1 items-center justify-center">
          <div className={`flex items-center gap-1 rounded-full px-8 py-4 text-sm font-semibold shadow-xl transition-all duration-300 ${
            useLightMode
              ? 'bg-white/95 text-slate-700 shadow-slate-900/10'
              : 'bg-[#7e1b84] text-white shadow-fuchsia-900/20'
          }`}>
            {NAV_LINKS.map((link) => {
              const hasDropdown = link.children && link.children.length > 0;
              const isActive = pathname === link.href || (hasDropdown && link.children?.some(c => c.href === pathname));

              return (
                <div key={link.label} className="relative group/dropdown">
                  {hasDropdown ? (
                    <button 
                      className={`flex items-center gap-1 px-4 py-2 transition-colors ${
                        useLightMode 
                          ? 'hover:text-[#7e1b84]' 
                          : 'hover:text-fuchsia-200'
                      } ${isActive && !useLightMode ? 'text-fuchsia-200 underline decoration-2 underline-offset-4' : ''}`}
                    >
                      {link.label} <FaChevronDown size={10} />
                    </button>
                  ) : (
                    <Link
                      href={link.href}
                      className={`block px-4 py-2 transition-colors ${
                        useLightMode 
                          ? (isActive ? 'text-[#7e1b84]' : 'hover:text-[#7e1b84]') 
                          : (isActive ? 'text-fuchsia-200 underline decoration-2 underline-offset-4' : 'hover:text-fuchsia-200')
                      }`}
                    >
                      {link.label}
                    </Link>
                  )}

                  {/* DROPDOWN MENU */}
                  {hasDropdown && (
                    <div className="absolute left-1/2 top-full mt-4 w-56 -translate-x-1/2 opacity-0 invisible transform translate-y-2 transition-all duration-200 group-hover/dropdown:opacity-100 group-hover/dropdown:visible group-hover/dropdown:translate-y-0">
                      {/* Squared Edges (rounded-none) */}
                      <div className={`overflow-hidden shadow-2xl ring-1 ring-black/5 rounded-none transition-colors duration-300 ${
                        useLightMode ? 'bg-white' : 'bg-[#7e1b84] border border-fuchsia-400/30'
                      }`}>
                        {link.children?.map((child) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            className={`block px-6 py-3 text-sm border-b last:border-none transition-colors ${
                              useLightMode 
                                ? 'text-gray-700 hover:bg-gray-50 hover:text-[#7e1b84] border-gray-100'
                                : 'text-white hover:bg-white hover:text-[#7e1b84] border-white/10'
                            }`}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </nav>

        {/* --- RIGHT: Portal Button --- */}
        <div className="flex items-center gap-2">
          <Link
            href="https://sms.bwehschools.com/login"
            target="_blank"
            className={`hidden items-center gap-2 rounded-md px-5 py-3 text-sm font-bold shadow-xl transition-all duration-300 transform hover:-translate-y-1 lg:inline-flex ${
              useLightMode
                ? 'bg-white text-[#7e1b84] shadow-fuchsia-900/10 hover:bg-fuchsia-50' 
                : 'bg-[#7e1b84] text-white shadow-fuchsia-900/20 hover:bg-[#6b1670]' 
            }`}
          >
            <FaLock className="mb-0.5" /> <span className="hidden lg:inline">School Portal</span>
          </Link>
          
          <button
            onClick={() => setOpen((v) => !v)}
            className={`inline-flex items-center justify-center rounded-md border p-2 shadow-sm xl:hidden transition-colors duration-300 ${
              useLightMode 
                ? 'border-slate-200 bg-white/80 text-slate-700'
                : 'border-fuchsia-200 bg-white text-[#7e1b84]' 
            }`}
          >
            <span className="sr-only">Open menu</span>
            <div className="space-y-1.5">
              <span className="block h-0.5 w-6 bg-current" />
              <span className="block h-0.5 w-6 bg-current" />
              <span className="block h-0.5 w-6 bg-current" />
            </div>
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="fixed inset-0 top-[88px] z-40 overflow-y-auto bg-white xl:hidden animate-in slide-in-from-top-10 duration-200">
          <div className="flex flex-col gap-1 p-6 text-base font-medium text-slate-700">
            {NAV_LINKS.map((link) => {
               const hasDropdown = link.children && link.children.length > 0;
               if (hasDropdown) {
                 return (
                   <div key={link.label} className="border-b border-slate-100 pb-2">
                     <button 
                        onClick={() => toggleMobileDropdown(link.label)}
                        className="flex w-full items-center justify-between py-3 hover:text-[#7e1b84]"
                     >
                        {link.label}
                        <FaChevronDown className={`transition-transform ${mobileDropdownOpen === link.label ? 'rotate-180' : ''}`} size={12} />
                     </button>
                     {mobileDropdownOpen === link.label && (
                        <div className="ml-4 flex flex-col gap-2 border-l-2 border-fuchsia-100 pl-4">
                          {link.children?.map(child => (
                             <Link 
                               key={child.label} 
                               href={child.href}
                               onClick={() => setOpen(false)}
                               className="py-2 text-sm text-slate-600 hover:text-[#7e1b84]"
                             >
                               {child.label}
                             </Link>
                          ))}
                        </div>
                     )}
                   </div>
                 );
               }
               return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-slate-100 py-3 hover:text-[#7e1b84]"
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="mt-6">
                <Link
                href="https://sms.bwehschool.com/login"
                target="_blank"
                onClick={() => setOpen(false)}
                className="flex w-full items-center justify-center gap-2 rounded-md bg-[#7e1b84] px-4 py-4 text-center text-sm font-semibold text-white shadow-sm hover:bg-[#6b1670]"
                >
                <FaLock className="mb-0.5" /> Log into Portal
                </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}