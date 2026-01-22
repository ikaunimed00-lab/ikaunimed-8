import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface HorizontalScrollProps {
  children: React.ReactNode;
  title: string;
  viewAllLink?: string;
  showArrows?: boolean;
}

/**
 * HorizontalScroll - Reusable wrapper untuk horizontal scrolling content
 * Used for: Flash Content, Editor's Picks, Recommended items
 */
export const HorizontalScroll: React.FC<HorizontalScrollProps> = ({
  children,
  title,
  viewAllLink = '#',
  showArrows = true,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const container = scrollContainerRef.current;
    if (container) {
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(container.scrollLeft < container.scrollWidth - container.clientWidth);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = 400;
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
      setTimeout(checkScroll, 300);
    }
  };

  React.useEffect(() => {
    checkScroll();
    const container = scrollContainerRef.current;
    container?.addEventListener('scroll', checkScroll);
    return () => container?.removeEventListener('scroll', checkScroll);
  }, []);

  return (
    <div className="space-y-3 mb-6">
      {/* Header */}
      <div className="flex items-center justify-between px-1">
        <h3 className="text-lg font-bold text-[#0F172A]">{title}</h3>
        <a href={viewAllLink} className="text-sm text-[#0F766E] font-medium hover:text-[#115E59] transition-colors">
          Lihat Semua →
        </a>
      </div>

      {/* Scroll container dengan kontrol */}
      <div className="relative group">
        {/* Left Arrow */}
        {showArrows && canScrollLeft && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white p-2 rounded-full shadow-md transition-all"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5 text-[#0F766E]" />
          </button>
        )}

        {/* Scroll Area */}
        <div
          ref={scrollContainerRef}
          className="overflow-x-auto scrollbar-hide pb-2"
          style={{ scrollBehavior: 'smooth' }}
        >
          <div className="flex gap-4 w-max px-1">{children}</div>
        </div>

        {/* Right Arrow */}
        {showArrows && canScrollRight && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white p-2 rounded-full shadow-md transition-all"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5 text-[#0F766E]" />
          </button>
        )}
      </div>
    </div>
  );
};

export default HorizontalScroll;
