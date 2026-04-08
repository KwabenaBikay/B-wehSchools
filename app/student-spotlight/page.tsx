'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FaPenNib, FaTimes, FaChevronLeft, FaChevronRight, FaQuoteLeft } from 'react-icons/fa';

// --- DATA CONFIGURATION ---
const SPOTLIGHT_ITEMS = [
  {
    id: 1,
    type: 'achievement',
    category: 'Sports', // We keep the tag for the visual badge, but no more filtering!
    title: 'Overall Sports Winner',
    student: 'Elvis',
    grade: 'Grade 2',
    images: [
        '/images/spotlight/elvis.jpg',
    ],
    description: 'Congratulations to Elvis for securing 1st place in Sports Week at B-weh Schools.',
    fullContent: 'His exceptional performance across multiple sport activities including (add the specific sports) have truly paid off. We are incredibly proud of his achievement'
  },
  {
    id: 2,
    type: 'art',
    category: 'Exhibition',
    title: 'Art and Exhibition',
    student: 'Victory Asante',
    grade: 'Kindergarten 2',
    images: [
        '/images/spotlight/art.jpg', 
    ],
    description: 'We had our maiden Art and Exhibition Day', 
    fullContent: 'Victory captured the warmth of the Ghanaian sunset over the sea beautifully, which was featured in our exhibition. We are proud to showcase her creativity.' 
  },
  {
    id: 3,
    type: 'essay',
    category: 'Writing',
    title: 'Writing',
    student: 'Sarah Johnson',
    grade: 'Nursery 2',
    images: [
      '/images/spotlight/write.jpg', 
    ], 
    description: 'An award-winning persuasive essay on environmental conservation.',
    fullContent: 'The ocean is the heart of our planet. It regulates climate, feeds millions, and produces the oxygen we breathe. Yet, we treat it as a dumping ground. In this essay, I explore three key ways students can reduce plastic waste...'
  },
  {
    id: 4,
    type: 'science',
    category: 'Nature',
    title: 'Nature and Plant Care',
    student:'All Learners',
    grade: 'Mixed Grades',
    images: [
        '/images/spotlight/plant.2.jpg',
        '/images/spotlight/plant.jpg',
        '/images/spotlight/plant.3.jpg',
    ],
    description: 'Moments from our Nature & Plant Care Activity.',
    fullContent: 'The learners explored different gardening tools, soil types, and seeds. Each class planted something unique tomatoes, onions, okra, pepper, garden eggs, and more then watered their plants with so much excitement. This activity helps them learn responsibility, teamwork, and appreciation for nature.'
  },
];

export default function StudentSpotlightPage() {
  const [selectedItem, setSelectedItem] = useState<typeof SPOTLIGHT_ITEMS[0] | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Handle opening modal
  const handleOpenModal = (item: typeof SPOTLIGHT_ITEMS[0]) => {
      setSelectedItem(item);
      setCurrentImageIndex(0);
  }

  // Carousel navigation
  const nextImage = () => {
    if (!selectedItem) return;
    setCurrentImageIndex((prev) => (prev + 1) % selectedItem.images.length);
  }

  const prevImage = () => {
    if (!selectedItem) return;
    setCurrentImageIndex((prev) => (prev - 1 + selectedItem.images.length) % selectedItem.images.length);
  }

  return (
    <div className="min-h-screen bg-white pt-32 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* --- HEADER --- */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-sm font-bold uppercase tracking-widest text-[#7e1b84] mb-4">
            Hall of Fame
          </h2>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-6xl uppercase">
            Student Spotlight
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-500 font-medium leading-relaxed">
            Celebrating the talent, hard work, and brilliance of our amazing students.
          </p>
        </div>

        {/* --- CONTENT GRID (Feature Poster Style - No Filters) --- */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SPOTLIGHT_ITEMS.map((item) => (
            <div 
              key={item.id}
              onClick={() => handleOpenModal(item)}
              // Tall, immersive cards with no borders
              className="group relative h-[450px] w-full cursor-pointer overflow-hidden bg-slate-900"
            >
              
              {/* IMAGE BACKGROUND */}
              {item.type === 'essay' ? (
                <div className="absolute inset-0 bg-[#7e1b84] flex items-center justify-center p-8 transition-transform duration-700 group-hover:scale-105">
                   <FaQuoteLeft className="text-9xl text-white/10 absolute top-10 left-10" />
                </div>
              ) : (
                <Image
                  src={item.images[0] || ''} 
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover opacity-80 transition-transform duration-700 group-hover:scale-110 group-hover:opacity-100"
                />
              )}
              
              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />

              {/* Floating Category Badge (Still useful for context!) */}
              <div className="absolute top-6 left-6 bg-white/10 backdrop-blur-md px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white">
                {item.category}
              </div>

              {/* CARD CONTENT */}
              <div className="absolute bottom-0 left-0 w-full p-8 translate-y-4 transition-transform duration-500 group-hover:translate-y-0">
                <div className="flex items-center gap-2 mb-3">
                   <p className="text-xs font-bold uppercase tracking-widest text-fuchsia-400">{item.student}</p>
                   <span className="text-white/30">•</span>
                   <p className="text-xs font-bold uppercase tracking-widest text-slate-300">{item.grade}</p>
                </div>
                
                <h3 className="text-3xl font-bold text-white mb-3 leading-tight drop-shadow-md">
                  {item.title}
                </h3>
                
                <p className="text-sm text-slate-300 line-clamp-2 font-medium opacity-80 transition-opacity duration-500 group-hover:opacity-100">
                  {item.description}
                </p>
              </div>

            </div>
          ))}
        </div>

        {/* --- DETAIL MODAL --- */}
        {selectedItem && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/95 backdrop-blur-md p-4 animate-in fade-in duration-200">
             
             <div className="relative w-full max-w-5xl max-h-[95vh] overflow-y-auto bg-white flex flex-col lg:flex-row shadow-2xl">
                
                <button 
                  onClick={() => setSelectedItem(null)}
                  className="absolute top-4 right-4 z-50 bg-white p-3 text-slate-400 hover:text-slate-900 transition-colors shadow-sm"
                >
                  <FaTimes size={24} />
                </button>

                {/* MODAL LEFT: IMAGE CAROUSEL */}
                <div className="relative w-full lg:w-3/5 min-h-[400px] lg:min-h-full bg-slate-50 flex items-center justify-center p-4">
                  {selectedItem.type === 'essay' ? (
                     <div className="text-center p-12">
                       <FaPenNib className="mx-auto text-6xl text-slate-200 mb-6" />
                       <h3 className="font-serif text-4xl font-bold text-slate-900">"{selectedItem.title}"</h3>
                     </div>
                  ) : (
                    <>
                      <div className="relative w-full h-full min-h-[400px]">
                        <Image
                          src={selectedItem.images[currentImageIndex]}
                          alt={`${selectedItem.title} image`}
                          fill
                          className="object-contain animate-in fade-in duration-300"
                        />
                      </div>

                      {/* ALWAYS VISIBLE Navigation Arrows */}
                      {selectedItem.images.length > 1 && (
                        <>
                            <button 
                                onClick={prevImage}
                                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm shadow-lg p-4 text-slate-900 transition-transform hover:scale-110 hover:bg-white"
                            >
                                <FaChevronLeft size={20} />
                            </button>
                            <button 
                                onClick={nextImage}
                                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm shadow-lg p-4 text-slate-900 transition-transform hover:scale-110 hover:bg-white"
                            >
                                <FaChevronRight size={20} />
                            </button>
                            
                            {/* Indicator Dots */}
                            <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-3">
                                {selectedItem.images.map((_, index) => (
                                    <div 
                                        key={index}
                                        className={`h-2 shadow-sm transition-all ${index === currentImageIndex ? 'bg-[#7e1b84] w-8' : 'bg-slate-300 w-4'}`}
                                    ></div>
                                ))}
                            </div>
                        </>
                      )}
                    </>
                  )}
                </div>

                {/* MODAL RIGHT: CONTENT */}
                <div className="w-full lg:w-2/5 p-10 lg:p-14 flex flex-col bg-white justify-center">
                   <div className="mb-8">
                      {/* Using the category here as a simple context tag, not a filter */}
                      <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-fuchsia-500 mb-4">
                        {selectedItem.category}
                      </span>
                      <h2 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight leading-none">{selectedItem.title}</h2>
                      <p className="text-sm font-bold uppercase tracking-widest text-[#7e1b84]">By {selectedItem.student} <span className="text-gray-300 mx-2">|</span> {selectedItem.grade}</p>
                   </div>

                   <div className="prose prose-slate max-w-none flex-grow">
                      <p className="text-xl font-medium text-slate-800 mb-6 leading-relaxed">{selectedItem.description}</p>
                      <p className="whitespace-pre-line text-slate-500 leading-relaxed text-lg">{selectedItem.fullContent || "No additional details provided."}</p>
                   </div>
                </div>

             </div>
             
             <div className="absolute inset-0 -z-10 cursor-zoom-out" onClick={() => setSelectedItem(null)}></div>
          </div>
        )}

      </div>
    </div>
  );
}