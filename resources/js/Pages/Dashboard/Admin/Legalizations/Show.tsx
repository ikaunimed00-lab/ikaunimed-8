import React, { useState } from "react";
import { useForm, Link, router } from "@inertiajs/react";
import { route } from "ziggy-js";
import AdminLayout from "@/Layouts/AdminLayout";

/* ================= HELPERS ================= */
function getStatusColor(status: string) {
  switch (status) {
    case "approved":
      return "bg-green-100 text-green-800 border-green-200";
    case "rejected":
      return "bg-red-100 text-red-800 border-red-200";
    default:
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
  }
}

function getStatusBadge(status: string) {
  switch (status) {
    case "approved":
      return "Disetujui";
    case "rejected":
      return "Ditolak";
    default:
      return "Pending";
  }
}

/* ================= TYPES ================= */
interface LegalizationFile {
  id: number;
  filename: string;
  original_name: string;
  mime_type: string;
  size: number;
}

interface User {
  id: number;
  name: string;
  email: string;
  wa?: string;
}

interface Legalization {
  id: number;
  user: User;
  jenjang: string;
  tahun_lulus: number;
  jumlah_lembar: number;
  tujuan?: string;
  status: string;
  admin_note?: string;
  submitted_at: string;
  verified_at?: string;
  files: LegalizationFile[];
}

interface Props {
  legalization: Legalization;
}

export default function LegalizationDetail({ legalization }: Props) {
  const [rejectNote, setRejectNote] = useState("");
  const [isRejecting, setIsRejecting] = useState(false);

  const { data, setData, post, processing } = useForm({
    note: legalization.admin_note || "",
  });

  const canAction = legalization.status === "pending";

  const approve = () => {
    router.post(route("dashboard.admin.legalizations.approve", legalization.id));
  };

  const reject = () => {
    if (!rejectNote.trim()) return alert("Alasan penolakan wajib diisi");
    router.post(
      route("dashboard.admin.legalizations.reject", legalization.id),
      { note: rejectNote }
    );
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* HEADER */}
        <div className="bg-white border rounded p-6 flex justify-between">
          <div>
            <h1 className="text-2xl font-bold">Detail Legalisasi</h1>
            <p className="text-sm text-gray-500">ID #{legalization.id}</p>
          </div>
          <span className={`px-4 py-2 rounded-full border ${getStatusColor(legalization.status)}`}>
            {getStatusBadge(legalization.status)}
          </span>
        </div>

        {/* USER */}
        <div className="bg-white border rounded p-6">
          <h3 className="font-semibold mb-3">Pemohon</h3>
          <p><strong>Nama:</strong> {legalization.user.name}</p>
          <p><strong>Email:</strong> {legalization.user.email}</p>
          {legalization.user.wa && <p><strong>WA:</strong> {legalization.user.wa}</p>}
        </div>

        {/* DETAIL */}
        <div className="bg-white border rounded p-6 grid grid-cols-2 gap-4">
          <p><strong>Jenjang:</strong> {legalization.jenjang}</p>
          <p><strong>Tahun Lulus:</strong> {legalization.tahun_lulus}</p>
          <p><strong>Jumlah Lembar:</strong> {legalization.jumlah_lembar}</p>
          <p>
            <strong>Tanggal:</strong>{" "}
            {new Date(legalization.submitted_at).toLocaleDateString("id-ID")}
          </p>
          {legalization.tujuan && (
            <p className="col-span-2"><strong>Tujuan:</strong> {legalization.tujuan}</p>
          )}
        </div>

        {/* FILE */}
        {legalization.files.length > 0 && (
          <div className="bg-white border rounded p-6">
            <h3 className="font-semibold mb-3">Dokumen</h3>
            {legalization.files.map((f) => (
              <div key={f.id} className="flex justify-between border-b py-2">
                <span>{f.original_name}</span>
                <a
                  href={`/storage/${f.filename}`}
                  className="text-blue-600"
                  target="_blank"
                >
                  Download
                </a>
              </div>
            ))}
          </div>
        )}

        {/* ADMIN NOTE */}
        <div className="bg-white border rounded p-6">
          <h3 className="font-semibold mb-2">Catatan Admin</h3>
          <textarea
            value={data.note}
            onChange={(e) => setData("note", e.target.value)}
            className="w-full border rounded p-2"
            rows={3}
          />
          <button
            onClick={() =>
              post(route("dashboard.admin.legalizations.update_note", legalization.id))
            }
            disabled={processing}
            className="mt-2 bg-gray-700 text-white px-4 py-2 rounded"
          >
            Simpan
          </button>
        </div>

        {/* ACTION */}
        {canAction && (
          <div className="bg-white border rounded p-6 space-y-3">
            <button
              onClick={approve}
              className="w-full bg-green-600 text-white py-2 rounded"
            >
              Setujui
            </button>

            <button
              onClick={() => setIsRejecting(!isRejecting)}
              className="w-full bg-red-600 text-white py-2 rounded"
            >
              Tolak
            </button>

            {isRejecting && (
              <>
                <textarea
                  value={rejectNote}
                  onChange={(e) => setRejectNote(e.target.value)}
                  className="w-full border rounded p-2"
                  placeholder="Alasan penolakan"
                />
                <button
                  onClick={reject}
                  className="w-full bg-red-700 text-white py-2 rounded"
                >
                  Konfirmasi Penolakan
                </button>
              </>
            )}
          </div>
        )}

        {/* BACK */}
        <Link
          href={route("dashboard.admin.legalizations.index")}
          className="text-blue-600 font-medium"
        >
          ← Kembali
        </Link>
      </div>
    </AdminLayout>
  );
}
