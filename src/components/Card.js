import React from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import "./Card.css";

const Card = ({
  title,
  description,
  rating,
  popularity,
  releaseDate,
  image_url,
  url,
  isFavorited,
  onFavoriteToggle,
}) => {
  return (
    <div className="card" title={title}>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="card-link"
      >
        <div className="card-image-wrapper">
          {image_url ? (
            <img src={image_url} alt={title} className="card-image" />
          ) : (
            <div className="card-image-placeholder">No Image</div>
          )}
        </div>
      </a>

      <div className="card-content">
        <h3 className="card-title">{title}</h3>

        {rating !== null && rating !== undefined && (
          <p className="card-rating">⭐ {rating.toFixed(1)}</p>
        )}
        {popularity !== null && popularity !== undefined && (
          <p className="card-popularity">Popularity: {popularity}</p>
        )}
        {releaseDate && (
          <p className="card-release-date">
            Released: {new Date(releaseDate).toLocaleDateString()}
          </p>
        )}
        {description && (
          <p className="card-description">{description.slice(0, 120)}...</p>
        )}

        {onFavoriteToggle && (
          <button
            className={`favorite-btn ${isFavorited ? "favorited" : ""}`}
            onClick={(e) => {
              e.preventDefault();
              onFavoriteToggle();
            }}
            aria-label={
              isFavorited ? "Remove from favorites" : "Add to favorites"
            }
          >
            {isFavorited ? <FaHeart /> : <FaRegHeart />}
          </button>
        )}
      </div>
    </div>
  );
};

export default Card;
