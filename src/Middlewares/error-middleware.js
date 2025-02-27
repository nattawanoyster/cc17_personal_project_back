const errorMiddleware = (err, req, res, next) => {
  console.log("------------");
  console.log(err);
  console.log("------------");
  let statusCode = err.statusCode || 500;
  res.status(statusCode).json({ message: err.message, field: err.field });
};

module.exports = errorMiddleware;
