const espress = require("express");
const router = espress.Router();

const movieController = require("../controllers/movie");
const AuthMiddleware = require("../middleware/authorized");

router.get("/api/movies/trending", AuthMiddleware.getAuth);
router.get("/api/movies/trending", movieController.getMoviesTrending);

router.get("/api/movies/top-rate", AuthMiddleware.getAuth);
router.get("/api/movies/top-rate", movieController.getMoviesTopRated);

router.get("/api/movies/discover", AuthMiddleware.getAuth);
router.get("/api/movies/discover", movieController.getMoviesByGenre);

router.post("/api/movies/video", AuthMiddleware.getAuth);
router.post("/api/movies/video", movieController.getMovieVideoByPostFilmId);

router.post("/api/movies/search", AuthMiddleware.getAuth);
router.post("/api/movies/search", movieController.getMovieByPostSearchKeys);

router.get("*", function (req, res, next) {
  res.status(404).send({
    message: "Route not found.",
  });
});

module.exports = router;
