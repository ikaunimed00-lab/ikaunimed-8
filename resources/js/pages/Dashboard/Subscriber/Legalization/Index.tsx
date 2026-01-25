import { Link, usePage, Head } from "@inertiajs/react";
import { route } from "ziggy-js";
import { Plus, FileText, Clock, CheckCircle, XCircle } from "lucide-react";
import SubscriberLayout from "@/Layouts/SubscriberLayout";

interface Legalization {
    id: number;
    jenjang: string;
    tahun_lulus: number;
    jumlah: number;
    tujuan: string;
    status: string;
    created_at: string;
}

export default function Index({ legalizations }: { legalizations: Legalization[] }) {
    const { flash }: any = usePage().props;

    const statusMap: any = {
        submitted: { label: "Menunggu", icon: Clock, color: "text-yellow-600 bg-yellow-50" },
        verified: { label: "Terverifikasi", icon: CheckCircle, color: "text-blue-600 bg-blue-50" },
        approved: { label: "Disetujui", icon: CheckCircle, color: "text-green-600 bg-green-50" },
        rejected: { label: "Ditolak", icon: XCircle, color: "text-red-600 bg-red-50" },
        completed: { label: "Selesai", icon: CheckCircle, color: "text-gray-600 bg-gray-50" },
    };

    return (
        <SubscriberLayout>
            <Head title="Legalisir Ijazah" />
            
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Riwayat Legalisir</h1>
                <Link
                    href={route('legalization.create')}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                    <Plus size={20} />
                    Ajukan Baru
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="p-4 font-medium text-gray-500">Tanggal</th>
                            <th className="p-4 font-medium text-gray-500">Jenjang</th>
                            <th className="p-4 font-medium text-gray-500">Keperluan</th>
                            <th className="p-4 font-medium text-gray-500">Status</th>
                            <th className="p-4 font-medium text-gray-500">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {legalizations.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="p-8 text-center text-gray-500">
                                    Belum ada pengajuan legalisir.
                                </td>
                            </tr>
                        ) : (
                            legalizations.map((item) => {
                                const StatusIcon = statusMap[item.status]?.icon || Clock;
                                return (
                                    <tr key={item.id} className="hover:bg-gray-50">
                                        <td className="p-4">
                                            {new Date(item.created_at).toLocaleDateString("id-ID")}
                                        </td>
                                        <td className="p-4">{item.jenjang} ({item.tahun_lulus})</td>
                                        <td className="p-4">{item.tujuan}</td>
                                        <td className="p-4">
                                            <span className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm w-fit ${statusMap[item.status]?.color}`}>
                                                <StatusIcon size={16} />
                                                {statusMap[item.status]?.label || item.status}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <Link
                                                href={route('legalization.show', item.id)}
                                                className="text-blue-600 hover:text-blue-800 font-medium"
                                            >
                                                Detail
                                            </Link>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>
        </SubscriberLayout>
    );
}
