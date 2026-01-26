import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Pencil, Trash2, ArrowUp, ArrowDown, User } from 'lucide-react';

interface MemberItemProps {
    member: any;
    onEdit: (member: any) => void;
    onDelete: (id: number) => void;
    onMoveUp: (id: number) => void;
    onMoveDown: (id: number) => void;
    isFirst: boolean;
    isLast: boolean;
}

export default function MemberItem({ 
    member, 
    onEdit, 
    onDelete, 
    onMoveUp, 
    onMoveDown,
    isFirst,
    isLast 
}: MemberItemProps) {
    return (
        <div className="group flex items-center justify-between p-3 mb-2 bg-white border border-slate-200 rounded-lg shadow-sm hover:border-red-200 hover:shadow-md transition-all">
            <div className="flex items-center gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center">
                    {member.image ? (
                        <img 
                            src={`/storage/${member.image}`} 
                            alt={member.name} 
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <User className="w-5 h-5 text-slate-400" />
                    )}
                </div>
                <div>
                    <h4 className="font-medium text-slate-900">{member.name}</h4>
                    <div className="flex items-center gap-2">
                        <p className="text-xs text-slate-500 font-semibold uppercase">{member.position}</p>
                        {!member.is_active && (
                            <Badge variant="destructive" className="text-[10px] px-1 py-0 h-4">Non-Aktif</Badge>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                <div className="flex flex-col mr-2 border-r border-slate-100 pr-2">
                    <button 
                        onClick={() => onMoveUp(member.id)}
                        disabled={isFirst}
                        className="p-1 text-slate-400 hover:text-slate-600 disabled:opacity-20 hover:bg-slate-50 rounded"
                        title="Geser ke Atas"
                    >
                        <ArrowUp className="w-3 h-3" />
                    </button>
                    <button 
                        onClick={() => onMoveDown(member.id)}
                        disabled={isLast}
                        className="p-1 text-slate-400 hover:text-slate-600 disabled:opacity-20 hover:bg-slate-50 rounded"
                        title="Geser ke Bawah"
                    >
                        <ArrowDown className="w-3 h-3" />
                    </button>
                </div>

                <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 text-slate-500 hover:text-blue-600 hover:bg-blue-50"
                    onClick={() => onEdit(member)}
                >
                    <Pencil className="w-4 h-4" />
                </Button>
                
                <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 text-slate-500 hover:text-red-600 hover:bg-red-50"
                    onClick={() => onDelete(member.id)}
                >
                    <Trash2 className="w-4 h-4" />
                </Button>
            </div>
        </div>
    );
}
