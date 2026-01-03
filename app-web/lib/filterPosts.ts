import { Post } from '@/types/post';
import { FilterOptions } from '@/components/FeedFilter';

export function filterPosts(posts: Post[], filters: FilterOptions): Post[] {
  return posts.filter((post) => {
    // タグフィルター
    if (filters.tags.length > 0) {
      const hasMatchingTag = filters.tags.some((filterTag) =>
        post.tags.some((postTag) => postTag.toLowerCase().includes(filterTag.toLowerCase()))
      );
      if (!hasMatchingTag) return false;
    }

    // 場所フィルター
    if (filters.location) {
      if (!post.locationName?.toLowerCase().includes(filters.location.toLowerCase())) {
        return false;
      }
    }

    // 時期フィルター
    if (filters.timeRange !== 'all') {
      const now = new Date();
      const postDate = new Date(post.createdAt);

      switch (filters.timeRange) {
        case 'today':
          const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
          if (postDate < today) return false;
          break;
        case 'week':
          const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          if (postDate < weekAgo) return false;
          break;
        case 'month':
          const monthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
          if (postDate < monthAgo) return false;
          break;
      }
    }

    return true;
  });
}

export function getUniqueTagsFromPosts(posts: Post[]): string[] {
  const tagSet = new Set<string>();
  posts.forEach((post) => {
    post.tags.forEach((tag) => tagSet.add(tag));
  });
  return Array.from(tagSet).sort();
}
