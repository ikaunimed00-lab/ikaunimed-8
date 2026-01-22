import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link } from "@inertiajs/react";
import {
    Newspaper,
    CalendarDays,
    BarChart,
    FileCheck,
    Clock,
    CheckCircle,
    XCircle,
    TrendingUp,
    Users,
    AlertCircle,
} from "lucide-react";

export default function Dashboard({ stats, legalizationStats }: any) {
    return (
        <AdminLayout>
            <Head title="Dashboard Admin" />

            <div className="max-w-7xl mx-auto space-y-12">
                {/* === HEADER === */}
                <div className="border-b border-slate-200 pb-8">
                    <h1 className="text-4xl font-bold text-slate-900 mb-2">
                        Dashboard Admin
                    </h1>
                    <p className="text-slate-600">
                        Selamat datang! Pantau statistik dan kelola konten situs Anda
                    </p>
                </div>

                {/* === BERITA SECTION === */}
                <div>
                    <div className="mb-6">
                        <div className="flex items-center gap-2 mb-2">
                            <Newspaper className="w-6 h-6 text-orange-600" />
                            <h2 className="text-2xl font-bold text-slate-900">
                                Statistik Berita
                            </h2>
                        </div>
                        <p className="text-slate-600 ml-8">
                            Ringkasan publikasi dan aktifitas berita terbaru
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        <StatCard
                            icon={<Newspaper className="w-8 h-8" />}
                            value={stats.total}
                            label="Total Berita"
                            color="from-blue-50 to-blue-100"
                            iconColor="text-blue-600"
                            accentColor="bg-blue-100"
                        />
                        <StatCard
                            icon={<TrendingUp className="w-8 h-8" />}
                            value={stats.today}
                            label="Berita Hari Ini"
                            color="from-emerald-50 to-emerald-100"
                            iconColor="text-emerald-600"
                            accentColor="bg-emerald-100"
                        />
                        <StatCard
                            icon={<BarChart className="w-8 h-8" />}
                            value={stats.month}
                            label="Berita Bulan Ini"
                            color="from-amber-50 to-amber-100"
                            iconColor="text-amber-600"
                            accentColor="bg-amber-100"
                        />
                    </div>
                </div>

                {/* === LEGALISASI SECTION === */}
                <div>
                    <div className="mb-6">
                        <div className="flex items-center gap-2 mb-2">
                            <FileCheck className="w-6 h-6 text-teal-600" />
                            <h2 className="text-2xl font-bold text-slate-900">
                                Legalisasi Ijazah
                            </h2>
                        </div>
                        <p className="text-slate-600 ml-8">
                            Ringkasan pengajuan legalisasi dan status verifikasi alumni
                        </p>
                    </div>

                    <div className="grid md:grid-cols-5 gap-4 mb-6">
                        <StatCard
                            icon={<FileCheck className="w-7 h-7" />}
                            value={legalizationStats.total}
                            label="Total"
                            color="from-slate-50 to-slate-100"
                            iconColor="text-slate-600"
                            accentColor="bg-slate-100"
                        />
                        <StatCard
                            icon={<Clock className="w-7 h-7" />}
                            value={legalizationStats.submitted}
                            label="Menunggu"
                            color="from-yellow-50 to-yellow-100"
                            iconColor="text-yellow-600"
                            accentColor="bg-yellow-100"
                        />
                        <StatCard
                            icon={<AlertCircle className="w-7 h-7" />}
                            value={legalizationStats.verified}
                            label="Terverifikasi"
                            color="from-sky-50 to-sky-100"
                            iconColor="text-sky-600"
                            accentColor="bg-sky-100"
                        />
                        <StatCard
                            icon={<CheckCircle className="w-7 h-7" />}
                            value={legalizationStats.completed}
                            label="Selesai"
                            color="from-green-50 to-green-100"
                            iconColor="text-green-600"
                            accentColor="bg-green-100"
                        />
                        <StatCard
                            icon={<XCircle className="w-7 h-7" />}
                            value={legalizationStats.rejected}
                            label="Ditolak"
                            color="from-red-50 to-red-100"
                            iconColor="text-red-600"
                            accentColor="bg-red-100"
                        />
                    </div>

                    <Link
                        href={route("admin.legalizations.index")}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 transition-all shadow-md hover:shadow-lg"
                    >
                        <FileCheck className="w-5 h-5" />
                        Kelola Legalisasi
                    </Link>
                </div>

                {/* === QUICK ACTIONS === */}
                <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-8 border border-slate-200">
                    <h3 className="text-lg font-bold text-slate-900 mb-6">Akses Cepat</h3>
                    <div className="grid md:grid-cols-3 gap-4">
                        <Link
                            href={route("admin.news.index")}
                            className="p-4 bg-white rounded-lg border border-slate-200 hover:border-orange-500 hover:shadow-lg transition-all group"
                        >
                            <Newspaper className="w-6 h-6 text-orange-600 mb-3 group-hover:scale-110 transition-transform" />
                            <h4 className="font-semibold text-slate-900 mb-1">Kelola Berita</h4>
                            <p className="text-sm text-slate-600">Tambah, edit, atau hapus berita</p>
                        </Link>
                        <Link
                            href={route("admin.users.index")}
                            className="p-4 bg-white rounded-lg border border-slate-200 hover:border-teal-500 hover:shadow-lg transition-all group"
                        >
                            <Users className="w-6 h-6 text-teal-600 mb-3 group-hover:scale-110 transition-transform" />
                            <h4 className="font-semibold text-slate-900 mb-1">Kelola User</h4>
                            <p className="text-sm text-slate-600">Kelola pengguna dan role</p>
                        </Link>
                        <Link
                            href={route("admin.legalizations.index")}
                            className="p-4 bg-white rounded-lg border border-slate-200 hover:border-blue-500 hover:shadow-lg transition-all group"
                        >
                            <FileCheck className="w-6 h-6 text-blue-600 mb-3 group-hover:scale-110 transition-transform" />
                            <h4 className="font-semibold text-slate-900 mb-1">Legalisasi</h4>
                            <p className="text-sm text-slate-600">Proses pengajuan legalisasi</p>
                        </Link>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

function StatCard({
    icon,
    value,
    label,
    color,
    iconColor,
    accentColor,
}: {
    icon: React.ReactNode;
    value: number;
    label: string;
    color: string;
    iconColor: string;
    accentColor: string;
}) {
    return (
        <div className={`bg-gradient-to-br ${color} p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-lg transition-shadow`}>
            <div className={`${accentColor} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                <div className={`${iconColor}`}>{icon}</div>
            </div>
            <div className="text-3xl font-bold text-slate-900 mb-1">{value}</div>
            <div className="text-slate-600 text-sm font-medium">{label}</div>
        </div>
    );
}
