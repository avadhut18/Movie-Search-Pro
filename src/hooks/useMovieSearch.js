import { useEffect, useRef, useState } from "react";
import { searchMovies } from "../api/omdbApi";
import useDebounce from "./useDebounce";

// Status is explicit rather than inferred from booleans, so the UI
// never has to guess what "loading: false, movies: []" means.
export const STATUS = {
  IDLE: "idle",
  LOADING: "loading",
  SUCCESS: "success",
  ERROR: "error",
};

/**
 * Debounces the raw input, fires a search after the user pauses typing,
 * and cancels any in-flight request if a newer one starts first
 * (prevents an old, slow response from overwriting a newer result).
 */
export default function useMovieSearch(rawQuery, delay = 400) {
  const [movies, setMovies] = useState([]);
  const [status, setStatus] = useState(STATUS.IDLE);
  const [error, setError] = useState(null);

  const debouncedQuery = useDebounce(rawQuery, delay);
  const abortControllerRef = useRef(null);

  useEffect(() => {
    const trimmed = debouncedQuery.trim();

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    if (!trimmed) {
      setMovies([]);
      setStatus(STATUS.IDLE);
      setError(null);
      return;
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;

    setStatus(STATUS.LOADING);
    setError(null);

    searchMovies(trimmed, { signal: controller.signal })
      .then((results) => {
        setMovies(results);
        setStatus(STATUS.SUCCESS);
      })
      .catch((err) => {
        if (err.name === "AbortError") return; // superseded by a newer search
        setMovies([]);
        setStatus(STATUS.ERROR);
        setError(err.message);
      });

    return () => controller.abort();
  }, [debouncedQuery]);

  return { movies, status, error };
}
