import { Head } from '@inertiajs/react';
import MainLayout from '@/components/MainLayout';

export default function Videos() {
    return (
        <MainLayout>
            <Head title="Galeri Video" />
            <div className="container mx-auto px-4 py-12">
                <h1 className="text-3xl font-bold mb-6">Galeri Video</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-black/5 h-64 rounded-lg flex items-center justify-center text-gray-500">
                        Video 1
                    </div>
                    <div className="bg-black/5 h-64 rounded-lg flex items-center justify-center text-gray-500">
                        Video 2
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
