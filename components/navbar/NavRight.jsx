import React from "react";
import ButtonGroup from "./ButtonGroup";
import ActionIcon from "./ActionIcon";
import AvatarButton from "./AvatarButton";

import {
  Plus,
  ChevronDown,
  LayoutGrid ,
  Languages,
  Activity,
  Bell,
} from "lucide-react";

function NavRight() {
  // Usage ...
  // ButtonGroup
  // ActionIcon
  // AvatarButton

  return (
    <div className="nav-right">
      <ButtonGroup>
        <ActionIcon icon={<Plus />} title="Open Menu" />{" "}
        <ActionIcon icon={<ChevronDown />} title="Open Menu" />{" "}
      </ButtonGroup>
      <div className="nav-divider"></div>
      <ActionIcon icon={<LayoutGrid  />} title="Open Menu" />
      <ActionIcon icon={<Languages />} title="Open Menu" />
      <ActionIcon icon={<Activity />} title="Open Menu" />

      <div className="nav-divider"></div>
      <ActionIcon icon={<Bell />} title="Open Menu" />
      <AvatarButton />
    </div>
  );
}

export default NavRight;
