import React, { useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextStyle from '@tiptap/extension-text-style';
import FontFamily from '@tiptap/extension-font-family';
import TextAlign from '@tiptap/extension-text-align';

// Custom Academic Extensions
import { FontSize } from './extensions/FontSize';
import { ParagraphStyle } from './extensions/ParagraphStyle';

// Toolbar & UI Components
import { EditorToolbar } from './EditorToolbar';
import { SelectionBubbleMenu } from './SelectionBubbleMenu';
import { AIWritingAssistant } from '../ai/AIWritingAssistant';
import { CitationLibrary } from '../citations/CitationLibrary';

interface RichTextEditorProps {
  initialContent?: string;
  onChange?: (html: string) => void;
  onSave?: (html: string) => void;
  readOnly?: boolean;
}

export const INITIAL_ACADEMIC_DRAFT = `<h1 style="text-align: center; line-height: 1.3;">Chapter 1: Introduction</h1>

<p style="text-indent: 1.27cm; line-height: 2.0; font-family: 'Times New Roman', serif; font-size: 12pt;">
  Guinea possesses some of the world’s most significant bauxite reserves, yet the translation of these vast mineral endowments into broad-based employment and sustainable development remains a persistent challenge. While Foreign Direct Investment (FDI) serves as the primary engine for capital injection into the Guinean mining sector, the anticipated "trickle-down" effects on the local labor market are frequently obstructed by structural weaknesses and a disconnect between macro-level fiscal inflows and micro-level socioeconomic realities.
</p>

<p style="text-indent: 1.27cm; line-height: 2.0; font-family: 'Times New Roman', serif; font-size: 12pt;">
  Extractive industries in resource-rich developing nations often function as enclaves, operating with minimal integration into the domestic economy and providing few high-quality jobs for the local workforce <span class="citation-mark">(Addison et al., 2024)</span>. This friction is exacerbated when the state relies heavily on external capital to fuel growth, creating structural dependence without proportional job creation <span class="citation-mark">(World Bank, 2023)</span>.
</p>`;

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  initialContent = INITIAL_ACADEMIC_DRAFT,
  onChange,
  onSave,
  readOnly = false,
}) => {
  const [isCitationOpen, setIsCitationOpen] = useState(false);
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [aiMode, setAiMode] = useState<'paraphrase' | 'critique' | 'draft'>('critique');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      FontFamily,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
        alignments: ['left', 'center', 'right', 'justify'],
      }),
      FontSize,
      ParagraphStyle,
    ],
    content: initialContent,
    editable: !readOnly,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      if (onChange) {
        onChange(html);
      }
    },
  });

  const handleSave = () => {
    if (!editor) return;
    setIsSaving(true);
    const html = editor.getHTML();
    if (onSave) {
      onSave(html);
    }
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2000);
    }, 600);
  };

  const handleExport = (format: 'html' | 'md' | 'txt') => {
    if (!editor) return;
    let content = '';
    let mimeType = 'text/plain';
    let fileExtension = 'txt';

    if (format === 'html') {
      content = editor.getHTML();
      mimeType = 'text/html';
      fileExtension = 'html';
    } else if (format === 'md') {
      content = editor.getText(); // Basic text representation
      mimeType = 'text/markdown';
      fileExtension = 'md';
    } else {
      content = editor.getText();
      mimeType = 'text/plain';
      fileExtension = 'txt';
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `academic_manuscript.${fileExtension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleInsertCitation = (citationText: string) => {
    if (!editor) return;
    editor.chain().focus().insertContent(`<span class="citation-mark">${citationText}</span> `).run();
  };

  const handleInsertAIText = (text: string) => {
    if (!editor) return;
    editor.chain().focus().insertContent(`<p style="text-indent: 1.27cm; line-height: 2.0;">${text}</p>`).run();
    setIsAIOpen(false);
  };

  const selectedText = editor?.state.doc.textBetween(
    editor.state.selection.from,
    editor.state.selection.to,
    ' '
  );

  return (
    <div className="w-full flex flex-col bg-[#F8F6F0] min-h-screen">
      {/* Top Toolbar */}
      <EditorToolbar
        editor={editor}
        onOpenCitations={() => setIsCitationOpen(true)}
        onOpenAI={() => setIsAIOpen(true)}
        onSave={handleSave}
        onExport={handleExport}
        isSaving={isSaving}
        saveSuccess={saveSuccess}
      />

      {/* Editor Main Canvas */}
      <div className="flex-1 max-w-4xl w-full mx-auto p-6 md:p-10 relative">
        {/* Selection Bubble Menu */}
        <SelectionBubbleMenu
          editor={editor}
          onOpenAI={(mode) => {
            setAiMode(mode);
            setIsAIOpen(true);
          }}
          onOpenCitations={() => setIsCitationOpen(true)}
        />

        {/* TipTap Rich Text Area */}
        <div className="bg-white rounded-lg shadow-sm border border-[#E5DEC9] transition-all">
          <EditorContent editor={editor} />
        </div>
      </div>

      {/* Citation Library Drawer */}
      <CitationLibrary
        isOpen={isCitationOpen}
        onClose={() => setIsCitationOpen(false)}
        onInsertCitation={handleInsertCitation}
      />

      {/* AI Writing Assistant Drawer */}
      <AIWritingAssistant
        isOpen={isAIOpen}
        onClose={() => setIsAIOpen(false)}
        onInsertText={handleInsertAIText}
        selectedText={selectedText}
      />
    </div>
  );
};
