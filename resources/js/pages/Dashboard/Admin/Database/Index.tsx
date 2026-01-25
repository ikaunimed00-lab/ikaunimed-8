import { Head, Link, router, usePage } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import EditorLayout from "@/Layouts/EditorLayout";
import { useState } from "react";
import { Search, Eye, Filter } from "lucide-react";

export default function DatabaseIndex({ users, filters }: any) {
    const { auth }: any = usePage().props;
    const [search, setSearch] = useState(filters.search || "");
    const [role, setRole] = useState(filters.role || "");

    // Determine Layout based on user role
    const Layout = auth.user.role === 'admin' ? AdminLayout : EditorLayout;

    const handleSearch = (e: any) => {
        e.preventDefault();
        router.get(
            route("dashboard.database.index"),
            { search, role },
            { preserveState: true, replace: true }
        );
    };

    const handleFilterChange = (newRole: string) => {
        setRole(newRole);
        router.get(
            route("dashboard.database.index"),
            { search, role: newRole },
            { preserveState: true, replace: true }
        );
    };

    return (
        <Layout>
            <Head title="Database Alumni" />

            <div className="space-y-6">
                {/* HEADER */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">
                            Database Alumni
                        </h1>
                        <p className="text-slate-500 text-sm">
                            Total {users.total} alumni terdaftar
                        </p>
                    </div>

                    {/* SEARCH & FILTER */}
                    <div className="flex flex-col sm:flex-row gap-3">
                        <form onSubmit={handleSearch} className="relative">
                            <input
                                type="text"
                                placeholder="Cari nama, email, NIK..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-64"
                            />
                            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                        </form>

                        <select
                            value={role}
                            onChange={(e) => handleFilterChange(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
                        >
                            <option value="">Semua Role</option>
                            <option value="subscriber">Subscriber (Alumni)</option>
                            <option value="writer">Writer</option>
                            <option value="editor">Editor</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                </div>

                {/* TABLE */}
                <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-slate-50 border-b">
                                <tr>
                                    <th className="px-6 py-4 font-semibold text-slate-700">
                                        Nama / Email
                                    </th>
                                    <th className="px-6 py-4 font-semibold text-slate-700">
                                        Info Kontak
                                    </th>
                                    <th className="px-6 py-4 font-semibold text-slate-700">
                                        Pekerjaan / Domisili
                                    </th>
                                    <th className="px-6 py-4 font-semibold text-slate-700">
                                        Role
                                    </th>
                                    <th className="px-6 py-4 font-semibold text-slate-700 text-right">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {users.data.length > 0 ? (
                                    users.data.map((user: any) => (
                                        <tr
                                            key={user.id}
                                            className="hover:bg-slate-50 transition-colors"
                                        >
                                            <td className="px-6 py-4">
                                                <div className="font-semibold text-slate-900">
                                                    {user.name}
                                                </div>
                                                <div className="text-slate-500 text-xs">
                                                    {user.email}
                                                </div>
                                                <div className="text-slate-400 text-xs mt-1">
                                                    Joined: {new Date(user.created_at).toLocaleDateString("id-ID")}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="space-y-1">
                                                    {user.wa ? (
                                                        <div className="text-xs text-slate-600">
                                                            <span className="font-medium">WA:</span> {user.wa}
                                                        </div>
                                                    ) : (
                                                        <span className="text-xs text-slate-400 italic">- No WA -</span>
                                                    )}
                                                    {user.nik ? (
                                                        <div className="text-xs text-slate-600">
                                                            <span className="font-medium">NIK:</span> {user.nik}
                                                        </div>
                                                    ) : null}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="space-y-1">
                                                    <div className="font-medium text-slate-700">
                                                        {user.occupation || "-"}
                                                    </div>
                                                    <div className="text-xs text-slate-500">
                                                        {user.domicile || "-"}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span
                                                    className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
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
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <Link
                                                    href={route("dashboard.database.show", user.id)}
                                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 hover:text-blue-600 hover:border-blue-300 transition-all text-xs font-medium shadow-sm"
                                                >
                                                    <Eye className="w-3.5 h-3.5" />
                                                    Detail
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                                            Tidak ada data ditemukan.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* PAGINATION */}
                    {users.links && users.links.length > 3 && (
                        <div className="px-6 py-4 border-t bg-slate-50">
                            <div className="flex flex-wrap gap-1 justify-center sm:justify-end">
                                {users.links.map((link: any, key: number) => (
                                    <Link
                                        key={key}
                                        href={link.url || "#"}
                                        className={`px-3 py-1 text-xs rounded border ${
                                            link.active
                                                ? "bg-blue-600 text-white border-blue-600"
                                                : "bg-white text-slate-600 border-slate-300 hover:bg-slate-100"
                                        } ${!link.url ? "opacity-50 cursor-not-allowed" : ""}`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
}
