import React from 'react';
import { Plus, Flame, Lightbulb, PlayCircle, ToggleLeft } from 'lucide-react';
import { Card } from '../types';
import CardItem from './CardItem';
import { isDuplicate } from '../lib/similarity';

interface CardColumnProps {
  columnType: 'start' | 'stop' | 'continue';
  cards: Card[];
  isReadOnly: boolean;
  onDeleteCard: (id: string) => void;
}

export default function CardColumn({ columnType, cards, isReadOnly, onDeleteCard }: CardColumnProps) {
  
  // Style and Icon map
  const config = {
    start: {
      title: 'Start',
      textColor: 'text-green-700',
      dotColor: 'bg-green-500',
      borderColor: 'border-green-200',
      borderHeader: 'border-green-200',
      badgeStyle: 'text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full border border-green-200/50',
      bgColor: 'bg-green-50',
    },
    stop: {
      title: 'Stop',
      textColor: 'text-red-700',
      dotColor: 'bg-red-500',
      borderColor: 'border-red-200',
      borderHeader: 'border-red-200',
      badgeStyle: 'text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-full border border-red-200/50',
      bgColor: 'bg-red-50',
    },
    continue: {
      title: 'Continue',
      textColor: 'text-blue-700',
      dotColor: 'bg-blue-500',
      borderColor: 'border-blue-200',
      borderHeader: 'border-blue-200',
      badgeStyle: 'text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200/50',
      bgColor: 'bg-blue-50',
    },
  }[columnType];

  // Perform dynamic duplicate grouping
  // Each group is: { headCard: Card, similarCards: Card[] }
  const groupings: { headCard: Card; similarCards: Card[] }[] = [];

  cards.forEach((card) => {
    const match = groupings.find((g) => isDuplicate(g.headCard.text, card.text));
    if (match) {
      match.similarCards.push(card);
    } else {
      groupings.push({ headCard: card, similarCards: [] });
    }
  });

  return (
    <div 
      id={`column-${columnType}`} 
      className={`flex flex-col flex-1 min-h-[500px] border ${config.borderColor} ${config.bgColor} rounded-xl overflow-hidden transition-all duration-300 shadow-sm`}
    >
      {/* Column Header */}
      <div 
        id={`column-header-${columnType}`} 
        className={`p-4 border-b ${config.borderHeader} bg-white flex justify-between items-center`}
      >
        <h2 className={`${config.textColor} font-bold flex items-center gap-2`}>
          <span className={`w-2 h-2 rounded-full ${config.dotColor}`}></span>
          {config.title}
        </h2>
        <span 
          id={`column-badge-${columnType}`} 
          className={config.badgeStyle}
        >
          {cards.length} Cards
        </span>
      </div>

      {/* Cards List */}
      <div id={`column-lists-${columnType}`} className="flex-1 p-3 space-y-3 overflow-y-auto max-h-[600px]">
        {groupings.length === 0 ? (
          <div id={`empty-column-${columnType}`} className="flex flex-col items-center justify-center h-48 bg-white/40 border-2 border-dashed border-gray-200/50 rounded-xl text-center p-4">
            <span className="text-2xl opacity-50 select-none">💭</span>
            <p className="text-xs text-gray-400 font-medium mt-2">
              No ideas submitted yet
            </p>
          </div>
        ) : (
          groupings.map((group) => (
            <CardItem
              key={group.headCard.id}
              card={group.headCard}
              similarCount={group.similarCards.length}
              similarCards={group.similarCards}
              isReadOnly={isReadOnly}
              onDelete={onDeleteCard}
            />
          ))
        )}
      </div>
    </div>
  );
}
