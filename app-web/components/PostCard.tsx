'use client';

import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, MessageCircle, Share2, MapPin, MoreHorizontal } from 'lucide-react';
import { ImageWithFallback } from '@/components/ImageWithFallback';
import { Post } from '@/types/post';

interface PostCardProps {
  post: Post;
  onClick?: (post: Post) => void;
}

export function PostCard({ post, onClick }: PostCardProps) {
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [likesCount, setLikesCount] = useState(post.likes);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
  };

  return (
    <Card className="w-full cursor-pointer" onClick={() => onClick?.(post)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={post.author.avatar} alt={post.author.name} />
              <AvatarFallback>{post.author.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{post.author.name}</p>
              <div className="flex items-center text-xs text-muted-foreground space-x-2">
                <span>@{post.author.username}</span>
                <span>•</span>
                <span>{post.timestamp}</span>
                {post.locationName && (
                  <>
                    <span>•</span>
                    <div className="flex items-center">
                      <MapPin className="h-3 w-3 mr-1" />
                      <span>{post.locationName}</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">その他のオプション</span>
          </Button>
        </div>
      </CardHeader>

      <CardContent className="pb-3">
        {post.content && <p className="mb-3">{post.content}</p>}

        {post.imageUrl && (
          <div className="rounded-lg overflow-hidden mb-3">
            <ImageWithFallback
              src={post.imageUrl}
              alt="投稿画像"
              className="w-full h-auto object-cover"
            />
          </div>
        )}

        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                #{tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>

      <CardFooter className="pt-0">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              className={`text-muted-foreground hover:text-red-500 ${
                isLiked ? 'text-red-500' : ''
              }`}
            >
              <Heart className={`h-4 w-4 mr-1 ${isLiked ? 'fill-current' : ''}`} />
              <span className="sr-only">いいね</span>
              {likesCount}
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-blue-500">
              <MessageCircle className="h-4 w-4 mr-1" />
              <span className="sr-only">コメント</span>
              {post.comments}
            </Button>
          </div>
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-green-500">
            <Share2 className="h-4 w-4" />
            <span className="sr-only">シェア</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
