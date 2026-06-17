import React, { useState } from 'react';
import { PlusCircle, Sparkles, FolderHeart } from 'lucide-react';
import { DEMO_BOARD_ID } from '../lib/demo-data';

interface LandingFormProps {
  onCreateBoard: (title: string) => void;
  onViewDemo: () => void;
}

export default function LandingForm({ onCreateBoard, onViewDemo }: LandingFormProps) {
  const [title, setTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onCreateBoard(title.trim());
  };

  return (
    <div id="landing-container" className="max-w-xl w-full mx-auto px-6 py-12 bg-white border border-gray-100 shadow-xl rounded-2xl transition-all duration-300">
      <div className="text-center mb-8">
        <div id="app-logo-accent" className="inline-flex items-center justify-center p-3 bg-indigo-50 text-indigo-600 rounded-xl mb-4">
          <Sparkles className="h-8 w-8 animate-pulse" />
        </div>
        <h2 id="landing-title" className="text-3xl font-bold text-gray-900 tracking-tight">
          Start a Retrospective
        </h2>
        <p id="landing-subtitle" className="mt-2 text-sm text-gray-500">
          Gather honest feedback, cluster cards into AI-powered themes, and build clear action plans together.
        </p>
      </div>

      <form id="create-retro-form" onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="retro-title" className="block text-sm font-medium text-gray-700 mb-1.5">
            What retro is this for?
          </label>
          <input
            id="retro-title"
            type="text"
            required
            placeholder="e.g., Sprint 42 Retro"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-base"
          />
        </div>

        <button
          id="btn-create-retro"
          type="submit"
          className="w-full inline-flex items-center justify-center px-4 py-3 bg-indigo-600 border border-transparent rounded-xl text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-150 shadow-md cursor-pointer"
        >
          <PlusCircle className="mr-2 h-5 w-5" />
          Create Retro Board
        </button>
      </form>

      <div id="landing-divider" className="relative my-8">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-100" />
        </div>
        <div className="relative flex justify-center text-xs text-gray-400 uppercase tracking-widest bg-white px-3 font-medium">
          Or view an existing retrospective
        </div>
      </div>

      <div id="demo-retro-section" className="text-center">
        <button
          id="btn-view-demo-retro"
          onClick={onViewDemo}
          className="w-full inline-flex items-center justify-center px-4 py-3 bg-amber-50 border border-amber-200 hover:bg-amber-100 text-amber-800 rounded-xl text-base font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-all duration-150 shadow-sm cursor-pointer"
        >
          <FolderHeart className="mr-2 h-5 w-5 text-amber-600" />
          View Example Retro →
        </button>
        <p className="mt-2 text-xs text-amber-600/80 italic">
          Loads a real-world PM/Engineering board with 12 pre-loaded cards & instantly clustered results.
        </p>
      </div>

      <div id="landing-empty-state-copy" className="text-center mt-12 text-xs text-gray-400">
        Create a new retro to get started. All boards are persisted locally on your device.
      </div>
    </div>
  );
}
