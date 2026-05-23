// components/post/CommentInput.jsx
"use client";
import { useState } from "react";
import { Send } from "lucide-react";

function CommentInput({ onSubmit }) {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value.trim()) return;
    onSubmit(value.trim());

    
    setValue("");
  };

  return (
    <form className="comment-input-form" onSubmit={handleSubmit}>
      <input
        className="comment-input"
        placeholder="Add a comment..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button
        className="comment-submit"
        type="submit"
        disabled={!value.trim()}
        title="Post comment"
      >
        <Send size={15} />
      </button>
    </form>
  );
}

export default CommentInput;
