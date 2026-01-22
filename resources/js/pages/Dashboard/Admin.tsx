import React, { useState } from "react";
import { Link } from "@inertiajs/react";
import { route } from "ziggy-js";
import AdminLayout from "@/Layouts/AdminLayout";
import { getStatusColor, getStatusBadge } from "@/components/DashboardLayout";

interface Legalization {
  id: number;
  user: any;
  jenjang: string;
  tahun_lulus: number;
  status: string;
  submitted_at: string;
}

interface AdminDashboardProps {
  user: any;
  legalizations: {
    data: Legalization[];
    links: any;
    meta: any;
  };
  notifications: any[];
  stats: Record<string, number>;
  recentActivities: any[];
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({
  legalizations,
  stats,
  recentActivities,
}) => {
  const [filterStatus] = useState("all");
  const [searchQuery] = useState("");

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a
            href={route("dashboard.admin.legalizations.index")}
            className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg p-6 hover:shadow-lg transition-shadow"
          >
            <h3 className="text-lg font-semibold mb-2">Kelola Legalisir</h3>
            <p className="text-blue-100 text-sm">
              Review dan approve pengajuan
            </p>
          </a>

          <a
            href={route("admin.users.index")}
            className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-lg p-6 hover:shadow-lg transition-shadow"
          >
            <h3 className="text-lg font-semibold mb-2">Kelola User</h3>
            <p className="text-purple-100 text-sm">
              Manage pengguna sistem
            </p>
          </a>
        </div>

        {/* Legalization Overview */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b">
            <h3 className="text-lg font-semibold">
              Pengajuan Legalisir Terbaru
            </h3>
            <p className="text-sm text-gray-600">
              {stats.total_submissions} total pengajuan
            </p>
          </div>

          {legalizations.data.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              Tidak ada pengajuan legalisir
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs">User</th>
                  <th className="px-6 py-3 text-left text-xs">Jenjang</th>
                  <th className="px-6 py-3 text-left text-xs">Status</th>
                  <th className="px-6 py-3 text-left text-xs">Tgl Submit</th>
                  <th className="px-6 py-3 text-left text-xs">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {legalizations.data.map((item) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4">
                      <div className="font-medium">{item.user.name}</div>
                      <div className="text-xs text-gray-500">
                        {item.user.email}
                      </div>
                    </td>
                    <td className="px-6 py-4">{item.jenjang}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 text-xs rounded border ${getStatusColor(
                          item.status
                        )}`}
                      >
                        {getStatusBadge(item.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {new Date(item.submitted_at).toLocaleDateString("id-ID")}
                    </td>
                    <td className="px-6 py-4">
                      <Link
                        href={route(
                          "dashboard.admin.legalizations.show",
                          item.id
                        )}
                        className="text-blue-600 hover:underline"
                      >
                        Review
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Recent Activities */}
        {recentActivities.length > 0 && (
          <div className="bg-white rounded-lg border p-6">
            <h3 className="font-semibold mb-4">Aktivitas Terbaru</h3>
            <div className="space-y-3">
              {recentActivities.map((a) => (
                <div
                  key={a.id}
                  className="flex justify-between border-b pb-2"
                >
                  <div>
                    <div className="text-sm font-medium">
                      {a.user.name} mengajukan legalisir
                    </div>
                    <div className="text-xs text-gray-500">
                      {new Date(a.created_at).toLocaleDateString("id-ID")}
                    </div>
                  </div>
                  <span
                    className={`px-2 py-1 text-xs rounded border ${getStatusColor(
                      a.status
                    )}`}
                  >
                    {getStatusBadge(a.status)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
