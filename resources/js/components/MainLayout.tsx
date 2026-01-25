import React, { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';

interface MainLayoutProps {
  children: ReactNode;
  variant?: 'default' | 'full';
}

/**
 * MainLayout - Standard layout for static pages (Info, Media, etc.)
 * Contains only Header, Container, and Footer.
 * No sidebars or ads.
 */
const MainLayout: React.FC<MainLayoutProps> = ({ children, variant = 'default' }) => {
  return (
    <div className="min-h-screen bg-[#F8FAF9] flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {variant === 'default' ? (
          <div className="py-8 sm:py-12">
            <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-[1440px]">
              <div className="bg-white rounded-lg border border-[#E6EAE8] min-h-[500px] shadow-sm">
                {children}
              </div>
            </div>
          </div>
        ) : (
          children
        )}
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;
