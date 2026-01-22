<?xml version="1.0" encoding="UTF-8"?>
<urlset
    xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
    xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">

@foreach ($news as $item)
    <url>
        <loc>{{ url('/news/' . $item->slug) }}</loc>

        <news:news>
            <news:publication>
                <news:name>IKA UNIMED</news:name>
                <news:language>id</news:language>
            </news:publication>

            <news:publication_date>{{ $item->published_at->toAtomString() }}</news:publication_date>

            <news:title><![CDATA[{{ $item->title }}]]></news:title>
        </news:news>

        {{-- Add image untuk featured news --}}
        @if ($item->image)
            <image:image>
                <image:loc>{{ url('storage/news/' . $item->image) }}</image:loc>
            </image:image>
        @endif

        <lastmod>{{ $item->updated_at->toAtomString() }}</lastmod>
</urlset>
