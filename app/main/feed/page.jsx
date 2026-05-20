"use client";

import { useState, useEffect } from "react";
import { apiRequest } from "@/lib/api";
import { mockFeedData } from "./data";
import FeedSlider from "@/components/post/PostsPage/FeedSlider";
import FeedGrid from "@/components/post/PostsPage/FeedGrid";
import "./feed.css";

export default function FeedPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPostid, setSelectedPostId] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await apiRequest("posts/", "GET");
        console.log(res);
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
      <FeedSlider />
      <FeedGrid posts={posts} onPostClick={setSelectedPostId} />

      {/*PostViewer will go here in Part 2  : i'll send soloPost api request to get all info api/posts/id */}
      {selectedPostid && (
      
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.85)",
            zIndex: 200,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={() => setSelectedPostId(null)}
        >
          <div
            style={{
              background: "var(--bg-card)",
              borderRadius: "var(--radius-md)",
              padding: 24,
              color: "var(--text-muted)",
              fontSize: 14,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {selectedPostid}
            :for this ... PostViewer coming in Part 2 — click outside to close
          </div>
        </div>
      )}
    </div>
  );
}
