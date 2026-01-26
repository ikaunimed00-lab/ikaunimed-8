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
import Editor from '@/components/Editor';

export default function Edit({ partnership }: any) {
    const { auth }: any = usePage().props;
    const userRole = auth.user.role;
    const Layout = userRole === 'admin' ? AdminLayout : 
                   userRole === 'editor' ? EditorLayout : SubscriberLayout;

    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        name: partnership.name,
        website: partnership.website || '',
        category: partnership.category,
        description: partnership.description || '',
        benefit_details: partnership.benefit_details || '',
        status: partnership.status,
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
    const statuses = [
        { value: 'active', label: 'Aktif' },
        { value: 'pending', label: 'Menunggu' },
        { value: 'rejected', label: 'Ditolak' },
        { value: 'closed', label: 'Ditutup' },
    ];

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
                                    placeholder="Contoh: PT. Pertamina (Persero)"
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
                                placeholder="https://..."
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
                            <Label htmlFor="benefit_details">Detail Manfaat (untuk Alumni) <span className="text-red-500">*</span></Label>
                            <div className="prose max-w-none">
                                <Editor
                                    value={data.benefit_details}
                                    onChange={(val) => setData('benefit_details', val)}
                                />
                            </div>
                            {errors.benefit_details && <p className="text-sm text-red-600">{errors.benefit_details}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="logo">Logo Mitra (Opsional)</Label>
                            {partnership.logo && (
                                <div className="mb-2">
                                    <img 
                                        src={`/storage/${partnership.logo}`} 
                                        alt="Logo Mitra" 
                                        className="h-20 w-auto object-contain border rounded p-1"
                                    />
                                </div>
                            )}
                            <Input
                                id="logo"
                                type="file"
                                onChange={(e) => setData('logo', e.target.files ? e.target.files[0] : null)}
                                accept="image/*"
                            />
                            <p className="text-xs text-gray-500">
                                Format: JPG, PNG. Maksimal 2MB.
                            </p>
                            {errors.logo && <p className="text-sm text-red-600">{errors.logo}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="status">Status</Label>
                            {(userRole === 'admin' || userRole === 'editor') ? (
                                <select
                                    id="status"
                                    value={data.status}
                                    onChange={(e) => setData('status', e.target.value)}
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {statuses.map((s) => (
                                        <option key={s.value} value={s.value}>{s.label}</option>
                                    ))}
                                </select>
                            ) : (
                                <div className="px-3 py-2 border rounded-md bg-gray-50 text-gray-700 capitalize">
                                    {statuses.find(s => s.value === data.status)?.label || data.status}
                                </div>
                            )}
                        </div>

                        <div className="flex justify-end pt-6 border-t">
                            <Button type="submit" disabled={processing} className="bg-blue-600 hover:bg-blue-700">
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
