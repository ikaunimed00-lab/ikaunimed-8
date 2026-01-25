import { Head } from '@inertiajs/react';
import MainLayout from '@/components/MainLayout';

export default function Photos() {
    return (
        <MainLayout>
            <Head title="Galeri Foto" />
            <div className="container mx-auto px-4 py-12">
                <h1 className="text-3xl font-bold mb-6">Galeri Foto</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gray-100 h-64 rounded-lg flex items-center justify-center text-gray-500">
                        Foto 1
                    </div>
                    <div className="bg-gray-100 h-64 rounded-lg flex items-center justify-center text-gray-500">
                        Foto 2
                    </div>
                    <div className="bg-gray-100 h-64 rounded-lg flex items-center justify-center text-gray-500">
                        Foto 3
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
