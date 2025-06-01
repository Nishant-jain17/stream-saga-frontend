import React from "react";
import { Link } from "react-router-dom";
import "./header.css";

const Header = ({ theme, toggleTheme, toggleSidebar }) => {
  return (
    <header className="header">
      <div className="logo-container">
        <h1 className="logo">
          <Link to="/" className="logo-link">
            StreamSaga
          </Link>
        </h1>
      </div>

      {/* Hamburger toggle - visible only on mobile */}
      <button
        className="sidebar-toggle"
        onClick={toggleSidebar}
        aria-label="Toggle sidebar menu"
        title="Toggle sidebar menu"
      >
        ☰
      </button>

      {/* Theme toggle button */}
      <button
        className="theme-toggle-btn"
        onClick={toggleTheme}
        aria-label="Toggle dark/light theme"
        title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      >
        {theme === "dark" ? "🌞" : "🌙"}
      </button>
    </header>
  );
};

export default Header;
