"use client";
import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import PanelDefault from "./PanelDefault";

function HamburgerPanel({ isOpen, onClose }) {
  const panelRef = useRef();

  useEffect(() => {
    const handler = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        onClose();
      }
    };
    if (isOpen) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      <div className="panel-overlay" onClick={onClose} />
      <div className="hamburger-panel" ref={panelRef}>
        <div className="panel-header">
          <span className="brand" style={{ margin: 0 }}>
            Dominex
          </span>
          <button className="nav-btn" onClick={onClose} title="Close">
            <X size={18} />
          </button>
        </div>
        <PanelDefault onClose={onClose} />
      </div>
    </>
  );
}

export default HamburgerPanel;
// HamburgerPanel
//  └── PanelDefault
//       └── PanelSection
//            └── PanelItem
