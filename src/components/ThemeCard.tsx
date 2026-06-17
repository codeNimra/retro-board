import React, { useState } from 'react';
import { ShieldCheck, ArrowRight, ChevronDown, ChevronUp, Copy, PlayCircle, Flame, Lightbulb } from 'lucide-react';
import { Theme, Card } from '../types';

interface ThemeCardProps {
  theme: Theme;
  key?: any;
}

export default function ThemeCard({ theme }: ThemeCardProps) {
  const [showDuplicates, setShowDuplicates] = useState(false);

  // Confidence Color Map
  const getConfidenceStyle = (score: number) => {
    if (score >= 80) {
      return 'bg-emerald-50 text-emerald-700 border-emerald-200/50';
    } else if (score >= 60) {
      return 'bg-amber-50 text-amber-700 border-amber-200/50';
    } else {
      return 'bg-rose-50 text-rose-700 border-rose-200/50';
    }
  };

  const totalDuplicates = theme.duplicates ? theme.duplicates.reduce((acc, current) => acc + current.length, 0) : 0;

  return (
    <div 
      id={`theme-card-${theme.name.toLowerCase().replace(/\s+/g, '-')}`} 
      className="bg-white border border-gray-200 hover:border-indigo-250 rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300"
    >
      {/* Header Info */}
      <div id="theme-card-header" className="flex flex-col pb-3.5 border-b border-gray-100">
        <div className="flex items-start justify-between gap-2">
          <h4 id="theme-name" className="text-base font-bold text-gray-900 tracking-tight leading-snug">
            {theme.name}
          </h4>
          
          {/* Confidence Badge */}
          <div id="theme-confidence-badge" className={`shrink-0 px-2 py-0.5 text-[10px] font-bold rounded-md border uppercase tracking-wider ${getConfidenceStyle(theme.confidence)}`}>
            {theme.confidence}% match
          </div>
        </div>

        <div id="theme-card-distribution-indicator" className="text-[10px] font-bold mt-2 flex items-center gap-1.5 flex-wrap">
          <span className="flex items-center gap-1 text-green-600 bg-green-50 px-1.5 py-0.5 rounded border border-green-100/50"><PlayCircle className="h-3.5 w-3.5 shrink-0" />{theme.columnDistribution.start} START</span>
          <span className="flex items-center gap-1 text-red-600 bg-red-50 px-1.5 py-0.5 rounded border border-red-100/50"><Flame className="h-3.5 w-3.5 shrink-0" />{theme.columnDistribution.stop} STOP</span>
          <span className="flex items-center gap-1 text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-100/50"><Lightbulb className="h-3.5 w-3.5 shrink-0" />{theme.columnDistribution.continue} KEEP</span>
        </div>
      </div>

      {/* Recommended Next Step Block */}
      <div id="theme-rec-block" className="mt-4 bg-indigo-50/40 border border-indigo-100/60 rounded-lg p-3.5">
        <div className="flex items-start space-x-2">
          <div className="p-1 bg-indigo-100 text-indigo-700 roundedshrink-0 mt-0.5">
            <ArrowRight className="h-3 w-3" />
          </div>
          <div>
            <h5 className="text-[10px] font-bold text-indigo-800 uppercase tracking-widest leading-none">
              Recommended Action
            </h5>
            <p id="recommendation-text" className="text-xs text-indigo-950 mt-1.5 font-medium leading-relaxed">
              {theme.recommendedNextStep}
            </p>
          </div>
        </div>
      </div>

      {/* Representative Cards List (Up to 3) */}
      <div id="theme-samples-block" className="mt-4.5 space-y-2.5">
        <h5 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
          Key Feedback contributions
        </h5>
        
        <div className="space-y-2">
          {theme.sampleCards && theme.sampleCards.slice(0, 3).map((card, i) => (
            <div 
              key={card.id || i}
              className="flex items-start space-x-2 p-2.5 bg-gray-50 border border-gray-150/40 rounded-lg text-xs text-gray-700 leading-normal"
            >
              {card.emoji && (
                <span className="text-sm select-none shrink-0" role="img" aria-label="emoji label">
                  {card.emoji}
                </span>
              )}
              <span className="italic">"{card.text}"</span>
            </div>
          ))}

          {(!theme.sampleCards || theme.sampleCards.length === 0) && (
            <p className="text-xs text-gray-400 italic">No feedback sample available.</p>
          )}
        </div>
      </div>

      {/* Duplicate Cards collapsed list */}
      {totalDuplicates > 0 && theme.duplicates && (
        <div id="theme-duplicates-toggle-section" className="mt-5 pt-3.5 border-t border-gray-100">
          <button
            id="btn-toggle-theme-duplicates"
            onClick={() => setShowDuplicates(!showDuplicates)}
            className="flex items-center justify-between w-full text-xs font-semibold text-gray-500 hover:text-gray-800 transition-colors cursor-pointer"
          >
            <span>Show duplicate/similar cards ({totalDuplicates})</span>
            {showDuplicates ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>

          {showDuplicates && (
            <div id="theme-duplicates-list" className="mt-3.5 space-y-3 bg-gray-50/50 border border-gray-150 rounded-xl p-3 animate-in slide-in-from-top-2 duration-200">
              {theme.duplicates.map((dupGroup, idx) => (
                <div key={idx} className="border-b border-gray-150/40 last:border-0 pb-2 last:pb-0">
                  <span className="text-[10px] font-bold text-amber-600 uppercase">Cluster Pair {idx + 1}</span>
                  <div className="space-y-1 mt-1">
                    {dupGroup.map((card) => (
                      <div key={card.id} className="text-xs text-gray-600 pl-2 border-l-2 border-gray-200">
                        {card.emoji && <span className="mr-1">{card.emoji}</span>}
                        <span>"{card.text}"</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
