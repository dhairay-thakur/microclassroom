const jwt = require("jsonwebtoken");
const HttpError = require("../models/http-error");

module.exports = (req, res, next) => {
  try {
    console.log(req.headers);
    const token = req.headers.authorization;
    console.log(token);
    if (!token) {
      return next(new HttpError("Authentication Failed", 400));
    }
    const decodedToken = jwt.verify(token, "micro-classroom-private-key");
    req.userData = { userId: decodedToken.userId };
    next();
  } catch (error) {
    console.log(error);
    return next(new HttpError("Authentication Failed", 500));
  }
};
