const notFoundMiddleware = (req, res, next) => {
  res.status(404).json({ message: "404 Error Resource not found" });
};

module.exports = notFoundMiddleware;
