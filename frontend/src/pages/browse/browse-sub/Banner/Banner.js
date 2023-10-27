import React, { useContext, useEffect, useState } from "react";
import classes from "./Banner.module.css";
import MovieContext from "../../../../context/movie-context";
import useHttp from "../../../../hooks/use-http";

const Banner = () => {
  const ctx = useContext(MovieContext);
  const [banner, setBanner] = useState([]);
  const { SendToHttp } = useHttp();

  //lấy banner ngẫu nhiên
  const GetBannerData = (data) => {
    const random = Math.random().toFixed(2);
    const id = Math.ceil(random * (data.results.length - 1));
    const bannerItem = data.results[id];
    setBanner(() => bannerItem);
  };

  //useEffect chạy 2 lần nen dùng biến run để set banner 1 lần
  let run = true;
  useEffect(() => {
    if (run) {
      SendToHttp("api/movies/trending?token=8qlOkxz4wq", GetBannerData);
    }
    return () => {
      run = false;
    };
  }, []);

  return (
    <div className={classes.banner}>
      <img
        id={banner.id}
        src={`https://image.tmdb.org/t/p/original${
          banner.backdrop_path ? banner.backdrop_path : banner.poster_path
        }`}
        alt={banner.name && banner.name}
      />
      <div className={classes["movie-info"]}>
        <h1>{banner.name ? banner.name : banner.title}</h1>
        <div>
          <button>Play</button>
          <button>My List</button>
        </div>
        <p>{banner.overview && banner.overview}</p>
      </div>
    </div>
  );
};
export default Banner;
