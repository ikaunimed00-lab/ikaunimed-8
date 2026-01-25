import React from 'react';
import { Head, useForm, Link, usePage, router } from '@inertiajs/react';
import { route } from 'ziggy-js';
import AdminLayout from '@/Layouts/AdminLayout';
import EditorLayout from '@/Layouts/EditorLayout';
import SubscriberLayout from '@/Layouts/SubscriberLayout';
import { ArrowLeft, Save, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Editor from '@/components/Editor';

export default function Edit({ job }: any) {
    const { auth }: any = usePage().props;
    const userRole = auth.user.role;
    const Layout = userRole === 'admin' ? AdminLayout : 
                   userRole === 'editor' ? EditorLayout : SubscriberLayout;

    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        title: job.title,
        company: job.company,
        location: job.location,
        type: job.type,
        description: job.description,
        requirements: job.requirements || '',
        salary_range: job.salary_range || '',
        apply_link: job.apply_link || '',
        apply_email: job.apply_email || '',
        closing_date: job.closing_date || '',
        status: job.status,
        logo: null as File | null,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('dashboard.jobs.update', job.id));
    };

    const handleDelete = () => {
        if (confirm('Apakah Anda yakin ingin menghapus lowongan ini?')) {
            router.delete(route('dashboard.jobs.destroy', job.id));
        }
    };

    const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Freelance', 'Internship', 'Remote'];

    return (
        <Layout>
            <Head title={`Edit ${job.title}`} />
            
            <div className="max-w-4xl mx-auto space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <Link
                            href={route('dashboard.jobs.index')}
                            className="text-gray-500 hover:text-gray-700 flex items-center mb-2"
                        >
                            <ArrowLeft className="w-4 h-4 mr-1" />
                            Kembali
                        </Link>
                        <h1 className="text-2xl font-bold text-gray-900">Edit Lowongan</h1>
                    </div>
                    <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={handleDelete}
                    >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Hapus Lowongan
                    </Button>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <form onSubmit={submit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="title">Posisi / Judul Pekerjaan <span className="text-red-500">*</span></Label>
                                <Input
                                    id="title"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                />
                                {errors.title && <p className="text-sm text-red-600">{errors.title}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="company">Nama Perusahaan <span className="text-red-500">*</span></Label>
                                <Input
                                    id="company"
                                    value={data.company}
                                    onChange={(e) => setData('company', e.target.value)}
                                />
                                {errors.company && <p className="text-sm text-red-600">{errors.company}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="location">Lokasi <span className="text-red-500">*</span></Label>
                                <Input
                                    id="location"
                                    value={data.location}
                                    onChange={(e) => setData('location', e.target.value)}
                                />
                                {errors.location && <p className="text-sm text-red-600">{errors.location}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="type">Tipe Pekerjaan <span className="text-red-500">*</span></Label>
                                <select
                                    id="type"
                                    value={data.type}
                                    onChange={(e) => setData('type', e.target.value)}
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {jobTypes.map((t) => (
                                        <option key={t} value={t}>{t}</option>
                                    ))}
                                </select>
                                {errors.type && <p className="text-sm text-red-600">{errors.type}</p>}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Deskripsi Pekerjaan <span className="text-red-500">*</span></Label>
                            <div className="prose max-w-none">
                                <Editor
                                    value={data.description}
                                    onChange={(val) => setData('description', val)}
                                />
                            </div>
                            {errors.description && <p className="text-sm text-red-600">{errors.description}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="requirements">Kualifikasi / Persyaratan</Label>
                            <div className="prose max-w-none">
                                <Editor
                                    value={data.requirements}
                                    onChange={(val) => setData('requirements', val)}
                                />
                            </div>
                            {errors.requirements && <p className="text-sm text-red-600">{errors.requirements}</p>}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="salary_range">Kisaran Gaji</Label>
                                <Input
                                    id="salary_range"
                                    value={data.salary_range}
                                    onChange={(e) => setData('salary_range', e.target.value)}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="closing_date">Batas Akhir Lamaran</Label>
                                <Input
                                    id="closing_date"
                                    type="date"
                                    value={data.closing_date}
                                    onChange={(e) => setData('closing_date', e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t pt-6">
                            <div className="space-y-2">
                                <Label htmlFor="apply_link">Link Pendaftaran</Label>
                                <Input
                                    id="apply_link"
                                    type="url"
                                    value={data.apply_link}
                                    onChange={(e) => setData('apply_link', e.target.value)}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="apply_email">Email Pendaftaran</Label>
                                <Input
                                    id="apply_email"
                                    type="email"
                                    value={data.apply_email}
                                    onChange={(e) => setData('apply_email', e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t pt-6">
                            <div className="space-y-2">
                                <Label htmlFor="status">Status Publikasi</Label>
                                <select
                                    id="status"
                                    value={data.status}
                                    onChange={(e) => setData('status', e.target.value)}
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    <option value="active">Active (Tayang)</option>
                                    <option value="pending">Pending (Menunggu Moderasi)</option>
                                    <option value="closed">Closed (Ditutup)</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="logo">Update Logo Perusahaan</Label>
                                <Input
                                    id="logo"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setData('logo', e.target.files ? e.target.files[0] : null)}
                                    className="cursor-pointer"
                                />
                                {job.logo && (
                                    <div className="mt-2 text-xs text-gray-500">
                                        Logo saat ini: {job.logo}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center justify-end pt-6 border-t border-gray-100">
                            <Button
                                type="submit"
                                disabled={processing}
                                className="bg-emerald-600 hover:bg-emerald-700 text-white"
                            >
                                <Save className="w-4 h-4 mr-2" />
                                {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    );
}
