import { Link, usePage } from "@inertiajs/react";
import { route } from "ziggy-js";
import { Plus, FileText, Clock, CheckCircle, XCircle } from "lucide-react";
import SubscriberLayout from "@/layouts/SubscriberLayout";

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
        submitted: { label: "Menunggu", icon: Clock, color: "text-yellow-600" },
        completed: { label: "Selesai", icon: CheckCircle, color: "text-green-600" },
        rejected: { label: "Ditolak", icon: XCircle, color: "text-red-600" },
    };

    return (
        <SubscriberLayout>
            <div className="space-y-6">
                {flash?.success && (
                    <div className="p-4 bg-green-100 text-green-800 rounded">
                        {flash.success}
                    </div>
                )}

                <Link
                    href={route("legalization.create")}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded"
                >
                    <Plus size={16} /> Ajukan Legalisir
                </Link>

                {legalizations.length === 0 ? (
                    <div className="text-center text-slate-500 mt-12">
                        Belum ada pengajuan
                    </div>
                ) : (
                    <div className="space-y-4">
                        {legalizations.map((item) => {
                            const s = statusMap[item.status] ?? statusMap.submitted;
                            const Icon = s.icon;

                            return (
                                <Link
                                    key={item.id}
                                    href={route("legalization.show", item.id)}
                                    className="block bg-white p-6 rounded shadow"
                                >
                                    <div className="flex justify-between">
                                        <div>
                                            <h3 className="font-bold">{item.jenjang}</h3>
                                            <div className={`flex items-center gap-2 ${s.color}`}>
                                                <Icon size={16} /> {s.label}
                                            </div>
                                        </div>
                                        <div className="text-sm text-slate-500">
                                            {new Date(item.created_at).toLocaleDateString("id-ID")}
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                )}
            </div>
        </SubscriberLayout>
    );
}
