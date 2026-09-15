import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="bg-slate-50 py-16 sm:py-20 lg:py-24">
      <div className="section-shell flex flex-col items-center gap-12 lg:flex-row lg:gap-16">
        {/* Left column – headline, copy, CTAs, trust signals */}
        <div className="max-w-xl lg:w-1/2">
          <p className="section-eyebrow text-violet-600">
            Premium Montessori Education
          </p>
          <h1 className="display-text mt-4 text-slate-900">
            Nurturing young minds with{' '}
            <span className="text-violet-700">excellence</span>.
          </h1>
          <p className="mt-4 text-sm text-neutral-700 sm:text-base">
            B-weh Schools Montessori offers a calm, high-standard learning
            environment where children build strong academic foundations,
            character, and confidence from their earliest years.
          </p>

          {/* Primary & secondary CTAs */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/admissions"
              className="inline-flex items-center justify-center rounded-md bg-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-violet-700"
            >
              Apply Now
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center rounded-md border border-neutral-200 bg-white px-5 py-3 text-sm font-semibold text-neutral-800 shadow-sm hover:border-violet-200 hover:text-violet-700"
            >
              Explore Our Courses
              <span className="ml-2 text-base" aria-hidden="true">
                ↗
              </span>
            </Link>
          </div>

          {/* Trust signals */}
          <div className="mt-8 flex flex-wrap items-center gap-6 text-xs text-neutral-600 sm:text-sm">
            <div>
              <p className="font-medium text-neutral-500">Trusted by parents</p>
              <p className="mt-1 text-neutral-800">
                Across [Your City] and surrounding communities.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-9 rounded-full bg-white px-4 shadow-sm ring-1 ring-neutral-100">
                <p className="flex h-full items-center text-xs font-medium text-neutral-700">
                  Authentic Montessori
                </p>
              </div>
              <div className="h-9 rounded-full bg-white px-4 shadow-sm ring-1 ring-neutral-100">
                <p className="flex h-full items-center text-xs font-medium text-neutral-700">
                  Small class sizes
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right column – framed hero image with subtle pattern */}
        <div className="relative w-full max-w-md lg:w-1/2 lg:max-w-none">
          {/* Subtle tech-style pattern behind image */}
          <div className="pointer-events-none absolute -right-6 -top-6 h-32 w-32 rounded-3xl bg-gradient-to-br from-violet-100/60 to-white">
            <div className="h-full w-full bg-[radial-gradient(circle_at_1px_1px,_rgba(148,163,184,0.35)_1px,transparent_0)] bg-[length:12px_12px] opacity-70" />
          </div>

          <div className="relative rounded-3xl border border-neutral-100 bg-white shadow-lg">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
              <Image
                src="/images/slide.jpg"
                alt="Happy B-Weh Montessori pupils in a vibrant classroom"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

