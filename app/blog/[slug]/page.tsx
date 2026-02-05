import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FaCalendarAlt, FaArrowLeft, FaUser, FaTag } from 'react-icons/fa';

// Import from your shared data file
import { BLOG_POSTS } from '@/app/blog/blog-data'; 

export default function SinglePostPage({ params }: { params: { slug: string } }) {
  // 1. Find the post that matches the URL slug
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);

  // 2. If no post found, show 404
  if (!post) {
    notFound();
  }

  return (
    <article className="min-h-screen bg-white pt-32 pb-20">
      {/* Hero Image Section */}
      <div className="relative h-[400px] w-full md:h-[500px]">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover brightness-50"
          priority // Loads image faster
        />
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto max-w-4xl px-6 pb-16 w-full text-white">
            <Link href="/blog" className="inline-flex items-center text-sm font-semibold hover:text-fuchsia-300 mb-6 transition-colors">
              <FaArrowLeft className="mr-2" /> Back to News
            </Link>
            
            <div className="flex flex-wrap gap-4 text-sm font-medium mb-4 text-fuchsia-200">
               <span className="flex items-center gap-2"><FaTag /> {post.category}</span>
               <span className="flex items-center gap-2"><FaCalendarAlt /> {post.date}</span>
               <span className="flex items-center gap-2"><FaUser /> Admin</span>
            </div>

            <h1 className="text-3xl font-extrabold leading-tight md:text-5xl lg:text-6xl drop-shadow-md">
              {post.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="mx-auto max-w-3xl px-6 py-12">
        {/* Intro / Excerpt */}
        <p className="text-xl font-medium leading-relaxed text-gray-700 mb-8 border-l-4 border-[#7e1b84] pl-4">
          {post.excerpt}
        </p>

        {/* DYNAMIC CONTENT RENDERER 
           This replaces the Lorem Ipsum with the real text from blog-data.ts 
        */}
        <div 
          className="prose prose-lg prose-purple text-gray-600 max-w-none"
          // This allows us to use HTML tags like <p>, <strong>, and <ul> in your data file
          dangerouslySetInnerHTML={{ __html: post.content || '<p>Content coming soon...</p>' }}
        />
      </div>
    </article>
  );
}