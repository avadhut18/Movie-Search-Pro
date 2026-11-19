import React from "react";
import MovieCard from "./MovieCard";
import LoadingSpinner from "./LoadingSpinner";
import ErrorMessage from "./ErrorMessage";
import { STATUS } from "../hooks/useMovieSearch";
import "./MovieList.css";

const MovieList = ({ movies, status, error }) => {
  if (status === STATUS.LOADING) {
    return <LoadingSpinner label="Searching…" />;
  }

  if (status === STATUS.ERROR) {
    return <ErrorMessage message={error} />;
  }

  if (status === STATUS.IDLE) {
    return (
      <p className="movie-list__hint">Start typing to search thousands of titles.</p>
    );
  }

  if (movies.length === 0) {
    return <p className="movie-list__hint">No movies matched that search.</p>;
  }

  return (
    <div className="movie-list">
      {movies.map((movie) => (
        <MovieCard key={movie.imdbID} movie={movie} />
      ))}
    </div>
  );
};

export default MovieList;
