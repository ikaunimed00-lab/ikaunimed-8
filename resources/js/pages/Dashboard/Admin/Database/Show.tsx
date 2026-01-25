import { Head, Link, usePage } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import EditorLayout from "@/Layouts/EditorLayout";
import { ArrowLeft, User, MapPin, Briefcase, GraduationCap, Phone, Mail, Calendar, CreditCard } from "lucide-react";

export default function DatabaseShow({ user }: any) {
    const { auth }: any = usePage().props;
    const Layout = auth.user.role === 'admin' ? AdminLayout : EditorLayout;

    const formatDate = (dateString: string) => {
        if (!dateString) return "-";
        return new Date(dateString).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });
    };

    return (
        <Layout>
            <Head title={`Detail Alumni - ${user.name}`} />

            <div className="max-w-5xl mx-auto space-y-6">
                {/* BACK BUTTON */}
                <div>
                    <Link
                        href={route("dashboard.database.index")}
                        className="inline-flex items-center text-slate-500 hover:text-blue-600 transition-colors gap-2 text-sm font-medium"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Kembali ke Database
                    </Link>
                </div>

                {/* HEADER CARD */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border flex flex-col md:flex-row items-start md:items-center gap-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                        {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-3">
                            <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
                            <span
                                className={`px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wide ${
                                    user.role === "admin"
                                        ? "bg-red-100 text-red-700"
                                        : user.role === "editor"
                                        ? "bg-blue-100 text-blue-700"
                                        : user.role === "writer"
                                        ? "bg-green-100 text-green-700"
                                        : "bg-slate-100 text-slate-700"
                                }`}
                            >
                                {user.role}
                            </span>
                        </div>
                        <div className="mt-2 flex flex-wrap gap-4 text-sm text-slate-600">
                            <div className="flex items-center gap-1.5">
                                <Mail className="w-4 h-4 text-slate-400" />
                                {user.email}
                            </div>
                            {user.wa && (
                                <div className="flex items-center gap-1.5">
                                    <Phone className="w-4 h-4 text-slate-400" />
                                    {user.wa}
                                </div>
                            )}
                            {user.domicile && (
                                <div className="flex items-center gap-1.5">
                                    <MapPin className="w-4 h-4 text-slate-400" />
                                    {user.domicile}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* LEFT COLUMN - PERSONAL INFO */}
                    <div className="md:col-span-1 space-y-6">
                        <div className="bg-white rounded-xl shadow-sm border p-6">
                            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                <User className="w-5 h-5 text-blue-600" />
                                Data Pribadi
                            </h3>
                            <div className="space-y-4 text-sm">
                                <div>
                                    <label className="block text-xs text-slate-500 mb-1">NIK</label>
                                    <div className="font-medium text-slate-900 flex items-center gap-2">
                                        <CreditCard className="w-3.5 h-3.5 text-slate-400" />
                                        {user.nik || "-"}
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs text-slate-500 mb-1">Jenis Kelamin</label>
                                    <div className="font-medium text-slate-900">
                                        {user.gender === "L" ? "Laki-laki" : user.gender === "P" ? "Perempuan" : "-"}
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs text-slate-500 mb-1">Tempat, Tanggal Lahir</label>
                                    <div className="font-medium text-slate-900 flex items-center gap-2">
                                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                                        {user.tempat_lahir ? `${user.tempat_lahir}, ` : ""}
                                        {formatDate(user.tanggal_lahir)}
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs text-slate-500 mb-1">Pekerjaan</label>
                                    <div className="font-medium text-slate-900 flex items-center gap-2">
                                        <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                                        {user.occupation || "-"}
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs text-slate-500 mb-1">Alamat Lengkap</label>
                                    <div className="font-medium text-slate-900 whitespace-pre-line leading-relaxed">
                                        {user.alamat_lengkap || "-"}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN - EDUCATION HISTORY */}
                    <div className="md:col-span-2 space-y-6">
                        <div className="bg-white rounded-xl shadow-sm border p-6">
                            <h3 className="font-semibold text-gray-900 mb-6 flex items-center gap-2">
                                <GraduationCap className="w-5 h-5 text-blue-600" />
                                Riwayat Pendidikan
                            </h3>

                            {user.educations && user.educations.length > 0 ? (
                                <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
                                    {user.educations
                                        .sort((a: any, b: any) => {
                                            // Sort by level priority (S3 > S2 > S1 > D4 > D3 > D2 > D1)
                                            const levels = ['S3', 'S2', 'S1', 'D4', 'D3', 'D2', 'D1'];
                                            return levels.indexOf(a.level) - levels.indexOf(b.level);
                                        })
                                        .map((edu: any, index: number) => (
                                        <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                                            {/* ICON */}
                                            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-50 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                                                <span className="text-xs font-bold text-blue-600">{edu.level}</span>
                                            </div>
                                            
                                            {/* CARD */}
                                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-4 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                                                <div className="flex items-center justify-between space-x-2 mb-1">
                                                    <div className="font-bold text-slate-900">{edu.university}</div>
                                                </div>
                                                <div className="text-slate-600 font-medium text-sm mb-2">
                                                    {edu.faculty ? `${edu.faculty} - ` : ""}{edu.major}
                                                </div>
                                                <div className="text-xs text-slate-400 bg-slate-50 inline-block px-2 py-1 rounded">
                                                    {edu.admission_year || "?"} - {edu.graduation_year || "Sekarang"}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12 bg-slate-50 rounded-lg border border-dashed border-slate-200">
                                    <GraduationCap className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                                    <p className="text-slate-500 font-medium">Belum ada data pendidikan</p>
                                    <p className="text-slate-400 text-sm">User belum melengkapi profil pendidikan.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
