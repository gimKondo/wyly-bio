'use client';

import { PostCard } from '@/components/PostCard';
import { Post } from '@/types/post';
import { useState, useEffect } from 'react';

interface FeedProps {
  initialPosts?: Post[];
}

export function Feed({ initialPosts = [] }: FeedProps) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [loading, setLoading] = useState(false);

  // TODO: 実際のAPIからデータを取得する処理を実装
  useEffect(() => {
    // 現時点ではinitialPostsをそのまま使用
    setPosts(initialPosts);
  }, [initialPosts]);

  const handleLoadMore = () => {
    setLoading(true);
    // TODO: 追加の投稿を読み込む処理
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-gray-500">
        <p className="text-lg">まだ投稿がありません</p>
        <p className="text-sm mt-2">最初の投稿をしてみましょう！</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}

      {/* Load More Button - 今後の拡張用 */}
      {posts.length >= 10 && (
        <div className="flex justify-center py-4">
          <button
            onClick={handleLoadMore}
            disabled={loading}
            className="px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? '読み込み中...' : 'さらに読み込む'}
          </button>
        </div>
      )}
    </div>
  );
}
