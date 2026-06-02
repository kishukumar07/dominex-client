function ReactionBar({ likes = [] }) {
  // "likes": [
  //   {
  //     "_id": "69fed95fd38a08f36b426a5e",
  //     "name": "ritinKumar",
  //     "username": "ritn_07",
  //     "profilePic": "https://img.icons8.com/?size=100&id=tZuAOUGm9AuS&format=png&color=000000"
  //   },{}.{}.{} ...n times for diff authors...
  // ]
  console.log(likes);
  const colors = [
    "#CECBF6",
    "#9FE1CB",
    "#F5C4B3",
    "#B5D4F4",
    "#FAC775",
    "#F4C0D1",
  ];

  const textColors = [
    "#3C3489",
    "#085041",
    "#712B13",
    "#0C447C",
    "#633806",
    "#72243E",
  ];

  const displayLikes = likes.slice(0, 8); //need desc order _> a liked it should be at top

  return (
    <div className="reaction-bar">
      <p className="reaction-title">Reactions</p>
      <div className="reaction-avatars">
        {displayLikes.length > 0 ? (
          displayLikes.map((author, i) => (
            <div
              key={author._id}
              className="reaction-avatar"
              style={{
                background: colors[i % colors.length],
                color: textColors[i % textColors.length],
                marginLeft: i > 0 ? -8 : 0,
                zIndex: displayLikes.length - i,
              }}
            >
              <img
                src={author?.profilePic}
                alt="author Profile"
                className="reaction-avatar "
              />
              {/* future onclick here open that user profile .*/}
            </div>
          ))
        ) : (
          <p style={{ fontSize: 12, color: "var(--text-muted)" }}>
            No reactions yet
          </p>
        )}
        {likes.length > 8 && (
          <div
            className="reaction-avatar reaction-more"
            style={{ marginLeft: -8 }}
          >
            +{likes.length - 8}
          </div>
        )}
      </div>
      <p style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 6 }}>
        {likes.length} {likes.length === 1 ? "reaction" : "reactions"}
      </p>
    </div>
  );
}

export default ReactionBar;
