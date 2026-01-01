'use client';

import React from 'react';
import { LayoutGrid, Calendar, MapPin } from 'lucide-react';

export type ViewMode = 'list' | 'calendar' | 'map';

interface ViewSwitcherProps {
  currentView: ViewMode;
  onViewChange: (view: ViewMode) => void;
}

export function ViewSwitcher({ currentView, onViewChange }: ViewSwitcherProps) {
  const views: { mode: ViewMode; icon: React.ReactNode; label: string }[] = [
    {
      mode: 'list',
      icon: <LayoutGrid className="w-4 h-4" />,
      label: 'リスト',
    },
    {
      mode: 'calendar',
      icon: <Calendar className="w-4 h-4" />,
      label: 'カレンダー',
    },
    {
      mode: 'map',
      icon: <MapPin className="w-4 h-4" />,
      label: 'マップ',
    },
  ];

  return (
    <div className="flex bg-white border border-gray-200 rounded-lg p-1">
      {views.map((view) => (
        <button
          key={view.mode}
          onClick={() => onViewChange(view.mode)}
          className={`
            flex items-center gap-2 px-4 py-2 rounded-md transition-colors
            ${
              currentView === view.mode
                ? 'bg-gray-900 text-white'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }
          `}
          aria-pressed={currentView === view.mode}
          aria-label={`${view.label}ビューに切り替え`}
        >
          {view.icon}
          <span className="text-sm font-medium">{view.label}</span>
        </button>
      ))}
    </div>
  );
}
