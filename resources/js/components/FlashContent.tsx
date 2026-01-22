import React from 'react';
import { HorizontalScroll } from './HorizontalScroll';

/**
 * FlashContent - Horizontal scroll section untuk video alumni/organisasi
 * Fully responsive - tampil di desktop, tablet, dan mobile
 * Placeholder dengan skeleton loading
 */
export const FlashContent: React.FC = () => {
  // Mock data - akan diganti dengan API call nanti
  const mockFlashItems = Array.from({ length: 5 }, (_, i) => ({
    id: i + 1,
    title: `Konten Video Alumni ${i + 1}`,
  }));

  return (
    <div className="w-full bg-white border-b border-[#E6EAE8]">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-[1440px] py-6 sm:py-8">
        <HorizontalScroll
          title="🎬 Konten Video"
          viewAllLink="/video"
          showArrows={true}
        >
          {mockFlashItems.map((item) => (
            <div
              key={item.id}
              className="flex-shrink-0 w-48 h-32 sm:w-56 sm:h-40 md:w-64 md:h-48 bg-gradient-to-br from-[#E6EAE8] to-[#F8FAF9] rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow border border-[#E6EAE8] group"
            >
              {/* Play button overlay */}
              <div className="w-full h-full flex items-center justify-center relative">
                {/* Skeleton placeholder */}
                <div className="w-full h-full bg-[#E6EAE8] animate-pulse" />
                
                {/* Play icon */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <div className="w-0 h-0 border-l-6 sm:border-l-7 md:border-l-8 border-l-[#0F766E] border-t-4 sm:border-t-5 md:border-t-5 border-t-transparent border-b-4 sm:border-b-5 md:border-b-5 border-b-transparent ml-1" />
                  </div>
                </div>

                {/* Title */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2 sm:p-3 text-white text-xs sm:text-sm font-medium line-clamp-2">
                  {item.title}
                </div>
              </div>
            </div>
          ))}
        </HorizontalScroll>
      </div>
    </div>
  );
};

export default FlashContent;
