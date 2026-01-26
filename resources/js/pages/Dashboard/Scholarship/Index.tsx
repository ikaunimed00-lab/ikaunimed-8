import React from 'react';
import { Head, Link, usePage, router } from '@inertiajs/react';
import { route } from 'ziggy-js';
import AdminLayout from '@/Layouts/AdminLayout';
import EditorLayout from '@/Layouts/EditorLayout';
import SubscriberLayout from '@/Layouts/SubscriberLayout';
import { Plus, GraduationCap, Calendar, Edit, Trash2, Eye, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Index({ scholarships }: any) {
    const { auth }: any = usePage().props;
    const userRole = auth.user.role;
    const Layout = userRole === 'admin' ? AdminLayout : 
                   userRole === 'editor' ? EditorLayout : SubscriberLayout;

    const handleDelete = (id: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus beasiswa ini?')) {
            router.delete(route('dashboard.scholarships.destroy', id));
        }
    };

    const handleApprove = (id: number) => {
        if (confirm('Setujui beasiswa ini?')) {
            router.post(route('dashboard.scholarships.approve', id));
        }
    };

    const handleReject = (id: number) => {
        if (confirm('Tolak beasiswa ini?')) {
            router.post(route('dashboard.scholarships.reject', id));
        }
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'active':
                return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Active</span>;
            case 'pending':
                return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">Pending</span>;
            case 'rejected':
                return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">Rejected</span>;
            case 'closed':
                return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">Closed</span>;
            default:
                return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">{status}</span>;
        }
    };

    return (
        <Layout>
            <Head title="Kelola Beasiswa" />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Kelola Beasiswa</h1>
                        <p className="text-gray-500">
                            Manajemen informasi beasiswa untuk alumni.
                        </p>
                    </div>
                    <Link href={route('dashboard.scholarships.create')}>
                        <Button className="bg-emerald-600 hover:bg-emerald-700">
                            <Plus className="w-4 h-4 mr-2" />
                            Tambah Beasiswa
                        </Button>
                    </Link>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <table className="w-full text-left text-sm text-gray-600">
                        <thead className="bg-gray-50 text-gray-900 font-semibold border-b">
                            <tr>
                                <th className="px-6 py-4">Nama & Pemberi</th>
                                <th className="px-6 py-4">Jenjang & Tipe</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Deadline</th>
                                <th className="px-6 py-4 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {scholarships.data.length > 0 ? (
                                scholarships.data.map((item: any) => (
                                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center flex-shrink-0 mr-3">
                                                    {item.image ? (
                                                        <img src={`/storage/${item.image}`} className="w-8 h-8 object-contain" />
                                                    ) : (
                                                        <GraduationCap className="w-5 h-5 text-gray-400" />
                                                    )}
                                                </div>
                                                <div>
                                                    <div className="font-medium text-gray-900 line-clamp-1">{item.title}</div>
                                                    <div className="text-xs text-gray-500">{item.provider}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col gap-1">
                                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-50 text-blue-700 w-fit">
                                                    {item.degree}
                                                </span>
                                                <span className="text-xs text-gray-500">
                                                    {item.coverage_type}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {getStatusBadge(item.status)}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center text-xs">
                                                <Calendar className="w-3 h-3 mr-1.5" />
                                                {item.deadline ? new Date(item.deadline).toLocaleDateString('id-ID') : '-'}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right space-x-2">
                                            {(userRole === 'admin' || userRole === 'editor') && item.status === 'pending' && (
                                                <>
                                                    <button
                                                        onClick={() => handleApprove(item.id)}
                                                        className="inline-flex items-center p-1.5 text-green-600 hover:bg-green-50 rounded transition-colors"
                                                        title="Setujui"
                                                    >
                                                        <Check className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleReject(item.id)}
                                                        className="inline-flex items-center p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                                                        title="Tolak"
                                                    >
                                                        <X className="w-4 h-4" />
                                                    </button>
                                                </>
                                            )}
                                            
                                            <a 
                                                href={route('scholarships.show', item.slug)} 
                                                target="_blank"
                                                className="inline-flex items-center p-1.5 text-gray-500 hover:text-emerald-600 transition-colors"
                                                title="Lihat"
                                            >
                                                <Eye className="w-4 h-4" />
                                            </a>
                                            <Link
                                                href={route('dashboard.scholarships.edit', item.id)}
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
                                        Belum ada data beasiswa.
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
