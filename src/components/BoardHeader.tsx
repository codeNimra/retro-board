import React, { useState } from 'react';
import { Share2, Check, ArrowLeft, RotateCcw, Flame } from 'lucide-react';
import { Board } from '../types';
import Timer from './Timer';

interface BoardHeaderProps {
  board: Board;
  isReadOnly: boolean;
  onTimerExpire: () => void;
  onGoBack: () => void;
  onResetBoard?: () => void; // Option to clear cards and reset board (great for testing!)
}

export default function BoardHeader({ board, isReadOnly, onTimerExpire, onGoBack, onResetBoard }: BoardHeaderProps) {
  const [copied, setCopied] = useState(false);

  const getShareUrl = () => {
    if (typeof window === 'undefined') return '';
    // Share using clean URL containing hash route to this board
    return `${window.location.origin}${window.location.pathname}#/board/${board.id}`;
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(getShareUrl());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      pendo.track("share_link_copied", {
        board_id: board.id,
        is_read_only: isReadOnly,
        is_example_board: !!board.isExample,
        board_title: board.title,
      });
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div id="board-header-section" className="w-full bg-white border-b border-gray-200 py-4 px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          
          {/* Title & Navigation */}
          <div className="flex items-center space-x-3.5">
            <button
              id="btn-nav-back"
              onClick={onGoBack}
              className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-500 hover:text-gray-800 transition-all cursor-pointer"
              title="Back to Landing Page"
            >
              <ArrowLeft className="h-4.5 w-4.5" />
            </button>
            <div className="bg-indigo-600 p-2 rounded-lg text-white shrink-0 hidden sm:block">
              <svg className="w-5.5 h-5.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 id="board-title" className="text-xl font-bold text-gray-900 tracking-tight leading-none">
                  {board.title}
                </h1>
                {board.isExample && (
                  <span id="demo-indicator" className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200 uppercase tracking-widest">
                    Example
                  </span>
                )}
              </div>
              <p id="board-creation-meta" className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-1">
                Facilitated Retro &bull; Created {new Date(board.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Share, Timer, Actions */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Timer component */}
            <Timer expiresAt={board.expiresAt} onExpire={onTimerExpire} />

            {/* Share Link component */}
            <div id="share-link-group" className="flex items-center bg-gray-50 border border-gray-250 rounded-lg p-0.5 text-xs">
              <span className="text-gray-400 font-mono text-[11px] truncate max-w-[120px] md:max-w-xs px-2.5 select-all">
                {getShareUrl()}
              </span>
              <button
                id="btn-copy-join-link"
                onClick={handleCopy}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-colors duration-150 cursor-pointer ${
                  copied 
                    ? 'bg-emerald-600 text-white shadow-sm' 
                    : 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 shadow-sm'
                }`}
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 mr-0.5" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Share2 className="h-3.5 w-3.5 text-gray-400" />
                    Copy Link
                  </>
                )}
              </button>
            </div>

            {/* Reset Card state for testing (not on demo) */}
            {onResetBoard && (
              <button
                id="btn-reset-retro-board"
                onClick={onResetBoard}
                className="inline-flex items-center px-3 py-1.5 border border-red-200 bg-red-50 text-red-650 rounded-lg text-xs font-semibold hover:bg-red-100 transition-colors cursor-pointer"
                title="Clear all cards and reset clusters"
              >
                <RotateCcw className="h-3.5 w-3.5 mr-1" />
                Reset
              </button>
            )}
          </div>

        </div>

        {/* Expiry Banner */}
        {isReadOnly && (
          <div 
            id="expiry-read-only-banner" 
            className="mt-4 flex items-center p-3 bg-red-50 border border-red-100 text-red-900 text-sm font-semibold rounded-xl text-center shadow-inner animate-in slide-in-from-top duration-200"
          >
            <div className="mx-auto flex items-center">
              <span className="flex h-2 w-2 relative mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              This retro has ended. You can still view and export results. Card submissions are disabled.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
