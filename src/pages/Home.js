import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import { FavoritesContext } from "../context/FavoritesContext";
import "./Home.css";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));
const PAGE_SIZE = 12;

const Home = () => {
  const navigate = useNavigate();
  const { toggleFavorite, isFavorite } = useContext(FavoritesContext);

  const [trendingAnime, setTrendingAnime] = useState([]);
  const [trendingAnimePage, setTrendingAnimePage] = useState(1);
  const [trendingAnimeShowMore, setTrendingAnimeShowMore] = useState(false);
  const [trendingAnimeLoading, setTrendingAnimeLoading] = useState(false);
  const [trendingAnimeHasMore, setTrendingAnimeHasMore] = useState(true);

  const [trendingManga, setTrendingManga] = useState([]);
  const [trendingMangaPage, setTrendingMangaPage] = useState(1);
  const [trendingMangaShowMore, setTrendingMangaShowMore] = useState(false);
  const [trendingMangaLoading, setTrendingMangaLoading] = useState(false);
  const [trendingMangaHasMore, setTrendingMangaHasMore] = useState(true);

  const [initialLoading, setInitialLoading] = useState(true);

  const fetchTrendingAnime = async (page = 1) => {
    setTrendingAnimeLoading(true);
    try {
      const res = await fetch(
        `https://api.jikan.moe/v4/top/anime?filter=bypopularity&page=${page}`
      );
      await delay(1000);
      const data = await res.json();
      if (page === 1) setTrendingAnime(data.data);
      else setTrendingAnime((prev) => [...prev, ...data.data]);

      setTrendingAnimeHasMore(data.pagination?.has_next_page !== false);
    } catch (err) {
      console.error("Failed fetching trending anime:", err);
      setTrendingAnimeHasMore(false);
    } finally {
      setTrendingAnimeLoading(false);
    }
  };

  const fetchTrendingManga = async (page = 1) => {
    setTrendingMangaLoading(true);
    try {
      const res = await fetch(
        `https://api.jikan.moe/v4/top/manga?filter=bypopularity&page=${page}`
      );
      await delay(1000);
      const data = await res.json();
      if (page === 1) setTrendingManga(data.data);
      else setTrendingManga((prev) => [...prev, ...data.data]);

      setTrendingMangaHasMore(data.pagination?.has_next_page !== false);
    } catch (err) {
      console.error("Failed fetching trending manga:", err);
      setTrendingMangaHasMore(false);
    } finally {
      setTrendingMangaLoading(false);
    }
  };

  useEffect(() => {
    const fetchInitial = async () => {
      setInitialLoading(true);
      await fetchTrendingAnime(1);
      await fetchTrendingManga(1);
      setInitialLoading(false);
    };
    fetchInitial();
  }, []);

  const handleCTA = () => navigate("/recommendations");

  const renderCard = (item) => (
    <Card
      key={item.mal_id}
      title={item.title}
      description={item.synopsis}
      rating={item.score}
      popularity={item.popularity}
      releaseDate={item.aired?.from || item.published?.from}
      image_url={item.images?.jpg?.image_url}
      url={item.url}
      isFavorited={isFavorite(item.mal_id)}
      onFavoriteToggle={() =>
        toggleFavorite({
          id: item.mal_id,
          title: item.title,
          description: item.synopsis,
          rating: item.score,
          popularity: item.popularity,
          releaseDate: item.aired?.from || item.published?.from,
          image_url: item.images?.jpg?.image_url,
          url: item.url,
        })
      }
    />
  );

  return (
    <div className="page home-page">
      <h1 className="heading-large green">Welcome to STREAMSAGA</h1>
      <p className="subtext">Your personal media recommendation system.</p>

      <button className="cta-button" onClick={handleCTA}>
        🎯 Let’s Get Some Recommendations
      </button>

      {initialLoading ? (
        <p>Loading trending content...</p>
      ) : (
        <>
          <h2 className="section-heading">🔥 Trending Anime</h2>
          <div className="home-preview-grid">
            {(trendingAnimeShowMore
              ? trendingAnime
              : trendingAnime.slice(0, PAGE_SIZE)
            ).map(renderCard)}
          </div>
          {!trendingAnimeShowMore && trendingAnime.length > PAGE_SIZE && (
            <button
              className="show-more-btn"
              onClick={() => setTrendingAnimeShowMore(true)}
            >
              Show More Trending Anime
            </button>
          )}
          {trendingAnimeShowMore &&
            trendingAnimeHasMore &&
            !trendingAnimeLoading && (
              <button
                className="load-more-btn"
                onClick={() => {
                  const nextPage = trendingAnimePage + 1;
                  setTrendingAnimePage(nextPage);
                  fetchTrendingAnime(nextPage);
                }}
              >
                Load More Trending Anime
              </button>
            )}
          {trendingAnimeLoading && <p>Loading more trending anime...</p>}

          <h2 className="section-heading">📚 Trending Manga</h2>
          <div className="home-preview-grid">
            {(trendingMangaShowMore
              ? trendingManga
              : trendingManga.slice(0, PAGE_SIZE)
            ).map(renderCard)}
          </div>
          {!trendingMangaShowMore && trendingManga.length > PAGE_SIZE && (
            <button
              className="show-more-btn"
              onClick={() => setTrendingMangaShowMore(true)}
            >
              Show More Trending Manga
            </button>
          )}
          {trendingMangaShowMore &&
            trendingMangaHasMore &&
            !trendingMangaLoading && (
              <button
                className="load-more-btn"
                onClick={() => {
                  const nextPage = trendingMangaPage + 1;
                  setTrendingMangaPage(nextPage);
                  fetchTrendingManga(nextPage);
                }}
              >
                Load More Trending Manga
              </button>
            )}
          {trendingMangaLoading && <p>Loading more trending manga...</p>}
        </>
      )}
    </div>
  );
};

export default Home;
