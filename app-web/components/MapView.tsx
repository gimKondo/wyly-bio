'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { PostCard } from './PostCard';
import type { Post } from '@/lib/data';

// MapViewClient全体を動的インポート（SSR対策）
const MapViewClient = dynamic(() => import('./MapViewClient').then((mod) => mod.MapViewClient), {
  ssr: false,
  loading: () => (
    <div className="h-96 bg-gray-100 animate-pulse rounded-lg flex items-center justify-center">
      <p className="text-gray-500">地図を読み込み中...</p>
    </div>
  ),
});

interface MapViewProps {
  posts: Post[];
  onPostClick: (post: Post) => void;
}

export function MapView({ posts, onPostClick }: MapViewProps) {
  // 位置情報のない投稿を分離してSSR環境でも表示
  const nonGeotaggedPosts = posts.filter(
    (post) => !post.location?.latitude || !post.location?.longitude
  );

  return (
    <div className="space-y-6">
      {/* 地図部分（クライアントサイドのみ） */}
      <MapViewClient posts={posts} onPostClick={onPostClick} />

      {/* 位置情報のない投稿（SSR対応） */}
      {nonGeotaggedPosts.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">
            位置情報のない投稿 ({nonGeotaggedPosts.length}件)
          </h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {nonGeotaggedPosts.map((post) => (
              <PostCard key={post.id} post={post} onClick={() => onPostClick(post)} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
