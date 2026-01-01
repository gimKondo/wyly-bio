import { Post } from '@/types/post';

export const mockPosts: Post[] = [
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
  {
    id: '4',
    author: {
      name: '鈴木 美咲',
      username: 'suzuki_misaki',
      avatar:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop&crop=face',
    },
    content: '海岸でアザラシの子供を発見！人懐っこくて近づいてきました。',
    imageUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=500&h=300&fit=crop',
    locationName: '稚内・宗谷岬',
    location: {
      latitude: 45.5231,
      longitude: 141.9374,
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
    locationName: '長野・上高地',
    location: {
      latitude: 36.2389,
      longitude: 137.6489,
    },
    tags: ['フクロウ', '夕暮れ', '野鳥'],
    likes: 28,
    comments: 7,
    timestamp: '10時間前',
    createdAt: new Date('2024-01-15T02:00:00Z'),
    isLiked: true,
  },
  {
    id: '6',
    author: {
      name: '伊藤 真由美',
      username: 'ito_mayumi',
      avatar:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=40&h=40&fit=crop&crop=face',
    },
    content: '今朝、庭にメジロが来ました！梅の花と一緒に撮影できて嬉しい。',
    imageUrl: 'https://images.unsplash.com/photo-1615730539031-31dd60888e8f?w=500&h=300&fit=crop',
    locationName: '神奈川・鎌倉市',
    location: {
      latitude: 35.3194,
      longitude: 139.5461,
    },
    tags: ['メジロ', '梅', '野鳥', '春'],
    likes: 35,
    comments: 9,
    timestamp: '12時間前',
    createdAt: new Date('2024-01-15T00:00:00Z'),
    isLiked: false,
  },
  {
    id: '7',
    author: {
      name: '中村 健二',
      username: 'nakamura_kenji',
      avatar:
        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=40&h=40&fit=crop&crop=face',
    },
    content: '山道でニホンカモシカと遭遇。じっとこちらを見つめていました。',
    locationName: '長野・白馬村',
    location: {
      latitude: 36.6985,
      longitude: 137.8327,
    },
    tags: ['カモシカ', '山', '野生動物'],
    likes: 22,
    comments: 4,
    timestamp: '14時間前',
    createdAt: new Date('2024-01-14T22:00:00Z'),
    isLiked: true,
  },
  {
    id: '8',
    author: {
      name: '木村 さくら',
      username: 'kimura_sakura',
      avatar:
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop&crop=face',
    },
    content: '河川敷でカワセミを発見！青い宝石のような美しさに感動しました。',
    imageUrl: 'https://images.unsplash.com/photo-1591608971362-f08b2a75731a?w=500&h=300&fit=crop',
    locationName: '多摩川',
    location: {
      latitude: 35.6329,
      longitude: 139.6559,
    },
    tags: ['カワセミ', '野鳥', '河川'],
    likes: 48,
    comments: 11,
    timestamp: '16時間前',
    createdAt: new Date('2024-01-14T20:00:00Z'),
    isLiked: false,
  },
  {
    id: '9',
    author: {
      name: '渡辺 大輔',
      username: 'watanabe_daisuke',
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
    },
    content: '雪山でエゾユキウサギを撮影！真っ白な毛並みが雪に溶け込んでいました。',
    locationName: '北海道・大雪山',
    location: {
      latitude: 43.6638,
      longitude: 142.8548,
    },
    tags: ['ユキウサギ', '雪山', '冬', '北海道'],
    likes: 37,
    comments: 8,
    timestamp: '18時間前',
    createdAt: new Date('2024-01-14T18:00:00Z'),
    isLiked: true,
  },
  {
    id: '10',
    author: {
      name: '小林 愛',
      username: 'kobayashi_ai',
      avatar:
        'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=40&h=40&fit=crop&crop=face',
    },
    content: '夜の森でフクロウの鳴き声を頼りに撮影成功！神秘的な瞬間でした。',
    imageUrl: 'https://images.unsplash.com/photo-1517423568366-8b83523034fd?w=500&h=300&fit=crop',
    locationName: '静岡・富士山麓',
    location: {
      latitude: 35.3606,
      longitude: 138.7274,
    },
    tags: ['フクロウ', '夜', '森', '野鳥'],
    likes: 29,
    comments: 6,
    timestamp: '20時間前',
    createdAt: new Date('2024-01-14T16:00:00Z'),
    isLiked: false,
  },
  // 位置情報なしの投稿も追加
  {
    id: '11',
    author: {
      name: '松本 健一',
      username: 'matsumoto_kenichi',
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
    },
    content: '庭先にやってきたスズメの群れ。賑やかで可愛かったです！',
    imageUrl: 'https://images.unsplash.com/photo-1549289524-06cf8837ace5?w=500&h=300&fit=crop',
    tags: ['スズメ', '庭', '野鳥'],
    likes: 15,
    comments: 2,
    timestamp: '1日前',
    createdAt: new Date('2024-01-14T12:00:00Z'),
    isLiked: false,
  },
  {
    id: '12',
    author: {
      name: '田村 美咲',
      username: 'tamura_misaki',
      avatar:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop&crop=face',
    },
    content: '散歩中にハクセキレイを発見。尻尾をフリフリしながら歩く姿が愛らしかったです。',
    tags: ['ハクセキレイ', '散歩', '野鳥'],
    likes: 12,
    comments: 1,
    timestamp: '1日前',
    createdAt: new Date('2024-01-14T10:00:00Z'),
    isLiked: true,
  },
];

export function getMockPosts(limit?: number): Post[] {
  if (limit) {
    return mockPosts.slice(0, limit);
  }
  return mockPosts;
}

export function getMockPostsByTag(tag: string): Post[] {
  return mockPosts.filter((post) => post.tags.includes(tag));
}

export function getMockPostsByLocation(location: string): Post[] {
  return mockPosts.filter((post) => post.locationName?.includes(location));
}
