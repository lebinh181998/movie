import React from "react";
import classes from "./Pagination.module.css";
import useHttp from "../../../hooks/use-http";

const Pagination = (props) => {
  const {
    page,
    onGetMovieListData,
    total_pages,
    keyword,
    genre,
    mediaType,
    language,
    year,
  } = props;
  const { SendToHttp } = useHttp();

  const GetMovieListData = (data, error) => {
    onGetMovieListData(data, error);
  };
  const onFetchMoviesSearch = (e) => {
    const pageSearch = e.target.value;
    const url = "api/movies/search?token=8qlOkxz4wq&page=" + pageSearch;
    //các biến dùng để search movie
    const body_request = keyword
      ? {
          keyword: keyword,
          genre: genre.trim() === "" ? null : genre,
          language: language.trim() === "" ? null : language,
          year: year.trim() === "" ? null : year,
          mediaType:
            mediaType.trim() === "" || mediaType.trim() === "all"
              ? null
              : mediaType,
        }
      : null;
    const method = "POST";
    const headers = props.headers ? props.headers : {};
    SendToHttp(url, GetMovieListData, method, body_request, headers);
  };

  return (
    <div className={`${classes.pagination}`}>
      {page > 1 && (
        <button onClick={onFetchMoviesSearch} value={page - 1}>
          {`<<`}
        </button>
      )}
      <button
        className={classes.active}
        onClick={onFetchMoviesSearch}
        value={page}
      >
        {page}
      </button>
      {page < total_pages && (
        <button onClick={onFetchMoviesSearch} value={page + 1}>
          {`>>`}
        </button>
      )}
    </div>
  );
};
export default Pagination;
