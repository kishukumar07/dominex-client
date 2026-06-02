// components/profile/ProfileContributions.jsx :->  completely static yet
"use client";

const mockContributions = [
  {
    _id: "1",
    type: "comment",
    content: "Great insight on React architecture!",
    postTitle: "React patterns 2024",
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    _id: "2",
    type: "reply",
    content: "Totally agree with your approach here.",
    postTitle: "Node.js best practices",
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
  },
  {
    _id: "3",
    type: "reaction",
    content: "Liked a post",
    postTitle: "MongoDB aggregation tips",
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    _id: "4",
    type: "comment",
    content: "This helped me fix a bug I had for days.",
    postTitle: "Debugging async code",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    _id: "5",
    type: "reply",
    content: "Have you tried using Redis for this?",
    postTitle: "Caching strategies",
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

const typeConfig = {
  comment: { label: "Commented", color: "#534AB7", bg: "#EEEDFE" },
  reply: { label: "Replied", color: "#0F6E56", bg: "#E1F5EE" },
  reaction: { label: "Reacted", color: "#854F0B", bg: "#FAEEDA" },
};

function ContributionItem({ item }) {
  const config = typeConfig[item.type] || typeConfig.comment;

  return (
    <div
      style={{
        display: "flex",
        gap: 12,
        padding: "12px 0",
        borderBottom: "0.5px solid var(--border)",
      }}
    >
      {/* type badge */}
      <div
        style={{
          flexShrink: 0,
          padding: "2px 8px",
          borderRadius: 10,
          background: config.bg,
          color: config.color,
          fontSize: 10,
          fontWeight: 500,
          height: "fit-content",
          marginTop: 2,
          whiteSpace: "nowrap",
        }}
      >
        {config.label}
      </div>

      {/* content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p
          style={{
            fontSize: 13,
            color: "var(--text-primary)",
            margin: "0 0 4px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {item.content}
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 11, color: "var(--text-muted)" }}>on</span>
          <span
            style={{
              fontSize: 11,
              color: "var(--accent)",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {item.postTitle}
          </span>
        </div>
      </div>

      {/* time */}
      <span
        style={{
          fontSize: 11,
          color: "var(--text-muted)",
          flexShrink: 0,
          marginTop: 2,
        }}
      >
        {timeAgo(item.createdAt)}
      </span>
    </div>
  );
}

function ProfileContributions({ contributions = mockContributions }) {
  if (!contributions.length) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: 40,
          color: "var(--text-muted)",
          fontSize: 13,
        }}
      >
        No contributions yet.
      </div>
    );
  }

  return (
    <div style={{ padding: "0 4px" }}>
      {/* summary row */}
      <div
        style={{
          display: "flex",
          gap: 16,
          padding: "12px 0 16px",
          borderBottom: "0.5px solid var(--border)",
          marginBottom: 4,
        }}
      >
        {Object.entries(typeConfig).map(([type, config]) => {
          const count = contributions.filter((c) => c.type === type).length;
          return (
            <div
              key={type}
              style={{ display: "flex", alignItems: "center", gap: 6 }}
            >
              <span
                style={{
                  padding: "2px 8px",
                  borderRadius: 10,
                  background: config.bg,
                  color: config.color,
                  fontSize: 10,
                  fontWeight: 500,
                }}
              >
                {config.label}
              </span>
              <span style={{ fontSize: 12, color: "var(--text-muted)" }}>
                {count}
              </span>
            </div>
          );
        })}
      </div>

      {/* list */}
      {contributions.map((item) => (
        <ContributionItem key={item._id} item={item} />
      ))}
    </div>
  );
}

export default ProfileContributions;
