const express = require('express');

const ctrlWrapper = require('../helpers/ctrlWrapper');
const validateBody = require('../middlewares/validateBody');
const isValidId = require('../middlewares/isValidId');

const {
  feedbackAddSchema,
  feedbackUpdateSchema,
} = require('../schemas/feedbackSchemas');

const {
  getAllFeedback,
  getFeedbackById,
  createFeedback,
  updateFeedbackById,
  deleteFeedbackById,
} = require('../controllers/feedbackControllers');

const router = express.Router();

router.get('/', ctrlWrapper(getAllFeedback));

router.get('/:id', isValidId, ctrlWrapper(getFeedbackById));

router.post('/', validateBody(feedbackAddSchema), ctrlWrapper(createFeedback));

router.put(
  '/:id',
  isValidId,
  validateBody(feedbackUpdateSchema),
  ctrlWrapper(updateFeedbackById)
);

router.delete('/:id', isValidId, ctrlWrapper(deleteFeedbackById));

module.exports = router;
