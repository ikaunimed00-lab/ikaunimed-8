// File: resources/js/Pages/Dashboard/Editor/AlumniPost/Show.tsx
import React, { useState } from "react";
import { Head, Link, router, useForm, usePage } from "@inertiajs/react";
import { route } from "ziggy-js";
import EditorLayout from "@/layouts/EditorLayout";
import AdminLayout from "@/layouts/AdminLayout";
import { ArrowLeft, CheckCircle, XCircle, Eye } from "lucide-react";

interface AlumniPost {
  id: number;
  title: string;
  slug: string;
  content: string;
  category: string;
  status: string;
  created_at: string;
  published_at?: string;
  rejection_note?: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
}

interface Props {
  post: AlumniPost;
  categories: Record<string, string>;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "published":
      return "bg-green-100 text-green-800 border-green-300";
    case "rejected":
      return "bg-red-100 text-red-800 border-red-300";
    case "pending":
      return "bg-yellow-100 text-yellow-800 border-yellow-300";
    default:
      return "bg-gray-100 text-gray-800 border-gray-300";
  }
};

const getStatusBadge = (status: string) => {
  const labels: Record<string, string> = {
    published: "Dipublikasikan",
    rejected: "Ditolak",
    pending: "Menunggu Review",
  };
  return labels[status] || status;
};

export default function Show({ post, categories }: Props) {
  const [showRejectModal, setShowRejectModal] = useState(false);
  const { data, setData, post: submit, processing } = useForm({
    rejection_note: "",
  });

  const handleApprove = () => {
    if (confirm("Setujui dan publikasikan kabar alumni ini?")) {
      router.post(route("dashboard.editor.alumni-posts.approve", post.id), {}, {
        onSuccess: () => {
          router.visit(route("dashboard.editor.alumni-posts.moderation"));
        }
      });
    }
  };

  const handleReject = (e: React.FormEvent) => {
    e.preventDefault();
    submit(route("dashboard.editor.alumni-posts.reject", post.id), {
      onSuccess: () => {
        setShowRejectModal(false);
        router.visit(route("dashboard.editor.alumni-posts.moderation"));
      }
    });
  };

  const { auth }: any = usePage().props;
  const LayoutComponent = auth?.user?.role === "admin" ? AdminLayout : EditorLayout;

  return (
    <LayoutComponent>
      <Head title={`Review: ${post.title}`} />

      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Link
            href={route("dashboard.editor.alumni-posts.moderation")}
            className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-800 font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Moderasi
          </Link>

          <span
            className={`inline-flex px-4 py-2 text-sm font-semibold rounded-full border ${getStatusColor(
              post.status
            )}`}
          >
            {getStatusBadge(post.status)}
          </span>
        </div>

        {/* Post Content */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 bg-gradient-to-r from-purple-50 to-indigo-50 border-b">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{post.title}</h1>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <span className="font-medium">Penulis:</span>
                <span>{post.user.name}</span>
                <span className="text-gray-400">({post.user.email})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">Kategori:</span>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-semibold">
                  {categories[post.category]}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">Tanggal Submit:</span>
                <span>{new Date(post.created_at).toLocaleDateString("id-ID")}</span>
              </div>
            </div>
          </div>

          <div className="px-6 py-8">
            <div className="prose max-w-none">
              <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                {post.content}
              </div>
            </div>
          </div>

          {post.rejection_note && (
            <div className="px-6 py-4 bg-red-50 border-t border-red-200">
              <h4 className="font-semibold text-red-900 mb-2">Catatan Penolakan:</h4>
              <p className="text-sm text-red-800">{post.rejection_note}</p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        {post.status === "pending" && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Aksi Moderasi</h3>
            <div className="flex items-center gap-4">
              <button
                onClick={handleApprove}
                className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                <CheckCircle className="w-5 h-5" />
                Setujui & Publikasikan
              </button>

              <button
                onClick={() => setShowRejectModal(true)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
              >
                <XCircle className="w-5 h-5" />
                Tolak
              </button>

              {post.slug && (
                <Link
                  href={route("alumni-posts.show", post.slug)}
                  target="_blank"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  <Eye className="w-5 h-5" />
                  Preview Publik
                </Link>
              )}
            </div>
          </div>
        )}

        {post.status === "published" && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-green-800">
              ✓ Kabar alumni ini sudah dipublikasikan pada{" "}
              {post.published_at && new Date(post.published_at).toLocaleDateString("id-ID")}
            </p>
          </div>
        )}

        {post.status === "rejected" && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800">
              ✗ Kabar alumni ini telah ditolak. Penulis dapat memperbaiki dan submit ulang.
            </p>
          </div>
        )}
      </div>

      {/* Reject Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Tolak Kabar Alumni</h3>
            <form onSubmit={handleReject} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Alasan Penolakan <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={data.rejection_note}
                  onChange={(e) => setData("rejection_note", e.target.value)}
                  placeholder="Jelaskan mengapa kabar ini ditolak..."
                  rows={4}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Catatan ini akan dikirimkan ke penulis
                </p>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowRejectModal(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={processing}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:bg-red-400"
                >
                  {processing ? "Menolak..." : "Tolak Kabar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </LayoutComponent>
  );
}