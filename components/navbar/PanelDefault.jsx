import PanelSection from "./PanelSection";
import {
  Home,
  Compass,
  MessageSquare,
  Bot,
  ShoppingBag,
  GitBranch,
  Zap,
} from "lucide-react";

const sections = [
  [
    { icon: <Home size={16} />, label: "Home", href: "/main/feed" },
    { icon: <Compass size={16} />, label: "Explore", href: "/main/explore" },
    {
      icon: <MessageSquare size={16} />,
      label: "Discussions",
      href: "/main/discussions",
    },
    { icon: <Bot size={16} />, label: "Assistant", href: "/main/bot" },
  ],
  [
    {
      icon: <ShoppingBag size={16} />,
      label: "Marketplace",
      href: "/main/marketplace",
    },
    {
      icon: <GitBranch size={16} />,
      label: "Open Source",
      href: "https://github.com/kishukumar07",
      external: true,
    },
  ],
  [{ icon: <Zap size={16} />, label: "Pulse", href: "/main/pulse" }],
];

function PanelDefault({ onClose }) {
  return (
    <div className="panel-body">
      {sections.map((items, i) => (
        <div key={i}>
          <PanelSection items={items} onClose={onClose} />
          {i < sections.length - 1 && <div className="panel-divider" />}
        </div>
      ))}
    </div>
  );
}

export default PanelDefault;
