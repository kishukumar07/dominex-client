function ActionIcon({ icon, onClick, title, className = "nav-btn" }) {
  return (
    <button onClick={onClick} title={title} className={`${className}`}>
      {icon}
    </button>
  );
}

export default ActionIcon;
