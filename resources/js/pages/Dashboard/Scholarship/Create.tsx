import React from 'react';
import { Head, useForm, Link, usePage } from '@inertiajs/react';
import { route } from 'ziggy-js';
import AdminLayout from '@/Layouts/AdminLayout';
import EditorLayout from '@/Layouts/EditorLayout';
import { ArrowLeft, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import Editor from '@/components/Editor';

export default function Create() {
    const { auth }: any = usePage().props;
    const Layout = auth.user.role === 'admin' ? AdminLayout : EditorLayout;

    const { data, setData, post, processing, errors } = useForm({
        title: '',
        provider: '',
        degree: 'S1',
        description: '',
        coverage_type: 'Full Funded',
        deadline: '',
        link: '',
        image: null as File | null,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('dashboard.scholarships.store'));
    };

    const degrees = ['S1', 'S2', 'S3', 'Non-Degree', 'Research'];
    const coverageTypes = ['Full Funded', 'Partial Funded', 'Self Funded'];

    return (
        <Layout>
            <Head title="Tambah Beasiswa" />
            
            <div className="max-w-4xl mx-auto space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <Link
                            href={route('dashboard.scholarships.index')}
                            className="text-gray-500 hover:text-gray-700 flex items-center mb-2"
                        >
                            <ArrowLeft className="w-4 h-4 mr-1" />
                            Kembali
                        </Link>
                        <h1 className="text-2xl font-bold text-gray-900">Tambah Beasiswa Baru</h1>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <form onSubmit={submit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="title">Nama Beasiswa <span className="text-red-500">*</span></Label>
                                <Input
                                    id="title"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    placeholder="Contoh: Beasiswa LPDP Reguler"
                                />
                                {errors.title && <p className="text-sm text-red-600">{errors.title}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="provider">Pemberi Beasiswa <span className="text-red-500">*</span></Label>
                                <Input
                                    id="provider"
                                    value={data.provider}
                                    onChange={(e) => setData('provider', e.target.value)}
                                    placeholder="Contoh: Kementerian Keuangan RI"
                                />
                                {errors.provider && <p className="text-sm text-red-600">{errors.provider}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="degree">Jenjang Studi <span className="text-red-500">*</span></Label>
                                <select
                                    id="degree"
                                    value={data.degree}
                                    onChange={(e) => setData('degree', e.target.value)}
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {degrees.map((t) => (
                                        <option key={t} value={t}>{t}</option>
                                    ))}
                                </select>
                                {errors.degree && <p className="text-sm text-red-600">{errors.degree}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="coverage_type">Tipe Pendanaan <span className="text-red-500">*</span></Label>
                                <select
                                    id="coverage_type"
                                    value={data.coverage_type}
                                    onChange={(e) => setData('coverage_type', e.target.value)}
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {coverageTypes.map((t) => (
                                        <option key={t} value={t}>{t}</option>
                                    ))}
                                </select>
                                {errors.coverage_type && <p className="text-sm text-red-600">{errors.coverage_type}</p>}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Deskripsi & Syarat <span className="text-red-500">*</span></Label>
                            <div className="prose max-w-none">
                                <Editor
                                    value={data.description}
                                    onChange={(val) => setData('description', val)}
                                />
                            </div>
                            {errors.description && <p className="text-sm text-red-600">{errors.description}</p>}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="deadline">Deadline Pendaftaran</Label>
                                <Input
                                    id="deadline"
                                    type="date"
                                    value={data.deadline}
                                    onChange={(e) => setData('deadline', e.target.value)}
                                />
                                {errors.deadline && <p className="text-sm text-red-600">{errors.deadline}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="link">Link Pendaftaran (Opsional)</Label>
                                <Input
                                    id="link"
                                    type="url"
                                    value={data.link}
                                    onChange={(e) => setData('link', e.target.value)}
                                    placeholder="https://..."
                                />
                                {errors.link && <p className="text-sm text-red-600">{errors.link}</p>}
                            </div>
                        </div>

                        <div className="space-y-2 border-t pt-6">
                            <Label htmlFor="image">Gambar / Banner (Opsional)</Label>
                            <Input
                                id="image"
                                type="file"
                                accept="image/*"
                                onChange={(e) => setData('image', e.target.files ? e.target.files[0] : null)}
                                className="cursor-pointer"
                            />
                            {errors.image && <p className="text-sm text-red-600">{errors.image}</p>}
                        </div>

                        <div className="flex items-center justify-end pt-6 border-t border-gray-100">
                            <Button
                                type="submit"
                                disabled={processing}
                                className="bg-emerald-600 hover:bg-emerald-700 text-white"
                            >
                                <Save className="w-4 h-4 mr-2" />
                                {processing ? 'Menyimpan...' : 'Simpan Beasiswa'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    );
}
