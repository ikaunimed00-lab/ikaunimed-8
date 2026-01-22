import { useState } from "react";
import { ChevronDown, Menu, X, LogOut, LayoutDashboard, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, usePage, router } from "@inertiajs/react";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { auth } = usePage().props as any;
  const user = auth?.user;

  const handleLogout = () => {
    router.post('/logout');
  };

  const navItems = [
    { label: "Home", href: "/", hasDropdown: false },
    { label: "Berita", href: "/news", hasDropdown: false },
    { label: "Agenda", href: "/agenda", hasDropdown: false },
    { label: "Bantuan", href: "/bantuan", hasDropdown: true },
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

        {/* Navigasi Desktop */}
        <div className="hidden lg:flex items-center gap-10"> 
          <nav className="flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center gap-1 text-gray-800 hover:text-oxygen-teal transition-all font-bold text-[15px] group relative"
              >
                {item.label}
                {item.hasDropdown && <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-oxygen-teal shadow-[0_0_8px_rgba(0,166,157,0.6)] transition-all group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          {/* Tombol CTA */}
          <div className="flex items-center gap-4 border-l-2 border-slate-100 pl-8">
            {user ? (
              <>
                {/* Dashboard Button */}
                <Link href={user.role === 'subscriber' ? '/dashboard/subscriber' : user.role === 'admin' ? '/dashboard/admin' : user.role === 'editor' ? '/dashboard/editor' : '/dashboard/writer'}>
                  <Button 
                    className="flex items-center gap-2 bg-gradient-to-r from-oxygen-teal to-[#00C2B6] hover:to-oxygen-teal text-white text-sm px-6 py-2.5 font-extrabold rounded-full shadow-[0_4px_14px_0_rgba(0,166,157,0.39)] transition-all duration-300 transform hover:scale-105"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    DASHBOARD
                  </Button>
                </Link>
                
                {/* Logout Button */}
                <Button 
                  onClick={handleLogout}
                  variant="outline" 
                  className="flex items-center gap-2 bg-white border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white text-sm px-6 py-2.5 font-extrabold rounded-full transition-all duration-300 shadow-sm cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  LOGOUT
                </Button>
              </>
            ) : (
              <>
                {/* Tombol Daftar */}
                <Link href="/register">
                  <Button 
                    className="bg-gradient-to-r from-oxygen-teal to-[#00C2B6] hover:to-oxygen-teal text-white text-sm px-8 py-2.5 font-extrabold rounded-full shadow-[0_4px_14px_0_rgba(0,166,157,0.39)] transition-all duration-300 transform hover:scale-105"
                  >
                    DAFTAR
                  </Button>
                </Link>
                
                {/* Tombol Login */}
                <Link href="/login">
                  <Button 
                    variant="outline" 
                    className="bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white text-sm px-8 py-2.5 font-extrabold rounded-full transition-all duration-300 shadow-sm"
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
        <div className="lg:hidden bg-white border-t-2 border-slate-50 shadow-2xl animate-in slide-in-from-top-4 duration-500">
          <nav className="container py-10 space-y-4">
            {navItems.map((item) => (
              <Link key={item.label} href={item.href} className="flex items-center justify-between px-6 py-5 text-gray-800 bg-slate-50 hover:bg-oxygen-teal hover:text-white transition-all font-extrabold rounded-2xl shadow-sm">
                {item.label}
                {item.hasDropdown && <ChevronDown className="w-5 h-5 opacity-50" />}
              </Link>
            ))}
            <div className="flex flex-col gap-4 pt-10">
              {user ? (
                <>
                  <Link href={user.role === 'subscriber' ? '/dashboard/subscriber' : user.role === 'admin' ? '/dashboard/admin' : user.role === 'editor' ? '/dashboard/editor' : '/dashboard/writer'}>
                    <Button className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-oxygen-teal to-[#00C2B6] text-white py-7 font-extrabold rounded-2xl">
                      <LayoutDashboard className="w-5 h-5" />
                      DASHBOARD
                    </Button>
                  </Link>
                  <Button 
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 bg-red-500 text-white py-7 font-extrabold rounded-2xl hover:bg-red-600 cursor-pointer"
                  >
                    <LogOut className="w-5 h-5" />
                    LOGOUT
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/register">
                    <Button className="w-full bg-gradient-to-r from-oxygen-teal to-[#00C2B6] text-white py-7 font-extrabold rounded-2xl">DAFTAR SEKARANG</Button>
                  </Link>
                  <Link href="/login">
                    <Button variant="outline" className="w-full border-2 border-primary text-primary py-7 font-extrabold rounded-2xl bg-white">LOGIN PORTAL</Button>
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
