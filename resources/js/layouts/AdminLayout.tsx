import { PropsWithChildren, useState } from "react";
import { Link, usePage, router } from "@inertiajs/react";
import { route } from "ziggy-js";
import {
    Home,
    Newspaper,
    Users,
    FileCheck,
    LogOut,
    Menu,
} from "lucide-react";

export default function AdminLayout({ children }: PropsWithChildren) {
    const { auth }: any = usePage().props;
    const [sidebarOpen, setSidebarOpen] = useState(true);

    if (!auth?.user) {
        return null;
    }

    function handleLogout() {
        router.post(route("logout"));
    }

    /**
     * ❗ ADMIN LAYOUT = ADMIN DASHBOARD ONLY
     * Tidak ada role switching di layout
     */
    const dashboardRoute = route("dashboard.admin");

    return (
        <div className="min-h-screen flex bg-gradient-to-br from-white via-blue-50/30 to-white">
            {/* SIDEBAR */}
            <aside
                className={`${
                    sidebarOpen ? "w-64" : "w-20"
                } bg-gradient-to-b from-[#1F2937] via-[#111827] to-[#0F172A] text-white flex-shrink-0 transition-all duration-300 border-r border-[#FF7E00]/20 shadow-xl overflow-y-auto`}
            >
                {/* LOGO */}
                <div className="p-6 border-b border-[#FF7E00]/20">
                    <div className="flex items-center gap-3">
                        <img
                            src="/images/favicon_ikaunimed.png"
                            alt="IKA UNIMED"
                            className="h-10 w-10"
                        />
                        {sidebarOpen && (
                            <div>
                                <div className="font-bold text-lg">
                                    <span className="text-[#FF7E00]">IKA</span>
                                    <span className="text-[#00A69D]">UNI</span>
                                    <span className="text-[#e9cf35]">MED</span>
                                </div>
                                <div className="text-xs text-slate-400">
                                    Admin Panel
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* NAV */}
                <nav className="p-3 space-y-2 text-sm">
                    <Link
                        href={route("home")}
                        className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10"
                    >
                        <Home className="w-5 h-5 text-[#FF7E00]" />
                        {sidebarOpen && "Home Portal"}
                    </Link>

                    <Link
                        href={dashboardRoute}
                        className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10"
                    >
                        <BarChart3 className="w-5 h-5 text-[#00A69D]" />
                        {sidebarOpen && "Dashboard"}
                    </Link>

                    <Link
                        href={route("admin.news.index")}
                        className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10"
                    >
                        <Newspaper className="w-5 h-5 text-[#FF7E00]" />
                        {sidebarOpen && "Kelola Berita"}
                    </Link>

                    {auth.user.role === "admin" && (
                        <Link
                            href={route("admin.users.index")}
                            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10"
                        >
                            <Users className="w-5 h-5 text-[#e9cf35]" />
                            {sidebarOpen && "Kelola User"}
                        </Link>
                    )}

                    {(auth.user.role === "admin" ||
                        auth.user.role === "editor") && (
                        <Link
                            href={route("admin.legalizations.index")}
                            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10"
                        >
                            <FileCheck className="w-5 h-5 text-[#00A69D]" />
                            {sidebarOpen && "Kelola Legalisasi"}
                        </Link>
                    )}
                </nav>

                {/* LOGOUT */}
                <div className="p-3 border-t border-white/10 mt-auto">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-red-600/20 hover:bg-red-600/30"
                    >
                        <LogOut className="w-5 h-5" />
                        {sidebarOpen && "Logout"}
                    </button>
                </div>

                {/* TOGGLE */}
                <div className="p-3 border-t border-white/10">
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="w-full flex justify-center p-2 hover:bg-white/10 rounded"
                    >
                        <Menu className="w-5 h-5" />
                    </button>
                </div>
            </aside>

            {/* CONTENT */}
            <main className="flex-1 p-6">{children}</main>
        </div>
    );
}

/* ICON */
function BarChart3(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M3 3v18h18" />
            <path d="M7 16V9" />
            <path d="M12 16V5" />
            <path d="M17 16v-3" />
        </svg>
    );
}
