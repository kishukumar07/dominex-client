import React from "react";
import SearchBox from "./SearchBox";
import ButtonGroup from "./ButtonGroup";
import ActionIcon from "./ActionIcon";
import { Bot, ChevronDown } from "lucide-react";

function NavCenter() {
  return (
    <div className="nav-center">
      <SearchBox />
      <ButtonGroup>
        <ActionIcon icon={<Bot />} title="AI Assistant" />
        <ActionIcon icon={<ChevronDown />} title="AI Options" />
      </ButtonGroup>
    </div>
  );
}

export default NavCenter;
