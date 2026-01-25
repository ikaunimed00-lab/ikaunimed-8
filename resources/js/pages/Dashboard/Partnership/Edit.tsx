import React from 'react';
import { Head, useForm, Link, usePage, router } from '@inertiajs/react';
import { route } from 'ziggy-js';
import AdminLayout from '@/Layouts/AdminLayout';
import EditorLayout from '@/Layouts/EditorLayout';
import { ArrowLeft, Save, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import Editor from '@/components/Editor';

export default function Edit({ partnership }: any) {
    const { auth }: any = usePage().props;
    const Layout = auth.user.role === 'admin' ? AdminLayout : EditorLayout;

    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        name: partnership.name,
        website: partnership.website || '',
        category: partnership.category,
        description: partnership.description || '',
        benefit_details: partnership.benefit_details || '',
        is_active: Boolean(partnership.is_active),
        logo: null as File | null,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('dashboard.partnerships.update', partnership.id));
    };

    const handleDelete = () => {
        if (confirm('Apakah Anda yakin ingin menghapus mitra ini?')) {
            router.delete(route('dashboard.partnerships.destroy', partnership.id));
        }
    };

    const categories = ['Perusahaan', 'Pemerintah', 'Universitas', 'Lainnya'];

    return (
        <Layout>
            <Head title={`Edit ${partnership.name}`} />
            
            <div className="max-w-4xl mx-auto space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <Link
                            href={route('dashboard.partnerships.index')}
                            className="text-gray-500 hover:text-gray-700 flex items-center mb-2"
                        >
                            <ArrowLeft className="w-4 h-4 mr-1" />
                            Kembali
                        </Link>
                        <h1 className="text-2xl font-bold text-gray-900">Edit Mitra</h1>
                    </div>
                    <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={handleDelete}
                    >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Hapus Mitra
                    </Button>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <form onSubmit={submit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="name">Nama Mitra <span className="text-red-500">*</span></Label>
                                <Input
                                    id="name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                />
                                {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="category">Kategori <span className="text-red-500">*</span></Label>
                                <select
                                    id="category"
                                    value={data.category}
                                    onChange={(e) => setData('category', e.target.value)}
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {categories.map((t) => (
                                        <option key={t} value={t}>{t}</option>
                                    ))}
                                </select>
                                {errors.category && <p className="text-sm text-red-600">{errors.category}</p>}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="website">Website (Opsional)</Label>
                            <Input
                                id="website"
                                type="url"
                                value={data.website}
                                onChange={(e) => setData('website', e.target.value)}
                            />
                            {errors.website && <p className="text-sm text-red-600">{errors.website}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Deskripsi Profil Mitra <span className="text-red-500">*</span></Label>
                            <div className="prose max-w-none">
                                <Editor
                                    value={data.description}
                                    onChange={(val) => setData('description', val)}
                                />
                            </div>
                            {errors.description && <p className="text-sm text-red-600">{errors.description}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="benefit_details">Detail Manfaat Kerjasama (Opsional)</Label>
                            <div className="prose max-w-none">
                                <Editor
                                    value={data.benefit_details}
                                    onChange={(val) => setData('benefit_details', val)}
                                />
                            </div>
                            {errors.benefit_details && <p className="text-sm text-red-600">{errors.benefit_details}</p>}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t pt-6">
                            <div className="space-y-2">
                                <Label htmlFor="logo">Update Logo</Label>
                                <Input
                                    id="logo"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setData('logo', e.target.files ? e.target.files[0] : null)}
                                    className="cursor-pointer"
                                />
                                {partnership.logo && (
                                    <div className="mt-2 text-xs text-gray-500">
                                        Logo saat ini: {partnership.logo}
                                    </div>
                                )}
                            </div>

                            <div className="flex items-center space-x-2 pt-8">
                                <input
                                    type="checkbox"
                                    id="is_active"
                                    checked={data.is_active}
                                    onChange={(e) => setData('is_active', e.target.checked)}
                                    className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-600"
                                />
                                <Label htmlFor="is_active" className="cursor-pointer">Aktifkan Kemitraan Ini</Label>
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
