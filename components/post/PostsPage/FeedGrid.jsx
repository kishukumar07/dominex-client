// components/post/FeedGrid.jsx
import FeedCard from "./FeedCard";
import { useState, useEffect } from "react";
function FeedGrid({ posts = [], onPostClick, isOwnProfile = false }) {
  const [localPosts, setLocalPosts] = useState([]);

  useEffect(() => {
    setLocalPosts(Array.isArray(posts) ? posts : []);
  }, [posts]);

  const handleDelete = (postId) => {
    setLocalPosts((prev) => prev.filter((p) => p._id !== postId));
  };

  if (!localPosts.length) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "60px 20px",
          color: "var(--text-muted)",
        }}
      >
        <p>No posts yet.</p>
      </div>
    );
  }

  return (
    <div className="feed-grid">
      {localPosts.map((post) => (
        <FeedCard
          key={post._id}
          post={post}
          onClick={onPostClick}
          isOwnProfile={isOwnProfile}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}
export default FeedGrid;
