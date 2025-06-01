import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const navItems = [
    { path: "/", label: "Home" },
    { path: "/recommendations", label: "Recommendations" },
    { path: "/favorites", label: "Favorites" },
  ];

  return (
    <nav className={`sidebar ${isOpen ? "open" : ""}`}>
      <ul className="sidebar-nav">
        {navItems.map(({ path, label }) => (
          <li key={path}>
            <NavLink
              to={path}
              className={({ isActive }) =>
                isActive ? "sidebar-link active" : "sidebar-link"
              }
              onClick={() => {
                if (isOpen) toggleSidebar();
              }}
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Sidebar;
