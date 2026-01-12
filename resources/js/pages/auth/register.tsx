import { login } from '@/routes';
import { store } from '@/routes/register';
import { Form, Head, Link } from '@inertiajs/react';
import { 
    ArrowLeft, 
    Download, 
    Upload, 
    GraduationCap, 
    User, 
    MapPin, 
    ShieldCheck, 
    Briefcase,
    Info
} from "lucide-react";

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import AuthLayout from '@/layouts/auth-layout';

export default function Register() {
    return (
        <div className="min-h-screen bg-[#F9FAFB] py-12 px-4">
            <Head title="Registrasi Alumni IKA UNIMED" />
            
            {/* Header & Navigation */}
            <div className="max-w-5xl mx-auto mb-8 flex justify-between items-center">
                <Link 
                    href="/" 
                    className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-oxygen-teal transition-colors group"
                >
                    <div className="p-2 bg-white rounded-full shadow-sm group-hover:bg-teal-50">
                        <ArrowLeft className="h-4 w-4" />
                    </div>
                    Kembali ke Beranda
                </Link>
                
                <div className="flex gap-3">
                    <Button variant="outline" size="sm" className="bg-white border-gray-200 text-gray-600 hidden md:flex">
                        <Download className="mr-2 h-4 w-4" /> Panduan Pendaftaran
                    </Button>
                </div>
            </div>

            {/* Form Card */}
            <div className="max-w-5xl mx-auto bg-white border border-gray-100 rounded-3xl shadow-2xl shadow-gray-200/50 overflow-hidden">
                <div className="bg-oxygen-teal p-8 text-white relative overflow-hidden">
                    <div className="relative z-10">
                        <h1 className="text-3xl font-extrabold mb-2">Formulir Alumni</h1>
                        <p className="text-teal-50 opacity-90 text-sm max-w-xl">
                            Selamat datang! Silakan lengkapi data Anda untuk memvalidasi status alumni dan bergabung dalam ekosistem IKA UNIMED.
                        </p>
                    </div>
                    {/* Aksen Dekoratif */}
                    <div className="absolute top-[-20%] right-[-5%] w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                </div>

                <Form
                    {...store.form()}
                    resetOnSuccess={['password', 'password_confirmation']}
                    disableWhileProcessing
                    className="p-8 md:p-12"
                >
                    {({ processing, errors }) => (
                        <div className="space-y-12">
                            
                            {/* SEKSI 1: IDENTITAS PRIBADI */}
                            <section>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 bg-orange-50 rounded-lg">
                                        <User className="h-5 w-5 text-primary" />
                                    </div>
                                    <h2 className="text-xl font-bold text-gray-800">Identitas Pribadi</h2>
                                    <div className="h-px flex-1 bg-gray-100 ml-4"></div>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    <div className="grid gap-2 lg:col-span-2">
                                        <Label htmlFor="name">Nama Lengkap & Gelar</Label>
                                        <Input id="name" name="name" required autoFocus placeholder="Masukkan nama lengkap beserta gelar" className="focus:ring-oxygen-teal" />
                                        <InputError message={errors.name} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="wa">WhatsApp</Label>
                                        <Input id="wa" name="wa" required placeholder="0812xxxxxx" />
                                        <InputError message={errors.wa} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="nik">NIK (Sesuai KTP)</Label>
                                        <Input id="nik" name="nik" required maxLength={16} placeholder="16 Digit NIK" />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="tempat_lahir">Tempat Lahir</Label>
                                        <Input id="tempat_lahir" name="tempat_lahir" required />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="tanggal_lahir">Tanggal Lahir</Label>
                                        <Input id="tanggal_lahir" type="date" name="tanggal_lahir" required />
                                    </div>
                                    <div className="grid gap-2 lg:col-span-3">
                                        <Label htmlFor="alamat_lengkap">Alamat Lengkap Domisili</Label>
                                        <Input id="alamat_lengkap" name="alamat_lengkap" required placeholder="Jl. Contoh No. 123, Medan" />
                                    </div>
                                </div>
                            </section>

                            {/* SEKSI 2: RIWAYAT PENDIDIKAN S1 (UNIMED) */}
                            <section>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 bg-teal-50 rounded-lg">
                                        <GraduationCap className="h-5 w-5 text-oxygen-teal" />
                                    </div>
                                    <h2 className="text-xl font-bold text-gray-800">Pendidikan S1 (Alumni UNIMED)</h2>
                                    <div className="h-px flex-1 bg-gray-100 ml-4"></div>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-teal-50/30 p-6 rounded-2xl border border-teal-100">
                                    <div className="grid gap-2">
                                        <Label htmlFor="s1_fakultas">Fakultas</Label>
                                        <Input id="s1_fakultas" name="s1_fakultas" required placeholder="Contoh: Fakultas Ilmu Pendidikan" />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="s1_prodi">Program Studi</Label>
                                        <Input id="s1_prodi" name="s1_prodi" required />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="s1_tahun_masuk">Tahun Masuk</Label>
                                        <Input id="s1_tahun_masuk" type="number" name="s1_tahun_masuk" required />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="s1_tahun_tamat">Tahun Tamat</Label>
                                        <Input id="s1_tahun_tamat" type="number" name="s1_tahun_tamat" required />
                                    </div>
                                    <div className="md:col-span-2 mt-2">
                                        <Button variant="outline" type="button" className="w-full border-dashed bg-white text-gray-500 hover:text-oxygen-teal hover:bg-teal-50">
                                            <Upload className="mr-2 h-4 w-4" /> Upload Bukti Ijazah / SKL (Optional - Max 2MB)
                                        </Button>
                                    </div>
                                </div>
                            </section>

                            {/* SEKSI 3: PENDIDIKAN LANJUTAN (S2/S3) */}
                            <section>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 bg-amber-50 rounded-lg">
                                        <Briefcase className="h-5 w-5 text-ika-yellow" />
                                    </div>
                                    <h2 className="text-xl font-bold text-gray-800">Pendidikan Lanjutan (S2/S3) - Opsional</h2>
                                    <div className="h-px flex-1 bg-gray-100 ml-4"></div>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {/* Kolom S2 */}
                                    <div className="space-y-4 p-4 border border-gray-100 rounded-xl">
                                        <h4 className="font-bold text-gray-400 text-xs uppercase tracking-widest">Program S2</h4>
                                        <Input name="s2_prodi" placeholder="Program Studi S2" />
                                        <div className="grid grid-cols-2 gap-2">
                                            <Input name="s2_tahun_masuk" type="number" placeholder="Tahun Masuk" />
                                            <Input name="s2_tahun_tamat" type="number" placeholder="Tahun Tamat" />
                                        </div>
                                    </div>
                                    {/* Kolom S3 */}
                                    <div className="space-y-4 p-4 border border-gray-100 rounded-xl">
                                        <h4 className="font-bold text-gray-400 text-xs uppercase tracking-widest">Program S3</h4>
                                        <Input name="s3_prodi" placeholder="Program Studi S3" />
                                        <div className="grid grid-cols-2 gap-2">
                                            <Input name="s3_tahun_masuk" type="number" placeholder="Tahun Masuk" />
                                            <Input name="s3_tahun_tamat" type="number" placeholder="Tahun Tamat" />
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* SEKSI 4: KEAMANAN AKUN */}
                            <section className="bg-gray-50 p-8 rounded-3xl border border-gray-200">
                                <div className="flex items-center gap-3 mb-6">
                                    <ShieldCheck className="h-5 w-5 text-gray-600" />
                                    <h2 className="text-xl font-bold text-gray-800">Keamanan Akun</h2>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="grid gap-2">
                                        <Label htmlFor="email">Email address</Label>
                                        <Input id="email" type="email" name="email" required placeholder="alumni@example.com" />
                                        <InputError message={errors.email} />
                                    </div>
                                    <div></div> {/* Spacer */}
                                    
                                    <div className="grid gap-2">
                                        <Label htmlFor="password">Buat Password</Label>
                                        <Input id="password" type="password" name="password" required />
                                        <InputError message={errors.password} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="password_confirmation">Konfirmasi Password</Label>
                                        <Input id="password_confirmation" type="password" name="password_confirmation" required />
                                        <InputError message={errors.password_confirmation} />
                                    </div>
                                </div>
                            </section>

                            {/* TOMBOL SUBMIT */}
                            <div className="flex flex-col items-center gap-6 pt-4">
                                <div className="flex items-start gap-3 text-xs text-gray-500 max-w-2xl text-center">
                                    <Info className="h-4 w-4 text-oxygen-teal shrink-0" />
                                    <p>Dengan mendaftar, Anda menyatakan bahwa data yang diisi adalah benar. IKA UNIMED berhak memverifikasi data akademik Anda dengan pangkalan data universitas.</p>
                                </div>
                                
                                <Button
                                    type="submit"
                                    className="w-full md:w-auto md:min-w-[300px] h-14 text-lg font-bold bg-primary hover:bg-primary/90 text-white rounded-xl shadow-xl shadow-primary/20 transition-all active:scale-95"
                                    disabled={processing}
                                >
                                    {processing ? <Spinner className="mr-2" /> : null}
                                    Daftar Sekarang
                                </Button>

                                <div className="text-sm text-gray-600">
                                    Sudah memiliki akun?{' '}
                                    <TextLink href={login()} className="font-bold text-oxygen-teal hover:underline">
                                        Masuk ke Portal
                                    </TextLink>
                                </div>
                            </div>
                        </div>
                    )}
                </Form>
            </div>
            
            {/* Footer Form */}
            <div className="text-center mt-12 text-gray-400 text-xs">
                &copy; 2026 Ikatan Alumni Universitas Negeri Medan (IKA UNIMED). All Rights Reserved.
            </div>
        </div>
    );
}
