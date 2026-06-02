const TABS = ["posts", "Contributions", "Pulse"];
import FeedGrid from "../post/PostsPage/FeedGrid";

function ProfileTabs({ activeTab, onTabChange }) {
  return (
    <div className="profile-card">
      <div className="profile-tabs">
        {TABS.map((tab) => (
          <button
            key={tab}
            className={`profile-tab ${activeTab === tab ? "active" : ""}`}
            onClick={() => onTabChange(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ProfileTabs;
