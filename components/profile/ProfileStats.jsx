export default function ProfileStats({
  user,
  postsCount = 0,
  onFollowersClick,
  onFollowingClick,
}) {
  if (!user) return null;

  return (
    <div className="profile-card" style={{ marginBottom: 16 }}>
      <div className="profile-stats">
        <div className="profile-stat">
          <span className="profile-stat-num">{postsCount}</span>
          <span className="profile-stat-label">Posts</span>
        </div>
        <div
          className="profile-stat"
          onClick={onFollowersClick}
          style={{ cursor: "pointer" }}
        >
          <span className="profile-stat-num">
            {user.followers?.length || 0}
          </span>
          <span className="profile-stat-label">Followers</span>
        </div>
        <div
          className="profile-stat"
          onClick={onFollowingClick}
          style={{ cursor: "pointer" }}
        >
          <span className="profile-stat-num">
            {user.followings?.length || 0}
          </span>
          <span className="profile-stat-label">Following</span>
        </div>
      </div>
    </div>
  );
}
