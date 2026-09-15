'use client';

import { useRouter } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa';

export default function BackButton() {
  // I am using the router to intelligently take me back exactly where I came from (Home or Blog)
  const router = useRouter();

  return (
    <button 
      onClick={() => router.back()} 
      className="inline-flex items-center text-[#7e1b84] hover:text-[#9c27b0] font-semibold transition-colors cursor-pointer"
    >
      <FaArrowLeft className="mr-2" /> Go Back
    </button>
  );
}