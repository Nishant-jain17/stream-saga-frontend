// src/pages/FavoritesPage.js
import React, { useContext } from "react";
import { FavoritesContext } from "../context/FavoritesContext";
import Card from "./Card";
import "./FavoritesPage.css";

function FavoritesPage() {
  const { favorites, removeFavorite } = useContext(FavoritesContext);

  return (
    <div className="favorites-page">
      <h2>⭐ Your Favorites</h2>
      {favorites.length === 0 ? (
        <p>No favorites added yet.</p>
      ) : (
        <div className="recommendation-list">
          {favorites.map((fav) => (
            <Card
              key={fav.id}
              title={fav.title}
              description={fav.description}
              rating={fav.rating}
              popularity={fav.popularity}
              releaseDate={fav.releaseDate}
              image_url={fav.image_url}
              url={fav.url}
              isFavorited={true}
              onFavoriteToggle={() => removeFavorite(fav.id)}
              hideFavoriteIcon={false}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default FavoritesPage;
