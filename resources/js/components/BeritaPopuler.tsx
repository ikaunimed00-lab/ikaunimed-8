import React from 'react';

/**
 * BeritaPopuler - Popular news section untuk main content atau sidebar
 * Dapat menampilkan dalam format list atau grid
 */
interface BeritaPopulerProps {
  variant?: 'list' | 'grid';
  maxItems?: number;
}

export const BeritaPopuler: React.FC<BeritaPopulerProps> = ({
  variant = 'list',
  maxItems = 5,
}) => {
  const mockNews = Array.from({ length: maxItems }, (_, i) => ({
    id: i + 1,
    title: `Berita Populer ${i + 1}`,
    views: Math.floor(Math.random() * 10000) + 1000,
  }));

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between px-1">
        <h3 className="text-lg font-bold text-[#0F172A]">🔥 Berita Populer</h3>
        <a href="#" className="text-sm text-[#0F766E] font-medium hover:text-[#115E59] transition-colors">
          Selengkapnya →
        </a>
      </div>

      {/* Content */}
      {variant === 'list' ? (
        <div className="space-y-3">
          {mockNews.map((item) => (
            <div
              key={item.id}
              className="flex gap-3 p-3 bg-white border border-[#E6EAE8] rounded-lg hover:border-[#0F766E] transition-colors cursor-pointer group"
            >
              {/* Thumbnail */}
              <div className="flex-shrink-0 w-20 h-20 bg-[#E6EAE8] rounded animate-pulse" />

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-[#0F172A] line-clamp-2 text-sm group-hover:text-[#0F766E] transition-colors">
                  {item.title}
                </h4>
                <p className="text-xs text-[#6B7280] mt-2">
                  👁️ {(item.views / 1000).toFixed(1)}K views
                </p>
              </div>

              {/* Ranking */}
              <div className="flex-shrink-0 w-8 h-8 bg-[#0F766E] text-white rounded-full flex items-center justify-center font-bold text-sm">
                {item.id}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {mockNews.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-[#E6EAE8] rounded-lg overflow-hidden hover:border-[#0F766E] transition-colors cursor-pointer group"
            >
              {/* Thumbnail */}
              <div className="w-full aspect-square bg-[#E6EAE8] animate-pulse" />

              {/* Content */}
              <div className="p-3">
                <h4 className="font-semibold text-[#0F172A] line-clamp-2 text-sm group-hover:text-[#0F766E] transition-colors">
                  {item.title}
                </h4>
                <p className="text-xs text-[#6B7280] mt-1">
                  👁️ {(item.views / 1000).toFixed(1)}K
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BeritaPopuler;
