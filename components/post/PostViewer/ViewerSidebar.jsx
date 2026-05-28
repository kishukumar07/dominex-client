// components/post/ViewerSidebar.jsx
import ReactionBar from "./ReactionBar";
import CommentSection from "./CommentSection";
import { PostStats } from "./PostStats";

function ViewerSidebar({ post }) {
  // console.log(post.likes.length);

  return (
    <div className="viewer-sidebar">
      {/*
    
  post."likes": [
    {
      "_id": "69fed95fd38a08f36b426a5e",
      "name": "ritinKumar",
      "username": "ritn_07",
      "profilePic": "https://img.icons8.com/?size=100&id=tZuAOUGm9AuS&format=png&color=000000"
    },{}.{}.{} ...n times ... 
  ], 

  */}
      <ReactionBar likes={post.likes} />
      <div className="viewer-sidebar-divider" />
      <PostStats
        likes={post.likes}
        comments={post.comments?.length || 0}
        postId={post._id}
      />
      <div className="viewer-sidebar-divider" />
      {/* {console.log("post  : " + JSON.stringify(post, null, 2))} */}
      <CommentSection
        comments={post.comments || []}
        postId={post._id}
        postAuthorId={post?.author?._id}
      />
    </div>
  );
}

export default ViewerSidebar;
