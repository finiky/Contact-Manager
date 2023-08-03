const jwt = require("jsonwebtoken");

const validateToken = (request, response, next) => {
  try {
    let token = null;
    let authHeader =
      request.headers.Authorization || request.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {
      token = authHeader.split(" ")[1];
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decoded) => {
        if (error) {
          response.status(404);
          throw new Error("User is not authorized.");
        }
        request.user = decoded.user;
        next();
      });
    }
    if (!token) {
      response.status(401);
      throw new Error("User is not authorized");
    }
  } catch (error) {
    next(error);
  }
};

module.exports = validateToken;
