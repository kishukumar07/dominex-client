"use client";

import React from "react";
import NavLeft from "./NavLeft";
import NavRight from "./NavRight";
import { useState, useRef } from "react";
import HamburgerPanel from "./HamburgerPanel";
import AvatarDropdown from "./AvatarDropdown";

function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  return (
    <>
      <nav className="nav">
        <NavLeft onHamburgerClick={() => setSidebarOpen(true)} />
        <NavRight
          
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

      {/* Avatar dropdown */}
      {dropdownOpen && (
        <AvatarDropdown
         isOpen={dropdownOpen}
         onClose ={() => setDropdownOpen(false)} />
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
