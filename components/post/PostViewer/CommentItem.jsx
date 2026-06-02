"use client";
import { useState } from "react";
import { ChevronDown, ChevronUp, MoreHorizontal, Send } from "lucide-react";
import { apiRequest } from "@/lib/api";
import { useAuthStore } from "@/store/auth";
import timeAgo from "@/lib/timeAgo";

function Avatar({ name }) {
  const initials = name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
  return <div className="comment-avatar">{initials}</div>;
}

function CommentItem({
  comment,
  isSubComment = false,
  postAuthorId,
  onDelete,
}) {
  // console.log(comment);
  const [showSubs, setShowSubs] = useState(false);
  const [showReply, setShowReply] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [localSubs, setLocalSubs] = useState(comment.allSubComments || []);
  const [menuOpen, setMenuOpen] = useState(false);
  const [confirmDelete, setconfirmDelete] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(comment.content);

  const hasSubs = localSubs.length > 0;
  const { user } = useAuthStore.getState();

  const isOwnComment = comment.author?._id === user?._id;
  const isPostAuthor = postAuthorId === user?._id; // passed postAuthorId as prop
  const canDelete = isOwnComment || isPostAuthor;
  const canEdit = isOwnComment;
  const showMenu = canDelete || canEdit;

  const handleReply = async (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    try {
      const res = await apiRequest(`comments/${comment._id}/reply`, "POST", {
        content: replyText.trim(),
      });
      if (res.success) {
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
    const previousSubs = localSubs;
    onDelete?.(comment._id);
    setMenuOpen(false);
    setconfirmDelete(false);
    try {
      await apiRequest(`comments/${comment._id}`, "DELETE");
      // TODO: remove from parent list
    } catch (err) {
      console.error("Failed to delete", err);
      //Featured : ->
      // If this is a sub-comment, roll back the parent's localSubs
      // by calling a separate onDeleteFailed callback, or simpler:
      // re-add via onDelete inverse — but easiest is just a rollback prop.
      // For now, at minimum log and optionally show a toast.
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    if (!editText.trim()) return;
    try {
      const res = await apiRequest(`comments/${comment._id}`, "PATCH", {
        content: editText.trim(),
      });
      if (res.success) {
        setIsEditing(false);
      }
    } catch (err) {
      console.error("Failed to edit", err);
    }
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

            {/* three dots — only show if allowed */}
            {showMenu && (
              <div style={{ position: "relative", marginLeft: "auto" }}>
                <button
                  className="nav-btn"
                  onClick={() => {
                    setMenuOpen((p) => !p);
                    setconfirmDelete(false);
                  }}
                  style={{ padding: "2px 4px" }}
                >
                  <MoreHorizontal size={14} />
                </button>

                {menuOpen && (
                  <div className="comment-menu">
                    {!confirmDelete ? (
                      <>
                        {canEdit && (
                          <button
                            className="comment-menu-item"
                            onClick={() => {
                              setIsEditing(true);
                              setMenuOpen(false);
                            }}
                          >
                            Edit
                          </button>
                        )}
                        {canDelete && (
                          <button
                            className="comment-menu-item comment-menu-delete"
                            onClick={() => setconfirmDelete(true)}
                          >
                            Delete
                          </button>
                        )}
                      </>
                    ) : (
                      <>
                        <p className="comment-menu-confirm">Sure?</p>
                        <div className="comment-menu-actions">
                          <button
                            className="comment-menu-yes"
                            onClick={handleDelete}
                          >
                            Yes
                          </button>
                          <button
                            className="comment-menu-no"
                            onClick={() => setconfirmDelete(false)}
                          >
                            No
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* content */}
          {isEditing ? (
            <form
              onSubmit={handleEdit}
              style={{ display: "flex", gap: 6, marginTop: 4 }}
            >
              <input
                className="comment-input"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                autoFocus
              />
              <button
                className="comment-submit"
                type="submit"
                disabled={!editText.trim()}
              >
                <Send size={13} />
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setEditText(comment.content);
                }}
                style={{
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  color: "var(--text-muted)",
                  fontSize: 11,
                }}
              >
                Cancel
              </button>
            </form>
          ) : (
            <p className="comment-text">{editText}</p>
          )}

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
            <CommentItem
              key={sub._id}
              comment={sub}
              isSubComment={true}
              postAuthorId={postAuthorId}
              onDelete={(deletedId) =>
                setLocalSubs((prev) => prev.filter((s) => s._id !== deletedId))
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default CommentItem;
