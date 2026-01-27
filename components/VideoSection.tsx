'use client';

type VideoSectionProps = {
  youtubeUrl: string;
};

export default function VideoSection({ youtubeUrl }: VideoSectionProps) {
  // Helper function to convert a "watch" URL to an "embed" URL automatically
  // Security: Validates that URL is from YouTube before processing
  const getEmbedUrl = (url: string) => {
    try {
      // Security: Validate URL is from YouTube
      const isValidYouTubeUrl = 
        url.includes('youtube.com') || 
        url.includes('youtu.be') ||
        url.startsWith('https://www.youtube.com/embed/');
      
      if (!isValidYouTubeUrl) {
        console.error('Invalid YouTube URL:', url);
        // Return a safe default or empty string
        return '';
      }

      // If it's already an embed link, validate and return it
      if (url.includes('/embed/')) {
        // Ensure it's from youtube.com
        if (url.startsWith('https://www.youtube.com/embed/')) {
          return url;
        }
        return '';
      }

      // If it's a standard youtube.com/watch?v=ID link
      if (url.includes('youtube.com') && url.includes('v=')) {
        const videoId = url.split('v=')[1].split('&')[0].split('#')[0];
        // Validate video ID format (alphanumeric, hyphens, underscores, 11 chars typical)
        if (/^[a-zA-Z0-9_-]{11,}$/.test(videoId)) {
          return `https://www.youtube.com/embed/${videoId}`;
        }
        return '';
      }

      // If it's a short youtu.be/ID link
      if (url.includes('youtu.be/')) {
        const videoId = url.split('youtu.be/')[1].split('?')[0].split('#')[0];
        // Validate video ID format
        if (/^[a-zA-Z0-9_-]{11,}$/.test(videoId)) {
          return `https://www.youtube.com/embed/${videoId}`;
        }
        return '';
      }

      // If we get here, URL format is not recognized
      console.error('Unrecognized YouTube URL format:', url);
      return '';
    } catch (error) {
      console.error('Error parsing YouTube URL:', error);
      return '';
    }
  };

  const embedUrl = getEmbedUrl(youtubeUrl);

  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header Text */}
        <div className="mx-auto max-w-2xl text-center mb-12">
          <h2 className="text-3xl font-extrabold tracking-tight text-[#7e1b84] sm:text-4xl">
            Experience B-Weh
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Take a virtual look inside our classrooms and see our Montessori method in action.
          </p>
        </div>

        {/* Video Container */}
        <div className="relative mx-auto w-full max-w-5xl">
          {/* Decorative Background Blob */}
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-fuchsia-100 to-[#7e1b84]/20 opacity-70 blur-lg transition-all duration-500 group-hover:opacity-100" />
          
          {/* The Video Player Wrapper */}
          <div className="relative aspect-video w-full overflow-hidden rounded-3xl border border-gray-100 bg-black shadow-2xl">
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