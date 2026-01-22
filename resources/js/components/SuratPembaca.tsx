import React from 'react';

/**
 * SuratPembaca - Section untuk reader letters/feedback
 * Menampilkan surat/masukan dari pembaca
 */
interface SuratPembakaProps {
  maxItems?: number;
}

export const SuratPembaca: React.FC<SuratPembakaProps> = ({ maxItems = 3 }) => {
  const mockLetters = Array.from({ length: maxItems }, (_, i) => ({
    id: i + 1,
    author: `Pembaca ${i + 1}`,
    subject: `Surat Pembaca #${i + 1}`,
    excerpt: 'Ringkasan singkat dari isi surat pembaca...',
    status: i % 2 === 0 ? '✓ Ditampilkan' : '⏳ Menunggu Moderasi',
  }));

  return (
    <div className="bg-white border border-[#E6EAE8] rounded-lg p-5 mb-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 pb-4 border-b border-[#E6EAE8]">
        <h3 className="text-lg font-bold text-[#0F172A]">✉️ Surat Pembaca</h3>
        <a href="#" className="text-sm text-[#0F766E] font-medium hover:text-[#115E59] transition-colors">
          Kirim Surat →
        </a>
      </div>

      {/* Letters list */}
      <div className="space-y-3">
        {mockLetters.map((letter) => (
          <article key={letter.id} className="pb-3 border-b border-[#E6EAE8] last:pb-0 last:border-0">
            {/* Header */}
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="flex-1 min-w-0">
                <p className="text-xs text-[#6B7280] font-medium">Dari: {letter.author}</p>
                <h4 className="font-semibold text-[#0F172A] text-sm line-clamp-1">
                  {letter.subject}
                </h4>
              </div>
              <span
                className={`flex-shrink-0 text-xs font-medium px-2 py-1 rounded whitespace-nowrap ${
                  letter.status.includes('Ditampilkan')
                    ? 'bg-green-100 text-green-700'
                    : 'bg-yellow-100 text-yellow-700'
                }`}
              >
                {letter.status}
              </span>
            </div>

            {/* Excerpt */}
            <p className="text-sm text-[#374151] mb-2 line-clamp-2">{letter.excerpt}</p>

            {/* Action */}
            <a href="#" className="text-xs text-[#0F766E] font-medium hover:text-[#115E59] transition-colors">
              Baca Selengkapnya →
            </a>
          </article>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-5 pt-4 border-t border-[#E6EAE8]">
        <button className="w-full px-4 py-2 bg-[#0F766E] text-white font-medium rounded-lg hover:bg-[#115E59] transition-colors text-sm">
          📝 Tulis Surat Pembaca
        </button>
      </div>
    </div>
  );
};

export default SuratPembaca;
