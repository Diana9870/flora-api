const HttpError = require('../helpers/HttpError');

function isValidId(req, res, next) {
  const { id } = req.params;

  if (!/^\d+$/.test(id)) {
    return next(HttpError(400, `${id} is not a valid bouquet id`));
  }

  next();
}

module.exports = isValidId;
