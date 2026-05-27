"use client";
import FeedHeader from "./FeedHeader";
import FeedImage from "./FeedImage";
import FeedContent from "./FeedContent";
import FeedActions from "./FeedActions";

function FeedCard({ post, onClick }) {
  return (
    <div className="feed-card" onClick={() => onClick(post)}>
      <FeedHeader author={post.author} createdAt={post.createdAt} />
      <FeedImage src={post.photo} alt={post.title} />
      <FeedContent caption={post.title} />
      <FeedActions
        postId={post._id}
        likes={post.likes}
        onClick={(e) => e.stopPropagation()} // ← stop card click when clicking actions
      />
    </div>
  );
}

export default FeedCard;
