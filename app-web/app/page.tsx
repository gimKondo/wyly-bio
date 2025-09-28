import { Feed } from '@/components/Feed';
import { PostForm } from '@/components/PostForm';
import { Post } from '@/types/post';

// サンプルデータ（将来的にAPIから取得）
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
    image: 'https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=500&h=300&fit=crop',
    location: '北海道・知床国立公園',
    coordinates: {
      lat: 44.0877,
      lng: 145.1278,
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
    location: '奈良公園',
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
    image: 'https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=500&h=300&fit=crop',
    location: '井の頭公園',
    tags: ['リス', 'どんぐり', '東京', '公園'],
    likes: 31,
    comments: 8,
    timestamp: '6時間前',
    createdAt: new Date('2024-01-15T06:00:00Z'),
    isLiked: false,
  },
  {
    id: '4',
    author: {
      name: '鈴木 美咲',
      username: 'suzuki_misaki',
      avatar:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop&crop=face',
    },
    content: '海岸でアザラシの子供を発見！人懐っこくて近づいてきました。',
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=500&h=300&fit=crop',
    location: '稚内・宗谷岬',
    coordinates: {
      lat: 45.5231,
      lng: 141.9374,
    },
    tags: ['アザラシ', '海洋生物', '北海道'],
    likes: 42,
    comments: 12,
    timestamp: '8時間前',
    createdAt: new Date('2024-01-15T04:00:00Z'),
    isLiked: false,
  },
  {
    id: '5',
    author: {
      name: '高橋 健太',
      username: 'takahashi_kenta',
      avatar:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face',
    },
    content: '夕暮れ時にフクロウのシルエットをパチリ。幻想的な一枚が撮れました！',
    location: '長野・上高地',
    tags: ['フクロウ', '夕暮れ', '野鳥'],
    likes: 28,
    comments: 7,
    timestamp: '10時間前',
    createdAt: new Date('2024-01-15T02:00:00Z'),
    isLiked: true,
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-2xl font-bold text-gray-900">Wyly</h1>
            <nav className="flex gap-4">
              <button className="text-gray-600 hover:text-gray-900">ホーム</button>
              <button className="text-gray-600 hover:text-gray-900">探索</button>
              <button className="text-gray-600 hover:text-gray-900">通知</button>
              <button className="text-gray-600 hover:text-gray-900">プロフィール</button>
            </nav>
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* 投稿フォーム */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4">新しい投稿</h2>
            <PostForm />
          </div>

          {/* フィード */}
          <div className="space-y-6">
            <Feed initialPosts={samplePosts} />
          </div>
        </div>
      </main>
    </div>
  );
}
