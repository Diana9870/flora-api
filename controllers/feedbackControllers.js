const HttpError = require('../helpers/HttpError');
const feedbackServices = require('../services/feedbackServices');

async function getAllFeedback(req, res) {
  const { page, limit } = req.query;

  const { feedback, total } = await feedbackServices.listFeedback({
    page,
    limit,
  });

  res.status(200).json({ feedback, total });
}

async function getFeedbackById(req, res, next) {
  const { id } = req.params;

  const feedback = await feedbackServices.getFeedbackById(id);

  if (!feedback) {
    return next(HttpError(404, 'Not found'));
  }

  res.status(200).json(feedback);
}

async function createFeedback(req, res) {
  const feedback = await feedbackServices.addFeedback(req.body);

  res.status(201).json(feedback);
}

async function updateFeedbackById(req, res, next) {
  const { id } = req.params;

  const feedback = await feedbackServices.updateFeedbackById(id, req.body);

  if (!feedback) {
    return next(HttpError(404, 'Not found'));
  }

  res.status(200).json(feedback);
}

async function deleteFeedbackById(req, res, next) {
  const { id } = req.params;

  const feedback = await feedbackServices.deleteFeedbackById(id);

  if (!feedback) {
    return next(HttpError(404, 'Not found'));
  }

  res.status(200).json(feedback);
}

module.exports = {
  getAllFeedback,
  getFeedbackById,
  createFeedback,
  updateFeedbackById,
  deleteFeedbackById,
};
