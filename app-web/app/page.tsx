'use client';

import { useState, useMemo } from 'react';
import { Feed } from '@/components/Feed';
import { PostForm } from '@/components/PostForm';
import { ViewSwitcher, ViewMode } from '@/components/ViewSwitcher';
import { FeedFilter, FilterOptions } from '@/components/FeedFilter';
import { mockPosts } from '@/data/mockPosts';
import { filterPosts, getUniqueTagsFromPosts } from '@/lib/filterPosts';

export default function Home() {
  const [currentView, setCurrentView] = useState<ViewMode>('list');
  const [filters, setFilters] = useState<FilterOptions>({
    tags: [],
    location: '',
    timeRange: 'all',
  });

  const availableTags = useMemo(() => getUniqueTagsFromPosts(mockPosts), []);
  const filteredPosts = useMemo(() => filterPosts(mockPosts, filters), [filters]);

  const renderContent = () => {
    switch (currentView) {
      case 'list':
        return <Feed initialPosts={filteredPosts} />;
      case 'calendar':
        return (
          <div className="flex items-center justify-center py-12 text-gray-500">
            <p>カレンダービュー（Phase 5で実装予定）</p>
          </div>
        );
      case 'map':
        return (
          <div className="flex items-center justify-center py-12 text-gray-500">
            <p>マップビュー（Phase 5で実装予定）</p>
          </div>
        );
      default:
        return <Feed initialPosts={filteredPosts} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-2xl font-bold text-gray-900">Wyly</h1>
            <nav className="flex gap-4">
              <button className="text-gray-600 hover:text-gray-900">ホーム</button>
              <button className="text-gray-600 hover:text-gray-900">探索</button>
              <button className="text-gray-600 hover:text-gray-900">通知</button>
              <button className="text-gray-600 hover:text-gray-900">プロフィール</button>
            </nav>
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* 投稿フォーム */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4">新しい投稿</h2>
            <PostForm />
          </div>

          {/* ビュー切り替えとフィルター */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <ViewSwitcher currentView={currentView} onViewChange={setCurrentView} />
            <FeedFilter onFilterChange={setFilters} availableTags={availableTags} />
          </div>

          {/* コンテンツ */}
          <div className="space-y-6">{renderContent()}</div>
        </div>
      </main>
    </div>
  );
}
