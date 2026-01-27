import { Head, useForm, Link } from "@inertiajs/react";
import { route } from "ziggy-js";
import Editor from "@/Components/Editor";
import { Save, X, Eye, Clock } from "lucide-react";
import { useState } from "react";
import AdminLayout from "@/Layouts/AdminLayout";

export default function Create({ authors, categories, organizations }: any) {
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const { data, setData, post, processing, errors } = useForm({
        title: "",
        excerpt: "",
        content: "",
        image: null as File | null,
        categories: [] as number[],
        status: "draft",
        published_at: "",
    });

    function submit(e: React.FormEvent) {
        e.preventDefault();
        post(route("admin.news.store"), {
            forceFormData: true,
        });
    }

    function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (file) {
            setData("image", file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    }

    function toggleCategory(id: number) {
        setData(
            "categories",
            data.categories.includes(id)
                ? data.categories.filter(c => c !== id)
                : [...data.categories, id]
        );
    }

    const isPublishing = data.status === "published";
    const hasErrors = Object.keys(errors).length > 0;

    return (
        <AdminLayout>
            <Head title="Buat Berita" />

            <div className="max-w-5xl mx-auto">
                {/* HEADER */}
                <div className="mb-8">
                    <Link
                        href={route("admin.news.index")}
                        className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-4 font-semibold transition"
                    >
                        <X className="h-4 w-4" />
                        Kembali
                    </Link>
                    <h1 className="text-4xl font-extrabold text-slate-900">
                        📝 Buat Berita Baru
                    </h1>
                    <p className="text-slate-600 mt-2">
                        Tulis dan kelola konten berita dengan profesional
                    </p>
                </div>

                <form onSubmit={submit} className="space-y-6">
                    {/* ERROR ALERTS */}
                    {hasErrors && (
                        <div className="bg-red-50 border border-red-300 rounded-lg p-4">
                            <p className="text-red-800 font-semibold mb-2">
                                ⚠️ Pastikan semua field terisi dengan benar:
                            </p>
                            <ul className="text-red-700 text-sm space-y-1">
                                {Object.entries(errors).map(([key, value]: any) => (
                                    <li key={key}>• {key}: {value}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* MAIN CONTENT SECTION */}
                    <div className="grid grid-cols-3 gap-6">
                        {/* LEFT: Editor */}
                        <div className="col-span-2 space-y-6">
                            {/* ORGANIZATION SCOPE (Super Admin Only) */}
                            {organizations && organizations.length > 0 && (
                                <div className="bg-white rounded-xl shadow p-6 space-y-3">
                                    <label className="block font-semibold text-slate-900">
                                        🏢 Scope Organisasi
                                    </label>
                                    <p className="text-sm text-slate-500 mb-2">
                                        Pilih organisasi pemilik berita ini. Kosongkan untuk berita Global/Publik.
                                    </p>
                                    <select
                                        value={data.organization_id}
                                        onChange={(e) => setData("organization_id", e.target.value)}
                                        className="w-full rounded-lg border border-slate-200 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                                    >
                                        <option value="">-- Global / Publik (PP) --</option>
                                        {organizations.map((org: any) => (
                                            <option key={org.id} value={org.id}>
                                                {org.name} ({org.type.toUpperCase()})
                                            </option>
                                        ))}
                                    </select>
                                    {errors.organization_id && (
                                        <p className="text-red-500 text-xs mt-1">{errors.organization_id}</p>
                                    )}
                                </div>
                            )}

                            {/* JUDUL */}
                            <div className="bg-white rounded-xl shadow p-6 space-y-3">
                                <label className="block font-semibold text-slate-900">
                                    ✍️ Judul Berita
                                </label>
                                <input
                                    value={data.title}
                                    onChange={(e) =>
                                        setData("title", e.target.value)
                                    }
                                    placeholder="Contoh: Universitas Raih Penghargaan Internasional"
                                    className="w-full border border-slate-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                <p className="text-xs text-slate-500">
                                    Minimal 10 karakter • Hindari duplikasi
                                </p>
                            </div>

                            {/* EXCERPT */}
                            <div className="bg-white rounded-xl shadow p-6 space-y-3">
                                <label className="block font-semibold text-slate-900">
                                    📌 Ringkasan (Lead)
                                </label>
                                <textarea
                                    value={data.excerpt}
                                    onChange={(e) =>
                                        setData("excerpt", e.target.value)
                                    }
                                    placeholder="Ringkasan singkat berita yang menarik. 20-500 karakter."
                                    rows={3}
                                    className="w-full border border-slate-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                />
                                <p className="text-xs text-slate-500">
                                    Minimal 20 • Maksimal 500 karakter
                                </p>
                            </div>

                            {/* GAMBAR */}
                            <div className="bg-white rounded-xl shadow p-6 space-y-4">
                                <label className="block font-semibold text-slate-900">
                                    🖼️ Gambar Featured (Wajib)
                                </label>
                                {imagePreview && (
                                    <div className="relative">
                                        <img
                                            src={imagePreview}
                                            alt="Preview"
                                            className="w-full rounded-lg border-2 border-blue-200 max-h-64 object-cover"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setData("image", null);
                                                setImagePreview(null);
                                            }}
                                            className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition"
                                        >
                                            <X className="h-4 w-4" />
                                        </button>
                                    </div>
                                )}
                                <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-blue-500 transition cursor-pointer">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="hidden"
                                        id="image-upload"
                                    />
                                    <label
                                        htmlFor="image-upload"
                                        className="cursor-pointer block"
                                    >
                                        <p className="text-slate-600 font-medium">
                                            Klik atau drag gambar di sini
                                        </p>
                                        <p className="text-xs text-slate-500 mt-1">
                                            Format: JPG, PNG • Min: 600x400px • Max: 5MB
                                        </p>
                                    </label>
                                </div>
                            </div>

                            {/* KONTEN UTAMA */}
                            <div className="bg-white rounded-xl shadow p-6 space-y-3">
                                <label className="block font-semibold text-slate-900">
                                    📄 Konten Berita
                                </label>
                                <Editor
                                    value={data.content}
                                    onChange={(value) =>
                                        setData("content", value)
                                    }
                                />
                                <p className="text-xs text-slate-500">
                                    Minimal 100 karakter • Maksimal 50,000 karakter
                                </p>
                            </div>
                        </div>

                        {/* RIGHT: Sidebar */}
                        <div className="col-span-1 space-y-4">
                            {/* KATEGORI */}
                            <div className="bg-white rounded-xl shadow p-6 space-y-4">
                                <h3 className="font-semibold text-slate-900">
                                    🏷️ Kategori
                                </h3>
                                <div className="space-y-2 max-h-96 overflow-y-auto">
                                    {categories.map((cat: any) => (
                                        <label
                                            key={cat.id}
                                            className="flex items-center p-3 border border-slate-200 rounded-lg hover:bg-blue-50 cursor-pointer transition"
                                        >
                                            <input
                                                type="checkbox"
                                                checked={data.categories.includes(cat.id)}
                                                onChange={() => toggleCategory(cat.id)}
                                                className="rounded w-4 h-4 text-blue-600"
                                            />
                                            <span className="ml-3 font-medium text-slate-700">
                                                {cat.name}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                                <p className="text-xs text-slate-500">
                                    Pilih 1-3 kategori yang relevan
                                </p>
                            </div>

                            {/* STATUS & PUBLISHING */}
                            <div className="bg-white rounded-xl shadow p-6 space-y-4">
                                <h3 className="font-semibold text-slate-900">
                                    ⚙️ Status Publikasi
                                </h3>

                                {/* STATUS SELECTOR */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-slate-700">
                                        Status
                                    </label>
                                    <select
                                        value={data.status}
                                        onChange={(e) =>
                                            setData("status", e.target.value)
                                        }
                                        className="w-full border border-slate-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        <option value="draft">
                                            📋 Draft (Simpan saja)
                                        </option>
                                        <option value="scheduled">
                                            ⏰ Jadwalkan (Tentukan waktu)
                                        </option>
                                        <option value="published">
                                            🚀 Publish (Langsung aktif)
                                        </option>
                                    </select>
                                </div>

                                {/* PUBLISH DATE/TIME */}
                                {isPublishing && (
                                    <div className="space-y-2 pt-3 border-t border-slate-200">
                                        <label className="block text-sm font-medium text-slate-700">
                                            Waktu Publikasi
                                        </label>
                                        <input
                                            type="datetime-local"
                                            value={data.published_at}
                                            onChange={(e) =>
                                                setData(
                                                    "published_at",
                                                    e.target.value
                                                )
                                            }
                                            className="w-full border border-slate-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                        <p className="text-xs text-slate-500">
                                            Kosongi untuk publish sekarang
                                        </p>
                                    </div>
                                )}

                                {/* STATUS INFO */}
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm">
                                    {data.status === "draft" && (
                                        <p className="text-blue-800">
                                            <span className="font-semibold">📋 Draft:</span> Berita disimpan tapi belum dipublikasikan
                                        </p>
                                    )}
                                    {data.status === "scheduled" && (
                                        <p className="text-blue-800">
                                            <span className="font-semibold">⏰ Terjadwal:</span> Otomatis publish pada waktu ditentukan
                                        </p>
                                    )}
                                    {data.status === "published" && (
                                        <p className="text-blue-800">
                                            <span className="font-semibold">🚀 Published:</span> Berita langsung terlihat di portal
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* BUTTONS */}
                            <div className="space-y-3 sticky bottom-4 bg-white/95 backdrop-blur rounded-xl p-4 border border-slate-200 shadow-lg">
                                <button
                                    disabled={processing}
                                    type="submit"
                                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-3.5 rounded-lg font-bold hover:from-emerald-600 hover:to-teal-700 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
                                >
                                    <Save className="h-5 w-5" />
                                    {processing
                                        ? "⏳ Memproses..."
                                        : data.status === "draft"
                                        ? "💾 Simpan Draft"
                                        : "🚀 Publish Sekarang"}
                                </button>
                                <Link
                                    href={route("admin.news.index")}
                                    className="w-full flex items-center justify-center gap-2 px-6 py-3 border-2 border-slate-300 text-slate-700 rounded-lg font-semibold hover:bg-slate-100 hover:border-slate-400 transition-all active:scale-95"
                                >
                                    <X className="h-5 w-5" />
                                    Batal
                                </Link>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}