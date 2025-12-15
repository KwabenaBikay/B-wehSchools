'use client';

import { useState } from 'react';
import Image from 'next/image';
import Masonry from 'react-masonry-css';
import { FaTimes, FaSearchPlus } from 'react-icons/fa';

// --- DATA CONFIGURATION ---
const GALLERY_ITEMS = [
  { id: 1, src: '/images/gallery/image-1.jpg', category: 'Academics', caption: 'Art Exhibition' },
  { id: 2, src: '/images/gallery/image-2.jpg', category: 'Events', caption: 'Art Exhibition' },
  { id: 3, src: '/images/gallery/image-3.jpg', category: 'Sports', caption: 'Annual Sports Day Competition' },
  { id: 4, src: '/images/gallery/image-4.jpg', category: 'Facilities', caption: 'OArt Exhibition' },
  { id: 5, src: '/images/gallery/image-5.jpg', category: 'Academics', caption: 'SArt Exhibition' },
  { id: 6, src: '/images/gallery/image-6.jpg', category: 'Extracurricular', caption: 'Art Exhibition' },
  { id: 7, src: '/images/gallery/image-7.jpg', category: 'Extracurricular', caption: 'Creative Arts Session' },
  { id: 8, src: '/images/gallery/image-8.jpg', category: 'Extracurricular', caption: 'Art Exhibition' },
  { id: 9, src: '/images/gallery/image-9.jpg', category: 'Extracurricular', caption: 'Art Exhibition' },
  { id: 10, src: '/images/gallery/image-10.jpg', category: 'Extracurricular', caption: 'Art Exhibition' },
  { id: 11, src: '/images/gallery/image-11.jpg', category: 'Extracurricular', caption: 'Art Exhibition' },
  { id: 12, src: '/images/gallery/image-12.jpg', category: 'Extracurricular', caption: 'Art Exhibition' },
  { id: 13, src: '/images/gallery/image-13.jpg', category: 'Extracurricular', caption: 'Art Exhibition' },
  { id: 14, src: '/images/gallery/image-14.jpg', category: 'Extracurricular', caption: 'Art Exhibition' },
  { id: 15, src: '/images/gallery/image-15.jpg', category: 'Extracurricular', caption: 'Art Exhibition' },
  { id: 16, src: '/images/gallery/image-16.jpg', category: 'Extracurricular', caption: 'Art Exhibition' },
];

// Pinterest Layout Configuration
// This tells the grid how many columns to show at different screen widths
const breakpointColumnsObj = {
  default: 4,   // 4 Columns on huge screens
  1280: 3,      // 3 Columns on standard desktops
  1024: 3,      // 3 Columns on laptops
  768: 2,       // 2 Columns on tablets
  640: 1        // 1 Column on phones
};

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<typeof GALLERY_ITEMS[0] | null>(null);

  return (
    <div className="min-h-screen bg-fuchsia-50 pt-32 pb-20">
      {/* Added global styles strictly for the Masonry layout gutters */}
      <style jsx global>{`
        .my-masonry-grid {
          display: flex;
          margin-left: -24px; /* Gutter size offset */
          width: auto;
        }
        .my-masonry-grid_column {
          padding-left: 24px; /* Gutter size */
          background-clip: padding-box;
        }
      `}</style>

      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        
        {/* --- HEADER --- */}
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold uppercase tracking-wider text-fuchsia-500">
            Our Memories
          </h2>
          <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-[#7e1b84] sm:text-5xl">
            School Gallery
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
            A glimpse into the vibrant life, learning, and joy at B-Weh Schools Montessori.
          </p>
        </div>

        {/* --- PINTEREST MASONRY GRID --- */}
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {GALLERY_ITEMS.map((item) => (
            <div 
              key={item.id} 
              onClick={() => setSelectedImage(item)}
              // mb-6 adds the bottom spacing between items
              className="group relative cursor-pointer mb-6 overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
            >
              {/* Image Wrapper */}
              <div className="relative w-full">
                <Image
                  src={item.src}
                  alt={item.caption}
                  width={0}
                  height={0}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                  unoptimized={true} 
                />
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#7e1b84]/90 via-[#7e1b84]/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex flex-col justify-end p-6">
                <span className="inline-block w-max rounded-full bg-white/20 px-3 py-1 text-xs font-bold text-white backdrop-blur-md mb-2">
                   {item.category}
                </span>
                <p className="text-lg font-bold text-white leading-tight">
                   {item.caption}
                </p>
                <div className="absolute top-4 right-4 text-white opacity-0 -translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                    <FaSearchPlus size={20} />
                </div>
              </div>
            </div>
          ))}
        </Masonry>

        {/* --- LIGHTBOX MODAL --- */}
        {selectedImage && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 z-50 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/30"
            >
              <FaTimes size={24} />
            </button>

            <div className="relative max-h-[90vh] max-w-[90vw] overflow-hidden rounded-lg shadow-2xl">
              <Image
                src={selectedImage.src}
                alt={selectedImage.caption}
                width={1200}
                height={800}
                className="max-h-[85vh] w-auto object-contain"
                unoptimized={true}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-4 text-center text-white backdrop-blur-md">
                <h3 className="text-lg font-bold">{selectedImage.caption}</h3>
                <p className="text-sm text-fuchsia-200">{selectedImage.category}</p>
              </div>
            </div>

            <div 
                className="absolute inset-0 -z-10" 
                onClick={() => setSelectedImage(null)}
            ></div>
          </div>
        )}

      </div>
    </div>
  );
}