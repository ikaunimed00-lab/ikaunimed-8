import TopBar from '@/components/TopBar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import NewsCard from '@/components/NewsCard';
import NewsLayout from '@/components/NewsLayout';
import AdInline from '@/components/AdInline';
import AdSidebar from '@/components/AdSidebar';
import { Head, Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';

interface NewsItem {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  slug: string;
  image?: string | null;
  view_count: number;
  created_at?: string;
  updated_at?: string;
  published_at?: string;
  author?: {
    id: number;
    name?: string | null;
  } | null;
  categories?: Array<{
    name: string;
    slug: string;
  }>;
}

interface RelatedNews extends NewsItem {}

export default function NewsShow({
  news,
  relatedNews = [],
}: {
  news: NewsItem;
  relatedNews?: RelatedNews[];
}) {
  const [shareUrl, setShareUrl] = useState('');

  useEffect(() => {
    setShareUrl(window.location.href);
  }, []);

  const imageUrl = news.image ?? undefined;

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: news.title,
    description: news.excerpt,
    image: imageUrl ? [imageUrl] : undefined,
    datePublished: news.published_at || news.created_at,
    dateModified: news.updated_at || news.created_at,
    author: {
      '@type': 'Person',
      name: news.author?.name || 'Admin',
    },
    publisher: {
      '@type': 'Organization',
      name: 'IKA UNIMED',
      logo: {
        '@type': 'ImageObject',
        url: `${window.location.origin}/images/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': shareUrl,
    },
  };

  // Share URLs
  const shareLinks = {
    whatsapp: `https://wa.me/?text=${encodeURIComponent(news.title + ' ' + shareUrl)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(news.title)}&url=${encodeURIComponent(shareUrl)}`,
  };

  const publishDate = new Date(news.published_at || news.created_at || '').toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <>
      <Head title={`${news.title} - IKA UNIMED`}>
        <meta name="description" content={news.excerpt} />
        <meta property="og:title" content={news.title} />
        <meta property="og:description" content={news.excerpt} />
        {imageUrl && <meta property="og:image" content={imageUrl} />}
        <meta property="og:url" content={shareUrl} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={news.title} />
        <meta name="twitter:description" content={news.excerpt} />
        {imageUrl && <meta name="twitter:image" content={imageUrl} />}
        <link rel="canonical" href={shareUrl} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </Head>

      <div className="min-h-screen bg-[#F8FAF9] flex flex-col">
        <TopBar />
        <Header />

        {/* Article dengan NewsLayout 3 kolom */}
        <NewsLayout>
          <article className="p-4 sm:p-6 lg:p-8">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-[#6B7280] mb-6 overflow-x-auto">
              <Link href={route('news.index')} className="hover:text-[#0F766E] whitespace-nowrap">
                Berita
              </Link>
              <span>/</span>
              {news.categories?.[0] && (
                <>
                  <Link
                    href={route('categories.show', news.categories[0].slug)}
                    className="hover:text-[#0F766E] whitespace-nowrap"
                  >
                    {news.categories[0].slug}
                  </Link>
                  <span>/</span>
                </>
              )}
              <span className="text-[#0F172A] font-medium truncate">{news.title}</span>
            </nav>

            {/* Categories */}
            {news.categories && news.categories.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {news.categories.map(cat => (
                  <Link
                    key={cat.slug}
                    href={route('categories.show', cat.slug)}
                    className="bg-[#0F766E]/10 text-[#0F766E] px-3 py-1 rounded-full text-xs font-semibold hover:bg-[#0F766E]/20"
                  >
                    {cat.slug}
                  </Link>
                ))}
              </div>
            )}

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F172A] mb-6 leading-tight">
              {news.title}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-6 pb-6 border-b border-[#E6EAE8] mb-6 text-sm text-[#6B7280]">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 bg-[#0F766E] rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {news.author?.name?.charAt(0).toUpperCase() || 'A'}
                </span>
                <div>
                  <p className="font-medium text-[#0F172A]">{news.author?.name || 'Admin'}</p>
                  <time dateTime={news.published_at}>{publishDate}</time>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <span>👁️</span>
                <span>{news.view_count.toLocaleString()} pembaca</span>
              </div>
            </div>

            {/* Featured Image */}
            {imageUrl && (
              <figure className="mb-8">
                <img
                  src={imageUrl}
                  alt={news.title}
                  loading="eager"
                  decoding="async"
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              </figure>
            )}

            {/* Excerpt */}
            {news.excerpt && (
              <div className="mb-8 text-lg text-[#374151] font-medium italic border-l-4 border-[#0F766E] pl-4">
                "{news.excerpt}"
              </div>
            )}

            {/* Content dengan Ad Inline */}
            <div className="prose prose-lg max-w-none mb-12 prose-img:rounded-lg prose-img:shadow-lg">
              {/* Parse content dan inject ad di tengah-tengah */}
              {(() => {
                // Split content by paragraph tags untuk smart ad placement
                const sections = news.content.split(/(<p>|<\/p>|<h[2-6]>|<\/h[2-6]>|<figure>|<\/figure>|<blockquote>|<\/blockquote>)/i);
                const paragraphCount = sections.filter(s => s.match(/^<p>/i)).length;
                let currentParagraph = 0;
                const adPosition = Math.ceil(paragraphCount / 2); // Sisipkan di tengah

                return sections.map((section, idx) => {
                  // Count paragraphs
                  if (section.match(/^<p>/i)) {
                    currentParagraph++;
                    // Cek apakah harus tampilin ad setelah section ini
                    if (currentParagraph === adPosition) {
                      return (
                        <div key={idx}>
                          <div dangerouslySetInnerHTML={{ __html: section }} />
                          <AdInline position={`middle-after-paragraph-${currentParagraph}`} />
                        </div>
                      );
                    }
                  }

                  return <div key={idx} dangerouslySetInnerHTML={{ __html: section }} />;
                });
              })()}
            </div>

            {/* Share Section */}
<div className="bg-[#F8FAF9] border border-[#E6EAE8] rounded-lg p-5 mb-8">
  <h3 className="font-bold text-[#0F172A] mb-4 text-sm">
    📢 Bagikan Berita Ini:
  </h3>

  <div className="flex flex-wrap gap-2">
    {/* WhatsApp */}
    <a
      href={shareLinks.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium
                 bg-green-50 text-green-700 hover:bg-green-100 transition"
    >
      <span className="text-base">📱</span>
      <span>WhatsApp</span>
    </a>

    {/* Facebook */}
    <a
      href={shareLinks.facebook}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium
                 bg-blue-50 text-blue-700 hover:bg-blue-100 transition"
    >
      <span className="text-base">👍</span>
      <span>Facebook</span>
    </a>

    {/* Twitter / X */}
    <a
      href={shareLinks.twitter}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium
                 bg-gray-100 text-gray-800 hover:bg-gray-200 transition"
    >
      <span className="text-base">𝕏</span>
      <span>Twitter</span>
    </a>

    {/* Copy Link */}
    <button
      onClick={() => {
        navigator.clipboard.writeText(shareUrl);
        alert('Link berhasil disalin!');
      }}
      className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium
                 bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
    >
      <span className="text-base">🔗</span>
      <span>Salin Link</span>
    </button>
  </div>
</div>


            {/* Back to news */}
            <Link
              href={route('news.index')}
              className="inline-flex items-center gap-2 text-[#0F766E] font-medium hover:text-[#115E59] transition-colors"
            >
              <span>←</span> Kembali ke Berita Lainnya
            </Link>
          </article>
        </NewsLayout>

        {/* Related News - Full width section */}
        {relatedNews && relatedNews.length > 0 && (
          <section className="bg-white border-t border-[#E6EAE8] py-12 sm:py-16">
            <div className="w-full">
              <div className="mx-auto px-4 sm:px-6 lg:px-0 max-w-[1440px]">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
                  <div className="hidden lg:block lg:col-span-1"></div>
                  <div className="col-span-1 lg:col-span-7 xl:col-span-6">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                      Berita Terkait
                    </h2>
                    <p className="text-gray-600 mb-8">
                      Artikel lain yang mungkin kamu tertarik
                    </p>

                    <div className="space-y-4 sm:space-y-6">
                      {relatedNews.slice(0, 3).map(item => (
                        <NewsCard key={item.id} {...item} />
                      ))}
                    </div>
                  </div>
                  <div className="col-span-1 lg:col-span-4 xl:col-span-5"></div>
                </div>
              </div>
            </div>
          </section>
        )}

        <Footer />
      </div>
    </>
  );
}
