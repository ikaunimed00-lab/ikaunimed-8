{{-- Ad Inline Component - Iklan di tengah konten artikel --}}
<div class="ad-inline-container" data-position="{{ $position ?? 'middle' }}">
    <div class="ad-inline bg-gray-50 rounded-lg border border-gray-200 py-6 px-4 flex items-center justify-center overflow-hidden"
         style="min-height: 300px;">
        
        <div class="ad-placeholder text-center text-gray-400 w-full">
            @if(config('app.debug') || !config('ads.enabled', false))
                <div class="text-sm font-medium">
                    📢 In-Article Ad
                </div>
                <div class="text-xs mt-2 text-gray-500">
                    Position: {{ $position ?? 'middle' }}
                </div>
                <div class="text-xs mt-1 text-gray-500">
                    Responsive • Auto-format
                </div>
            @else
                <ins class="adsbygoogle"
                     style="display:block; text-align:center;"
                     data-ad-layout="in-article"
                     data-ad-format="fluid"
                     data-ad-client="ca-pub-xxxxxxxxxxxxxxxx"
                     data-ad-slot="in-article-ad"></ins>
                <script>
                    (adsbygoogle = window.adsbygoogle || []).push({});
                </script>
            @endif
        </div>
    </div>
</div>

<style>
    .ad-inline-container {
        /* Spacing di sekitar inline ad */
        margin: 2rem 0;
        width: 100%;
    }
    
    .ad-inline {
        background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%);
        border-radius: 0.5rem;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    }
    
    /* Responsive adjustments */
    @media (max-width: 768px) {
        .ad-inline-container {
            margin: 1.5rem 0;
        }
        
        .ad-inline {
            min-height: 250px;
            padding: 1rem;
        }
    }
</style>
