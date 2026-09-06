// components/post/FeedGrid.jsx
import FeedCard from "./FeedCard";

function FeedGrid({ posts = [], onPostClick, isOwnProfile = false,  handleDelete }) {


  if (!posts.length) {
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
      {posts.map((post) => (
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
