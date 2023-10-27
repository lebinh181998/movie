const Movies = require("../models/Movies");
const Genres = require("../models/Genres");
const Videos = require("../models/Videos");

//hàm pagination
const pagination = (movies, page) => {
  const moviesData = [];

  //điểm bắt đầu và kết thúc của 20 movie trong movieList
  const total = Math.ceil(movies.length / 20);
  const limit = page * 20 - 1;
  const start = page * 20 - 20;
  //kiểm tra page có vượt quá total page không
  //có: gửi mảng movie rỗng
  //không: gửi 20 movies
  if (page <= total) {
    for (let i = start; i <= limit; i++) {
      if (movies[i]) {
        moviesData.push(movies[i]);
      }
    }
  }
  return { moviesData, total };
};

//lấy movie trending
exports.getMoviesTrending = (req, res, next) => {
  //lấy số page
  const page = req.query.page ? Number(req.query.page) : 1;
  //sắp xếp movie theo popularity
  const movies = Movies.all().sort(
    (itemA, itemB) => itemB.popularity - itemA.popularity
  );

  const moviesPage = pagination(movies, page);
  res.status(200).send({
    results: moviesPage.moviesData,
    page: page,
    total_pages: moviesPage.total,
  });
};
//lấy movie rate cao
exports.getMoviesTopRated = (req, res, next) => {
  //lấy số page
  const page = req.query.page ? Number(req.query.page) : 1;
  //sắp xếp movie theo popularity
  const movies = Movies.all().sort(
    (itemA, itemB) => itemB.vote_average - itemA.vote_average
  );
  const moviesPage = pagination(movies, page);
  res.status(200).send({
    results: moviesPage.moviesData,
    page: page,
    total_pages: moviesPage.total,
  });
};

//lấy movie theo genre
exports.getMoviesByGenre = (req, res, next) => {
  //lấy genre
  const genre = req.query.genre ? req.query.genre : null;
  //lấy số page
  const page = req.query.page ? Number(req.query.page) : 1;
  //sắp xếp movie theo popularity
  const movies = Movies.all().filter((item) =>
    item.genre_ids.includes(Number(genre))
  );

  //kiểm tra query genre
  //có: gửi movies nếu genre query có trong genreList
  //không: gửi lỗi 400
  if (genre) {
    //lây đối tượng genre dựa vào genre query
    const genreData = Genres.all().filter((item) => item.id == genre);
    //kiểm tra genre query có tồn tại trong genreList không
    //có: thực hiện code phía dưới
    //không: gửi lỗi 400
    if (!genreData.length > 0) {
      return res.status(400).send({
        message: "Not found that gerne id",
      });
    }

    const moviesPage = pagination(movies, page);
    res.status(200).send({
      results: moviesPage.moviesData,
      page: page,
      total_pages: moviesPage.total,
      genre_name: genreData[0].name,
    });
  } else {
    res.status(400).send({
      message: "Not found gerne parram",
    });
  }
};
//lấy video mới nhất cho movie
exports.getMovieVideoByPostFilmId = (req, res, next) => {
  //lấy id film từ request
  const film_id = req.body.film_id ? req.body.film_id : null;
  //kiểm tra film_id có tồn tại
  //có: lấy các video dựa trên film_id
  //khồng: gửi lỗi 400
  if (film_id) {
    const movieVideos = Videos.all().filter((item) => item.id == film_id);
    //kiểm tra mảng video
    //mảng rỗng: gửi phản hồi lỗi 404
    //mảng không rỗng: lọc video theo yêu cầu và gửi video mới nhất
    if (movieVideos.length > 0) {
      const videos = movieVideos[0].videos
        .filter(
          (item) =>
            item.official &&
            item.site == "YouTube" &&
            (item.type == "Trailer" || item.type == "Teaser")
        )
        .sort(
          (itemA, itemB) =>
            Number(new Date(itemB.published_at).getTime()) -
            Number(new Date(itemA.published_at).getTime())
        );
      if (videos.length > 0) {
        return res.status(200).send({ results: videos[0] });
      } else {
        return res.status(404).send({
          message: "Not found video",
        });
      }
    } else {
      return res.status(404).send({
        message: "Not found video",
      });
    }
  } else {
    res.status(400).send({
      message: "Not found film_id parram",
    });
  }
};
//tìm kiếm movie
exports.getMovieByPostSearchKeys = (req, res, next) => {
  //lấy các param từ request
  const body = req.body;
  const keyword = body.keyword ? body.keyword : null;
  const genre = body.genre ? body.genre : null;
  const mediaType = body.mediaType ? body.mediaType : null;
  const language = body.language ? body.language : null;
  const year = body.year ? body.year : null;
  //lấy số page
  const page = req.query.page ? Number(req.query.page) : 1;
  //kiểm tra keyword có tồn tại
  //có: lấy các movie dựa trên các param
  //khồng: gửi lỗi 400
  if (keyword) {
    let movies = Movies.all().filter(
      (item) =>
        (item.overview &&
          item.overview.toLowerCase().includes(keyword.toLowerCase())) ||
        (item.title && item.title.toLowerCase().includes(keyword.toLowerCase()))
    );

    movies = genre
      ? movies.filter((item) => item.genre_ids.includes(Number(genre)))
      : movies;

    movies = mediaType
      ? movies.filter((item) => item.media_type === mediaType)
      : movies;

    movies = language
      ? movies.filter((item) => item.original_language === language)
      : movies;

    movies = year
      ? movies.filter(
          (item) => new Date(item.release_date).getFullYear() === Number(year)
        )
      : movies;

    const moviesPage = pagination(movies, page);
    res.status(200).send({
      results: moviesPage.moviesData,
      page: page,
      total_pages: moviesPage.total,
    });
  } else {
    res.status(400).send({
      message: "Not found keyword parram",
    });
  }
};
