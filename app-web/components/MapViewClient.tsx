'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { PostCard } from './PostCard';
import type { Post } from '@/types/post';
import 'leaflet/dist/leaflet.css';

interface MapViewClientProps {
  posts: Post[];
  onPostClick: (post: Post) => void;
}

export function MapViewClient({ posts, onPostClick }: MapViewClientProps) {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [LeafletIcon, setLeafletIcon] = useState<any>(null);

  // Leafletアイコンの初期化
  useEffect(() => {
    (async () => {
      const L = (await import('leaflet')).default;

      const DefaultIcon = L.icon({
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      });

      L.Marker.prototype.options.icon = DefaultIcon;
      setLeafletIcon(DefaultIcon);
    })();
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

  // アイコンがロードされるまで待つ
  if (!LeafletIcon) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          <span className="ml-3 text-gray-600">地図を読み込み中...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <h2 className="text-lg font-semibold mb-4">投稿マップ</h2>

        <div className="h-[500px] rounded-lg overflow-hidden">
          <MapContainer center={center} zoom={6} className="h-full w-full">
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
                  icon={LeafletIcon}
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
                        // eslint-disable-next-line @next/next/no-img-element -- Leafletポップアップ内の外部画像
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
                      <p className="text-xs text-gray-500 mb-2">📍 {post.locationName}</p>
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
    </div>
  );
}
