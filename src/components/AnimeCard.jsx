import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AnimeCard.css';

const AnimeCard = ({ anime }) => {
  const navigate = useNavigate();

  // Construct a fake price, just to emulate an e-commerce style
  const fakePrice = `$${(anime.score || 7.5) * 2}.00`;

  // Button handler
  const handleDetails = (e) => {
    e.stopPropagation(); // Prevent any parent onClick (if any) from firing
    navigate(`/anime/${anime.mal_id}`);
  };

  const imageUrl =
    anime.images?.jpg?.large_image_url ||
    'https://via.placeholder.com/200x320.png?text=No+Image';

  return (
    <article className="anime-card">
      <div className="anime-card__image-container">
        <img
          src={imageUrl}
          alt={anime.title}
          className="anime-card__image"
          loading="lazy"
        />
        <div className="anime-card__overlay">
          <h3 className="anime-card__title">{anime.title}</h3>
          <div className="anime-card__info-row">
            <span>★ {anime.score || 'N/A'}</span>
            <span>{fakePrice}</span>
          </div>
        </div>
      </div>

      <div className="anime-card__body">
        <p className="anime-card__synopsis">
          {anime.synopsis
            ? anime.synopsis.slice(0, 80) + '...'
            : 'No synopsis available.'}
        </p>
        {/* The button that navigates to /anime/:id */}
        <button className="anime-card__button" onClick={handleDetails}>
          View Details
        </button>
      </div>
    </article>
  );
};

export default AnimeCard;
