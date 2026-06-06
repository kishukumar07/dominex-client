"use client";

import React from "react";
import NavLeft from "./NavLeft";
import NavRight from "./NavRight";
import { useState, useRef } from "react";
import HamburgerPanel from "./HamburgerPanel";
import AvatarDropdown from "./AvatarDropdown";

import CreatePostModal from "../post/CreatePost/CreatePostModal";

function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(null); //"plus"

  return (
    <>
      <nav className="nav">
        <NavLeft onHamburgerClick={() => setSidebarOpen(true)} />
        <NavRight
          onCreateClick={() => setCreateOpen("plus")}
          onAvatarClick={() => setDropdownOpen((prev) => !prev)}
          dropdownOpen={dropdownOpen}
          setDropdownOpen={setDropdownOpen}
        />
      </nav>

      {/* Hamburger panel */}
      <HamburgerPanel
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* // render modal */}
      {createOpen === "plus" && (
        <CreatePostModal
          onClose={() => setCreateOpen(null)}
          onSuccess={() => {
            setCreateOpen(null);
            // optionally refetch feed
          }}
        />
      )}

      {/* Avatar dropdown */}
      {dropdownOpen && (
        <AvatarDropdown
          isOpen={dropdownOpen}
          onClose={() => setDropdownOpen(false)}
        />
      )}
    </>
  );
}

export default Navbar;

// Navbar.jsx
// │
// ├── HamburgerPanel {NAV_LEFT}
// │     ├── overlay
// │     ├── sidebar panel
// │     ├── panel header
// │     └── PanelDefault
// │
// └── AvatarDropdown  {NAV_RIGHT}
//       └── dropdown content
