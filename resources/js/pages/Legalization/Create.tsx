import { Head, useForm, Link, usePage } from '@inertiajs/react'
import { route } from 'ziggy-js'
import { DashboardLayout } from '@/components/DashboardLayout'

interface CreateProps {
  user: any
  notifications?: any[]
  stats?: Record<string, number>
}

export default function Create({ user, notifications = [], stats = {} }: CreateProps) {
  const { flash }: any = usePage().props
  const { data, setData, post, processing, errors } = useForm({
    jenjang: '',
    tahun_lulus: new Date().getFullYear().toString(),
    jumlah_lembar: 1,
    tujuan: '',
  })

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    post(route('legalization.store'))
  }

  const jenjangOptions = [
    { value: 'D3', label: 'Diploma (D3)' },
    { value: 'S1', label: 'Strata 1 (S1)' },
    { value: 'S2', label: 'Strata 2 (S2)' },
    { value: 'S3', label: 'Strata 3 (S3)' },
  ]

  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 50 }, (_, i) => currentYear - i)

  return (
    <>
      <Head title="Ajukan Legalisasi" />

      <DashboardLayout
        user={user}
        notifications={notifications}
        title="Ajukan Legalisir Ijazah"
        stats={stats}
      >
        <div className="space-y-6">
          {/* FLASH MESSAGE */}
          {flash?.error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800 font-medium">{flash.error}</p>
            </div>
          )}

          {/* FORM */}
          <form onSubmit={submit} className="space-y-6 bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
            {/* JENJANG */}
            <div>
              <label className="block text-sm font-bold text-slate-900 mb-2">
                Jenjang Pendidikan <span className="text-red-500">*</span>
              </label>
              <select
                value={data.jenjang}
                onChange={e => setData('jenjang', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                  errors.jenjang ? 'border-red-300 bg-red-50' : 'border-slate-300 bg-white'
                }`}
              >
                <option value="">-- Pilih Jenjang --</option>
                {jenjangOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              {errors.jenjang && (
                <p className="mt-2 text-sm text-red-600 font-medium">{errors.jenjang}</p>
              )}
            </div>

            {/* TAHUN LULUS */}
            <div>
              <label className="block text-sm font-bold text-slate-900 mb-2">
                Tahun Lulus <span className="text-red-500">*</span>
              </label>
              <select
                value={data.tahun_lulus}
                onChange={e => setData('tahun_lulus', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                  errors.tahun_lulus ? 'border-red-300 bg-red-50' : 'border-slate-300 bg-white'
                }`}
              >
                {years.map(year => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
              {errors.tahun_lulus && (
                <p className="mt-2 text-sm text-red-600 font-medium">{errors.tahun_lulus}</p>
              )}
            </div>

            {/* JUMLAH LEMBAR */}
            <div>
              <label className="block text-sm font-bold text-slate-900 mb-2">
                Jumlah Lembar <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                min={1}
                value={data.jumlah_lembar}
                onChange={e => setData('jumlah_lembar', Number(e.target.value))}
                className={`w-full px-4 py-3 border rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                  errors.jumlah_lembar ? 'border-red-300 bg-red-50' : 'border-slate-300 bg-white'
                }`}
              />
              {errors.jumlah_lembar && (
                <p className="mt-2 text-sm text-red-600 font-medium">{errors.jumlah_lembar}</p>
              )}
              <p className="mt-1 text-xs text-slate-500">Berapa lembar ijazah yang ingin Anda legalisir?</p>
            </div>

            {/* TUJUAN */}
            <div>
              <label className="block text-sm font-bold text-slate-900 mb-2">
                Tujuan Penggunaan <span className="text-slate-500 text-xs">(Opsional)</span>
              </label>
              <textarea
                value={data.tujuan}
                onChange={e => setData('tujuan', e.target.value)}
                placeholder="Contoh: Untuk pendaftaran CPNS, melamar kerja, dll"
                rows={4}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
              />
              <p className="mt-1 text-xs text-slate-500">Anda dapat menambahkan catatan untuk tujuan pengajuan ini</p>
            </div>

            {/* BUTTONS */}
            <div className="flex gap-4 pt-6 border-t border-slate-100">
              <button
                disabled={processing}
                type="submit"
                className="flex-1 px-6 py-3 bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-lg font-semibold hover:from-teal-700 hover:to-teal-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg"
              >
                {processing ? 'Mengirim...' : 'Ajukan Pengajuan'}
              </button>

              <Link
                href={route('legalization.index')}
                className="flex-1 px-6 py-3 bg-slate-100 text-slate-700 rounded-lg font-semibold hover:bg-slate-200 transition-colors text-center"
              >
                Batal
              </Link>
            </div>
          </form>

          {/* INFO */}
          <div className="p-6 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="font-bold text-blue-900 mb-3">Informasi Penting</h3>
            <ul className="text-sm text-blue-800 space-y-2 list-disc list-inside">
              <li>Pastikan data yang Anda masukkan sudah benar dan sesuai dengan ijazah asli</li>
              <li>Anda akan diminta untuk upload file ijazah setelah pengajuan</li>
              <li>Proses verifikasi membutuhkan waktu 1-3 hari kerja</li>
              <li>Anda dapat melacak status pengajuan di halaman utama legalisir</li>
            </ul>
          </div>
        </div>
      </DashboardLayout>
    </>
  )
}
