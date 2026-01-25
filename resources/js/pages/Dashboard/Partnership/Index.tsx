import React from 'react';
import { Head, Link, usePage, router } from '@inertiajs/react';
import { route } from 'ziggy-js';
import AdminLayout from '@/Layouts/AdminLayout';
import EditorLayout from '@/Layouts/EditorLayout';
import { Plus, Building2, Edit, Trash2, Eye, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Index({ partnerships }: any) {
    const { auth }: any = usePage().props;
    const Layout = auth.user.role === 'admin' ? AdminLayout : EditorLayout;

    const handleDelete = (id: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus mitra ini?')) {
            router.delete(route('dashboard.partnerships.destroy', id));
        }
    };

    return (
        <Layout>
            <Head title="Kelola Kemitraan" />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Kelola Kemitraan</h1>
                        <p className="text-gray-500">
                            Manajemen data mitra kerjasama.
                        </p>
                    </div>
                    <Link href={route('dashboard.partnerships.create')}>
                        <Button className="bg-emerald-600 hover:bg-emerald-700">
                            <Plus className="w-4 h-4 mr-2" />
                            Tambah Mitra
                        </Button>
                    </Link>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <table className="w-full text-left text-sm text-gray-600">
                        <thead className="bg-gray-50 text-gray-900 font-semibold border-b">
                            <tr>
                                <th className="px-6 py-4">Nama Mitra</th>
                                <th className="px-6 py-4">Kategori</th>
                                <th className="px-6 py-4">Website</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {partnerships.data.length > 0 ? (
                                partnerships.data.map((item: any) => (
                                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center flex-shrink-0 mr-3">
                                                    {item.logo ? (
                                                        <img src={`/storage/${item.logo}`} className="w-8 h-8 object-contain" />
                                                    ) : (
                                                        <Building2 className="w-5 h-5 text-gray-400" />
                                                    )}
                                                </div>
                                                <div className="font-medium text-gray-900 line-clamp-1">{item.name}</div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-emerald-50 text-emerald-700">
                                                {item.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            {item.website ? (
                                                <a href={item.website} target="_blank" className="flex items-center text-blue-600 hover:underline">
                                                    <Globe className="w-3 h-3 mr-1" />
                                                    Link
                                                </a>
                                            ) : '-'}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                                                ${item.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                {item.is_active ? 'Aktif' : 'Non-Aktif'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right space-x-2">
                                            <a 
                                                href={route('partnerships.show', item.slug)} 
                                                target="_blank"
                                                className="inline-flex items-center p-1.5 text-gray-500 hover:text-emerald-600 transition-colors"
                                                title="Lihat"
                                            >
                                                <Eye className="w-4 h-4" />
                                            </a>
                                            <Link
                                                href={route('dashboard.partnerships.edit', item.id)}
                                                className="inline-flex items-center p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                                                title="Edit"
                                            >
                                                <Edit className="w-4 h-4" />
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(item.id)}
                                                className="inline-flex items-center p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                                                title="Hapus"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                                        Belum ada data mitra.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </Layout>
    );
}
