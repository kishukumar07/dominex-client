// components/post/PostViewer.jsx
"use client";
import { useEffect } from "react";
import { X } from "lucide-react";
import ViewerSidebar from "./ViewerSidebar";

function PostViewer({ post, onClose }) {
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  if (!post) return null;

  return (
    <div className="viewer-overlay" onClick={onClose}>
      <div className="viewer-container" onClick={(e) => e.stopPropagation()}>
        {/* LEFT — image + caption */}
        <div className="viewer-left">
          <img src={post.photo} alt={post.title} className="viewer-img" />
          <div className="viewer-caption">
            <div className="viewer-caption-author">
              {
                <img
                  src={post?.author?.profilePic}
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
                    margin: 0,
                  }}
                >
                  {post.author?.name}
                </p>
                <p
                  style={{
                    fontSize: 11,
                    color: "var(--text-muted)",
                    margin: 0,
                  }}
                >
                  @{post.author?.username}
                </p>
              </div>
            </div>
            <p className="viewer-caption-text">{post.title}</p>
          </div>
        </div>
        {/* {console.log(post)} */}
        {/* RIGHT — reactions + comments */}
        <ViewerSidebar post={post} />
        {/* Close button */}
        <button className="viewer-close" onClick={onClose} title="Close">
          <X size={18} />
        </button>
      </div>
    </div>
  );
}

export default PostViewer;
