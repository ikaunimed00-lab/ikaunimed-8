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
            <div className="flex gap-2 border-b bg-gray-50 p-2 text-sm">
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className="px-2 py-1 border rounded"
                >
                    <b>B</b>
                </button>

                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className="px-2 py-1 border rounded"
                >
                    <i>I</i>
                </button>

                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className="px-2 py-1 border rounded"
                >
                    • List
                </button>
            </div>

            <EditorContent
                editor={editor}
                className="p-4 min-h-[200px] prose max-w-none"
            />
        </div>
    );
}
