import React from "react";

const PackageSection = () => {
  const ctaData = [
    {
      id: "ikaunimed-cta-1",
      title: "Micro Learning & Skill Upgrading",
      description: "Tingkatkan kompetensi dengan materi ringkas dari seluruh program studi UNIMED. Pelajari keahlian baru kapan dan dimana saja. Daftar sekarang dan mulailah bertumbuh.",
      bgImage: "/images/cta_ikaunimed-01.png",
      tagline: "Keterampilan Siap Pakai",
      href: "/paket/stream-plus",
      position: "right",
    },
    {
      id: "ikaunimed-cta-2",
      title: "Donasi & Beasiswa Alumni",
      description: "Kabar gembira untuk mahasiswa aktif! Program Donasi & Beasiswa dari Ikatan Alumni kini kembali dibuka. Jangan biarkan kendala biaya menghalangi prestasimu. Segera cek persyaratan dan daftar melalui Portal Mahasiswa Bakat Unimed.",
      bgImage: "/images/cta_ikaunimed-02.png",
      tagline: "Wujudkan Mimpimu Sekarang!",
      href: "/paket/alumni-connect",
      position: "left",
    },
    {
      id: "ikaunimed-cta-3",
      title: "Karir & Jejaring Profesional",
      description: "Temukan lowongan kerja eksklusif dari mitra perusahaan terpercaya. Kami menjembatani lulusan UNIMED dengan industri untuk membangun karir yang gemilang. Akses portal karir sekarang juga.",
      bgImage: "/images/cta_ikaunimed-03.png",
      tagline: "Karir Masa Depan",
      href: "/paket/career-center",
      position: "right",
    },
    {
      id: "ikaunimed-cta-4",
      title: "Legalisir Online & Data Alumni",
      description: "Bantu kami membangun koneksi alumni yang lebih kuat! Update data diri Anda sekarang dan nikmati kemudahan akses legalisir dokumen secara online hanya dalam beberapa klik.",
      bgImage: "/images/cta_ikaunimed-04.png",
      tagline: "Daftar & Ajukan Sekarang!",
      href: "/paket/alumni-connect",
      position: "left",
    },
    {
      id: "ikaunimed-cta-5",
      title: "Informasi Terkini Alumni",
      description: "Dapatkan berita terbaru seputar kegiatan alumni, seminar, dan pengumuman penting lainnya langsung melalui portal resmi kami.",
      bgImage: "/images/cta_ikaunimed-05.png",
      tagline: "Tetap Terkoneksi",
      href: "/berita",
      position: "right",
    }
  ];

  return (
    <section className="py-12">
      <div className="container mx-auto px-4 space-y-12">
        {ctaData.map((item, index) => (
          <div
            key={item.id}
            id={item.id}
            className={`w-full min-h-[500px] bg-cover bg-center bg-no-repeat rounded-3xl overflow-hidden shadow-2xl flex items-center ${
              index === 0 ? "-mt-16" : "mt-4"
            }`}
            style={{ backgroundImage: `url('${item.bgImage}')` }}
          >
            <div
              className={`w-full flex px-4 md:px-16 py-12 ${
                item.position === "right" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`w-full lg:w-1/2 py-10 px-8 md:px-12 bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl transition-all duration-500 ${
                  item.position === "right" ? "lg:text-right" : "lg:text-left"
                } text-center`}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 leading-tight">
                  {item.title}
                </h2>
                <p className="text-gray-700 mb-8 text-base md:text-lg leading-relaxed">
                  {item.description}
                </p>

                <div
                  className={`flex flex-col md:flex-row items-center gap-4 mb-10 ${
                    item.position === "right" ? "lg:justify-end" : "lg:justify-start"
                  } justify-center`}
                >
                  <img
                    src="/images/logo_ikaunimed.png"
                    alt="Logo"
                    className="h-12 md:h-16 w-auto object-contain"
                  />
                  <p className="text-lg font-bold text-gray-800">
                    {item.tagline}
                  </p>
                </div>

                <a
                  href={item.href}
                  className="inline-block text-white font-bold px-10 py-3 rounded-xl shadow-lg transition-all duration-300 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 hover:shadow-emerald-200 hover:-translate-y-1"
                >
                  lihat detail
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PackageSection;
