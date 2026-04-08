'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FaTimes, FaSearchPlus } from 'react-icons/fa';
// Make sure this path matches where you put the data file!
import { GALLERY_ITEMS, GALLERY_CATEGORIES, GalleryItem } from '../../data/galleryData';

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [filter, setFilter] = useState<string>('All');

  // Filter the images based on the selected tab
  const filteredGallery = filter === 'All' 
    ? GALLERY_ITEMS 
    : GALLERY_ITEMS.filter(item => item.category === filter);

  return (
    <div className="min-h-screen bg-white pt-32 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* --- PAGE HEADER (Lines Removed!) --- */}
        <div className="text-center mb-10 max-w-3xl mx-auto">
          <h2 className="text-sm font-bold uppercase tracking-widest text-[#7e1b84] mb-3">Our Memories</h2>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
            School Gallery
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 font-medium">
            A glimpse into the vibrant life, learning, and joy at B-Weh Schools Montessori.
          </p>
        </div>

        {/* --- CATEGORY FILTER TABS (Lines Removed!) --- */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {GALLERY_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 text-sm font-bold uppercase tracking-widest transition-all ${
                filter === cat 
                ? 'text-[#7e1b84] border-b-2 border-[#7e1b84]' 
                : 'text-gray-400 hover:text-slate-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* --- STRICT EDITORIAL GRID (Free, Borderless Images) --- */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredGallery.map((item, index) => (
            <div 
              key={item.id} 
              onClick={() => setSelectedImage(item)}
              // Removed the padding/background. Added a clean shadow and lift effect!
              className="group relative cursor-pointer overflow-hidden bg-slate-100 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Image Container: Removed borders! */}
              <div className="relative w-full aspect-[2/3]">
                <Image
                  src={item.src}
                  alt={item.caption}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  priority={index < 8} 
                  className="object-cover transition-transform duration-700 group-hover:scale-105" 
                />
                
                {/* Flat Hover Overlay */}
                <div className="absolute inset-0 bg-slate-900/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex flex-col items-center justify-center p-4 text-center">
                  <span className="inline-block border border-fuchsia-400/50 bg-black/50 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-fuchsia-300 mb-3">
                     {item.category}
                  </span>
                  <p className="text-sm font-bold text-white leading-snug">
                     {item.caption}
                  </p>
                  <div className="mt-4 text-fuchsia-400 opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                     <FaSearchPlus size={20} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* --- LIGHTBOX MODAL --- */}
        {selectedImage && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/95 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 z-50 rounded-none border border-white/20 bg-black/50 p-3 text-white transition-colors hover:bg-white hover:text-black"
            >
              <FaTimes size={24} />
            </button>

            <div className="relative max-h-[90vh] max-w-[90vw] overflow-hidden shadow-2xl focus:outline-none">
              <Image
                src={selectedImage.src}
                alt={selectedImage.caption}
                width={800} 
                height={1200}
                className="max-h-[85vh] w-auto object-contain bg-black"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-slate-900/90 p-4 text-center border-t border-white/10">
                <h3 className="text-lg font-bold text-white">{selectedImage.caption}</h3>
                <p className="text-sm font-bold tracking-widest uppercase text-fuchsia-400 mt-1">{selectedImage.category}</p>
              </div>
            </div>

            <div 
                className="absolute inset-0 -z-10 cursor-zoom-out" 
                onClick={() => setSelectedImage(null)}
            ></div>
          </div>
        )}

      </div>
    </div>
  );
}