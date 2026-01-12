const CTACards = () => {
  // Data kartu hanya berisi nama file gambar dan href
  const cards = [
    {
      imageName: "card_administrasi.png",
      altText: "Administrasi Online",
      href: "#",
    },
    {
      imageName: "card_berita.png",
      altText: "Info Terbaru",
      href: "#",
    },
    {
      imageName: "card_donasi.png",
      altText: "Program Donasi",
      href: "#",
    },
    {
      imageName: "card_karir.png",
      altText: "Pusat Karir",
      href: "#",
    },
    {
      imageName: "card_skill-upgrading.png",
      altText: "Skill Upgrading",
      href: "#",
    },
  ];

  return (
    <section className="py-6 -mt-3 relative z-10">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
          {cards.map((card) => (
            <a
              key={card.imageName}
              href={card.href}
              // Container untuk gambar utuh
              className="block rounded-xl md:rounded-2xl overflow-hidden shadow-lg hover:shadow-xl hover:scale-[1.03] transition-all duration-300 group"
            >
              <img 
                src={`/images/${card.imageName}`} 
                alt={card.altText} 
                // Pastikan gambar mengisi container dan responsif
                className="w-full h-auto object-cover" 
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CTACards;
