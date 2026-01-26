import React, { useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/components/ui/use-toast'; // Assuming you have this or similar
import { Loader2 } from 'lucide-react';

interface MemberModalProps {
    isOpen: boolean;
    onClose: () => void;
    organizationId: number;
    member: any | null; // If null, create mode
}

export default function MemberModal({ isOpen, onClose, organizationId, member }: MemberModalProps) {
    const isEdit = !!member;
    
    const { data, setData, post, put, processing, errors, reset, clearErrors } = useForm({
        name: '',
        position: '',
        department: '',
        image: null as File | null,
        is_active: true,
    });

    useEffect(() => {
        if (isOpen) {
            if (member) {
                setData({
                    name: member.name,
                    position: member.position,
                    department: member.department || '',
                    image: null, // Don't prefill file input
                    is_active: member.is_active,
                });
            } else {
                reset();
                setData('is_active', true);
            }
            clearErrors();
        }
    }, [isOpen, member]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (isEdit) {
            post(route('dashboard.admin.members.update', member.id), {
                forceFormData: true,
                onSuccess: () => {
                    reset();
                    onClose();
                },
                transform: (data) => ({
                    ...data,
                    _method: 'put',
                }),
            });
        } else {
            post(route('dashboard.admin.organizations.members.store', organizationId), {
                forceFormData: true,
                onSuccess: () => {
                    reset();
                    onClose();
                },
            });
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{isEdit ? 'Edit Anggota' : 'Tambah Anggota'}</DialogTitle>
                </DialogHeader>
                
                <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Nama Lengkap <span className="text-red-500">*</span></Label>
                        <Input
                            id="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            placeholder="Contoh: Dr. Budi Santoso, M.Pd"
                            className={errors.name ? 'border-red-500' : ''}
                        />
                        {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="position">Jabatan <span className="text-red-500">*</span></Label>
                        <Input
                            id="position"
                            value={data.position}
                            onChange={(e) => setData('position', e.target.value)}
                            placeholder="Contoh: Ketua Umum"
                            className={errors.position ? 'border-red-500' : ''}
                        />
                        {errors.position && <p className="text-xs text-red-500">{errors.position}</p>}
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="department">Departemen / Bidang</Label>
                        <Input
                            id="department"
                            value={data.department}
                            onChange={(e) => setData('department', e.target.value)}
                            placeholder="Kosongkan untuk Pengurus Inti"
                        />
                        <p className="text-[10px] text-gray-500">
                            Isi nama departemen untuk mengelompokkan (misal: "Bidang Pendidikan"). Kosongkan jika anggota inti (Ketua, Sekretaris, dll).
                        </p>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="image">Foto Profil</Label>
                        <Input
                            id="image"
                            type="file"
                            accept="image/*"
                            onChange={(e) => setData('image', e.target.files ? e.target.files[0] : null)}
                        />
                        {errors.image && <p className="text-xs text-red-500">{errors.image}</p>}
                        {isEdit && member.image && !data.image && (
                            <p className="text-xs text-blue-600">Foto saat ini sudah ada. Biarkan kosong jika tidak ingin mengubah.</p>
                        )}
                    </div>

                    <div className="flex items-center space-x-2">
                        <Checkbox 
                            id="is_active" 
                            checked={data.is_active}
                            onCheckedChange={(checked) => setData('is_active', checked as boolean)}
                        />
                        <Label htmlFor="is_active" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Status Aktif
                        </Label>
                    </div>

                    <DialogFooter className="mt-4">
                        <Button type="button" variant="outline" onClick={onClose}>Batal</Button>
                        <Button type="submit" disabled={processing}>
                            {processing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {isEdit ? 'Simpan Perubahan' : 'Tambahkan'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
