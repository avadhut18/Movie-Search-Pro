import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getMovieDetails } from "../api/omdbApi";
import LoadingSpinner from "./LoadingSpinner";
import ErrorMessage from "./ErrorMessage";
import "./MovieDetails.css";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    setIsLoading(true);
    setError(null);
    setMovie(null);

    getMovieDetails(id, { signal: controller.signal })
      .then(setMovie)
      .catch((err) => {
        if (err.name === "AbortError") return;
        setError(err.message);
      })
      .finally(() => {
        if (!controller.signal.aborted) setIsLoading(false);
      });

    return () => controller.abort();
  }, [id]);

  return (
    <div className="movie-details">
      <Link to="/" className="movie-details__back">
        ← Back to search
      </Link>

      {isLoading && <LoadingSpinner label="Loading details…" />}
      {!isLoading && error && <ErrorMessage message={error} />}

      {!isLoading && movie && (
        <div className="movie-details__content">
          <img
            className="movie-details__poster"
            src={movie.Poster !== "N/A" ? movie.Poster : ""}
            alt={`${movie.Title} poster`}
          />
          <div className="movie-details__info">
            <h2 className="movie-details__title">
              {movie.Title} <span>({movie.Year})</span>
            </h2>
            {movie.imdbRating && movie.imdbRating !== "N/A" && (
              <p className="movie-details__rating">★ {movie.imdbRating} / 10</p>
            )}
            <dl className="movie-details__meta">
              <dt>Genre</dt>
              <dd>{movie.Genre}</dd>
              <dt>Director</dt>
              <dd>{movie.Director}</dd>
              <dt>Cast</dt>
              <dd>{movie.Actors}</dd>
              <dt>Runtime</dt>
              <dd>{movie.Runtime}</dd>
            </dl>
            <p className="movie-details__plot">{movie.Plot}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
