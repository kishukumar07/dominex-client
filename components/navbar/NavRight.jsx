import React from "react";
import ButtonGroup from "./ButtonGroup";
import ActionIcon from "./ActionIcon";
import AvatarButton from "./AvatarButton";
import SearchBox from "./SearchBox";
import {
  Bot,
  Plus,
  ChevronDown,
  LayoutGrid,
  Languages,
  Activity,
  Bell,
} from "lucide-react";

function NavRight() {
 

  return (
    <div className="nav-right">
   
        <SearchBox />
        <ButtonGroup>
          <ActionIcon icon={<Bot />} title="AI Assistant" />
          <ActionIcon icon={<ChevronDown />} title="AI Options" />
        </ButtonGroup>
     

      <ButtonGroup>
        <ActionIcon icon={<Plus />} title="Crete new..." />{" "}
        <ActionIcon icon={<ChevronDown />} title="Create options" />{" "}
      </ButtonGroup>
      <div className="nav-divider"></div>
      <ActionIcon icon={<LayoutGrid />} title="Install App" />
      <ActionIcon icon={<Languages />} title="Language" />
      <ActionIcon icon={<Activity />} title="Notifications" />

      <div className="nav-divider"></div>
      <ActionIcon icon={<Bell />} title="Open user navigation Menu" />
      <AvatarButton />
    </div>
  );
}

export default NavRight;
