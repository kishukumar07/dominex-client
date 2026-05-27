// components/post/ViewerSidebar.jsx
import ReactionBar from "./ReactionBar";
import CommentSection from "./CommentSection";
import { PostStats } from "./PostStats";

function ViewerSidebar({ post }) {
  return (
    <div className="viewer-sidebar">
      <ReactionBar likes={post.likes} />
      <div className="viewer-sidebar-divider" />

      <PostStats
        likes={post.likes}
        comments={post.comments?.length || 0}
        postId={post._id}
      />

      <div className="viewer-sidebar-divider" />

      {console.log(post)}

      <CommentSection comments={post.comments || []} postId={post._id} />
    </div>
  );
}

export default ViewerSidebar;
