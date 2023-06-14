const errorHandlerMiddleware = (err, req, res, next) => {
  
  err;
  const defaultError = {
    statusCode: err.statusCode || 500,
    msg: err.message || "Something Went Wrong, Try Again Later",
  };
  if (err.name === "ValidationError") {
    defaultError.statusCode = 400;
    defaultError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(", ");
  }
  if (err.code && err.code === 11000) {
    defaultError.statusCode = 400;
    defaultError.msg = `${Object.keys(err.keyValue)} is not unique`;
  }
  res.status(defaultError.statusCode).json({ msg: defaultError.msg });
};

export default errorHandlerMiddleware;
