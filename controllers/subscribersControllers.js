const HttpError = require('../helpers/HttpError');
const subscribersServices = require('../services/subscribersServices');

async function createSubscriber(req, res, next) {
  try {
    const subscriber = await subscribersServices.addSubscriber(req.body);

    res.status(201).json(subscriber);
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return next(HttpError(409, 'This email is already subscribed'));
    }

    throw error;
  }
}

module.exports = {
  createSubscriber,
};
