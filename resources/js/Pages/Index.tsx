import { Head } from "@inertiajs/react";
import TopBar from "@/components/TopBar";
import { HeaderEnterprise as Header } from '@/components/navigation/HeaderEnterprise';
import HeroCarousel from "@/components/HeroCarousel";
import CTACards from "@/components/CTACards";
import VideoSection from "@/components/VideoSection";
import PackageSection from "@/components/PackageSection";
import FeaturesSection from "@/components/FeaturesSection";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";

// Index.tsx
const Index = () => {
  return (
    <>
      <Head>
        {/* Menggunakan Head dari Inertia untuk SEO yang stabil di React 19 */}
        <title>IKA UNIMED - Connect, Collaborate, Contribute</title>
        <meta name="description" content="Official Website Ikatan Alumni Universitas Negeri Medan (IKA UNIMED)" />
        <meta property="og:title" content="IKA UNIMED" />
        <meta property="og:description" content="Official Website Ikatan Alumni Universitas Negeri Medan" />
      </Head>
      
      <div className="min-h-screen bg-background flex flex-col"> 
        <TopBar />
        <Header />
        <main className="flex-grow"> 
          <HeroCarousel />
          <CTACards />
          <VideoSection />
          <PackageSection />
          <FeaturesSection />
        </main>
        <Footer />
        <FloatingCTA />
      </div>
    </>
  );
};

export default Index;
