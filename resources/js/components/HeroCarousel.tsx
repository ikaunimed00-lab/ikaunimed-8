import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
// Sesuaikan import Link ini dengan library yang Anda gunakan (e.g., Inertia Link atau Next Link)
import { Link } from '@inertiajs/react'; 

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: "Layanan Alumni", subtitle: "SISTEM LAYANAN", highlight: "LEGALISIR & DATA\nALUMNI DIGITAL",
      stats: "95%", statsLabel: "Proses Cepat", serviceName: "Legalisir Online", primaryFeature: "Verifikasi Ijazah",
      features: ["Sistem Terintegrasi", "Legalitas Terjamin", "Update Data Real-time"],
      bgDesktop: "hero_slide_administrasi.png", bgMobile: "hero_slide_administrasi_mobile.png",
      colors: { textPrimary: 'text-first-dark-green', textSecondary: 'text-ika-yellow', bgAccent: 'bg-second-dark-green', bgFeature: 'bg-first-dark-green', textFeature: 'text-white', overlay: 'bg-white opacity-40', },
    },
    {
      id: 2,
      title: "Informasi Terkini", subtitle: "KABAR & AGENDA", highlight: "JEJAK KISAH\nALUMNI INSPIRATIF",
      stats: "100+", statsLabel: "Agenda Aktif", serviceName: "Berita Organisasi", primaryFeature: "Jadwal Acara",
      features: ["Liputan Kegiatan", "Galeri Foto", "Notifikasi Event"],
      bgDesktop: "hero_slide_agenda.png", bgMobile: "hero_slide_agenda_mobile.png",
       colors: { textPrimary: 'text-first-dark-green', textSecondary: 'text-second-dark-green', bgAccent: 'bg-ika-yellow', bgFeature: 'bg-first-dark-green', textFeature: 'text-white', overlay: 'bg-white opacity-50', },
    },
    {
      id: 3,
      title: "Kontribusi Sosial", subtitle: "DONASI & BEASISWA", highlight: "MEMBANGUN MASA\nDEPAN GENERASI",
      stats: "Ratusan", statsLabel: "Penerima Manfaat", serviceName: "Program Beasiswa", primaryFeature: "Open Donasi",
      features: ["Transparan", "Tepat Sasaran", "Wakaf Pendidikan"],
      bgDesktop: "hero_slide_mentoring.png", bgMobile: "hero_slide_mentoring_mobile.png",
       colors: { textPrimary: 'text-white', textSecondary: 'text-ika-yellow', bgAccent: 'bg-ika-yellow', bgFeature: 'bg-first-dark-green', textFeature: 'text-white', overlay: 'bg-black opacity-40', },
    },
     {
      id: 4,
      title: "Dukungan Karir", subtitle: "KARIR & JEJARING", highlight: "KONEKSI KUAT\nUNTUK ALUMNI",
      stats: "50+", statsLabel: "Lowongan Kerja", serviceName: "Job Portal", primaryFeature: "Mentoring",
      features: ["Mitra Industri", "Informasi Karir", "Worskhop Rutin"],
      bgDesktop: "hero_slide_karir.png", bgMobile: "hero_slide_karir_mobile.png",
       colors: { textPrimary: 'text-white', textSecondary: 'text-ika-yellow', bgAccent: 'bg-ika-yellow', bgFeature: 'bg-second-dark-green', textFeature: 'text-white', overlay: 'bg-black opacity-30', },
    },
    {
      id: 5,
      title: "Peningkatan Skill", subtitle: "MICRO LEARNING", highlight: "TINGKATKAN KOMPETENSI\nSECARA FLEKSIBEL",
      stats: "Ribuan", statsLabel: "Materi Belajar", serviceName: "E-Learning", primaryFeature: "Sertifikasi Online",
      features: ["Modul Praktis", "Akses 24 Jam", "Dari Dosen UNIMED"],
      bgDesktop: "hero_slide_micro_learning.png", bgMobile: "hero_slide_micro_learning_mobile.png",
       colors: { textPrimary: 'text-white', textSecondary: 'text-ika-yellow', bgAccent: 'bg-ika-yellow', bgFeature: 'bg-first-dark-green', textFeature: 'text-white', overlay: 'bg-black opacity-50', },
    },
  ];


  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000); 
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  // Helper untuk menentukan warna box fitur bawah
  const getFeatureColor = (index: number) => {
    switch (index) {
      case 0: return 'bg-primary'; // IKA (Oranye)
      case 1: return 'bg-oxygen-teal'; // UNI (Teal)
      case 2: return 'bg-ika-yellow'; // MED (Kuning)
      default: return 'bg-gray-700';
    }
  };

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
             {/* Overlay untuk memastikan teks terbaca pada gambar terang/gelap */}
             <div className={`absolute inset-0 ${slide.colors.overlay}`}></div>
          </div>

          {/* Content Layer: Menggunakan h-full dan padding yang jauh lebih besar */}
          <div className="container relative z-20 h-full flex items-center justify-center py-24 md:py-32">
            
            <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-12 w-full">
              
              <div className="flex-1 text-center lg:text-left lg:ml-[7%]"> 
                
                {/* LOGO IKA UNIMED */}
                <Link href="/" className="flex items-center gap-3 group justify-center lg:justify-start mb-6">
                  <img 
                    src="/images/favicon_ikaunimed.png" 
                    alt="Logo IKA UNIMED" 
                    className="h-9 md:h-12 w-auto transition-transform group-hover:scale-110" 
                  />
                  <div className="flex flex-col leading-none">
                    <div className="text-xl md:text-2xl font-bold font-sans tracking-tighter flex items-center">
                      <span className="text-primary">IKA</span>
                      <span className="text-oxygen-teal">UNI</span>
                      <span style={{ color: '#FFD700' }}>MED</span>
                    </div>
                    {/* WARNA KEMBALI KE ABU-ABU NETRAL (text-gray-600) */}
                    <span className="text-[7px] md:text-[9px] text-gray-600 mt-1 font-bold uppercase tracking-widest block">
                      Connect, Collaborate, Contribute
                    </span>
                  </div>
                </Link>
                
                {/* SUBTITLE */}
                <p className={`text-base md:text-lg font-semibold ${slide.colors.textSecondary} italic mb-2`}>
                  {slide.title}
                </p>
                
                {/* TITLE (Ukuran dikecilkan) */}
                <h1 className={`text-xl md:text-2xl font-extrabold ${slide.colors.textPrimary} mb-2`}>
                  {slide.subtitle}
                  <span className={`inline-block ${slide.colors.bgAccent} text-white px-2 py-0.5 rounded-lg text-sm md:text-base ml-1`}>
                    Melalui
                  </span>
                </h1>
                
                {/* HIGHLIGHT TEXT (Ukuran dikecilkan) */}
                <h2 className={`text-2xl md:text-4xl font-black ${slide.colors.textPrimary} mb-4 whitespace-pre-line opacity-90`}>
                  {slide.highlight}
                </h2>

                {/* STATS AREA */}
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 mb-4">
                  <div className="flex items-center gap-1">
                    <span className={`text-base md:text-lg font-bold ${slide.colors.textPrimary}`}>
                      Total
                    </span>
                    <span className={`text-xs text-gray-500`}>Layanan</span>
                  </div>
                  <span className={`text-3xl md:text-5xl font-black ${slide.colors.textSecondary}`}>
                    {slide.stats}
                    <span className={`text-lg md:text-xl font-medium ${slide.colors.textPrimary} ml-2`}>
                      {slide.statsLabel}
                    </span>
                  </span>
                </div>

                {/* BOX INFORMASI (Ukuran dikecilkan) */}
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
                  <div className={`${slide.colors.bgFeature} ${slide.colors.textFeature} rounded-xl px-3 py-2 shadow-md`}>
                    <p className="text-xs uppercase opacity-80 font-semibold tracking-wider">Akses Cepat</p>
                    <p className="text-sm">Layanan Utama</p>
                    <p className="text-base font-bold">{slide.serviceName}</p>
                  </div>
                  <div className="bg-white text-first-dark-green rounded-xl px-3 py-2 shadow-lg">
                    <p className="text-xs font-bold uppercase">Fitur Andalan</p>
                    <p className="text-base font-black italic">
                      {slide.primaryFeature}
                    </p>
                  </div>
                </div>

                {/* FITUR TAMBAHAN (Menggunakan warna IKA/UNI/MED) */}
                <div className="flex flex-wrap justify-center lg:justify-start gap-2 mt-4">
                  {slide.features.map(
                    (feature, idx) => (
                      <span 
                        key={feature} 
                        className={`text-xs ${getFeatureColor(idx)} text-white px-3 py-1 rounded-full shadow-sm opacity-90`}
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

      {/* Navigation Arrows (Hidden on mobile using 'hidden md:flex') */}
      <div className="absolute inset-0 pointer-events-none hidden md:flex items-center justify-between px-4 z-30">
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

      {/* Dots (Always visible) */}
      <div className="absolute bottom-6 left-1/2 z-30 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? "bg-ika-yellow" : "bg-muted-foreground opacity-50"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroCarousel;
