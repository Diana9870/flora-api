const defaultMessages = {
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not found',
  409: 'Conflict',
};

function HttpError(status, message = defaultMessages[status] || 'Server error') {
  const error = new Error(message);
  error.status = status;
  return error;
}

module.exports = HttpError;
