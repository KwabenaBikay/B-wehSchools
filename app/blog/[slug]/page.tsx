import { notFound } from 'next/navigation';
import { FaCalendarAlt } from 'react-icons/fa';
import BackButton from '@/components/BackButton';
import ArticleGallery from '@/components/ArticleGallery'; // Importing our dynamic slider
import { BLOG_POSTS } from '@/app/blog/blog-data';

// ==========================================
// 1. MY SECURE STATIC GENERATOR
// ==========================================
export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

// ==========================================
// 2. MY PAGE UI (Side-by-Side Layout)
// ==========================================
export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = BLOG_POSTS.find((p) => p.slug === params.slug);

  if (!article) {
    return notFound();
  }

  // --- MY SMART FALLBACK MAGIC ---
  // If you added an 'images' array, it uses it. If not, it just uses the single 'image' automatically!
  const galleryImages = article.images && article.images.length > 0 ? article.images : [article.image];

  return (
    <main className="bg-white min-h-screen pb-20 pt-32">
      <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* My Professional Article Header */}
        <div className="mb-10 border-b border-gray-200 pb-8">
          <div className="inline-block mb-4 px-3 py-1 bg-[#7e1b84] text-white text-xs font-bold uppercase tracking-widest">
            {article.category}
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4 leading-tight">
            {article.title}
          </h1>
          <div className="flex items-center text-gray-500 font-medium text-sm uppercase tracking-wide">
            <FaCalendarAlt className="mr-2 text-[#7e1b84]" />
            <time>{article.date}</time>
          </div>
        </div>

        {/* ========================================== */}
        {/* MY SIDE-BY-SIDE NEWS LAYOUT */}
        {/* ========================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT COLUMN: The Interactive Gallery (Spans 5 columns) */}
          <div className="lg:col-span-5 relative w-full lg:sticky lg:top-32 lg:h-[450px]">
            {/* The slider sits securely in this column! */}
            <ArticleGallery images={galleryImages} title={article.title} />
          </div>

          {/* RIGHT COLUMN: The Content (Spans 7 columns) */}
          <div className="lg:col-span-7">
            <div 
              className="text-lg text-slate-800 leading-relaxed [&>p]:mb-6 [&>h3]:text-2xl [&>h3]:font-bold [&>h3]:text-slate-900 [&>h3]:mt-10 [&>h3]:mb-4"
              dangerouslySetInnerHTML={{ __html: article.content || article.excerpt }}
            />

            {/* My Smart Back Button */}
            <div className="mt-12 pt-8 border-t border-gray-200 flex justify-start">
              <BackButton />
            </div>
          </div>

        </div>

      </article>
    </main>
  );
}