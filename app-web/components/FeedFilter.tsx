'use client';

import { useState } from 'react';
import { Filter, X } from 'lucide-react';

export interface FilterOptions {
  tags: string[];
  location: string;
  timeRange: 'all' | 'today' | 'week' | 'month';
}

interface FeedFilterProps {
  onFilterChange: (filters: FilterOptions) => void;
  availableTags: string[];
}

export function FeedFilter({ onFilterChange, availableTags }: FeedFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    tags: [],
    location: '',
    timeRange: 'all',
  });

  const handleTagToggle = (tag: string) => {
    const newTags = filters.tags.includes(tag)
      ? filters.tags.filter((t) => t !== tag)
      : [...filters.tags, tag];

    const newFilters = { ...filters, tags: newTags };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleLocationChange = (location: string) => {
    const newFilters = { ...filters, location };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleTimeRangeChange = (timeRange: FilterOptions['timeRange']) => {
    const newFilters = { ...filters, timeRange };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters: FilterOptions = {
      tags: [],
      location: '',
      timeRange: 'all',
    };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  const hasActiveFilters =
    filters.tags.length > 0 || filters.location !== '' || filters.timeRange !== 'all';

  return (
    <div className="relative">
      {/* フィルターボタン */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls="filter-panel"
        aria-label={`フィルター${hasActiveFilters ? ` (${filters.tags.length + (filters.location ? 1 : 0) + (filters.timeRange !== 'all' ? 1 : 0)}件適用中)` : ''}`}
        className={`
          flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
          ${
            hasActiveFilters
              ? 'bg-blue-50 border-blue-300 text-blue-700'
              : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
          }
        `}
      >
        <Filter className="w-4 h-4" aria-hidden="true" />
        フィルター
        {hasActiveFilters && (
          <span
            className="bg-blue-600 text-white text-xs rounded-full px-2 py-0.5"
            aria-hidden="true"
          >
            {filters.tags.length +
              (filters.location ? 1 : 0) +
              (filters.timeRange !== 'all' ? 1 : 0)}
          </span>
        )}
      </button>

      {/* フィルターパネル */}
      {isOpen && (
        <div
          id="filter-panel"
          role="dialog"
          aria-label="フィルター設定"
          className="absolute top-full mt-2 left-0 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-20 p-4"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900" id="filter-panel-title">
              フィルター
            </h3>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="フィルターパネルを閉じる"
              className="text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded"
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>

          {/* 時期フィルター */}
          <fieldset className="mb-4">
            <legend className="block text-sm font-medium text-gray-700 mb-2">投稿時期</legend>
            <div className="grid grid-cols-2 gap-2" role="group" aria-label="投稿時期を選択">
              {[
                { value: 'all', label: 'すべて' },
                { value: 'today', label: '今日' },
                { value: 'week', label: '今週' },
                { value: 'month', label: '今月' },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleTimeRangeChange(option.value as FilterOptions['timeRange'])}
                  aria-pressed={filters.timeRange === option.value}
                  className={`
                    px-3 py-2 text-sm rounded-md border transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                    ${
                      filters.timeRange === option.value
                        ? 'bg-blue-50 border-blue-300 text-blue-700'
                        : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                    }
                  `}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </fieldset>

          {/* 場所フィルター */}
          <div className="mb-4">
            <label
              htmlFor="location-filter"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              場所
            </label>
            <input
              id="location-filter"
              type="text"
              value={filters.location}
              onChange={(e) => handleLocationChange(e.target.value)}
              placeholder="場所で検索..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* タグフィルター */}
          <fieldset className="mb-4">
            <legend className="block text-sm font-medium text-gray-700 mb-2">タグ</legend>
            <div
              className="flex flex-wrap gap-2 max-h-32 overflow-y-auto"
              role="group"
              aria-label="タグを選択"
            >
              {availableTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleTagToggle(tag)}
                  aria-pressed={filters.tags.includes(tag)}
                  className={`
                    px-3 py-1 text-sm rounded-full border transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                    ${
                      filters.tags.includes(tag)
                        ? 'bg-blue-50 border-blue-300 text-blue-700'
                        : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                    }
                  `}
                >
                  {tag}
                </button>
              ))}
            </div>
          </fieldset>

          {/* フィルタークリア */}
          {hasActiveFilters && (
            <div className="pt-3 border-t border-gray-200">
              <button
                onClick={clearFilters}
                className="w-full px-4 py-2 text-sm text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                フィルターをクリア
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
