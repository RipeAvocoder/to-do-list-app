const errorHandler = (err, req, res, next) => {
  console.error(err.stack); // Log the error stack for debugging

  // Default to 500 server error if status code isn't already set
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    success: false,
    error: err.message || "Internal Server Error",
    // Optionally include stack in development mode
    // stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

module.exports = { errorHandler };
