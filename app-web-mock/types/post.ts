export interface Post {
  id: string;
  author: {
    name: string;
    username: string;
    avatar: string;
  };
  content: string;
  image?: string;
  location?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  tags: string[];
  likes: number;
  comments: number;
  timestamp: string;
  createdAt: Date;
  isLiked: boolean;
}