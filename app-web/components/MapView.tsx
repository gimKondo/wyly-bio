'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { PostCard } from './PostCard';
import type { Post } from '@/lib/data';
import { setupLeafletIcons } from '@/lib/leaflet';

// Leafletを動的インポート（SSR対策）
const MapContainer = dynamic(() => import('react-leaflet').then((mod) => mod.MapContainer), {
  ssr: false,
  loading: () => <div className="h-96 bg-gray-100 animate-pulse rounded-lg" />,
});

const TileLayer = dynamic(() => import('react-leaflet').then((mod) => mod.TileLayer), {
  ssr: false,
});

const Marker = dynamic(() => import('react-leaflet').then((mod) => mod.Marker), { ssr: false });

const Popup = dynamic(() => import('react-leaflet').then((mod) => mod.Popup), { ssr: false });

interface MapViewProps {
  posts: Post[];
  onPostClick: (post: Post) => void;
}

export function MapView({ posts, onPostClick }: MapViewProps) {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (typeof window !== 'undefined') {
      setupLeafletIcons();
    }
  }, []);

  // 位置情報を持つ投稿のみフィルタリング
  const geotaggedPosts = posts.filter(
    (post) => post.location?.latitude && post.location?.longitude
  );

  // 位置情報のない投稿
  const nonGeotaggedPosts = posts.filter(
    (post) => !post.location?.latitude || !post.location?.longitude
  );

  // 地図の中心点を計算（投稿の平均位置、または東京をデフォルトに）
  const calculateCenter = (): [number, number] => {
    if (geotaggedPosts.length === 0) {
      return [35.6762, 139.6503]; // 東京
    }

    const sumLat = geotaggedPosts.reduce((sum, post) => sum + (post.location?.latitude || 0), 0);
    const sumLng = geotaggedPosts.reduce((sum, post) => sum + (post.location?.longitude || 0), 0);

    return [sumLat / geotaggedPosts.length, sumLng / geotaggedPosts.length];
  };

  const center = calculateCenter();

  if (!isClient) {
    return <div className="h-96 bg-gray-100 animate-pulse rounded-lg" />;
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <h2 className="text-lg font-semibold mb-4">投稿マップ</h2>

        <div className="h-[500px] rounded-lg overflow-hidden">
          <MapContainer center={center} zoom={10} className="h-full w-full">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {geotaggedPosts.map((post) => {
              if (!post.location?.latitude || !post.location?.longitude) return null;

              return (
                <Marker
                  key={post.id}
                  position={[post.location.latitude, post.location.longitude]}
                  eventHandlers={{
                    click: () => {
                      setSelectedPost(post);
                    },
                  }}
                >
                  <Popup>
                    <div className="w-64">
                      <h3 className="font-semibold mb-2">{post.author.name}</h3>
                      {post.imageUrl && (
                        <img
                          src={post.imageUrl}
                          alt="投稿画像"
                          className="w-full h-32 object-cover rounded mb-2"
                        />
                      )}
                      <p className="text-sm text-gray-600 mb-2">
                        {post.content.length > 100
                          ? post.content.substring(0, 100) + '...'
                          : post.content}
                      </p>
                      <button
                        onClick={() => onPostClick(post)}
                        className="text-blue-500 hover:text-blue-600 text-sm font-medium"
                      >
                        詳細を見る
                      </button>
                    </div>
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm text-gray-600">位置情報付き: {geotaggedPosts.length}件</p>
          <p className="text-sm text-gray-600">位置情報なし: {nonGeotaggedPosts.length}件</p>
        </div>
      </div>

      {selectedPost && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">選択中の投稿</h3>
          <div className="max-w-md">
            <PostCard post={selectedPost} onClick={() => onPostClick(selectedPost)} />
          </div>
        </div>
      )}

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
