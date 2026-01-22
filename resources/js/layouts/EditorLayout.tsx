import { PropsWithChildren } from "react";
import { Link, usePage, router } from "@inertiajs/react";
import { route } from "ziggy-js";
import { Home, Newspaper, FileCheck, LogOut, Menu, PlusCircle, User, BarChart3 } from "lucide-react";
import { useState } from "react";

export default function EditorLayout({ children }: PropsWithChildren) {
    const { auth }: any = usePage().props;
    const [sidebarOpen, setSidebarOpen] = useState(true);

    function handleLogout() {
        router.post(route("logout"));
    }

    return (
        <div className="min-h-screen flex bg-gradient-to-br from-white via-green-50/20 to-white">
            {/* SIDEBAR */}
            <aside className={`${
                sidebarOpen ? 'w-64' : 'w-20'
            } bg-gradient-to-b from-[#1F2937] via-[#111827] to-[#0F172A] text-white flex-shrink-0 z-20 transition-all duration-300 border-r border-green-500/20 shadow-xl overflow-y-auto`}>
                {/* LOGO SECTION */}
                <div className="p-6 border-b border-green-500/20 sticky top-0 bg-gradient-to-r from-[#111827] to-[#1F2937] backdrop-blur-sm">
                    <div className="flex items-center gap-3">
                        <img 
                            src="/images/favicon_ikaunimed.png" 
                            alt="Logo IKA UNIMED" 
                            className="h-10 w-10 transition-transform hover:scale-110" 
                        />
                        {sidebarOpen && (
                            <div className="flex flex-col leading-none">
                                <div className="text-lg font-bold font-sans tracking-tighter flex items-center gap-0.5">
                                    <span className="text-[#FF7E00]">IKA</span>
                                    <span className="text-[#00A69D]">UNI</span>
                                    <span className="text-[#e9cf35]">MED</span>
                                </div>
                                <div className="text-[7px] text-slate-400 font-bold uppercase tracking-widest">
                                    Editor Panel
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* NAVIGATION */}
                <nav className="p-3 space-y-2 text-sm">
                    {/* HOME */}
                    <Link
                        href={route("home")}
                        className="group flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gradient-to-r hover:from-green-500/20 hover:to-emerald-500/20 text-slate-300 hover:text-white transition-all duration-200 border border-transparent hover:border-green-500/30"
                    >
                        <Home className="w-5 h-5 text-green-400 group-hover:scale-110 transition-transform" />
                        {sidebarOpen && <span className="font-semibold">Home Portal</span>}
                    </Link>

                    {/* DASHBOARD EDITOR */}
                    <Link
                        href={route("dashboard.editor")}
                        className="group flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gradient-to-r hover:from-blue-500/20 hover:to-indigo-500/20 text-slate-300 hover:text-white transition-all duration-200 border border-transparent hover:border-blue-500/30"
                    >
                        <div className="p-1.5 bg-blue-500/20 rounded group-hover:bg-blue-500/30 transition-colors">
                            <BarChart3 className="w-4 h-4 text-blue-400" />
                        </div>
                        {sidebarOpen && <span className="font-semibold">Dashboard</span>}
                    </Link>

                    {/* BUAT KONTEN BARU */}
                    <Link
                        href={route("admin.news.create")}
                        className="group flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gradient-to-r hover:from-green-500/20 hover:to-emerald-500/20 text-slate-300 hover:text-white transition-all duration-200 border border-transparent hover:border-green-500/30"
                    >
                        <div className="p-1.5 bg-green-500/20 rounded group-hover:bg-green-500/30 transition-colors">
                            <PlusCircle className="w-4 h-4 text-green-400" />
                        </div>
                        {sidebarOpen && <span className="font-semibold">Buat Konten</span>}
                    </Link>

                    {/* KELOLA BERITA */}
                    <Link
                        href={route("admin.news.index")}
                        className="group flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gradient-to-r hover:from-orange-500/20 hover:to-red-500/20 text-slate-300 hover:text-white transition-all duration-200 border border-transparent hover:border-orange-500/30"
                    >
                        <div className="p-1.5 bg-orange-500/20 rounded group-hover:bg-orange-500/30 transition-colors">
                            <Newspaper className="w-4 h-4 text-orange-400" />
                        </div>
                        {sidebarOpen && <span className="font-semibold">Kelola Berita</span>}
                    </Link>

                    {/* PROFILE SAYA */}
                    <Link
                        href={route("profile.edit")}
                        className="group flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gradient-to-r hover:from-blue-500/20 hover:to-indigo-500/20 text-slate-300 hover:text-white transition-all duration-200 border border-transparent hover:border-blue-500/30"
                    >
                        <div className="p-1.5 bg-blue-500/20 rounded group-hover:bg-blue-500/30 transition-colors">
                            <User className="w-4 h-4 text-blue-400" />
                        </div>
                        {sidebarOpen && <span className="font-semibold">Profile Saya</span>}
                    </Link>
                </nav>

                {/* LOGOUT SECTION */}
                <div className="p-3 border-t border-green-500/20 mt-auto sticky bottom-0 bg-gradient-to-r from-[#111827] to-[#1F2937] backdrop-blur-sm">
                    <button
                        type="button"
                        onClick={handleLogout}
                        className="w-full group flex items-center gap-3 px-4 py-3 rounded-lg bg-gradient-to-r from-red-600/20 to-red-600/10 hover:from-red-600/30 hover:to-red-600/20 text-red-300 hover:text-red-200 transition-all duration-200 border border-red-500/30 hover:border-red-500/50 font-semibold"
                    >
                        <LogOut className="w-5 h-5" />
                        {sidebarOpen && <span>Logout</span>}
                    </button>
                    {sidebarOpen && (
                        <p className="text-xs text-slate-400 mt-3 px-2">
                            ✍️ {auth.user.name}
                        </p>
                    )}
                </div>

                {/* Toggle Button */}
                <div className="p-3 border-t border-green-500/20">
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="w-full flex items-center justify-center px-4 py-2 rounded-lg bg-green-500/10 hover:bg-green-500/20 text-slate-300 hover:text-green-400 transition-all"
                    >
                        <Menu className="w-5 h-5" />
                    </button>
                </div>
            </aside>

            {/* KONTEN */}
            <main className="flex-1 flex flex-col min-h-screen overflow-auto">
                <div className="flex-1 p-6 md:p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}