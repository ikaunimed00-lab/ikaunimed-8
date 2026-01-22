import React from 'react';
import { Link } from '@inertiajs/react';

interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

interface PaginationProps {
  links: PaginationLink[];
  current_page: number;
  last_page: number;
}

const Pagination: React.FC<PaginationProps> = ({ links, current_page, last_page }) => {
  return (
    <div className="flex justify-center mt-12 mb-8">
      <nav className="inline-flex gap-1 bg-white rounded-lg border border-[#E6EAE8] p-2">
        {links.map((link, index) => {
          // Skip the first and last items (Previous/Next links)
          if (!link.url || link.label.includes('‹') || link.label.includes('›')) {
            return null;
          }

          return (
            <Link
              key={index}
              href={link.url}
              className={`px-3 py-2 rounded font-medium text-sm transition-colors ${
                link.active
                  ? 'bg-[#0F766E] text-white'
                  : 'text-[#0F172A] hover:bg-[#F8FAF9]'
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Pagination;
