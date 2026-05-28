// components/post/FeedHeader.jsx
import { MoreHorizontal } from "lucide-react"; // <->

import timeAgo from "@/lib/timeAgo";

function FeedHeader({ author, createdAt }) {
  //   const initials = author?.name
  //   ?.split(" ")
  //   .map((n) => n[0])
  //   .join("")
  //   .toUpperCase()
  //   .slice(0, 2);
  // console.log(author);

  return (
    <div className="feed-card-header">
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        {
          <img
            src={author?.profilePic}
            alt="author Profile"
            className="avatar"
          />
        }
        <div>
          <p
            style={{
              fontSize: 13,
              fontWeight: 500,
              color: "var(--text-primary)",
              lineHeight: 1.3,
            }}
          >
            {author?.name}
          </p>
          <p
            style={{
              fontSize: 11,
              color: "var(--text-muted)",
              lineHeight: 1.3,
            }}
          >
            @{author?.username} · {timeAgo(createdAt)}
          </p>
        </div>
      </div>
      <button className="nav-btn" title="More options">
        <MoreHorizontal size={16} />
      </button>
    </div>
  );
}

export default FeedHeader;
