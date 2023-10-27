import React, { useEffect, useState } from "react";
import classes from "./MovieList.module.css";
import useHttp from "../../../../hooks/use-http";
import MovieDetail from "./MovieDetail";
import Pagination from "../../../search/Pagination/Pagination";

const MovieList = (props) => {
  const [movieList, setMovieList] = useState([]);
  const [movie, setMovie] = useState([]);
  const [title, setTitle] = useState(props.title ? props.title : "");
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const { SendToHttp, errMessage } = useHttp();

  //lấy dữ liệu của (từng) title
  const GetMovieListData = (data, error) => {
    let original = [];
    if (!error) {
      if (data.results.length > 0) {
        original = data.results;
      }
    }
    setMovieList(() => original);
    if (data.page) {
      setPage(() => data.page);
    }
    if (data.total_pages) {
      setTotalPages(() => data.total_pages);
    }
    if (data.genre_name) {
      setTitle(() => data.genre_name);
    }
  };

  // gửi request đến server để lấy dữ liệu của (từng) title
  const { keyword, genre, mediaType, language, year, request } = props;
  useEffect(() => {
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
    const method = props.method ? props.method : null;
    const headers = props.headers ? props.headers : {};
    SendToHttp(props.request, GetMovieListData, method, body_request, headers);
  }, [request, keyword, genre, mediaType, language, year]);

  const onMovieDetail = (e) => {
    const movieData = movieList.filter((item) => item.id == e.target.id);
    setMovie((prevMovie) =>
      prevMovie && movieData && prevMovie[0] !== movieData[0] ? movieData : []
    );
  };

  return (
    <>
      {/* hiển thị title nếu có  */}
      {movieList.length > 0 && title !== "" && (
        <h2 className={classes.title}>{title}</h2>
      )}
      {errMessage.trim() !== "" && (
        <h2 className={classes.title}>{errMessage}</h2>
      )}
      {/* hiển thị danh sách movie theo (từng) title nếu không bị lỗi  */}
      {movieList.length > 0 ? (
        <>
          <div
            className={`${classes["movie-list"]} 
          ${title === "" && classes.original} 
          ${title === "Search Result" && classes["search-result"]}
          `}
          >
            {movieList.map((item) => {
              return (
                <React.Fragment key={item.id}>
                  <div
                    id={item.id}
                    onClick={onMovieDetail}
                    className={`${classes["img-container"]}`}
                  >
                    <img
                      id={item.id}
                      // onClick={onMovieDetail}
                      src={`https://image.tmdb.org/t/p/original${
                        title === ""
                          ? item.poster_path
                          : item.backdrop_path
                          ? item.backdrop_path
                          : item.poster_path
                      }`}
                      alt={item.name ? item.name : item.original_name}
                    />
                    {movie.length > 0 &&
                      movie[0].id === item.id &&
                      title === "Search Result" && (
                        <MovieDetail title={title} movie={movie} />
                      )}
                  </div>
                </React.Fragment>
              );
            })}
          </div>
          {movie.length > 0 && title !== "Search Result" && (
            <MovieDetail title={title} movie={movie} />
          )}
          {title === "Search Result" && (
            <Pagination
              page={page}
              total_pages={totalPages}
              onGetMovieListData={GetMovieListData}
              keyword={keyword}
              genre={genre}
              mediaType={mediaType}
              language={language}
              year={year}
              headers={props.headers}
            />
          )}
        </>
      ) : (
        errMessage.trim() === "" && (
          <h2 className={`${classes.title} text-center`}>No movie.</h2>
        )
      )}
    </>
  );
};
export default React.memo(MovieList);
