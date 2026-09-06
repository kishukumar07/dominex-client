"use client";
import FeedHeader from "./FeedHeader";
import FeedImage from "./FeedImage";
import FeedContent from "./FeedContent";
import FeedActions from "./FeedActions";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { apiRequest } from "@/lib/api";

function FeedCard({ post, onClick, isOwnProfile = false, onDelete }) {
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleDelete = async (e) => {
    e.stopPropagation();
    try {
      //deleting from backend 
      const res = await apiRequest(`posts/${post._id}`, "DELETE");
      //and filtering the deleted post for parent component state ,post # rerendering ...
      if (res.success && onDelete) onDelete(post._id);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="feed-card" onClick={() => onClick(post)}>
      <FeedHeader author={post.author} createdAt={post.createdAt} />
      <FeedImage src={post.photo} alt={post.title} />
      <FeedContent caption={post.title} />
      <FeedActions
        postId={post._id}
        likes={post.likes}
        onClick={(e) => e.stopPropagation()} // ← stop card click when clicking actions
      />

      {/* delete button — only on own profile */}
      {isOwnProfile && (
        <div className="feed-card-delete" onClick={(e) => e.stopPropagation()}>
          {!confirmDelete ? (
            <button
              className="nav-btn"
              onClick={(e) => {
                e.stopPropagation();
                setConfirmDelete(true);
              }}
              style={{
                background: "rgba(0,0,0,0.6)",
                borderRadius: "var(--radius-sm)",
              }}
            >
              <Trash2 size={14} color="#ff4444" />
            </button>
          ) : (
            <div
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-sm)",
                padding: "6px 10px",
                display: "flex",
                gap: 6,
                alignItems: "center",
              }}
            >
              <span style={{ fontSize: 11, color: "var(--text-muted)" }}>
                Sure?
              </span>
              <button className="comment-menu-yes" onClick={handleDelete}>
                Yes
              </button>
              <button
                className="comment-menu-no"
                onClick={(e) => {
                  e.stopPropagation();
                  setConfirmDelete(false);
                }}
              >
                No
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default FeedCard;
