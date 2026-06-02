// components/profile/ProfilePulse.jsx
"use client";
import {
  Heart,
  MessageCircle,
  FileText,
  Users,
  TrendingUp,
  Calendar,
} from "lucide-react";

const mockPulse = {
  totalPosts: 24,
  totalLikesReceived: 312,
  totalCommentsReceived: 87,
  totalFollowers: 128,
  joinedDate: "2024-08-31",
  mostLikedPost: {
    _id: "1",
    title: "Building reusable frontend systems",
    photo: "https://picsum.photos/200/200?random=10",
    likes: 31,
    comments: 14,
  },
  weeklyActivity: [4, 2, 7, 1, 5, 3, 6], // sun to sat
};

function StatCard({ icon, label, value, color, bg }) {
  return (
    <div
      style={{
        background: "var(--bg-input)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-md)",
        padding: "16px",
        display: "flex",
        alignItems: "center",
        gap: 12,
      }}
    >
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: "var(--radius-sm)",
          background: bg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <span style={{ color }}>{icon}</span>
      </div>
      <div>
        <p
          style={{
            fontSize: 20,
            fontWeight: 600,
            color: "var(--text-primary)",
            margin: 0,
          }}
        >
          {value}
        </p>
        <p style={{ fontSize: 11, color: "var(--text-muted)", margin: 0 }}>
          {label}
        </p>
      </div>
    </div>
  );
}

function ActivityBar({ value, max }) {
  const height = max > 0 ? Math.max((value / max) * 48, 4) : 4;
  const isActive = value > 0;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 4,
      }}
    >
      <div
        style={{
          width: 20,
          height: 48,
          display: "flex",
          alignItems: "flex-end",
        }}
      >
        <div
          style={{
            width: "100%",
            height,
            background: isActive ? "var(--accent)" : "var(--bg-input)",
            borderRadius: 3,
            transition: "height 0.3s ease",
          }}
        />
      </div>
      <span style={{ fontSize: 9, color: "var(--text-muted)" }}>{value}</span>
    </div>
  );
}

function ProfilePulse({ pulse = mockPulse }) {
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  const maxActivity = Math.max(...pulse.weeklyActivity);

  return (
    <div style={{ padding: "4px 0" }}>
      {/* stat cards grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 10,
          marginBottom: 16,
        }}
      >
        <StatCard
          icon={<FileText size={18} />}
          label="Total Posts"
          value={pulse.totalPosts}
          color="#534AB7"
          bg="#EEEDFE"
        />
        <StatCard
          icon={<Heart size={18} />}
          label="Likes Received"
          value={pulse.totalLikesReceived}
          color="#993C1D"
          bg="#FAECE7"
        />
        <StatCard
          icon={<MessageCircle size={18} />}
          label="Comments Received"
          value={pulse.totalCommentsReceived}
          color="#0F6E56"
          bg="#E1F5EE"
        />
        <StatCard
          icon={<Users size={18} />}
          label="Followers"
          value={pulse.totalFollowers}
          color="#185FA5"
          bg="#E6F1FB"
        />
      </div>

      {/* weekly activity */}
      <div
        style={{
          background: "var(--bg-input)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-md)",
          padding: 16,
          marginBottom: 16,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            marginBottom: 12,
          }}
        >
          <TrendingUp size={14} color="var(--accent)" />
          <span
            style={{
              fontSize: 12,
              fontWeight: 500,
              color: "var(--text-primary)",
            }}
          >
            This week
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 8 }}>
          {pulse.weeklyActivity.map((val, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 4,
              }}
            >
              <ActivityBar value={val} max={maxActivity} />
              <span style={{ fontSize: 9, color: "var(--text-muted)" }}>
                {days[i]}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* most liked post */}
      {pulse.mostLikedPost && (
        <div
          style={{
            background: "var(--bg-input)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-md)",
            padding: 16,
            marginBottom: 16,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              marginBottom: 12,
            }}
          >
            <TrendingUp size={14} color="var(--accent)" />
            <span
              style={{
                fontSize: 12,
                fontWeight: 500,
                color: "var(--text-primary)",
              }}
            >
              Top post
            </span>
          </div>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <img
              src={pulse.mostLikedPost.photo}
              style={{
                width: 56,
                height: 56,
                borderRadius: "var(--radius-sm)",
                objectFit: "cover",
              }}
              alt="top post"
            />
            <div>
              <p
                style={{
                  fontSize: 13,
                  color: "var(--text-primary)",
                  margin: "0 0 4px",
                  fontWeight: 500,
                }}
              >
                {pulse.mostLikedPost.title}
              </p>
              <div style={{ display: "flex", gap: 12 }}>
                <span
                  style={{
                    fontSize: 11,
                    color: "var(--text-muted)",
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  <Heart size={11} /> {pulse.mostLikedPost.likes}
                </span>
                <span
                  style={{
                    fontSize: 11,
                    color: "var(--text-muted)",
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  <MessageCircle size={11} /> {pulse.mostLikedPost.comments}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* joined date */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          padding: "10px 0",
        }}
      >
        <Calendar size={13} color="var(--text-muted)" />
        <span style={{ fontSize: 12, color: "var(--text-muted)" }}>
          Joined{" "}
          {new Date(pulse.joinedDate).toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
          })}
        </span>
      </div>
    </div>
  );
}

export default ProfilePulse;
