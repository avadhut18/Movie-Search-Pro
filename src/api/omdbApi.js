const BASE_URL = "https://www.omdbapi.com/";
const API_KEY = process.env.REACT_APP_OMDB_API_KEY;

export class OmdbError extends Error {}

function assertApiKey() {
  if (!API_KEY) {
    throw new OmdbError(
      "No API key found. Copy .env.example to .env and add your OMDb key."
    );
  }
}

/**
 * Search movies by title.
 * @param {string} query
 * @param {{ signal?: AbortSignal }} options
 * @returns {Promise<Array>}
 */
export async function searchMovies(query, { signal } = {}) {
  assertApiKey();

  const url = `${BASE_URL}?apikey=${API_KEY}&type=movie&s=${encodeURIComponent(
    query
  )}`;

  let response;
  try {
    response = await fetch(url, { signal });
  } catch (err) {
    if (err.name === "AbortError") throw err;
    throw new OmdbError("Couldn't reach OMDb. Check your connection and try again.");
  }

  if (!response.ok) {
    throw new OmdbError(`OMDb request failed (status ${response.status}).`);
  }

  const data = await response.json();

  if (data.Response === "False") {
    // OMDb returns "Movie not found!" as a normal, expected outcome.
    throw new OmdbError(data.Error || "No movies found.");
  }

  return data.Search;
}

/**
 * Fetch full details for a single movie by IMDb ID.
 * @param {string} imdbID
 * @param {{ signal?: AbortSignal }} options
 * @returns {Promise<Object>}
 */
export async function getMovieDetails(imdbID, { signal } = {}) {
  assertApiKey();

  const url = `${BASE_URL}?apikey=${API_KEY}&i=${encodeURIComponent(
    imdbID
  )}&plot=full`;

  let response;
  try {
    response = await fetch(url, { signal });
  } catch (err) {
    if (err.name === "AbortError") throw err;
    throw new OmdbError("Couldn't reach OMDb. Check your connection and try again.");
  }

  if (!response.ok) {
    throw new OmdbError(`OMDb request failed (status ${response.status}).`);
  }

  const data = await response.json();

  if (data.Response === "False") {
    throw new OmdbError(data.Error || "Movie not found.");
  }

  return data;
}
