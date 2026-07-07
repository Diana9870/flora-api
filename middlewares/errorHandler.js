// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  // Multer raises its own error class for upload problems (file too large,
  // too many files, etc). Those are client mistakes, so map them to 400
  // instead of leaking a 500.
  if (err.name === 'MulterError') {
    return res.status(400).json({ message: err.message });
  }

  const { status = 500, message = 'Internal Server Error' } = err;

  res.status(status).json({ message });
}

module.exports = errorHandler;
