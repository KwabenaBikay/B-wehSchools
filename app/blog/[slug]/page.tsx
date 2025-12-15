import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FaCalendarAlt, FaArrowLeft, FaUser, FaTag } from 'react-icons/fa';

// IMPORT DATA FROM THE MAIN PAGE (To keep them in sync)
import { BLOG_POSTS } from '../page'; 

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

            <h1 className="text-4xl font-extrabold leading-tight md:text-5xl lg:text-6xl">
              {post.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="mx-auto max-w-3xl px-6 py-12">
        {/* Intro */}
        <p className="text-xl font-medium leading-relaxed text-gray-700 mb-8 border-l-4 border-[#7e1b84] pl-4">
          {post.excerpt}
        </p>

        {/* Dummy Body Content (Since we don't have real full text yet) */}
        <div className="prose prose-lg prose-purple text-gray-600">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <p>
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <h3>Why this matters for our students</h3>
          <p>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
          </p>
          <ul>
            <li>Holistic development of the child.</li>
            <li>Encouraging critical thinking skills.</li>
            <li>Building confidence through practical activities.</li>
          </ul>
        </div>
      </div>
    </article>
  );
}