"use client";
// components/post/CreatePost/CreatePostModal.jsx

import { useState, useRef } from "react";
import { X } from "lucide-react";
import { useAuthStore } from "@/store/auth";
import "./createPost.css";

function CreatePostModal({ onClose, onSuccess }) {
  // ── STATE ──────────────────────────────────────────────────
  // file    → the actual File object from input (sent to backend)
  // preview → a temporary URL to show the image in UI (URL.createObjectURL)
  // title   → post title (required)
  // caption → post caption (optional)
  // loading → disables submit button while API call is in progress
  // error   → shows error message if something fails
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [title, setTitle] = useState("");
  // const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // useRef → gives direct access to the hidden <input type="file">
  // so when user clicks the upload zone, we trigger the file picker
  const inputRef = useRef();

  // ── FILE HANDLERS ──────────────────────────────────────────

  // called when user selects file via input click
  const handleFile = (selected) => {
    if (!selected) return;

    // validate file type
    const allowed = ["image/jpeg", "image/png", "image/webp"];
    if (!allowed.includes(selected.type)) {
      setError("Only JPG, PNG, WEBP images allowed.");
      return;
    }

    // validate file size — max 10MB
    if (selected.size > 10 * 1024 * 1024) {
      setError("Image must be under 10MB.");
      return;
    }

    setError("");
    setFile(selected);

    // URL.createObjectURL → creates a temporary browser URL
    // so we can show a preview without uploading yet
    setPreview(URL.createObjectURL(selected));
  };

  // called when user picks from file input
  const handleInputChange = (e) => {
    handleFile(e.target.files[0]);
  };

  // called when user drops a file onto the upload zone
  const handleDrop = (e) => {
    e.preventDefault(); // stop browser from opening the file
    handleFile(e.dataTransfer.files[0]); // get the dropped file
  };

  // ── SUBMIT ─────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    // basic validation
    if (!file) return setError("Please select an image.");
    if (!title.trim()) return setError("Title is required.");
    setLoading(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("file", file); // key must match backend multer field name
      formData.append("title", title.trim());

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}posts/`,
        {
          method: "POST",
          credentials: "include", // sends httpOnly cookie (refresh token)
          headers: {
            // DO NOT set Content-Type here — browser does it automatically for FormData
            Authorization: `Bearer ${useAuthStore.getState().token}`,
          },
          body: formData,
        },
      );
      const data = await res.json();
      if (data.success) {
        onSuccess(); // close modal + refetch feed in parent
      } else {
        setError(data.message || "Failed to create post.");
      }
    } catch (err) {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // ── JSX ────────────────────────────────────────────────────

  return (
    <>
      {/* overlay — click to close */}
      <div className="create-overlay" onClick={onClose} />

      {/* modal — stopPropagation so clicking inside doesn't close */}
      <div className="create-modal" onClick={(e) => e.stopPropagation()}>
        {/* ── HEADER ── */}
        <div className="create-modal-header">
          <span className="create-modal-title">Create post</span>
          <button className="nav-btn" onClick={onClose} title="Close">
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* ── UPLOAD ZONE ── */}
          <div className="upload-zone-wrapper">
            <div
              className={`upload-zone ${preview ? "has-preview" : ""}`}
              onClick={() => inputRef.current?.click()} // trigger hidden input
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()} // allow drop
            >
              {preview ? (
                // show image preview if file selected
                <img src={preview} alt="preview" className="upload-preview" />
              ) : (
                // show placeholder if no file yet
                <>
                  <span className="upload-zone-icon">📷</span>
                  <p className="upload-zone-label">
                    Click or drag to upload image
                  </p>
                  <p className="upload-zone-sub">PNG, JPG, WEBP up to 10MB</p>
                </>
              )}
            </div>

            {/* change image button — only visible when preview exists */}
            {preview && (
              <button
                type="button"
                className="upload-change-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  inputRef.current?.click();
                }}
              >
                Change image
              </button>
            )}
          </div>

          {/* hidden file input — triggered by upload zone click */}
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            style={{ display: "none" }}
            onChange={handleInputChange}
          />

          {/* ── FORM FIELDS ── */}
          <div className="create-modal-body">
            {error && <div className="alert alert-error">{error}</div>}

            <div className="form-group">
              <label className="form-label">Title</label>
              <textarea
                className="input"
                placeholder="What's on your mind?"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                style={{ resize: "none", height: 72, lineHeight: 1.5 }}
              />
            </div>
          </div>

          {/* ── FOOTER ── */}
          <div className="create-modal-footer">
            <button
              type="button"
              className="btn btn-ghost"
              style={{ width: "auto" }}
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: "auto" }}
              disabled={loading || !file || !title.trim()}
            >
              {loading ? "Posting..." : "Post"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default CreatePostModal;
