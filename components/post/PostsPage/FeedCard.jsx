// components/post/FeedCard.jsx
import FeedHeader from "./FeedHeader";
import FeedImage from "./FeedImage";
import FeedContent from "./FeedContent";
import FeedActions from "./FeedActions";

function FeedCard({ post, onClick }) {
  return (
    <div className="feed-card" onClick={() => onClick(post)}>
      <FeedHeader author={post.author} createdAt={post.createdAt} />
      <FeedImage src={post.photo} alt={post.title} />
      <FeedContent caption={post.title} />
      <FeedActions likes={post.likes} postId={post._id} />
    </div>

    //i need to change this as insta -> yt
  );
}

export default FeedCard;
