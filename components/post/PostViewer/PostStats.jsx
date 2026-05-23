// components/post/PostStats.jsx
import { Heart, MessageCircle } from "lucide-react";

function PostStats({ likes = 0, comments = 0 }) {
  return (
    <div className="post-stats">
      <div className="post-stat">
        <Heart size={14} />
        <span>{likes} likes</span>
      </div>
      <div className="post-stat">
        <MessageCircle size={14} />
        <span>{comments} comments</span>
      </div>
    </div>
  );
}

export default PostStats;
