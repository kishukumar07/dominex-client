import FeedGrid from "../post/PostsPage/FeedGrid";

function ProfileGrid({ userPosts = [], onPostClick }) {
  if (!userPosts.length) {
    return (
      <div className="profile-card">
        <p className="profile-empty">No posts yet.</p>
      </div>
    );
  }

  return <FeedGrid posts={userPosts} onPostClick={onPostClick} />;
}

export default ProfileGrid;
