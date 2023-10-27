const UserToken = require("../models/UserToken");

exports.getAuth = (req, res, next) => {
  const existAuth = UserToken.all().filter(
    (item) => item.token === req.query.token
  );
  if (existAuth.length > 0) {
    next();
  } else {
    return res.status(401).send({
      message: "Unauthorized",
    });
  }
};
