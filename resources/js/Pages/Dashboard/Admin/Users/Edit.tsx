import { Head, Link, useForm } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { ArrowLeft, Save, User, Building2, Shield } from "lucide-react";
import { routeName } from "@/config/sidebar-menu-config";

export default function UserEdit({ user, organizations }) {
    const { data, setData, put, processing, errors } = useForm({
        name: user.name,
        email: user.email,
        role: user.role,
        organization_id: user.organization_id || "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // @ts-ignore
        put(route("admin.users.update", user.id));
    };

    return (
        <AdminLayout>
            <Head title={`Edit User: ${user.name}`} />

            <div className="mx-auto max-w-3xl">
                <div className="mb-6">
                    <Link
                        // @ts-ignore
                        href={route("admin.users.index")}
                        className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Kembali ke Daftar
                    </Link>
                    <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                        <User className="w-6 h-6 text-blue-600" />
                        Edit User Access
                    </h1>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                    {/* User Info (Read Only) */}
                    <div className="grid gap-6 md:grid-cols-2">
                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700">Nama Lengkap</label>
                            <input
                                type="text"
                                value={data.name}
                                disabled
                                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-500"
                            />
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700">Email</label>
                            <input
                                type="email"
                                value={data.email}
                                disabled
                                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-500"
                            />
                        </div>
                    </div>

                    <hr className="border-slate-100" />

                    {/* Role & Organization */}
                    <div className="space-y-4">
                        <h3 className="flex items-center gap-2 text-lg font-semibold text-slate-800">
                            <Shield className="h-5 w-5 text-slate-500" />
                            Role & Permissions
                        </h3>
                        
                        <div className="grid gap-6 md:grid-cols-2">
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Role Aplikasi <span className="text-red-500">*</span>
                                </label>
                                <select
                                    value={data.role}
                                    onChange={(e) => setData("role", e.target.value)}
                                    className="w-full rounded-lg border border-slate-200 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                                >
                                    <option value="subscriber">Subscriber (Alumni Biasa)</option>
                                    <option value="writer">Writer (Penulis Berita)</option>
                                    <option value="editor">Editor (Moderator)</option>
                                    <option value="admin">Admin (Administrator)</option>
                                </select>
                                {errors.role && <p className="mt-1 text-xs text-red-600">{errors.role}</p>}
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Scope Organisasi
                                </label>
                                <select
                                    value={data.organization_id}
                                    onChange={(e) => setData("organization_id", e.target.value)}
                                    className="w-full rounded-lg border border-slate-200 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                                >
                                    <option value="">-- Tidak Ada / Global (Jika Admin) --</option>
                                    {organizations.map((org: any) => (
                                        <option key={org.id} value={org.id}>
                                            {org.name} ({org.type.toUpperCase()})
                                        </option>
                                    ))}
                                </select>
                                <p className="mt-1 text-xs text-slate-500">
                                    Pilih organisasi jika user ini adalah admin/pengurus untuk cabang tertentu.
                                    <br />
                                    <span className="text-amber-600">Note:</span> Jika kosong dan Role Admin, akan dianggap <strong>Super Admin (Pusat)</strong>.
                                </p>
                                {errors.organization_id && <p className="mt-1 text-xs text-red-600">{errors.organization_id}</p>}
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                        <Link
                            // @ts-ignore
                            href={route("admin.users.index")}
                            className="rounded-lg border border-slate-200 bg-white px-6 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
                        >
                            Batal
                        </Link>
                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50 transition-colors"
                        >
                            <Save className="h-4 w-4" />
                            {processing ? "Menyimpan..." : "Simpan Perubahan"}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
