'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FaArrowRight, FaCalendarAlt } from 'react-icons/fa';
import { BLOG_POSTS } from '@/lib/blog-data';

export default function BlogSection() {
  return (
    <section className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* --- SECTION HEADER --- */}
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold uppercase tracking-wider text-fuchsia-500">
            School Updates
          </h2>
          <h3 className="mt-2 text-3xl font-extrabold tracking-tight text-[#7e1b84] sm:text-4xl">
            Latest News & Events
          </h3>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
            Keep up with the vibrant activities, academic achievements, and stories from our community.
          </p>
        </div>

        {/* --- BLOG GRID --- */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {BLOG_POSTS.map((post) => (
            <article 
              key={post.id} 
              className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 border border-transparent hover:border-fuchsia-100"
            >
              {/* IMAGE WRAPPER */}
              <div className="relative h-56 w-full overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  // Note: unoptimized={true} is generally not needed for local images, 
                  // Next.js optimizes them automatically. You can remove it for better performance.
                />
                {/* Category Badge */}
                <div className="absolute top-4 left-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#7e1b84] shadow-sm backdrop-blur-sm">
                  {post.category}
                </div>
              </div>

              {/* CONTENT */}
              <div className="flex flex-1 flex-col p-6">
                {/* Date Row */}
                <div className="mb-3 flex items-center gap-2 text-xs font-medium text-gray-500">
                  <FaCalendarAlt className="text-fuchsia-400" />
                  <span>{post.date}</span>
                </div>

                {/* Title */}
                <h3 className="mb-3 text-xl font-bold text-slate-900 transition-colors group-hover:text-[#7e1b84]">
                  <Link href={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h3>

                {/* Excerpt */}
                <p className="mb-6 flex-1 text-sm leading-relaxed text-gray-600">
                  {post.excerpt}
                </p>

                {/* Read More Link */}
                <div className="mt-auto">
                  <Link 
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-bold text-[#7e1b84] transition-all group-hover:gap-3"
                  >
                    Read Article <FaArrowRight />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* --- VIEW ALL BUTTON --- */}
        <div className="mt-16 text-center">
          <Link
            href="/blog"
            className="inline-block rounded-full bg-[#7e1b84] px-8 py-3 text-sm font-bold text-white shadow-lg shadow-fuchsia-900/20 transition-transform hover:-translate-y-1 hover:bg-[#6b1670]"
          >
            View All News
          </Link>
        </div>

      </div>
    </section>
  );
}