import PanelItem from "./PanelItem";

function PanelSection({ items = [], onClose }) {
  return (
    <div className="panel-section">
      {items.map((item) => (
        <PanelItem key={item.label} {...item} onClick={onClose} />
      ))}
    </div>
  );
}

export default PanelSection;

// PanelSection
//  └── PanelSection = grouped container for PanelItems
{
  /* <PanelSection>
  <PanelItem icon={<User />} label="Profile" />
  <PanelItem icon={<Bookmark />} label="Saved" />
  <PanelItem icon={<Settings />} label="Settings" />
</PanelSection> */
}
