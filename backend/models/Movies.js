const path = require("path");
const pathFile = require("../utils/paging");
const fs = require("fs");

const DATA_PATH = path.join(pathFile, "data", "movieList.json");

const Movies = {
  all: function () {
    return JSON.parse(fs.readFileSync(DATA_PATH, "utf8"));
  },
};

module.exports = Movies;
