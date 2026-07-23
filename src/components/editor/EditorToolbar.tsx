import React, { useState } from 'react';
import { Editor } from '@tiptap/react';
import { 
  Bold, 
  Italic, 
  Heading1, 
  Heading2, 
  List, 
  ListOrdered, 
  Quote, 
  BookMarked, 
  Sparkles, 
  Type, 
  Save, 
  Download, 
  Check, 
  FileText,
  Sliders,
  ChevronDown
} from 'lucide-react';
import { FormattingPanel } from './FormattingPanel';

interface EditorToolbarProps {
  editor: Editor | null;
  onOpenCitations: () => void;
  onOpenAI: () => void;
  onSave?: () => void;
  onExport?: (format: 'html' | 'md' | 'txt') => void;
  isSaving?: boolean;
  saveSuccess?: boolean;
}

export const EditorToolbar: React.FC<EditorToolbarProps> = ({
  editor,
  onOpenCitations,
  onOpenAI,
  onSave,
  onExport,
  isSaving = false,
  saveSuccess = false,
}) => {
  const [showFormattingPanel, setShowFormattingPanel] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);

  if (!editor) return null;

  return (
    <div className="relative sticky top-0 z-30 bg-[#FAF8F5] border-b border-[#E5DEC9] px-4 py-2.5 flex items-center justify-between gap-3 shadow-xs">
      {/* Left Toolbar Group: Main Formatting Controls */}
      <div className="flex items-center gap-1.5 flex-wrap">
        {/* Advanced Academic Formatting Toggle Button "Aa" */}
        <button
          onClick={() => setShowFormattingPanel(!showFormattingPanel)}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all border ${
            showFormattingPanel
              ? 'bg-[#8C7A6B] text-white border-[#8C7A6B] shadow-sm'
              : 'bg-white text-[#2C2A29] border-[#DCD3C1] hover:bg-[#F3ECE0]'
          }`}
          title="Open Advanced Formatting & Presets Panel"
        >
          <Type className="w-4 h-4 text-[#8C7A6B] font-bold" />
          <span className="font-serif font-bold text-sm">Aa</span>
          <span className="text-[11px] text-[#756C63] font-sans font-normal border-l border-[#DCD3C1] pl-1.5">Formatting</span>
          <ChevronDown className="w-3.5 h-3.5 text-[#8C7A6B]" />
        </button>

        <div className="w-[1px] h-5 bg-[#E5DEC9] mx-1" />

        {/* Basic Text Formatting */}
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-1.5 rounded-lg text-xs transition-colors ${
            editor.isActive('bold')
              ? 'bg-[#8C7A6B] text-white font-bold'
              : 'text-[#4A433D] hover:bg-[#EFE9DD]'
          }`}
          title="Bold (Ctrl+B)"
        >
          <Bold className="w-4 h-4" />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-1.5 rounded-lg text-xs transition-colors ${
            editor.isActive('italic')
              ? 'bg-[#8C7A6B] text-white'
              : 'text-[#4A433D] hover:bg-[#EFE9DD]'
          }`}
          title="Italic (Ctrl+I)"
        >
          <Italic className="w-4 h-4" />
        </button>

        <div className="w-[1px] h-5 bg-[#E5DEC9] mx-1" />

        {/* Headings */}
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`p-1.5 rounded-lg text-xs transition-colors ${
            editor.isActive('heading', { level: 1 })
              ? 'bg-[#8C7A6B] text-white font-bold'
              : 'text-[#4A433D] hover:bg-[#EFE9DD]'
          }`}
          title="Heading 1"
        >
          <Heading1 className="w-4 h-4" />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`p-1.5 rounded-lg text-xs transition-colors ${
            editor.isActive('heading', { level: 2 })
              ? 'bg-[#8C7A6B] text-white font-bold'
              : 'text-[#4A433D] hover:bg-[#EFE9DD]'
          }`}
          title="Heading 2"
        >
          <Heading2 className="w-4 h-4" />
        </button>

        <div className="w-[1px] h-5 bg-[#E5DEC9] mx-1" />

        {/* Lists & Quote */}
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-1.5 rounded-lg text-xs transition-colors ${
            editor.isActive('bulletList')
              ? 'bg-[#8C7A6B] text-white'
              : 'text-[#4A433D] hover:bg-[#EFE9DD]'
          }`}
          title="Bullet List"
        >
          <List className="w-4 h-4" />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-1.5 rounded-lg text-xs transition-colors ${
            editor.isActive('orderedList')
              ? 'bg-[#8C7A6B] text-white'
              : 'text-[#4A433D] hover:bg-[#EFE9DD]'
          }`}
          title="Ordered List"
        >
          <ListOrdered className="w-4 h-4" />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`p-1.5 rounded-lg text-xs transition-colors ${
            editor.isActive('blockquote')
              ? 'bg-[#8C7A6B] text-white'
              : 'text-[#4A433D] hover:bg-[#EFE9DD]'
          }`}
          title="Blockquote"
        >
          <Quote className="w-4 h-4" />
        </button>
      </div>

      {/* Right Toolbar Group: Academic Tools, Save & Export */}
      <div className="flex items-center gap-2">
        {/* Citations Assistant */}
        <button
          onClick={onOpenCitations}
          className="px-2.5 py-1.5 rounded-lg text-xs font-medium bg-white border border-[#DCD3C1] text-[#3D352E] hover:bg-[#F3ECE0] transition-colors flex items-center gap-1.5"
          title="Open Citations Library"
        >
          <BookMarked className="w-3.5 h-3.5 text-[#8C7A6B]" />
          <span>Citations</span>
        </button>

        {/* AI Co-Author */}
        <button
          onClick={onOpenAI}
          className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#3D352E] text-white hover:bg-[#2A241F] transition-colors flex items-center gap-1.5 shadow-xs"
          title="Open Bounkoun AI Assistant"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#E8DFD1]" />
          <span>AI Critic</span>
        </button>

        <div className="w-[1px] h-5 bg-[#E5DEC9] mx-1" />

        {/* Export Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowExportMenu(!showExportMenu)}
            className="p-1.5 rounded-lg text-xs text-[#4A433D] hover:bg-[#EFE9DD] transition-colors flex items-center gap-1"
            title="Export Document"
          >
            <Download className="w-4 h-4" />
          </button>

          {showExportMenu && (
            <div className="absolute right-0 top-full mt-1 w-40 bg-white border border-[#E5DEC9] rounded-xl shadow-lg p-1.5 z-50 text-xs text-[#2C2A29]">
              <div className="px-2 py-1 text-[10px] font-semibold text-[#8C7A6B] uppercase tracking-wider">Export Format</div>
              <button
                onClick={() => { onExport?.('html'); setShowExportMenu(false); }}
                className="w-full text-left px-2.5 py-1.5 rounded-md hover:bg-[#F3ECE0] flex items-center gap-2"
              >
                <FileText className="w-3.5 h-3.5 text-[#8C7A6B]" />
                HTML File (.html)
              </button>
              <button
                onClick={() => { onExport?.('md'); setShowExportMenu(false); }}
                className="w-full text-left px-2.5 py-1.5 rounded-md hover:bg-[#F3ECE0] flex items-center gap-2"
              >
                <FileText className="w-3.5 h-3.5 text-[#8C7A6B]" />
                Markdown (.md)
              </button>
              <button
                onClick={() => { onExport?.('txt'); setShowExportMenu(false); }}
                className="w-full text-left px-2.5 py-1.5 rounded-md hover:bg-[#F3ECE0] flex items-center gap-2"
              >
                <FileText className="w-3.5 h-3.5 text-[#8C7A6B]" />
                Plain Text (.txt)
              </button>
            </div>
          )}
        </div>

        {/* Save Button */}
        {onSave && (
          <button
            onClick={onSave}
            disabled={isSaving}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
              saveSuccess
                ? 'bg-emerald-700 text-white'
                : 'bg-[#8C7A6B] text-white hover:bg-[#736355]'
            }`}
            title="Save Document"
          >
            {saveSuccess ? (
              <>
                <Check className="w-3.5 h-3.5" /> Saved
              </>
            ) : (
              <>
                <Save className="w-3.5 h-3.5" /> Save
              </>
            )}
          </button>
        )}
      </div>

      {/* Popover Formatting Panel */}
      {showFormattingPanel && (
        <div className="absolute left-4 top-full mt-2 z-50">
          <FormattingPanel 
            editor={editor} 
            onClose={() => setShowFormattingPanel(false)} 
          />
        </div>
      )}
    </div>
  );
};
