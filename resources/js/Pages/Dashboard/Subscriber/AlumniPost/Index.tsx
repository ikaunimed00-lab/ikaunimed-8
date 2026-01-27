// File: resources/js/Pages/Dashboard/Subscriber/AlumniPost/Index.tsx
import React from "react";
import { Head, Link, router } from "@inertiajs/react";
import { route } from "ziggy-js";
import SubscriberLayout from "@/layouts/SubscriberLayout";
import { MessageCircle, Plus, Edit, Trash2, Eye } from "lucide-react";

interface AlumniPost {
  id: number;
  title: string;
  slug: string;
  category: string;
  status: string;
  created_at: string;
  published_at?: string;
  rejection_note?: string;
}

interface Props {
  posts: {
    data: AlumniPost[];
    links?: any[];
    meta?: {
      current_page: number;
      last_page: number;
      total: number;
    };
  };
  stats: {
    total: number;
    pending: number;
    published: number;
    rejected: number;
  };
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

const handleDelete = (id: number) => {
  if (confirm("Yakin ingin menghapus kabar alumni ini?")) {
    router.delete(route("dashboard.subscriber.alumni-posts.destroy", id));
  }
};

export default function Index({ posts, stats }: Props) {
  return (
    <SubscriberLayout>
      <Head title="Kabar Alumni Saya" />

      <div className="space-y-6">
        {/* HEADER */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl shadow-lg p-8 text-white">
          <div className="flex items-center gap-3 mb-4">
            <MessageCircle className="w-8 h-8" />
            <h1 className="text-3xl font-bold">Kabar Alumni Saya</h1>
          </div>
          <p className="text-emerald-100 mb-6">
            Kelola kabar alumni yang telah Anda submit
          </p>
          <Link
            href={route("dashboard.subscriber.alumni-posts.create")}
            className="inline-flex items-center gap-2 bg-white text-emerald-600 px-6 py-2.5 rounded-lg font-semibold hover:bg-emerald-50 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Buat Kabar Baru
          </Link>
        </div>

        {/* STATS CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatCard label="Total" value={stats.total} />
          <StatCard label="Pending" value={stats.pending} color="text-yellow-600" />
          <StatCard label="Published" value={stats.published} color="text-green-600" />
          <StatCard label="Rejected" value={stats.rejected} color="text-red-600" />
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <div className="px-6 py-4 border-b bg-gray-50">
            <h3 className="font-semibold text-gray-900">Daftar Kabar Alumni</h3>
            <p className="text-sm text-gray-600">
              Total: {posts?.meta?.total ?? posts?.data?.length ?? 0}
            </p>
          </div>

          {!posts?.data || posts.data.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Judul
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Tanggal
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {posts.data.map((post) => (
                    <tr key={post.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <p className="font-medium text-gray-900">{post.title}</p>
                        {post.rejection_note && (
                          <p className="text-xs text-red-600 mt-1">
                            💬 {post.rejection_note}
                          </p>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${getStatusColor(post.status)}`}>
                          {getStatusBadge(post.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(post.created_at).toLocaleDateString("id-ID")}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <div className="flex items-center gap-3">
                          {post.status === "pending" && (
                            <>
                              <Link
                                href={route("dashboard.subscriber.alumni-posts.edit", post.id)}
                                className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                              >
                                <Edit className="w-4 h-4" />
                                Edit
                              </Link>
                              <button
                                onClick={() => handleDelete(post.id)}
                                className="text-red-600 hover:text-red-800 flex items-center gap-1"
                              >
                                <Trash2 className="w-4 h-4" />
                                Hapus
                              </button>
                            </>
                          )}
                          {post.status === "published" && (
                            <Link
                              href={route("alumni-posts.show", post.slug)}
                              className="text-emerald-600 hover:text-emerald-800 flex items-center gap-1"
                            >
                              <Eye className="w-4 h-4" />
                              Lihat
                            </Link>
                          )}
                          {post.status === "rejected" && (
                            <Link
                              href={route("dashboard.subscriber.alumni-posts.edit", post.id)}
                              className="text-orange-600 hover:text-orange-800 flex items-center gap-1"
                            >
                              <Edit className="w-4 h-4" />
                              Edit Ulang
                            </Link>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* PAGINATION */}
          {posts?.meta && posts.meta.last_page > 1 && posts.links && (
            <div className="px-6 py-4 border-t bg-gray-50 flex justify-center gap-2">
              {posts.links.map((link: any, i: number) => (
                <Link
                  key={i}
                  href={link.url || "#"}
                  className={`px-4 py-2 border rounded-lg transition-colors ${
                    link.active
                      ? "bg-emerald-600 text-white border-emerald-600"
                      : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                  dangerouslySetInnerHTML={{ __html: link.label }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </SubscriberLayout>
  );
}

function StatCard({ label, value, color = "text-gray-900" }: any) {
  return (
    <div className="bg-white p-6 border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow">
      <p className="text-sm text-gray-600 mb-1">{label}</p>
      <p className={`text-3xl font-bold ${color}`}>{value}</p>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="p-12 text-center">
      <MessageCircle className="mx-auto h-12 w-12 text-gray-400 mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        Belum ada kabar alumni
      </h3>
      <p className="text-gray-500 mb-6">
        Mulai berbagi cerita dan prestasi Anda dengan komunitas alumni
      </p>
      <Link
        href={route("dashboard.subscriber.alumni-posts.create")}
        className="inline-flex items-center gap-2 bg-emerald-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
      >
        <Plus className="w-5 h-5" />
        Buat Kabar Pertama
      </Link>
    </div>
  );
}