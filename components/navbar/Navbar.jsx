"use client";
import React from "react";
import NavLeft from "./NavLeft";
// import NavCenter from "./NavCenter";
import NavRight from "./NavRight";

function Navbar() {
  return (
    <nav className="nav">
      <NavLeft />
      <NavRight />
    </nav>
  );
}

export default Navbar;
