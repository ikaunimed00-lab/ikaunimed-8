import React from 'react';

/**
 * RecommendedForYou - Grid section dengan card vertikal (2 baris)
 * Placeholder dengan skeleton loading
 */
export const RecommendedForYou: React.FC = () => {
  // Mock data - akan diganti dengan API call nanti
  const mockRecommendations = Array.from({ length: 4 }, (_, i) => ({
    id: i + 1,
    title: `Artikel Rekomendasi ${i + 1}`,
  }));

  return (
    <div className="space-y-3 mb-8">
      {/* Header */}
      <div className="flex items-center justify-between px-1">
        <h3 className="text-lg font-bold text-[#0F172A]">💡 Rekomendasi untuk Anda</h3>
        <a href="#" className="text-sm text-[#0F766E] font-medium hover:text-[#115E59] transition-colors">
          Selengkapnya →
        </a>
      </div>

      {/* Grid 2 baris x 2 kolom */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockRecommendations.map((item) => (
          <article
            key={item.id}
            className="bg-white border border-[#E6EAE8] rounded-lg overflow-hidden hover:border-[#0F766E] transition-colors cursor-pointer group h-32"
          >
            <div className="flex h-full">
              {/* Image placeholder */}
              <div className="flex-shrink-0 w-24 h-32 bg-[#E6EAE8] animate-pulse" />

              {/* Content */}
              <div className="flex-1 p-3 flex flex-col justify-between">
                {/* Title skeleton */}
                <div className="space-y-2">
                  <div className="h-4 bg-[#E6EAE8] rounded w-full animate-pulse" />
                  <div className="h-3 bg-[#E6EAE8] rounded w-3/4 animate-pulse" />
                </div>

                {/* Meta skeleton */}
                <div className="flex items-center gap-2 text-xs text-[#6B7280]">
                  <div className="w-4 h-4 bg-[#E6EAE8] rounded-full animate-pulse" />
                  <div className="h-2 bg-[#E6EAE8] rounded w-12 animate-pulse" />
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default RecommendedForYou;
