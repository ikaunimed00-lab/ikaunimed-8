import React from 'react';
import { Head, Link, usePage, router } from '@inertiajs/react';
import { route } from 'ziggy-js';
import AdminLayout from '@/Layouts/AdminLayout';
import EditorLayout from '@/Layouts/EditorLayout';
import SubscriberLayout from '@/Layouts/SubscriberLayout';
import { Plus, Briefcase, MapPin, Calendar, Edit, Trash2, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Index({ vacancies, userRole }: any) {
    const Layout = userRole === 'admin' ? AdminLayout : 
                   userRole === 'editor' ? EditorLayout : SubscriberLayout;

    const handleDelete = (id: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus lowongan ini?')) {
            router.delete(route('dashboard.jobs.destroy', id));
        }
    };

    return (
        <Layout>
            <Head title="Kelola Lowongan Kerja" />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Lowongan Kerja</h1>
                        <p className="text-gray-500">
                            Kelola informasi lowongan pekerjaan yang Anda posting.
                        </p>
                    </div>
                    <Link href={route('dashboard.jobs.create')}>
                        <Button className="bg-emerald-600 hover:bg-emerald-700">
                            <Plus className="w-4 h-4 mr-2" />
                            Buat Lowongan
                        </Button>
                    </Link>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <table className="w-full text-left text-sm text-gray-600">
                        <thead className="bg-gray-50 text-gray-900 font-semibold border-b">
                            <tr>
                                <th className="px-6 py-4">Posisi & Perusahaan</th>
                                <th className="px-6 py-4">Tipe & Lokasi</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Diposting</th>
                                <th className="px-6 py-4 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {vacancies.data.length > 0 ? (
                                vacancies.data.map((job: any) => (
                                    <tr key={job.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center flex-shrink-0 mr-3">
                                                    {job.logo ? (
                                                        <img src={`/storage/${job.logo}`} className="w-8 h-8 object-contain" />
                                                    ) : (
                                                        <Briefcase className="w-5 h-5 text-gray-400" />
                                                    )}
                                                </div>
                                                <div>
                                                    <div className="font-medium text-gray-900">{job.title}</div>
                                                    <div className="text-xs text-gray-500">{job.company}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col gap-1">
                                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-50 text-blue-700 w-fit">
                                                    {job.type}
                                                </span>
                                                <span className="flex items-center text-xs text-gray-500">
                                                    <MapPin className="w-3 h-3 mr-1" />
                                                    {job.location}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                                                ${job.status === 'active' ? 'bg-green-100 text-green-800' : 
                                                  job.status === 'closed' ? 'bg-red-100 text-red-800' : 
                                                  'bg-yellow-100 text-yellow-800'}`}>
                                                {job.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center text-xs">
                                                <Calendar className="w-3 h-3 mr-1.5" />
                                                {new Date(job.created_at).toLocaleDateString('id-ID')}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right space-x-2">
                                            <a 
                                                href={route('jobs.show', job.slug)} 
                                                target="_blank"
                                                className="inline-flex items-center p-1.5 text-gray-500 hover:text-emerald-600 transition-colors"
                                                title="Lihat"
                                            >
                                                <Eye className="w-4 h-4" />
                                            </a>
                                            <Link
                                                href={route('dashboard.jobs.edit', job.id)}
                                                className="inline-flex items-center p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                                                title="Edit"
                                            >
                                                <Edit className="w-4 h-4" />
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(job.id)}
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
                                        Belum ada lowongan kerja yang dibuat.
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
