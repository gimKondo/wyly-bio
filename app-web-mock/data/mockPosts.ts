import { Post } from "../types/post";

export const mockPosts: Post[] = [
  {
    id: "1",
    author: {
      name: "田中 太郎",
      username: "naturelover",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face"
    },
    content: "今朝、森で美しいキタキツネに出会いました！毛色がとても美しく、野生の生命力を感じることができました。自然の中で生きる動物たちの姿は本当に感動的です。",
    image: "https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=600&h=400&fit=crop",
    location: "北海道 知床国立公園",
    coordinates: {
      lat: 44.0755,
      lng: 145.0094
    },
    tags: ["キタキツネ", "野生動物", "北海道", "森林"],
    likes: 42,
    comments: 8,
    timestamp: "2時間前",
    createdAt: new Date("2025-08-11T08:00:00Z"),
    isLiked: false
  },
  {
    id: "2",
    author: {
      name: "佐藤 花子",
      username: "wildlifephoto",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face"
    },
    content: "エゾシカの親子に遭遇。子鹿の愛らしい姿に心が癒されました。母鹿が子鹿を見守る姿がとても印象的でした。",
    image: "https://images.unsplash.com/photo-1551975072-5c5ea93cf9e8?w=600&h=400&fit=crop",
    location: "奈良公園",
    coordinates: {
      lat: 34.6851,
      lng: 135.8431
    },
    tags: ["エゾシカ", "親子", "癒し"],
    likes: 28,
    comments: 5,
    timestamp: "4時間前",
    createdAt: new Date("2025-08-11T06:00:00Z"),
    isLiked: true
  },
  {
    id: "3",
    author: {
      name: "山田 次郎",
      username: "birdwatcher",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
    },
    content: "珍しいヤマセミを撮影できました！川辺で魚を狙う姿は本当に美しく、野生の鳥の生活を垣間見ることができました。",
    image: "https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=600&h=400&fit=crop",
    location: "長野県 上高地",
    coordinates: {
      lat: 36.1569,
      lng: 137.6503
    },
    tags: ["ヤマセミ", "野鳥", "渓流", "撮影"],
    likes: 65,
    comments: 12,
    timestamp: "6時間前",
    createdAt: new Date("2025-08-11T04:00:00Z"),
    isLiked: false
  },
  {
    id: "4",
    author: {
      name: "鈴木 美咲",
      username: "animalworld",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face"
    },
    content: "今日は野生のタヌキファミリーに遭遇しました。夜行性の動物なので、夕暮れ時に見ることができてラッキーでした。子ダヌキたちがとても可愛かったです！",
    image: "https://images.unsplash.com/photo-1603375739806-40dc65c75e95?w=600&h=400&fit=crop",
    location: "東京都 井の頭公園",
    coordinates: {
      lat: 35.7008,
      lng: 139.5803
    },
    tags: ["タヌキ", "夕暮れ", "ファミリー", "夜行性"],
    likes: 35,
    comments: 7,
    timestamp: "1日前",
    createdAt: new Date("2025-08-10T18:00:00Z"),
    isLiked: true
  },
  {
    id: "5",
    author: {
      name: "高橋 健太",
      username: "forestguide",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face"
    },
    content: "屋久島でヤクザルの群れを観察。子ザルが母親の背中にしがみつく姿が愛らしく、自然の営みの美しさを感じました。",
    image: "https://images.unsplash.com/photo-1605844815592-68c0a4a070b8?w=600&h=400&fit=crop",
    location: "鹿児島県 屋久島",
    coordinates: {
      lat: 30.3347,
      lng: 130.5203
    },
    tags: ["ヤクザル", "屋久島", "観察", "母子"],
    likes: 58,
    comments: 15,
    timestamp: "2日前",
    createdAt: new Date("2025-08-09T15:30:00Z"),
    isLiked: false
  },
  {
    id: "6",
    author: {
      name: "渡辺 あゆみ",
      username: "oceanlover",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop&crop=face"
    },
    content: "伊豆大島でイルカの群れに遭遇！海から飛び跳ねる姿は圧巻でした。野生のイルカたちの自由さに感動しました。",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&h=400&fit=crop",
    location: "東京都 伊豆大島",
    coordinates: {
      lat: 34.7206,
      lng: 139.3897
    },
    tags: ["イルカ", "海洋動物", "伊豆大島", "群れ"],
    likes: 73,
    comments: 18,
    timestamp: "3日前",
    createdAt: new Date("2025-08-08T11:15:00Z"),
    isLiked: true
  }
];