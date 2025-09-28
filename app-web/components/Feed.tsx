'use client';

import { PostCard } from '@/components/PostCard';
import { Post } from '@/types/post';
import { useState, useEffect, useCallback, useRef } from 'react';

interface FeedProps {
  initialPosts?: Post[];
  onLoadMore?: () => Promise<Post[]>;
  onPostClick?: (post: Post) => void;
}

export function Feed({ initialPosts = [], onLoadMore, onPostClick }: FeedProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const observer = useRef<IntersectionObserver>();
  const lastPostElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          handleLoadMore();
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  useEffect(() => {
    // 初期データの設定
    const postsPerPage = 5;
    const initialDisplayPosts = initialPosts.slice(0, postsPerPage);
    setPosts(initialDisplayPosts);
    setHasMore(initialPosts.length > postsPerPage);
  }, [initialPosts]);

  const handleLoadMore = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      if (onLoadMore) {
        // カスタムのloadMore関数がある場合
        const newPosts = await onLoadMore();
        setPosts((prevPosts) => [...prevPosts, ...newPosts]);
        setHasMore(newPosts.length > 0);
      } else {
        // デフォルトの実装（initialPostsからページネーション）
        const postsPerPage = 5;
        const startIndex = page * postsPerPage;
        const endIndex = startIndex + postsPerPage;
        const newPosts = initialPosts.slice(startIndex, endIndex);

        if (newPosts.length > 0) {
          // 重複を避けるため、既存のIDと照合
          const existingIds = new Set(posts.map((post) => post.id));
          const uniqueNewPosts = newPosts.filter((post) => !existingIds.has(post.id));

          setPosts((prevPosts) => [...prevPosts, ...uniqueNewPosts]);
          setPage((prevPage) => prevPage + 1);
          setHasMore(endIndex < initialPosts.length);
        } else {
          setHasMore(false);
        }
      }
    } catch (error) {
      console.error('投稿の読み込みに失敗しました:', error);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, onLoadMore, page, initialPosts, posts]);

  if (posts.length === 0 && !loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-gray-500">
        <p className="text-lg">まだ投稿がありません</p>
        <p className="text-sm mt-2">最初の投稿をしてみましょう！</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {posts.map((post, index) => {
        // 最後の投稿にrefを付けて無限スクロールのトリガーに
        if (posts.length === index + 1) {
          return (
            <div ref={lastPostElementRef} key={post.id}>
              <PostCard post={post} onClick={onPostClick} />
            </div>
          );
        } else {
          return <PostCard key={post.id} post={post} onClick={onPostClick} />;
        }
      })}

      {/* ローディング表示 */}
      {loading && (
        <div className="flex justify-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      )}

      {/* これ以上読み込むものがない場合 */}
      {!hasMore && posts.length > 0 && (
        <div className="flex justify-center py-4 text-gray-500">
          <p className="text-sm">すべての投稿を表示しました</p>
        </div>
      )}
    </div>
  );
}
