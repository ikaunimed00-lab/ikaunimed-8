import React, { useState } from "react";
import { Link, router } from "@inertiajs/react";
import { route } from "ziggy-js";
import WriterLayout from "@/Layouts/WriterLayout";
import { Search, Plus, Edit } from "lucide-react";

interface Article {
  id: number;
  title: string;
  slug: string;
  status: string;
  created_at: string;
  published_at?: string;
  view_count: number;
  categories: any[];
  tags: any[];
}

interface WriterDashboardProps {
  user: any;
  articles: {
    data: Article[];
    links?: any;
    meta?: any;
  };
  notifications: any[];
  stats: Record<string, number>;
  filters?: {
    search?: string;
  };
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "published": return "bg-green-100 text-green-800 border-green-300";
    case "pending": return "bg-yellow-100 text-yellow-800 border-yellow-300";
    case "draft": return "bg-gray-100 text-gray-800 border-gray-300";
    default: return "bg-blue-100 text-blue-800 border-blue-300";
  }
};

const getStatusBadge = (status: string) => {
  const labels: Record<string, string> = {
    published: "Terbit",
    pending: "Menunggu Review",
    draft: "Draft",
  };
  return labels[status] || status;
};

export default function WriterDashboard({
  user,
  articles,
  notifications,
  stats,
  filters,
}: WriterDashboardProps) {
  const [searchTerm, setSearchTerm] = useState(filters?.search || "");
  const hasPagination = articles?.meta?.last_page && articles?.links && articles.meta.last_page > 1;

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    router.get(
      route("dashboard.writer"),
      { search: value },
      { preserveState: true, preserveScroll: true }
    );
  };

  return (
    <WriterLayout>
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-indigo-500 to-blue-600 rounded-lg shadow-lg p-8 text-white mb-8">
        <h2 className="text-3xl font-bold mb-2">Selamat Datang, {user.name}!</h2>
        <p className="text-indigo-100 mb-6">
          Sebagai Writer, Anda dapat membuat dan submit artikel baru untuk
          direview oleh Editor atau Admin sebelum dipublikasikan. Total artikel
          yang telah dibuat: <span className="font-bold">{stats?.total_articles || 0}</span>
        </p>
        <Link
          href={route("admin.news.create")}
          className="inline-block bg-white text-indigo-600 px-6 py-2 rounded-lg font-semibold hover:bg-indigo-50 transition-colors"
        >
          + Buat Artikel Baru
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg p-6 text-white shadow-lg">
          <h3 className="text-sm font-medium opacity-90">Draft</h3>
          <p className="text-3xl font-bold mt-2">{stats?.draft || 0}</p>
        </div>
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-6 text-white shadow-lg">
          <h3 className="text-sm font-medium opacity-90">Pending Review</h3>
          <p className="text-3xl font-bold mt-2">{stats?.pending || 0}</p>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-6 text-white shadow-lg">
          <h3 className="text-sm font-medium opacity-90">Terbit</h3>
          <p className="text-3xl font-bold mt-2">{stats?.published || 0}</p>
        </div>
      </div>

      {/* Search & Create Button */}
      <div className="mb-6 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Cari artikel saya..."
            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
          />
        </div>
        <Link
          href={route("admin.news.create")}
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-indigo-500 to-blue-600 text-white rounded-lg font-semibold hover:from-indigo-600 hover:to-blue-700 transition-all shadow-md hover:shadow-lg"
        >
          <Plus className="w-5 h-5" />
          Buat Artikel Baru
        </Link>
      </div>

      {/* Articles List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-white to-indigo-50/30">
          <h3 className="text-lg font-semibold text-gray-900">Artikel Saya</h3>
          <p className="text-sm text-gray-600 mt-1">
            Total: {articles?.meta?.total || 0} artikel
          </p>
        </div>

        {!articles?.data || articles.data.length === 0 ? (
          <div className="p-8 text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C6.5 6.253 2 10.998 2 17s4.5 10.747 10 10.747c5.5 0 10-4.998 10-10.747S17.5 6.253 12 6.253z"
              />
            </svg>
            <h4 className="mt-2 text-lg font-medium text-gray-900">
              Belum ada artikel
            </h4>
            <p className="text-gray-500 mt-1">
              Mulai membuat artikel pertama Anda sekarang
            </p>
            <Link
              href={route("admin.news.create")}
              className="inline-block mt-4 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Buat Artikel Baru
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                    Judul Artikel
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                    Views
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                    Dibuat
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {articles.data.map((article) => (
                  <tr key={article.id} className="hover:bg-indigo-50/30">
                    <td className="px-6 py-4">
                      <div className="max-w-xs">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {article.title}
                        </p>
                        {article.categories.length > 0 && (
                          <div className="flex gap-1 mt-1 flex-wrap">
                            {article.categories.slice(0, 2).map((cat: any) => (
                              <span
                                key={cat.id}
                                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                              >
                                {cat.name}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full border ${getStatusColor(
                          article.status
                        )}`}
                      >
                        {getStatusBadge(article.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {article.view_count}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {new Date(article.created_at).toLocaleDateString(
                        "id-ID"
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <Link
                          href={route("admin.news.edit", article.slug)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
                        >
                          <Edit className="w-3.5 h-3.5" />
                          Edit
                        </Link>
                        {article.status === "pending" && (
                          <span className="text-yellow-600 text-xs bg-yellow-50 px-2 py-1 rounded border border-yellow-200">
                            Menunggu review
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {hasPagination && (
          <div className="px-6 py-4 border-t border-gray-200 flex justify-center gap-2">
            {articles.links.map((link: any, index: number) => (
              <Link
                key={link.url || `link-${index}`}
                href={link.url || "#"}
                className={`px-3 py-1 rounded border transition-colors ${
                  link.active
                    ? "bg-indigo-600 text-white border-indigo-600"
                    : "border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
                dangerouslySetInnerHTML={{ __html: link.label }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Writing Tips */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mt-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Tips Penulisan
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-2">
              📝 Gunakan Judul Menarik
            </h4>
            <p className="text-sm text-gray-600">
              Judul yang menarik akan meningkatkan engagement pembaca
            </p>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-2">
              🏷️ Tambahkan Kategori & Tag
            </h4>
            <p className="text-sm text-gray-600">
              Kategori dan tag membantu pembaca menemukan artikel Anda
            </p>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-2">
              ⏳ Review Sebelum Submit
            </h4>
            <p className="text-sm text-gray-600">
              Periksa kembali sebelum submit untuk review editor
            </p>
          </div>
        </div>
      </div>
    </WriterLayout>
  );
}