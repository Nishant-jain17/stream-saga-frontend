// src/components/Footer.js
import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>© {new Date().getFullYear()} STREAMSAGA. All rights reserved.</p>
        <nav className="footer-nav">
          <a
            href="https://github.com/Nishant-jain17"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
