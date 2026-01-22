import React from 'react';

interface SidebarSectionProps {
  title: string;
  icon?: string;
  children: React.ReactNode;
  action?: {
    label: string;
    href: string;
  };
}

/**
 * SidebarSection - Reusable wrapper untuk sidebar sections
 * Digunakan di EditorialSidebar
 */
export const SidebarSection: React.FC<SidebarSectionProps> = ({
  title,
  icon,
  children,
  action,
}) => (
  <div className="bg-white border border-[#E6EAE8] rounded-lg overflow-hidden">
    {/* Header */}
    <div className="px-5 py-4 border-b border-[#E6EAE8] bg-[#F8FAF9]">
      <div className="flex items-center justify-between gap-2">
        <h3 className="font-bold text-[#0F172A] text-base flex items-center gap-2">
          {icon && <span className="text-lg">{icon}</span>}
          <span>{title}</span>
        </h3>
        {action && (
          <a
            href={action.href}
            className="text-xs text-[#0F766E] font-medium hover:text-[#115E59] transition-colors whitespace-nowrap"
          >
            {action.label}
          </a>
        )}
      </div>
    </div>

    {/* Content */}
    <div className="p-5">{children}</div>
  </div>
);

/**
 * EditorialSidebar - Komponen sidebar editorial dengan multiple sections
 * Placeholder dengan skeleton loading
 */
export const EditorialSidebar: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* 1. Editor's Picks */}
      <SidebarSection
        title="Editor's Picks"
        icon="📌"
        action={{ label: 'Lihat', href: '#' }}
      >
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex gap-3 pb-3 last:pb-0 border-b border-[#E6EAE8] last:border-0">
              <div className="flex-shrink-0 w-16 h-16 bg-[#E6EAE8] rounded animate-pulse" />
              <div className="flex-1 min-w-0 space-y-2">
                <div className="h-3 bg-[#E6EAE8] rounded w-full animate-pulse" />
                <div className="h-2 bg-[#E6EAE8] rounded w-3/4 animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </SidebarSection>

      {/* 2. Berita Populer */}
      <SidebarSection
        title="Berita Populer"
        icon="🔥"
        action={{ label: 'Baca', href: '#' }}
      >
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="pb-3 border-b border-[#E6EAE8] last:pb-0 last:border-0">
              <div className="h-4 bg-[#E6EAE8] rounded w-full mb-2 animate-pulse" />
              <div className="h-3 bg-[#E6EAE8] rounded w-2/3 animate-pulse" />
            </div>
          ))}
        </div>
      </SidebarSection>

      {/* 3. Tag Populer */}
      <SidebarSection title="Tag Populer" icon="#️⃣">
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 8 }).map((_, i) => (
            <button
              key={i}
              className="px-3 py-1.5 bg-[#F8FAF9] border border-[#E6EAE8] rounded-full text-xs font-medium text-[#0F172A] hover:border-[#0F766E] hover:text-[#0F766E] transition-colors"
            >
              {/* Placeholder tag */}
              <div className="h-3 bg-[#E6EAE8] rounded w-12 animate-pulse" />
            </button>
          ))}
        </div>
      </SidebarSection>

      {/* 4. Kolom Opini */}
      <SidebarSection
        title="Kolom Opini"
        icon="💬"
        action={{ label: 'Baca', href: '#' }}
      >
        <div className="space-y-4">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="pb-4 border-b border-[#E6EAE8] last:pb-0 last:border-0">
              <div className="h-4 bg-[#E6EAE8] rounded w-full mb-2 animate-pulse" />
              <div className="h-3 bg-[#E6EAE8] rounded w-1/2 animate-pulse" />
            </div>
          ))}
        </div>
      </SidebarSection>

      {/* 5. Komentar Terbanyak */}
      <SidebarSection title="Komentar Terbanyak" icon="💭">
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="pb-3 border-b border-[#E6EAE8] last:pb-0 last:border-0">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 bg-[#E6EAE8] rounded-full animate-pulse flex-shrink-0" />
                <div className="h-2 bg-[#E6EAE8] rounded w-20 animate-pulse" />
              </div>
              <div className="h-3 bg-[#E6EAE8] rounded w-full animate-pulse" />
            </div>
          ))}
        </div>
      </SidebarSection>

      {/* 6. Campaign Donasi */}
      <SidebarSection title="Donasi Organisasi" icon="❤️">
        <div className="bg-gradient-to-br from-[#0F766E]/5 to-[#0F766E]/10 rounded-lg p-4 text-center space-y-3">
          <div className="h-8 bg-[#E6EAE8] rounded w-3/4 mx-auto animate-pulse" />
          <div className="h-4 bg-[#E6EAE8] rounded w-full animate-pulse" />
          <button className="w-full bg-[#0F766E] text-white py-2 rounded-lg font-medium hover:bg-[#115E59] transition-colors">
            Berdonasi
          </button>
        </div>
      </SidebarSection>

      {/* 7. Rekomendasi untuk Anda */}
      <SidebarSection
        title="Rekomendasi"
        icon="💡"
        action={{ label: 'Lihat', href: '#' }}
      >
        <div className="space-y-3">
          {/* Horizontal scroll items (2 items) */}
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {Array.from({ length: 2 }).map((_, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-32 h-20 bg-[#E6EAE8] rounded animate-pulse"
              />
            ))}
          </div>

          {/* Vertical items (4 items) */}
          <div className="space-y-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-12 bg-[#E6EAE8] rounded animate-pulse" />
            ))}
          </div>
        </div>
      </SidebarSection>
    </div>
  );
};

export default EditorialSidebar;
