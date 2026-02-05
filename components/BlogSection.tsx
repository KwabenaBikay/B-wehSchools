'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowRight, FaCalendarAlt } from 'react-icons/fa';

// Import all available posts
import { BLOG_POSTS } from '@/app/blog/blog-data';

export default function BlogSection() {
  // 1. Set initial state (Default to the first 3 posts so something shows immediately)
  const [displayPosts, setDisplayPosts] = useState(BLOG_POSTS.slice(0, 3));
  const [isMounted, setIsMounted] = useState(false);

  // 2. Shuffle Logic (Runs only on the client side after refresh)
  useEffect(() => {
    setIsMounted(true);
    
    // Create a copy of the all posts array
    const allPosts = [...BLOG_POSTS];

    // Fisher-Yates Shuffle Algorithm (The most robust way to randomize)
    for (let i = allPosts.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allPosts[i], allPosts[j]] = [allPosts[j], allPosts[i]];
    }

    // Take the top 3 from the shuffled deck
    setDisplayPosts(allPosts.slice(0, 3));
  }, []);

  // 3. Define which is Big (Featured) and which are Small (Side)
  const featuredPost = displayPosts[0];
  const sidePosts = displayPosts.slice(1, 3);

  // Prevent layout shift/flicker by rendering a consistent height wrapper if needed
  // (Optional: current approach just updates instantly)

  return (
    <section className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-3xl">
            <h2 className="text-sm font-bold uppercase tracking-wider text-fuchsia-500 mb-2">
              From the Campus
            </h2>
            <h3 className="text-3xl font-extrabold tracking-tight text-[#7e1b84] sm:text-4xl">
              Latest School Insights & News
            </h3>
            <p className="mt-3 text-lg text-gray-600">
              Stay updated with student achievements, upcoming events, and stories from our vibrant community.
            </p>
          </div>
          
          <Link 
            href="/blog"
            className="hidden md:inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-[#9c27b0] to-[#7e1b84] shadow-lg shadow-purple-900/30 px-6 py-3 text-sm font-bold text-white shadow-md hover:bg-[#6b1670] transition-transform hover:-translate-y-0.5"
          >
            View All News <FaArrowRight />
          </Link>
        </div>

        {/* --- GRID --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* === LEFT COLUMN: FEATURED POST (Big Card) === */}
          <div className="lg:col-span-7">
            {featuredPost && (
              <Link href={`/blog/${featuredPost.slug}`} className="group block h-full">
                <article className="flex flex-col h-full rounded-2xl overflow-hidden bg-fuchsia-50 border border-fuchsia-100 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-fuchsia-200">
                  
                  <div className="relative h-64 sm:h-80 w-full overflow-hidden">
                    <Image
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4 rounded-full bg-white/95 px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#7e1b84] shadow-sm">
                      {featuredPost.category}
                    </div>
                  </div>
                  
                  <div className="flex flex-1 flex-col p-6 sm:p-8">
                    <div className="mb-3 flex items-center gap-2 text-xs font-medium text-gray-500">
                      <FaCalendarAlt className="text-fuchsia-400" />
                      <span>{featuredPost.date}</span>
                    </div>

                    <h4 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-[#7e1b84] transition-colors">
                      {featuredPost.title}
                    </h4>
                    <p className="text-gray-600 leading-relaxed mb-6 line-clamp-3">
                      {featuredPost.excerpt}
                    </p>
                    
                    <div className="mt-auto flex items-center text-[#7e1b84] font-bold text-sm group-hover:gap-2 transition-all">
                      Read Full Story <FaArrowRight className="ml-2" />
                    </div>
                  </div>
                </article>
              </Link>
            )}
          </div>

          {/* === RIGHT COLUMN: SIDE LIST (Small Cards) === */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {sidePosts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`} className="group block h-full">
                <article className="flex flex-row items-stretch gap-4 rounded-xl bg-fuchsia-50 p-3 border border-transparent hover:border-fuchsia-200 hover:shadow-lg transition-all duration-300 h-full">
                  
                  <div className="relative w-32 sm:w-40 flex-shrink-0 overflow-hidden rounded-lg">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>

                  <div className="flex flex-col justify-center py-2 pr-2">
                    <div className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-fuchsia-600">
                      {post.category}
                    </div>
                    <h4 className="text-base sm:text-lg font-bold text-slate-900 mb-2 leading-tight group-hover:text-[#7e1b84] transition-colors line-clamp-2">
                      {post.title}
                    </h4>
                    <div className="mt-auto flex items-center text-xs font-bold text-gray-500 group-hover:text-[#7e1b84] transition-colors">
                      Read More <FaArrowRight className="ml-1 w-3 h-3" />
                    </div>
                  </div>

                </article>
              </Link>
            ))}
          </div>

        </div>

        {/* Mobile View All Button */}
        <div className="mt-10 md:hidden text-center">
          <Link 
            href="/blog"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-[#9c27b0] to-[#7e1b84] shadow-lg shadow-purple-900/30 px-8 py-3 text-sm font-bold text-white shadow-lg"
          >
            View All News <FaArrowRight />
          </Link>
        </div>

      </div>
    </section>
  );
}