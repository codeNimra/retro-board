import React, { useState } from 'react';
import { UserCheck, HelpCircle } from 'lucide-react';

interface JoinModalProps {
  onJoin: (name: string) => void;
  isOpen: boolean;
}

export default function JoinModal({ onJoin, isOpen }: JoinModalProps) {
  const [name, setName] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const displayName = name.trim() || 'Anonymous';
    onJoin(displayName);
  };

  return (
    <div id="join-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/60 backdrop-blur-sm p-4">
      <div 
        id="join-modal-content" 
        className="w-full max-w-md bg-white border border-gray-100 shadow-2xl rounded-2xl p-6 md:p-8 animate-in fade-in zoom-in duration-200"
      >
        <div className="text-center mb-6">
          <div id="join-icon" className="inline-flex items-center justify-center p-3.5 bg-indigo-50 text-indigo-600 rounded-full mb-4">
            <UserCheck className="h-6 w-6" />
          </div>
          <h3 id="join-modal-title" className="text-xl font-bold text-gray-900">
            Welcome to the Retro!
          </h3>
          <p id="join-modal-subtitle" className="text-sm text-gray-500 mt-1">
            Before jumping in, let us know what to call you.
          </p>
        </div>

        <form id="join-form" onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="join-name-input" className="block text-sm font-medium text-gray-700 mb-1">
              What's your name? <span className="text-xs text-gray-400 font-normal">(optional)</span>
            </label>
            <input
              id="join-name-input"
              type="text"
              placeholder="e.g., Alex (leave blank for Anonymous)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-sm"
              maxLength={25}
              autoFocus
            />
          </div>

          <button
            id="btn-join-retro"
            type="submit"
            className="w-full inline-flex items-center justify-center px-4 py-2.5 bg-indigo-600 border border-transparent rounded-lg text-sm font-medium text-white hover:bg-indigo-700 transition-colors duration-150 shadow-sm cursor-pointer"
          >
            Join Retro Board
          </button>
        </form>

        <div id="join-privacy-note" className="mt-4 flex items-start gap-2 text-xs text-gray-400 bg-gray-50 p-2.5 rounded-lg border border-gray-100">
          <HelpCircle className="h-4 w-4 text-gray-400 shrink-0 mt-0.5" />
          <span>
            <strong>Note:</strong> All card submissions are completely anonymous. Your name is only saved on your browser to identify you as an active member.
          </span>
        </div>
      </div>
    </div>
  );
}
