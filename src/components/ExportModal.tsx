import React, { useState } from 'react';
import { X, Copy, Check, Download, FileText, AlertCircle } from 'lucide-react';
import { Board, Theme } from '../types';

interface ExportModalProps {
  board: Board;
  themes: Theme[];
  isOpen: boolean;
  onClose: () => void;
}

export default function ExportModal({ board, themes, isOpen, onClose }: ExportModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  // Generate correct retro action plan markdown
  const topThemes = themes.slice(0, 3);
  const dateStr = new Date().toLocaleDateString();

  let markdownText = `# Retro Action Plan — ${board.title}\n`;
  markdownText += `Generated: ${dateStr}\n\n`;
  markdownText += `## Top Themes\n\n`;

  topThemes.forEach((theme, index) => {
    markdownText += `### ${index + 1}. ${theme.name} (${theme.confidence}% confidence)\n`;
    markdownText += `**Recommended next step:** ${theme.recommendedNextStep}\n`;
    const cardCount = theme.cards ? theme.cards.length : 0;
    markdownText += `**Cards clustered:** ${cardCount} feedbacks\n\n`;
  });

  markdownText += `---\n`;
  markdownText += `Exported from RetroBoard\n`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(markdownText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      pendo.track("action_plan_exported_clipboard", {
        board_id: board.id,
        board_title: board.title,
        theme_count: themes.length,
        content_length: markdownText.length,
      });
    } catch (err) {
      console.error('Failed to copy to clipboard', err);
    }
  };

  const handleDownload = () => {
    try {
      const blob = new Blob([markdownText], { type: 'text/markdown;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      // Sanitize the title for the filename
      const safeTitle = board.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      const fileName = `retro-action-plan-${safeTitle}.md`;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      pendo.track("action_plan_exported_download", {
        board_id: board.id,
        board_title: board.title,
        theme_count: themes.length,
        file_format: "md",
        file_name: fileName,
      });
    } catch (err) {
      console.error('Failed to download markdown file', err);
    }
  };

  return (
    <div id="export-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/60 backdrop-blur-sm p-4">
      <div 
        id="export-modal-content" 
        className="w-full max-w-2xl bg-white border border-gray-100 shadow-2xl rounded-2xl flex flex-col max-h-[90vh] overflow-hidden animate-in fade-in zoom-in duration-200"
      >
        {/* Header */}
        <div id="export-modal-header" className="flex items-center justify-between p-5 border-b border-gray-150">
          <div className="flex items-center space-x-2">
            <div className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg">
              <FileText className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">
              Export Retro Action Plan
            </h3>
          </div>
          <button
            id="btn-close-export-modal"
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content Body */}
        <div id="export-modal-body" className="p-6 overflow-y-auto flex-1 space-y-4">
          <div className="flex items-center gap-2 text-xs text-amber-800 bg-amber-50 border border-amber-100 p-3 rounded-xl">
            <AlertCircle className="h-4 w-4 text-amber-600 shrink-0" />
            <span>Only top 3 clustered themes are included in the formatted action plan summary for clean alignment.</span>
          </div>

          <div>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">
              Markdown Preview
            </span>
            <pre 
              id="export-markdown-preview" 
              className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-[13px] text-gray-850 font-mono overflow-x-auto whitespace-pre-wrap max-h-64 leading-relaxed h-full"
            >
              {markdownText}
            </pre>
          </div>
        </div>

        {/* Footer actions */}
        <div id="export-modal-footer" className="p-5 border-t border-gray-150 bg-gray-50 flex flex-col sm:flex-row sm:items-center sm:justify-end gap-3.5">
          <button
            id="btn-download-md"
            onClick={handleDownload}
            className="inline-flex items-center justify-center px-4 py-2 bg-white border border-gray-300 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm cursor-pointer"
          >
            <Download className="h-4 w-4 mr-2 text-gray-500" />
            Download .md
          </button>

          <button
            id="btn-copy-markdown"
            onClick={handleCopy}
            className={`inline-flex items-center justify-center px-5 py-2 rounded-xl text-sm font-bold text-white transition-colors duration-150 shadow-md cursor-pointer ${
              copied 
                ? 'bg-emerald-600 hover:bg-emerald-700' 
                : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 mr-1.5" />
                Copied to Clipboard!
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 mr-1.5" />
                Copy to Clipboard
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
