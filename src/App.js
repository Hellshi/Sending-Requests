import React, { useState, useEffect, useCallback } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const FetchMovies = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("https://swapi.dev/api/films/");
      const data = await response.json();

      if (!response.ok) {
        console.log(response.ok);
        throw new Error("Something went Wrong!");
      }

      const TransformedMovies = data.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseData: movieData.release_date,
        };
      });
      setMovies(TransformedMovies);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    FetchMovies();
  }, [FetchMovies]);

  return (
    <React.Fragment>
      <section>
        <button onClick={FetchMovies}>Fetch Movies</button>
      </section>
      <section>
        {!loading && movies.length > 0 && <MoviesList movies={movies} />}
        {!loading && movies.length === 0 && !error && <p>No Movies Found</p>}
        {!loading && error && <p>{error}</p>}
        {loading && <p>Loading...</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
