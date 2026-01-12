import { Button } from "@/components/ui/button";

const PackageSection = () => {
  const packages = [
    {
      id: 1,
      title: "Stream On",
      subtitle: "Up to 200Mbps!",
      description:
        "Untuk streamer sejati, apapun aplikasinya dapatkan kualitas streaming yang maksimal dan stabil dengan langganan paket wifi internet cepat kami.",
      logo: "STREAM",
      logoColor: "text-primary",
      tagline: "Internet Unlimited",
      bgColor: "from-orange-50 to-amber-50",
      accentColor: "bg-primary",
    },
    {
      id: 2,
      title: "Total Entertainment",
      subtitle: "Up to 200Mbps!",
      description:
        "Berselancar dengan internet up to 200Mbps yang dilengkapi tayangan Saluran TV untuk hiburan seluruh anggota keluarga. Pasang dan nikmati keseruannya.",
      logo: "STREAM+",
      logoColor: "text-oxygen-teal",
      tagline: "Internet Entertainment Unlimited",
      bgColor: "from-teal-50 to-cyan-50",
      accentColor: "bg-teal-500",
    },
    {
      id: 3,
      title: "Paket Fleksibel",
      subtitle: "Bikin Hidup Lebih Simpel",
      description:
        "Nikmati internet fleksibel hingga 150 Mbps, pilih paket harian atau mingguan, bayar sesuai kebutuhan Anda dengan ONT Dual Band WiFi. Pilih paket Anda sekarang dan nikmati kebebasannya!",
      logo: "SUKA-SUKA",
      logoColor: "text-oxygen-blue",
      tagline: "Internet Unlimited Fleksibel",
      bgColor: "from-blue-50 to-indigo-50",
      accentColor: "bg-blue-600",
    },
  ];

  return (
    <section className="py-12 md:py-20">
      <div className="container space-y-24">
        {packages.map((pkg, index) => (
          <div
            key={pkg.id}
            className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-16 items-center"
          >
            {/* Content: Order-1 (Selalu di atas pada mobile) */}
            <div className={`order-1 text-center lg:text-left ${
              index % 2 === 1 ? "lg:order-2" : "lg:order-1"
            }`}>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-2">
                {pkg.title}
              </h2>
              <h3 className="text-2xl md:text-3xl font-bold text-gradient-orange mb-6">
                {pkg.subtitle}
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                {pkg.description}
              </p>

              <div className="inline-flex items-center justify-center lg:justify-start gap-3 mb-6 w-full lg:w-auto">
                <div className={`${pkg.accentColor} text-primary-foreground px-4 py-2 rounded-xl font-bold`}>
                  {pkg.logo}
                </div>
                <span className="text-gray-600">{pkg.tagline}</span>
              </div>

              <div>
                <Button variant="cta" size="lg">
                  lihat detail
                </Button>
              </div>
            </div>

            {/* Video/Image: Order-2 (Selalu di bawah pada mobile) */}
            <div
              className={`order-2 w-full relative rounded-3xl overflow-hidden aspect-video bg-gradient-to-br ${
                pkg.bgColor
              } shadow-card ${index % 2 === 1 ? "lg:order-1" : "lg:order-2"}`}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 bg-foreground/90 rounded-full flex items-center justify-center mx-auto mb-4 hover:scale-110 transition-transform cursor-pointer shadow-card">
                    <span className="text-3xl text-primary-foreground ml-1">▶</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PackageSection;
