import React, { createContext, useContext, useState, useEffect } from "react";

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (item) => {
    setFavorites((prevFavorites) => {
      const isAlreadyFavorite = prevFavorites.some((fav) => fav.id === item.id);

      if (isAlreadyFavorite) {
        return prevFavorites.filter((fav) => fav.id !== item.id);
      } else {
        return [...prevFavorites, item];
      }
    });
  };

  const isFavorite = (id) => {
    return favorites.some((fav) => fav.id === id);
  };

  const removeFavorite = (idOrTitle) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter(
        (fav) => fav.id !== idOrTitle && fav.title !== idOrTitle
      )
    );
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, toggleFavorite, isFavorite, removeFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
