import { PropsWithChildren, useState } from "react";
import { Link, usePage, router } from "@inertiajs/react";
import { route } from "ziggy-js";
import { Home, FileText, User, LogOut, Menu, LayoutDashboard } from "lucide-react";

export default function SubscriberLayout({ children }: PropsWithChildren) {
    const { auth }: any = usePage().props;
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const handleLogout = () => {
        router.post(route("logout"));
    };

    return (
        <div className="min-h-screen flex bg-slate-50">
            <aside className={`${sidebarOpen ? "w-64" : "w-20"} bg-[#0F172A] text-white transition-all`}>
                <div className="p-6 border-b border-white/10">
                    <div className="font-bold text-lg">Portal Alumni</div>
                </div>

                <nav className="p-4 space-y-2">
                    <Link href={route("dashboard.subscriber")} className="flex gap-3 p-3 hover:bg-white/10 rounded">
                        <LayoutDashboard size={18} /> {sidebarOpen && "Dashboard"}
                    </Link>

                    <Link href={route("legalization.index")} className="flex gap-3 p-3 hover:bg-white/10 rounded">
                        <FileText size={18} /> {sidebarOpen && "Legalisir Ijazah"}
                    </Link>

                    <Link href={route("profile.edit")} className="flex gap-3 p-3 hover:bg-white/10 rounded">
                        <User size={18} /> {sidebarOpen && "Profil"}
                    </Link>
                </nav>

                <div className="mt-auto p-4 border-t border-white/10">
                    <button onClick={handleLogout} className="flex gap-3 text-red-400">
                        <LogOut size={18} /> {sidebarOpen && "Logout"}
                    </button>
                </div>

                <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-4 w-full">
                    <Menu />
                </button>
            </aside>

            <main className="flex-1 p-8">{children}</main>
        </div>
    );
}
