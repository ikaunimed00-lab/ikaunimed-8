import { Head, useForm, Link } from '@inertiajs/react';
import { route } from 'ziggy-js';
import SubscriberLayout from "@/Layouts/SubscriberLayout";
import React from 'react';

export default function Create({ user }: any) {
  const { data, setData, post, processing, errors } = useForm({
    jenjang: '',
    tahun_lulus: new Date().getFullYear().toString(),
    jumlah_lembar: 1,
    tujuan: '',
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route('legalization.store'));
  };

  return (
    <SubscriberLayout>
      <Head title="Ajukan Legalisir" />

      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Ajukan Legalisir Baru</h1>

        <div className="bg-white rounded-xl shadow-sm border p-6">
          <form onSubmit={submit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Jenjang Pendidikan</label>
              <select
                value={data.jenjang}
                onChange={e => setData('jenjang', e.target.value)}
                className="w-full border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Pilih Jenjang</option>
                <option value="S1">S1 - Sarjana</option>
                <option value="S2">S2 - Magister</option>
                <option value="S3">S3 - Doktor</option>
                <option value="D3">D3 - Diploma</option>
              </select>
              {errors.jenjang && <div className="text-red-500 text-sm mt-1">{errors.jenjang}</div>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tahun Lulus</label>
              <input
                type="number"
                value={data.tahun_lulus}
                onChange={e => setData('tahun_lulus', e.target.value)}
                className="w-full border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.tahun_lulus && <div className="text-red-500 text-sm mt-1">{errors.tahun_lulus}</div>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Jumlah Lembar</label>
              <input
                type="number"
                min="1"
                value={data.jumlah_lembar}
                onChange={e => setData('jumlah_lembar', parseInt(e.target.value))}
                className="w-full border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.jumlah_lembar && <div className="text-red-500 text-sm mt-1">{errors.jumlah_lembar}</div>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Keperluan / Tujuan</label>
              <textarea
                value={data.tujuan}
                onChange={e => setData('tujuan', e.target.value)}
                className="w-full border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                rows={3}
                placeholder="Contoh: Melamar CPNS, Studi Lanjut, dll."
              />
              {errors.tujuan && <div className="text-red-500 text-sm mt-1">{errors.tujuan}</div>}
            </div>

            <div className="flex gap-4">
                <Link
                    href={route('legalization.index')}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-center"
                >
                    Batal
                </Link>
                <button
                    type="submit"
                    disabled={processing}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                    Ajukan
                </button>
            </div>
          </form>
        </div>
      </div>
    </SubscriberLayout>
  );
}
