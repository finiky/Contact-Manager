const errorHandler = (error, request, response, next) => {
  const statusCode = response.statusCode ? response.statusCode : 500;
  switch (statusCode) {
    case 400:
      response.status(statusCode).json({
        title: "Validation Failed",
        message: error.message,
        stackTrace: error.stack,
      });
      break;
    case 401:
      response.status(statusCode).json({
        title: "Unauthorized",
        message: error.message,
        stackTrace: error.stack,
      });
      break;
    case 403:
      response.status(statusCode).json({
        title: "Forbidden",
        message: error.message,
        stackTrace: error.stack,
      });
      break;
    case 404:
      response.status(statusCode).json({
        title: "Not Found",
        message: error.message,
        stackTrace: error.stack,
      });
      break;
    case 500:
      response.status(statusCode).json({
        title: "Server Error",
        message: error.message,
        stackTrace: error.stack,
      });
      break;
    default:
      break;
  }
};

module.exports = errorHandler;
