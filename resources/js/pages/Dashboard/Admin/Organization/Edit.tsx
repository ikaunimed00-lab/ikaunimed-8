import { Head, Link, useForm, router } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { ArrowLeft, Save, Building2, Plus, User, CheckCircle2, AlertCircle } from "lucide-react";
import { routeName } from "@/config/sidebar-menu-config";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import MemberItem from "./Partials/MemberItem";
import MemberModal from "./Partials/MemberModal";

interface OrganizationMember {
    id: number;
    name: string;
    position: string;
    department: string | null;
    image: string | null;
    order: number;
    is_active: boolean;
}

export default function OrganizationEdit({ organization, parents, can_change_parent, is_own_organization }: any) {
    const isScoped = !can_change_parent;

    // --- Organization Form ---
    const { data, setData, put, processing, errors } = useForm({
        name: organization.name || "",
        type: organization.type || "dpc",
        parent_id: organization.parent_id || "",
        email: organization.email || "",
        phone: organization.phone || "",
        address: organization.address || "",
        description: organization.description || "",
        is_active: organization.is_active ? true : false,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route("dashboard.admin.organizations.update", organization.id));
    };

    // --- Member Management State ---
    const [selectedMember, setSelectedMember] = useState<OrganizationMember | null>(null);
    const [isMemberModalOpen, setIsMemberModalOpen] = useState(false);
    
    // Local state for members to handle reordering
    const [membersList, setMembersList] = useState<OrganizationMember[]>(organization.members || []);
    const [isOrderDirty, setIsOrderDirty] = useState(false);
    const [isSavingOrder, setIsSavingOrder] = useState(false);

    // Sync when props change (e.g. after CRUD)
    useEffect(() => {
        setMembersList(organization.members || []);
        setIsOrderDirty(false);
    }, [organization.members]);

    // Group members from local state
    const coreMembers = membersList.filter((m) => !m.department);
    const departments = membersList.reduce((acc: any, member: OrganizationMember) => {
        if (member.department) {
            if (!acc[member.department]) {
                acc[member.department] = [];
            }
            acc[member.department].push(member);
        }
        return acc;
    }, {});

    const handleMoveMember = (id: number, direction: 'up' | 'down') => {
        const index = membersList.findIndex(m => m.id === id);
        if (index === -1) return;

        const newMembers = [...membersList];
        
        // Strategy: Find the adjacent member in the SAME group (Core or Department)
        // and swap their positions in the main list.
        
        const member = newMembers[index];
        const isCore = !member.department;
        const groupMembers = isCore 
            ? newMembers.filter(m => !m.department)
            : newMembers.filter(m => m.department === member.department);
        
        const memberIndexInGroup = groupMembers.findIndex(m => m.id === id);
        
        let swapMember = null;

        if (direction === 'up') {
            if (memberIndexInGroup > 0) {
                swapMember = groupMembers[memberIndexInGroup - 1];
            }
        } else {
            if (memberIndexInGroup < groupMembers.length - 1) {
                swapMember = groupMembers[memberIndexInGroup + 1];
            }
        }

        if (swapMember) {
            const swapIndex = newMembers.findIndex(m => m.id === swapMember.id);
            // Swap in the main list
            [newMembers[index], newMembers[swapIndex]] = [newMembers[swapIndex], newMembers[index]];
            
            setMembersList(newMembers);
            setIsOrderDirty(true);
        }
    };

    const handleSaveOrder = () => {
        setIsSavingOrder(true);
        router.post(route("dashboard.admin.organizations.members.reorder", organization.id), {
            members: membersList.map((m, index) => ({ id: m.id, order: index + 1 }))
        }, {
            onSuccess: () => {
                setIsOrderDirty(false);
                setIsSavingOrder(false);
            },
            onError: () => {
                setIsSavingOrder(false);
            }
        });
    };

    const handleDeleteMember = (memberId: number) => {
        if (confirm("Apakah Anda yakin ingin menghapus anggota ini?")) {
            router.delete(route("dashboard.admin.members.destroy", memberId), {
                preserveScroll: true,
                onSuccess: () => {
                    // Toast handled by flash message
                }
            });
        }
    };

    const openCreateModal = () => {
        setSelectedMember(null);
        setIsMemberModalOpen(true);
    };

    const openEditModal = (member: any) => {
        setSelectedMember(member);
        setIsMemberModalOpen(true);
    };

    return (
        <AdminLayout>
            <Head title={`Edit Organisasi: ${organization.name}`} />

            <div className="mx-auto max-w-4xl">
                <div className="mb-6">
                    <Link
                        href={routeName("dashboard.admin.organizations.index")}
                        className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-red-600 transition-colors"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Kembali ke Daftar
                    </Link>
                    <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                        <Building2 className="w-6 h-6 text-red-600" />
                        Edit Organisasi
                    </h1>
                </div>

                <Tabs defaultValue="details" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-6">
                        <TabsTrigger value="details">Detail Organisasi</TabsTrigger>
                        <TabsTrigger value="members">Manajemen Anggota</TabsTrigger>
                    </TabsList>

                    <TabsContent value="details">
                        <form onSubmit={handleSubmit} className="space-y-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                            {/* Status Toggle */}
                            <div className="flex items-center justify-end">
                                <label className="flex items-center cursor-pointer gap-2">
                                    <span className="text-sm font-medium text-slate-700">Status Aktif</span>
                                    <div className="relative">
                                        <input 
                                            type="checkbox" 
                                            className="sr-only peer"
                                            checked={data.is_active}
                                            onChange={(e) => setData("is_active", e.target.checked)}
                                            disabled={isScoped && is_own_organization}
                                        />
                                        <div className={`w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600 ${isScoped && is_own_organization ? 'opacity-50 cursor-not-allowed' : ''}`}></div>
                                    </div>
                                </label>
                            </div>

                            {/* Basic Info */}
                            <div className="grid gap-6 md:grid-cols-2">
                                <div className="col-span-2">
                                    <label className="mb-2 block text-sm font-medium text-slate-700">
                                        Nama Organisasi <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData("name", e.target.value)}
                                        className={`w-full rounded-lg border px-4 py-2 text-sm focus:outline-none focus:ring-2 ${
                                            errors.name
                                                ? "border-red-300 focus:ring-red-200"
                                                : "border-slate-200 focus:border-red-500 focus:ring-red-100"
                                        }`}
                                    />
                                    {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-slate-700">
                                        Tipe Organisasi <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        value={data.type}
                                        onChange={(e) => setData("type", e.target.value)}
                                        className="w-full rounded-lg border border-slate-200 px-4 py-2 text-sm focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-100 disabled:bg-slate-100 disabled:text-slate-500"
                                        disabled={isScoped}
                                    >
                                        <option value="pp">Pengurus Pusat (PP)</option>
                                        <option value="dpw">Pengurus Wilayah (DPW)</option>
                                        <option value="dpc">Pengurus Cabang (DPC)</option>
                                    </select>
                                    {errors.type && <p className="mt-1 text-xs text-red-600">{errors.type}</p>}
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-slate-700">
                                        Induk Organisasi (Parent)
                                    </label>
                                    <select
                                        value={data.parent_id}
                                        onChange={(e) => setData("parent_id", e.target.value)}
                                        className="w-full rounded-lg border border-slate-200 px-4 py-2 text-sm focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-100 disabled:bg-slate-100 disabled:text-slate-500"
                                        disabled={data.type === 'pp' || isScoped}
                                    >
                                        <option value="">-- Tidak Ada / Langsung --</option>
                                        {parents.map((p: any) => (
                                            <option key={p.id} value={p.id}>
                                                {p.name} ({p.type.toUpperCase()})
                                            </option>
                                        ))}
                                    </select>
                                    {errors.parent_id && <p className="mt-1 text-xs text-red-600">{errors.parent_id}</p>}
                                </div>
                            </div>

                            <hr className="border-slate-100" />

                            {/* Contact Info */}
                            <div className="grid gap-6 md:grid-cols-2">
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-slate-700">Email Resmi</label>
                                    <input
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData("email", e.target.value)}
                                        className="w-full rounded-lg border border-slate-200 px-4 py-2 text-sm focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-100"
                                    />
                                    {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-slate-700">Telepon / WA</label>
                                    <input
                                        type="text"
                                        value={data.phone}
                                        onChange={(e) => setData("phone", e.target.value)}
                                        className="w-full rounded-lg border border-slate-200 px-4 py-2 text-sm focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-100"
                                    />
                                    {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone}</p>}
                                </div>

                                <div className="col-span-2">
                                    <label className="mb-2 block text-sm font-medium text-slate-700">Alamat Lengkap</label>
                                    <textarea
                                        value={data.address}
                                        onChange={(e) => setData("address", e.target.value)}
                                        rows={3}
                                        className="w-full rounded-lg border border-slate-200 px-4 py-2 text-sm focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-100"
                                    ></textarea>
                                    {errors.address && <p className="mt-1 text-xs text-red-600">{errors.address}</p>}
                                </div>

                                <div className="col-span-2">
                                    <label className="mb-2 block text-sm font-medium text-slate-700">Deskripsi Singkat</label>
                                    <textarea
                                        value={data.description}
                                        onChange={(e) => setData("description", e.target.value)}
                                        rows={2}
                                        className="w-full rounded-lg border border-slate-200 px-4 py-2 text-sm focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-100"
                                    ></textarea>
                                    {errors.description && <p className="mt-1 text-xs text-red-600">{errors.description}</p>}
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 pt-4">
                                <Link
                                    href={routeName("dashboard.admin.organizations.index")}
                                    className="rounded-lg border border-slate-200 bg-white px-6 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
                                >
                                    Batal
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-6 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50 transition-colors"
                                >
                                    <Save className="h-4 w-4" />
                                    {processing ? "Menyimpan..." : "Simpan Perubahan"}
                                </button>
                            </div>
                        </form>
                    </TabsContent>

                    <TabsContent value="members" className="space-y-6">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <div>
                                <h2 className="text-lg font-semibold text-slate-800">Daftar Anggota</h2>
                                <p className="text-sm text-slate-500">Kelola struktur kepengurusan organisasi.</p>
                            </div>
                            <div className="flex items-center gap-3">
                                {isOrderDirty && (
                                    <Button 
                                        onClick={handleSaveOrder} 
                                        disabled={isSavingOrder}
                                        variant="outline"
                                        className="border-yellow-400 bg-yellow-50 text-yellow-700 hover:bg-yellow-100 hover:text-yellow-800"
                                    >
                                        {isSavingOrder ? (
                                            "Menyimpan..."
                                        ) : (
                                            <>
                                                <CheckCircle2 className="w-4 h-4 mr-2" />
                                                Simpan Urutan
                                            </>
                                        )}
                                    </Button>
                                )}
                                <Button
                                    onClick={openCreateModal}
                                    className="bg-red-600 hover:bg-red-700 text-white"
                                >
                                    <Plus className="h-4 w-4 mr-2" />
                                    Tambah Anggota
                                </Button>
                            </div>
                        </div>

                        {/* Order Warning */}
                        {isOrderDirty && (
                            <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-lg flex items-center gap-2 text-sm">
                                <AlertCircle className="w-4 h-4" />
                                Anda telah mengubah urutan anggota. Jangan lupa klik "Simpan Urutan" untuk menerapkannya.
                            </div>
                        )}

                        {/* Core Members */}
                        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                            <h3 className="mb-4 text-md font-semibold text-slate-700 flex items-center gap-2">
                                <User className="w-5 h-5 text-red-600" />
                                Pengurus Inti (Non-Departemen)
                            </h3>
                            <div className="space-y-3">
                                {coreMembers.length > 0 ? (
                                    coreMembers.map((member: OrganizationMember, index: number) => (
                                        <MemberItem 
                                            key={member.id} 
                                            member={member} 
                                            onEdit={openEditModal} 
                                            onDelete={handleDeleteMember} 
                                            onMoveUp={() => handleMoveMember(member.id, 'up')}
                                            onMoveDown={() => handleMoveMember(member.id, 'down')}
                                            isFirst={index === 0}
                                            isLast={index === coreMembers.length - 1}
                                        />
                                    ))
                                ) : (
                                    <p className="text-sm text-slate-500 italic">Belum ada pengurus inti.</p>
                                )}
                            </div>
                        </div>

                        {/* Departments */}
                        {Object.keys(departments).length > 0 && (
                            <Accordion type="multiple" className="w-full space-y-4">
                                {Object.entries(departments).map(([deptName, deptMembers]: [string, any]) => (
                                    <AccordionItem key={deptName} value={deptName} className="border border-slate-200 rounded-xl bg-white px-4 shadow-sm">
                                        <AccordionTrigger className="hover:no-underline">
                                            <div className="flex items-center gap-3">
                                                <Building2 className="w-5 h-5 text-slate-500" />
                                                <span className="font-semibold text-slate-700">{deptName}</span>
                                                <Badge variant="secondary" className="ml-2">
                                                    {deptMembers.length} Anggota
                                                </Badge>
                                            </div>
                                        </AccordionTrigger>
                                        <AccordionContent className="pt-2 pb-4 space-y-3">
                                            {deptMembers.map((member: OrganizationMember, index: number) => (
                                                <MemberItem 
                                                    key={member.id} 
                                                    member={member} 
                                                    onEdit={openEditModal} 
                                                    onDelete={handleDeleteMember}
                                                    onMoveUp={() => handleMoveMember(member.id, 'up')}
                                                    onMoveDown={() => handleMoveMember(member.id, 'down')}
                                                    isFirst={index === 0}
                                                    isLast={index === deptMembers.length - 1}
                                                />
                                            ))}
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        )}
                    </TabsContent>
                </Tabs>
            </div>

            {/* Member Modal */}
            <MemberModal 
                isOpen={isMemberModalOpen} 
                onClose={() => setIsMemberModalOpen(false)} 
                member={selectedMember} 
                organizationId={organization.id} 
            />
        </AdminLayout>
    );
}
