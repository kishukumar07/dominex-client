import Link from "next/link";

function PanelItem({ icon, label, href, badge, onClick, external }) {
  return (
    <Link
      className="panel-item"
      onClick={onClick}
      href={href || "#"}
      target={external ? "_blank" : undefined}
    >
      {icon && <span className="panel-item-icon">{icon}</span>}
      <span className="panel-item-label"> {label}</span>
      {badge && <span className="panel-badge">{badge}</span>}
    </Link>
  );
}

export default PanelItem;

// PanelDefault and AvatarDropdown are different containers {  PanelItem -> PanelSection  are reusable }
//      └── PanelItem
//             └── reusable clickable row
