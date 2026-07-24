import React from 'react';
import { Editor } from '@tiptap/react';
import { Bold, Italic, Sparkles, BookMarked, RefreshCw } from 'lucide-react';

interface SelectionBubbleMenuProps {
  editor: Editor | null;
  onOpenAI: (mode: 'paraphrase' | 'critique') => void;
  onOpenCitations: () => void;
}

export const SelectionBubbleMenu: React.FC<SelectionBubbleMenuProps> = ({
  editor,
  onOpenAI,
  onOpenCitations,
}) => {
  if (!editor || editor.state.selection.empty || !editor.isEditable) return null;

  return (
    <div
      className="flex items-center gap-1 bg-[#1A1817] text-white p-1.5 rounded-xl shadow-2xl border border-[#3D3833] z-50"
    >
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`p-1.5 rounded-lg text-xs hover:bg-[#3D3833] transition-colors ${
          editor.isActive('bold') ? 'bg-[#3D3833] text-[#E8DFD1]' : 'text-stone-300'
        }`}
        title="Bold"
      >
        <Bold className="w-3.5 h-3.5" />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`p-1.5 rounded-lg text-xs hover:bg-[#3D3833] transition-colors ${
          editor.isActive('italic') ? 'bg-[#3D3833] text-[#E8DFD1]' : 'text-stone-300'
        }`}
        title="Italic"
      >
        <Italic className="w-3.5 h-3.5" />
      </button>

      <div className="w-[1px] h-4 bg-[#3D3833] mx-1" />

      <button
        onClick={onOpenCitations}
        className="px-2 py-1 rounded-lg text-xs font-medium bg-[#2C2825] hover:bg-[#3D3833] text-[#E8DFD1] flex items-center gap-1 transition-colors"
        title="Add Citation"
      >
        <BookMarked className="w-3.5 h-3.5 text-[#C4B299]" />
        Cite
      </button>

      <button
        onClick={() => onOpenAI('paraphrase')}
        className="px-2 py-1 rounded-lg text-xs font-medium bg-[#2C2825] hover:bg-[#3D3833] text-[#E8DFD1] flex items-center gap-1 transition-colors"
        title="Polish Selection"
      >
        <RefreshCw className="w-3.5 h-3.5 text-[#C4B299]" />
        Polish
      </button>

      <button
        onClick={() => onOpenAI('critique')}
        className="px-2 py-1 rounded-lg text-xs font-medium bg-[#8C7A6B] hover:bg-[#736355] text-white flex items-center gap-1 transition-colors"
        title="Critique Selection"
      >
        <Sparkles className="w-3.5 h-3.5" />
        Critique
      </button>
    </div>
  );
};
