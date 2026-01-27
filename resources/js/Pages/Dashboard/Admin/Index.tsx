// File: resources/js/Pages/Dashboard/Admin.tsx
import React from "react";
import { Link, Head } from "@inertiajs/react";
import { route } from "ziggy-js";
import AdminLayout from "@/layouts/AdminLayout";

interface Legalization {
    id: number;
    user: any;
    jenjang: string;
    status: string;
    submitted_at: string;
}

interface AdminDashboardProps {
    legalizations: {
        data: Legalization[];
    };
    stats: Record<string, number>;
    recentActivities: any[];
}

const getStatusColor = (status: string) => {
    switch (status) {
        case "completed":
            return "bg-green-100 text-green-800 border-green-300";
        case "rejected":
            return "bg-red-100 text-red-800 border-red-300";
        case "verified":
            return "bg-blue-100 text-blue-800 border-blue-300";
        case "submitted":
            return "bg-yellow-100 text-yellow-800 border-yellow-300";
        default:
            return "bg-gray-100 text-gray-800 border-gray-300";
    }
};

const getStatusBadge = (status: string) => {
    const labels: Record<string, string> = {
        completed: "Selesai",
        rejected: "Ditolak",
        verified: "Terverifikasi",
        submitted: "Menunggu",
    };
    return labels[status] || status;
};

const AdminDashboard = ({
    legalizations,
    stats,
    recentActivities,
}: AdminDashboardProps) => {
    return (
        <AdminLayout>
            <Head title="Dashboard Admin" />

            <div className="space-y-8">
                {/* HEADER */}
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Dashboard Admin</h1>
                    <p className="text-slate-500">
                        Ringkasan aktivitas sistem
                    </p>
                </div>

                {/* QUICK ACTIONS */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Link
                        href={route("dashboard.admin.legalizations.index")}
                        className="rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl"
                    >
                        <h3 className="font-semibold text-lg">
                            Kelola Legalisir
                        </h3>
                        <p className="text-sm text-blue-100">
                            Review & approval pengajuan
                        </p>
                    </Link>

                    <Link
                        href={route("admin.users.index")}
                        className="rounded-xl bg-gradient-to-r from-purple-600 to-purple-700 text-white p-6 hover:from-purple-700 hover:to-purple-800 transition-all shadow-lg hover:shadow-xl"
                    >
                        <h3 className="font-semibold text-lg">
                            Kelola User
                        </h3>
                        <p className="text-sm text-purple-100">
                            Manage users & roles
                        </p>
                    </Link>
                </div>

                {/* TABLE */}
                <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                    <div className="px-6 py-4 border-b bg-gray-50">
                        <h2 className="font-semibold text-lg text-gray-900">
                            Pengajuan Legalisasi Terbaru
                        </h2>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        User
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        Jenjang
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        Tanggal
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {legalizations.data.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-gray-900">
                                                {item.user.name}
                                            </div>
                                            <div className="text-xs text-gray-500">
                                                {item.user.email}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-900">
                                            {item.jenjang}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={`px-3 py-1 text-xs font-semibold rounded-full border ${getStatusColor(
                                                    item.status
                                                )}`}
                                            >
                                                {getStatusBadge(item.status)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {new Date(
                                                item.submitted_at
                                            ).toLocaleDateString("id-ID")}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminDashboard;