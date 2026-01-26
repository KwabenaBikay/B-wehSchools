'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FaStar, FaPaintBrush, FaMicroscope, FaPenNib, FaTrophy, FaTimes, FaUser, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

// --- DATA CONFIGURATION ---
const SPOTLIGHT_ITEMS = [
  {
    id: 1,
    type: 'achievement',
    category: 'Sports',
    title: 'Overal Sports Winner',
    student: 'Elvis',
    grade: 'Grade 2',
    images: [
        '/images/spotlight/elvis.jpg',
        // Add extra photos:
        // '/images/spotlight/math-award.jpg',
    ],
    description: 'Elvis secured 1st place in the sports week of B-weh schools.',
    fullContent: 'Elvis has shown exceptional. His dedication. We are incredibly proud of his hard work.'
  },
  {
    id: 2,
    type: 'art',
    category: 'Creativity',
    title: 'Art and Exhibition',
    student: 'Nana Abena',
    grade: 'Kingdagateng 2',
    //'public/images/spotlight/art-sunset.jpg'
    images: [
        '/images/spotlight/art.jpg', 
    ],
    description: 'We had our maiden Art and Exhibition Day', 
    fullContent: 'Ama captured the warmth of the Ghanaian sunset beautifully using acrylics. This piece was selected among thousands of entries for the national exhibition.' 
  },
  {
    id: 3,
    type: 'essay',
    category: 'Writing',
    title: 'Writing',
    student: 'Sarah Johnson',
    grade: 'Nursery 2',
    // Essays usually look better without an image (using the paper icon style), 
    // but you can add one here if you really want to.
    images: [
      '/images/spotlight/write.jpg',
    ], 
    description: 'An award-winning persuasive essay on environmental conservation.',
    fullContent: 'The ocean is the heart of our planet. It regulates climate, feeds millions, and produces the oxygen we breathe. Yet, we treat it as a dumping ground. In this essay, I explore three key ways students can reduce plastic waste...'
  },
  {
    id: 4,
    type: 'science',
    category: 'Science & Tech',
    title: 'Nature and Plant Care',
    student:'All Learners',
    grade: 'Mixed Grades',
    //'public/images/spotlight/hydraulic-arm.jpg'
    images: [
        '/images/spotlight/plant.2.jpg',
        '/images/spotlight/plant.jpg',
        '/images/spotlight/plant.3.jpg',
    ],
    description: 'Moments from our Nature & Plant Care Activity.',
    fullContent: 'The learners explored different gardening tools, soil types, and seeds. Each class planted something unique tomatoes, onions, okra, pepper, garden eggs, and more then watered their plants with so much excitement. This activity helps them learn responsibility, teamwork, and appreciation for nature.'},
  {
    id: 5,
    type: 'achievement',
    category: 'Achievement',
    title: 'Best Speller 2024',
    student: 'Emmanuel Darko',
    grade: 'Grade 4',
    // CHANGE THIS: Matches 'public/images/spotlight/spelling-bee.jpg'
    images: [
        '/images/spotlight/spelling-bee.jpg'
    ],
    description: 'Emmanuel correctly spelled all 50 words to win the Inter-Class Spelling Bee.',
    fullContent: 'Emmanuel’s vocabulary has grown immensely this year. His favorite word to spell was "Chrysanthemum".'
  },
  {
    id: 6,
    type: 'art',
    category: 'Creativity',
    title: 'Recycled Sculpture',
    student: 'Creative Arts Class',
    grade: 'Grade 6',
    // CHANGE THIS: Matches 'public/images/spotlight/sculpture.jpg'
    images: [
        '/images/spotlight/sculpture.jpg'
    ],
    description: 'A life-size sculpture of a turtle made from collected plastic bottles.',
    fullContent: 'This sculpture raises awareness about plastic pollution. The students collected over 200 bottles from the school grounds to create this masterpiece.'
  },
];
const CATEGORIES = [
  { id: 'all', label: 'All Spotlights', icon: <FaStar /> },
  { id: 'Achievement', label: 'Achievements', icon: <FaTrophy /> },
  { id: 'Creativity', label: 'Arts & Creative', icon: <FaPaintBrush /> },
  { id: 'STEM', label: 'Science & Tech', icon: <FaMicroscope /> },
  { id: 'Writing', label: 'Essays', icon: <FaPenNib /> },
];

export default function StudentSpotlightPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedItem, setSelectedItem] = useState<typeof SPOTLIGHT_ITEMS[0] | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Filter Logic
  const filteredItems = activeFilter === 'all' 
    ? SPOTLIGHT_ITEMS 
    : SPOTLIGHT_ITEMS.filter(item => item.category === activeFilter);

  // Handle opening modal
  const handleOpenModal = (item: typeof SPOTLIGHT_ITEMS[0]) => {
      setSelectedItem(item);
      setCurrentImageIndex(0); // Reset to first image when opening
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
    <div className="min-h-screen bg-fuchsia-50 pt-32 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* --- HEADER --- */}
        <div className="text-center mb-12">
          <h2 className="text-sm font-bold uppercase tracking-wider text-fuchsia-500">
            Hall of Fame
          </h2>
          <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-[#7e1b84] sm:text-5xl">
            Student Spotlight
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
            Celebrating the talent, hard work, and brilliance of our amazing students.
          </p>
        </div>

        {/* --- FILTER TABS --- */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveFilter(cat.id)}
              className={`flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-bold transition-all ${
                activeFilter === cat.id
                  ? 'bg-[#7e1b84] text-white shadow-lg shadow-fuchsia-500/30'
                  : 'bg-white text-gray-600 hover:bg-fuchsia-100 hover:text-[#7e1b84]'
              }`}
            >
              {cat.icon} {cat.label}
            </button>
          ))}
        </div>

        {/* --- CONTENT GRID --- */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item) => (
            <div 
              key={item.id}
              onClick={() => handleOpenModal(item)}
              className="group relative cursor-pointer overflow-hidden rounded-2xl bg-white shadow-md transition-all hover:-translate-y-1 hover:shadow-xl"
            >
              
              {/* IMAGE SECTION */}
              <div className="relative h-56 w-full overflow-hidden bg-slate-100">
                {item.type === 'essay' ? (
                  // Essay "Paper" Look
                  <div className="flex h-full w-full flex-col items-center justify-center bg-[#fdfbf7] p-8 text-center border-b border-gray-200">
                     <FaPenNib className="text-4xl text-fuchsia-300 mb-3" />
                     <h3 className="font-serif text-xl font-bold text-slate-800 line-clamp-2">
                       "{item.title}"
                     </h3>
                     <p className="mt-2 text-xs font-bold uppercase tracking-wider text-[#7e1b84]">Read Essay</p>
                  </div>
                ) : (
                  // Standard Image Look - Uses first image
                  <Image
                    src={item.images[0] || ''} 
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    unoptimized={true}
                  />
                )}
                
                {/* Badge */}
                <div className="absolute top-4 left-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#7e1b84] shadow-sm">
                  {item.category}
                </div>
              </div>

              {/* CARD BODY */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                   <div className="h-8 w-8 rounded-full bg-fuchsia-100 flex items-center justify-center text-[#7e1b84]">
                      <FaUser size={12} />
                   </div>
                   <div>
                      <p className="text-sm font-bold text-slate-900">{item.student}</p>
                      <p className="text-xs text-fuchsia-500">{item.grade}</p>
                   </div>
                </div>
                
                {item.type !== 'essay' && (
                  <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-[#7e1b84] transition-colors">
                    {item.title}
                  </h3>
                )}
                
                <p className="text-sm text-gray-600 line-clamp-2">
                  {item.description}
                </p>
              </div>

            </div>
          ))}
        </div>

        {/* --- DETAIL MODAL WITH CAROUSEL --- */}
        {selectedItem && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
             <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl">
                
                {/* Close Button */}
                <button 
                  onClick={() => setSelectedItem(null)}
                  className="absolute top-4 right-4 z-20 rounded-full bg-black/20 p-2 text-white hover:bg-black/40 transition-colors"
                >
                  <FaTimes size={20} />
                </button>

                {/* --- MODAL HEADER: IMAGE CAROUSEL --- */}
                {selectedItem.images.length > 0 && (
                   <div className="relative h-80 w-full bg-slate-900 group/slider">
                      <Image
                        src={selectedItem.images[currentImageIndex]}
                        alt={`${selectedItem.title} image ${currentImageIndex + 1}`}
                        fill
                        className="object-contain animate-in fade-in duration-300"
                        unoptimized={true}
                      />

                      {/* Navigation Arrows (Only show if > 1 image) */}
                      {selectedItem.images.length > 1 && (
                        <>
                            <button 
                                onClick={prevImage}
                                className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/20 p-3 text-white opacity-0 group-hover/slider:opacity-100 transition-all hover:bg-black/50 hover:scale-110"
                            >
                                <FaChevronLeft size={24} />
                            </button>
                            <button 
                                onClick={nextImage}
                                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/20 p-3 text-white opacity-0 group-hover/slider:opacity-100 transition-all hover:bg-black/50 hover:scale-110"
                            >
                                <FaChevronRight size={24} />
                            </button>
                            
                            {/* Indicator Dots */}
                            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
                                {selectedItem.images.map((_, index) => (
                                    <div 
                                        key={index}
                                        className={`h-2 w-2 rounded-full transition-all ${index === currentImageIndex ? 'bg-white w-6' : 'bg-white/50'}`}
                                    ></div>
                                ))}
                            </div>
                        </>
                      )}
                   </div>
                )}

                {/* Modal Content */}
                <div className="p-8">
                   <div className="mb-6 flex items-center justify-between border-b border-gray-100 pb-4">
                      <div>
                        <h2 className="text-2xl font-bold text-[#7e1b84] mb-1">{selectedItem.title}</h2>
                        <p className="text-sm font-medium text-gray-500">By {selectedItem.student} • {selectedItem.grade}</p>
                      </div>
                      <span className="rounded-full bg-fuchsia-100 px-3 py-1 text-xs font-bold text-[#7e1b84]">
                        {selectedItem.category}
                      </span>
                   </div>

                   {/* Body Text */}
                   <div className="prose prose-fuchsia max-w-none text-gray-600">
                      <p className="text-lg font-medium text-slate-900 mb-4">{selectedItem.description}</p>
                      <p className="whitespace-pre-line">{selectedItem.fullContent || "No additional details provided."}</p>
                   </div>
                </div>

             </div>
             
             {/* Backdrop Click */}
             <div className="absolute inset-0 -z-10" onClick={() => setSelectedItem(null)}></div>
          </div>
        )}

      </div>
    </div>
  );
}