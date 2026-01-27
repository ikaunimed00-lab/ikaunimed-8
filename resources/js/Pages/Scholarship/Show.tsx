import React from 'react';
import { Head, Link } from '@inertiajs/react';
import MainLayout from '@/components/MainLayout';
import { ArrowLeft, GraduationCap, Calendar, Building2, ExternalLink, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { route } from 'ziggy-js';

interface Scholarship {
  id: number;
  title: string;
  provider: string;
  degree: string;
  description: string;
  coverage_type: string;
  deadline?: string;
  link?: string;
  image?: string;
  slug: string;
  created_at: string;
}

interface Props {
  scholarship: Scholarship;
  related: Scholarship[];
}

export default function Show({ scholarship, related }: Props) {
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Tidak ditentukan';
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: scholarship.title,
          text: `Cek beasiswa ini: ${scholarship.title} dari ${scholarship.provider}`,
          url: window.location.href,
        });
      } catch (err) {
        console.error('Share failed:', err);
      }
    } else {
        navigator.clipboard.writeText(window.location.href);
        alert('Link telah disalin ke clipboard!');
    }
  };

  return (
    <MainLayout variant="full">
      <Head title={`${scholarship.title} - ${scholarship.provider}`} />

      <div className="bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto px-4 py-8">
            <Link
                href={route('scholarships.index')}
                className="inline-flex items-center text-gray-500 hover:text-blue-600 mb-6 transition-colors"
            >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Kembali ke Daftar Beasiswa
            </Link>

            <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="w-full md:w-32 h-32 bg-white rounded-lg shadow-sm border border-gray-200 flex items-center justify-center p-2 flex-shrink-0">
                    {scholarship.image ? (
                        <img src={`/storage/${scholarship.image}`} alt={scholarship.provider} className="w-full h-full object-contain" />
                    ) : (
                        <GraduationCap className="w-12 h-12 text-gray-300" />
                    )}
                </div>
                
                <div className="flex-1">
                    <div className="flex flex-wrap gap-2 mb-3">
                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
                            {scholarship.degree}
                        </span>
                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                            {scholarship.coverage_type}
                        </span>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{scholarship.title}</h1>
                    <div className="flex items-center text-gray-600 mb-6 text-lg">
                        <Building2 className="w-5 h-5 mr-2" />
                        {scholarship.provider}
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                         <div className="flex items-center bg-white px-3 py-1.5 rounded border border-gray-200">
                            <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                            Deadline: <span className="font-medium text-gray-900 ml-1">{formatDate(scholarship.deadline)}</span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-3 w-full md:w-auto">
                    {scholarship.link && (
                        <a href={scholarship.link} target="_blank" rel="noopener noreferrer">
                            <Button className="w-full bg-blue-600 hover:bg-blue-700">
                                Daftar Sekarang
                                <ExternalLink className="w-4 h-4 ml-2" />
                            </Button>
                        </a>
                    )}
                    <Button variant="outline" onClick={handleShare} className="w-full">
                        <Share2 className="w-4 h-4 mr-2" />
                        Bagikan
                    </Button>
                </div>
            </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
                <section className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                    <h2 className="text-xl font-bold text-gray-900 mb-6 border-b pb-2">Deskripsi Beasiswa</h2>
                    <div 
                        className="prose prose-blue max-w-none text-gray-600"
                        dangerouslySetInnerHTML={{ __html: scholarship.description }}
                    />
                </section>
            </div>

            {/* Sidebar / Related */}
            <div className="space-y-8">
                {related.length > 0 && (
                    <section>
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Beasiswa Sejenis</h3>
                        <div className="space-y-4">
                            {related.map((item) => (
                                <Link 
                                    key={item.id} 
                                    href={route('scholarships.show', item.slug)}
                                    className="block bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
                                >
                                    <h4 className="font-bold text-gray-900 line-clamp-2 mb-1 group-hover:text-blue-600">
                                        {item.title}
                                    </h4>
                                    <div className="text-sm text-gray-500 mb-2">{item.provider}</div>
                                    <div className="flex items-center justify-between text-xs">
                                        <span className="bg-gray-100 px-2 py-0.5 rounded text-gray-600">{item.degree}</span>
                                        <span className="text-gray-400">{formatDate(item.deadline)}</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
      </div>
    </MainLayout>
  );
}
