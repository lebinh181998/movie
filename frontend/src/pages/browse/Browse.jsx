import React from "react";
import NavBar from "./browse-sub/NavBar/NavBar";
import MovieList from "./browse-sub/MovieList/MovieList";
import Banner from "./browse-sub/Banner/Banner";
function Browse() {
  return (
    <div className="app">
      <div className="navbar-section">
        <NavBar />
        <Banner />
      </div>
      <MovieList
        request="api/movies/trending?token=8qlOkxz4wq"
        title="Trending"
      />
      <MovieList
        request="api/movies/top-rate?token=8qlOkxz4wq"
        title="Top Rate"
      />
      <MovieList request="api/movies/discover?token=8qlOkxz4wq&genre=28" />
      <MovieList request="api/movies/discover?token=8qlOkxz4wq&genre=35" />
      <MovieList request="api/movies/discover?token=8qlOkxz4wq&genre=27" />
      <MovieList request="api/movies/discover?token=8qlOkxz4wq&genre=10749" />
      <MovieList request="api/movies/discover?token=8qlOkxz4wq&genre=99" />
    </div>
  );
}

export default Browse;
