import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export default function TiptapEditor({
    value,
    onChange,
}: {
    value: string;
    onChange: (html: string) => void;
}) {
    const editor = useEditor({
        extensions: [StarterKit],
        content: value,
        onUpdate({ editor }) {
            onChange(editor.getHTML());
        },
    });

    return (
        <div className="border rounded">
            <div className="flex gap-2 p-2 border-b bg-slate-50">
                <button onClick={() => editor?.chain().focus().toggleBold().run()}>
                    <b>B</b>
                </button>
                <button onClick={() => editor?.chain().focus().toggleItalic().run()}>
                    <i>I</i>
                </button>
                <button onClick={() => editor?.chain().focus().toggleBulletList().run()}>
                    • List
                </button>
            </div>

            <EditorContent
                editor={editor}
                className="p-3 min-h-[200px]"
            />
        </div>
    );
}
