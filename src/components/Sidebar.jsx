import "../styles/Sidebar.css";
function Sidebar({ activeSection, setActiveSection }) {
  const menuItems = [
    {
      id: "home",
      label: "Home",
      icon: "⌂",
    },
    {
      id: "post-analysis",
      label: "Post Analysis",
      icon: "▣",
    },
    {
      id: "content-analysis",
      label: "Content Analysis",
      icon: "◫",
    },
    {
      id: "ai-insights",
      label: "AI Insights",
      icon: "✦",
    },
    {
      id: "reports",
      label: "Reports",
      icon: "▤",
    },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-icon">◎</div>

        <div>
          <h2>Insta<span>lytics</span></h2>
          <p>AI ANALYTICS</p>
        </div>
      </div>

      <nav className="sidebar-nav">
        <p className="sidebar-title">MAIN MENU</p>

        {menuItems.map((item) => (
          <button
            key={item.id}
            className={`sidebar-item ${
              activeSection === item.id ? "active" : ""
            }`}
            onClick={() => setActiveSection(item.id)}
          >
            <span className="sidebar-item-icon">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="ai-status">
          <span className="status-dot"></span>

          <div>
            <strong>AI Engine</strong>
            <small>Ready for analysis</small>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;