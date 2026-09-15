'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { createPortal } from 'react-dom';
import Masonry from 'react-masonry-css';
import { FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa';
import { GALLERY_ITEMS, GALLERY_CATEGORIES, GalleryItem } from '../../data/galleryData';

function GalleryPhoto({
  item,
  priority,
  onOpen,
}: {
  item: GalleryItem;
  priority: boolean;
  onOpen: () => void;
}) {
  const [ratio, setRatio] = useState(0.8);

  return (
    <button
      type="button"
      onClick={onOpen}
      className="group relative mb-3 block w-full overflow-hidden bg-slate-100 text-left sm:mb-4"
      aria-label={`View ${item.caption}`}
    >
      <div className="relative w-full" style={{ aspectRatio: ratio }}>
        <Image
          src={item.src}
          alt={item.caption}
          fill
          sizes="(max-width: 700px) 50vw, (max-width: 1100px) 33vw, 25vw"
          priority={priority}
          className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          onLoadingComplete={(img) => {
            if (img.naturalWidth && img.naturalHeight) {
              setRatio(img.naturalWidth / img.naturalHeight);
            }
          }}
        />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/70">
            {item.category}
          </p>
          <p className="mt-1 text-sm font-semibold leading-snug text-white">
            {item.caption}
          </p>
        </div>
      </div>
    </button>
  );
}

export default function GalleryPage() {
  const [filter, setFilter] = useState<string>('All');
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  const filteredGallery = filter === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === filter);

  const active = activeIndex !== null ? filteredGallery[activeIndex] : null;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setActiveIndex(null);
  }, [filter]);

  useEffect(() => {
    if (activeIndex === null) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveIndex(null);
      if (event.key === 'ArrowRight') {
        setActiveIndex((index) => (index === null ? index : (index + 1) % filteredGallery.length));
      }
      if (event.key === 'ArrowLeft') {
        setActiveIndex((index) => (
          index === null ? index : (index - 1 + filteredGallery.length) % filteredGallery.length
        ));
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [activeIndex, filteredGallery.length]);

  const showPrev = () => {
    setActiveIndex((index) => (
      index === null ? index : (index - 1 + filteredGallery.length) % filteredGallery.length
    ));
  };

  const showNext = () => {
    setActiveIndex((index) => (index === null ? index : (index + 1) % filteredGallery.length));
  };

  return (
    <div className="min-h-screen bg-[#fafafa] pt-28 pb-16 sm:pt-32 sm:pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="mx-auto mb-10 max-w-3xl text-center">
          <h2 className="mb-3 text-sm font-bold uppercase tracking-widest text-[#7e1b84]">Our Memories</h2>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
            School Gallery
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg font-medium text-gray-600">
            A glimpse into the vibrant life, learning, and joy at B-weh Schools Montessori.
          </p>
        </div>

        <div className="-mx-4 mb-8 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:mb-12 sm:flex-wrap sm:justify-center sm:gap-4 sm:overflow-visible sm:border-b sm:border-gray-200 sm:px-0 sm:pb-8">
          {GALLERY_CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFilter(cat)}
              className={`shrink-0 px-4 py-2 text-xs font-bold uppercase tracking-widest transition-all sm:px-6 sm:text-sm ${filter === cat
                ? 'border-b-2 border-[#7e1b84] text-[#7e1b84]'
                : 'text-gray-400 hover:text-slate-600'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <p className="mb-6 text-center text-xs font-semibold uppercase tracking-widest text-slate-400">
          {filteredGallery.length} photographs
        </p>

        <Masonry
          breakpointCols={{ default: 4, 1100: 3, 700: 2 }}
          className="flex w-auto -ml-3"
          columnClassName="pl-3 bg-clip-padding"
        >
          {filteredGallery.map((item, index) => (
            <GalleryPhoto
              key={item.id}
              item={item}
              priority={index < 8}
              onOpen={() => setActiveIndex(index)}
            />
          ))}
        </Masonry>

        {mounted &&
          active &&
          activeIndex !== null &&
          createPortal(
            <div className="fixed inset-0 z-[110] flex h-[100dvh] flex-col bg-black">
              <div className="flex items-center justify-between px-4 py-3 text-white sm:px-6">
                <p className="text-xs font-bold uppercase tracking-widest text-white/70">
                  {activeIndex + 1} / {filteredGallery.length}
                </p>
                <button
                  type="button"
                  onClick={() => setActiveIndex(null)}
                  aria-label="Close gallery"
                  className="flex h-11 w-11 items-center justify-center text-white/80 transition-colors hover:text-white"
                >
                  <FaTimes size={20} />
                </button>
              </div>

              <div className="relative min-h-0 flex-1 px-12 sm:px-16">
                {filteredGallery.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={showPrev}
                      aria-label="Previous photograph"
                      className="absolute left-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center text-white/80 transition-colors hover:text-white sm:left-6"
                    >
                      <FaChevronLeft size={22} />
                    </button>
                    <button
                      type="button"
                      onClick={showNext}
                      aria-label="Next photograph"
                      className="absolute right-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center text-white/80 transition-colors hover:text-white sm:right-6"
                    >
                      <FaChevronRight size={22} />
                    </button>
                  </>
                )}
                <Image
                  src={active.src}
                  alt={active.caption}
                  fill
                  sizes="100vw"
                  className="object-contain"
                  priority
                />
              </div>

              <div className="px-6 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-4 text-center">
                <h3 className="text-base font-semibold text-white sm:text-lg">{active.caption}</h3>
                <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.2em] text-white/50">
                  {active.category}
                </p>
              </div>
            </div>,
            document.body
          )}

      </div>
    </div>
  );
}
