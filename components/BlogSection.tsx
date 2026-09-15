'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FaArrowRight, FaCalendarAlt } from 'react-icons/fa';

import { BLOG_POSTS, HOME_NEWS_SLUGS } from '@/app/blog/blog-data';

const latestPosts = HOME_NEWS_SLUGS
  .map((slug) => BLOG_POSTS.find((post) => post.slug === slug))
  .filter((post): post is (typeof BLOG_POSTS)[number] => Boolean(post));

export default function BlogSection() {
  const featuredPost = latestPosts[0];
  const sidePosts = latestPosts.slice(1, 3);

  return (
    <section id="news" className="py-14 sm:py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col">
        
        {/* --- MY HEADER --- */}
        <div className="mb-12">
          <h3 className="text-2xl font-extrabold tracking-tight text-[#7e1b84] sm:text-4xl">
            Latest School Insights & News
          </h3>
          <p className="mt-3 text-lg text-gray-600 max-w-3xl">
            Stay updated with student achievements, upcoming events, and stories from our vibrant community.
          </p>
        </div>

        {/* --- MY GRID --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-12">
          
          {/* === LEFT COLUMN: FEATURED POST (Big Card) === */}
          <div className="lg:col-span-7">
            {featuredPost && (
              <Link href={`/blog/${featuredPost.slug}`} className="group block h-full">
                {/* Removed rounded edges (rounded-none) */}
                <article className="flex flex-col h-full rounded-none overflow-hidden bg-fuchsia-50 border border-fuchsia-100 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-fuchsia-200">
                  
                  <div className="relative h-48 sm:h-64 md:h-80 w-full overflow-hidden">
                    <Image
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Squared off the badge */}
                    <div className="absolute top-4 left-4 rounded-none bg-white/95 px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#7e1b84] shadow-sm">
                      {featuredPost.category}
                    </div>
                  </div>
                  
                  <div className="flex flex-1 flex-col p-6 sm:p-8">
                    <div className="mb-3 flex items-center gap-2 text-xs font-medium text-gray-500">
                      <FaCalendarAlt className="text-fuchsia-400" />
                      <span>{featuredPost.date}</span>
                    </div>

                    <h4 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-[#7e1b84] transition-colors sm:text-2xl">
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
              <Link key={post.id || post.slug} href={`/blog/${post.slug}`} className="group block h-full">
                {/* Removed rounded edges */}
                <article className="flex flex-row items-stretch gap-4 rounded-none bg-fuchsia-50 p-3 border border-transparent hover:border-fuchsia-200 hover:shadow-lg transition-all duration-300 h-full">
                  
                  {/* Squared off the image container */}
                  <div className="relative w-24 min-h-[7.5rem] sm:w-40 sm:min-h-0 flex-shrink-0 overflow-hidden rounded-none">
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

        {/* --- MY BOTTOM BUTTON --- */}
        <div className="flex justify-center">
          {/* Made the button flat to match the hero section */}
          <Link 
            href="/blog"
            className="inline-flex w-full items-center justify-center gap-2 rounded-none bg-[#7e1b84] px-8 py-4 text-base font-bold text-white transition-all hover:bg-[#6b1670] sm:w-auto sm:px-10"
          >
            View All News <FaArrowRight />
          </Link>
        </div>

      </div>
    </section>
  );
}