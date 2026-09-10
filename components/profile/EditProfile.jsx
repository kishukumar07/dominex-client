import React from "react";
import { useRef, useState } from "react";
import { apiRequest } from "@/lib/api";

function EditProfile({ onClose, profileData, setProfile }) {
  const [profilePic, SetProfilePic] = useState(null);
  const [bannerPic, setbannerPic] = useState(null); //this will go in be and if...

  const [profilePreview, setProfilePreview] = useState(profileData.profilePic);
  const [bannerPicPreview, setbannerPicPreview] = useState(
    profileData.bannerPic,
  );

  const profileInputRef = useRef(null);
  const bannerInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: `${profileData?.name || ""}`,
    username: `${profileData?.username || ""}`,
    bio: `${profileData?.bio || ""}`,
    websiteUrl: `${profileData?.websiteUrl || ""}`,
  });

  
 

  const [isSubmitLoading, setSubmitLoading] = useState(false);



  const changeHandler = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

//need : crossverify the be api controller logic : sepration of image needed ...
  const handleProfileChange = (e) => {
    const file = e.target.files[0]; //i am here ...
    if (!file) return;
    SetProfilePic(file);
    const previewProfileUrl = URL.createObjectURL(file);
    setProfilePreview(previewProfileUrl); //turant nai hona hai update thoda load lega then be ka response aane par ui update
  };
  
  //need to create be api and connect to this 
  const handleBannerChange = (e) => {
    const file = e.target.files[0]; //dalte ke saath turant change ho ja rha hai ...
    if (!file) return;
    setbannerPic(file);
    const previewbannerUrl = URL.createObjectURL(file);
    setbannerPicPreview(previewbannerUrl);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleTextSubmit();
    if (profilePic || bannerPic) {
      await handleImageSubmit();
    }
  };

  const handleImageSubmit = async () => {
    //need to edit this section ...
    // e.preventDefault();
    const data = new FormData();

    // Images
    if (profilePic) {
      data.append("profilePic", profilePic);
    }

    if (bannerPic) {
      data.append("bannerPic", bannerPic);
    }

    // DEMO
    console.log("Data ready to send:");
    console.log(formData);
    console.log(profilePic);
    console.log(bannerPic);

    // Example:
    //
    // await fetch("/api/profile", {
    //   method: "PUT",
    //   body: data
    // });

    onClose();
  };

  const handleTextSubmit = async () => {
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
            <img src={profilePreview} alt="" />
            <button onClick={() => profileInputRef.current.click()}>
              {" "}
              Change Cover{" "}
            </button>

            <input
              ref={profileInputRef}
              type="file"
              accept="image/*"
              hidden
              onChange={handleProfileChange}
            />
          </div>

          {/* Avatar  image -> url */}

          <div>
            <img src={bannerPicPreview} alt="" />
            <button onClick={() => bannerInputRef.current.click()}>
              {" "}
              Change Photo{" "}
            </button>
            <input
              ref={bannerInputRef}
              type="file"
              accept="image/*"
              hidden
              onChange={handleBannerChange}
            />
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
          <button onClick={handleSubmit}>
            {isSubmitLoading ? "Saving..." : "Save Changes"}
          </button>
        </footer>
      </div>
    </div>
  );
}
export default EditProfile;

