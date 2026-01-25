// File: resources/js/Pages/Admin/News/Index.tsx
import AdminLayout from "@/layouts/AdminLayout";
import { Head, Link, router, usePage } from "@inertiajs/react";
import { route } from "ziggy-js";
import { useState } from "react";
import { ArrowLeft, FileText, Plus } from "lucide-react";

export default function Index({ news, filters }: any) {
    const { flash, auth }: any = usePage().props;
    const [searchTerm, setSearchTerm] = useState(filters?.search || "");

    function destroy(slug: string) {
        if (confirm("Hapus berita ini?")) {
            router.delete(route("admin.news.destroy", slug));
        }
    }

    return (
        <AdminLayout>
            <Head title="Kelola Berita" />

            <div className="py-8 px-4 md:px-8">
                {/* HEADER */}
                <Link
                    href={route('dashboard.admin')}
                    className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 font-semibold mb-6 transition-colors"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Kembali ke Dashboard
                </Link>

                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-3xl font-bold flex items-center gap-3">
                        <FileText className="w-6 h-6 text-orange-600" />
                        Kelola Berita
                    </h1>

                    <Link
                        href={route("admin.news.create")}
                        className="inline-flex items-center gap-2 px-5 py-3 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors shadow-sm hover:shadow-md"
                    >
                        <Plus className="w-4 h-4" />
                        Buat Berita
                    </Link>
                </div>

                {flash?.success && (
                    <div className="mb-4 p-4 bg-green-50 border border-green-300 rounded-lg text-green-800">
                        ✓ {flash.success}
                    </div>
                )}

                {/* TABLE */}
                <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                    {news.data.length === 0 ? (
                        <div className="p-12 text-center text-gray-500">
                            <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                            <p className="text-lg font-medium text-gray-900 mb-2">Belum ada berita</p>
                            <p>Klik tombol "Buat Berita" untuk menambahkan berita baru</p>
                        </div>
                    ) : (
                        <table className="w-full">
                            <thead className="bg-slate-50 border-b">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                                        Judul
                                    </th>
                                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {news.data.map((item: any) => (
                                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 text-gray-900">{item.title}</td>
                                        <td className="px-6 py-4 text-center space-x-2">
                                            <Link
                                                href={route("admin.news.edit", item.slug)}
                                                className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                                            >
                                                Edit
                                            </Link>
                                            {(auth?.user?.role === "admin" || auth?.user?.role === "editor") && (
                                                <button
                                                    onClick={() => destroy(item.slug)}
                                                    className="inline-block px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                                                >
                                                    Hapus
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}