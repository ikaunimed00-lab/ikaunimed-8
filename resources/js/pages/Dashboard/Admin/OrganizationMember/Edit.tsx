import { Head, Link, useForm, router } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { ArrowLeft, Save, Users } from "lucide-react";
import { useState } from "react";

export default function OrganizationMemberEdit({ organization, member }: { organization: any, member: any }) {
    const { data, setData, post, processing, errors } = useForm({
        _method: "PUT",
        name: member.name,
        position: member.position,
        department: member.department || "",
        image: null as File | null,
        order: member.order,
        is_active: Boolean(member.is_active),
    });

    const [imagePreview, setImagePreview] = useState<string | null>(
        member.image ? `/storage/${member.image}` : null
    );

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData("image", file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Use post with _method: PUT because Inertia/Laravel file upload limitations with PUT/PATCH
        // @ts-ignore
        post(route("dashboard.admin.organizations.members.update", [organization.id, member.id]));
    };

    return (
        <AdminLayout>
            <Head title={`Edit Pengurus - ${organization.name}`} />

            <div className="mx-auto max-w-2xl">
                <div className="mb-6">
                    <Link
                        // @ts-ignore
                        href={route("dashboard.admin.organizations.members.index", organization.id)}
                        className="mb-4 inline-flex items-center gap-2 text-sm text-slate-500 hover:text-red-600 transition-colors"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Kembali
                    </Link>
                    <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                        <Users className="w-6 h-6 text-red-600" />
                        Edit Pengurus
                    </h1>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Name */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700">
                                Nama Lengkap
                            </label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) => setData("name", e.target.value)}
                                className="w-full rounded-lg border border-slate-200 px-4 py-2 text-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                                placeholder="Nama lengkap beserta gelar"
                            />
                            {errors.name && (
                                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                            )}
                        </div>

                        {/* Position */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700">
                                Jabatan
                            </label>
                            <input
                                type="text"
                                value={data.position}
                                onChange={(e) => setData("position", e.target.value)}
                                className="w-full rounded-lg border border-slate-200 px-4 py-2 text-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                                placeholder="Contoh: Ketua Umum, Sekretaris"
                            />
                            {errors.position && (
                                <p className="mt-1 text-sm text-red-600">{errors.position}</p>
                            )}
                        </div>

                        {/* Department */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700">
                                Bidang / Departemen (Opsional)
                            </label>
                            <input
                                type="text"
                                value={data.department}
                                onChange={(e) => setData("department", e.target.value)}
                                className="w-full rounded-lg border border-slate-200 px-4 py-2 text-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                                placeholder="Contoh: Bidang Humas, Departemen Pendidikan"
                            />
                            {errors.department && (
                                <p className="mt-1 text-sm text-red-600">{errors.department}</p>
                            )}
                        </div>

                        {/* Order */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700">
                                Urutan Tampil
                            </label>
                            <input
                                type="number"
                                value={data.order}
                                onChange={(e) => setData("order", parseInt(e.target.value))}
                                className="w-full rounded-lg border border-slate-200 px-4 py-2 text-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                            />
                            <p className="mt-1 text-xs text-slate-500">
                                Angka lebih kecil akan tampil lebih dulu.
                            </p>
                            {errors.order && (
                                <p className="mt-1 text-sm text-red-600">{errors.order}</p>
                            )}
                        </div>

                        {/* Image */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700">
                                Foto (Opsional)
                            </label>
                            <div className="flex items-center gap-4">
                                {imagePreview ? (
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        className="h-20 w-20 rounded-full object-cover border border-slate-200"
                                    />
                                ) : (
                                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-100 text-slate-400 border border-slate-200">
                                        <Users className="h-8 w-8" />
                                    </div>
                                )}
                                <label className="cursor-pointer rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200 transition-colors">
                                    <span>Ubah Foto</span>
                                    <input
                                        type="file"
                                        className="hidden"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                    />
                                </label>
                            </div>
                            {errors.image && (
                                <p className="mt-1 text-sm text-red-600">{errors.image}</p>
                            )}
                        </div>

                        {/* Status */}
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="is_active"
                                checked={data.is_active}
                                onChange={(e) => setData("is_active", e.target.checked)}
                                className="h-4 w-4 rounded border-slate-300 text-red-600 focus:ring-red-500"
                            />
                            <label htmlFor="is_active" className="text-sm font-medium text-slate-700">
                                Aktif
                            </label>
                        </div>

                        <div className="flex items-center justify-end gap-4 pt-4 border-t border-slate-100">
                            <Link
                                // @ts-ignore
                                href={route("dashboard.admin.organizations.members.index", organization.id)}
                                className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors"
                            >
                                Batal
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-6 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 transition-colors"
                            >
                                <Save className="h-4 w-4" />
                                {processing ? "Menyimpan..." : "Simpan Perubahan"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}
