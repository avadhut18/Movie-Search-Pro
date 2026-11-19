import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";
import MovieList from "./components/MovieList";
import MovieDetails from "./components/MovieDetails";
import useMovieSearch from "./hooks/useMovieSearch";
import "./App.css";

function SearchPage() {
  const [query, setQuery] = useState("");
  const { movies, status, error } = useMovieSearch(query);

  return (
    <>
      <section className="hero">
        <h1 className="hero__title">Find your next watch</h1>
        <p className="hero__subtitle">
          Search live movie data from the OMDb API.
        </p>
        <SearchBar value={query} onChange={setQuery} />
      </section>
      <MovieList movies={movies} status={status} error={error} />
    </>
  );
}

function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
