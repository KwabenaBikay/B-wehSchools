export type GalleryItem = {
  id: number;
  src: string;
  category: 'Extracurricular' | 'Excursion' | 'Academics' | 'Celebration';
  caption: string;
};

// This is our magic "Smart Generator" function!
// Instead of writing 10 lines of code, we just tell it: 
// "Make images 1 through 10, call them 'Sports', and put them in 'Extracurricular'"
const generateImages = (
  startId: number,
  endId: number,
  category: GalleryItem['category'],
  caption: string
): GalleryItem[] => {
  const items: GalleryItem[] = [];
  for (let i = startId; i <= endId; i++) {
    items.push({
      id: i,
      src: `/images/gallery/image-${i}.jpg`,
      category,
      caption,
    });
  }
  return items;
};

// Now we build the entire 70-image array in just a few clean lines!
export const GALLERY_ITEMS: GalleryItem[] = [
  ...generateImages(1, 2, 'Extracurricular', 'Sports Day 2025'),
  ...generateImages(3, 4, 'Excursion', 'A visit to Accra Zoo'),
  ...generateImages(5, 5, 'Extracurricular', 'Sports Day 2026'), // single image
  ...generateImages(6, 6, 'Excursion', 'A visit to Accra Zoo'), // fixed spelling
  ...generateImages(7, 8, 'Extracurricular', 'Sports Day 2026'),
  ...generateImages(9, 15, 'Extracurricular', 'Sports Day 2025'),
  ...generateImages(16, 18, 'Academics', 'Nature & Plant Care'),
  ...generateImages(19, 21, 'Celebration', 'Birthday Celebration'),
  ...generateImages(22, 23, 'Academics', 'Class Activity'),
  ...generateImages(24, 28, 'Academics', 'Nature and Plant Care'),
  ...generateImages(29, 29, 'Excursion', 'A visit to Accra Zoo'),
  ...generateImages(30, 30, 'Extracurricular', 'Art and Exhibition'),
  ...generateImages(31, 31, 'Extracurricular', 'Sports Day 2025'),
  ...generateImages(32, 32, 'Extracurricular', 'Art and Exhibition'),
  ...generateImages(33, 34, 'Celebration', 'Birthday Celebration'),
  ...generateImages(35, 41, 'Excursion', 'A visit to Accra Zoo'),
  ...generateImages(42, 44, 'Extracurricular', 'Art and Exhibition'),
  ...generateImages(45, 48, 'Celebration', 'Birthday Celebration'),
  ...generateImages(49, 49, 'Academics', 'Nature and Plant Care'),
  ...generateImages(50, 63, 'Extracurricular', 'Sports Day 2026'),
  ...generateImages(64, 70, 'Excursion', 'A visit to Accra Zoo'),
];

export const GALLERY_CATEGORIES = ['All', 'Extracurricular', 'Excursion', 'Academics', 'Celebration'];