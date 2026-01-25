import { useState } from "react";
import { ChevronDown, Menu, X, LogOut, LayoutDashboard, Home, User, Briefcase, FileText, Image as ImageIcon, Phone, HeartHandshake, BookOpen, GraduationCap, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, usePage, router } from "@inertiajs/react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import React from "react";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { auth } = usePage().props as any;
  const user = auth?.user;

  const handleLogout = () => {
    router.post('/logout');
  };

  const menuItems = [
    {
      label: "Tentang Kami",
      icon: <User className="w-4 h-4" />,
      items: [
        { title: "Tentang IKA UNIMED", href: "/tentang-kami", description: "Sejarah dan profil Ikatan Alumni." },
        { title: "Struktur Organisasi", href: "/struktur-organisasi", description: "Susunan pengurus IKA UNIMED." },
        { title: "Visi & Misi", href: "/tentang-kami", description: "Arah dan tujuan organisasi." },
      ]
    },
    {
      label: "Komunitas",
      icon: <Users className="w-4 h-4" />,
      items: [
        { title: "Kabar Alumni", href: "/kabar-alumni", description: "Berita dan cerita dari alumni." },
        { title: "Agenda", href: "/agenda", description: "Kegiatan dan acara mendatang." },
        { title: "Ruang Pengabdian", href: "/pengabdian", description: "Kontribusi alumni untuk masyarakat." },
        { title: "E-Voting", href: "/voting", description: "Pemilihan ketua dan pengurus." },
      ]
    },
    {
      label: "Karir & Profesional",
      icon: <Briefcase className="w-4 h-4" />,
      items: [
        { title: "Lowongan Kerja", href: "/lowongan-kerja", description: "Informasi karir untuk alumni." },
        { title: "Beasiswa", href: "/beasiswa", description: "Peluang studi lanjut." },
        { title: "Micro Learning", href: "/learning", description: "Pengembangan skill dan kompetensi." },
        { title: "Kemitraan", href: "/kemitraan", description: "Kerjasama strategis." },
      ]
    },
    {
      label: "Layanan",
      icon: <HeartHandshake className="w-4 h-4" />,
      items: [
        { title: "Legalisir Ijazah", href: "/legalization", description: "Layanan legalisir online." },
        { title: "Kartu Alumni", href: "/kartu-alumni", description: "Identitas keanggotaan digital." },
        { title: "Donasi", href: "/donasi", description: "Dukungan untuk almamater." },
      ]
    },
    {
      label: "Informasi",
      icon: <BookOpen className="w-4 h-4" />,
      items: [
        { title: "Berita Terkini", href: "/news", description: "Update terbaru seputar kampus." },
        { title: "Galeri Foto", href: "/media/foto", description: "Dokumentasi kegiatan." },
        { title: "Galeri Video", href: "/media/video", description: "Video kegiatan dan profil." },
        { title: "FAQ", href: "/faq", description: "Pertanyaan yang sering diajukan." },
      ]
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all duration-300">
      <div className="container flex items-center justify-between h-16 md:h-20">
        
        {/* Logo IKA UNIMED */}
        <Link href="/" className="flex items-center gap-3 group">
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
            <span className="text-[7px] md:text-[9px] text-gray-500 mt-1 font-bold uppercase tracking-widest">
              Connect, Collaborate, Contribute
            </span>
          </div>
        </Link>

        {/* Mega Menu Desktop */}
        <div className="hidden lg:flex items-center gap-6"> 
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/" className={navigationMenuTriggerStyle()}>
                  Home
                </Link>
              </NavigationMenuItem>
              
              {menuItems.map((menu) => (
                <NavigationMenuItem key={menu.label}>
                  <NavigationMenuTrigger>{menu.label}</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] bg-white">
                      {menu.items.map((item) => (
                        <ListItem
                          key={item.title}
                          title={item.title}
                          href={item.href}
                        >
                          {item.description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ))}

              <NavigationMenuItem>
                <Link href="/hubungi-kami" className={navigationMenuTriggerStyle()}>
                  Hubungi Kami
                </Link>
              </NavigationMenuItem>

            </NavigationMenuList>
          </NavigationMenu>

          {/* Tombol CTA */}
          <div className="flex items-center gap-4 border-l-2 border-slate-100 pl-6">
            {user ? (
              <>
                <Link href={user.role === 'subscriber' ? '/dashboard/subscriber' : user.role === 'admin' ? '/dashboard/admin' : user.role === 'editor' ? '/dashboard/editor' : '/dashboard/writer'}>
                  <Button 
                    className="flex items-center gap-2 bg-gradient-to-r from-oxygen-teal to-[#00C2B6] hover:to-oxygen-teal text-white text-sm px-6 py-2.5 font-extrabold rounded-full shadow-[0_4px_14px_0_rgba(0,166,157,0.39)] transition-all duration-300 transform hover:scale-105"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    DASHBOARD
                  </Button>
                </Link>
                
                <Button 
                  onClick={handleLogout}
                  variant="outline" 
                  className="flex items-center gap-2 bg-white border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white text-sm px-4 py-2.5 font-extrabold rounded-full transition-all duration-300 shadow-sm cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </>
            ) : (
              <>
                <Link href="/register">
                  <Button 
                    className="bg-gradient-to-r from-oxygen-teal to-[#00C2B6] hover:to-oxygen-teal text-white text-sm px-6 py-2.5 font-extrabold rounded-full shadow-[0_4px_14px_0_rgba(0,166,157,0.39)] transition-all duration-300 transform hover:scale-105"
                  >
                    DAFTAR
                  </Button>
                </Link>
                
                <Link href="/login">
                  <Button 
                    variant="outline" 
                    className="bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white text-sm px-6 py-2.5 font-extrabold rounded-full transition-all duration-300 shadow-sm"
                  >
                    LOGIN
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className={`lg:hidden p-2.5 rounded-2xl transition-all duration-300 ${
            isMobileMenuOpen ? "bg-oxygen-teal text-white rotate-90" : "bg-white border-2 border-slate-100 text-oxygen-teal"
          }`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t-2 border-slate-50 shadow-2xl animate-in slide-in-from-top-4 duration-500 max-h-[80vh] overflow-y-auto">
          <nav className="container py-6 space-y-2">
            <Link href="/" className="flex items-center px-4 py-3 text-gray-800 bg-slate-50 rounded-xl font-bold">
              Home
            </Link>
            
            {menuItems.map((menu) => (
              <div key={menu.label} className="space-y-1">
                <div className="px-4 py-2 text-sm font-bold text-gray-400 uppercase tracking-wider">
                  {menu.label}
                </div>
                {menu.items.map((item) => (
                  <Link 
                    key={item.title} 
                    href={item.href}
                    className="block px-6 py-2 text-gray-700 hover:text-oxygen-teal hover:bg-slate-50 rounded-lg transition-colors"
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            ))}

            <Link href="/hubungi-kami" className="flex items-center px-4 py-3 text-gray-800 bg-slate-50 rounded-xl font-bold">
              Hubungi Kami
            </Link>

            <div className="flex flex-col gap-4 pt-6 px-4">
              {user ? (
                <>
                  <Link href={user.role === 'subscriber' ? '/dashboard/subscriber' : user.role === 'admin' ? '/dashboard/admin' : user.role === 'editor' ? '/dashboard/editor' : '/dashboard/writer'}>
                    <Button className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-oxygen-teal to-[#00C2B6] text-white py-4 font-extrabold rounded-xl">
                      <LayoutDashboard className="w-5 h-5" />
                      DASHBOARD
                    </Button>
                  </Link>
                  <Button 
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 bg-red-500 text-white py-4 font-extrabold rounded-xl hover:bg-red-600 cursor-pointer"
                  >
                    <LogOut className="w-5 h-5" />
                    LOGOUT
                  </Button>
                </>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <Link href="/login">
                    <Button variant="outline" className="w-full border-2 border-primary text-primary py-4 font-extrabold rounded-xl bg-white">LOGIN</Button>
                  </Link>
                  <Link href="/register">
                    <Button className="w-full bg-gradient-to-r from-oxygen-teal to-[#00C2B6] text-white py-4 font-extrabold rounded-xl">DAFTAR</Button>
                  </Link>
                </div>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref as any}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props as any}
        >
          <div className="text-sm font-medium leading-none text-slate-900">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-slate-500">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export default Header;
