import React from 'react';

export default function LoadingSpinner() {
  return (
    <div className="flex-1 flex items-center justify-center min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 border-4 border-zinc-200 dark:border-zinc-800 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
      </div>
    </div>
  );
}
