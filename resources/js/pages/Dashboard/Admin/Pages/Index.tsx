import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import { route } from 'ziggy-js';
import AdminLayout from '@/Layouts/AdminLayout';
import EditorLayout from '@/Layouts/EditorLayout';
import { Edit, FileText } from 'lucide-react';

interface StaticPage {
    id: number;
    key: string;
    title: string;
    updated_at: string;
}

interface Props {
    pages: StaticPage[];
}

export default function Index({ pages }: Props) {
    const { auth }: any = usePage().props;
    const Layout = auth.user.role === 'admin' ? AdminLayout : EditorLayout;

    return (
        <Layout>
            <Head title="Kelola Halaman Statis" />
            
            <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Manajemen Halaman</h1>
                    <p className="text-gray-500">
                        Kelola konten halaman statis seperti Tentang Kami, Struktur Organisasi, dan Visi Misi.
                    </p>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <table className="w-full text-left text-sm text-gray-600">
                        <thead className="bg-gray-50 text-gray-900 font-semibold border-b">
                            <tr>
                                <th className="px-6 py-4">Nama Halaman</th>
                                <th className="px-6 py-4">Key</th>
                                <th className="px-6 py-4">Terakhir Update</th>
                                <th className="px-6 py-4 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {pages.map((page) => (
                                <tr key={page.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center font-medium text-gray-900">
                                            <FileText className="w-4 h-4 mr-2 text-emerald-600" />
                                            {page.title}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <code className="bg-gray-100 px-2 py-1 rounded text-xs">{page.key}</code>
                                    </td>
                                    <td className="px-6 py-4">
                                        {new Date(page.updated_at).toLocaleDateString('id-ID', {
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric'
                                        })}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <Link
                                            href={route('dashboard.admin.pages.edit', page.id)}
                                            className="inline-flex items-center px-3 py-1.5 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 rounded-md transition-colors text-xs font-medium border border-emerald-200"
                                        >
                                            <Edit className="w-3 h-3 mr-1.5" />
                                            Edit Konten
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </Layout>
    );
}
