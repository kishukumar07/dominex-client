"use client";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";

function FollowPanel({ type, user, onClose }) {
  // followers and followings come from user object already fetched

  console.log(type, user);

  const list =
    type === "followers" ? user?.followers || [] : user?.followings || [];
  const router = useRouter();

  return (
    <>
      <div className="follow-panel-overlay" onClick={onClose} />
      <div className="follow-panel">
        {/* header */}
        <div className="follow-panel-header">
          <span className="follow-panel-title">{type}</span>
          <button className="nav-btn" onClick={onClose}>
            <X size={16} />
          </button>
        </div>

        {/* list */}
        <div className="follow-panel-list">
          {list.length === 0 ? (
            <p className="follow-panel-empty">No {type} yet.</p>
          ) : (
            list.map((person, i) => {
              const initials = person.name
                ?.split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()
                .slice(0, 2);
              return (
                <div
                  key={person._id || i}
                  className="follow-panel-item"
                  onClick={() => {
                    router.push(`/main/profile/${person._id}`);
                  }}
                >
                  <div
                    className="avatar avatar-sm"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 11,
                      fontWeight: 600,
                    }}
                  >
                    {person.profilePic ? (
                      <img
                        src={person.profilePic}
                        alt={person.name}
                        style={{
                          width: "100%",
                          height: "100%",
                          borderRadius: "50%",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      initials
                    )}
                  </div>
                  <div>
                    <p
                      style={{
                        fontSize: 13,
                        fontWeight: 500,
                        color: "var(--text-primary)",
                        margin: 0,
                      }}
                    >
                      {person.name}
                    </p>
                    <p
                      style={{
                        fontSize: 11,
                        color: "var(--text-muted)",
                        margin: 0,
                      }}
                    >
                      @{person.username}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
}

export default FollowPanel;
