import { useState } from "react";
import { Calendar } from "./ui/calendar";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { PostCard } from "./PostCard";
import { Post } from "../types/post";

interface CalendarViewProps {
  posts: Post[];
}

export function CalendarView({ posts }: CalendarViewProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  // 投稿がある日付を取得
  const getPostsForDate = (date: Date) => {
    const targetDate = new Date(date);
    targetDate.setHours(0, 0, 0, 0);
    
    return posts.filter(post => {
      const postDate = new Date(post.createdAt);
      postDate.setHours(0, 0, 0, 0);
      return postDate.getTime() === targetDate.getTime();
    });
  };

  const selectedPosts = selectedDate ? getPostsForDate(selectedDate) : [];

  // 投稿がある日付のマッピングを作成
  const postsByDate = posts.reduce((acc, post) => {
    const date = new Date(post.createdAt);
    date.setHours(0, 0, 0, 0);
    const dateKey = date.getTime();
    
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(post);
    return acc;
  }, {} as Record<number, Post[]>);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* カレンダー */}
        <Card>
          <CardHeader>
            <h2>野生動物観察カレンダー</h2>
            <p className="text-muted-foreground">日付をクリックしてその日の投稿を表示</p>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
              modifiers={{
                hasPost: (date) => {
                  const targetDate = new Date(date);
                  targetDate.setHours(0, 0, 0, 0);
                  return targetDate.getTime() in postsByDate;
                }
              }}
              modifiersClassNames={{
                hasPost: "bg-primary/10 text-primary relative after:content-[''] after:absolute after:top-1 after:right-1 after:w-2 after:h-2 after:bg-primary after:rounded-full"
              }}
            />
            
            {/* 投稿数の詳細表示 */}
            <div className="mt-4 space-y-2">
              <h4 className="text-sm">投稿がある日</h4>
              <div className="flex flex-wrap gap-2">
                {Object.entries(postsByDate).map(([dateKey, postsForDate]) => {
                  const date = new Date(parseInt(dateKey));
                  return (
                    <button
                      key={dateKey}
                      onClick={() => setSelectedDate(date)}
                      className={`text-xs px-2 py-1 rounded-md border transition-colors ${
                        selectedDate && selectedDate.getTime() === date.getTime()
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted hover:bg-primary/10"
                      }`}
                    >
                      {date.getDate()}日 ({postsForDate.length}件)
                    </button>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 月間サマリー */}
        <Card>
          <CardHeader>
            <h3>今月の観察記録</h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl text-primary">{posts.length}</div>
                  <div className="text-sm text-muted-foreground">総投稿数</div>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl text-primary">{Object.keys(postsByDate).length}</div>
                  <div className="text-sm text-muted-foreground">観察日数</div>
                </div>
              </div>
              
              {/* 人気のタグ */}
              <div>
                <h4 className="mb-2">人気のタグ</h4>
                <div className="flex flex-wrap gap-2">
                  {Array.from(new Set(posts.flatMap(post => post.tags)))
                    .slice(0, 8)
                    .map(tag => (
                      <Badge key={tag} variant="outline">
                        #{tag}
                      </Badge>
                    ))}
                </div>
              </div>
              
              {/* 最近の観察場所 */}
              <div>
                <h4 className="mb-2">最近の観察場所</h4>
                <div className="space-y-2">
                  {Array.from(new Set(posts.filter(p => p.location).map(p => p.location)))
                    .slice(0, 3)
                    .map(location => (
                      <div key={location} className="text-sm text-muted-foreground">
                        📍 {location}
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 選択された日付の投稿 */}
      {selectedDate && (
        <div>
          <h3 className="mb-4">
            {selectedDate.toLocaleDateString('ja-JP', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })} の投稿
            {selectedPosts.length > 0 && (
              <Badge className="ml-2">
                {selectedPosts.length}件
              </Badge>
            )}
          </h3>
          
          {selectedPosts.length > 0 ? (
            <div className="space-y-6">
              {selectedPosts.map(post => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">
                  この日の投稿はありません。野生動物観察に出かけてみませんか？
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}