import { Head, Link, router, usePage } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Plus, Search, Edit, Trash2, Building2, Users } from "lucide-react";
import { useState } from "react";

export default function OrganizationIndex({ organizations, filters, auth_user_scope }) {
    const { flash } = usePage().props;
    const [search, setSearch] = useState(filters.search || "");
    const [type, setType] = useState(filters.type || "");

    const handleSearch = (e: any) => {
        e.preventDefault();
        router.get(
            route("dashboard.admin.organizations.index"),
            { search, type },
            { preserveState: true }
        );
    };

    const handleDelete = (id: number) => {
        if (confirm("Apakah Anda yakin ingin menghapus organisasi ini? Semua data terkait (User, Berita) mungkin akan terdampak.")) {
            router.delete(route("dashboard.admin.organizations.destroy", id));
        }
    };

    return (
        <AdminLayout>
            <Head title="Kelola Organisasi" />

            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                        <Building2 className="w-6 h-6 text-red-600" />
                        Kelola Organisasi
                    </h1>
                    <p className="text-slate-500">
                        Manajemen Struktur Organisasi (PP, DPW, DPC)
                    </p>
                </div>
                <Link
                    href={route("dashboard.admin.organizations.create")}
                    className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 transition-colors"
                >
                    <Plus className="h-4 w-4" />
                    Tambah Organisasi
                </Link>
            </div>

            {/* Filters */}
            <div className="mb-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <form onSubmit={handleSearch} className="flex flex-col gap-4 sm:flex-row">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Cari nama organisasi..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full rounded-lg border border-slate-200 pl-10 pr-4 py-2 text-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                        />
                    </div>
                    <select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className="rounded-lg border border-slate-200 px-4 py-2 text-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                    >
                        <option value="">Semua Tipe</option>
                        <option value="pp">Pengurus Pusat (PP)</option>
                        <option value="dpw">Pengurus Wilayah (DPW)</option>
                        <option value="dpc">Pengurus Cabang (DPC)</option>
                    </select>
                    <button
                        type="submit"
                        className="rounded-lg bg-slate-800 px-6 py-2 text-sm font-medium text-white hover:bg-slate-900 transition-colors"
                    >
                        Filter
                    </button>
                </form>
            </div>

            {/* Table */}
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="border-b border-slate-100 bg-slate-50 text-slate-500">
                            <tr>
                                <th className="px-6 py-4 font-medium">Nama Organisasi</th>
                                <th className="px-6 py-4 font-medium">Tipe</th>
                                <th className="px-6 py-4 font-medium">Induk (Parent)</th>
                                <th className="px-6 py-4 font-medium">Slug</th>
                                <th className="px-6 py-4 font-medium text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {organizations.data.length > 0 ? (
                                organizations.data.map((org: any) => (
                                    <tr key={org.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-slate-900">
                                            {org.name}
                                            {!org.is_active && (
                                                <span className="ml-2 inline-flex items-center rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-800">
                                                    Non-Aktif
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                                    org.type === "pp"
                                                        ? "bg-purple-100 text-purple-800"
                                                        : org.type === "dpw"
                                                        ? "bg-blue-100 text-blue-800"
                                                        : "bg-green-100 text-green-800"
                                                }`}
                                            >
                                                {org.type.toUpperCase()}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-slate-500">
                                            {org.parent?.name || "-"}
                                        </td>
                                        <td className="px-6 py-4 text-slate-500 font-mono text-xs">
                                            {org.slug}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link
                                                    href={route('dashboard.admin.organizations.edit', org.id)}
                                                    className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-blue-600 transition-colors"
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </Link>
                                                {(auth_user_scope.is_central_admin || org.id !== auth_user_scope.organization_id) && (
                                                    <button
                                                        onClick={() => handleDelete(org.id)}
                                                        className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-red-600 transition-colors"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                                        Tidak ada data organisasi ditemukan.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                
                {/* Pagination */}
                {organizations.links && organizations.links.length > 3 && (
                     <div className="flex items-center justify-between border-t border-slate-100 px-6 py-4">
                        <div className="flex gap-1">
                            {organizations.links.map((link: any, i: number) => (
                                <Link
                                    key={i}
                                    href={link.url || "#"}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                    className={`rounded px-3 py-1 text-xs font-medium transition-colors ${
                                        link.active
                                            ? "bg-red-600 text-white"
                                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                    } ${!link.url && "pointer-events-none opacity-50"}`}
                                />
                            ))}
                        </div>
                     </div>
                )}
            </div>
        </AdminLayout>
    );
}
