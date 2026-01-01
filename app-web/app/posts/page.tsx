import { PostCard } from '@/components/PostCard';
import { PostForm } from '@/components/PostForm';
import { Post } from '@/types/post';

// サンプルデータ
const samplePosts: Post[] = [
  {
    id: '1',
    author: {
      name: '田中 太郎',
      username: 'tanaka_taro',
      avatar:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
    },
    content: '今日は森でキツネに出会いました！とても美しい毛色で、しばらく見つめ合っていました。',
    imageUrl: 'https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=500&h=300&fit=crop',
    locationName: '北海道・知床国立公園',
    location: {
      latitude: 44.0877,
      longitude: 145.1278,
    },
    tags: ['キツネ', '野生動物', '知床', '自然観察'],
    likes: 24,
    comments: 5,
    timestamp: '2時間前',
    createdAt: new Date('2024-01-15T10:00:00Z'),
    isLiked: false,
  },
  {
    id: '2',
    author: {
      name: '山田 花子',
      username: 'yamada_hanako',
      avatar:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
    },
    content: '早朝の散歩でシカの親子に遭遇！子鹿がとても可愛かったです 🦌',
    locationName: '奈良公園',
    location: {
      latitude: 34.6851,
      longitude: 135.8432,
    },
    tags: ['シカ', '奈良', '親子'],
    likes: 18,
    comments: 3,
    timestamp: '4時間前',
    createdAt: new Date('2024-01-15T08:00:00Z'),
    isLiked: true,
  },
  {
    id: '3',
    author: {
      name: '佐藤 一郎',
      username: 'sato_ichiro',
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
    },
    content:
      'リスがどんぐりを頬張る姿を激写！野生動物の自然な行動を観察できるのは本当に楽しいですね。',
    imageUrl: 'https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=500&h=300&fit=crop',
    locationName: '井の頭公園',
    location: {
      latitude: 35.7009,
      longitude: 139.5706,
    },
    tags: ['リス', 'どんぐり', '東京', '公園'],
    likes: 31,
    comments: 8,
    timestamp: '6時間前',
    createdAt: new Date('2024-01-15T06:00:00Z'),
    isLiked: false,
  },
];

export default function PostsPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-8">投稿機能テスト</h1>

      {/* 投稿フォーム */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">投稿フォーム</h2>
        <PostForm />
      </div>

      {/* 投稿一覧 */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">投稿カード</h2>
        {samplePosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
