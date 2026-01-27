import React from "react";
import { Head, useForm, Link } from "@inertiajs/react";
import { route } from "ziggy-js";
import SubscriberLayout from "@/Layouts/SubscriberLayout";

interface AlumniPost {
  id: number;
  title: string;
  content: string;
  category: string;
  status: string;
}

interface Props {
  post: AlumniPost;
  categories: Record<string, string>;
}

export default function Edit({ post, categories }: Props) {
  const { data, setData, put, processing, errors } = useForm({
    title: post.title,
    content: post.content,
    category: post.category,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    put(route("dashboard.subscriber.alumni-posts.update", post.id));
  };

  return (
    <SubscriberLayout>
      <Head title="Edit Kabar Alumni" />

      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl shadow-lg p-8 text-white">
          <h1 className="text-3xl font-bold mb-2">Edit Kabar Alumni</h1>
          <p className="text-emerald-100">
            Update kabar alumni Anda
          </p>
        </div>

        {/* Status Warning */}
        {post.status === "rejected" && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h4 className="font-medium text-red-900 mb-2">⚠️ Kabar Ditolak</h4>
            <p className="text-sm text-red-800">
              Kabar ini sebelumnya ditolak oleh moderator. Silakan perbaiki dan submit ulang.
            </p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Judul Kabar <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={data.title}
              onChange={(e) => setData("title", e.target.value)}
              placeholder="Contoh: Alumni UNIMED Raih Medali Emas Olimpiade Matematika"
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${
                errors.title ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title}</p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Kategori <span className="text-red-500">*</span>
            </label>
            <select
              value={data.category}
              onChange={(e) => setData("category", e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${
                errors.category ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Pilih Kategori</option>
              {Object.entries(categories).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="mt-1 text-sm text-red-600">{errors.category}</p>
            )}
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Konten Kabar <span className="text-red-500">*</span>
            </label>
            <textarea
              value={data.content}
              onChange={(e) => setData("content", e.target.value)}
              placeholder="Tuliskan kabar alumni Anda di sini... (minimal 50 karakter)"
              rows={10}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none ${
                errors.content ? "border-red-500" : "border-gray-300"
              }`}
            />
            <div className="flex items-center justify-between mt-2">
              <p className="text-sm text-gray-500">
                {data.content.length} karakter (minimal 50)
              </p>
              {errors.content && (
                <p className="text-sm text-red-600">{errors.content}</p>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <Link
              href={route("dashboard.subscriber.alumni-posts.index")}
              className="text-gray-600 hover:text-gray-900 font-medium"
            >
              ← Kembali
            </Link>
            <button
              type="submit"
              disabled={processing}
              className="px-6 py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium disabled:bg-emerald-400"
            >
              {processing ? "Menyimpan..." : "Update Kabar Alumni"}
            </button>
          </div>
        </form>
      </div>
    </SubscriberLayout>
  );
}