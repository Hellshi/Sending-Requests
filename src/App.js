import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setIsLoading] = useState(false);

  const FetchMovies = async () => {
    setIsLoading(true);
    const response = await fetch("https://swapi.dev/api/films/");
    const data = await response.json();
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
  };

  return (
    <React.Fragment>
      <section>
        <button onClick={FetchMovies}>Fetch Movies</button>
      </section>
      <section>
        {!loading && movies.length > 0 && <MoviesList movies={movies} />}
        {!loading && movies.length === 0 && <p>No Movies Found</p>}
        {loading && <p>Loading...</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
