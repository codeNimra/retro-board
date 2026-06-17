import React from 'react';
import { ArrowLeft, FileClock, Sparkles, AlertCircle, FileSpreadsheet } from 'lucide-react';
import { Board, Theme } from '../types';
import ThemeCard from './ThemeCard';

interface ClusterViewProps {
  board: Board;
  themes: Theme[];
  isLoading: boolean;
  onBackToBoard: () => void;
  onOpenExport: () => void;
}

export default function ClusterView({ board, themes, isLoading, onBackToBoard, onOpenExport }: ClusterViewProps) {
  if (isLoading) {
    return (
      <div id="ai-clustering-loading" className="flex flex-col items-center justify-center min-h-[400px] text-center p-8 bg-white border border-gray-200 rounded-xl shadow-none my-6 animate-in fade-in duration-300">
        <div className="relative flex items-center justify-center">
          {/* Animated Spinner Outer Ring */}
          <div className="h-14 w-14 border-3 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
          {/* Sparkle Icon Centered inside */}
          <Sparkles className="absolute h-5 w-5 text-indigo-500 animate-pulse" />
        </div>
        <h3 id="thinking-title" className="text-lg font-bold text-gray-900 mt-6 tracking-tight">
          Thinking…
        </h3>
        <p id="thinking-subtitle" className="text-xs text-gray-500 max-w-sm mt-2 leading-relaxed">
          AI is gathering columns (Start, Stop, and Continue), matching semantic similarities, identifying duplicates, and synthesizing action plan themes...
        </p>
      </div>
    );
  }

  return (
    <div id="cluster-view-dashboard" className="w-full space-y-6 animate-in fade-in duration-300">
      
      {/* Cluster Dashboard Control Bar */}
      <div id="cluster-controls-header" className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-5 bg-indigo-950 text-white rounded-xl shadow-sm border border-indigo-900">
        <div className="flex items-center space-x-3.5">
          <div className="p-2 bg-indigo-900 text-indigo-400 rounded-lg shrink-0">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold tracking-tight">
              AI Theme Segmentation Applied
            </h3>
            <p className="text-xs text-indigo-200 mt-0.5">
              Retrospective compiled into {themes.length} strategic themes based on team contributions.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            id="btn-back-to-column"
            onClick={onBackToBoard}
            className="inline-flex items-center px-4 py-2 border border-indigo-800 bg-indigo-900/50 text-xs font-bold uppercase tracking-wider text-indigo-100 hover:bg-indigo-800 hover:text-white rounded-lg transition-all duration-150 cursor-pointer"
          >
            <ArrowLeft className="h-3.5 w-3.5 mr-1" />
            Board columns
          </button>

          <button
            id="btn-trigger-action-export"
            onClick={onOpenExport}
            className="inline-flex items-center px-4 py-2 bg-amber-500 hover:bg-amber-600 text-xs font-bold uppercase tracking-wider text-indigo-950 rounded-lg transition-all duration-150 shadow-sm cursor-pointer"
          >
            <FileClock className="h-3.5 w-3.5 mr-1.5 shrink-0" />
            Export Plan
          </button>
        </div>
      </div>

      {/* Grid of Theme Cards */}
      {themes.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 bg-white border border-gray-150 rounded-2xl text-center">
          <AlertCircle className="h-10 w-10 text-gray-400 mb-3" />
          <h4 className="text-base font-semibold text-gray-700">No themes clustered</h4>
          <p className="text-xs text-gray-400 mt-1">Please make sure the board has enough feedback submitted.</p>
        </div>
      ) : (
        <div id="theme-cards-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {themes.map((theme, index) => (
            <ThemeCard key={index} theme={theme} />
          ))}
        </div>
      )}

      {/* Small informative prompt */}
      <div className="text-center text-xs text-gray-400 border border-gray-150 rounded-xl p-3 bg-white max-w-xl mx-auto flex items-center gap-2 justify-center">
        <Sparkles className="h-4 w-4 text-indigo-500 shrink-0" />
        <span>You can toggle back to columns at any time to add more cards and cluster them again!</span>
      </div>

    </div>
  );
}
