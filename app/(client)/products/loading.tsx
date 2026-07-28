import React from 'react';

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white px-4">
      <div className="text-center">
        <div className="mx-auto mb-6 h-16 w-16 rounded-full border-4 border-white/20 border-t-white animate-spin" />
        <p className="text-lg font-medium">Loading products...</p>
        <p className="text-sm text-slate-300 mt-2">Please wait while we fetch the latest items.</p>
      </div>
    </div>
  );
}
