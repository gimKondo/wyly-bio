'use client';

import { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PostCard } from './PostCard';
import type { Post } from '@/lib/data';

interface CalendarViewProps {
  posts: Post[];
  onPostClick: (post: Post) => void;
}

export function CalendarView({ posts, onPostClick }: CalendarViewProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // 月曜始まりのカレンダーにするため調整
  const startDate = useMemo(() => {
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const date = new Date(firstDayOfMonth);
    const dayOfWeek = date.getDay();
    const daysToSubtract = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    date.setDate(date.getDate() - daysToSubtract);
    return date;
  }, [currentDate]);

  // カレンダーの最終日（6週分表示）
  const endDate = useMemo(() => {
    const date = new Date(startDate);
    date.setDate(date.getDate() + 41);
    return date;
  }, [startDate]);

  // 日付ごとの投稿をグループ化
  const postsByDate = useMemo(() => {
    const grouped: Record<string, Post[]> = {};
    posts.forEach((post) => {
      const date = new Date(post.createdAt);
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
      if (!grouped[key]) {
        grouped[key] = [];
      }
      grouped[key].push(post);
    });
    return grouped;
  }, [posts]);

  // 選択日の投稿
  const selectedPosts = useMemo(() => {
    if (!selectedDate) return [];
    const key = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`;
    return postsByDate[key] || [];
  }, [selectedDate, postsByDate]);

  // カレンダーの日付配列を生成
  const calendarDays = useMemo(() => {
    const days = [];
    const current = new Date(startDate);

    while (current <= endDate) {
      days.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }

    return days;
  }, [startDate, endDate]);

  const navigateToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
    setSelectedDate(null);
  };

  const navigateToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
    setSelectedDate(null);
  };

  const formatMonthYear = (date: Date) => {
    return new Intl.DateTimeFormat('ja-JP', {
      year: 'numeric',
      month: 'long',
    }).format(date);
  };

  const getDayKey = (date: Date) => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      date.getDate() === today.getDate()
    );
  };

  const isSelected = (date: Date) => {
    if (!selectedDate) return false;
    return (
      date.getFullYear() === selectedDate.getFullYear() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getDate() === selectedDate.getDate()
    );
  };

  const isCurrentMonth = (date: Date) => {
    return (
      date.getMonth() === currentDate.getMonth() && date.getFullYear() === currentDate.getFullYear()
    );
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={navigateToPreviousMonth}
              aria-label="前月へ"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <h2 className="text-lg font-semibold">{formatMonthYear(currentDate)}</h2>
            <Button variant="ghost" size="icon" onClick={navigateToNextMonth} aria-label="翌月へ">
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-2">
            {['月', '火', '水', '木', '金', '土', '日'].map((day) => (
              <div key={day} className="text-center text-sm font-medium text-gray-700 py-2">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((date, index) => {
              const key = getDayKey(date);
              const dayPosts = postsByDate[key] || [];
              const hasPost = dayPosts.length > 0;
              const isInCurrentMonth = isCurrentMonth(date);

              return (
                <button
                  key={index}
                  onClick={() => setSelectedDate(date)}
                  className={`
                    relative aspect-square p-1 text-sm
                    transition-colors rounded-lg
                    ${isInCurrentMonth ? 'text-gray-900' : 'text-gray-400'}
                    ${isToday(date) ? 'bg-blue-100 font-bold' : ''}
                    ${isSelected(date) ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}
                  `}
                  aria-label={`${date.getDate()}日${hasPost ? ` - ${dayPosts.length}件の投稿` : ''}`}
                >
                  <span className="block">{date.getDate()}</span>
                  {hasPost && (
                    <span
                      className={`
                      absolute bottom-1 right-1 w-5 h-5
                      rounded-full text-xs font-medium
                      flex items-center justify-center
                      ${isSelected(date) ? 'bg-white text-blue-500' : 'bg-blue-500 text-white'}
                    `}
                    >
                      {dayPosts.length}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {selectedDate && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">
            {selectedDate.toLocaleDateString('ja-JP', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
            の投稿
          </h3>
          {selectedPosts.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {selectedPosts.map((post) => (
                <PostCard key={post.id} post={post} onClick={() => onPostClick(post)} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">この日の投稿はありません</p>
          )}
        </div>
      )}
    </div>
  );
}
