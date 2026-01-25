import React, { useState } from "react";
import { Link, router } from "@inertiajs/react";
import { route } from "ziggy-js";
import EditorLayout from "@/Layouts/EditorLayout";
import { Search, Plus, Edit, Trash2 } from "lucide-react";

interface NewsItem {
  id: number;
  title: string;
  slug: string;
  status: string;
  created_at: string;
  published_at?: string;
  view_count: number;
  categories: any[];
  tags: any[];
  author?: any;
}

interface EditorDashboardProps {
  user: any;
  news: {
    data: NewsItem[];
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
    published: "Dipublikasikan",
    pending: "Menunggu Review",
    draft: "Draft",
  };
  return labels[status] || status;
};

export default function EditorDashboard({
  user,
  news,
  notifications,
  stats,
  filters,
}: EditorDashboardProps) {
  const [searchTerm, setSearchTerm] = useState(filters?.search || "");
  const hasPagination = news?.meta?.last_page && news?.links && news.meta.last_page > 1;

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    router.get(
      route("dashboard.editor"),
      { search: value },
      { preserveState: true, preserveScroll: true }
    );
  };

  const handleDelete = (slug: string) => {
    if (confirm("Hapus artikel ini?")) {
      router.delete(route("admin.news.destroy", slug), {
        preserveState: true,
        onSuccess: () => {
          // Refresh page after delete
          router.reload({ only: ['news', 'stats'] });
        }
      });
    }
  };

  return (
    <EditorLayout>
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl shadow-lg p-8 text-white mb-8">
        <h1 className="text-3xl font-bold mb-2">Dashboard Editor</h1>
        <p className="text-green-100">Selamat datang, {user.name}! Kelola dan publikasikan konten berkualitas.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Draft</p>
              <p className="text-2xl font-bold text-gray-900">{stats?.draft || 0}</p>
            </div>
            <div className="h-12 w-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-blue-600">{stats?.pending || 0}</p>
            </div>
            <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Published</p>
              <p className="text-2xl font-bold text-green-600">{stats?.published || 0}</p>
            </div>
            <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Artikel</p>
              <p className="text-2xl font-bold text-purple-600">{stats?.total_articles || 0}</p>
            </div>
            <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
          </div>
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
            placeholder="Cari artikel..."
            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
          />
        </div>
        <Link
          href={route("admin.news.create")}
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-semibold hover:from-green-600 hover:to-emerald-700 transition-all shadow-md hover:shadow-lg"
        >
          <Plus className="w-5 h-5" />
          Buat Konten Baru
        </Link>
      </div>

      {/* News List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-white to-green-50/30">
          <h3 className="text-lg font-semibold text-gray-900">Daftar Konten & Berita</h3>
          <p className="text-sm text-gray-600 mt-1">Total: {news?.meta?.total || 0} konten</p>
        </div>

        {!news?.data || news.data.length === 0 ? (
          <div className="p-8 text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
            <h4 className="mt-2 text-lg font-medium text-gray-900">Belum ada konten</h4>
            <p className="text-gray-500 mt-1">Mulai membuat konten baru sekarang</p>
            <Link
              href={route("admin.news.create")}
              className="inline-block mt-4 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              Buat Konten
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Judul</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Penulis</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Views</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Tanggal</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase">Aksi</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {news.data.map((newsItem) => (
                  <tr key={newsItem.id} className="hover:bg-green-50/30">
                    <td className="px-6 py-4">
                      <div className="max-w-xs">
                        <p className="text-sm font-medium text-gray-900 truncate">{newsItem.title}</p>
                        {newsItem.categories.length > 0 && (
                          <div className="flex gap-1 mt-1 flex-wrap">
                            {newsItem.categories.slice(0, 2).map((cat: any) => (
                              <span key={cat.id} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                {cat.name}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full border ${getStatusColor(newsItem.status)}`}>
                        {getStatusBadge(newsItem.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {newsItem.author?.name || 'N/A'}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">{newsItem.view_count}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {new Date(newsItem.created_at).toLocaleDateString("id-ID")}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <Link
                          href={route("admin.news.edit", newsItem.slug)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                        >
                          <Edit className="w-3.5 h-3.5" />
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(newsItem.slug)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          Hapus
                        </button>
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
            {news.links.map((link: any, index: number) => (
              <Link
                key={link.url || `link-${index}`}
                href={link.url || "#"}
                className={`px-3 py-1 rounded border transition-colors ${
                  link.active ? "bg-green-600 text-white border-green-600" : "border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
                dangerouslySetInnerHTML={{ __html: link.label }}
              />
            ))}
          </div>
        )}
      </div>
    </EditorLayout>
  );
}