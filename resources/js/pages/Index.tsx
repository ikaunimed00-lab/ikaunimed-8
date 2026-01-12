import { Helmet } from "react-helmet-async";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
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
      <Helmet>
        {/* Update Judul di sini */}
        <title>IKA UNIMED - Connect, Collaborate, Contribute</title>
        <meta name="description" content="Official Website Ikatan Alumni Universitas Negeri Medan (IKA UNIMED)" />
      </Helmet>
      
      {/* Pastikan tidak ada 'overflow-hidden' di sini */}
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
