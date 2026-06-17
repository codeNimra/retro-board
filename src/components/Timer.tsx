import React, { useEffect, useState } from 'react';
import { Timer as TimerIcon, Play, AlertTriangle } from 'lucide-react';

interface TimerProps {
  expiresAt: number;
  onExpire?: () => void;
}

export default function Timer({ expiresAt, onExpire }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState<number>(0);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = expiresAt - Date.now();
      return Math.max(0, difference);
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      const remaining = calculateTimeLeft();
      setTimeLeft(remaining);
      
      if (remaining === 0) {
        clearInterval(timer);
        if (onExpire) {
          onExpire();
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [expiresAt, onExpire]);

  const minutes = Math.floor((timeLeft / 1000 / 60) % 60);
  const seconds = Math.floor((timeLeft / 1000) % 60);

  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  const isCritical = timeLeft < 60 * 1000 && timeLeft > 0; // Less than 1 minute

  if (timeLeft === 0) {
    return (
      <div id="countdown-timer" className="inline-flex items-center px-3.5 py-1.5 bg-red-50 text-red-700 border border-red-200 rounded-full font-mono text-xs font-bold uppercase tracking-wide shadow-sm">
        <AlertTriangle className="h-4 w-4 mr-1.5 text-red-500 shrink-0" />
        Read-only (Ended)
      </div>
    );
  }

  return (
    <div 
      id="countdown-timer" 
      className={`inline-flex items-center bg-gray-100 rounded-full px-3.5 py-1.5 border border-gray-200 transition-colors duration-200 ${
        isCritical ? 'border-amber-300 animate-pulse' : ''
      }`}
    >
      <span className="text-xs font-mono font-bold text-gray-500 mr-2 uppercase tracking-wider">
        Time Remaining
      </span>
      <span className={`text-sm font-bold font-mono ${isCritical ? 'text-amber-600 animate-pulse' : 'text-indigo-700'}`}>
        {formatNumber(minutes)}:{formatNumber(seconds)}
      </span>
    </div>
  );
}
