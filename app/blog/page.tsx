'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FaArrowRight } from 'react-icons/fa';

// Import from your data file
import { BLOG_POSTS } from './blog-data'; 

export default function BlogIndexPage() {
  return (
    <div className="min-h-screen bg-slate-50 pt-40 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            School News & Insights
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
            Stay updated with the latest happenings, educational tips, and stories from B-Weh Montessori.
          </p>
        </div>

        {/* --- DYNAMIC SLIDING CARDS GRID --- */}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {BLOG_POSTS.map((post) => (
            
            <Link 
              key={post.id || post.slug} 
              href={`/blog/${post.slug}`} 
              className="group relative block h-[450px] w-full overflow-hidden bg-slate-200 border border-gray-200"
            >
              
              {/* 1. Background Image */}
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
              />

              {/* Category Badge (Now using the brand purple!) */}
              <div className="absolute top-4 left-4 bg-[#7e1b84] px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
                {post.category}
              </div>
              
              {/* 2. The Sliding White Box */}
              <div className="absolute bottom-0 left-0 w-full bg-white p-6 transition-all duration-500 ease-in-out">
                
                {/* Title (Now turns purple on hover!) */}
                <h4 className="text-xl font-bold text-slate-900 leading-snug group-hover:text-[#7e1b84] transition-colors duration-300">
                  {post.title}
                </h4>
                
                {/* 3. The Hidden Description */}
                <div className="grid grid-rows-[0fr] transition-all duration-500 ease-in-out group-hover:grid-rows-[1fr]">
                  <div className="overflow-hidden">
                    <p className="mt-4 text-sm text-gray-600 line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                {/* 4. The Bottom "Read Article" & Arrow */}
                <div className="mt-6 flex items-center text-[#7e1b84]">
                  <span className="font-bold text-sm opacity-0 transition-all duration-500 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 mr-2">
                    Read Article
                  </span>
                  <FaArrowRight className="text-lg transition-transform duration-500 group-hover:translate-x-1" />
                </div>

              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}