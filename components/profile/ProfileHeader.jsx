"use client";
import { useState } from "react";
import { Pencil } from "lucide-react";
import { useAuthStore } from "@/store/auth";
import { apiRequest } from "@/lib/api";
import { useEffect } from "react";

function ProfileHeader({ user, initialIsFollowing = false, onFollowChange }) {
  const { user: currentUser } = useAuthStore();
  const [isFollowing, setIsFollowing] = useState(null);

  useEffect(() => {
    function followingPreCheck() {
      setIsFollowing(initialIsFollowing);
    }
    followingPreCheck();
  }, [initialIsFollowing]);

  // console.log("initialFollowings", initialIsFollowing);
  // console.log("isFollowing", isFollowing);

  if (!user) return <div className="profile-skeleton" />;
  const isOwnProfile = currentUser?._id === user._id;

  const initials = user.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const handleFollow = async () => {
    try {
      const endpoint = isFollowing ? `follow/unfollow/` : `follow/follow/`;
      const res = await apiRequest(endpoint, "POST", {
        targetUserId: user._id,
      }); //instant follower following cout request bug : fix needed
      if (res.success) {
        setIsFollowing((p) => !p);
        if (onFollowChange) onFollowChange();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      {/* Banner */}
      {user.bannerPic && user.bannerPic !== "default-banner.png" ? (
        <img src={user.bannerPic} className="profile-banner" alt="banner" />
      ) : (
        <div className="profile-banner" />
      )}

      <div className="profile-card">
        <div className="profile-top-row">
          <div className="profile-avatar-wrap">
            <div className="profile-avatar">
              {user.profilePic ? (
                <img src={user.profilePic} alt={user.name} />
              ) : (
                initials
              )}
            </div>
          </div>

          {isOwnProfile ? (
            <button className="btn-edit-profile">
              <Pencil size={13} />
              Edit profile
              {/* need to work here pending item # */}
            </button>
          ) : (
            <button
              className={isFollowing ? "btn-unfollow" : "btn-follow"}
              onClick={handleFollow}
            >
              {isFollowing ? "Unfollow" : "Follow"}
            </button>
          )}
        </div>

        <p className="profile-name">{user.name}</p>
        <p className="profile-username">@{user.username}</p>
        {user.bio && <p className="profile-bio">{user.bio}</p>}
      </div>
    </div>
  );
}

export default ProfileHeader;
