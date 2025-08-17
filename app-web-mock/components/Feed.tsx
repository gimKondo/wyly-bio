import { PostCard } from "./PostCard";
import { mockPosts } from "../data/mockPosts";

export function Feed() {
  return (
    <div className="space-y-6">
      {mockPosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}