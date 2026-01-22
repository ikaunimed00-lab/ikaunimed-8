import { ReactNode } from 'react';

interface AdSidebarProps {
  /** Show second ad slot (300x600) */
  showSecondSlot?: boolean;
  /** Custom className */
  className?: string;
  /** Children untuk custom content */
  children?: ReactNode;
}

/**
 * AdSidebar Component
 * Sidebar ads yang sticky di desktop
 * Hidden di mobile untuk UX yang lebih baik
 */
export default function AdSidebar({ showSecondSlot = true, className = '', children }: AdSidebarProps) {
  return (
    <div className={`ad-sidebar-wrapper hidden lg:block ${className}`}>
      <div className="ad-sidebar sticky top-20 space-y-4" style={{ maxHeight: 'calc(100vh - 100px)', overflowY: 'auto' }}>
        {/* Sidebar Ad Slot 1 - 300x250 */}
        <div className="ad-slot bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center overflow-hidden" style={{ width: '300px', minHeight: '250px' }}>
          <div className="ad-placeholder text-center text-gray-400 p-4 w-full">
            <div className="text-sm font-medium">📢 Sidebar Ad 1</div>
            <div className="text-xs mt-1 text-gray-500">300x250 • Display</div>
            <div className="text-xs mt-2 text-gray-500">
              Google AdSense<br />
              will appear here
            </div>
          </div>
        </div>

        {/* Sidebar Ad Slot 2 - 300x600 (Optional) */}
        {showSecondSlot && (
          <div
            className="ad-slot bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center overflow-hidden"
            style={{ width: '300px', minHeight: '600px' }}
          >
            <div className="ad-placeholder text-center text-gray-400 p-4 w-full">
              <div className="text-sm font-medium">📢 Sidebar Ad 2</div>
              <div className="text-xs mt-1 text-gray-500">300x600 • Tall Display</div>
              <div className="text-xs mt-2 text-gray-500">
                Google AdSense<br />
                will appear here
              </div>
            </div>
          </div>
        )}

        {children}
      </div>

      <style>{`
        .ad-sidebar-wrapper {
          display: none;
        }
        
        @media (min-width: 1024px) {
          .ad-sidebar-wrapper {
            display: block;
          }
        }
        
        .ad-slot {
          background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%);
          border-radius: 0.5rem;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }
        
        .ad-placeholder {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100%;
        }
      `}</style>
    </div>
  );
}
