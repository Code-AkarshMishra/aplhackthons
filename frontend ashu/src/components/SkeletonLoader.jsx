import React from 'react';

export const SkeletonCard = () => (
  <div className="glass-panel rounded-2xl p-6 animate-pulse space-y-4">
    <div className="h-6 w-1/3 bg-slate-300 dark:bg-slate-800 rounded"></div>
    <div className="h-10 w-full bg-slate-300 dark:bg-slate-800 rounded"></div>
    <div className="space-y-2">
      <div className="h-4 w-full bg-slate-300 dark:bg-slate-800 rounded"></div>
      <div className="h-4 w-5/6 bg-slate-300 dark:bg-slate-800 rounded"></div>
    </div>
  </div>
);

export const SkeletonRow = () => (
  <div className="flex items-center space-x-4 py-3 animate-pulse">
    <div className="rounded-full bg-slate-300 dark:bg-slate-800 h-10 w-10"></div>
    <div className="flex-1 space-y-2 py-1">
      <div className="h-4 bg-slate-300 dark:bg-slate-800 rounded w-1/4"></div>
      <div className="h-3 bg-slate-300 dark:bg-slate-800 rounded w-3/4"></div>
    </div>
    <div className="h-6 bg-slate-300 dark:bg-slate-800 rounded w-16"></div>
  </div>
);

export const SkeletonList = ({ count = 3 }) => (
  <div className="space-y-4">
    {Array.from({ length: count }).map((_, i) => (
      <SkeletonRow key={i} />
    ))}
  </div>
);
