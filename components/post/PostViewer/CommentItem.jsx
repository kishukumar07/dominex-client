"use client";
import { useState } from "react";
import { ChevronDown, ChevronUp, MoreHorizontal, Send } from "lucide-react";
import { apiRequest } from "@/lib/api";
import { useAuthStore } from "@/store/auth";

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
  const [showReply, setShowReply] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [localSubs, setLocalSubs] = useState(comment.allSubComments || []);

  const hasSubs = localSubs.length > 0;

  const handleReply = async (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    try {
      const res = await apiRequest(`comments/${comment._id}/reply`, "POST", {
        content: replyText.trim(),
      });

      if (res.success) {
        const { user } = useAuthStore.getState();
        const newReply = {
          _id: res.data._id,
          content: res.data.content,
          createdAt: res.data.createdAt,
          allSubComments: [],
          author: {
            _id: user._id,
            name: user.name,
            username: user.username,
            profilePic: user.profilePic,
          },
        };
        setLocalSubs((prev) => [...prev, newReply]);
        setShowSubs(true);
        setShowReply(false);
        setReplyText("");
      }
    } catch (err) {
      console.error("Failed to reply", err);
    }
  };

  const handleDelete = async () => {
    try {
      await apiRequest(`comments/${comment._id}`, "DELETE");
      // TODO: remove from parent list
    } catch (err) {
      console.error("Failed to delete", err);
    }
    setMenuOpen(false);
  };

  return (
    <div style={{ paddingLeft: isSubComment ? 32 : 0 }}>
      <div className="comment-item">
        <Avatar name={comment.author?.name} />
        <div className="comment-body">
          {/* header */}
          <div className="comment-header">
            <span className="comment-name">{comment.author?.name}</span>
            <span style={{ fontSize: 10, color: "var(--text-muted)" }}>
              @{comment.author?.username}
            </span>
            <span className="comment-time">{timeAgo(comment.createdAt)}</span>

            {/* three dots */}
            <div style={{ position: "relative", marginLeft: "auto" }}>
              <button
                className="nav-btn"
                onClick={() => setMenuOpen((p) => !p)}
                style={{ padding: "2px 4px" }}
              >
                <MoreHorizontal size={14} />
              </button>
              {menuOpen && (
                <div className="comment-menu">
                  <button className="comment-menu-item">Edit</button>
                  <button
                    className="comment-menu-item comment-menu-delete"
                    onClick={handleDelete}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* content */}
          <p className="comment-text">{comment.content}</p>

          {/* action row */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {/* reply button */}
            <button
              onClick={() => setShowReply((p) => !p)}
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                color: "var(--text-muted)",
                fontSize: 11,
                padding: "2px 0",
                fontFamily: "var(--font-body)",
              }}
            >
              Reply
            </button>

            {/* view replies */}
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
                  padding: "2px 0",
                  fontFamily: "var(--font-body)",
                }}
              >
                {showSubs ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                {showSubs ? "Hide" : `View ${localSubs.length}`}{" "}
                {localSubs.length === 1 ? "reply" : "replies"}
              </button>
            )}
          </div>

          {/* inline reply input */}
          {showReply && (
            <form
              onSubmit={handleReply}
              style={{ display: "flex", gap: 6, marginTop: 8 }}
            >
              <input
                className="comment-input"
                placeholder={`Reply to @${comment.author?.username}...`}
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                autoFocus
              />
              <button
                className="comment-submit"
                type="submit"
                disabled={!replyText.trim()}
              >
                <Send size={13} />
              </button>
            </form>
          )}
        </div>
      </div>

      {/* subcomments */}
      {showSubs && hasSubs && (
        <div style={{ borderLeft: "1px solid var(--border)", marginLeft: 20 }}>
          {localSubs.map((sub) => (
            <CommentItem key={sub._id} comment={sub} isSubComment={true} />
          ))}
        </div>
      )}
    </div>
  );
}

export default CommentItem;
