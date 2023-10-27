const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

const movieRouters = require("./routers/movie");
app.use(movieRouters);

app.listen(5000);
