import React from "react";
import { useEffect, useState } from "react";
import { apiRequest } from "@/lib/api";

function EditProfile({ onClose, profileData, setProfile }) {
  const [formData, setFormData] = useState({
    name: `${profileData?.name || ""}`,
    username: `${profileData?.username || ""}`,
    bio: `${profileData?.bio || ""}`,
    profilePic: `${profileData?.profilePic || ""}`, //this
    bannerPic: `${profileData?.bannerPic || ""}`,
    websiteUrl: `${profileData?.websiteUrl || ""}`,
    // location: "",
  });


  // fe => img => backend => data url => fe [StateUpdate]

  const [isSubmitLoading, setSubmitLoading] = useState(false);

  const changeHandler = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSave = async () => {
    setSubmitLoading(true);

    try {
      await apiRequest(`users/${profileData._id}`, "PATCH", formData);

      if (setProfile) {
        setProfile((prevProfile) => ({
          ...prevProfile,
          ...formData,
        }));
      }

      if (onClose) onClose();
    } catch (err) {
      console.error("Failed to Update details", err);
    } finally {
      //loading state ....false
      setSubmitLoading(false);
    }
  };

  // useEffect(() => {}, []);

  return (
    <div className="model-overlay">
      <div className="edit-profile-model">
        <header>
          <h2>Edit profile</h2>
          <button onClick={onClose}>X</button>
        </header>

        <main>
          {/* Cover - image - > url */}
          <div>
            <img src={profileData.profilePic} alt="" />
            <button> Change Cover </button>
          </div>
          {/* Avatar  image -> url */}

          <div>
            <img src={profileData.bannerPic} alt="" />
            <button> Change Photo </button>
          </div>

          {/* Name ->text */}
          <input
            placeholder="Name"
            type="text"
            value={formData.name}
            onChange={(e) => changeHandler("name", e.target.value)}
          />

          {/* username  -> text */}
          <input
            placeholder="UserName"
            type="text"
            disabled
            value={formData.username}
            onChange={(e) => changeHandler("name", e.target.value)}
          />

          {/* bio -> text */}
          <textarea
            placeholder="Tell people about yourself..."
            value={formData.bio || ""}
            onChange={(e) => changeHandler("bio", e.target.value)}
          />

          {/* location >> need be schema update */}
          {/* <input
            type="text"
            disabled
            placeholder="location"
            value={formData.location}
            onChnage={(e) => changeHandler("name", e.target.value)}
          /> */}

          {/* Website */}
          <input
            type="text" //anchor tag
            placeholder="websiteUrl"
            value={formData.websiteUrl}
            onChange={(e) => changeHandler("websiteUrl", e.target.value)}
          />
        </main>

        <footer>
          <button onClick={onClose}>cancel</button>
          <button onClick={handleSave}>
            {isSubmitLoading ? "Saving..." : "Save Changes"}
          </button>
        </footer>
      </div>
    </div>
  );
}
export default EditProfile;

// profileData

// {
//   "_id": "69fed95fd38a08f36b426a5e",
//   "name": "ritinKumar",
//   "username": "ritn_07",
//   "email": "sdfajadfya40@gmail.com",
//   "phone": "edited",
//   "gender": "Prefer not to say",
//   "profilePic": "https://i.pinimg.com/736x/e4/cd/8f/e4cd8f0c82508522c7844f9723178876.jpg",
//   "bannerPic": "https://mir-s3-cdn-cf.behance.net/project_modules/2800_opt_1/79731568097599.5b50bca477735.jpg",
//   "isVerified": true,
//   "followers": [
//       {
//           "_id": "69f57cb16b3c74736b9330a2",
//           "name": "niketsahu",
//           "username": "kishu_123",
//           "profilePic": "https://avatars.githubusercontent.com/u/180024038?v=4"
//       }
//   ],
//   "followings": [
//       {
//           "_id": "69f57cb16b3c74736b9330a2",
//           "name": "niketsahu",
//           "username": "kishu_123",
//           "profilePic": "https://avatars.githubusercontent.com/u/180024038?v=4"
//       }
//   ],
//   "posts": [
//       "6a31e096679f97ff66b73c19",
//       "6a3aaa2ac81b0261a49c29cb",
//       "6a9d8fc2894f7d6870eaf809",
//       "6a9da47f894f7d6870eaf8aa"
//   ]
// }
