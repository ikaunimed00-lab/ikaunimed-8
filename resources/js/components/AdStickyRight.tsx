import React from 'react';

/**
 * AdStickyRight - Right sidebar sticky advertisement
 * Displays in 4-column layout on desktop only (≥1280px)
 * Size: Flexible, typically 160px-200px width
 * Position: Sticky to viewport, top offset 96px
 */
const AdStickyRight: React.FC = () => {
  return (
    <div className="space-y-4">
      {/* Right Ad Slot 1 - 160x600 or 200x600 */}
      <div className="bg-gray-100 rounded-lg border border-gray-200 p-4 text-center">
        <div className="flex items-center justify-center" style={{ minHeight: '400px' }}>
          <div className="text-gray-400">
            <div className="text-4xl mb-2">📢</div>
            <p className="text-xs font-semibold uppercase tracking-wide">Right Ad 1</p>
            <p className="text-xs mt-2 text-gray-500">
              Desktop Only<br />
              (≥1280px)
            </p>
          </div>
        </div>
      </div>

      {/* Right Ad Slot 2 - Optional */}
      <div className="bg-gray-100 rounded-lg border border-gray-200 p-4 text-center">
        <div className="flex items-center justify-center" style={{ minHeight: '300px' }}>
          <div className="text-gray-400">
            <div className="text-4xl mb-2">📢</div>
            <p className="text-xs font-semibold uppercase tracking-wide">Right Ad 2</p>
            <p className="text-xs mt-2 text-gray-500">
              Desktop Only<br />
              (≥1280px)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdStickyRight;
