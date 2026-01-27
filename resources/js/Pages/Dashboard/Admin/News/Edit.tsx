import { Head, useForm, Link } from "@inertiajs/react";
import { route } from "ziggy-js";
import Editor from "@/Components/Editor";
import { Save, X, Edit2 } from "lucide-react";
import { useState } from "react";
import AdminLayout from "@/Layouts/AdminLayout";

export default function Edit({ news, authors, categories, organizations, authRole }: any) {
  const [imagePreview, setImagePreview] = useState<string | null>(news.image ?? null);

  const { data, setData, put, processing, errors } = useForm({
    title: news.title,
    excerpt: news.excerpt || "",
    content: news.content,
    image: null as File | null,
    user_id: news.user_id || "",
    categories: (news.categories?.map((c: any) => parseInt(c)) || []) as number[],
    status: news.status || "draft",
    published_at: news.published_at || "",
  });

  function submit(e: React.FormEvent) {
    e.preventDefault();
    put(route("admin.news.update", news.slug), {
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
  const statusColor = {
    draft: "bg-slate-100 text-slate-700",
    scheduled: "bg-amber-100 text-amber-700",
    published: "bg-green-100 text-green-700",
  };

  return (
    <AdminLayout>
      <Head title="Edit Berita" />

      <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/20 to-white py-8 px-4">
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
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-extrabold text-slate-900">
                  ✏️ Edit Berita
                </h1>
                <p className="text-slate-600 mt-2">
                  Perbarui konten dan kelola publikasi
                </p>
              </div>
              <div className={`px-4 py-2 rounded-lg font-semibold ${statusColor[data.status as keyof typeof statusColor]}`}>
                {data.status === "draft" && "📋 Draft"}
                {data.status === "scheduled" && "⏰ Terjadwal"}
                {data.status === "published" && "🚀 Published"}
              </div>
            </div>
          </div>

          <form onSubmit={submit} className="space-y-6">
            {/* ERROR ALERTS */}
            {hasErrors && (
              <div className="bg-red-50 border border-red-300 rounded-lg p-4">
                <p className="text-red-800 font-semibold mb-2">
                  ⚠️ Perbaiki error berikut:
                </p>
                <ul className="text-red-700 text-sm space-y-1">
                  {Object.entries(errors).map(([key, value]: any) => (
                    <li key={key}>• {key}: {value}</li>
                  ))}
                </ul>
              </div>
            )}

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
                    onChange={(e) => setData("title", e.target.value)}
                    className="w-full border border-slate-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* EXCERPT */}
                <div className="bg-white rounded-xl shadow p-6 space-y-3">
                  <label className="block font-semibold text-slate-900">
                    📌 Ringkasan (Lead)
                  </label>
                  <textarea
                    value={data.excerpt}
                    onChange={(e) => setData("excerpt", e.target.value)}
                    placeholder="Ringkasan singkat berita yang menarik."
                    rows={3}
                    className="w-full border border-slate-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                  <p className="text-xs text-slate-500">
                    20-500 karakter
                  </p>
                </div>

                {/* GAMBAR */}
                <div className="bg-white rounded-xl shadow p-6 space-y-4">
                  <label className="block font-semibold text-slate-900">
                    🖼️ Gambar Featured
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
                        Klik atau drag gambar baru di sini
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
                    onChange={(value) => setData("content", value)}
                  />
                  <p className="text-xs text-slate-500">
                    100-50,000 karakter
                  </p>
                </div>
              </div>

              {/* RIGHT: Sidebar */}
              <div className="col-span-1 space-y-4">
                {/* PENULIS (Admin only) */}
                {authRole === "admin" && (
                  <div className="bg-white rounded-xl shadow p-6 space-y-3">
                    <h3 className="font-semibold text-slate-900">
                      👤 Penulis
                    </h3>
                    <select
                      value={data.user_id}
                      onChange={(e) => setData("user_id", e.target.value)}
                      className="w-full border border-slate-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Pilih Penulis</option>
                      {authors.map((u: any) => (
                        <option key={u.id} value={u.id}>
                          {u.name} ({u.role})
                        </option>
                      ))}
                    </select>
                  </div>
                )}

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
                      onChange={(e) => setData("status", e.target.value)}
                      className="w-full border border-slate-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="draft">
                        📋 Draft
                      </option>
                      <option value="scheduled">
                        ⏰ Jadwalkan
                      </option>
                      <option value="published">
                        🚀 Publish
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
                          setData("published_at", e.target.value)
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
                        <span className="font-semibold">🚀 Published:</span> Berita terlihat di portal
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
      </div>
    </AdminLayout>
  );
}
