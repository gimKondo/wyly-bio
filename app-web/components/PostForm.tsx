'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ImagePlus, MapPin, Tag } from 'lucide-react';
import { ImageWithFallback } from '@/components/ImageWithFallback';

export function PostForm() {
  const [content, setContent] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageSelect = () => {
    // 実際の実装では、ファイル選択ダイアログを開く
    // 今は仮の画像URLを設定
    const imageUrl =
      'https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=500&h=300&fit=crop';
    setSelectedImage(imageUrl);
  };

  const handlePost = () => {
    if (content.trim() || selectedImage) {
      // TODO: 実際の実装では、投稿をサーバーに送信
      setContent('');
      setSelectedImage(null);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex items-center space-x-3">
          <Avatar className="h-10 w-10">
            <AvatarImage
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
              alt="あなた"
            />
            <AvatarFallback>あ</AvatarFallback>
          </Avatar>
          <Textarea
            placeholder="今日はどんな野生動物に出会いましたか？"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="flex-1 min-h-[80px] resize-none border-0 p-0 focus-visible:ring-0 bg-transparent"
          />
        </div>
      </CardHeader>

      {selectedImage && (
        <CardContent className="pt-0">
          <div className="relative rounded-lg overflow-hidden">
            <ImageWithFallback
              src={selectedImage}
              alt="選択された画像"
              className="w-full h-64 object-cover"
            />
            <Button
              variant="secondary"
              size="sm"
              className="absolute top-2 right-2"
              onClick={() => setSelectedImage(null)}
            >
              削除
            </Button>
          </div>
        </CardContent>
      )}

      <CardContent className="pt-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleImageSelect}
              className="text-muted-foreground hover:text-primary"
            >
              <ImagePlus className="h-4 w-4 mr-1" />
              <span className="sr-only">写真を追加</span>
              写真
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
              <MapPin className="h-4 w-4 mr-1" />
              <span className="sr-only">場所を追加</span>
              場所
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
              <Tag className="h-4 w-4 mr-1" />
              <span className="sr-only">タグを追加</span>
              タグ
            </Button>
          </div>

          <Button
            onClick={handlePost}
            disabled={!content.trim() && !selectedImage}
            className="bg-primary hover:bg-primary/90"
          >
            投稿
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
