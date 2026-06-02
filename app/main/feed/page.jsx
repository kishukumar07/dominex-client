"use client";

import { useState, useEffect } from "react";
import { apiRequest } from "@/lib/api";
import { mockFeedData } from "./data";
import FeedSlider from "@/components/post/PostsPage/FeedSlider";
import FeedGrid from "@/components/post/PostsPage/FeedGrid";
import "./feed.css";
import PostViewer from "@/components/post/PostViewer/PostViewer";

export default function FeedPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState(null);
  const [postLoading, setPostLoading] = useState(false);

  const handlePostClick = async (post) => {
    setPostLoading(true);
    try {
      const res = await apiRequest(`posts/${post._id}`, "GET");
      if (res.success && res.post?.length) {
        setSelectedPost(res.post[0]);
      }
    } catch (err) {
      console.error("Failed to fetch post", err);
    } finally {
      setPostLoading(false);
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await apiRequest("posts/", "GET");

        if (res.success && res.posts?.length) {
          setPosts(res.posts);
        } else {
          // fallback to mock data during development
          setPosts(mockFeedData);
        }
      } catch {
        // fallback to mock data if API not ready
        setPosts(mockFeedData);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "60px",
          color: "var(--text-muted)",
        }}
      >
        Loading feed...
        {/* can be modified further ...*/}
      </div>
    );
  }

  return (
    <div className="feed-page">
      {/* <FeedSlider /> */}
      {/* Peinding Todo... */}

      <FeedGrid posts={posts} onPostClick={handlePostClick} />
      {postLoading && (
        <div className="viewer-overlay">
          <p style={{ color: "#fff" }}>Loading...</p>
        </div>
      )}

      {selectedPost && !postLoading && (
        <PostViewer post={selectedPost} onClose={() => setSelectedPost(null)} />
      )}
    </div>
  );
}
