// src/components/AnimeList.js
import React, { useState, useEffect } from 'react';
import AnimeCard from './AnimeCard';
import './AnimeList.css'; // Our custom stylesheet

const AnimeList = () => {
  const [animeData, setAnimeData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAnime, setSelectedAnime] = useState(null);

  useEffect(() => {
    const fetchAnimeData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('https://api.jikan.moe/v4/anime');
        if (!response.ok) throw new Error('Server response error');
        const data = await response.json();
        setAnimeData(data.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    // Slight delay to simulate loading
    const timer = setTimeout(fetchAnimeData, 500);
    return () => clearTimeout(timer);
  }, []);

  // Loading State
  if (isLoading) {
    return (
      <div className="anime-list-loading-wrapper">
        <div className="anime-list-loading-container">
          <div className="anime-list-loader"></div>
          <p className="anime-list-loading-text">Loading Anime Magic...</p>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="anime-list-error-wrapper">
        <div className="anime-list-error-box">
          <div className="anime-list-error-icon">⚠️</div>
          <h3 className="anime-list-error-title">Oops! Something went wrong</h3>
          <p className="anime-list-error-message">{error}</p>
        </div>
      </div>
    );
  }

  // Main Content
  return (
    <main className="anime-list-main">
      {/* Anime Grid */}
      <div className="anime-list-grid">
        {animeData.map((anime) => (
          <AnimeCard
            key={anime.mal_id}
            anime={anime}
            onClick={() => setSelectedAnime(anime)}
          />
        ))}
      </div>

      {/* Detail Modal */}
      {selectedAnime && (
        <div className="anime-list-modal-backdrop">
          <div className="anime-list-modal">
            <div className="anime-list-modal-image-container">
              <img
                src={selectedAnime.images?.jpg?.large_image_url}
                alt={selectedAnime.title}
                className="anime-list-modal-image"
              />
              <button
                onClick={() => setSelectedAnime(null)}
                className="anime-list-modal-close-button"
              >
                ✕
              </button>
            </div>

            <div className="anime-list-modal-content">
              <h2 className="anime-list-modal-title">{selectedAnime.title}</h2>
              <p className="anime-list-modal-subtitle">Quick View — (E-commerce style)</p>

              <div className="anime-list-modal-tags">
                <div className="modal-tag modal-tag-score">
                  ★ {selectedAnime.score || 'N/A'}
                </div>
                <div className="modal-tag modal-tag-year">
                  🗓 {selectedAnime.year || 'Unknown'}
                </div>
                <div className="modal-tag modal-tag-rating">
                  {selectedAnime.rating?.split(' - ')[0] || 'Unknown'}
                </div>
              </div>

              {selectedAnime.synopsis && (
                <div className="anime-list-modal-synopsis">
                  <h3 className="anime-list-modal-synopsis-title">Story</h3>
                  <p>{selectedAnime.synopsis}</p>
                </div>
              )}

              <div className="anime-list-modal-footer">
                <span className="anime-list-modal-price">
                  ${(selectedAnime.score || 7.5) * 2}.00
                </span>
                <button className="anime-list-modal-cart-button">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default AnimeList;
