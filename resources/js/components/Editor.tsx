import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

interface Props {
    value: string;
    onChange: (value: string) => void;
}

export default function Editor({ value, onChange }: Props) {
    const editor = useEditor({
        extensions: [StarterKit],
        content: value,
        onUpdate({ editor }) {
            onChange(editor.getHTML());
        },
    });

    if (!editor) return null;

    return (
        <div className="border rounded">
            <div className="flex gap-2 border-b bg-gray-50 p-2 text-sm flex-wrap">
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={`px-2 py-1 border rounded ${editor.isActive('bold') ? 'bg-gray-200' : ''}`}
                    title="Bold"
                >
                    <b>B</b>
                </button>

                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={`px-2 py-1 border rounded ${editor.isActive('italic') ? 'bg-gray-200' : ''}`}
                    title="Italic"
                >
                    <i>I</i>
                </button>

                <div className="w-px h-6 bg-gray-300 mx-1"></div>

                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={`px-2 py-1 border rounded ${editor.isActive('heading', { level: 2 }) ? 'bg-gray-200' : ''}`}
                    title="Heading 2"
                >
                    H2
                </button>

                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    className={`px-2 py-1 border rounded ${editor.isActive('heading', { level: 3 }) ? 'bg-gray-200' : ''}`}
                    title="Heading 3"
                >
                    H3
                </button>

                <div className="w-px h-6 bg-gray-300 mx-1"></div>

                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={`px-2 py-1 border rounded ${editor.isActive('bulletList') ? 'bg-gray-200' : ''}`}
                    title="Bullet List"
                >
                    • List
                </button>

                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={`px-2 py-1 border rounded ${editor.isActive('orderedList') ? 'bg-gray-200' : ''}`}
                    title="Ordered List"
                >
                    1. List
                </button>
            </div>

            <EditorContent
                editor={editor}
                className="p-4 min-h-[200px] prose max-w-none focus:outline-none"
            />
        </div>
    );
}
