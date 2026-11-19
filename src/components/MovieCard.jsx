import React from "react";
import { Link } from "react-router-dom";
import "./MovieCard.css";

const FALLBACK_POSTER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='445' viewBox='0 0 300 445'%3E%3Crect width='300' height='445' fill='%231c1815'/%3E%3Ctext x='50%25' y='50%25' fill='%23a89e91' font-family='sans-serif' font-size='16' text-anchor='middle' dy='.3em'%3ENo poster%3C/text%3E%3C/svg%3E";

const MovieCard = ({ movie }) => {
  const posterSrc = movie.Poster !== "N/A" ? movie.Poster : FALLBACK_POSTER;

  return (
    <Link to={`/movie/${movie.imdbID}`} className="movie-card">
      <div className="movie-card__poster-wrap">
        <img
          className="movie-card__poster"
          src={posterSrc}
          alt={`${movie.Title} poster`}
          loading="lazy"
        />
      </div>
      <div className="movie-card__stub">
        <h3 className="movie-card__title">{movie.Title}</h3>
        <span className="movie-card__year">{movie.Year}</span>
      </div>
    </Link>
  );
};

export default MovieCard;
