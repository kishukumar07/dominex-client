"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useAuthStore } from "@/store/auth";
import { apiRequest } from "@/lib/api";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileStats from "@/components/profile/ProfileStats";
import ProfileTabs from "@/components/profile/ProfileTabs";

import FeedGrid from "@/components/post/PostsPage/FeedGrid";
import PostViewer from "@/components/post/PostViewer/PostViewer";

import "../profile.css";
import "../../feed/feed.css";
import ProfileContributions from "@/components/profile/tabs/contributions";
import ProfilePulse from "@/components/profile/tabs/pulse";
import FollowPanel from "@/components/profile/panels/FollowPanel";

function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState({});
  const [activeTab, setActiveTab] = useState("posts");
  const [isFollowing, setIsFollowing] = useState(false);
  const { userId } = useParams();

  //Integrated ...
  const [postLoading, setPostLoading] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const [panel, setPanel] = useState(null); // null | "followers" | "following"

  //ontabchange => handeler
  const onTabChange = (tab) => {
    // console.log(tab);
    setSelectedPost(null);
    setActiveTab(tab);
  };

  // get currentUser for isFollowing check
  const { user: currentUser } = useAuthStore();

  // calculate after profile loads
  const initialIsFollowing =
    profile?.followers?.some((follower) => follower._id === currentUser?._id) ||
    false;

  // console.log("initialFollowings", initialIsFollowing);

  //for delete icon purpose ...
  // console.log(currentUser._id ==userId);
  // console.log(userId);
  const isOwnProfile = currentUser._id == userId;

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
    //Fetch Profile + post{res : same as get all post ...} ... # manage state ...
    const fetchData = async () => {
      try {
        const res = await apiRequest(`users/profile/${userId}`, "GET");
        const PostRes = await apiRequest(`posts/user/${userId}`, "GET");
        // console.log(res.data);
        // object of userProfile
        if (res.success && res.data) {
          setProfile(res.data);
        }
        // console.log(PostRes.data); //[{}{},{}...posts of the user ]
        if (PostRes.success && PostRes.data?.length) {
          setPosts(PostRes.data);
        }
        //  managing profile , posts
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [userId]);

  // console.log(posts);
  // console.log(profile);
  return (
    <div className=".profile-page">
      <ProfileHeader
        user={profile}
        initialIsFollowing={initialIsFollowing}
        onFollowChange={() => {
          // refetch profile to update follower count
          apiRequest(`users/profile/${userId}`, "GET").then((res) => {
            if (res.success) setProfile(res.data);
          });
        }}
      />
      <ProfileStats
        user={profile}
        postsCount={posts.length}
        onFollowersClick={() => setPanel("followers")}
        onFollowingClick={() => setPanel("following")}
      />
      {/* // render panel */}
      {panel && (
        <FollowPanel
          type={panel}
          user={profile}
          onClose={() => setPanel(null)}
        />
      )}
      <ProfileTabs activeTab={activeTab} onTabChange={onTabChange} />
      {/* {console.log(panel)} */}
      {activeTab == "posts" && (
        <div className="feed-page">
          <FeedGrid
            posts={posts}
            onPostClick = {handlePostClick}
            isOwnProfile = {isOwnProfile} //checked if OwnProfile - completed this part already ... 
          />
          {postLoading && (
            <div className="viewer-overlay">
              <p style={{ color: "#fff" }}>Loading...</p>
            </div>
          )}

          {selectedPost && !postLoading && (
            <PostViewer
              post={selectedPost}
              onClose={() => setSelectedPost(null)}
            />
          )}
        </div>
      )}
      {/* //i have complete this pending things...*/}
      {activeTab == "Contributions" && (
        // <h1>
        //   Upcoming ... Contributions → every comment, reply, reaction they made
        //   → shows how active they are in the community → like GitHub shows
        //   commits across all repos
        // </h1>
        <ProfileContributions />
      )}
      {activeTab == "Pulse" && (
        // <h1>
        //   Upcoming... Pulse → their stats dashboard → total posts, total likes
        //   received, total comments → most liked post → join date, streak,
        //   activity → no manual input — all auto from existing data
        // </h1>
        <ProfilePulse />
      )}
    </div>
  );
}

export default ProfilePage;
