import React from 'react';

/**
 * AdStickyLeft - Left sidebar sticky advertisement
 * Displays in 4-column layout on desktop only (≥1280px)
 * Size: Flexible, typically 160px-200px width
 * Position: Sticky to viewport, top offset 96px
 */
const AdStickyLeft: React.FC = () => {
  return (
    <div className="bg-gray-100 rounded-lg border border-gray-200 p-4 text-center">
      <div className="flex items-center justify-center" style={{ minHeight: '600px' }}>
        <div className="text-gray-400">
          <div className="text-4xl mb-2">📢</div>
          <p className="text-xs font-semibold uppercase tracking-wide">Left Ad</p>
          <p className="text-xs mt-2 text-gray-500">
            Desktop Only<br />
            (≥1280px)
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdStickyLeft;
