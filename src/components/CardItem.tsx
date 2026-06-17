import React, { useState } from 'react';
import { Trash2, AlertCircle, Users, ChevronDown, ChevronUp } from 'lucide-react';
import { Card } from '../types';

interface CardItemProps {
  card: Card;
  similarCount: number;
  similarCards: Card[];
  isReadOnly: boolean;
  onDelete?: (id: string) => void;
  key?: any;
}

export default function CardItem({ card, similarCount, similarCards, isReadOnly, onDelete }: CardItemProps) {
  const [showDuplicates, setShowDuplicates] = useState(false);

  const formattedTime = new Date(card.createdAt).toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit',
  });

  return (
    <div 
      id={`card-item-${card.id}`} 
      className="group relative flex flex-col bg-white border border-gray-200 hover:border-indigo-250 hover:shadow-md rounded-lg p-3.5 shadow-sm transition-all duration-200 animate-in fade-in duration-300"
    >
      {/* Absolute Dynamic Similarity badge at top-right to match Clean Utility mockup */}
      {similarCount > 0 && (
        <button
          onClick={() => setShowDuplicates(!showDuplicates)}
          className="absolute -top-2 -right-2 bg-indigo-100 text-indigo-700 text-[10px] font-extrabold px-1.5 py-0.5 rounded-full border border-indigo-200 hover:bg-indigo-150 transition-colors duration-200 shadow-sm cursor-pointer select-none"
          title="Toggle duplicate feedback group"
        >
          +{similarCount} similar
        </button>
      )}

      <div className="flex items-start justify-between gap-2">
        {/* Main Content & Emoji */}
        <div className="flex items-start space-x-2">
          {card.emoji && (
            <span id="card-emoji" className="text-sm select-none shrink-0" role="img" aria-label="card emoji">
              {card.emoji}
            </span>
          )}
          <p id="card-text" className="text-sm text-gray-800 font-medium leading-snug whitespace-pre-wrap break-words">
            {card.text}
          </p>
        </div>

        {/* Delete Trigger */}
        {!isReadOnly && onDelete && (
          <button
            id={`btn-delete-card-${card.id}`}
            onClick={() => onDelete(card.id)}
            className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-red-500 rounded-lg hover:bg-gray-50 transition-all duration-150 shrink-0 cursor-pointer"
            title="Delete card"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Expanded Similarity detail list if toggled */}
      {similarCount > 0 && showDuplicates && (
        <div id="similarity-wrap" className="mt-2.5 pt-2 border-t border-dashed border-gray-100">
          <div id="duplicates-nested-list" className="bg-gray-50/50 border border-gray-150 rounded-lg p-2 space-y-1.5 animate-in slide-in-from-top-1 duration-150">
            {similarCards.map((sc) => (
              <div key={sc.id} className="text-[11px] text-gray-500 flex items-start gap-1 pb-1 border-b border-gray-100 last:border-0 last:pb-0">
                {sc.emoji && <span className="mr-0.5 select-none">{sc.emoji}</span>}
                <span className="italic">"{sc.text}"</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer Meta */}
      <div id="card-footer-meta" className="flex items-center justify-between mt-2.5 pt-1.5 text-[10px] text-gray-400 font-mono">
        <span>Anonymous</span>
        <span>{formattedTime}</span>
      </div>
    </div>
  );
}
