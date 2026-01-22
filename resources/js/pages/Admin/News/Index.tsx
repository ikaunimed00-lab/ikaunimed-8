import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link, router, usePage } from "@inertiajs/react";
import { route } from "ziggy-js";
import { useState } from "react";
import { Trash2, ArrowLeft, FileText, Search, Trash, Plus } from "lucide-react";

export default function Index({ news, filters }: any) {
    const { flash } = usePage().props;
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [searchTerm, setSearchTerm] = useState(filters?.search || "");

    const toggleSelectNews = (id: number) => {
        setSelectedIds(prev =>
            prev.includes(id) ? prev.filter(nid => nid !== id) : [...prev, id]
        );
    };

    const toggleSelectAll = () => {
        if (selectedIds.length === news.data.length) {
            setSelectedIds([]);
        } else {
            setSelectedIds(news.data.map((n: any) => n.id));
        }
    };

    function destroy(slug: string) {
        if (confirm("Hapus berita ini?")) {
            router.delete(route("admin.news.destroy", slug));
        }
    }

    const bulkDelete = () => {
        if (selectedIds.length === 0) return;

        if (!window.confirm(`Hapus ${selectedIds.length} berita? Tindakan ini tidak bisa dibatalkan.`)) {
            return;
        }

        selectedIds.forEach(id => {
            const newsItem = news.data.find((n: any) => n.id === id);
            if (newsItem) {
                router.delete(route("admin.news.destroy", newsItem.slug), {
                    preserveState: true,
                });
            }
        });

        setSelectedIds([]);
    };

    const handleSearch = (value: string) => {
        setSearchTerm(value);
        router.get(
            route("admin.news.index"),
            { search: value },
            { preserveState: true }
        );
    };

    return (
        <AdminLayout>
            <Head title="Kelola Berita" />

            <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/20 to-white py-8 px-4 md:px-8">
                <div className="max-w-6xl mx-auto">
                    {/* HEADER */}
                    <div className="mb-10 flex items-start justify-between">
                        <div className="flex-1">
                            {/* ✅ FIXED: ADMIN DASHBOARD */}
                            <a
                                href={route("dashboard.admin")}
                                className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 font-semibold transition-colors mb-4 group"
                            >
                                <div className="p-2 bg-white rounded-full shadow-sm group-hover:shadow-md group-hover:bg-slate-50 transition-all">
                                    <ArrowLeft className="h-4 w-4" />
                                </div>
                                Kembali ke Dashboard
                            </a>

                            <div className="flex items-center gap-4 mb-2">
                                <div className="p-3 bg-gradient-to-br from-orange-500 to-amber-600 rounded-lg shadow-lg">
                                    <FileText className="w-6 h-6 text-white" />
                                </div>
                                <h1 className="text-4xl font-extrabold text-slate-900">
                                    Kelola Berita
                                </h1>
                            </div>
                            <p className="text-slate-600 ml-16">
                                Kelola semua artikel dan berita di sistem
                            </p>
                        </div>

                        <Link
                            href={route("admin.news.create")}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#FF7E00] to-[#FF9F3E] text-white rounded-lg font-semibold hover:from-[#E67E00] hover:to-[#FF8F1F] transition-all shadow-lg hover:shadow-xl active:scale-95"
                        >
                            <Plus className="w-5 h-5" />
                            Buat Berita
                        </Link>
                    </div>

                    {/* FLASH MESSAGE */}
                    {flash?.success && (
                        <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-300 rounded-lg shadow-sm">
                            <p className="text-green-800 font-semibold">
                                ✓ {flash.success}
                            </p>
                        </div>
                    )}

                    {/* SEARCH & STATS */}
                    <div className="mb-6 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => handleSearch(e.target.value)}
                                placeholder="Cari berita..."
                                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                            />
                        </div>
                        <div className="text-slate-600 font-medium">
                            Total:{" "}
                            <span className="font-bold text-slate-900">
                                {news.data.length}
                            </span>{" "}
                            berita
                        </div>
                    </div>

                    {/* TABLE */}
                    <div className="rounded-2xl border border-slate-200 shadow-lg overflow-hidden bg-white">
                        <div className="bg-gradient-to-r from-white to-blue-50/30 px-8 py-6 border-b border-slate-200 flex justify-between items-center">
                            <div>
                                <p className="text-slate-600 text-sm font-semibold uppercase tracking-wider">
                                    Total Artikel
                                </p>
                                <p className="text-3xl font-bold text-slate-900">
                                    {news.data.length}
                                </p>
                            </div>

                            {selectedIds.length > 0 && (
                                <button
                                    onClick={bulkDelete}
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-all shadow-md hover:shadow-lg active:scale-95"
                                >
                                    <Trash className="w-4 h-4" />
                                    Hapus {selectedIds.length} Berita
                                </button>
                            )}
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-slate-50 border-b border-slate-200">
                                    <tr>
                                        <th className="text-left px-6 py-4">
                                            <input
                                                type="checkbox"
                                                checked={
                                                    selectedIds.length === news.data.length &&
                                                    news.data.length > 0
                                                }
                                                onChange={toggleSelectAll}
                                                className="rounded"
                                            />
                                        </th>
                                        <th className="text-left px-6 py-4">Judul</th>
                                        <th className="text-center px-6 py-4">Tanggal</th>
                                        <th className="text-center px-6 py-4">Aksi</th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-slate-200">
                                    {news.data.length > 0 ? (
                                        news.data.map((item: any) => (
                                            <tr key={item.id} className="hover:bg-orange-50">
                                                <td className="px-6 py-4">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedIds.includes(item.id)}
                                                        onChange={() => toggleSelectNews(item.id)}
                                                        className="rounded"
                                                    />
                                                </td>
                                                <td className="px-6 py-4">
                                                    <p className="font-semibold text-slate-900">
                                                        {item.title}
                                                    </p>
                                                    <p className="text-xs text-slate-500">
                                                        Slug: {item.slug}
                                                    </p>
                                                </td>
                                                <td className="px-6 py-4 text-center text-slate-700">
                                                    {new Date(item.created_at).toLocaleDateString("id-ID")}
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <div className="flex gap-2 justify-center">
                                                        <Link
                                                            href={route("admin.news.edit", item.slug)}
                                                            className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold"
                                                        >
                                                            Edit
                                                        </Link>
                                                        <button
                                                            onClick={() => destroy(item.slug)}
                                                            className="px-4 py-2 bg-red-600 text-white rounded-lg font-semibold"
                                                        >
                                                            Hapus
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={4} className="px-6 py-12 text-center">
                                                Tidak ada berita
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
