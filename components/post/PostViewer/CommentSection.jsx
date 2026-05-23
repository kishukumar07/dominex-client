"use client";
import { useState } from "react";
import CommentItem from "./CommentItem";
import CommentInput from "./CommentInput";
import { apiRequest } from "@/lib/api";
import { useAuthStore } from "@/store/auth";

function CommentSection({ comments = [], postId }) {
  const [localComments, setLocalComments] = useState(
    comments.filter((c) => c && c._id),
  );

  const handleAddComment = async (text) => {
    try {
      const res = await apiRequest(`comments/`, "POST", {
        content: text,
        postId: postId,
      });

      if (res.success) {
        const { user } = useAuthStore.getState();

        const newComment = {
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

        setLocalComments((prev) => [newComment, ...prev]);
      }
    } catch (err) {
      console.error("Failed to add comment", err);
    }
  };
  return (
    <div className="comment-section">
      <div className="comment-list">
        {localComments.length === 0 ? (
          <p
            style={{
              fontSize: 12,
              color: "var(--text-muted)",
              padding: "16px",
              textAlign: "center",
            }}
          >
            No comments yet. Be the first!
          </p>
        ) : (
          localComments.map((comment) => (
            <CommentItem key={comment._id} comment={comment} />
          ))
        )}
      </div>
      <CommentInput onSubmit={handleAddComment} />
    </div>
  );
}

export default CommentSection;
