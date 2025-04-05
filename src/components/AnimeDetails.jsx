import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './AnimeDetails.css';

const AnimeDetails = () => {
  const { id } = useParams();        // we get :id from the URL
  const navigate = useNavigate();     // if we want a back button or something
  const [anime, setAnime] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch single anime data by ID
  useEffect(() => {
    const fetchAnime = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
        if (!res.ok) throw new Error('Failed to fetch anime details.');
        const data = await res.json();
        setAnime(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAnime();
  }, [id]);

  // Loading / Error states
  if (isLoading) {
    return (
      <div className="anime-details__loading">
        <div className="loader"></div>
        <p>Loading anime details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="anime-details__error">
        <h2>Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (!anime) {
    return <p>Anime not found.</p>;
  }

  // Render details
  return (
    <div className="anime-details__container">
      <div className="anime-details__header">
        <h1 className="anime-details__title">{anime.title}</h1>
        <button className="anime-details__button" onClick={() => navigate(-1)}>
          ← Go Back
        </button>
      </div>

      <div className="anime-details__main">
        <div className="anime-details__image-box">
          <img
            src={anime.images?.jpg?.large_image_url}
            alt={anime.title}
            className="anime-details__image"
          />
        </div>
        <div className="anime-details__info">
          <p>
            <strong>Score:</strong> {anime.score || 'N/A'}
          </p>
          <p>
            <strong>Year:</strong> {anime.year || 'Unknown'}
          </p>
          <p>
            <strong>Rating:</strong> {anime.rating || 'N/A'}
          </p>
          <p>
            <strong>Episodes:</strong> {anime.episodes || 'N/A'}
          </p>
          <p>
            <strong>Type:</strong> {anime.type || 'N/A'}
          </p>
        </div>
      </div>

      {anime.synopsis && (
        <div className="anime-details__synopsis">
          <h2>Synopsis</h2>
          <p>{anime.synopsis}</p>
        </div>
      )}
    </div>
  );
};

export default AnimeDetails;
