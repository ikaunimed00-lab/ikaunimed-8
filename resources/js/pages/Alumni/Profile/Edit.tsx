import { Head, Link, usePage } from '@inertiajs/react';
import { Form } from '@inertiajs/react';
import { route } from 'ziggy-js';
import {
    GraduationCap,
    User,
    Briefcase,
    Info,
} from 'lucide-react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { DashboardLayout } from '@/components/DashboardLayout';

interface ProfileEditProps {
    user: any;
    notifications: any[];
    stats?: Record<string, number>;
}

export default function AlumniProfileEdit({ 
    user, 
    notifications = [], 
    stats = {} 
}: ProfileEditProps) {
    const { errors } = usePage().props;

    return (
        <DashboardLayout 
            user={user} 
            notifications={notifications} 
            title="Edit Profil Alumni"
            stats={stats}
        >
            <Head title="Edit Profil Alumni" />

            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
                {/* Header dengan gradient */}
                <div className="bg-gradient-to-r from-[#00A69D] to-[#00897B] p-8 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
                    <div className="relative z-10">
                        <h2 className="text-2xl font-bold mb-2">Informasi Alumni</h2>
                        <p className="text-teal-50/90 text-sm">
                            Lengkapi informasi profil untuk mengakses semua layanan IKA UNIMED
                        </p>
                    </div>
                </div>

                {/* Form Content */}
                <div className="p-8 md:p-12">
                    <Form
                        method="post"
                        action={route('profile.update')}
                        className="space-y-12"
                    >
                        {({ processing, errors: formErrors }) => (
                            <>
                                {/* SEKSI 1: IDENTITAS PRIBADI */}
                                <section>
                                            <div className="flex items-center gap-3 mb-6">
                                                <div className="p-3 bg-blue-50 rounded-lg">
                                                    <User className="h-5 w-5 text-blue-600" />
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="text-lg font-bold text-slate-900">Identitas Pribadi</h3>
                                                    <p className="text-sm text-slate-500">Data diri sesuai KTP/Paspor</p>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-blue-50/40 p-6 rounded-2xl border border-blue-100">
                                                {/* Nama Lengkap */}
                                                <div className="lg:col-span-2 grid gap-2">
                                                    <Label htmlFor="name" className="font-bold text-slate-700">
                                                        Nama Lengkap & Gelar
                                                    </Label>
                                                    <Input
                                                        id="name"
                                                        name="name"
                                                        type="text"
                                                        defaultValue={user?.name || ''}
                                                        placeholder="Contoh: Prof. Dr. Budi Santoso, M.Pd"
                                                        className="focus:ring-blue-500 border-slate-200"
                                                        required
                                                    />
                                                    <InputError message={formErrors.name} className="text-xs" />
                                                </div>

                                                {/* WhatsApp */}
                                                <div className="grid gap-2">
                                                    <Label htmlFor="wa" className="font-bold text-slate-700">
                                                        WhatsApp
                                                    </Label>
                                                    <Input
                                                        id="wa"
                                                        name="wa"
                                                        type="tel"
                                                        defaultValue={user?.wa || ''}
                                                        placeholder="0812xxxxxx"
                                                        className="focus:ring-blue-500 border-slate-200"
                                                        required
                                                    />
                                                    <InputError message={formErrors.wa} className="text-xs" />
                                                </div>

                                                {/* NIK */}
                                                <div className="grid gap-2">
                                                    <Label htmlFor="nik" className="font-bold text-slate-700">
                                                        NIK (Sesuai KTP)
                                                    </Label>
                                                    <Input
                                                        id="nik"
                                                        name="nik"
                                                        type="text"
                                                        defaultValue={user?.nik || ''}
                                                        placeholder="16 Digit NIK"
                                                        maxLength={16}
                                                        pattern="[0-9]{16}"
                                                        className="focus:ring-blue-500 border-slate-200"
                                                        required
                                                    />
                                                    <InputError message={formErrors.nik} className="text-xs" />
                                                </div>

                                                {/* Tempat Lahir */}
                                                <div className="grid gap-2">
                                                    <Label htmlFor="tempat_lahir" className="font-bold text-slate-700">
                                                        Tempat Lahir
                                                    </Label>
                                                    <Input
                                                        id="tempat_lahir"
                                                        name="tempat_lahir"
                                                        type="text"
                                                        defaultValue={user?.tempat_lahir || ''}
                                                        placeholder="Contoh: Medan"
                                                        className="focus:ring-blue-500 border-slate-200"
                                                        required
                                                    />
                                                    <InputError message={formErrors.tempat_lahir} className="text-xs" />
                                                </div>

                                                {/* Tanggal Lahir */}
                                                <div className="grid gap-2">
                                                    <Label htmlFor="tanggal_lahir" className="font-bold text-slate-700">
                                                        Tanggal Lahir
                                                    </Label>
                                                    <Input
                                                        id="tanggal_lahir"
                                                        name="tanggal_lahir"
                                                        type="date"
                                                        defaultValue={user?.tanggal_lahir || ''}
                                                        className="focus:ring-blue-500 border-slate-200"
                                                        required
                                                    />
                                                    <InputError message={formErrors.tanggal_lahir} className="text-xs" />
                                                </div>

                                                {/* Alamat Lengkap */}
                                                <div className="lg:col-span-3 grid gap-2">
                                                    <Label htmlFor="alamat_lengkap" className="font-bold text-slate-700">
                                                        Alamat Lengkap Domisili
                                                    </Label>
                                                    <Input
                                                        id="alamat_lengkap"
                                                        name="alamat_lengkap"
                                                        type="text"
                                                        defaultValue={user?.alamat_lengkap || ''}
                                                        placeholder="Jl. Contoh No. 123, Kota, Provinsi"
                                                        className="focus:ring-blue-500 border-slate-200"
                                                        required
                                                    />
                                                    <InputError message={formErrors.alamat_lengkap} className="text-xs" />
                                                </div>
                                            </div>
                                        </section>

                                        {/* SEKSI 2: RIWAYAT PENDIDIKAN S1 */}
                                        <section>
                                            <div className="flex items-center gap-3 mb-6">
                                                <div className="p-3 bg-teal-50 rounded-lg">
                                                    <GraduationCap className="h-5 w-5 text-teal-600" />
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="text-lg font-bold text-slate-900">Pendidikan S1 UNIMED</h3>
                                                    <p className="text-sm text-slate-500">Informasi pendidikan di UNIMED</p>
                                                </div>
                                            </div>

                                            <div className="bg-teal-50/40 p-6 rounded-2xl border border-teal-100 grid grid-cols-1 md:grid-cols-2 gap-6">
                                                {/* Fakultas */}
                                                <div className="grid gap-2">
                                                    <Label htmlFor="s1_fakultas" className="font-bold text-slate-700">
                                                        Fakultas
                                                    </Label>
                                                    <Input
                                                        id="s1_fakultas"
                                                        name="s1_fakultas"
                                                        type="text"
                                                        defaultValue={user?.s1_fakultas || ''}
                                                        placeholder="Contoh: Fakultas Ilmu Pendidikan"
                                                        className="focus:ring-teal-500 border-slate-200"
                                                        required
                                                    />
                                                    <InputError message={formErrors.s1_fakultas} className="text-xs" />
                                                </div>

                                                {/* Program Studi */}
                                                <div className="grid gap-2">
                                                    <Label htmlFor="s1_prodi" className="font-bold text-slate-700">
                                                        Program Studi
                                                    </Label>
                                                    <Input
                                                        id="s1_prodi"
                                                        name="s1_prodi"
                                                        type="text"
                                                        defaultValue={user?.s1_prodi || ''}
                                                        placeholder="Contoh: Pendidikan Matematika"
                                                        className="focus:ring-teal-500 border-slate-200"
                                                        required
                                                    />
                                                    <InputError message={formErrors.s1_prodi} className="text-xs" />
                                                </div>

                                                {/* Tahun Masuk */}
                                                <div className="grid gap-2">
                                                    <Label htmlFor="s1_tahun_masuk" className="font-bold text-slate-700">
                                                        Tahun Masuk
                                                    </Label>
                                                    <Input
                                                        id="s1_tahun_masuk"
                                                        name="s1_tahun_masuk"
                                                        type="number"
                                                        defaultValue={user?.s1_tahun_masuk || ''}
                                                        placeholder="2015"
                                                        min={1990}
                                                        max={new Date().getFullYear()}
                                                        className="focus:ring-teal-500 border-slate-200"
                                                        required
                                                    />
                                                    <InputError message={formErrors.s1_tahun_masuk} className="text-xs" />
                                                </div>

                                                {/* Tahun Tamat */}
                                                <div className="grid gap-2">
                                                    <Label htmlFor="s1_tahun_tamat" className="font-bold text-slate-700">
                                                        Tahun Tamat
                                                    </Label>
                                                    <Input
                                                        id="s1_tahun_tamat"
                                                        name="s1_tahun_tamat"
                                                        type="number"
                                                        defaultValue={user?.s1_tahun_tamat || ''}
                                                        placeholder="2019"
                                                        min={1990}
                                                        max={new Date().getFullYear()}
                                                        className="focus:ring-teal-500 border-slate-200"
                                                        required
                                                    />
                                                    <InputError message={formErrors.s1_tahun_tamat} className="text-xs" />
                                                </div>
                                            </div>
                                        </section>

                                        {/* SEKSI 3: PENDIDIKAN LANJUTAN (S2/S3) - OPSIONAL */}
                                        <section>
                                            <div className="flex items-center gap-3 mb-6">
                                                <div className="p-3 bg-amber-50 rounded-lg">
                                                    <Briefcase className="h-5 w-5 text-amber-600" />
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="text-lg font-bold text-slate-900">Pendidikan Lanjutan</h3>
                                                    <p className="text-sm text-slate-500">S2/S3 (Opsional) - Abaikan jika tidak ada</p>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                {/* KOLOM S2 */}
                                                <div className="space-y-4 p-6 border-2 border-dashed border-amber-200 rounded-xl bg-amber-50/30">
                                                    <h4 className="font-bold text-amber-700 text-sm uppercase tracking-wider">Program S2</h4>
                                                    <div className="grid gap-4">
                                                        <div>
                                                            <Label htmlFor="s2_prodi" className="text-sm font-semibold text-slate-700">
                                                                Program Studi
                                                            </Label>
                                                            <Input
                                                                id="s2_prodi"
                                                                name="s2_prodi"
                                                                type="text"
                                                                defaultValue={user?.s2_prodi || ''}
                                                                placeholder="Program Studi S2"
                                                                className="mt-1 focus:ring-amber-500 border-slate-200"
                                                            />
                                                            <InputError message={formErrors.s2_prodi} className="text-xs mt-1" />
                                                        </div>
                                                        <div className="grid grid-cols-2 gap-2">
                                                            <div>
                                                                <Label htmlFor="s2_tahun_masuk" className="text-xs font-semibold text-slate-600">
                                                                    Tahun Masuk
                                                                </Label>
                                                                <Input
                                                                    id="s2_tahun_masuk"
                                                                    name="s2_tahun_masuk"
                                                                    type="number"
                                                                    defaultValue={user?.s2_tahun_masuk || ''}
                                                                    placeholder="2020"
                                                                    min={1990}
                                                                    className="mt-1 focus:ring-amber-500 border-slate-200"
                                                                />
                                                                <InputError message={formErrors.s2_tahun_masuk} className="text-xs mt-1" />
                                                            </div>
                                                            <div>
                                                                <Label htmlFor="s2_tahun_tamat" className="text-xs font-semibold text-slate-600">
                                                                    Tahun Tamat
                                                                </Label>
                                                                <Input
                                                                    id="s2_tahun_tamat"
                                                                    name="s2_tahun_tamat"
                                                                    type="number"
                                                                    defaultValue={user?.s2_tahun_tamat || ''}
                                                                    placeholder="2022"
                                                                    min={1990}
                                                                    className="mt-1 focus:ring-amber-500 border-slate-200"
                                                                />
                                                                <InputError message={formErrors.s2_tahun_tamat} className="text-xs mt-1" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* KOLOM S3 */}
                                                <div className="space-y-4 p-6 border-2 border-dashed border-amber-200 rounded-xl bg-amber-50/30">
                                                    <h4 className="font-bold text-amber-700 text-sm uppercase tracking-wider">Program S3</h4>
                                                    <div className="grid gap-4">
                                                        <div>
                                                            <Label htmlFor="s3_prodi" className="text-sm font-semibold text-slate-700">
                                                                Program Studi
                                                            </Label>
                                                            <Input
                                                                id="s3_prodi"
                                                                name="s3_prodi"
                                                                type="text"
                                                                defaultValue={user?.s3_prodi || ''}
                                                                placeholder="Program Studi S3"
                                                                className="mt-1 focus:ring-amber-500 border-slate-200"
                                                            />
                                                            <InputError message={formErrors.s3_prodi} className="text-xs mt-1" />
                                                        </div>
                                                        <div className="grid grid-cols-2 gap-2">
                                                            <div>
                                                                <Label htmlFor="s3_tahun_masuk" className="text-xs font-semibold text-slate-600">
                                                                    Tahun Masuk
                                                                </Label>
                                                                <Input
                                                                    id="s3_tahun_masuk"
                                                                    name="s3_tahun_masuk"
                                                                    type="number"
                                                                    defaultValue={user?.s3_tahun_masuk || ''}
                                                                    placeholder="2023"
                                                                    min={1990}
                                                                    className="mt-1 focus:ring-amber-500 border-slate-200"
                                                                />
                                                                <InputError message={formErrors.s3_tahun_masuk} className="text-xs mt-1" />
                                                            </div>
                                                            <div>
                                                                <Label htmlFor="s3_tahun_tamat" className="text-xs font-semibold text-slate-600">
                                                                    Tahun Tamat
                                                                </Label>
                                                                <Input
                                                                    id="s3_tahun_tamat"
                                                                    name="s3_tahun_tamat"
                                                                    type="number"
                                                                    defaultValue={user?.s3_tahun_tamat || ''}
                                                                    placeholder="2025"
                                                                    min={1990}
                                                                    className="mt-1 focus:ring-amber-500 border-slate-200"
                                                                />
                                                                <InputError message={formErrors.s3_tahun_tamat} className="text-xs mt-1" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </section>

                                        {/* INFO SECTION */}
                                        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg flex gap-3">
                                            <Info className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                                            <div className="text-sm text-blue-800">
                                                <p className="font-semibold mb-2">📋 Informasi Penting:</p>
                                                <ul className="space-y-1 text-xs">
                                                    <li>✓ Data profil hanya diisi satu kali</li>
                                                    <li>✓ Data akan digunakan untuk semua layanan IKA UNIMED</li>
                                                    <li>✓ Kami akan memverifikasi data akademik Anda dengan UNIMED</li>
                                                    <li>✓ Setelah profil selesai, Anda bisa mulai mengajukan legalisir</li>
                                                </ul>
                                            </div>
                                        </div>

                                        {/* Tombol Submit */}
                                        <div className="flex justify-center pt-6 border-t border-slate-200">
                                            <Button
                                                type="submit"
                                                disabled={processing}
                                                className="w-full md:w-auto md:min-w-[300px] h-12 text-base font-bold bg-gradient-to-r from-[#00A69D] to-[#00897B] hover:from-[#009086] hover:to-[#007469] text-white rounded-lg shadow-lg transition-all active:scale-95"
                                            >
                                                {processing ? (
                                                    <>
                                                        <Spinner className="mr-2 h-4 w-4" />
                                                        Menyimpan...
                                                    </>
                                                ) : (
                                                    'Simpan Profil & Lanjutkan'
                                                )}
                                            </Button>
                                        </div>
                                    </>
                                )}
                            </Form>
                        </div>
                    </div>
        </DashboardLayout>
    );
}
