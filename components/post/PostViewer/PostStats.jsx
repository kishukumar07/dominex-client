"use client";
// components/post/PostStats.jsx
import { Heart, MessageCircle } from "lucide-react";
import { useState } from "react";
import { useAuthStore } from "@/store/auth";
import { apiRequest } from "@/lib/api";
export function PostStats({ likes = [], comments = 0, postId }) {
  const { user } = useAuthStore();

  const [isLiked, setIsLiked] = useState(likes.includes(user?._id));
  const [likeCount, setLikeCount] = useState(likes.length);

  const handleLike = async (e) => {
    e.stopPropagation();
    setIsLiked((p) => !p);
    setLikeCount((p) => (isLiked ? p - 1 : p + 1));
    try {
      const res = await apiRequest(`posts/${postId}/like`, "PUT");
    } catch (err) {
      console.log(err);
      setIsLiked((p) => !p);
      setLikeCount((p) => (isLiked ? p + 1 : p - 1));
    }
  };

  return (
    <div className="post-stats">
      <button
        className="post-stat"
        onClick={handleLike}
        style={{ background: "transparent", border: "none", cursor: "pointer" }}
      >
        <Heart
          size={14}
          fill={isLiked ? "red" : "none"}
          color={isLiked ? "red" : "currentColor"}
        />
        <span>{likeCount} likes</span>
      </button>
      <div className="post-stat">
        <MessageCircle size={14} />
        <span>{comments} comments</span>
      </div>
    </div>
  );
}
