import React from 'react';
import { Head, useForm, Link, usePage } from '@inertiajs/react';
import { route } from 'ziggy-js';
import AdminLayout from '@/Layouts/AdminLayout';
import EditorLayout from '@/Layouts/EditorLayout';
import { ArrowLeft, Save } from 'lucide-react';
import Editor from '@/components/Editor';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface StaticPage {
    id: number;
    key: string;
    title: string;
    content: string;
}

interface Props {
    page: StaticPage;
}

export default function Edit({ page }: Props) {
    const { auth }: any = usePage().props;
    const Layout = auth.user.role === 'admin' ? AdminLayout : EditorLayout;

    const { data, setData, put, processing, errors } = useForm({
        title: page.title,
        content: page.content || '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('dashboard.admin.pages.update', page.id));
    };

    return (
        <Layout>
            <Head title={`Edit ${page.title}`} />
            
            <div className="max-w-4xl mx-auto space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <Link
                            href={route('dashboard.admin.pages.index')}
                            className="text-gray-500 hover:text-gray-700 flex items-center mb-2"
                        >
                            <ArrowLeft className="w-4 h-4 mr-1" />
                            Kembali
                        </Link>
                        <h1 className="text-2xl font-bold text-gray-900">Edit Halaman: {page.title}</h1>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <form onSubmit={submit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="title">Judul Halaman</Label>
                            <Input
                                id="title"
                                type="text"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                className="w-full"
                                placeholder="Masukkan judul halaman"
                            />
                            {errors.title && (
                                <p className="text-sm text-red-600">{errors.title}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="content">Konten Halaman</Label>
                            <div className="prose max-w-none">
                                <Editor
                                    value={data.content}
                                    onChange={(val) => setData('content', val)}
                                />
                            </div>
                            {errors.content && (
                                <p className="text-sm text-red-600">{errors.content}</p>
                            )}
                            <p className="text-xs text-gray-500">
                                Gunakan editor di atas untuk memformat teks, menambahkan list, bold, italic, dll.
                            </p>
                        </div>

                        <div className="flex items-center justify-end pt-4 border-t border-gray-100">
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
