import React, { useState } from "react";
import MovieContext from "./movie-context";

const API_KEY = "e1e6ac808d11bc09fbcc276f3e17bb8e";

const requests = {
  fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
  fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_network=123`,
  fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
  fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
  fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
  fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
  fetchDocumentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
  fetchSearch: `/search/movie?api_key=${API_KEY}&language=en-US`,
};

// const movieDefaultState = {
//   items: {},
// };

// const MovieReducerFn = (state, action) => {
//   return movieDefaultState;
// };

const MovieProvider = (props) => {
  const movie_context = {
    requests: requests,
    api_key: API_KEY,
  };

  return (
    <MovieContext.Provider value={movie_context}>
      {props.children}
    </MovieContext.Provider>
  );
};
export default MovieProvider;
