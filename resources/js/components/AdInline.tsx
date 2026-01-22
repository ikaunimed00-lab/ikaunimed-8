import { ReactNode } from 'react';

interface AdInlineProps {
  /** Position identifier untuk ads system */
  position?: string;
  /** Styling className */
  className?: string;
  /** Children atau custom content */
  children?: ReactNode;
}

/**
 * AdInline Component
 * Menampilkan inline ad slot di dalam konten artikel
 * Responsif dan mudah diintegrasikan
 */
export default function AdInline({
  position = 'middle',
  className = '',
  children = null,
}: AdInlineProps) {
  return (
    <div className={`ad-inline-container my-8 ${className}`} data-position={position}>
      <div className="ad-inline bg-gray-50 rounded-lg border border-gray-200 py-8 px-4 flex items-center justify-center overflow-hidden">
        <div className="ad-placeholder text-center text-gray-400 w-full">
          {children ? (
            children
          ) : (
            <>
              <div className="text-sm font-medium">📢 In-Article Ad Slot</div>
              <div className="text-xs mt-2 text-gray-500">Position: {position}</div>
              <div className="text-xs mt-1 text-gray-500">
                Google AdSense will appear here in production
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
