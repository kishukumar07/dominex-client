import React from "react";
import { useAuthStore } from "@/store/auth";

function AvatarButton({ onClick }) {
  const authData = useAuthStore();

  return (
    <button className="avatar-btn" onClick={onClick}>
      <img src={authData.user.profilePic} alt="Profile" className="avatar" />
      {/* Using `<img>` could result in slower LCP and higher bandwidth. Consider using `<Image />` from `next/image` or a custom image loader to automatically optimize images. This may incur additional usage or cost from your provider. See: https://nextjs.org/docs/messages/no-img-element  */}
    </button>
  );
}

export default AvatarButton;
