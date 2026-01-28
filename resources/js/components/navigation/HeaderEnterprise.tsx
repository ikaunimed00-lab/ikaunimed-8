import React, { useState, useEffect } from 'react';
import { LayoutDashboard, LogOut, Menu } from 'lucide-react';
import { menuConfig } from './menuConfig';
import { MegaMenu } from './MegaMenu';
import { MobileMenu } from './MobileMenu';
import { Link, router, usePage } from '@inertiajs/react';

interface HeaderProps {
  currentPath?: string;
  logoUrl?: string;
  siteName?: string;
}

export const HeaderEnterprise: React.FC<HeaderProps> = ({
  currentPath = '/',
  logoUrl = '/images/favicon_ikaunimed.png',
  siteName = 'IKA UNIMED',
}) => {
  const [openMegaMenu, setOpenMegaMenu] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { auth } = usePage().props as any;
  const user = auth?.user;

  const handleLogout = () => {
    router.post('/logout');
  };

  // Handle scroll untuk sticky header effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mega menu saat route berubah
  useEffect(() => {
    setOpenMegaMenu(null);
  }, [currentPath]);

  // Close mobile menu saat route berubah
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [currentPath]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleMenuHover = (menuId: string) => {
    setOpenMegaMenu(menuId);
  };

  const handleMenuLeave = () => {
    setOpenMegaMenu(null);
  };

  return (
    <>
      <header
        className={`
          sticky top-0 z-40 w-full bg-white overflow-visible
          transition-all duration-300
          ${isScrolled ? 'shadow-md' : 'shadow-sm border-b border-gray-100'}
        `}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between h-20 px-6">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <img
                src={logoUrl}
                alt={siteName}
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

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-6">
              <ul className="flex items-center gap-1">
                {menuConfig.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentPath === item.href;
                  const hasSubMenu = item.sections && item.sections.length > 0;

                  return (
                    <li
                      key={item.id}
                      className="relative"
                      onMouseEnter={() => hasSubMenu && handleMenuHover(item.id)}
                      onMouseLeave={handleMenuLeave}
                    >
                      {item.href ? (
                        // Menu tanpa submenu (Home)
                        <Link
                          href={item.href}
                          className={`
                            text-sm font-semibold
                            ${
                              isActive
                                ? 'text-emerald-700'
                                : 'text-gray-700 hover:text-gray-900'
                            }
                          `}
                        >
                          {item.label}
                        </Link>
                      ) : (
                        // Menu dengan submenu
                        <button
                          className={`
                            flex items-center gap-2 px-4 py-2.5 rounded-lg
                            font-medium text-sm
                            transition-all duration-150
                            ${
                              openMegaMenu === item.id
                                ? 'text-gray-900'
                                : 'text-gray-700 hover:text-gray-900'
                            }
                            ${openMegaMenu === item.id ? item.color.hover.replace('hover:', '') : item.color.hover}
                          `}
                        >
                          {Icon && (
                            <Icon
                              className={`
                                w-4 h-4 transition-transform duration-200
                                ${openMegaMenu === item.id ? 'scale-110' : ''}
                              `}
                              strokeWidth={2}
                            />
                          )}
                          {item.label}
                        </button>
                      )}

                      {/* Mega Menu */}
                      {hasSubMenu && (
                        <MegaMenu
                          item={item}
                          isOpen={openMegaMenu === item.id}
                          onClose={handleMenuLeave}
                        />
                      )}
                    </li>
                  );
                })}
              </ul>
              {/* CTA Desktop */}
              <div className="hidden lg:flex items-center gap-3 border-l border-gray-200 pl-6">
                {user ? (
                  <>
                    <Link
                      href={
                        user.role === 'subscriber'
                          ? '/dashboard/subscriber'
                          : user.role === 'admin'
                            ? '/dashboard/admin'
                            : user.role === 'editor'
                              ? '/dashboard/editor'
                              : '/dashboard/writer'
                      }
                    >
                      <button className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white text-sm px-5 py-2.5 font-extrabold rounded-full shadow-[0_4px_14px_rgba(5,150,105,0.35)] transition-all duration-300 hover:scale-105">
                        <LayoutDashboard className="w-4 h-4" />
                        DASHBOARD
                      </button>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 bg-white border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white text-sm px-4 py-2.5 font-extrabold rounded-full transition-all duration-300 shadow-sm cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" />
                    </button>
                  </>
                ) : (
                  <>
                    <Link href="/register">
                      <button className="bg-gradient-to-r from-emerald-600 to-emerald-500 text-white text-sm px-5 py-2.5 font-extrabold rounded-full shadow-[0_4px_14px_rgba(5,150,105,0.35)] transition-all duration-300 hover:scale-105">
                        DAFTAR
                      </button>
                    </Link>
                    <Link href="/login">
                      <button className="bg-white border-2 border-emerald-600 text-emerald-700 hover:bg-emerald-600 hover:text-white text-sm px-5 py-2.5 font-extrabold rounded-full transition-all duration-300 shadow-sm">
                        LOGIN
                      </button>
                    </Link>
                  </>
                )}
              </div>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2.5 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Buka menu"
            >
              <Menu className="w-6 h-6 text-gray-700" strokeWidth={2} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        menuItems={menuConfig}
        currentPath={currentPath}
      />
    </>
  );
};
