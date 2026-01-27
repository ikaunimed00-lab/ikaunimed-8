import { Head, Link, router, usePage } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Plus, Edit, Trash2, Users, ArrowLeft } from "lucide-react";
import { routeName } from "@/config/sidebar-menu-config";

export default function OrganizationMemberIndex({ organization, members }: { organization: any, members: any[] }) {
    const { flash } = usePage().props;

    const handleDelete = (id: number) => {
        if (confirm("Apakah Anda yakin ingin menghapus pengurus ini?")) {
            // @ts-ignore
            router.delete(route("dashboard.admin.organizations.members.destroy", [organization.id, id]));
        }
    };

    return (
        <AdminLayout>
            <Head title={`Kelola Pengurus - ${organization.name}`} />

            <div className="mb-6">
                <Link
                    // @ts-ignore
                    href={route("dashboard.admin.organizations.index")}
                    className="mb-4 inline-flex items-center gap-2 text-sm text-slate-500 hover:text-red-600 transition-colors"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Kembali ke Organisasi
                </Link>

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                            <Users className="w-6 h-6 text-red-600" />
                            Pengurus: {organization.name}
                        </h1>
                        <p className="text-slate-500">
                            Kelola daftar pengurus dan struktur organisasi.
                        </p>
                    </div>
                    <Link
                        // @ts-ignore
                        href={route("dashboard.admin.organizations.members.create", organization.id)}
                        className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 transition-colors"
                    >
                        <Plus className="h-4 w-4" />
                        Tambah Pengurus
                    </Link>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="border-b border-slate-100 bg-slate-50 text-slate-500">
                            <tr>
                                <th className="px-6 py-4 font-medium">Urutan</th>
                                <th className="px-6 py-4 font-medium">Foto</th>
                                <th className="px-6 py-4 font-medium">Nama</th>
                                <th className="px-6 py-4 font-medium">Jabatan</th>
                                <th className="px-6 py-4 font-medium">Bidang</th>
                                <th className="px-6 py-4 font-medium">Status</th>
                                <th className="px-6 py-4 font-medium text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {members.length > 0 ? (
                                members.map((member: any) => (
                                    <tr key={member.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4 text-slate-600">{member.order}</td>
                                        <td className="px-6 py-4">
                                            {member.image ? (
                                                <img
                                                    src={`/storage/${member.image}`}
                                                    alt={member.name}
                                                    className="h-10 w-10 rounded-full object-cover border border-slate-200"
                                                />
                                            ) : (
                                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                                                    <Users className="h-5 w-5" />
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 font-medium text-slate-900">{member.name}</td>
                                        <td className="px-6 py-4 text-slate-600">{member.position}</td>
                                        <td className="px-6 py-4 text-slate-600">{member.department || "-"}</td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                                    member.is_active
                                                        ? "bg-green-100 text-green-800"
                                                        : "bg-slate-100 text-slate-800"
                                                }`}
                                            >
                                                {member.is_active ? "Aktif" : "Nonaktif"}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link
                                                    // @ts-ignore
                                                    href={route("dashboard.admin.organizations.members.edit", [organization.id, member.id])}
                                                    className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-blue-600 transition-colors"
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(member.id)}
                                                    className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-red-600 transition-colors"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={7} className="px-6 py-12 text-center text-slate-500">
                                        Belum ada data pengurus.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
}
