import { ReactNode } from 'react';

interface AdListItemProps {
  /** Position/item number setelah mana iklan ditampilkan */
  afterItem?: number;
  /** Custom className */
  className?: string;
  /** Custom children content */
  children?: ReactNode;
}

/**
 * AdListItem Component
 * Menampilkan ad slot di antara list berita
 * Responsive: 728x90 (desktop), 320x50 (mobile)
 */
export default function AdListItem({ afterItem = 0, className = '', children }: AdListItemProps) {
  return (
    <div className={`ad-list-item bg-white rounded-lg border border-gray-200 p-4 my-4 flex items-center justify-center ${className}`}>
      <div className="ad-placeholder text-center text-gray-400 w-full py-8">
        {children ? (
          children
        ) : (
          <>
            <div className="text-sm font-medium">📢 List Ad Item</div>
            {afterItem > 0 && <div className="text-xs mt-2 text-gray-500">After item #{afterItem}</div>}
            <div className="text-xs mt-1 text-gray-500">
              728x90 (Desktop) • 320x50 (Mobile)
            </div>
            <div className="text-xs mt-2 text-gray-500">
              Google AdSense<br />
              will appear here
            </div>
          </>
        )}
      </div>

      <style>{`
        .ad-list-item {
          transition: all 0.2s ease;
          background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%);
          border-color: #e5e7eb;
        }
        
        .ad-list-item:hover {
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }
        
        .ad-placeholder {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 120px;
        }
        
        @media (max-width: 768px) {
          .ad-list-item {
            margin: 1rem 0;
            padding: 1rem;
          }
          
          .ad-placeholder {
            min-height: 100px;
            font-size: 0.85rem;
          }
        }
      `}</style>
    </div>
  );
}
