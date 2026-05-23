"use client";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h`;
  return `${Math.floor(hrs / 24)}d`;
}

function Avatar({ name }) {
  const initials = name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
  return <div className="comment-avatar">{initials}</div>;
}

function CommentItem({ comment, isSubComment = false }) {
  const [showSubs, setShowSubs] = useState(false);

  const subs = comment.allSubComments || [];
  const hasSubs = subs.length > 0;

  return (
    <div style={{ paddingLeft: isSubComment ? 32 : 0 }}>
      <div className="comment-item">
        <Avatar name={comment.author?.name} />
        <div className="comment-body">
          <div className="comment-header">
            <span className="comment-name">{comment.author?.name}</span>
            <span style={{ fontSize: 10, color: "var(--text-muted)" }}>
              @{comment.author?.username}
            </span>
            <span className="comment-time">{timeAgo(comment.createdAt)}</span>
          </div>
          <p className="comment-text">{comment.content}</p>

          {hasSubs && (
            <button
              onClick={() => setShowSubs((prev) => !prev)}
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                color: "var(--accent)",
                fontSize: 11,
                display: "flex",
                alignItems: "center",
                gap: 4,
                padding: "4px 0",
                fontFamily: "var(--font-body)",
              }}
            >
              {showSubs ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
              {showSubs ? "Hide" : `View ${subs.length}`}{" "}
              {subs.length === 1 ? "reply" : "replies"}
            </button>
          )}
        </div>
      </div>

      {showSubs && hasSubs && (
        <div style={{ borderLeft: "1px solid var(--border)", marginLeft: 20 }}>
          {subs.map((sub) => (
            <CommentItem key={sub._id} comment={sub} isSubComment={true} />
          ))}
        </div>
      )}
    </div>
  );
}

export default CommentItem;
