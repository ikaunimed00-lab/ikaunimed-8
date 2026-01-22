import { Head, router, usePage } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { useState } from "react";
import { Trash2, ArrowLeft, Users, Shield, Mail, Trash } from "lucide-react";

export default function UsersIndex({ users }) {
    const { flash, auth }: any = usePage().props;

    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);

    /**
     * ROUTE DASHBOARD BERDASARKAN ROLE
     * (SEMUA ROUTE INI SUDAH TERBUKTI ADA)
     */
    const dashboardRoute = (() => {
        switch (auth.user.role) {
            case "admin":
                return route("dashboard.admin");
            case "editor":
                return route("dashboard.editor");
            case "writer":
                return route("dashboard.writer");
            case "subscriber":
                return route("dashboard.subscriber");
            default:
                return route("home");
        }
    })();

    const toggleSelectUser = (id: number) => {
        setSelectedIds(prev =>
            prev.includes(id) ? prev.filter(uid => uid !== id) : [...prev, id]
        );
    };

    const toggleSelectAll = () => {
        if (selectedIds.length === users.length) {
            setSelectedIds([]);
        } else {
            setSelectedIds(users.map(u => u.id));
        }
    };

    const deleteUser = (id: number) => {
        setDeleteTargetId(id);
        setShowDeleteConfirm(true);
    };

    const confirmDelete = () => {
        if (deleteTargetId) {
            router.delete(route("admin.users.destroy", deleteTargetId), {
                onSuccess: () => {
                    setShowDeleteConfirm(false);
                    setDeleteTargetId(null);
                }
            });
        }
    };

    const bulkDelete = () => {
        if (selectedIds.length === 0) return;

        if (!window.confirm(`Hapus ${selectedIds.length} user? Tindakan ini tidak bisa dibatalkan.`)) {
            return;
        }

        router.post(
            route("admin.users.bulk-delete"),
            { ids: selectedIds },
            { onSuccess: () => setSelectedIds([]) }
        );
    };

    const getRoleColor = (role: string) => {
        switch (role) {
            case "admin":
                return { bg: "bg-red-100", text: "text-red-700" };
            case "editor":
                return { bg: "bg-blue-100", text: "text-blue-700" };
            case "writer":
                return { bg: "bg-green-100", text: "text-green-700" };
            default:
                return { bg: "bg-slate-100", text: "text-slate-700" };
        }
    };

    const updateRole = (userId: number, role: string) => {
        router.put(
            route("admin.users.update", userId),
            { role },
            { preserveScroll: true }
        );
    };

    return (
        <>
            <Head title="Kelola User" />

            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-50 to-blue-50 py-8 px-4 md:px-8">
                <div className="max-w-6xl mx-auto">
                    {/* HEADER */}
                    <div className="mb-10">
                        <a
                            href={dashboardRoute}
                            className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 font-semibold transition-colors mb-4 group"
                        >
                            <div className="p-2 bg-white rounded-full shadow-sm group-hover:shadow-md transition-all">
                                <ArrowLeft className="h-4 w-4" />
                            </div>
                            Kembali ke Dashboard
                        </a>

                        <div className="flex items-center gap-4 mb-2">
                            <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg">
                                <Users className="w-6 h-6 text-white" />
                            </div>
                            <h1 className="text-4xl font-extrabold text-slate-900">
                                Kelola User
                            </h1>
                        </div>
                        <p className="text-slate-600 ml-16">
                            Manage users dan kontrol role setiap pengguna sistem
                        </p>
                    </div>

                    {/* FLASH MESSAGE */}
                    {flash?.success && (
                        <div className="mb-6 p-4 bg-green-50 border border-green-300 rounded-lg">
                            <p className="text-green-800 font-semibold">✓ {flash.success}</p>
                        </div>
                    )}
                    {flash?.error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-300 rounded-lg">
                            <p className="text-red-800 font-semibold">✗ {flash.error}</p>
                        </div>
                    )}

                    {/* TABLE */}
                    <div className="rounded-2xl border border-slate-200 shadow-lg overflow-hidden bg-white">
                        <div className="bg-slate-50 px-8 py-6 border-b flex justify-between items-center">
                            <div>
                                <p className="text-slate-600 text-sm font-semibold uppercase">
                                    Total User
                                </p>
                                <p className="text-3xl font-bold text-slate-900">
                                    {users.length}
                                </p>
                            </div>

                            {selectedIds.length > 0 && (
                                <button
                                    onClick={bulkDelete}
                                    className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg font-semibold"
                                >
                                    <Trash className="w-4 h-4" />
                                    Hapus {selectedIds.length} User
                                </button>
                            )}
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-slate-100 border-b">
                                    <tr>
                                        <th className="px-6 py-4">
                                            <input
                                                type="checkbox"
                                                checked={selectedIds.length === users.length && users.length > 0}
                                                onChange={toggleSelectAll}
                                            />
                                        </th>
                                        <th className="px-6 py-4 text-left">Nama</th>
                                        <th className="px-6 py-4 text-left">Email</th>
                                        <th className="px-6 py-4 text-center">Role</th>
                                        <th className="px-6 py-4 text-center">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    {users.map(user => {
                                        const roleColor = getRoleColor(user.role);
                                        return (
                                            <tr key={user.id}>
                                                <td className="px-6 py-4">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedIds.includes(user.id)}
                                                        onChange={() => toggleSelectUser(user.id)}
                                                    />
                                                </td>
                                                <td className="px-6 py-4 font-semibold">
                                                    {user.name}
                                                </td>
                                                <td className="px-6 py-4 flex items-center gap-2">
                                                    <Mail className="w-4 h-4 text-slate-400" />
                                                    {user.email}
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <select
                                                        value={user.role}
                                                        onChange={e =>
                                                            updateRole(user.id, e.target.value)
                                                        }
                                                        className={`px-3 py-2 rounded ${roleColor.bg} ${roleColor.text}`}
                                                    >
                                                        <option value="subscriber">Subscriber</option>
                                                        <option value="writer">Writer</option>
                                                        <option value="editor">Editor</option>
                                                        <option value="admin">Admin</option>
                                                    </select>
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <button
                                                        onClick={() => deleteUser(user.id)}
                                                        className="text-red-600 hover:underline flex items-center gap-1 justify-center"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                        Hapus
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* MODAL */}
            {showDeleteConfirm && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-6 max-w-sm">
                        <h2 className="text-xl font-bold mb-4">Hapus User?</h2>
                        <p className="mb-6 text-slate-600">
                            Tindakan ini tidak bisa dibatalkan.
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowDeleteConfirm(false)}
                                className="flex-1 border px-4 py-2 rounded"
                            >
                                Batal
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="flex-1 bg-red-600 text-white px-4 py-2 rounded"
                            >
                                Hapus
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

/**
 * WAJIB
 */
UsersIndex.layout = page => <AdminLayout>{page}</AdminLayout>;
