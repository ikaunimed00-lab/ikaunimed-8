import { Head, useForm, usePage } from "@inertiajs/react";
import { route } from "ziggy-js";
import AdminLayout from "@/Layouts/AdminLayout";
import EditorLayout from "@/Layouts/EditorLayout";
import WriterLayout from "@/Layouts/WriterLayout";
import SubscriberLayout from "@/Layouts/SubscriberLayout";
import { User, Save, GraduationCap, MapPin, Briefcase, Phone, CreditCard, Calendar } from "lucide-react";

interface Education {
    level: string;
    university: string;
    faculty: string;
    major: string;
    admission_year: string;
    graduation_year: string;
}

interface Props {
  mustVerifyEmail: boolean;
  status?: string;
  educations?: Education[];
}

const educationLevels = ['D1', 'D2', 'D3', 'D4', 'S1', 'S2', 'S3'];

export default function EditProfile({ mustVerifyEmail, status, educations = [] }: Props) {
  const { auth }: any = usePage().props;
  
  // Prepare initial educations data (Fix slots for D1-S3)
  const initialEducations = educationLevels.map(level => {
      const existing = educations.find(e => e.level === level);
      return existing ? { ...existing } : {
          level: level,
          university: '',
          faculty: '',
          major: '',
          admission_year: '',
          graduation_year: ''
      };
  });

  const { data, setData, patch, processing, errors, recentlySuccessful } = useForm({
    // Identitas
    name: auth.user.name || "",
    email: auth.user.email || "",
    gender: auth.user.gender || "",
    tempat_lahir: auth.user.tempat_lahir || "",
    tanggal_lahir: auth.user.tanggal_lahir || "",
    nik: auth.user.nik || "",
    wa: auth.user.wa || "",
    domicile: auth.user.domicile || "",
    alamat_lengkap: auth.user.alamat_lengkap || "",
    occupation: auth.user.occupation || "",
    
    // Pendidikan
    educations: initialEducations
  });

  const LayoutComponent = 
    auth?.user?.role === "admin" ? AdminLayout :
    auth?.user?.role === "editor" ? EditorLayout :
    auth?.user?.role === "writer" ? WriterLayout :
    SubscriberLayout;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    patch(route("profile.update"));
  };

  const updateEducation = (index: number, field: keyof Education, value: string) => {
      const newEducations = [...data.educations];
      newEducations[index] = { ...newEducations[index], [field]: value };
      setData('educations', newEducations);
  };

  return (
    <LayoutComponent>
      <Head title="Edit Profil Lengkap" />

      <div className="space-y-8 max-w-5xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg p-8 text-white">
          <div className="flex items-center gap-3 mb-2">
            <User className="w-8 h-8" />
            <h1 className="text-3xl font-bold">Edit Profil Lengkap</h1>
          </div>
          <p className="text-blue-100">
            Lengkapi data diri dan riwayat pendidikan Anda untuk database alumni.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
            {/* 1. IDENTITAS DIRI */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center gap-2 mb-6 border-b pb-4">
                    <User className="w-5 h-5 text-blue-600" />
                    <h3 className="text-xl font-bold text-gray-900">Identitas Diri</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Nama Lengkap */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap <span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={e => setData("name", e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="Nama Lengkap Beserta Gelar"
                        />
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            value={data.email}
                            disabled
                            className="w-full px-4 py-2 border border-gray-200 bg-gray-50 rounded-lg text-gray-500 cursor-not-allowed"
                        />
                        <p className="text-xs text-gray-500 mt-1">Email tidak dapat diubah.</p>
                    </div>

                    {/* NIK */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">NIK (Nomor Induk Kependudukan)</label>
                        <div className="relative">
                            <CreditCard className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                value={data.nik}
                                onChange={e => setData("nik", e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                placeholder="16 digit NIK"
                            />
                        </div>
                    </div>

                    {/* Jenis Kelamin */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Jenis Kelamin</label>
                        <select
                            value={data.gender}
                            onChange={e => setData("gender", e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Pilih Jenis Kelamin</option>
                            <option value="L">Laki-laki</option>
                            <option value="P">Perempuan</option>
                        </select>
                    </div>

                    {/* WhatsApp */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">No. WhatsApp</label>
                        <div className="relative">
                            <Phone className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                value={data.wa}
                                onChange={e => setData("wa", e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                placeholder="08..."
                            />
                        </div>
                    </div>

                    {/* Tempat Lahir */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Tempat Lahir</label>
                        <input
                            type="text"
                            value={data.tempat_lahir}
                            onChange={e => setData("tempat_lahir", e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="Kota Kelahiran"
                        />
                    </div>

                    {/* Tanggal Lahir */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Lahir</label>
                        <div className="relative">
                            <Calendar className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                            <input
                                type="date"
                                value={data.tanggal_lahir}
                                onChange={e => setData("tanggal_lahir", e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    {/* Pekerjaan */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Pekerjaan Saat Ini</label>
                        <div className="relative">
                            <Briefcase className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                value={data.occupation}
                                onChange={e => setData("occupation", e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                placeholder="Nama Pekerjaan / Instansi"
                            />
                        </div>
                    </div>

                    {/* Domisili */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Domisili (Kota/Kabupaten)</label>
                        <div className="relative">
                            <MapPin className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                value={data.domicile}
                                onChange={e => setData("domicile", e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                placeholder="Contoh: Medan, Jakarta Selatan"
                            />
                        </div>
                    </div>

                    {/* Alamat Lengkap */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Alamat Lengkap</label>
                        <textarea
                            value={data.alamat_lengkap}
                            onChange={e => setData("alamat_lengkap", e.target.value)}
                            rows={3}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="Jalan, RT/RW, Kelurahan, Kecamatan"
                        />
                    </div>
                </div>
            </div>

            {/* 2. RIWAYAT PENDIDIKAN */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center gap-2 mb-6 border-b pb-4">
                    <GraduationCap className="w-5 h-5 text-blue-600" />
                    <h3 className="text-xl font-bold text-gray-900">Riwayat Pendidikan</h3>
                </div>
                
                <p className="text-sm text-gray-600 mb-6">
                    Silakan lengkapi data pendidikan Anda sesuai jenjang yang ditempuh.
                </p>

                <div className="space-y-8">
                    {data.educations.map((edu, index) => (
                        <div key={edu.level} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                            <h4 className="font-bold text-lg text-gray-800 mb-4 flex items-center gap-2">
                                <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm">Jenjang {edu.level}</span>
                            </h4>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Universitas */}
                                <div className="md:col-span-2">
                                    <label className="block text-xs font-semibold text-gray-600 mb-1">Nama Universitas / Perguruan Tinggi</label>
                                    <input
                                        type="text"
                                        value={edu.university}
                                        onChange={e => updateEducation(index, 'university', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                                        placeholder={`Nama Universitas ${edu.level}`}
                                    />
                                </div>

                                {/* Fakultas */}
                                <div>
                                    <label className="block text-xs font-semibold text-gray-600 mb-1">Fakultas</label>
                                    <input
                                        type="text"
                                        value={edu.faculty}
                                        onChange={e => updateEducation(index, 'faculty', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                                        placeholder="Nama Fakultas"
                                    />
                                </div>

                                {/* Jurusan/Prodi */}
                                <div>
                                    <label className="block text-xs font-semibold text-gray-600 mb-1">Jurusan / Program Studi</label>
                                    <input
                                        type="text"
                                        value={edu.major}
                                        onChange={e => updateEducation(index, 'major', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                                        placeholder="Nama Jurusan/Prodi"
                                    />
                                </div>

                                {/* Tahun Masuk */}
                                <div>
                                    <label className="block text-xs font-semibold text-gray-600 mb-1">Tahun Masuk</label>
                                    <input
                                        type="number"
                                        value={edu.admission_year}
                                        onChange={e => updateEducation(index, 'admission_year', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                                        placeholder="YYYY"
                                    />
                                </div>

                                {/* Tahun Tamat */}
                                <div>
                                    <label className="block text-xs font-semibold text-gray-600 mb-1">Tahun Tamat</label>
                                    <input
                                        type="number"
                                        value={edu.graduation_year}
                                        onChange={e => updateEducation(index, 'graduation_year', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                                        placeholder="YYYY"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex items-center justify-end gap-4 pt-4">
                {recentlySuccessful && (
                    <span className="text-green-600 font-medium animate-fade-in">
                        ✓ Berhasil disimpan
                    </span>
                )}
                
                <button
                    type="submit"
                    disabled={processing}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl disabled:opacity-50"
                >
                    <Save className="w-5 h-5" />
                    {processing ? "Menyimpan..." : "Simpan Perubahan"}
                </button>
            </div>
        </form>
      </div>
    </LayoutComponent>
  );
}
