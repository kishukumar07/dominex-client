"use client";
import { useEffect, useRef } from "react";
import PanelSection from "./PanelSection";
import LogoutBtn from "./logoutBtn";
import { useAuthStore } from "@/store/auth";
import {
  User,
  BookMarked,
  Star,
  FileCode,
  Building2,
  Globe,
  Heart,
  Settings,
  Bot,
  Eye,
  Palette,
  Accessibility,
  Zap,
} from "lucide-react";

const section1 = [
  { icon: <User size={14} />, label: "Profile", href: "/main/profile" },
  {
    icon: <BookMarked size={14} />,
    label: "Repositories",
    href: "/main/repositories",
  },
  { icon: <Star size={14} />, label: "Stars", href: "/main/stars" },
  { icon: <FileCode size={14} />, label: "Gists", href: "/main/gists" },
  {
    icon: <Building2 size={14} />,
    label: "Organizations",
    href: "/main/organizations",
  },
  {
    icon: <Globe size={14} />,
    label: "Enterprises",
    href: "/main/enterprises",
  },
  { icon: <Heart size={14} />, label: "Sponsors", href: "/main/sponsors" },
];

const section2 = [
  { icon: <Settings size={14} />, label: "Settings", href: "/main/settings" },
  {
    icon: <Bot size={14} />,
    label: "Copilot settings",
    href: "/main/copilot-settings",
  },
  {
    icon: <Eye size={14} />,
    label: "Feature preview",
    href: "/main/preview",
    badge: "New",
  },
  {
    icon: <Palette size={14} />,
    label: "Appearance",
    href: "/main/appearance",
  },
  {
    icon: <Accessibility size={14} />,
    label: "Accessibility",
    href: "/main/accessibility",
  },
  {
    icon: <Zap size={14} />,
    label: "Try Enterprise",
    href: "/main/enterprise",
    badge: "Free",
  },
];

function AvatarDropdown({ onClose,isOpen }) {
  const { user } = useAuthStore();
  const ref = useRef();

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        onClose();
      }
    };
    if (isOpen) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen, onClose]);

  return (
    <div className="avatar-dropdown" ref={ref}>
      {/* Section 0 — user info */}
      <div className="dropdown-user">
        <div className="avatar" style={{ width: 36, height: 36, fontSize: 13 }}>
          KK
        </div>
        <div>
          <p className="font-semibold" style={{ fontSize: 13 }}>
            {user?.username || "kishukumar07"}
          </p>
          <p className="text-muted text-xs">{user?.name || "kishu kumar"}</p>
        </div>
      </div>
      <p className="text-muted" style={{ padding: "6px 14px", fontSize: 12 }}>
        Set status
      </p>

      <div className="panel-divider" />
      <PanelSection items={section1} onClose={onClose} />

      <div className="panel-divider" />
      <PanelSection items={section2} onClose={onClose} />

      <div className="panel-divider" />
      <div style={{ padding: "6px 8px" }}>
        <LogoutBtn />
      </div>
    </div>
  );
}

export default AvatarDropdown;

// AvatarDropdown
//  └── PanelSection

//       └── PanelItem
