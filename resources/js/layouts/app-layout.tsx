import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import { type BreadcrumbItem } from '@/types';
import { type ReactNode } from 'react';
import { Head } from '@inertiajs/react';

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
    title?: string;
}

export default function AppLayout({ children, breadcrumbs = [], title, ...props }: AppLayoutProps) {
    return (
        <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
            {/* SEO Dasar untuk Dashboard */}
            <Head title={title} />
            
            {/* Container Utama dengan Padding agar tidak berantakan */}
            <div className="flex flex-1 flex-col gap-4 p-4 py-6 md:p-8">
                <div className="mx-auto w-full max-w-7xl">
                    {children}
                </div>
            </div>
        </AppLayoutTemplate>
    );
}
