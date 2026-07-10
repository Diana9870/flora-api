const { Feedback } = require('../models');
const generatePhotoURL = require('../helpers/generatePhotoURL');

async function listFeedback({ page, limit } = {}) {
  // Newest first — visitors care about recent opinions the most.
  // Pagination is optional, same convention as bouquets/bestsellers.
  const options = { order: [['createdAt', 'DESC']] };

  if (page && limit) {
    options.limit = Number(limit);
    options.offset = (Number(page) - 1) * Number(limit);
  }

  const { rows, count } = await Feedback.findAndCountAll(options);

  return { feedback: rows, total: count };
}

function getFeedbackById(id) {
  return Feedback.findByPk(id);
}

function addFeedback(data) {
  return Feedback.create({
    ...data,
    avatarURL: data.avatarURL || generatePhotoURL(data.author),
  });
}

async function updateFeedbackById(id, data) {
  const feedback = await Feedback.findByPk(id);

  if (!feedback) {
    return null;
  }

  return feedback.update(data);
}

async function deleteFeedbackById(id) {
  const feedback = await Feedback.findByPk(id);

  if (!feedback) {
    return null;
  }

  await feedback.destroy();
  return feedback;
}

module.exports = {
  listFeedback,
  getFeedbackById,
  addFeedback,
  updateFeedbackById,
  deleteFeedbackById,
};
