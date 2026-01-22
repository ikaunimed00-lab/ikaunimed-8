import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function RichTextEditor({ value, onChange }: Props) {
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
      <div className="flex flex-wrap gap-1 p-2 border-b bg-gray-50">
        <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className="rte-btn">B</button>
        <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className="rte-btn">I</button>
        <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className="rte-btn">H2</button>
        <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className="rte-btn">• List</button>
        <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} className="rte-btn">1. List</button>
      </div>

      <EditorContent
        editor={editor}
        className="p-4 min-h-[200px] prose max-w-none"
      />
    </div>
  );
}
