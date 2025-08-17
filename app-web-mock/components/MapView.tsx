import { useState } from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { PostCard } from "./PostCard";
import { Post } from "../types/post";

interface MapViewProps {
  posts: Post[];
}

export function MapView({ posts }: MapViewProps) {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  // 座標を地図上の位置にマッピングする簡単な関数
  const getMapPosition = (lat: number, lng: number) => {
    // 日本の地図領域に対する簡単なマッピング
    const mapBounds = {
      north: 46, // 最北端
      south: 24, // 最南端  
      east: 146, // 最東端
      west: 123  // 最西端
    };
    
    const x = ((lng - mapBounds.west) / (mapBounds.east - mapBounds.west)) * 100;
    const y = ((mapBounds.north - lat) / (mapBounds.north - mapBounds.south)) * 100;
    
    return { x: Math.min(Math.max(x, 5), 95), y: Math.min(Math.max(y, 5), 95) };
  };

  const postsWithCoordinates = posts.filter(post => post.coordinates);

  return (
    <div className="space-y-6">
      <Card className="w-full">
        <CardHeader>
          <h2>投稿マップ</h2>
          <p className="text-muted-foreground">地図上のピンをクリックして投稿を表示</p>
        </CardHeader>
        <CardContent>
          <div className="relative w-full h-96 bg-muted rounded-lg overflow-hidden">
            {/* 簡単な地図背景 */}
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full"
              style={{ background: 'linear-gradient(to bottom, #e3f2fd 0%, #81c784 40%, #4caf50 100%)' }}
            >
              {/* 日本列島の簡単な形 */}
              <path
                d="M20,30 Q25,25 30,30 L35,35 Q40,40 45,35 L50,40 Q55,45 60,40 L65,45 Q70,50 75,45 L80,50 Q75,55 70,60 L65,65 Q60,70 55,65 L50,70 Q45,75 40,70 L35,75 Q30,70 25,65 L20,60 Q15,55 20,50 Q15,45 20,40 Q15,35 20,30 Z"
                fill="rgba(76, 175, 80, 0.3)"
                stroke="rgba(76, 175, 80, 0.6)"
                strokeWidth="0.5"
              />
              
              {/* 投稿のピン */}
              {postsWithCoordinates.map((post) => {
                if (!post.coordinates) return null;
                const position = getMapPosition(post.coordinates.lat, post.coordinates.lng);
                return (
                  <g key={post.id}>
                    <circle
                      cx={position.x}
                      cy={position.y}
                      r="2"
                      fill="#6c5ce7"
                      stroke="#ffffff"
                      strokeWidth="0.5"
                      className="cursor-pointer hover:r-3 transition-all duration-200"
                      onClick={() => setSelectedPost(post)}
                    />
                    <text
                      x={position.x}
                      y={position.y - 3}
                      textAnchor="middle"
                      className="fill-primary text-xs pointer-events-none"
                    >
                      📍
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
          
          {/* 地図の凡例 */}
          <div className="mt-4 flex flex-wrap gap-2">
            {postsWithCoordinates.map((post) => (
              <Badge
                key={post.id}
                variant={selectedPost?.id === post.id ? "default" : "secondary"}
                className="cursor-pointer"
                onClick={() => setSelectedPost(post)}
              >
                📍 {post.location}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 選択された投稿の表示 */}
      {selectedPost && (
        <div className="space-y-4">
          <h3>選択された投稿</h3>
          <PostCard post={selectedPost} />
        </div>
      )}

      {/* すべての位置情報付き投稿 */}
      {!selectedPost && (
        <div className="space-y-4">
          <h3>位置情報付きの投稿</h3>
          <div className="space-y-6">
            {postsWithCoordinates.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}