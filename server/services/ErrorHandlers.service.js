class CustomError extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

const handleError = (err, req, res, next) => {
  if (typeof err === 'string') {
    // custom application error
    console.error('[ERROR-HANDLER] ' + err);
    return res.status(400).json({ message: err });
  }

  if (err.name === 'UnauthorizedError') {
    // jwt authentication error
    console.error('[ERROR-HANDLER] ' + err.name);
    return res.status(401).json({ message: 'Invalid Token' });
  }

  // default to 500 server error
  console.error('[ERROR-HANDLER] ' + err.message);

  return res.status(500).json({ message: 'internal server error' });
};

module.exports = {
  CustomError,
  handleError,
};