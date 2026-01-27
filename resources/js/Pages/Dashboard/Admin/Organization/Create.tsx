import { Head, Link, useForm } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { ArrowLeft, Save, Building2 } from "lucide-react";
import { routeName } from "@/config/sidebar-menu-config";

export default function OrganizationCreate({ parents, default_parent_id = null }) {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        type: default_parent_id ? "dpc" : "dpc", // Default DPC, but if scoped, likely creating DPC
        parent_id: default_parent_id || "",
        email: "",
        phone: "",
        address: "",
        description: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(routeName("dashboard.admin.organizations.store"));
    };

    const isScoped = !!default_parent_id;

    return (
        <AdminLayout>
            <Head title="Tambah Organisasi" />

            <div className="mx-auto max-w-3xl">
                <div className="mb-6">
                    <Link
                        href={routeName("dashboard.admin.organizations.index")}
                        className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-red-600 transition-colors"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Kembali ke Daftar
                    </Link>
                    <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                        <Building2 className="w-6 h-6 text-red-600" />
                        Tambah Organisasi Baru
                    </h1>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                    {/* Basic Info */}
                    <div className="grid gap-6 md:grid-cols-2">
                        <div className="col-span-2">
                            <label className="mb-2 block text-sm font-medium text-slate-700">
                                Nama Organisasi <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) => setData("name", e.target.value)}
                                className={`w-full rounded-lg border px-4 py-2 text-sm focus:outline-none focus:ring-2 ${
                                    errors.name
                                        ? "border-red-300 focus:ring-red-200"
                                        : "border-slate-200 focus:border-red-500 focus:ring-red-100"
                                }`}
                                placeholder="Contoh: DPC Kota Medan"
                            />
                            {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700">
                                Tipe Organisasi <span className="text-red-500">*</span>
                            </label>
                            <select
                                value={data.type}
                                onChange={(e) => setData("type", e.target.value)}
                                className="w-full rounded-lg border border-slate-200 px-4 py-2 text-sm focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-100"
                                disabled={isScoped} // If scoped, likely restricted to DPC (based on controller logic)
                            >
                                {!isScoped && <option value="pp">Pengurus Pusat (PP)</option>}
                                {!isScoped && <option value="dpw">Pengurus Wilayah (DPW)</option>}
                                <option value="dpc">Pengurus Cabang (DPC)</option>
                            </select>
                            {errors.type && <p className="mt-1 text-xs text-red-600">{errors.type}</p>}
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700">
                                Induk Organisasi (Parent)
                            </label>
                            <select
                                value={data.parent_id}
                                onChange={(e) => setData("parent_id", e.target.value)}
                                className="w-full rounded-lg border border-slate-200 px-4 py-2 text-sm focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-100"
                                disabled={data.type === 'pp' || isScoped}
                            >
                                <option value="">-- Tidak Ada / Langsung --</option>
                                {parents.map((p: any) => (
                                    <option key={p.id} value={p.id}>
                                        {p.name} ({p.type.toUpperCase()})
                                    </option>
                                ))}
                            </select>
                            <p className="mt-1 text-xs text-slate-500">
                                {isScoped 
                                    ? "Induk organisasi otomatis diset ke wilayah Anda." 
                                    : "Kosongkan jika organisasi ini adalah root (misal PP) atau menginduk langsung ke struktur utama."}
                            </p>
                            {errors.parent_id && <p className="mt-1 text-xs text-red-600">{errors.parent_id}</p>}
                        </div>
                    </div>

                    <hr className="border-slate-100" />

                    {/* Contact Info */}
                    <div className="grid gap-6 md:grid-cols-2">
                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700">Email Resmi</label>
                            <input
                                type="email"
                                value={data.email}
                                onChange={(e) => setData("email", e.target.value)}
                                className="w-full rounded-lg border border-slate-200 px-4 py-2 text-sm focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-100"
                                placeholder="email@organisasi.or.id"
                            />
                            {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700">Telepon / WA</label>
                            <input
                                type="text"
                                value={data.phone}
                                onChange={(e) => setData("phone", e.target.value)}
                                className="w-full rounded-lg border border-slate-200 px-4 py-2 text-sm focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-100"
                                placeholder="0812..."
                            />
                            {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone}</p>}
                        </div>

                        <div className="col-span-2">
                            <label className="mb-2 block text-sm font-medium text-slate-700">Alamat Lengkap</label>
                            <textarea
                                value={data.address}
                                onChange={(e) => setData("address", e.target.value)}
                                rows={3}
                                className="w-full rounded-lg border border-slate-200 px-4 py-2 text-sm focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-100"
                                placeholder="Jalan..."
                            ></textarea>
                            {errors.address && <p className="mt-1 text-xs text-red-600">{errors.address}</p>}
                        </div>

                         <div className="col-span-2">
                            <label className="mb-2 block text-sm font-medium text-slate-700">Deskripsi Singkat</label>
                            <textarea
                                value={data.description}
                                onChange={(e) => setData("description", e.target.value)}
                                rows={2}
                                className="w-full rounded-lg border border-slate-200 px-4 py-2 text-sm focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-100"
                                placeholder="Deskripsi organisasi..."
                            ></textarea>
                            {errors.description && <p className="mt-1 text-xs text-red-600">{errors.description}</p>}
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                        <Link
                            href={route("dashboard.admin.organizations.index")}
                            className="rounded-lg border border-slate-200 bg-white px-6 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
                        >
                            Batal
                        </Link>
                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-6 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50 transition-colors"
                        >
                            <Save className="h-4 w-4" />
                            {processing ? "Menyimpan..." : "Simpan Organisasi"}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
