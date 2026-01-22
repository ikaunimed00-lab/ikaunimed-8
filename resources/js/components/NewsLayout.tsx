import React, { ReactNode } from 'react';
import NewsSidebar from './NewsSidebar';
import AdStickyLeft from './AdStickyLeft';
import AdStickyRight from './AdStickyRight';

interface NewsLayoutProps {
  children: ReactNode;
  sidebar?: boolean;
}

/**
 * NewsLayout - Professional news portal layout component
 * Inspired by detik.com, kompas.com, cnnindonesia.com
 *
 * DESKTOP (≥1280px): 4-column layout
 *   col-span-1 : Sticky left advertisement
 *   col-span-6 : Main news content
 *   col-span-3 : Editorial sidebar (popular, commented, etc)
 *   col-span-2 : Sticky right advertisement
 *
 * TABLET (1024–1279px): 3-column layout (ads hidden)
 *   col-span-0 : Left ad (hidden)
 *   col-span-9 : Main content
 *   col-span-3 : Sidebar
 *   col-span-0 : Right ad (hidden)
 *
 * MOBILE (<1024px): 1-column layout
 *   Full width: Main content
 *   Below: Sidebar (stacked vertically)
 *   Ads: Completely hidden
 */
const NewsLayout: React.FC<NewsLayoutProps> = ({ children, sidebar = true }) => {
  return (
    <div className="min-h-screen bg-[#F8FAF9]">
      <main className="py-8 sm:py-12">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-[1440px]">
          
          {/* Desktop + Tablet Grid (≥1024px): Sidebar visible */}
          <div className="hidden lg:grid grid-cols-12 gap-4 xl:gap-6">
            
            {/* COLUMN 1: Sticky Left Ad (Desktop only, ≥1280px) */}
            <div className="hidden xl:block xl:col-span-1">
              <div className="sticky top-24 h-fit">
                <AdStickyLeft />
              </div>
            </div>

            {/* COLUMN 2: Main Content (Responsive width) */}
            {/* Desktop: col-span-6 (with side ads) */}
            {/* Tablet: col-span-9 (ads hidden) */}
            <div className="col-span-9 xl:col-span-6">
              <div className="bg-white rounded-lg border border-[#E6EAE8]">
                {children}
              </div>
            </div>

            {/* COLUMN 3: Editorial Sidebar (Tablet + Desktop) */}
            {sidebar && (
              <div className="col-span-3">
                <NewsSidebar />
              </div>
            )}

            {/* COLUMN 4: Sticky Right Ad (Desktop only, ≥1280px) */}
            <div className="hidden xl:block xl:col-span-2">
              <div className="sticky top-24 h-fit">
                <AdStickyRight />
              </div>
            </div>
          </div>

          {/* Mobile Layout (<1024px): Single column */}
          <div className="lg:hidden">
            {/* Main content full width */}
            <div className="bg-white rounded-lg border border-[#E6EAE8] mb-6">
              {children}
            </div>

            {/* Sidebar stacked below on mobile */}
            {sidebar && <NewsSidebar />}
          </div>

        </div>
      </main>
    </div>
  );
};

export default NewsLayout;
