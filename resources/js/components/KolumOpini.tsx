import React from 'react';

/**
 * KolumOpini - Section untuk opinion columns/editorial
 * Menampilkan penulis, judul kolom, dan preview
 */
interface KolumOpiniProps {
  maxItems?: number;
}

export const KolumOpini: React.FC<KolumOpiniProps> = ({ maxItems = 4 }) => {
  const mockColumns = Array.from({ length: maxItems }, (_, i) => ({
    id: i + 1,
    author: `Penulis ${i + 1}`,
    title: `Kolom Opini ${i + 1}`,
    category: i % 2 === 0 ? '💡 Ilmiah' : '📝 Opini',
  }));

  return (
    <div className="space-y-3 mb-8">
      {/* Header */}
      <div className="flex items-center justify-between px-1">
        <h3 className="text-lg font-bold text-[#0F172A]">📝 Kolom & Opini</h3>
        <a href="#" className="text-sm text-[#0F766E] font-medium hover:text-[#115E59] transition-colors">
          Selengkapnya →
        </a>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockColumns.map((column) => (
          <article
            key={column.id}
            className="bg-white border border-[#E6EAE8] rounded-lg p-4 hover:border-[#0F766E] transition-colors cursor-pointer group"
          >
            {/* Category badge */}
            <div className="inline-block px-2 py-1 bg-[#0F766E]/10 text-[#0F766E] text-xs font-semibold rounded mb-3">
              {column.category}
            </div>

            {/* Author */}
            <p className="text-xs text-[#6B7280] font-medium mb-2">
              oleh <span className="text-[#0F172A] font-semibold">{column.author}</span>
            </p>

            {/* Title */}
            <h4 className="font-semibold text-[#0F172A] line-clamp-2 text-base group-hover:text-[#0F766E] transition-colors">
              {column.title}
            </h4>

            {/* Meta */}
            <div className="mt-3 pt-3 border-t border-[#E6EAE8] flex items-center justify-between text-xs text-[#6B7280]">
              <span>2 hari lalu</span>
              <a href="#" className="text-[#0F766E] font-medium hover:text-[#115E59]">
                Baca →
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default KolumOpini;
