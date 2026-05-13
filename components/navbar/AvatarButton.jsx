import React from "react";

function AvatarButton({onClick}) {
  return (
    <button className="avatar-btn" onClick={onClick}>
      <div className="avatar">KK</div>
    </button>
  );
}

export default AvatarButton;
