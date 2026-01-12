import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: "Sewindu oxygen.id",
      subtitle: "MELESAT PENUH",
      highlight: "KECEPATAN\nMAKSIMAL",
      discount: "60%",
      speed: "100 Mbps",
      price: "242",
      originalPrice: "523",
      bgDesktop: "hero_slide_administrasi.png",
      bgMobile: "hero_slide_administrasi_mobile.png",
    },
    {
      id: 2,
      title: "Promo Spesial",
      subtitle: "INTERNET SUPER",
      highlight: "CEPAT & STABIL",
      discount: "50%",
      speed: "200 Mbps",
      price: "399",
      originalPrice: "799",
      bgDesktop: "hero_slide_karir.png",
      bgMobile: "hero_slide_karir_mobile.png",
    },
    {
      id: 3,
      title: "Paket Hemat",
      subtitle: "UNLIMITED",
      highlight: "TANPA BATASAN",
      discount: "40%",
      speed: "50 Mbps",
      price: "175",
      originalPrice: "292",
      bgDesktop: "hero_slide_mentoring.png",
      bgMobile: "hero_slide_mentoring_mobile.png",
    },
    {
      id: 4,
      title: "Micro Learning",
      subtitle: "BELAJAR PRAKTIS",
      highlight: "MATERI\nTERBAIK",
      discount: "30%",
      speed: "20 Mbps",
      price: "120",
      originalPrice: "200",
      bgDesktop: "hero_slide_micro_learning.png",
      bgMobile: "hero_slide_micro_learning_mobile.png",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="relative w-full overflow-hidden min-h-[600px] md:min-h-[480px] bg-gray-100">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${
            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {/* Background Images Layer */}
          <div className="absolute inset-0">
            <picture>
              <source media="(max-width: 768px)" srcSet={`/images/${slide.bgMobile}`} />
              <img
                src={`/images/${slide.bgDesktop}`}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
            </picture>
          </div>

          {/* Content Layer */}
          <div className="container relative z-20 h-full flex items-center py-8 md:py-16">
            <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-12 w-full">
              {/* === Pergeseran Konten Desktop === */}
              {/* Tambahkan lg:ml-[15%] di sini untuk menggeser ke tengah pada desktop */}
              <div className="flex-1 text-center lg:text-left lg:ml-[7%]"> 
                
                {/* LOGO IKA UNIMED (Ukuran diperbesar di mobile) */}
                <a href="/" className="flex items-center gap-3 group mb-4 justify-center lg:justify-start">
                  <img 
                    src="/images/favicon_ikaunimed.png" 
                    alt="Logo IKA UNIMED" 
                    className="h-10 md:h-10 w-auto" // Ukuran mobile/desktop 10 (40px)
                  />

                  <div className="flex flex-col leading-none">
                    <div className="text-xl md:text-xl font-bold font-sans tracking-tighter flex items-center">
                      <span className="text-primary">IKA</span>
                      <span className="text-oxygen-teal">UNI</span>
                      <span style={{ color: '#FFD700' }}>MED</span>
                    </div>
                    <span className="text-[7px] md:text-[8px] text-muted-foreground mt-0.5 font-medium uppercase tracking-wider">
                      Connect, Collaborate, Contribute
                    </span>
                  </div>
                </a>
                
                <p className="text-lg md:text-xl font-semibold text-oxygen-teal italic mb-2">
                  {slide.title}
                </p>
                
                <h1 className="text-2xl md:text-4xl font-extrabold text-foreground mb-2">
                  {slide.subtitle}
                  <span className="inline-block bg-primary text-primary-foreground px-2 py-0.5 rounded-lg text-base md:text-lg ml-1">
                    Dengan
                  </span>
                </h1>
                
                <h2 className="text-3xl md:text-5xl font-black text-gradient-orange mb-4 whitespace-pre-line">
                  {slide.highlight}
                </h2>

                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 mb-4">
                  <div className="flex items-center gap-1">
                    <span className="text-xl md:text-2xl font-bold text-foreground">
                      Diskon
                    </span>
                    <span className="text-base text-muted-foreground">up to</span>
                  </div>
                  <span className="text-5xl md:text-7xl font-black text-primary">
                    {slide.discount}
                    <span className="text-2xl md:text-3xl">*</span>
                  </span>
                </div>

                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
                  <div className="bg-oxygen-teal text-primary-foreground rounded-xl px-4 py-3">
                    <p className="text-xs uppercase">Wifi Rumah</p>
                    <p className="text-sm">Mulai dari</p>
                    <p className="text-2xl font-bold">{slide.speed}</p>
                  </div>
                  <div className="bg-foreground text-primary-foreground rounded-xl px-4 py-3">
                    <p className="text-xs line-through text-muted-foreground">
                      Rp {slide.originalPrice}
                    </p>
                    <p className="text-3xl font-bold">
                      {slide.price}
                      <span className="text-sm font-normal ml-1">ribu/bulan*</span>
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap justify-center lg:justify-start gap-2 mt-4">
                  {["Sudah Termasuk ppn", "Instalasi Gratis", "Tanpa Batasan Kuota"].map(
                    (feature) => (
                      <span 
                        key={feature} 
                        className="text-xs bg-oxygen-green text-primary-foreground px-2 py-0.5 rounded-full"
                      > 
                        {feature}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-between px-4 z-30">
        <button
          onClick={prevSlide}
          className="pointer-events-auto bg-white/50 p-3 rounded-full shadow-lg hover:bg-white transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-foreground" />
        </button>
        <button
          onClick={nextSlide}
          className="pointer-events-auto bg-white/50 p-3 rounded-full shadow-lg hover:bg-white transition-colors"
        >
          <ChevronRight className="w-6 h-6 text-foreground" />
        </button>
      </div>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 z-30 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? "bg-primary" : "bg-muted-foreground opacity-50"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroCarousel;
