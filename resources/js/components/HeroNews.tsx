import React from 'react';
import { Link } from '@inertiajs/react';
import { formatDistanceToNow } from 'date-fns';
import { id } from 'date-fns/locale';
import { formatNumber } from '@/lib/utils';

interface HeroNewsProps {
  id: number;
  title: string;
  excerpt: string;
  slug: string;
  image: string | null;
  view_count: number;
  published_at: string;
  author?: {
    name: string;
  };
  categories?: Array<{
    name: string;
    slug: string;
  }>;
}

const HeroNews: React.FC<HeroNewsProps> = ({
  title,
  excerpt,
  slug,
  image,
  view_count,
  published_at,
  author,
  categories,
}) => {
  return (
    <Link href={`/news/${slug}`}>
      <article className="group cursor-pointer">
        {/* Hero Image Container */}
        <div className="relative overflow-hidden rounded-xl h-96 sm:h-[500px] bg-[#E6EAE8] mb-6">
          {image ? (
            <img
              src={image}
              alt={title}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-[#E6EAE8]">
              <svg className="w-20 h-20 text-[#6B7280]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}

          {/* Dark overlay untuk readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

          {/* Content overlay di bottom */}
          <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8 text-white">
            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-4">
              {categories && categories.length > 0 && (
                <span className="bg-[#0F766E] text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                  {categories[0].name}
                </span>
              )}
              <span className="bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium">
                👁️ {formatNumber(view_count)} Views
              </span>
            </div>

            {/* Title */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 group-hover:text-[#7FE8E0] transition-colors line-clamp-3">
              {title}
            </h2>

            {/* Excerpt */}
            <p className="text-gray-100 text-base sm:text-lg mb-4 line-clamp-2">
              {excerpt}
            </p>

            {/* Meta */}
            <div className="flex items-center gap-4 text-sm">
              {author?.name && (
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 bg-[#0F766E] rounded-full flex items-center justify-center font-bold">
                    {author.name.charAt(0)}
                  </span>
                  <span>{author.name}</span>
                </div>
              )}
              <time dateTime={published_at} className="text-gray-200">
                {formatDistanceToNow(new Date(published_at), {
                  addSuffix: true,
                  locale: id,
                })}
              </time>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default HeroNews;
