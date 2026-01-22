import React from 'react';
import { HorizontalScroll } from './HorizontalScroll';

/**
 * EditorsPicks - Editor's curated picks dengan horizontal scroll
 * Bisa standalone atau di-integrate ke main content
 */
export const EditorsPicks: React.FC = () => {
  const mockPicks = Array.from({ length: 6 }, (_, i) => ({
    id: i + 1,
    title: `Pick ${i + 1}`,
  }));

  return (
    <HorizontalScroll
      title="📌 Editor's Picks"
      viewAllLink="#"
      showArrows={true}
    >
      {mockPicks.map((pick) => (
        <div
          key={pick.id}
          className="flex-shrink-0 w-56 bg-white border border-[#E6EAE8] rounded-lg overflow-hidden hover:border-[#0F766E] transition-colors cursor-pointer group"
        >
          {/* Thumbnail */}
          <div className="w-full aspect-video bg-[#E6EAE8] animate-pulse" />

          {/* Content */}
          <div className="p-4">
            <h4 className="font-semibold text-[#0F172A] line-clamp-2 text-sm group-hover:text-[#0F766E] transition-colors">
              {pick.title}
            </h4>
            <p className="text-xs text-[#6B7280] mt-2">2 hari lalu</p>
          </div>

          {/* Pick badge */}
          <div className="absolute top-2 right-2 bg-[#0F766E] text-white text-xs font-bold px-2 py-1 rounded">
            ⭐
          </div>
        </div>
      ))}
    </HorizontalScroll>
  );
};

export default EditorsPicks;
