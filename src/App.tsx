import React, { useState } from 'react';
import { RichTextEditor } from './components/editor/RichTextEditor';
import { 
  BookOpen, 
  Sparkles, 
  FileText, 
  CheckCircle2, 
  HelpCircle, 
  Layers, 
  Feather,
  Download,
  Share2,
  BarChart3
} from 'lucide-react';

export const App: React.FC = () => {
  const [docTitle, setDocTitle] = useState('Bauxite Reserves & Labor Dynamics in Guinea');
  const [activeChapter, setActiveChapter] = useState('Chapter 1: Introduction');
  const [savedHtml, setSavedHtml] = useState<string>('');
  const [lastSavedTime, setLastSavedTime] = useState<string>('Just now');

  const handleSave = (html: string) => {
    setSavedHtml(html);
    const now = new Date();
    setLastSavedTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  };

  return (
    <div className="min-h-screen bg-[#F8F6F0] flex flex-col text-[#2C2A29] font-sans">
      {/* Top Header */}
      <header className="bg-[#FAF8F5] border-b border-[#E5DEC9] px-6 py-3 flex items-center justify-between shadow-xs">
        {/* Left Brand & Title */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#3D352E] text-[#F3ECE0] flex items-center justify-center font-serif font-bold text-lg shadow-sm">
              B
            </div>
            <div>
              <span className="font-serif font-bold text-base tracking-tight text-[#1A1817]">Bounkoun</span>
              <span className="text-[10px] uppercase tracking-wider text-[#8C7A6B] block font-sans font-medium">Academic Research Lab</span>
            </div>
          </div>

          <div className="h-6 w-[1px] bg-[#E5DEC9] hidden sm:block" />

          {/* Editable Manuscript Title */}
          <div className="hidden md:flex flex-col">
            <input
              type="text"
              value={docTitle}
              onChange={(e) => setDocTitle(e.target.value)}
              className="bg-transparent font-serif font-medium text-sm text-[#2C2A29] border-b border-transparent hover:border-[#DCD3C1] focus:border-[#8C7A6B] focus:outline-none px-1 py-0.5 rounded transition-all w-80 truncate"
            />
            <span className="text-[11px] text-[#756C63] px-1">Guinean Economic Policy & Mineral Resources</span>
          </div>
        </div>

        {/* Center Chapter Switcher */}
        <div className="hidden lg:flex items-center bg-[#EFE9DD] border border-[#DCD3C1] rounded-lg p-1 text-xs">
          {['Chapter 1: Intro', 'Chapter 2: Lit Review', 'Chapter 3: Methodology', 'References'].map((chap) => (
            <button
              key={chap}
              onClick={() => setActiveChapter(chap)}
              className={`px-3 py-1 rounded-md transition-all font-medium ${
                activeChapter.includes(chap.split(':')[0])
                  ? 'bg-white text-[#1A1817] shadow-xs font-semibold'
                  : 'text-[#665D55] hover:text-[#1A1817]'
              }`}
            >
              {chap}
            </button>
          ))}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-[#756C63]">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span className="hidden sm:inline">Saved {lastSavedTime}</span>
          </div>

          <div className="h-5 w-[1px] bg-[#E5DEC9]" />

          <button 
            onClick={() => alert('Manuscript ready for export or review!')}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white border border-[#DCD3C1] text-[#3D352E] hover:bg-[#F3ECE0] transition-colors flex items-center gap-1.5"
          >
            <Share2 className="w-3.5 h-3.5 text-[#8C7A6B]" />
            <span className="hidden sm:inline">Share</span>
          </button>
        </div>
      </header>

      {/* Main RichTextEditor */}
      <main className="flex-1 flex flex-col">
        <RichTextEditor onSave={handleSave} />
      </main>

      {/* Status Footer */}
      <footer className="bg-[#FAF8F5] border-t border-[#E5DEC9] px-6 py-2 flex items-center justify-between text-[11px] text-[#756C63]">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1 font-mono">
            <Feather className="w-3 h-3 text-[#8C7A6B]" /> Preset: <strong>University Thesis (APA 7th)</strong>
          </span>
          <span className="hidden sm:inline">•</span>
          <span className="hidden sm:inline">Line Spacing: <strong>2.0 (Double)</strong></span>
          <span className="hidden sm:inline">•</span>
          <span className="hidden sm:inline">Indent: <strong>1.27 cm</strong></span>
        </div>

        <div className="flex items-center gap-4">
          <span className="font-mono">Words: 142</span>
          <span>•</span>
          <span className="font-mono">References: 4 Cited</span>
        </div>
      </footer>
    </div>
  );
};
