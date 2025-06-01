import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import GenreSelector from "./GenreSelector";
import Card from "./Card";
import "./RecommendationForm.css";
import { FavoritesContext } from "../context/FavoritesContext";

function RecommendationForm() {
  const [contentType, setContentType] = useState("anime");
  const [titles, setTitles] = useState("");
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [titleError, setTitleError] = useState("");
  const [sortBy, setSortBy] = useState("rating");
  const [sortOrder, setSortOrder] = useState("desc");
  const [favoriteMsg, setFavoriteMsg] = useState("");

  const { favorites, toggleFavorite } = useContext(FavoritesContext);

  useEffect(() => {
    const savedContentType = localStorage.getItem("contentType");
    const savedTitles = localStorage.getItem("titles");
    const savedGenres = localStorage.getItem("selectedGenres");
    const savedSortBy = localStorage.getItem("sortBy");
    const savedSortOrder = localStorage.getItem("sortOrder");

    if (savedContentType) setContentType(savedContentType);
    if (savedTitles) setTitles(savedTitles);
    if (savedGenres) setSelectedGenres(JSON.parse(savedGenres));
    if (savedSortBy) setSortBy(savedSortBy);
    if (savedSortOrder) setSortOrder(savedSortOrder);
  }, []);

  useEffect(() => {
    localStorage.setItem("contentType", contentType);
  }, [contentType]);

  useEffect(() => {
    localStorage.setItem("titles", titles);
  }, [titles]);

  useEffect(() => {
    localStorage.setItem("selectedGenres", JSON.stringify(selectedGenres));
  }, [selectedGenres]);

  useEffect(() => {
    localStorage.setItem("sortBy", sortBy);
  }, [sortBy]);

  useEffect(() => {
    localStorage.setItem("sortOrder", sortOrder);
  }, [sortOrder]);

  const handleTitleChange = (e) => {
    const value = e.target.value;
    setTitles(value);
    setTitleError(
      value.trim() === "" ? "Please enter at least one title." : ""
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (titles.trim() === "") {
      setTitleError("Please enter at least one title.");
      return;
    }

    setErrorMsg("");
    setLoading(true);
    setRecommendations([]);

    try {
      const titlesArray = titles.split(",").map((t) => t.trim());

      // Replace this with your deployed backend URL:
      const apiUrl = "https://stream-saga-backend.onrender.com/recommendations";

      // For local testing, uncomment this line and comment above:
      // const apiUrl = "http://localhost:8000/recommendations";

      const response = await axios.post(apiUrl, {
        content_type: contentType,
        titles: titlesArray,
        preferred_genres: selectedGenres,
      });

      let recs = response.data.recommendations || [];

      recs.sort((a, b) => {
        let valA = a[sortBy] ?? (sortBy === "release_date" ? "" : 0);
        let valB = b[sortBy] ?? (sortBy === "release_date" ? "" : 0);

        if (sortBy === "release_date") {
          valA = new Date(valA);
          valB = new Date(valB);
        }

        // Handle sort by string dates or numeric values
        if (valA < valB) return sortOrder === "asc" ? -1 : 1;
        if (valA > valB) return sortOrder === "asc" ? 1 : -1;
        return 0;
      });

      setRecommendations(recs);
    } catch (error) {
      console.error("Fetch error:", error);
      setErrorMsg("Error fetching recommendations. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setTitles("");
    setSelectedGenres([]);
    setRecommendations([]);
    setErrorMsg("");
    setTitleError("");
  };

  const handleToggleFavorite = (item) => {
    toggleFavorite(item);
    const added = !favorites.some((fav) => fav.title === item.title);
    setFavoriteMsg(
      added
        ? `"${item.title}" added to favorites!`
        : `"${item.title}" removed from favorites!`
    );
    setTimeout(() => setFavoriteMsg(""), 3000);
  };

  return (
    <div className="recommendation-form-card light-theme">
      <form onSubmit={handleSubmit} className="recommendation-form">
        <h2 className="form-heading">🎯 Personalized Recommendations</h2>

        <div className="form-section">
          <label>Content Type:</label>
          <select
            value={contentType}
            onChange={(e) => setContentType(e.target.value)}
          >
            <option value="anime">Anime</option>
            <option value="manga">Manga</option>
          </select>
        </div>

        <div className="form-section">
          <label>Enter Titles (comma separated):</label>
          <input
            type="text"
            value={titles}
            onChange={handleTitleChange}
            placeholder="e.g. Naruto, One Piece"
            className={titleError ? "input-error" : ""}
          />
          {titleError && <p className="error-msg">{titleError}</p>}
        </div>

        <div className="form-section">
          <GenreSelector
            contentType={contentType}
            selectedGenres={selectedGenres}
            onChange={setSelectedGenres}
          />
        </div>

        <div className="form-section">
          <label>Sort By:</label>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="rating">Rating</option>
            <option value="popularity">Popularity</option>
            <option value="release_date">Release Date</option>
          </select>

          <label>Sort Order:</label>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </div>

        <div className="button-row">
          <button type="submit" disabled={loading}>
            {loading ? "Loading..." : "Get Recommendations"}
          </button>
          <button
            type="button"
            onClick={handleClear}
            disabled={loading}
            className="clear-btn"
          >
            Clear
          </button>
        </div>

        {errorMsg && <p className="error-msg">{errorMsg}</p>}
      </form>

      {favoriteMsg && <div className="favorite-msg">{favoriteMsg}</div>}

      <div className="recommendation-list">
        {!loading && recommendations.length === 0 && !errorMsg && (
          <p>No recommendations yet.</p>
        )}

        {recommendations.length > 0 &&
          recommendations.map((rec, index) => (
            <Card
              key={index}
              title={rec.title}
              description={rec.overview}
              rating={rec.rating ?? rec.score}
              popularity={rec.popularity}
              releaseDate={rec.release_date}
              image_url={rec.image_url}
              url={rec.url}
              isFavorited={favorites.some((fav) => fav.title === rec.title)}
              onFavoriteToggle={() => handleToggleFavorite(rec)}
            />
          ))}
      </div>
    </div>
  );
}

export default RecommendationForm;
