import React, { useState } from "react";
import { useForm } from "@inertiajs/react";
import { route } from "ziggy-js";

interface LegalizationFormProps {
  initialData?: any;
  onSubmit?: (data: any) => void;
  isEditing?: boolean;
}

interface FormData {
  jenjang: string;
  tahun_lulus: number | "";
  jumlah_lembar: number | "";
  tujuan: string;
  documents: File[];
}

export const LegalizationForm: React.FC<LegalizationFormProps> = ({
  initialData,
  onSubmit,
  isEditing = false,
}) => {
  const { data, setData, post, processing, errors } = useForm<FormData>({
    jenjang: initialData?.jenjang || "",
    tahun_lulus: initialData?.tahun_lulus || "",
    jumlah_lembar: initialData?.jumlah_lembar || "",
    tujuan: initialData?.tujuan || "",
    documents: [],
  });

  const [documentPreviews, setDocumentPreviews] = useState<any[]>(
    initialData?.files || []
  );
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleDocumentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setData("documents", files);

    // Create previews
    const previews = files.map((file) => ({
      name: file.name,
      size: file.size,
      type: file.type,
      file,
    }));
    setDocumentPreviews((prev) => [...prev, ...previews]);
  };

  const removeDocument = (index: number) => {
    setDocumentPreviews((prev) => prev.filter((_, i) => i !== index));
    setData(
      "documents",
      data.documents.filter((_, i) => i !== index)
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!data.jenjang || !data.tahun_lulus || !data.jumlah_lembar) {
      alert("Silahkan isi semua field yang wajib diisi");
      return;
    }

    if (documentPreviews.length === 0) {
      alert("Silahkan upload minimal satu dokumen");
      return;
    }

    // Submit form
    post(route("legalization.store"), {
      onSuccess: () => {
        alert("Pengajuan legalisir berhasil diajukan!");
        setDocumentPreviews([]);
      },
      onError: () => {
        alert("Terjadi kesalahan saat mengajukan legalisir");
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Jenjang */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Jenjang Pendidikan *
        </label>
        <select
          value={data.jenjang}
          onChange={(e) => setData("jenjang", e.target.value)}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            errors.jenjang ? "border-red-500" : "border-gray-300"
          }`}
        >
          <option value="">-- Pilih Jenjang --</option>
          <option value="D3">Diploma 3 (D3)</option>
          <option value="S1">Sarjana (S1)</option>
          <option value="S2">Magister (S2)</option>
          <option value="S3">Doktor (S3)</option>
        </select>
        {errors.jenjang && (
          <p className="text-red-600 text-sm mt-1">{errors.jenjang}</p>
        )}
      </div>

      {/* Tahun Lulus */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tahun Lulus *
          </label>
          <input
            type="number"
            value={data.tahun_lulus}
            onChange={(e) => setData("tahun_lulus", parseInt(e.target.value))}
            placeholder="Cth: 2023"
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.tahun_lulus ? "border-red-500" : "border-gray-300"
            }`}
            min={1990}
            max={new Date().getFullYear()}
          />
          {errors.tahun_lulus && (
            <p className="text-red-600 text-sm mt-1">{errors.tahun_lulus}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Jumlah Lembar *
          </label>
          <input
            type="number"
            value={data.jumlah_lembar}
            onChange={(e) =>
              setData("jumlah_lembar", parseInt(e.target.value))
            }
            placeholder="Cth: 1"
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.jumlah_lembar ? "border-red-500" : "border-gray-300"
            }`}
            min={1}
            max={100}
          />
          {errors.jumlah_lembar && (
            <p className="text-red-600 text-sm mt-1">{errors.jumlah_lembar}</p>
          )}
        </div>
      </div>

      {/* Tujuan */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Tujuan Legalisir
        </label>
        <textarea
          value={data.tujuan}
          onChange={(e) => setData("tujuan", e.target.value)}
          placeholder="Jelaskan tujuan pengajuan legalisir..."
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${
            errors.tujuan ? "border-red-500" : "border-gray-300"
          }`}
          rows={3}
        />
        {errors.tujuan && (
          <p className="text-red-600 text-sm mt-1">{errors.tujuan}</p>
        )}
      </div>

      {/* Document Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Upload Dokumen Ijazah *
        </label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors cursor-pointer">
          <input
            type="file"
            multiple
            onChange={handleDocumentChange}
            className="hidden"
            id="document-upload"
            accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
          />
          <label htmlFor="document-upload" className="cursor-pointer">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20a4 4 0 004 4h24a4 4 0 004-4V20"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M32 4v12m0 0l-4-4m4 4l4-4"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="mt-2 text-sm font-medium text-gray-900">
              Klik atau drag file ke sini
            </p>
            <p className="text-xs text-gray-500 mt-1">
              PDF, JPG, PNG, DOC (max 10MB)
            </p>
          </label>
        </div>
        {errors.documents && (
          <p className="text-red-600 text-sm mt-1">{errors.documents}</p>
        )}
      </div>

      {/* Document List */}
      {documentPreviews.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">
            Dokumen yang Diupload ({documentPreviews.length})
          </h4>
          <div className="space-y-2">
            {documentPreviews.map((doc, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 bg-gray-50 rounded border border-gray-200"
              >
                <div className="flex items-center gap-3">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M8 16.5a1 1 0 11-2 0 1 1 0 012 0zM15 7H4m12 0a1 1 0 011 1v8a1 1 0 01-1 1H4a1 1 0 01-1-1V8a1 1 0 011-1m12 0V6a2 2 0 00-2-2H6a2 2 0 00-2 2v1m12 0H4" />
                  </svg>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {doc.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {(doc.size / 1024).toFixed(2)} KB
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => removeDocument(idx)}
                  className="text-red-600 hover:text-red-900 text-sm font-medium"
                >
                  Hapus
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Submit Button */}
      <div className="flex gap-3">
        <button
          type="submit"
          disabled={processing}
          className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:bg-blue-400"
        >
          {processing ? "Mengirim..." : "Ajukan Legalisir"}
        </button>
      </div>
    </form>
  );
};

export default LegalizationForm;
