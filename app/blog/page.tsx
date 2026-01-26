import Link from 'next/link';
import Image from 'next/image';
import { FaCalendarAlt, FaArrowRight } from 'react-icons/fa';

// --- SHARED DATA SOURCE ---
// We export this so the [slug] page can use it too
export const BLOG_POSTS = [
  {
    id: 1,
    title: 'Sports Week-Nursery Class Crowned Overall Winners',
    excerpt: 'After a week-long contest among the various classes of B-Weh Schools Montessori, the Nursery Class emerged as the overall champions. Their teamwork, enthusiasm, and determination made this year’s Sports Week truly memorable.',
    date: 'Dec 01, 2025',
    category: 'Sports',
    image: '/images/blog/blog0.jpg',
    slug: 'sports-week'
  },
  {
    id: 2,
    title: 'Our Art & Exhibition Day and NPT',
    excerpt: 'As part of our commitment to nurturing creativity and holistic development, we hosted our maiden Art and Exhibition Day. The event provided a platform for our learners to showcase their impressive artworks and express their talents with confidence.',
    date: 'Nov 20, 2025',
    category: 'Art and Exhibition',
    image: '/images/blog/blog1.jpg', 
    slug: 'art and exhibition'
  },
  {
    id: 3,
    title: 'Enjoy AI Africa Open-Two Trophies Won',
    excerpt: 'We proudly participated in the 2025 Enjoy AI Africa Open, an international competition featuring contestants from across Africa. Our learners delivered outstanding performances and returned home with two remarkable trophies.',
    date: 'Nov 15, 2025',
    category: 'Robotics & AI',
    image: '/images/blog/blog10.jpg', 
    slug: 'Robotics and AI'
  },
   {
    id: 3,
    title: 'Enjoy AI Africa Open-Two Trophies Won',
    excerpt: 'We proudly participated in the 2025 Enjoy AI Africa Open, an international competition featuring contestants from across Africa. Our learners delivered outstanding performances and returned home with two remarkable trophies.',
    date: 'Nov 15, 2025',
    category: 'Robotics & AI',
    image: '/images/blog/blog10.jpg', 
    slug: 'Robotics and AI'
  },
];

export default function BlogIndexPage() {
  return (
    <div className="min-h-screen bg-fuchsia-50 pt-40 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold tracking-tight text-[#7e1b84] sm:text-5xl">
            School News & Insights
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
            Stay updated with the latest happenings, educational tips, and stories from B-Weh Montessori.
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {BLOG_POSTS.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="group block">
              <article className="flex flex-col h-full overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                
                {/* Image */}
                <div className="relative h-60 w-full overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#7e1b84]">
                    {post.category}
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-3 flex items-center gap-2 text-xs font-medium text-gray-500">
                    <FaCalendarAlt className="text-fuchsia-400" />
                    <span>{post.date}</span>
                  </div>
                  
                  <h3 className="mb-3 text-xl font-bold text-slate-900 group-hover:text-[#7e1b84] transition-colors">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-1">
                    {post.excerpt}
                  </p>

                  <span className="inline-flex items-center text-sm font-bold text-[#7e1b84] mt-auto group-hover:gap-2 transition-all">
                    Read Article <FaArrowRight className="ml-2" />
                  </span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}