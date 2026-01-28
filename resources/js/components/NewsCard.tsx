import React from 'react';
import { Link } from '@inertiajs/react';
import { formatDistanceToNow } from 'date-fns';
import { id } from 'date-fns/locale';
import { formatNumber } from '@/lib/utils';

interface NewsCardProps {
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
  organization?: {
    id: number;
    name: string;
    type: 'pp' | 'dpw' | 'dpc';
    slug: string;
  };
  categories?: Array<{
    name: string;
    slug: string;
  }>;
  size?: 'sm' | 'md' | 'lg';
}

const NewsCard: React.FC<NewsCardProps> = ({
  title,
  excerpt,
  slug,
  image,
  view_count,
  published_at,
  author,
  organization,
  categories,
  size = 'md',
}) => {
  const [imageError, setImageError] = React.useState(false);
  const [imageLoaded, setImageLoaded] = React.useState(false);

  const getImageUrl = (img: string | null): string | null => {
    if (!img) return null;
    // Handle various image path formats
    if (img.startsWith('http')) return img;
    if (img.startsWith('/')) return img;
    return `/storage/${img}`;
  };

  const sizeClasses = {
    sm: 'grid-cols-1',
    md: 'grid-cols-2 gap-4',
    lg: 'grid-cols-1 gap-6',
  };

  const imgUrl = getImageUrl(image);

  const badgeColor = {
    pp: "bg-indigo-100 text-indigo-700",
    dpw: "bg-emerald-100 text-emerald-700",
    dpc: "bg-sky-100 text-sky-700",
  };

  return (
    <Link href={`/news/${slug}`}>
      <article className="bg-white rounded-lg overflow-hidden hover:border-[#0F766E] transition-colors duration-300 border border-[#E6EAE8] group cursor-pointer h-full">
        {/* Image Container dengan lazy loading */}
        <div className="relative overflow-hidden bg-[#E6EAE8] h-48 sm:h-56">
          {imgUrl && !imageError ? (
            <>
              {!imageLoaded && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse" />
              )}
              <img
                src={imgUrl}
                alt={title}
                loading="lazy"
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
                className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
              />
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-[#E6EAE8]">
              <svg className="w-12 h-12 text-[#6B7280]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
          
          {/* Badge Kategori di corner */}
          {categories && categories.length > 0 && (
            <div className="absolute top-3 left-3 bg-[#0F766E] text-white px-2 py-1 rounded text-xs font-semibold z-10">
              {categories[0].name}
            </div>
          )}
          
          {/* View count badge */}
          <div className="absolute top-3 right-3 bg-black/60 text-white px-2 py-1 rounded text-xs font-medium z-10">
            👁️ {formatNumber(view_count)}
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5">
          {/* Organization Badge */}
          {organization && (
             <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium mb-2 ${badgeColor[organization.type.toLowerCase() as keyof typeof badgeColor] ?? "bg-slate-100 text-slate-700"}`}>
               {organization.type.toUpperCase()} {organization.name}
             </span>
          )}

          {/* Kategori di content */}
          {categories && categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-2">
              {categories.slice(0, 2).map((cat) => (
                <span key={cat.slug} className="text-xs text-[#0F766E] bg-[#F8FAF9] px-2 py-1 rounded border border-[#E6EAE8]">
                  {cat.name}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h3 className="text-lg font-bold text-[#0F172A] mb-2 line-clamp-2 group-hover:text-[#0F766E] transition-colors">
            {title}
          </h3>

          {/* Excerpt */}
          <p className="text-[#374151] text-sm mb-3 line-clamp-2">
            {excerpt}
          </p>

          {/* Footer: Author & Date */}
          <div className="flex items-center justify-between pt-3 border-t border-[#E6EAE8] text-xs text-[#6B7280]">
            <div className="flex items-center gap-1">
              {author?.name && (
                <>
                  <span className="w-6 h-6 bg-[#E6EAE8] rounded-full flex items-center justify-center font-bold text-[#0F766E]">
                    {author.name.charAt(0)}
                  </span>
                  <span>{author.name}</span>
                </>
              )}
            </div>
            <time dateTime={published_at}>
              {formatDistanceToNow(new Date(published_at), {
                addSuffix: true,
                locale: id,
              })}
            </time>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default NewsCard;
