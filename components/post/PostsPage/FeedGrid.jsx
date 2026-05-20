// components/post/FeedGrid.jsx
import FeedCard from "./FeedCard";

function FeedGrid({ posts = [], onPostClick }) {
  if (!posts.length) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "60px 20px",
          color: "var(--text-muted)",
        }}
      >
        <p> No posts yet.people must post there ... which is a bug </p>
      </div>
    );
  }

  return (
    <div className="feed-grid">
      {posts.map((post) => (
        <FeedCard key={post._id} post={post} onClick={onPostClick} />
      ))}
    </div>
  );
}

export default FeedGrid;
