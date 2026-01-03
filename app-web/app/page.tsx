'use client';

import { useState, useMemo } from 'react';
import { Feed } from '@/components/Feed';
import { PostForm } from '@/components/PostForm';
import { ViewSwitcher, ViewMode } from '@/components/ViewSwitcher';
import { FeedFilter, FilterOptions } from '@/components/FeedFilter';
import { CalendarView } from '@/components/CalendarView';
import { MapView } from '@/components/MapView';
import { mockPosts } from '@/data/mockPosts';
import { filterPosts, getUniqueTagsFromPosts } from '@/lib/filterPosts';
import type { Post } from '@/types/post';

export default function Home() {
  const [currentView, setCurrentView] = useState<ViewMode>('list');
  const [filters, setFilters] = useState<FilterOptions>({
    tags: [],
    location: '',
    timeRange: 'all',
  });

  const availableTags = useMemo(() => getUniqueTagsFromPosts(mockPosts), []);
  const filteredPosts = useMemo(() => filterPosts(mockPosts, filters), [filters]);

  const handlePostClick = (_post: Post) => {
    // TODO: 将来的にはモーダル表示やルーティングを実装
  };

  const renderContent = () => {
    switch (currentView) {
      case 'list':
        return <Feed initialPosts={filteredPosts} onPostClick={handlePostClick} />;
      case 'calendar':
        return <CalendarView posts={filteredPosts} onPostClick={handlePostClick} />;
      case 'map':
        return <MapView posts={filteredPosts} onPostClick={handlePostClick} />;
      default:
        return <Feed initialPosts={filteredPosts} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10" role="banner">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-2xl font-bold text-gray-900">Wyly</h1>
            <nav className="flex gap-4" aria-label="メインナビゲーション">
              <button
                className="text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 rounded"
                aria-current="page"
              >
                ホーム
              </button>
              <button className="text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 rounded">
                探索
              </button>
              <button className="text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 rounded">
                通知
              </button>
              <button className="text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 rounded">
                プロフィール
              </button>
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
