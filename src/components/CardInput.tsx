import React, { useState } from 'react';
import { Send, Smile, Info } from 'lucide-react';

interface CardInputProps {
  onAddCard: (text: string, column: 'start' | 'stop' | 'continue', emoji?: string) => void;
  isReadOnly: boolean;
}

export default function CardInput({ onAddCard, isReadOnly }: CardInputProps) {
  const [text, setText] = useState('');
  const [column, setColumn] = useState<'start' | 'stop' | 'continue'>('start');
  const [selectedEmoji, setSelectedEmoji] = useState<string | undefined>(undefined);

  if (isReadOnly) return null;

  const emojis = ['🎉', '💡', '🚀', '⚠️', '🐛', '✅', '❌', '🔥', '💬', '🤔', '👍', '👎'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    onAddCard(text.trim(), column, selectedEmoji);
    setText('');
    setSelectedEmoji(undefined);
  };

  const columnConfig = {
    start: {
      color: 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-105/40',
      activeTab: 'flex-1 py-1.5 text-[10px] font-bold rounded bg-green-500 text-white shadow-sm uppercase tracking-wider text-center cursor-pointer transition-all',
      inactiveTab: 'flex-1 py-1.5 text-[10px] font-bold rounded text-gray-400 hover:bg-white uppercase tracking-wider text-center cursor-pointer transition-all',
    },
    stop: {
      color: 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-105/40',
      activeTab: 'flex-1 py-1.5 text-[10px] font-bold rounded bg-red-500 text-white shadow-sm uppercase tracking-wider text-center cursor-pointer transition-all',
      inactiveTab: 'flex-1 py-1.5 text-[10px] font-bold rounded text-gray-400 hover:bg-white uppercase tracking-wider text-center cursor-pointer transition-all',
    },
    continue: {
      color: 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-105/40',
      activeTab: 'flex-1 py-1.5 text-[10px] font-bold rounded bg-blue-500 text-white shadow-sm uppercase tracking-wider text-center cursor-pointer transition-all',
      inactiveTab: 'flex-1 py-1.5 text-[10px] font-bold rounded text-gray-400 hover:bg-white uppercase tracking-wider text-center cursor-pointer transition-all',
    },
  };

  return (
    <div id="card-input-panel" className="w-full bg-white border border-gray-200 rounded-xl p-5 shadow-sm mt-6 transition-all duration-300">
      
      <form id="card-submission-form" onSubmit={handleSubmit} className="space-y-4 max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row gap-5">
          
          {/* Thoughts Input Block */}
          <div className="flex-1 space-y-2">
            <label className="block text-[10px] font-bold text-gray-450 uppercase tracking-widest">
              Add your thoughts
            </label>
            <div id="text-input-wrapper" className="relative">
              <textarea
                id="card-feedback-text"
                required
                rows={2}
                maxLength={280}
                placeholder="Something we should start, stop, or continue doing?"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full h-24 p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-505 focus:border-transparent outline-none resize-none text-sm placeholder-gray-400 shadow-inner text-gray-800 pr-12 transition-all duration-150"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
              />
              <span className="absolute right-3 bottom-3 text-[10px] text-gray-400 font-mono">
                {text.length}/280
              </span>
            </div>
          </div>

          {/* Quick action tools on right column */}
          <div className="flex flex-col gap-3.5 w-full md:w-56 justify-end">
            
            {/* Column selector container */}
            <div className="space-y-1.5">
              <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">
                Category
              </span>
              <div id="column-selector-group" className="flex gap-1 justify-between p-1 bg-gray-100 rounded-md border border-gray-200 w-full select-none">
                <button
                  id="tab-select-start"
                  type="button"
                  onClick={() => setColumn('start')}
                  className={column === 'start' ? columnConfig.start.activeTab : columnConfig.start.inactiveTab}
                >
                  Start
                </button>
                
                <button
                  id="tab-select-stop"
                  type="button"
                  onClick={() => setColumn('stop')}
                  className={column === 'stop' ? columnConfig.stop.activeTab : columnConfig.stop.inactiveTab}
                >
                  Stop
                </button>
                
                <button
                  id="tab-select-continue"
                  type="button"
                  onClick={() => setColumn('continue')}
                  className={column === 'continue' ? columnConfig.continue.activeTab : columnConfig.continue.inactiveTab}
                >
                  Cont
                </button>
              </div>
            </div>

            {/* Quick tag emojis */}
            <div className="space-y-1.5">
              <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">
                Add Tag Emoji
              </span>
              <div id="quick-emoji-row" className="grid grid-cols-6 gap-1 w-full">
                {emojis.slice(0, 12).map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => setSelectedEmoji(selectedEmoji === emoji ? undefined : emoji)}
                    className={`text-sm p-1 rounded hover:bg-gray-100 select-none cursor-pointer text-center leading-none border ${
                      selectedEmoji === emoji 
                        ? 'bg-amber-100 border-amber-300 scale-105 shadow-sm font-bold' 
                        : 'border-transparent'
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit trigger button */}
            <button
              id="btn-submit-retro-card"
              type="submit"
              disabled={!text.trim()}
              className={`w-full py-2 pb-2.5 rounded-lg text-sm font-bold tracking-wide shadow-lg transition-all duration-150 shrink-0 cursor-pointer text-center ${
                text.trim() 
                  ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-100 hover:shadow-indigo-200 hover:translate-y-[-1px]' 
                  : 'bg-gray-100 border border-gray-200 text-gray-400 cursor-not-allowed shadow-none'
              }`}
            >
              Add Card
            </button>

          </div>

        </div>
      </form>

      <div id="submission-privacy-disclosure" className="max-w-4xl mx-auto flex items-center justify-center gap-1.5 text-[10px] text-gray-400 mt-4 pt-3 border-t border-gray-100">
        <Info className="h-3.5 w-3.5 text-gray-300 shrink-0" />
        <span>Submissions are encrypted & anonymous. Refreshing or reloading keeps your workspace synced instantly.</span>
      </div>
    </div>
  );
}
