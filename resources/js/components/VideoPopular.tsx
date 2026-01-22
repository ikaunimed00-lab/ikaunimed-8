import React from 'react';

/**
 * VideoPopular - Grid section untuk video populer (3 kolom)
 * Placeholder dengan skeleton loading
 */
export const VideoPopular: React.FC = () => {
  // Mock data - akan diganti dengan API call nanti
  const mockVideos = Array.from({ length: 6 }, (_, i) => ({
    id: i + 1,
    title: `Video Populer ${i + 1}`,
    views: Math.floor(Math.random() * 10000) + 1000,
  }));

  return (
    <div className="space-y-3 mb-8">
      {/* Header */}
      <div className="flex items-center justify-between px-1">
        <h3 className="text-lg font-bold text-[#0F172A]">🎥 Video Populer</h3>
        <a href="/video" className="text-sm text-[#0F766E] font-medium hover:text-[#115E59] transition-colors">
          Ke Halaman Video →
        </a>
      </div>

      {/* Grid 3 kolom (responsive) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockVideos.map((video) => (
          <article
            key={video.id}
            className="bg-white border border-[#E6EAE8] rounded-lg overflow-hidden hover:border-[#0F766E] transition-colors cursor-pointer group"
          >
            {/* Video thumbnail */}
            <div className="relative aspect-video bg-gradient-to-br from-[#E6EAE8] to-[#F8FAF9] overflow-hidden">
              <div className="w-full h-full bg-[#E6EAE8] animate-pulse" />

              {/* Play button overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <div className="w-0 h-0 border-l-6 border-l-[#0F766E] border-t-4 border-t-transparent border-b-4 border-b-transparent ml-0.5" />
                </div>
              </div>

              {/* Duration badge */}
              <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs font-medium px-2 py-1 rounded">
                12:34
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              <h4 className="font-semibold text-[#0F172A] line-clamp-2 mb-2 group-hover:text-[#0F766E] transition-colors">
                {video.title}
              </h4>

              <p className="text-xs text-[#6B7280]">
                👁️ {(video.views / 1000).toFixed(1)}K views
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default VideoPopular;
