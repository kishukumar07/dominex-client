import React from "react";
import { useEffect, useState } from "react";

function EditProfile({ onClose }) {
 
 
const formData = useState({
    name: "",
    username: "",
    bio: "",
    location: "",
    website: "",
});

 
  return (
    <div className="model-overlay">
      <div className="edit-profile-model">
        <header>
          <h2>Edit profile</h2>
          <button onClick={onClose}>X</button>
        </header>

        <main>
          {/* Cover - image - > url */}
                  
          {/* Avatar  image -> url */} 

          {/* Name ->text */}

          {/* username  -> text */}

          {/* bio -> text */}

          {/* location >> need be schema update */}

          {/* Website >> need be schema update */}
        </main>

        <footer>
          <button onClick={onClose}>cancel</button>
          <button>Save Changes</button>
        </footer>
      </div>
    </div>
  )} 
export default EditProfile;
