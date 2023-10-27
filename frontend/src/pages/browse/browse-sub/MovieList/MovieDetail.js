import React, { useContext, useEffect, useMemo, useState } from "react";
import classes from "./MovieDetail.module.css";
import useHttp from "../../../../hooks/use-http";
import MovieContext from "../../../../context/movie-context";

const MovieDetail = (props) => {
  const { SendToHttp, errMessage } = useHttp();
  const [detail, setDetail] = useState(null);

  // const opts = {
  //   height: "400",
  //   width: "100%",
  //   playerVars: {
  //     autoplay: 0,
  //   },
  // };

  //lấy dữ liệu chi tiết của 1 movie
  const GetMovieDetailData = (data, error) => {
    let detail = [];
    if (!error) {
      detail = data.results;
    }
    setDetail(() => detail);
    // console.log(data);
  };

  //dữ liệu movie để hiển thị
  const movie = props.movie[0];
  const trailer = detail ? detail.key : "";

  useEffect(() => {
    const detail_url = `api/movies/video?token=8qlOkxz4wq`;
    const method = "POST";
    const body_request = { film_id: movie.id };
    const headers = { "Content-Type": "application/json" };
    SendToHttp(detail_url, GetMovieDetailData, method, body_request, headers);
  }, [movie]);

  return (
    <div
      className={`${classes["movie-detail"]} ${
        props.title === "Search Result" && classes["detail-absolute"]
      }`}
    >
      <div className={classes["movie-info"]}>
        <h1>{movie.title ? movie.title : movie.name}</h1>
        <div className={classes["date-vote"]}>
          <p className={classes.date}>
            Release Date:
            {movie.first_air_date ? movie.first_air_date : movie.release_date}
          </p>
          <p className={classes.vote}>Vote: {movie.vote_average}/10</p>
        </div>
        <p>{movie.overview}</p>
      </div>
      <div className={classes["movie-trailer"]}>
        {errMessage.trim() === "" ? (
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube-nocookie.com/embed/${trailer}`}
          ></iframe>
        ) : (
          <h1>{errMessage}</h1>
        )}
      </div>
    </div>
  );
};
export default MovieDetail;
