import { login } from '@/routes';
import { store } from '@/routes/register';
import { Form, Head, Link } from '@inertiajs/react';
import { 
    ArrowLeft,
    Shield,
    Mail,
    Lock,
    Info,
    Chrome
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
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12 px-4">
            <Head title="Registrasi Alumni IKA UNIMED" />
            
            {/* Header */}
            <div className="max-w-2xl mx-auto mb-8 flex justify-between items-center">
                <Link 
                    href="/" 
                    className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-[#00A69D] transition-colors group"
                >
                    <div className="p-2 bg-white rounded-full shadow-sm group-hover:shadow-md group-hover:bg-teal-50">
                        <ArrowLeft className="h-4 w-4" />
                    </div>
                    Kembali ke Beranda
                </Link>
            </div>

            {/* Form Card */}
            <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
                {/* Header dengan gradient */}
                <div className="bg-gradient-to-r from-[#00A69D] to-[#00897B] p-8 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
                    <div className="relative z-10">
                        <h1 className="text-3xl font-extrabold mb-2">Daftar Alumni</h1>
                        <p className="text-teal-50/90 text-sm max-w-md">
                            Buat akun baru untuk mengakses layanan IKA UNIMED. Data profil lengkap akan Anda isikan setelah login.
                        </p>
                    </div>
                </div>

                {/* Form */}
                <Form
                    {...store.form()}
                    resetOnSuccess={['password', 'password_confirmation']}
                    disableWhileProcessing
                    className="p-8 md:p-12"
                >
                    {({ processing, errors }) => (
                        <div className="space-y-8">
                            {/* SOCIAL LOGIN */}
                            <section>
                                <div className="grid gap-3">
                                    <a 
                                        href="/auth/google"
                                        className="w-full h-11 px-4 py-2 border border-slate-300 rounded-lg font-semibold text-sm text-slate-700 hover:bg-slate-50 transition-all flex items-center justify-center gap-2 group hover:border-blue-400"
                                    >
                                        <Chrome className="h-4 w-4 text-blue-600 group-hover:scale-110 transition-transform" />
                                        <span>Daftar dengan Google</span>
                                    </a>
                                </div>

                                <div className="flex items-center gap-3 my-6">
                                    <div className="flex-1 border-t border-slate-200"></div>
                                    <span className="text-xs text-slate-500 font-medium">ATAU</span>
                                    <div className="flex-1 border-t border-slate-200"></div>
                                </div>
                            </section>
                            {/* IDENTITAS AKUN */}
                            <section>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-3 bg-blue-50 rounded-lg">
                                        <Shield className="h-5 w-5 text-blue-600" />
                                    </div>
                                    <h2 className="text-lg font-bold text-slate-900">Identitas Akun</h2>
                                </div>
                                
                                <div className="space-y-4 bg-blue-50/40 p-6 rounded-2xl border border-blue-100">
                                    <div className="grid gap-2">
                                        <Label htmlFor="email" className="font-bold text-slate-700">Email Address</Label>
                                        <Input 
                                            id="email" 
                                            type="email" 
                                            name="email" 
                                            required 
                                            placeholder="alumni@example.com"
                                            className="focus:ring-blue-500 border-slate-200"
                                        />
                                        <InputError message={errors.email} className="text-xs" />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="name" className="font-bold text-slate-700">Nama Lengkap</Label>
                                        <Input 
                                            id="name" 
                                            name="name" 
                                            required 
                                            autoFocus 
                                            placeholder="Masukkan nama lengkap"
                                            className="focus:ring-blue-500 border-slate-200"
                                        />
                                        <InputError message={errors.name} className="text-xs" />
                                    </div>
                                </div>
                            </section>

                            {/* PASSWORD */}
                            <section>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-3 bg-amber-50 rounded-lg">
                                        <Lock className="h-5 w-5 text-amber-600" />
                                    </div>
                                    <h2 className="text-lg font-bold text-slate-900">Keamanan Akun</h2>
                                </div>
                                
                                <div className="space-y-4 bg-amber-50/40 p-6 rounded-2xl border border-amber-100">
                                    <div className="grid gap-2">
                                        <Label htmlFor="password" className="font-bold text-slate-700">Password</Label>
                                        <Input 
                                            id="password" 
                                            type="password" 
                                            name="password" 
                                            required 
                                            placeholder="Minimal 8 karakter"
                                            className="focus:ring-amber-500 border-slate-200"
                                        />
                                        <InputError message={errors.password} className="text-xs" />
                                    </div>
                                    
                                    <div className="grid gap-2">
                                        <Label htmlFor="password_confirmation" className="font-bold text-slate-700">Konfirmasi Password</Label>
                                        <Input 
                                            id="password_confirmation" 
                                            type="password" 
                                            name="password_confirmation" 
                                            required 
                                            placeholder="Ketik ulang password"
                                            className="focus:ring-amber-500 border-slate-200"
                                        />
                                        <InputError message={errors.password_confirmation} className="text-xs" />
                                    </div>
                                </div>
                            </section>

                            {/* INFO */}
                            <div className="bg-teal-50 border-l-4 border-teal-500 p-4 rounded-lg flex gap-3">
                                <Info className="h-5 w-5 text-teal-600 shrink-0 mt-0.5" />
                                <div className="text-sm text-teal-800">
                                    <p className="font-semibold mb-2">📋 Alur Pendaftaran:</p>
                                    <ol className="space-y-1 text-xs ml-4 list-decimal">
                                        <li>Buat akun dengan email dan password (langkah ini)</li>
                                        <li>Login ke portal</li>
                                        <li>Lengkapi profil alumni (data diri & pendidikan)</li>
                                        <li>Mulai mengajukan legalisir ijazah</li>
                                    </ol>
                                </div>
                            </div>

                            {/* TOMBOL SUBMIT */}
                            <div className="flex flex-col items-center gap-4 pt-4 border-t border-slate-200">
                                <Button
                                    type="submit"
                                    className="w-full h-12 text-base font-bold bg-gradient-to-r from-[#00A69D] to-[#00897B] hover:from-[#009086] hover:to-[#007469] text-white rounded-lg shadow-lg transition-all active:scale-95"
                                    disabled={processing}
                                >
                                    {processing ? <Spinner className="mr-2" /> : null}
                                    Buat Akun Sekarang
                                </Button>

                                <div className="text-sm text-slate-600">
                                    Sudah punya akun?{' '}
                                    <TextLink href={login()} className="font-bold text-[#00A69D] hover:underline">
                                        Masuk ke Portal
                                    </TextLink>
                                </div>
                            </div>
                        </div>
                    )}
                </Form>
            </div>
            
            {/* Footer */}
            <div className="text-center mt-12 text-slate-500 text-xs">
                &copy; 2026 Ikatan Alumni Universitas Negeri Medan (IKA UNIMED). All Rights Reserved.
            </div>
        </div>
    );
}
