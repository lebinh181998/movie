import React, { useMemo, useState } from "react";
import MovieList from "../browse/browse-sub/MovieList/MovieList";
import classes from "./Searrch.module.css";
import NavBar from "../browse/browse-sub/NavBar/NavBar";
import useInput from "../../hooks/use-input";

const Search = () => {
  //setUrl để không bị load khi nhâp dữ liệu input search
  const [url, setUrl] = useState(null);
  const [keyword, setKeyword] = useState("");
  const [genre, setGenre] = useState(null);
  const [mediaType, setMediaType] = useState(null);
  const [language, setLanguage] = useState(null);
  const [year, setYear] = useState(null);

  //các dữ liệu input
  const inputData = (value) => value.trim() !== "";
  const {
    value: movieNameValue,
    isError: movieNameErrorInput,
    isValid: movieNameValidInput,
    eventChangeInput: movieNameChangeInput,
    eventBlurInput: movieNameBlurInput,
  } = useInput(inputData);
  const { value: genreValue, eventChangeInput: genreChangeInput } =
    useInput(inputData);
  const { value: mediaTypeValue, eventChangeInput: mediaTypeChangeInput } =
    useInput(inputData);
  const { value: languageValue, eventChangeInput: languageChangeInput } =
    useInput(inputData);
  const { value: yearValue, eventChangeInput: yearChangeInput } =
    useInput(inputData);

  //set dữ liệu search  nếu có hoặc báo lỗi
  const eventSearch = (e) => {
    e.preventDefault();
    if (movieNameValidInput) {
      setUrl("api/movies/search?token=8qlOkxz4wq");
      setKeyword(movieNameValue);
      setGenre(genreValue);
      setMediaType(mediaTypeValue);
      setLanguage(languageValue);
      setYear(yearValue);
    } else {
      movieNameBlurInput();
      setUrl(null);
    }
  };

  const headers = useMemo(() => {
    return { "Content-Type": "application/json" };
  }, []);

  return (
    <div className="app">
      <div className="navbar-section">
        <NavBar />
      </div>

      <div className={classes["search-container"]}>
        <div className={classes["search-form"]}>
          <form onSubmit={eventSearch} className={classes["form-search-input"]}>
            <div className={classes["form-group"]}>
              <label>Movie Name</label>
              <input
                type="text"
                placeholder="Ex: batman"
                value={movieNameValue}
                onChange={movieNameChangeInput}
              />
            </div>
            {movieNameErrorInput && (
              <p className="error-text text-center">Please enter movie name</p>
            )}

            <div className={classes["form-group"]}>
              <label>Genre</label>
              <select value={genreValue} onChange={genreChangeInput}>
                <option value="">All</option>
                <option value="28">Action</option>
                <option value="35">Comedy</option>
                <option value="27">Horror</option>
                <option value="10749">Romance</option>
                <option value="99">Documentary</option>
              </select>
            </div>
            <div className={classes["form-group"]}>
              <label>Media Type</label>
              <select value={mediaTypeValue} onChange={mediaTypeChangeInput}>
                <option value="all">All</option>
                <option value="movie">Movie</option>
                <option value="tv">TV</option>
                <option value="person">Person</option>
              </select>
            </div>
            <div className={classes["form-group"]}>
              <label>Language</label>
              <select value={languageValue} onChange={languageChangeInput}>
                <option value="">All</option>
                <option value="en">English</option>
                <option value="js">Japan</option>
                <option value="ko">Korea</option>
              </select>
            </div>
            <div className={classes["form-group"]}>
              <label>Year</label>
              <select value={yearValue} onChange={yearChangeInput}>
                <option value="">All</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
                <option value="2021">2021</option>
                <option value="2020">2020</option>
                <option value="2019">2019</option>
                <option value="2018">2018</option>
              </select>
            </div>

            <div className={`${classes["form-group"]}`}>
              <button type="button" className={classes.reset}>
                Reset
              </button>
              <button type="submit" className={classes.search}>
                Search
              </button>
            </div>
          </form>
        </div>

        <div className={classes["search-result"]}>
          {url && (
            <MovieList
              request={url}
              keyword={keyword}
              genre={genre}
              mediaType={mediaType}
              language={language}
              year={year}
              headers={headers}
              method="POST"
              title="Search Result"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
