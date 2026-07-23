import React, { useState } from 'react';
import { Editor } from '@tiptap/react';
import { 
  Type, 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  AlignJustify, 
  Sliders, 
  BookOpen, 
  Indent, 
  Outdent,
  Check,
  Sparkles,
  ChevronDown
} from 'lucide-react';

interface FormattingPanelProps {
  editor: Editor | null;
  onClose?: () => void;
}

export const FONT_FAMILIES = [
  { name: 'Times New Roman', value: 'Times New Roman, serif' },
  { name: 'Arial', value: 'Arial, sans-serif' },
  { name: 'Calibri', value: 'Calibri, sans-serif' },
  { name: 'Cambria', value: 'Cambria, serif' },
  { name: 'Georgia', value: 'Georgia, serif' },
  { name: 'Garamond', value: 'Garamond, EB Garamond, serif' },
  { name: 'SimSun', value: 'SimSun, serif' },
  { name: 'Noto Serif', value: 'Noto Serif, serif' },
];

export const FONT_SIZES = ['10pt', '11pt', '12pt', '14pt', '16pt', '18pt', '24pt', '36pt'];

export const FormattingPanel: React.FC<FormattingPanelProps> = ({ editor, onClose }) => {
  const [activeTab, setActiveTab] = useState<'typography' | 'paragraph' | 'presets'>('typography');
  const [selectedPreset, setSelectedPreset] = useState<string | null>('thesis');

  if (!editor) return null;

  // Active state calculations
  const currentFontFamily = editor.getAttributes('textStyle').fontFamily || 'Times New Roman, serif';
  const currentFontSize = editor.getAttributes('textStyle').fontSize || '12pt';
  const currentIndent = editor.getAttributes('paragraph').indent;

  const applyPreset = (presetKey: 'thesis' | 'journal' | 'report') => {
    setSelectedPreset(presetKey);

    if (presetKey === 'thesis') {
      // University Thesis: Times New Roman, 12pt, Justify, 1.27cm indent
      editor.chain().focus()
        .setFontFamily('Times New Roman, serif')
        .setFontSize('12pt')
        .setTextAlign('justify')
        .setFirstLineIndent('1.27cm')
        .run();
    } else if (presetKey === 'journal') {
      // Journal Article: Times New Roman, 12pt, Justify
      editor.chain().focus()
        .setFontFamily('Times New Roman, serif')
        .setFontSize('12pt')
        .setTextAlign('justify')
        .setFirstLineIndent(null)
        .run();
    } else if (presetKey === 'report') {
      // Research Report: Arial, 11pt, Left alignment
      editor.chain().focus()
        .setFontFamily('Arial, sans-serif')
        .setFontSize('11pt')
        .setTextAlign('left')
        .setFirstLineIndent(null)
        .run();
    }
  };

  return (
    <div className="w-80 bg-[#FAF8F5] border border-[#E5DEC9] rounded-xl shadow-xl overflow-hidden text-[#2C2A29] animate-in fade-in zoom-in-95 duration-150 z-50">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#F3ECE0] border-b border-[#E5DEC9]">
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-[#8C7A6B]" />
          <span className="font-semibold text-sm tracking-wide text-[#3D352E]">Academic Document Style</span>
        </div>
        {onClose && (
          <button 
            onClick={onClose}
            className="text-[#8C7A6B] hover:text-[#2C2A29] text-xs font-medium px-2 py-0.5 rounded hover:bg-[#E8DFD1] transition-colors"
          >
            Done
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#E5DEC9] bg-[#FAF8F5]">
        <button
          onClick={() => setActiveTab('typography')}
          className={`flex-1 py-2 px-3 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors border-b-2 ${
            activeTab === 'typography'
              ? 'border-[#8C7A6B] text-[#2C2A29] bg-white font-semibold'
              : 'border-transparent text-[#756C63] hover:text-[#2C2A29] hover:bg-[#F3ECE0]/50'
          }`}
        >
          <Type className="w-3.5 h-3.5" />
          Typography
        </button>
        <button
          onClick={() => setActiveTab('paragraph')}
          className={`flex-1 py-2 px-3 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors border-b-2 ${
            activeTab === 'paragraph'
              ? 'border-[#8C7A6B] text-[#2C2A29] bg-white font-semibold'
              : 'border-transparent text-[#756C63] hover:text-[#2C2A29] hover:bg-[#F3ECE0]/50'
          }`}
        >
          <AlignJustify className="w-3.5 h-3.5" />
          Paragraph
        </button>
        <button
          onClick={() => setActiveTab('presets')}
          className={`flex-1 py-2 px-3 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors border-b-2 ${
            activeTab === 'presets'
              ? 'border-[#8C7A6B] text-[#2C2A29] bg-white font-semibold'
              : 'border-transparent text-[#756C63] hover:text-[#2C2A29] hover:bg-[#F3ECE0]/50'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          Presets
        </button>
      </div>

      {/* Tab Contents */}
      <div className="p-4 space-y-4 max-h-80 overflow-y-auto">
        {/* TAB 1: Typography */}
        {activeTab === 'typography' && (
          <div className="space-y-4">
            {/* Font Family */}
            <div>
              <label className="block text-xs font-semibold text-[#665D55] mb-1.5 uppercase tracking-wider">
                Font Family
              </label>
              <div className="relative">
                <select
                  value={FONT_FAMILIES.find(f => currentFontFamily.includes(f.name.split(' ')[0]))?.value || 'Times New Roman, serif'}
                  onChange={(e) => editor.chain().focus().setFontFamily(e.target.value).run()}
                  className="w-full bg-white border border-[#DCD3C1] text-[#2C2A29] text-xs rounded-lg px-3 py-2 appearance-none focus:outline-none focus:ring-1 focus:ring-[#8C7A6B] cursor-pointer"
                >
                  {FONT_FAMILIES.map(font => (
                    <option key={font.name} value={font.value} style={{ fontFamily: font.value }}>
                      {font.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-3.5 h-3.5 absolute right-2.5 top-2.5 text-[#8C7A6B] pointer-events-none" />
              </div>
            </div>

            {/* Font Size */}
            <div>
              <label className="block text-xs font-semibold text-[#665D55] mb-1.5 uppercase tracking-wider">
                Font Size
              </label>
              <div className="grid grid-cols-4 gap-1.5">
                {FONT_SIZES.map(size => (
                  <button
                    key={size}
                    onClick={() => editor.chain().focus().setFontSize(size).run()}
                    className={`py-1.5 text-xs rounded-md border font-mono transition-all ${
                      currentFontSize === size
                        ? 'bg-[#8C7A6B] text-white border-[#8C7A6B] font-semibold'
                        : 'bg-white text-[#2C2A29] border-[#DCD3C1] hover:bg-[#F3ECE0]'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Paragraph Alignment, Line Spacing & Indentation */}
        {activeTab === 'paragraph' && (
          <div className="space-y-4">
            {/* Alignment */}
            <div>
              <label className="block text-xs font-semibold text-[#665D55] mb-1.5 uppercase tracking-wider">
                Alignment
              </label>
              <div className="flex bg-white border border-[#DCD3C1] rounded-lg p-1 gap-1">
                <button
                  onClick={() => editor.chain().focus().setTextAlign('left').run()}
                  title="Align Left"
                  className={`flex-1 py-1.5 flex items-center justify-center rounded transition-colors ${
                    editor.isActive({ textAlign: 'left' }) ? 'bg-[#E8DFD1] text-[#1A1817] font-bold' : 'text-[#665D55] hover:bg-[#F3ECE0]'
                  }`}
                >
                  <AlignLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => editor.chain().focus().setTextAlign('center').run()}
                  title="Align Center"
                  className={`flex-1 py-1.5 flex items-center justify-center rounded transition-colors ${
                    editor.isActive({ textAlign: 'center' }) ? 'bg-[#E8DFD1] text-[#1A1817] font-bold' : 'text-[#665D55] hover:bg-[#F3ECE0]'
                  }`}
                >
                  <AlignCenter className="w-4 h-4" />
                </button>
                <button
                  onClick={() => editor.chain().focus().setTextAlign('right').run()}
                  title="Align Right"
                  className={`flex-1 py-1.5 flex items-center justify-center rounded transition-colors ${
                    editor.isActive({ textAlign: 'right' }) ? 'bg-[#E8DFD1] text-[#1A1817] font-bold' : 'text-[#665D55] hover:bg-[#F3ECE0]'
                  }`}
                >
                  <AlignRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => editor.chain().focus().setTextAlign('justify').run()}
                  title="Justify"
                  className={`flex-1 py-1.5 flex items-center justify-center rounded transition-colors ${
                    editor.isActive({ textAlign: 'justify' }) ? 'bg-[#E8DFD1] text-[#1A1817] font-bold' : 'text-[#665D55] hover:bg-[#F3ECE0]'
                  }`}
                >
                  <AlignJustify className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Paragraph Indentation */}
            <div>
              <label className="block text-xs font-semibold text-[#665D55] mb-1.5 uppercase tracking-wider">
                First-Line Indentation
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => editor.chain().focus().setFirstLineIndent(null).run()}
                  className={`flex-1 py-2 px-3 text-xs rounded-lg border flex items-center justify-center gap-1.5 transition-all ${
                    !currentIndent
                      ? 'bg-[#8C7A6B] text-white border-[#8C7A6B] font-medium'
                      : 'bg-white text-[#2C2A29] border-[#DCD3C1] hover:bg-[#F3ECE0]'
                  }`}
                >
                  <Outdent className="w-3.5 h-3.5" />
                  None
                </button>
                <button
                  onClick={() => editor.chain().focus().setFirstLineIndent('1.27cm').run()}
                  className={`flex-1 py-2 px-3 text-xs rounded-lg border flex items-center justify-center gap-1.5 transition-all ${
                    currentIndent
                      ? 'bg-[#8C7A6B] text-white border-[#8C7A6B] font-medium'
                      : 'bg-white text-[#2C2A29] border-[#DCD3C1] hover:bg-[#F3ECE0]'
                  }`}
                >
                  <Indent className="w-3.5 h-3.5" />
                  1.27 cm (APA/Thesis)
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: Academic Presets */}
        {activeTab === 'presets' && (
          <div className="space-y-2.5">
            <p className="text-[11px] text-[#756C63] mb-2 leading-relaxed">
              Apply standard academic formatting presets across your selection or document.
            </p>

            {/* University Thesis */}
            <div
              onClick={() => applyPreset('thesis')}
              className={`p-3 rounded-lg border cursor-pointer transition-all ${
                selectedPreset === 'thesis'
                  ? 'bg-white border-[#8C7A6B] ring-1 ring-[#8C7A6B] shadow-sm'
                  : 'bg-white/60 border-[#DCD3C1] hover:bg-white hover:border-[#B3A698]'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-xs text-[#1A1817]">1. University Thesis</span>
                {selectedPreset === 'thesis' && <Sparkles className="w-3.5 h-3.5 text-[#8C7A6B]" />}
              </div>
              <p className="text-[11px] text-[#665D55]">
                Times New Roman • 12pt • Double Spaced (2.0) • Justified • 1.27cm Indent
              </p>
            </div>

            {/* Journal Article */}
            <div
              onClick={() => applyPreset('journal')}
              className={`p-3 rounded-lg border cursor-pointer transition-all ${
                selectedPreset === 'journal'
                  ? 'bg-white border-[#8C7A6B] ring-1 ring-[#8C7A6B] shadow-sm'
                  : 'bg-white/60 border-[#DCD3C1] hover:bg-white hover:border-[#B3A698]'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-xs text-[#1A1817]">2. Journal Article</span>
                {selectedPreset === 'journal' && <Sparkles className="w-3.5 h-3.5 text-[#8C7A6B]" />}
              </div>
              <p className="text-[11px] text-[#665D55]">
                Times New Roman • 12pt • 1.5 Line Spacing • Justified
              </p>
            </div>

            {/* Research Report */}
            <div
              onClick={() => applyPreset('report')}
              className={`p-3 rounded-lg border cursor-pointer transition-all ${
                selectedPreset === 'report'
                  ? 'bg-white border-[#8C7A6B] ring-1 ring-[#8C7A6B] shadow-sm'
                  : 'bg-white/60 border-[#DCD3C1] hover:bg-white hover:border-[#B3A698]'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-xs text-[#1A1817]">3. Research Report</span>
                {selectedPreset === 'report' && <Sparkles className="w-3.5 h-3.5 text-[#8C7A6B]" />}
              </div>
              <p className="text-[11px] text-[#665D55]">
                Arial • 11pt • 1.15 Line Spacing • Left Aligned
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
