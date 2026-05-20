// components/post/FeedActions.jsx
import { Heart, MessageCircle, Share2, Bookmark } from "lucide-react";

function FeedActions({ likes = [], postId }) {
  return (
    <div className="feed-card-actions">
      <button className="feed-action-btn" title="Like">
        <Heart size={15} />
        <span>{likes.length}</span>
      </button>
      <button className="feed-action-btn" title="Comment">
        <MessageCircle size={15} />
        <span>Comment</span>
      </button>
      <button className="feed-action-btn" title="Share">
        <Share2 size={15} />
        <span>Share</span>
      </button>
      <button className="feed-action-btn" title="Save">
        <Bookmark size={15} />
        <span>Save</span>
      </button>
    </div>
  );
}

export default FeedActions;
