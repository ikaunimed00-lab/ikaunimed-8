import { Head } from "@inertiajs/react";
import WriterLayout from "@/Layouts/WriterLayout";

export default function Preview({ news }: any) {
    return (
        <WriterLayout>
            <Head title={news.title} />

            <div className="max-w-3xl mx-auto py-12 px-4">
                <article className="prose dark:prose-invert max-w-none">
                    <h1>{news.title}</h1>

                    <div
                        dangerouslySetInnerHTML={{
                            __html: news.content,
                        }}
                    />
                </article>
            </div>
        </WriterLayout>
    );
}
