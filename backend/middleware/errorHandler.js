
function errorHandler(err, req, res, next) {
  console.error('API Error:', err.message);

  if (res.headersSent) {
    return next(err);
  }

  // Handle malformed JSON requests
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({
      success: false,
      message: 'Invalid JSON request body'
    });
  }

  // Support status codes provided by Express middleware
  const requestedStatus = err.statusCode || err.status;

  const statusCode =
    Number.isInteger(requestedStatus) &&
    requestedStatus >= 400 &&
    requestedStatus < 600
      ? requestedStatus
      : 500;

  return res.status(statusCode).json({
    success: false,
    message:
      statusCode === 500
        ? 'Internal server error'
        : err.message
  });
}

module.exports = errorHandler;
