import React, { useEffect, useState } from 'react';
import { Link } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { formatNumber } from '@/lib/utils';

/* =========================
   TYPES
========================= */
interface NewsItem {
  id: number;
  title: string;
  slug: string;
  image?: string | null;
  view_count?: number;
}

/* =========================
   SIDEBAR SECTION WRAPPER
========================= */
const SidebarSection: React.FC<{
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}> = ({ title, icon, children }) => (
  <div className="mb-6 bg-white rounded-lg border border-[#E6EAE8] p-4">
    <div className="flex items-center gap-2 mb-4 pb-2 border-b border-[#E6EAE8]">
      {icon && <span className="text-sm">{icon}</span>}
      <h3 className="text-sm font-semibold text-[#0F172A]">{title}</h3>
    </div>
    {children}
  </div>
);

/* =========================
   MINI NEWS ITEM
========================= */
const NewsItemSmall: React.FC<NewsItem> = ({ title, slug, image, view_count }) => (
  <Link href={route('news.show', slug)} className="group block">
    <div className="flex gap-3 pb-3 mb-3 last:pb-0 last:mb-0 border-b border-gray-100 last:border-b-0">
      {image && (
        <div className="w-16 h-16 rounded overflow-hidden bg-gray-200 flex-shrink-0">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition"
          />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-medium text-[#0F172A] line-clamp-2 group-hover:text-[#0F766E]">
          {title}
        </h4>
        {view_count && (
          <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
            <span>👁️</span>
            <span>{formatNumber(view_count)}</span>
          </p>
        )}
      </div>
    </div>
  </Link>
);

/* =========================
   POPULAR NEWS
========================= */
const PopularNewsList: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(route('news.trending'))
      .then(res => res.json())
      .then(data => {
        setNews(data.slice(0, 5));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map(i => (
          <div key={i} className="h-16 bg-gray-100 rounded animate-pulse" />
        ))}
      </div>
    );
  }

  if (!news.length) {
    return <p className="text-sm text-gray-500">Belum ada berita populer</p>;
  }

  return (
    <div>
      {news.map(item => (
        <NewsItemSmall key={item.id} {...item} />
      ))}
    </div>
  );
};

/* =========================
   AD SLOT (MOBILE + DESKTOP)
========================= */
const AdSidebarSlot: React.FC<{ minHeight?: number }> = ({ minHeight = 250 }) => (
  <div className="bg-gray-50 border border-dashed border-gray-300 rounded-lg p-4 text-center">
    <p className="text-[10px] uppercase tracking-wide text-gray-500 mb-2">
      Iklan
    </p>
    <div
      className="flex items-center justify-center bg-gray-100 rounded"
      style={{ minHeight }}
    >
      {/* AdSense / Adsera script injected here */}
    </div>
  </div>
);

/* =========================
   INFO ALUMNI (NON-IKLAN)
========================= */
const InfoAlumni: React.FC = () => (
  <SidebarSection title="Info Alumni" icon="🎓">
    <ul className="space-y-2 text-sm">
      <li>
        <Link href="#" className="text-[#0F766E] hover:underline">
          Kontribusi Alumni
        </Link>
      </li>
      <li>
        <Link href="#" className="text-[#0F766E] hover:underline">
          Program Alumni
        </Link>
      </li>
      <li>
        <Link href="#" className="text-[#0F766E] hover:underline">
          Agenda Alumni
        </Link>
      </li>
      <li>
        <Link href="#" className="text-[#0F766E] hover:underline">
          Kirim Opini
        </Link>
      </li>
    </ul>
  </SidebarSection>
);

/* =========================
   MAIN SIDEBAR
========================= */
const NewsSidebar: React.FC = () => {
  return (
    <aside className="space-y-6">
      {/* BERITA POPULER */}
      <SidebarSection title="Berita Populer" icon="🔥">
        <PopularNewsList />
      </SidebarSection>

      {/* IKLAN SIDEBAR – PRIMARY */}
      <AdSidebarSlot minHeight={250} />

      {/* INFO ALUMNI (EDITORIAL) */}
      <InfoAlumni />

      {/* IKLAN SIDEBAR – SECONDARY */}
      <AdSidebarSlot minHeight={300} />
    </aside>
  );
};

export default NewsSidebar;
