'use client';

type VideoSectionProps = {
  youtubeUrl: string;
};

export default function VideoSection({ youtubeUrl }: VideoSectionProps) {
  // My helper function to convert a "watch" URL to an "embed" URL automatically
  // Security: Validates that URL is from YouTube before processing
  const getEmbedUrl = (url: string) => {
    try {
      const isValidYouTubeUrl =
        url.includes('youtube.com') ||
        url.includes('youtu.be') ||
        url.startsWith('https://www.youtube.com/embed/');

      if (!isValidYouTubeUrl) {
        console.error('Invalid YouTube URL:', url);
        return '';
      }

      if (url.includes('/embed/')) {
        if (url.startsWith('https://www.youtube.com/embed/')) {
          return url;
        }
        return '';
      }

      if (url.includes('youtube.com') && url.includes('v=')) {
        const videoId = url.split('v=')[1].split('&')[0].split('#')[0];
        if (/^[a-zA-Z0-9_-]{11,}$/.test(videoId)) {
          return `https://www.youtube.com/embed/${videoId}`;
        }
        return '';
      }

      if (url.includes('youtu.be/')) {
        const videoId = url.split('youtu.be/')[1].split('?')[0].split('#')[0];
        if (/^[a-zA-Z0-9_-]{11,}$/.test(videoId)) {
          return `https://www.youtube.com/embed/${videoId}`;
        }
        return '';
      }

      console.error('Unrecognized YouTube URL format:', url);
      return '';
    } catch (error) {
      console.error('Error parsing YouTube URL:', error);
      return '';
    }
  };

  const embedUrl = getEmbedUrl(youtubeUrl);

  return (
    <section className="bg-white py-12 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* My Header Text */}
        <div className="mx-auto max-w-2xl text-center mb-12">
          <h2 className="text-3xl font-extrabold tracking-tight text-[#7e1b84] sm:text-4xl">
            Experience B-weh
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Take a virtual look inside our classrooms and see our Montessori method in action.
          </p>
        </div>

        {/* My Flat Video Container */}
        <div className="relative mx-auto w-full max-w-5xl">

          {/* I completely removed the absolute decorative background blob here so there is no glowing shadow behind my video */}

          {/* I stripped out rounded-3xl, shadow-2xl, and the border to make the video perfectly flat and normal */}
          <div className="relative aspect-video w-full overflow-hidden bg-black">
            <iframe
              width="100%"
              height="100%"
              src={embedUrl}
              title="B-Weh Schools Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
          </div>
        </div>

      </div>
    </section>
  );
}