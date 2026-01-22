import React, { useState } from "react";
import { Link, router } from "@inertiajs/react";
import { route } from "ziggy-js";
import AdminLayout from "@/Layouts/AdminLayout";

interface User {
  id: number;
  name: string;
  email: string;
}

interface Legalization {
  id: number;
  user: User;
  jenjang: string;
  tahun_lulus: number;
  status: string;
  submitted_at: string;
}

interface Props {
  legalizations: {
    data: Legalization[];
    links: any[];
    meta: {
      total: number;
      last_page: number;
    };
  };
  filters: {
    status?: string;
    search?: string;
    from_date?: string;
    to_date?: string;
  };
}

export default function Legalizations({ legalizations, filters }: Props) {
  const [status, setStatus] = useState(filters.status || "all");
  const [search, setSearch] = useState(filters.search || "");
  const [fromDate, setFromDate] = useState(filters.from_date || "");
  const [toDate, setToDate] = useState(filters.to_date || "");

  const applyFilter = () => {
    router.get(route("dashboard.admin.legalizations.index"), {
      status,
      search,
      from_date: fromDate,
      to_date: toDate,
    });
  };

  const resetFilter = () => {
    router.get(route("dashboard.admin.legalizations.index"));
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Kelola Legalisasi</h1>

        {/* FILTER */}
        <div className="bg-white p-4 rounded border grid grid-cols-5 gap-3">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Nama / Email"
            className="border p-2 rounded"
          />

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="all">Semua Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>

          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="border p-2 rounded"
          />

          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="border p-2 rounded"
          />

          <div className="flex gap-2">
            <button onClick={applyFilter} className="bg-blue-600 text-white px-4 rounded">
              Filter
            </button>
            <button onClick={resetFilter} className="bg-gray-300 px-4 rounded">
              Reset
            </button>
          </div>
        </div>

        {/* TABLE */}
        <div className="bg-white rounded border overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="p-3 text-left">User</th>
                <th className="p-3">Jenjang</th>
                <th className="p-3">Status</th>
                <th className="p-3">Tanggal</th>
                <th className="p-3">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {legalizations.data.map((l) => (
                <tr key={l.id} className="border-t">
                  <td className="p-3">
                    {l.user.name}
                    <div className="text-xs text-gray-500">{l.user.email}</div>
                  </td>
                  <td className="p-3 text-center">{l.jenjang}</td>
                  <td className="p-3 text-center">{l.status}</td>
                  <td className="p-3 text-center">
                    {new Date(l.submitted_at).toLocaleDateString("id-ID")}
                  </td>
                  <td className="p-3 text-center">
                    <Link
                      href={route("dashboard.admin.legalizations.show", l.id)}
                      className="text-blue-600"
                    >
                      Review
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
