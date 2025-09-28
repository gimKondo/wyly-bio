export interface Post {
  id: string;
  author: {
    name: string;
    username: string;
    avatar: string;
  };
  content: string;
  imageUrl?: string;
  locationName?: string;
  location?: {
    latitude: number;
    longitude: number;
  };
  tags: string[];
  likes: number;
  comments: number;
  timestamp: string;
  createdAt: Date;
  isLiked: boolean;
}
