const errorHandler = (err, req, res, next) => {
  console.log(err.message);
  res.status(500).json({
    status: false,
    message: err.message,
  });
  next();
};

module.exports = errorHandler;
