import { useEffect, useState } from "react";
import "./GenreSelector.css";

const animeGenres = [
  { id: 1, name: "Action" },
  { id: 2, name: "Adventure" },
  { id: 3, name: "Comedy" },
  { id: 4, name: "Drama" },
  { id: 5, name: "Fantasy" },
  { id: 6, name: "Horror" },
  { id: 7, name: "Mecha" },
  { id: 8, name: "Mystery" },
  { id: 9, name: "Psychological" },
  { id: 10, name: "Romance" },
  { id: 11, name: "Sci-Fi" },
  { id: 12, name: "Slice of Life" },
  { id: 13, name: "Sports" },
  { id: 14, name: "Supernatural" },
];

const mangaGenres = [
  { id: 1, name: "Action" },
  { id: 2, name: "Adventure" },
  { id: 3, name: "Comedy" },
  { id: 4, name: "Drama" },
  { id: 5, name: "Fantasy" },
  { id: 6, name: "Horror" },
  { id: 7, name: "Mystery" },
  { id: 8, name: "Romance" },
  { id: 9, name: "Sci-Fi" },
  { id: 10, name: "Slice of Life" },
  { id: 11, name: "Supernatural" },
];

function GenreSelector({ contentType, selectedGenres, onChange }) {
  const [availableGenres, setAvailableGenres] = useState([]);

  useEffect(() => {
    if (contentType === "anime") {
      setAvailableGenres(animeGenres);
    } else if (contentType === "manga") {
      setAvailableGenres(mangaGenres);
    } else {
      setAvailableGenres([]);
    }
  }, [contentType]);

  const toggleGenre = (id) => {
    if (selectedGenres.includes(id)) {
      onChange(selectedGenres.filter((g) => g !== id));
    } else {
      onChange([...selectedGenres, id]);
    }
  };

  return (
    <div className="genre-selector">
      <label>Choose Genres:</label>
      <div className="genre-list">
        {availableGenres.map((genre) => (
          <button
            type="button"
            key={genre.id}
            className={
              selectedGenres.includes(genre.id)
                ? "genre-btn selected"
                : "genre-btn"
            }
            onClick={() => toggleGenre(genre.id)}
          >
            {genre.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default GenreSelector;
