'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FaStar, FaPaintBrush, FaMicroscope, FaPenNib, FaTrophy, FaTimes, FaUser, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

// --- DATA CONFIGURATION ---
const SPOTLIGHT_ITEMS = [
  {
    id: 1,
    type: 'achievement',
    category: 'Achievement',
    title: 'Regional Math Olympiad Winner',
    student: 'Kwame Mensah',
    grade: 'KG 1',
    // HAS 3 IMAGES -> Arrows will show
    images: [
        'https://images.unsplash.com/photo-1544717305-2782549b5136?w=800&q=80',
        'https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=800&q=80',
        'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80'
    ],
    description: 'Kwame secured 1st place in the Central Region Math Olympiad, competing against 50+ schools.',
    fullContent: 'Kwame has shown exceptional aptitude for mathematics since Grade 1. His dedication to solving complex problems led him to win the regional trophy. We are incredibly proud of his hard work and the support from our math department. Click through the images above to see photos from the competition day and the award ceremony.'
  },
  {
    id: 2,
    type: 'art',
    category: 'Creativity',
    title: 'Sunset over the Savannah',
    student: 'Ama Osei',
    grade: 'Basic 2',
    // Added more art images so arrows appear
    images: [
        'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80',
        'https://images.unsplash.com/photo-1560421683-6856ea585c78?w=800&q=80',
        'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&q=80'
    ],
    description: 'Acrylic on Canvas. Selected for the National Youth Art Exhibition.',
    fullContent: 'Ama captured the warmth of the Ghanaian sunset beautifully using acrylics. This piece was selected among thousands of entries for the national exhibition.' 
  },
  {
    id: 3,
    type: 'essay',
    category: 'Writing',
    title: 'Why We Must Protect Our Oceans',
    student: 'Sarah Johnson',
    grade: 'Basic 2',
    images: [], // Essays still have no images (Correct behavior)
    description: 'An award-winning persuasive essay on environmental conservation.',
    fullContent: 'The ocean is the heart of our planet. It regulates climate, feeds millions, and produces the oxygen we breathe. Yet, we treat it as a dumping ground. In this essay, I explore three key ways students can reduce plastic waste...'
  },
  {
    id: 4,
    type: 'science',
    category: 'STEM',
    title: 'Hydraulic Arm Project',
    student: 'Robotics Club Team',
    grade: 'KG2',
    // Added more science images
    images: [
        'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80',
        'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&q=80',
        'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80'
    ],
    description: 'A working hydraulic arm built entirely from recycled materials and syringes.',
    fullContent: 'Our robotics team applied Pascal’s principle to create a mechanical arm capable of lifting 500g objects. The project demonstrates the power of fluid pressure and mechanical advantage.'
  },
  {
    id: 5,
    type: 'achievement',
    category: 'Achievement',
    title: 'Best Speller 2024',
    student: 'Emmanuel Darko',
    grade: 'Nursery1',
    // Added more spelling bee images
    images: [
        'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80',
        'https://images.unsplash.com/photo-1427504746696-277666db6992?w=800&q=80'
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
    grade: 'Nursery 2',
    // Added more sculpture images
    images: [
        'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&q=80',
        'https://images.unsplash.com/photo-1551590192-807e80d75d45?w=800&q=80'
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