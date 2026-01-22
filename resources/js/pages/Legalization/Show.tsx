import { useForm, Link, usePage } from '@inertiajs/react'
import { route } from 'ziggy-js'
import { FileUp, CheckCircle, Clock, XCircle, AlertCircle, Download, Lock } from 'lucide-react'
import { useState } from 'react'
import { DashboardLayout } from '@/components/DashboardLayout'

interface LegalizationFile {
  id: number
  original_name: string
  filename: string
  size?: number
  file_path?: string
}

interface Legalization {
  id: number
  jenjang: string
  tahun_lulus: number
  jumlah_lembar: number
  keperluan?: string
  status: string
  files: LegalizationFile[]
}

interface ShowProps {
  legalization: Legalization
  user: any
  notifications?: any[]
  stats?: Record<string, number>
}

export default function Show({ legalization, user, notifications = [], stats = {} }: ShowProps) {
  const { flash }: any = usePage().props
  const { data, setData, post, processing, errors, reset } = useForm({
    file: null as File | null,
  })

  const [dragActive, setDragActive] = useState(false)
  const canUpload = legalization.status === 'submitted'

  function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!data.file) return
    
    const formData = new FormData()
    formData.append('file', data.file)
    
    post(route('legalization.upload', legalization.id), {
      data: formData,
      onSuccess: () => {
        reset()
        setDragActive(false)
      },
    })
  }

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'submitted':
        return {
          bg: 'bg-yellow-50',
          border: 'border-yellow-200',
          icon: Clock,
          color: 'text-yellow-600',
          label: 'Menunggu Verifikasi',
          description: 'Dokumen Anda sedang menunggu untuk diverifikasi oleh admin'
        }
      case 'verified':
        return {
          bg: 'bg-blue-50',
          border: 'border-blue-200',
          icon: AlertCircle,
          color: 'text-blue-600',
          label: 'Terverifikasi',
          description: 'Dokumen Anda telah diverifikasi dan menunggu persetujuan final'
        }
      case 'completed':
        return {
          bg: 'bg-green-50',
          border: 'border-green-200',
          icon: CheckCircle,
          color: 'text-green-600',
          label: 'Selesai',
          description: 'Legalisasi Anda telah selesai dan siap diambil'
        }
      case 'rejected':
        return {
          bg: 'bg-red-50',
          border: 'border-red-200',
          icon: XCircle,
          color: 'text-red-600',
          label: 'Ditolak',
          description: 'Pengajuan Anda ditolak. Silahkan hubungi admin untuk informasi lebih lanjut'
        }
      default:
        return {
          bg: 'bg-slate-50',
          border: 'border-slate-200',
          icon: AlertCircle,
          color: 'text-slate-600',
          label: status,
          description: 'Status pengajuan Anda'
        }
    }
  }

  const statusStyle = getStatusStyle(legalization.status)
  const StatusIcon = statusStyle.icon

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setData('file', e.dataTransfer.files[0])
    }
  }

  return (
    <DashboardLayout
      user={user}
      notifications={notifications}
      title="Detail Pengajuan"
      stats={stats}
    >
      <div className="space-y-6">
        <div>
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            Detail Pengajuan Legalisasi
          </h1>
          <p className="text-slate-600">
            Pantau status dan upload dokumen ijazah Anda
          </p>
        </div>

        {/* FLASH MESSAGE */}
        {flash?.success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-800 font-medium">{flash.success}</p>
          </div>
        )}
        {flash?.error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800 font-medium">{flash.error}</p>
          </div>
        )}

        {/* MAIN CONTENT GRID */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* LEFT: FORM & STATUS */}
          <div className="md:col-span-2 space-y-6">
            {/* INFO CARD */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8">
              <h2 className="text-xl font-bold text-slate-900 mb-6">Informasi Pengajuan</h2>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-slate-600 uppercase tracking-wide">Jenjang Pendidikan</p>
                  <p className="text-lg font-semibold text-slate-900">{legalization.jenjang}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-slate-600 uppercase tracking-wide">Tahun Lulus</p>
                  <p className="text-lg font-semibold text-slate-900">{legalization.tahun_lulus}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 border-t border-slate-100 pt-6">
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-slate-600 uppercase tracking-wide">Jumlah Lembar</p>
                  <p className="text-lg font-semibold text-slate-900">{legalization.jumlah_lembar}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-slate-600 uppercase tracking-wide">Keperluan</p>
                  <p className="text-lg font-semibold text-slate-900">{legalization.keperluan || 'Tidak disebutkan'}</p>
                </div>
              </div>

              {/* PROGRESS TIMELINE */}
              <div className="mt-8 pt-8 border-t border-slate-100">
                <p className="text-sm font-semibold text-slate-600 uppercase tracking-wide mb-6">Alur Pengajuan</p>
                <div className="space-y-4">
                  {/* Step 1: Submitted */}
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-4 h-4 bg-teal-500 rounded-full border-4 border-teal-100"></div>
                      <div className="w-1 h-12 bg-gradient-to-b from-teal-200 to-slate-200"></div>
                    </div>
                    <div className="pb-4">
                      <p className="font-bold text-slate-900">Pengajuan Dikirim</p>
                      <p className="text-sm text-slate-600">Dokumen Anda telah diterima sistem</p>
                    </div>
                  </div>

                  {/* Step 2: Verified */}
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`w-4 h-4 rounded-full border-4 ${
                        legalization.status === 'verified' || legalization.status === 'completed'
                          ? 'bg-blue-500 border-blue-100'
                          : 'bg-slate-200 border-slate-100'
                      }`}></div>
                      <div className={`w-1 h-12 bg-gradient-to-b ${
                        legalization.status === 'completed' || legalization.status === 'rejected'
                          ? 'from-blue-200 to-slate-200'
                          : 'from-slate-200 to-slate-200'
                      }`}></div>
                    </div>
                    <div className="pb-4">
                      <p className="font-bold text-slate-900">Dokumen Diverifikasi</p>
                      <p className="text-sm text-slate-600">
                        {legalization.status === 'verified' || legalization.status === 'completed' || legalization.status === 'rejected'
                          ? 'Admin telah memeriksa dan memverifikasi dokumen Anda'
                          : 'Menunggu verifikasi dari admin'}
                      </p>
                    </div>
                  </div>

                  {/* Step 3: Approved/Rejected */}
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`w-4 h-4 rounded-full border-4 ${
                        legalization.status === 'completed'
                          ? 'bg-green-500 border-green-100'
                          : legalization.status === 'rejected'
                          ? 'bg-red-500 border-red-100'
                          : 'bg-slate-200 border-slate-100'
                      }`}></div>
                    </div>
                    <div>
                      {legalization.status === 'completed' ? (
                        <div>
                          <p className="font-bold text-green-700">Legalisasi Selesai</p>
                          <p className="text-sm text-slate-600">Legalisasi Anda telah disetujui dan siap diambil</p>
                        </div>
                      ) : legalization.status === 'rejected' ? (
                        <div>
                          <p className="font-bold text-red-700">Pengajuan Ditolak</p>
                          <p className="text-sm text-slate-600">Silahkan periksa catatan dari admin atau hubungi kantor untuk informasi lebih lanjut</p>
                        </div>
                      ) : (
                        <div>
                          <p className="font-bold text-slate-600">Proses Persetujuan</p>
                          <p className="text-sm text-slate-500">Menunggu persetujuan final dari admin</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* UPLOAD FORM */}
            {canUpload ? (
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8">
                <h2 className="text-xl font-bold text-slate-900 mb-6">Upload Ijazah</h2>
                
                <form onSubmit={submit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-4">
                      Upload Berkas (PDF, JPG, atau PNG)
                    </label>
                    
                    <div
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                      className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${
                        dragActive
                          ? 'border-teal-500 bg-teal-50'
                          : 'border-slate-300 bg-slate-50 hover:border-teal-400'
                      }`}
                    >
                      <FileUp className={`w-12 h-12 mx-auto mb-3 ${dragActive ? 'text-teal-600' : 'text-slate-400'}`} />
                      <p className="text-slate-900 font-semibold mb-1">
                        {data.file ? data.file.name : 'Drag & drop file Anda di sini'}
                      </p>
                      <p className="text-slate-600 text-sm mb-4">
                        atau klik untuk memilih file
                      </p>
                      <input
                        type="file"
                        onChange={e => setData('file', e.target.files?.[0] ?? null)}
                        className="hidden"
                        id="file-input"
                        accept=".pdf,.jpg,.jpeg,.png"
                        disabled={!canUpload}
                      />
                      <label
                        htmlFor="file-input"
                        className="inline-block px-6 py-2 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Pilih File
                      </label>
                    </div>

                    {errors.file && (
                      <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-red-600 text-sm font-medium">{errors.file}</p>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-4">
                    <button
                      disabled={processing || !data.file}
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-lg font-semibold hover:from-teal-700 hover:to-teal-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg"
                    >
                      {processing ? 'Mengunggah...' : 'Upload Ijazah'}
                    </button>
                    <Link
                      href={route('legalization.index')}
                      className="px-6 py-3 bg-slate-100 text-slate-700 rounded-lg font-semibold hover:bg-slate-200 transition-colors"
                    >
                      Batal
                    </Link>
                  </div>
                </form>
              </div>
            ) : (
              <div className={`${statusStyle.bg} border-l-4 ${statusStyle.border.replace('border-', 'border-l-')} rounded-lg p-6`}>
                <div className="flex items-start gap-4">
                  <Lock className={`w-8 h-8 ${statusStyle.color} flex-shrink-0 mt-1`} />
                  <div>
                    <p className="text-sm font-semibold text-slate-600 uppercase tracking-wide mb-1">Upload Terkunci</p>
                    <p className={`font-semibold ${statusStyle.color}`}>
                      Upload hanya tersedia saat status "Menunggu Verifikasi"
                    </p>
                    <p className="text-sm text-slate-600 mt-2">
                      Status pengajuan Anda saat ini adalah <strong>{statusStyle.label}</strong>
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT: STATUS & FILES */}
          <div className="space-y-6">
            {/* STATUS BADGE */}
            <div className={`${statusStyle.bg} border-l-4 ${statusStyle.border.replace('border-', 'border-l-')} rounded-lg p-6`}>
              <div className="flex items-start gap-4">
                <StatusIcon className={`w-8 h-8 ${statusStyle.color} flex-shrink-0 mt-1`} />
                <div>
                  <p className="text-sm font-semibold text-slate-600 uppercase tracking-wide mb-1">Status Saat Ini</p>
                  <p className={`text-xl font-bold ${statusStyle.color} mb-2`}>
                    {statusStyle.label}
                  </p>
                  <p className="text-xs text-slate-600">{statusStyle.description}</p>
                </div>
              </div>
            </div>

            {/* FILES LIST */}
            {legalization.files && legalization.files.length > 0 && (
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <FileUp className="w-5 h-5 text-teal-600" />
                  Berkas Terupload
                </h3>
                <div className="space-y-3">
                  {legalization.files.map((file: LegalizationFile) => (
                    <div
                      key={file.id}
                      className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-100 hover:border-teal-300 transition-colors"
                    >
                      <div>
                        <p className="font-medium text-slate-900">{file.original_name}</p>
                        <p className="text-xs text-slate-500 mt-1">
                          {file.size ? (file.size / 1024 / 1024).toFixed(2) : 'N/A'} MB
                        </p>
                      </div>
                      {file.file_path && (
                        <a
                          href={file.file_path}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-teal-600 hover:bg-teal-50 rounded-lg transition-colors"
                          title="Download file"
                        >
                          <Download className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TIMELINE INFO */}
            <div className="bg-gradient-to-br from-teal-50 to-cyan-50 border border-teal-200 rounded-xl p-6">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-4">Timeline Proses</h3>
              <div className="space-y-3 text-sm">
                <div className="flex gap-3">
                  <div className="w-2 h-2 bg-teal-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="font-semibold text-slate-900">Pengajuan Diterima</p>
                    <p className="text-slate-600 text-xs">Dokumen sedang diproses</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className={`w-2 h-2 ${['verified', 'completed'].includes(legalization.status) ? 'bg-teal-600' : 'bg-slate-300'} rounded-full mt-2 flex-shrink-0`}></div>
                  <div>
                    <p className={`font-semibold ${['verified', 'completed'].includes(legalization.status) ? 'text-slate-900' : 'text-slate-500'}`}>
                      Verifikasi Admin
                    </p>
                    <p className={`text-xs ${['verified', 'completed'].includes(legalization.status) ? 'text-slate-600' : 'text-slate-400'}`}>
                      Menunggu konfirmasi
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className={`w-2 h-2 ${legalization.status === 'completed' ? 'bg-teal-600' : 'bg-slate-300'} rounded-full mt-2 flex-shrink-0`}></div>
                  <div>
                    <p className={`font-semibold ${legalization.status === 'completed' ? 'text-slate-900' : 'text-slate-500'}`}>
                      Selesai
                    </p>
                    <p className={`text-xs ${legalization.status === 'completed' ? 'text-slate-600' : 'text-slate-400'}`}>
                      Siap diambil
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* HELP INFO */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <h3 className="text-sm font-bold text-blue-900 mb-2">Butuh Bantuan?</h3>
              <p className="text-sm text-blue-800 mb-3">
                Jika ada pertanyaan mengenai status pengajuan, silakan hubungi admin.
              </p>
              <a
                href="mailto:admin@ikaunimed.or.id"
                className="inline-block text-sm font-semibold text-blue-600 hover:text-blue-700 underline"
              >
                Hubungi Admin
              </a>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
