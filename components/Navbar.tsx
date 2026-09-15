'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { FaLock, FaChevronDown, FaTimes, FaBars } from 'react-icons/fa';

// --- NAVIGATION CONFIGURATION ---
const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  {
    label: 'Academics',
    href: '#',
    children: [
      // Shortened to just "Robotics"
      { href: '/robotics', label: 'Robotics' },
      { href: '/pre-school', label: 'Pre-School' },
      { href: '/primary', label: 'Primary' },
      { href: '/jhs', label: 'JHS' },
      { href: '/shs', label: 'SHS' },
    ]
  },
  { href: '/staff', label: 'Our Team' },
  { href: '/admissions', label: 'Admissions' },
  { href: '/student-spotlight', label: 'Spotlight' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/blog', label: 'News' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  const pagesWithDarkHero = ['/', '/robotics'];
  const hasDarkHero = pagesWithDarkHero.includes(pathname);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const useLightMode = hasDarkHero && !scrolled && !open;

  useEffect(() => {
    setOpen(false);
    setMobileDropdownOpen(null);
  }, [pathname]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('nav-open', open);
    return () => document.body.classList.remove('nav-open');
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    const onResize = () => {
      if (window.matchMedia('(min-width: 1280px)').matches) setOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('resize', onResize);
    };
  }, [open]);

  const toggleMobileDropdown = (label: string) => {
    if (mobileDropdownOpen === label) {
      setMobileDropdownOpen(null);
    } else {
      setMobileDropdownOpen(label);
    }
  };

  return (
    <>
    <header
      className={`fixed inset-x-0 top-0 z-[80] transition-all duration-300 ${scrolled || open ? 'bg-white shadow-sm py-3' : 'bg-transparent py-3 sm:py-5'
        }`}
    >
      <div className="mx-auto flex max-w-[98%] items-center justify-between gap-3 px-4 sm:gap-4 sm:px-6 lg:px-8">

        {/* --- LEFT: Logo --- */}
        <Link href="/" className="flex min-w-0 items-center gap-2 sm:gap-3 group" onClick={() => setOpen(false)}>
          <div className={`h-11 w-11 sm:h-16 sm:w-16 shrink-0 overflow-hidden rounded-none border p-1 transition-colors duration-300 ${useLightMode
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

          <div className="flex min-w-0 flex-col justify-center">
            <span className={`text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.14em] sm:tracking-[0.2em] transition-colors duration-300 ${useLightMode ? 'text-white/90' : 'text-slate-500'
              }`}>
              B-weh Schools
            </span>
            <span className={`text-base sm:text-xl font-bold leading-none drop-shadow-md transition-colors duration-300 ${useLightMode ? 'text-white' : 'text-[#7e1b84]'
              }`}>
              Montessori
            </span>
          </div>
        </Link>

        {/* --- CENTER: Navigation (Desktop) --- */}
        <nav className="hidden xl:flex flex-1 items-center justify-center">
          <div className={`flex items-center gap-1 rounded-none px-8 py-4 text-base font-semibold shadow-xl transition-all duration-300 ${useLightMode
            ? 'bg-white/95 text-slate-700 shadow-slate-900/10'
            : 'bg-gradient-to-br from-[#9c27b0] to-[#7e1b84] shadow-lg shadow-purple-900/30 text-white shadow-fuchsia-900/20'
            }`}>
            {NAV_LINKS.map((link) => {
              const hasDropdown = link.children && link.children.length > 0;
              const isActive = pathname === link.href || (hasDropdown && link.children?.some(c => c.href === pathname));

              return (
                <div key={link.label} className="relative group/dropdown">
                  {hasDropdown ? (
                    <button
                      className={`flex items-center gap-1 px-4 py-2 transition-colors ${useLightMode
                        ? 'hover:text-[#7e1b84]'
                        : 'hover:text-fuchsia-200'
                        } ${isActive && !useLightMode ? 'text-fuchsia-200 underline decoration-2 underline-offset-4' : ''}`}
                    >
                      {link.label} <FaChevronDown size={10} />
                    </button>
                  ) : (
                    <Link
                      href={link.href}
                      className={`block px-4 py-2 transition-colors ${useLightMode
                        ? (isActive ? 'text-[#7e1b84]' : 'hover:text-[#7e1b84]')
                        : (isActive ? 'text-fuchsia-200 underline decoration-2 underline-offset-4' : 'hover:text-fuchsia-200')
                        }`}
                    >
                      {link.label}
                    </Link>
                  )}

                  {/* DROPDOWN MENU */}
                  {hasDropdown && (
                    <div
                      // Reduced width from w-[420px] to w-[320px] to close the gap
                      className={`absolute left-1/2 top-full mt-4 -translate-x-1/2 opacity-0 invisible transform translate-y-2 transition-all duration-200 group-hover/dropdown:opacity-100 group-hover/dropdown:visible group-hover/dropdown:translate-y-0 ${link.label === 'Academics' ? 'w-[320px]' : 'w-56'
                        }`}
                    >
                      <div className={`overflow-hidden shadow-2xl ring-1 ring-black/5 rounded-none p-2 transition-colors duration-300 ${useLightMode ? 'bg-white' : 'bg-gradient-to-br from-[#9c27b0] to-[#7e1b84] shadow-lg shadow-purple-900/30 border border-fuchsia-400/30'
                        }`}>

                        <div className={link.label === 'Academics' ? 'grid grid-flow-col grid-rows-3 gap-x-2 gap-y-1' : 'flex flex-col'}>
                          {link.children?.map((child) => (
                            <Link
                              key={child.label}
                              href={child.href}
                              // Updated Hover Logic: Purple on White Navbar, White on Purple Navbar
                              className={`block px-4 py-3 text-sm rounded-sm transition-colors ${useLightMode
                                  ? 'text-slate-700 hover:bg-[#7e1b84] hover:text-white'
                                  : 'text-white hover:bg-white hover:text-[#7e1b84]'
                                }`}
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>

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
            rel="noopener noreferrer"
            className={`hidden items-center gap-2 rounded-none px-5 py-3 text-sm font-bold transition-colors duration-300 lg:inline-flex ${useLightMode
              ? 'bg-white text-[#7e1b84] hover:bg-fuchsia-50'
              : 'bg-gradient-to-br from-[#9c27b0] to-[#7e1b84] text-white hover:bg-[#6b1670]'
              }`}
          >
            <FaLock className="mb-0.5" /> <span className="hidden lg:inline">School Portal</span>
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
            className={`inline-flex h-11 w-11 items-center justify-center rounded-none border xl:hidden transition-colors duration-300 ${useLightMode
              ? 'border-white/40 bg-white/80 text-slate-700'
              : 'border-fuchsia-200 bg-white text-[#7e1b84]'
              }`}
          >
            {open ? <FaTimes size={18} /> : <FaBars size={18} />}
          </button>
        </div>
      </div>
    </header>

      {mounted &&
        open &&
        createPortal(
          <div className="fixed inset-0 z-[70] h-[100dvh] w-full xl:hidden">
            <button
              type="button"
              aria-label="Close menu"
              className="absolute inset-0 bg-slate-900/40"
              onClick={() => setOpen(false)}
            />
            <nav
              className="absolute inset-x-0 top-[72px] h-[calc(100dvh-72px)] overflow-y-auto bg-white text-slate-800 shadow-lg"
              aria-label="Mobile"
            >
              <div className="flex flex-col gap-1 px-5 pb-[max(2rem,env(safe-area-inset-bottom))] pt-2 text-base font-medium">
                {NAV_LINKS.map((link) => {
                  const hasDropdown = link.children && link.children.length > 0;
                  if (hasDropdown) {
                    return (
                      <div key={link.label} className="border-b border-slate-100 pb-2">
                        <button
                          type="button"
                          onClick={() => toggleMobileDropdown(link.label)}
                          className="flex min-h-12 w-full items-center justify-between py-3.5 hover:text-[#7e1b84]"
                        >
                          {link.label}
                          <FaChevronDown className={`transition-transform ${mobileDropdownOpen === link.label ? 'rotate-180' : ''}`} size={12} />
                        </button>
                        {mobileDropdownOpen === link.label && (
                          <div className="ml-4 flex flex-col gap-2 border-l-2 border-fuchsia-100 pl-4">
                            {link.children?.map((child) => (
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
                      className="flex min-h-12 items-center border-b border-slate-100 py-3.5 hover:text-[#7e1b84]"
                    >
                      {link.label}
                    </Link>
                  );
                })}
                <div className="mt-6">
                  <Link
                    href="https://sms.bwehschools.com/login"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setOpen(false)}
                    className="flex w-full items-center justify-center gap-2 rounded-none bg-gradient-to-br from-[#9c27b0] to-[#7e1b84] px-4 py-4 text-center text-sm font-semibold text-white hover:bg-[#6b1670]"
                  >
                    <FaLock className="mb-0.5" /> Log into Portal
                  </Link>
                </div>
              </div>
            </nav>
          </div>,
          document.body
        )}
    </>
  );
}