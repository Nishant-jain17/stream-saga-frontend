import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import Card from "./components/Card";
import RecommendationForm from "./components/RecommendationForm";
import FavoritesPage from "./components/FavoritesPage";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";

import "./App.css";

const Dashboard = () => (
  <div className="page">
    <h1 className="heading-medium">Dashboard</h1>
    <p className="subtext">Explore recommended content.</p>

    <div className="card-grid">
      <Card title="Top Picks" description="Anime and manga recommendations." />
      <Card title="Trending" description="Most watched content this week." />
    </div>
  </div>
);

const RecommendationsPage = ({ favorites, toggleFavorite }) => (
  <div className="page">
    <RecommendationForm favorites={favorites} toggleFavorite={toggleFavorite} />
  </div>
);

function App() {
  // Load theme from localStorage or default to light
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  // Sidebar open state for mobile menu
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  return (
    <div className={`app-container ${theme}-theme`}>
      <Header
        theme={theme}
        toggleTheme={toggleTheme}
        toggleSidebar={toggleSidebar}
      />
      <div className="main-layout">
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        <main
          className="main-content"
          onClick={() => {
            if (sidebarOpen) setSidebarOpen(false); // close sidebar if open when clicking main content
          }}
        >
          <Routes>
            <Route
              path="/"
              element={
                <Home favorites={favorites} toggleFavorite={toggleFavorite} />
              }
            />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route
              path="/recommendations"
              element={
                <RecommendationsPage
                  favorites={favorites}
                  toggleFavorite={toggleFavorite}
                />
              }
            />
            <Route
              path="/favorites"
              element={
                <FavoritesPage
                  favorites={favorites}
                  toggleFavorite={toggleFavorite}
                />
              }
            />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default App;
