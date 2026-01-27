import { Head, Link } from '@inertiajs/react';
import React from 'react';
import TopBar from '@/components/TopBar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroNews from '@/components/HeroNews';
import NewsCard from '@/components/NewsCard';
import CategoryNavigation from '@/components/CategoryNavigation';
import Pagination from '@/components/Pagination';
import NewsLayout from '@/components/NewsLayout';
import AdListItem from '@/components/AdListItem';
import { FlashContent, PollingSection, VideoPopular, EditorsPicks, KolumOpini, BeritaPopuler, TagPopuler, KomentarTerbanyak } from '@/components/editorial';

interface NewsItem {
  id: number;
  title: string;
  excerpt?: string;
  slug: string;
  image?: string | null;
  view_count: number;
  published_at: string;
  created_at: string;
  author?: {
    name?: string;
  };
  categories?: Array<{
    name: string;
    slug: string;
  }>;
}

interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

interface NewsIndexProps {
  news: {
    data: NewsItem[];
    current_page: number;
    last_page: number;
    links: PaginationLink[];
  };
}

const NewsIndex = ({ news }: NewsIndexProps) => {
  const featured = news.data[0];
  const restNews = news.data.slice(1);

  return (
    <>
      <Head>
        <title>Portal Berita - IKA UNIMED</title>
        <meta name="description" content="Portal berita profesional dengan informasi terbaru dari Ikatan Alumni UNIMED" />
        <meta property="og:title" content="Portal Berita IKA UNIMED" />
        <meta property="og:description" content="Berita, artikel, dan informasi terkini" />
        <meta property="og:type" content="website" />
      </Head>

      <div className="min-h-screen bg-[#F8FAF9] flex flex-col">
        <TopBar />
        <Header />

        {/* Hero Section */}
        <section className="bg-white border-b border-[#E6EAE8]">
          <div className="w-full">
            <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-[1440px] py-8 sm:py-12">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
                <div className="hidden lg:block lg:col-span-1"></div>
                <div className="col-span-1 lg:col-span-7 xl:col-span-6">
                  {featured ? (
                    <HeroNews {...featured} />
                  ) : (
                    <div className="h-96 bg-[#E6EAE8] rounded-lg flex items-center justify-center">
                      <p className="text-[#6B7280]">Belum ada berita terbaru</p>
                    </div>
                  )}
                </div>
                <div className="col-span-1 lg:col-span-4 xl:col-span-5"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Category Navigation */}
        <section className="bg-white border-b border-[#E6EAE8]">
          <div className="w-full">
            <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-[1440px] py-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
                <div className="hidden lg:block lg:col-span-1"></div>
                <div className="col-span-1 lg:col-span-7 xl:col-span-6">
                  <CategoryNavigation />
                </div>
                <div className="col-span-1 lg:col-span-4 xl:col-span-5"></div>
              </div>
            </div>
          </div>
        </section>

        {/* TUGAS 4: Full-Width Ad Slot (Horizontal Banner 970x90 / 728x90 / responsive mobile) */}
        <section className="bg-[#F8FAF9] border-b border-[#E6EAE8] py-4">
          <div className="w-full">
            <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-[1440px]">
              <div className="flex justify-center items-center min-h-24 bg-white rounded-lg border border-[#E6EAE8] p-2">
                <div className="text-xs text-[#6B7280] font-medium">IKLAN</div>
                {/* Ad container - external script will be injected here */}
                <div id="ad-banner-top-horizontal" className="w-full flex justify-center">
                  {/* Google AdSense / Adsera: 970x90 (desktop), 728x90, or responsive */}
                  {/* Placeholder for external ad code */}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Editorial Layout: 4-Area Grid */}
        <section className="bg-[#F8FAF9]">
          <div className="w-full">
            <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-[1440px] py-8 lg:py-12">
              <div className="grid grid-cols-1 md:grid-cols-9 lg:grid-cols-12 gap-6 lg:gap-8">
                
                {/* AREA 1: SIDEBAR KIRI - Editorial Navigation (Hidden < 1280px) */}
                <div className="hidden xl:block xl:col-span-1">
                  <div className="sticky top-24 space-y-6">
                    {/* Editorial Nav Section */}
                    <div className="bg-white rounded-lg border border-[#E6EAE8] p-4">
                      <h3 className="text-xs font-bold text-[#0F172A] mb-4 truncate">EDITORIAL</h3>
                      <nav className="space-y-2">
                        <a href="#" className="text-xs text-[#0F766E] hover:text-[#115E59] block transition-colors py-1">
                          Berita Utama
                        </a>
                        <a href="#" className="text-xs text-[#0F766E] hover:text-[#115E59] block transition-colors py-1">
                          Tren Hari Ini
                        </a>
                        <a href="#" className="text-xs text-[#0F766E] hover:text-[#115E59] block transition-colors py-1">
                          Video
                        </a>
                        <a href="#" className="text-xs text-[#0F766E] hover:text-[#115E59] block transition-colors py-1">
                          Opini
                        </a>
                        <a href="#" className="text-xs text-[#0F766E] hover:text-[#115E59] block transition-colors py-1">
                          Alumni Meraih
                        </a>
                      </nav>
                    </div>

                    {/* TUGAS 1: PROGRAM ALUMNI Section */}
                    <div className="bg-white rounded-lg border border-[#E6EAE8] p-4">
                      <h3 className="text-xs font-bold text-[#0F172A] mb-4 truncate">PROGRAM ALUMNI</h3>
                      <nav className="space-y-2">
                        <a href="#" className="text-xs text-[#0F766E] hover:text-[#115E59] block transition-colors py-1 truncate">
                          Program Alumni
                        </a>
                        <a href="#" className="text-xs text-[#0F766E] hover:text-[#115E59] block transition-colors py-1 truncate">
                          Agenda Mingguan
                        </a>
                        <a href="#" className="text-xs text-[#0F766E] hover:text-[#115E59] block transition-colors py-1 truncate">
                          Info Beasiswa
                        </a>
                        <a href="#" className="text-xs text-[#0F766E] hover:text-[#115E59] block transition-colors py-1 truncate">
                          Kontribusi Alumni
                        </a>
                      </nav>
                    </div>
                  </div>
                </div>

                {/* AREA 2: KONTEN UTAMA - News Feed (md:col-9, lg:col-6) */}
                <div className="col-span-1 md:col-span-9 lg:col-span-6">
                  <div className="space-y-8">
                    {/* 1. FlashContent */}
                    <div className="bg-white rounded-lg border border-[#E6EAE8] overflow-hidden">
                      <FlashContent />
                    </div>

                    {/* 2. Berita Utama / News Feed */}
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-lg sm:text-xl font-bold text-[#0F172A] mb-1 truncate">Berita Utama</h2>
                        <div className="h-1 w-16 bg-[#0F766E] rounded"></div>
                      </div>
                      {featured ? (
                        <div className="bg-white rounded-lg border border-[#E6EAE8] overflow-hidden">
                          <HeroNews {...featured} />
                        </div>
                      ) : (
                        <div className="h-96 bg-[#E6EAE8] rounded-lg flex items-center justify-center">
                          <p className="text-[#6B7280]">Belum ada berita terbaru</p>
                        </div>
                      )}
                    </div>

                    {/* 3. PollingSection */}
                    <div className="bg-white rounded-lg border border-[#E6EAE8] p-6">
                      <PollingSection />
                    </div>

                    {/* 4. VideoPopular */}
                    <div className="bg-white rounded-lg border border-[#E6EAE8] p-6">
                      <VideoPopular />
                    </div>

                    {/* 5. KolumOpini */}
                    <div className="bg-white rounded-lg border border-[#E6EAE8] p-6">
                      <KolumOpini maxItems={4} />
                    </div>

                    {/* 6. Berita Lainnya + Pagination */}
                    {restNews.length > 0 && (
                      <div className="space-y-6">
                        <div>
                          <h2 className="text-lg sm:text-xl font-bold text-[#0F172A] mb-1 truncate">Berita Lainnya</h2>
                          <div className="h-1 w-16 bg-[#0F766E] rounded"></div>
                        </div>
                        
                        <div className="space-y-4">
                          {restNews.map((item, idx) => (
                            <React.Fragment key={item.id}>
                              <div className="bg-white rounded-lg border border-[#E6EAE8] overflow-hidden hover:shadow-md transition-shadow">
                                <NewsCard {...item} />
                              </div>
                              {/* TUGAS 5: Insert ads after 3rd, 7th, 11th items (every 4 items) */}
                              {(idx + 1 === 3 || idx + 1 === 7 || idx + 1 === 11 || idx + 1 === 15) && (
                                <div className="bg-white rounded-lg border border-[#E6EAE8] p-4">
                                  <div className="flex justify-center items-center min-h-32 bg-[#F8FAF9] rounded border border-[#E6EAE8]">
                                    <div className="text-xs text-[#6B7280] font-medium">IKLAN</div>
                                    <div id={`ad-infeed-${idx + 1}`} className="w-full flex justify-center">
                                      {/* Google AdSense / Adsera: In-feed ad format */}
                                      {/* Placeholder for external ad code */}
                                    </div>
                                  </div>
                                </div>
                              )}
                              {/* Keep existing AdListItem ads (after items 5 and 10) for backward compatibility */}
                              {(idx + 1 === 5 || idx + 1 === 10) && (
                                <div className="bg-white rounded-lg border border-[#E6EAE8] p-4">
                                  <AdListItem afterItem={idx + 1} />
                                </div>
                              )}
                            </React.Fragment>
                          ))}
                        </div>

                        {/* Pagination */}
                        {news.last_page > 1 && (
                          <div className="mt-8 bg-white rounded-lg border border-[#E6EAE8] p-6">
                            <Pagination
                              links={news.links}
                              current_page={news.current_page}
                              last_page={news.last_page}
                            />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* AREA 3: SIDEBAR KONTEN - Editorial Components (Hidden < 768px) */}
                <div className="hidden md:block md:col-span-9 lg:col-span-3">
                  <div className="sticky top-24 space-y-6">
                    {/* EditorsPicks */}
                    <div className="bg-white rounded-lg border border-[#E6EAE8] p-4 md:p-5">
                      <EditorsPicks />
                    </div>

                    {/* BeritaPopuler */}
                    <div className="bg-white rounded-lg border border-[#E6EAE8] p-4 md:p-5">
                      <BeritaPopuler variant="list" maxItems={6} />
                    </div>

                    {/* TagPopuler */}
                    <div className="bg-white rounded-lg border border-[#E6EAE8] p-4 md:p-5">
                      <TagPopuler maxTags={12} />
                    </div>

                    {/* KomentarTerbanyak */}
                    <div className="bg-white rounded-lg border border-[#E6EAE8] p-4 md:p-5">
                      <KomentarTerbanyak maxItems={5} />
                    </div>
                  </div>
                </div>

                {/* AREA 4: SIDEBAR IKLAN - Ads & Campaign (Hidden < 1280px) */}
                <div className="hidden xl:block xl:col-span-2">
                  <div className="sticky top-24 space-y-6">
                    {/* TUGAS 3: Ad Slot - Medium Rectangle (300x250) */}
                    <div className="flex justify-center items-center min-h-72 bg-white rounded-lg border border-[#E6EAE8] p-2">
                      <div className="text-xs text-[#6B7280] font-medium">IKLAN</div>
                      <div id="ad-medium-rect-1" className="w-full flex justify-center">
                        {/* Google AdSense / Adsera: 300x250 (Medium Rectangle) */}
                        {/* Placeholder for external ad code */}
                      </div>
                    </div>

                    {/* Sticky Ads / Campaign Placeholder */}
                    <div className="bg-gradient-to-br from-[#0F766E] to-[#115E59] rounded-lg p-6 text-white">
                      <h3 className="text-xs font-bold mb-2 truncate">CAMPAIGN KHUSUS</h3>
                      <p className="text-xs mb-4 opacity-90">
                        Ikuti program eksklusif dari IKA UNIMED
                      </p>
                      <button className="w-full bg-white text-[#0F766E] text-xs font-bold py-2 rounded hover:bg-[#F8FAF9] transition-colors">
                        Pelajari Lebih Lanjut
                      </button>
                    </div>

                    {/* Donation CTA */}
                    <div className="bg-white rounded-lg border border-[#E6EAE8] p-6 text-center">
                      <h3 className="text-xs font-bold text-[#0F172A] mb-2 truncate">Dukung IKA UNIMED</h3>
                      <p className="text-xs text-[#6B7280] mb-4">
                        Berkontribusi untuk kemajuan organisasi
                      </p>
                      <button className="w-full bg-[#0F766E] text-white text-xs font-bold py-2 rounded hover:bg-[#115E59] transition-colors">
                        Berdonasi
                      </button>
                    </div>

                    {/* TUGAS 3: Ad Slot - Half Page (300x600) */}
                    <div className="flex justify-center items-center min-h-96 bg-white rounded-lg border border-[#E6EAE8] p-2">
                      <div className="text-xs text-[#6B7280] font-medium">IKLAN</div>
                      <div id="ad-half-page-1" className="w-full flex justify-center">
                        {/* Google AdSense / Adsera: 300x600 (Half Page) */}
                        {/* Placeholder for external ad code */}
                      </div>
                    </div>

                    {/* Info Box */}
                    <div className="bg-[#F8FAF9] rounded-lg border border-[#E6EAE8] p-4">
                      <h3 className="text-xs font-bold text-[#0F172A] mb-2 truncate">Tentang Portal</h3>
                      <p className="text-xs text-[#6B7280]">
                        Portal berita resmi Ikatan Alumni UNIMED. Informasi terdepan dan terpercaya.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default NewsIndex;
