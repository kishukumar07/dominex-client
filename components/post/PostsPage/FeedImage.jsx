// components/post/FeedImage.jsx

function FeedImage({ src, alt }) {
  return (
    <div className="feed-card-image">
      <img src={src} alt={alt || "post image"} loading="lazy" />
    </div>
  );
}

export default FeedImage;
