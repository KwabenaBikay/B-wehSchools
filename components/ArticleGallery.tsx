'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface ArticleGalleryProps {
  images: string[];
  title: string;
}

export default function ArticleGallery({ images, title }: ArticleGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (!images || images.length === 0) return null;

  return (
    // I set this container to a light slate color so vertical/horizontal images have a nice backdrop
    <div className="relative w-full h-full min-h-[350px] bg-slate-100 border border-gray-200 group flex items-center justify-center">
      
      {/* object-contain ensures the image is NEVER cropped! */}
      <Image
        src={images[currentIndex]}
        alt={`${title} - Image ${currentIndex + 1}`}
        fill
        className="object-contain p-4 transition-opacity duration-500"
        priority
      />

      {/* Slider Controls (Only show if there is more than 1 image) */}
      {images.length > 1 && (
        <>
          <button
            onClick={prevImage}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-[#7e1b84] text-white p-3 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
            aria-label="Previous image"
          >
            <FaChevronLeft size={16} />
          </button>
          
          <button
            onClick={nextImage}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-[#7e1b84] text-white p-3 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
            aria-label="Next image"
          >
            <FaChevronRight size={16} />
          </button>

          {/* Image Counter (e.g., 1 / 3) */}
          <div className="absolute bottom-2 right-2 bg-black/70 px-3 py-1 text-xs font-bold tracking-widest text-white uppercase">
            {currentIndex + 1} / {images.length}
          </div>
        </>
      )}
    </div>
  );
}