import React from "react";
import { Menu } from "lucide-react";
import ActionIcon from "./ActionIcon";
import Image from "next/image";

function NavLeft({onHamburgerClick}) {
  return (
    <div className="nav-left">
      <ActionIcon icon={<Menu />} title="Open Menu" onClick={onHamburgerClick} />
      <Image src="/logo.png" alt="Dominex Logo" width={28} height={28} />
      <span className="nav-title">Dashboard</span>
    </div>
  );
}

export default NavLeft;
