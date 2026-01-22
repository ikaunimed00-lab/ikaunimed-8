import React from 'react';

/**
 * TagPopuler - Section untuk popular tags/keywords
 * Dapat di-integrate ke sidebar atau main content
 */
interface TagPopulerProps {
  maxTags?: number;
}

export const TagPopuler: React.FC<TagPopulerProps> = ({ maxTags = 12 }) => {
  const mockTags = Array.from({ length: maxTags }, (_, i) => ({
    id: i + 1,
    name: `#Tag${i + 1}`,
    count: Math.floor(Math.random() * 500) + 10,
  }));

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between px-1">
        <h3 className="text-lg font-bold text-[#0F172A]">#️⃣ Tag Populer</h3>
        <a href="#" className="text-sm text-[#0F766E] font-medium hover:text-[#115E59] transition-colors">
          Lihat Semua →
        </a>
      </div>

      {/* Tags grid */}
      <div className="flex flex-wrap gap-2">
        {mockTags.map((tag) => (
          <button
            key={tag.id}
            className="px-3 py-1.5 bg-white border border-[#E6EAE8] rounded-full text-xs font-medium text-[#0F172A] hover:border-[#0F766E] hover:text-[#0F766E] hover:bg-[#0F766E]/5 transition-all group"
          >
            <span>{tag.name}</span>
            <span className="text-[#6B7280] group-hover:text-[#0F766E] transition-colors">
              {' '}
              ({tag.count})
            </span>
          </button>
        ))}
      </div>

      {/* View all button */}
      <div className="pt-2">
        <button className="w-full px-4 py-2 bg-[#F8FAF9] border border-[#E6EAE8] text-[#0F172A] font-medium rounded-lg hover:border-[#0F766E] hover:bg-[#0F766E]/5 transition-colors text-sm">
          Lihat Semua Tag
        </button>
      </div>
    </div>
  );
};

export default TagPopuler;
