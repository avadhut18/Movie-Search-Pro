# AV — Movie Search

A responsive movie search app built with React, using live data from the [OMDb API](https://www.omdbapi.com/).

## Features

- **Debounced, live search** — results update automatically as you type (400ms debounce), no submit button needed.
- **Request cancellation** — if you type a new query before the previous search finishes, the stale request is aborted via `AbortController` so a slow, outdated response can never overwrite newer results.
- **Explicit loading / error / empty states** — every async state (idle, loading, error, no results, success) is handled and shown distinctly, instead of guessing from booleans.
- **Movie detail view** — client-side routed detail page (`react-router-dom`) with its own independent loading/error handling.
- **Reusable, prop-driven components** — `SearchBar`, `MovieCard`, `MovieList`, `MovieDetails` all take data via props and contain no hidden shared state.
- **Responsive layout** — CSS grid with `auto-fill`/`minmax` for the results grid, and a stacked layout on the detail page below 720px.
- **No hardcoded secrets** — the OMDb API key is read from an environment variable, never committed to source control.

## Getting started

1. Get a free OMDb API key: https://www.omdbapi.com/apikey.aspx
2. Copy the env file and add your key:
   ```bash
   cp .env.example .env
   # then edit .env and paste your key
   ```
3. Install dependencies and run:
   ```bash
   npm install
   npm start
   ```
4. Open http://localhost:3000

## Project structure

```
src/
  api/omdbApi.js        # fetch logic + error normalization, isolated from components
  hooks/
    useDebounce.js       # generic debounce hook
    useMovieSearch.js    # debounced search + cancellation + status tracking
  components/
    SearchBar.jsx
    MovieList.jsx
    MovieCard.jsx
    MovieDetails.jsx
    LoadingSpinner.jsx
    ErrorMessage.jsx
    Header.jsx / Footer.jsx
```

## Why it's built this way

The search logic lives in a custom hook (`useMovieSearch`) rather than inside a component, so the UI components stay simple and the async/debounce/cancellation logic can be tested or reused independently of any particular input element.

## Possible next steps

- Add pagination (OMDb returns 10 results per page via the `page` param).
- Add a "favorites" list persisted to `localStorage`.
- Add filtering by year or type (movie/series/episode).
